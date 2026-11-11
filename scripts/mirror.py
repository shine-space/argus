import concurrent.futures, html, json, re
from urllib.parse import urlsplit, urljoin
from common import *

SITE.mkdir(parents=True, exist_ok=True)
(ROOT/'originals').mkdir(exist_ok=True)
sitemap, _ = download(ORIGIN+'/sitemap.xml')
urls = re.findall(r'<loc>(.*?)</loc>', sitemap.decode())
(ROOT/'RECON'/'routes.json').write_text(json.dumps(urls, indent=2))
(ROOT/'originals'/'sitemap.xml').write_bytes(sitemap)
texts = []
def page_job(url):
    body, ct = download(url)
    route = urlsplit(url).path.strip('/')
    rel = (route + '/index.html') if route else 'index.html'
    original = ROOT/'originals'/rel
    original.parent.mkdir(parents=True, exist_ok=True)
    original.write_bytes(body)
    dest = SITE/rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    text = body.decode()
    dest.write_text(transform(text, html=True), encoding='utf-8')
    return url, text
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for url, text in pool.map(page_job, urls):
        texts.append((url,text))
        print('PAGE',url,flush=True)

def extract(base, text):
    found = set()
    # URL literals and CSS resources, including srcset size variants.
    for raw in re.findall(r'https?://[^\s"\'`<>\\)\]}]+', text):
        raw = html.unescape(raw).rstrip(',;')
        if urlsplit(raw).path.startswith('/images/'): raw = re.split(r'[;|]',raw)[0]
        if urlsplit(raw).path in ('','/','/s/') or '/node_modules/' in raw: continue
        if urlsplit(raw).netloc in HOSTS:
            found.add(raw)
    if base.endswith(('.mjs','.js','.css')):
        for raw in re.findall(r'["\'`]((?:\./|\.\./)[^"\'`\s]+\.(?:mjs|js|css|woff2?|json|wasm)(?:\?[^"\'`\s]*)?)["\'`]',text):
            found.add(urljoin(base,raw))
    return found

pending = set()
for url,text in texts: pending.update(extract(url,text))
seen, failures, manifest = set(), [], []
def asset_job(url):
    try:
        body,ct = cached_asset(url)
        more = extract(url,body.decode('utf-8')) if any(x in ct for x in ('javascript','text/','json')) else set()
        return url,more,{'url':url,'bytes':len(body),'type':ct}
    except Exception as e: return url,set(),{'url':url,'error':str(e)}
while pending:
    batch = sorted(pending-seen)
    if not batch: break
    seen.update(batch)
    pending=set()
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        for url,more,meta in pool.map(asset_job,batch):
            manifest.append(meta)
            if 'error' in meta: failures.append(meta);print('FAIL',url,meta['error'],flush=True)
            pending.update(more-seen)
            if len(manifest)%25==0: print('ASSETS',len(manifest),'next',len(pending),flush=True)
    (ROOT/'RECON'/'asset-manifest.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps({'pages':len(urls),'assets':len(manifest),'failed':failures}),flush=True)
