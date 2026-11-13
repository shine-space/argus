"""Export the local website as ordinary files for GitHub Pages (no Python server)."""
from pathlib import Path
from urllib.parse import urlsplit, urljoin, unquote
import argparse
import html
import hashlib
import json
import mimetypes
import re
import shutil

from common import ROOT, SITE, asset_path, served_asset

TEXT_EXTENSIONS = {'.html', '.css', '.js', '.mjs', '.json', '.svg', '.xml', '.txt'}
URL_TOKEN = re.compile(r'''(?<!\\)(?:https?://[^\s"'`<>\\)]+|/(?!/)[^\s"'`<>\\)]+)''')
RELATIVE_TOKEN = re.compile(r'''(["'`])((?:\./|\.\./)[^\s"'`<>\\]+)\1''')


class PagesExport:
    def __init__(self, base_path='/argus', origin='https://shine-space.github.io'):
        self.base = '/' + base_path.strip('/') if base_path.strip('/') else ''
        self.origin = origin.rstrip('/')
        self.mapping = {}
        self.assets = []
        self.roots = {p.name for p in SITE.iterdir()}
        self.types = {}
        urls = set()
        for metadata in sorted((SITE / '_remote').rglob('*.json')):
            if not metadata.is_file():
                continue
            try:
                info = json.loads(metadata.read_text(encoding='utf-8'))
            except (ValueError, UnicodeError):
                continue
            if not isinstance(info, dict) or not {'url', 'type'} <= info.keys():
                continue
            urls.add(info['url'])

        # Older query-version caches retained the queryless URL in their metadata.
        # Recover the actual URLs from the checked-in HTML/modules before exporting.
        for file in SITE.rglob('*'):
            if not file.is_file() or file.stat().st_size > 10 * 1024 * 1024:
                continue
            if file.suffix.lower() not in TEXT_EXTENSIONS | {'.zh'} and file.name != 'plain':
                continue
            try:
                text = file.read_text(encoding='utf-8')
            except UnicodeError:
                continue
            for token in URL_TOKEN.findall(text):
                token = html.unescape(token)
                if token.startswith('/_remote/'):
                    token = 'https://' + token[len('/_remote/'):]
                if token.startswith('https://') and urlsplit(token).query:
                    if asset_path(token).is_file() and Path(str(asset_path(token)) + '.json').is_file():
                        urls.add(token)

        for url in sorted(urls):
            info = json.loads(Path(str(asset_path(url)) + '.json').read_text(encoding='utf-8'))
            source = asset_path(url)
            if not source.is_file():
                raise FileNotFoundError(source)
            parsed = urlsplit(url)
            destination = Path('_remote') / parsed.netloc / unquote(parsed.path.lstrip('/'))
            content_type = info['type'].split(';')[0]
            if not destination.suffix:
                extension = {'text/css': '.css', 'text/javascript': '.js', 'application/javascript': '.js'}.get(content_type)
                destination = Path(str(destination) + (extension or mimetypes.guess_extension(content_type) or '.bin'))
            if parsed.query:
                destination = destination.with_name(destination.stem + '--' + source.name + destination.suffix)
            local = '/_remote/' + parsed.netloc + parsed.path
            if parsed.query:
                local += '?' + parsed.query
            target = self.base + '/' + destination.as_posix()
            self.mapping[url] = self.mapping[local] = target
            self.assets.append((url, destination, info['type']))
            self.types[target] = info['type']

        # Runtime-computed requests can omit the original image/font query.
        for url, destination, _ in self.assets:
            parsed = urlsplit(url)
            local = '/_remote/' + parsed.netloc + parsed.path
            target = self.base + '/' + destination.as_posix()
            self.mapping.setdefault(local, target)
            self.mapping.setdefault(url.split('?')[0], target)

    def rewrite_url(self, value):
        decoded = html.unescape(value)
        if decoded in self.mapping:
            return self.mapping[decoded]
        if decoded.startswith('/') and not decoded.startswith('//'):
            first = decoded[1:].split('/')[0].split('?')[0].split('#')[0]
            if first in self.roots:
                return self.base + value
        return value

    def rewrite(self, text, source_url=None):
        # Local preview origins must never leak into the published navigation.
        text = re.sub(r'https?://(?:127\.0\.0\.1|localhost):4175\b', self.origin + self.base, text)
        text = URL_TOKEN.sub(lambda m: self.rewrite_url(m[0]), text)
        if source_url:
            text = RELATIVE_TOKEN.sub(
                lambda m: m[1] + self.mapping.get(urljoin(source_url, m[2]), m[2]) + m[1], text)
        # Only link destinations, never JS split('/') / join('/') delimiters.
        text = re.sub(r'''(\b(?:href|action)\s*(?:=|:)\s*)(["'`])/(\2)''',
                      lambda m: m[1] + m[2] + self.base + '/' + m[3], text)
        # Root-route guards also need the project prefix; unrelated '/' strings do not.
        text = re.sub(r'''(\blocation\.pathname\s*(?:===|!==|==|!=)\s*)(["'`])/(\2)''',
                      lambda m: m[1] + m[2] + self.base + '/' + m[3], text)
        # Preserve escaped slashes in route regexes, while matching the project prefix.
        if self.base:
            text = text.replace(r'^\/', '^' + self.base.replace('/', r'\/') + r'\/')
        return text

    def export(self, output):
        output = Path(output).resolve()
        if output == ROOT or not output.is_relative_to(ROOT):
            raise ValueError('Output must be a generated directory inside this project')
        if output.exists():
            if not (output / '.pages-export').is_file():
                raise ValueError('Refusing to overwrite a directory not created by this exporter')
            shutil.rmtree(output)
        output.mkdir(parents=True)
        (output / '.pages-export').write_text('Generated by scripts/export_pages.py\n')

        for source in SITE.rglob('*'):
            if not source.is_file() or source.is_relative_to(SITE / '_remote'):
                continue
            relative = source.relative_to(SITE)
            destination = output / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            if relative.as_posix() == 'pages-runtime.js':
                # This adapter already computes its base path from its script URL.
                shutil.copyfile(source, destination)
                continue
            if source.suffix.lower() in TEXT_EXTENSIONS:
                text = self.rewrite(source.read_text(encoding='utf-8'))
                if source.suffix == '.html':
                    version = hashlib.sha256((SITE / 'pages-runtime.js').read_bytes()).hexdigest()[:12]
                    runtime = f'<script src="{self.base}/pages-runtime.js?v={version}"></script>'
                    text = text.replace('<head>', '<head>' + runtime, 1)
                destination.write_text(text, encoding='utf-8')
            else:
                shutil.copyfile(source, destination)

        for url, relative, content_type in self.assets:
            destination = output / relative
            destination.parent.mkdir(parents=True, exist_ok=True)
            body, _ = served_asset(url)
            if relative.suffix != '.framercms' and any(kind in content_type for kind in ('text/', 'javascript', 'json', 'xml')):
                body = self.rewrite(body.decode('utf-8'), url).encode('utf-8')
            destination.write_bytes(body)

        (output / 'pages-assets.json').write_text(json.dumps({
            'base': self.base, 'urls': self.mapping, 'types': self.types,
        }, separators=(',', ':')), encoding='utf-8')
        (output / '.nojekyll').touch()
        print(json.dumps({'output': str(output), 'basePath': self.base, 'cachedAssets': len(self.assets),
                          'files': sum(p.is_file() for p in output.rglob('*'))}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-path', default='/argus')
    parser.add_argument('--origin', default='https://shine-space.github.io')
    parser.add_argument('--output', default='_site')
    args = parser.parse_args()
    PagesExport(args.base_path, args.origin).export(args.output)
