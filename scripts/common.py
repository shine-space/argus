from pathlib import Path
from urllib.parse import urlsplit, unquote, parse_qs
import hashlib, json, re, urllib.request, urllib.error, time, threading, os
from functools import lru_cache
from theme import apply_theme

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'site'
ORIGIN = 'https://tender-celery-477359.framer.app'
LOCAL = 'http://127.0.0.1:' + os.environ.get('PORT','4175')
HOSTS = ('framerusercontent.com', 'fonts.gstatic.com', 'fonts.googleapis.com', 'cdn.jsdelivr.net')
locks = {}
guard = threading.Lock()

def asset_path(url):
    u = urlsplit(url)
    suffix = hashlib.sha256(u.query.encode()).hexdigest()[:16] if u.query else 'plain'
    return SITE / '_remote' / u.netloc / (u.path.lstrip('/') or 'index') / suffix

def download(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0', 'Referer':ORIGIN+'/'})
            with urllib.request.urlopen(req, timeout=90) as r:
                return r.read(), r.headers.get('Content-Type','application/octet-stream')
        except urllib.error.HTTPError as e:
            if e.code == 404 and url.startswith(ORIGIN):
                return e.read(), e.headers.get('Content-Type','text/html')
            if attempt == 2: raise
            time.sleep(1 + attempt)
        except Exception:
            if attempt == 2: raise
            time.sleep(1 + attempt)

def transform(text, html=False, script=False):
    text = text.replace('https://framer.com/edit/init.mjs', 'data:text/javascript,export%20const%20createEditorBar%3D()%3D%3E()%3D%3Enull')
    for host in HOSTS:
        text = text.replace('https://'+host, '/_remote/'+host)
        text = text.replace('http://'+host, '/_remote/'+host)
    # URL constructor bases must remain absolute; assets still use this page's
    # origin so LAN clients never try to contact their own loopback address.
    text = re.sub(r'(new URL\([^,\n]*,\s*)([`"\'])(/_remote/[^`"\']*)\2',
                  lambda m: m[1]+'location.origin+'+m[2]+m[3]+m[2], text)
    text = text.replace(ORIGIN, LOCAL)
    text = text.replace('return e.textDecoder.decode(n)', "return window.__argusLocalize(e.textDecoder.decode(n)).replace(/#(?:19d98b|2fbf71|58d68d)\\b/gi,'#F36A4B').replaceAll('https://framerusercontent.com', location.origin+'/_remote/framerusercontent.com')")
    if html:
        text = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', lambda m: '' if any(x in m[0] for x in ('events.framer.com/script', 'googletagmanager.com', 'google-analytics.com', '__framer_force_showing_editorbar_since')) else m[0], text, flags=re.I)
    return apply_theme(text)

def cached_asset(url):
    dest = asset_path(url)
    with guard: lock = locks.setdefault(str(dest), threading.Lock())
    with lock:
        meta = Path(str(dest)+'.json')
        if dest.exists() and meta.exists():
            return dest.read_bytes(), json.loads(meta.read_text())['type']
        if os.environ.get('CLONE_OFFLINE') == '1':
            raise FileNotFoundError('Offline asset missing: '+url)
        body, ct = download(url)
        # Keep the upstream bytes separately; only host references change in served modules.
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(body)
        meta.write_text(json.dumps({'url':url,'type':ct,'bytes':len(body)}))
        return body, ct

@lru_cache(maxsize=1024)
def served_asset(url):
    if urlsplit(url).path.endswith('.framercms'):
        u=urlsplit(url)
        body,ct=cached_asset(url.split('?')[0])
        ranges=parse_qs(u.query).get('range')
        if ranges:
            body=b''.join(body[int(a):int(b)+1] for a,b in (r.split('-') for r in ranges[0].split(',')))
        return body,'application/octet-stream'
    body, ct = cached_asset(url)
    if any(x in ct for x in ('javascript','text/','json','xml')):
        name=urlsplit(url).path.rsplit('/',1)[-1]
        custom_script=('/sites/' in url and not name.startswith(('framer.','react.','motion.','rolldown-')))
        localized=Path(str(asset_path(url))+'.zh')
        if custom_script and localized.is_file():body=localized.read_bytes()
        text=transform(body.decode('utf-8'),script=custom_script and ('javascript' in ct or name.endswith(('.mjs','.js'))))
        body = text.encode('utf-8')
    return body, ct

