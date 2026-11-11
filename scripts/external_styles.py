"""Externalize static stylesheets, retaining cascade and valid @import order."""
from html.parser import HTMLParser
from pathlib import Path
import html
import re

SITE = Path(__file__).resolve().parents[1] / 'site'


def normalize_css(css):
    css = re.sub(r'http://127\.0\.0\.1:\d+', '', css)
    # These component defaults were replaced by the site's global text stack.
    return re.sub(r'@import\s+url\(["\']?[^)\n]*fonts\.googleapis\.com[^)\n]*(?:Geist|Figtree|IBM\+Plex\+Mono)[^)\n]*\)\s*;', '', css)


def css_name(css):
    # Same algorithm as stylesheet-runtime.js for client-rendered components.
    data = css.encode('utf-8')
    value = 2166136261
    for byte in data:
        value = ((value ^ byte) * 16777619) & 0xffffffff
    return f'{value:08x}-{len(data):x}.css'


def write_css(css):
    css = normalize_css(css)
    target = SITE / 'styles/blocks' / css_name(css)
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists() and target.read_text(encoding='utf-8') != css:
        raise ValueError(f'Stylesheet hash collision: {target}')
    target.write_text(css, encoding='utf-8')
    return '/' + target.relative_to(SITE).as_posix()


class StyleRanges(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.lines = [0] + [match.end() for match in re.finditer('\n', source)]
        self.source, self.ranges, self.active = source, [], None

    def source_offset(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def handle_starttag(self, tag, attrs):
        if tag == 'style':
            start = self.source_offset()
            self.active = (start, start + len(self.get_starttag_text()), attrs)

    def handle_endtag(self, tag):
        if tag == 'style' and self.active:
            start, body, attrs = self.active
            end = self.source_offset()
            self.ranges.append((start, self.source.index('>', end) + 1,
                                self.source[body:end], attrs))
            self.active = None


def externalize_html(source):
    parser = StyleRanges(source)
    parser.feed(source)
    # Keep each link at its original position; merging sheets would invalidate
    # repeated @imports and could change the order of component overrides.
    for start, end, css, attrs in reversed(parser.ranges):
        href = write_css(css)
        extra = ''.join(' ' + key + ('' if value is None else
                        '="' + html.escape(value, quote=True) + '"')
                        for key, value in attrs if key not in ('type', 'rel', 'href'))
        source = source[:start] + f'<link rel="stylesheet" href="{href}"{extra}>' + source[end:]
    return source


if __name__ == '__main__':
    count = 0
    for path in SITE.rglob('*.html'):
        if '_remote' in path.parts:
            continue
        source = path.read_text(encoding='utf-8')
        output = externalize_html(source)
        if output != source:
            path.write_text(output, encoding='utf-8')
            count += 1
    print(f'Externalized static stylesheets in {count} HTML files')
