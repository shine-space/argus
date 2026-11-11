import concurrent.futures
import json
import urllib.request
import urllib.error
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'
ORIGIN = 'http://127.0.0.1:4175'

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = set()

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag in ('script', 'img', 'iframe') and attributes.get('src'):
            self.urls.add(attributes['src'])
        if tag == 'link' and attributes.get('rel') in ('stylesheet', 'modulepreload'):
            self.urls.add(attributes.get('href', ''))

inventory = []
assets = set()
for file in SITE.rglob('*.html'):
    relative = file.relative_to(SITE)
    if any(part in ('_remote', '_next') for part in relative.parts): continue
    route = '/' + relative.as_posix().removesuffix('index.html').rstrip('/')
    if not route: route = '/'
    parser = References()
    content = file.read_text(encoding='utf-8')
    parser.feed(content)
    inventory.append({'file': str(relative), 'route': route, 'bytes': file.stat().st_size})
    for url in parser.urls:
        resolved = urljoin(ORIGIN + route.rstrip('/') + '/', url)
        if urlsplit(resolved).netloc == urlsplit(ORIGIN).netloc:
            assets.add(resolved.removeprefix(ORIGIN))

def check(route):
    try:
        request = urllib.request.Request(ORIGIN + route, method='HEAD', headers={'Accept-Encoding': 'br,gzip'})
        with urllib.request.urlopen(request, timeout=20) as response:
            return {'route': route, 'status': response.status, 'encoding': response.headers.get('Content-Encoding')}
    except urllib.error.HTTPError as error:
        return {'route': route, 'status': error.code}
    except Exception as error:
        return {'route': route, 'error': str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
    pages = list(executor.map(check, [page['route'] for page in inventory]))
    resources = list(executor.map(check, sorted(assets)))
failures = [item for item in pages + resources if 'error' in item or item['status'] not in (200, 304) and item['route'] != '/404']
result = {'htmlFiles': len(inventory), 'pageChecks': pages, 'resourceChecks': resources, 'failures': failures}
(ROOT / 'RECON/all-pages-http.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'htmlFiles': len(inventory), 'resources': len(resources), 'failures': failures}, ensure_ascii=False))
