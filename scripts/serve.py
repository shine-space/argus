from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlsplit, unquote
import mimetypes, json, os, gzip, hashlib, re, socket
from functools import lru_cache
from common import *

mimetypes.add_type('text/javascript','.mjs')
mimetypes.add_type('text/javascript','.js')
@lru_cache(maxsize=512)
def compressed(body):
    return gzip.compress(body, compresslevel=5, mtime=0)

PRECOMPRESSED = ROOT / '.cache' / 'precompressed'
try:
    PRECOMPRESSION_INDEX = json.loads((PRECOMPRESSED / 'manifest.json').read_text())
except (OSError, ValueError):
    PRECOMPRESSION_INDEX = {}

def accepted_encoding(header, available):
    weights = {}
    for part in header.lower().split(','):
        values = part.strip().split(';')
        if not values[0]: continue
        weight = 1.0
        for parameter in values[1:]:
            if parameter.strip().startswith('q='):
                try: weight = float(parameter.strip()[2:])
                except ValueError: weight = 0.0
        weights[values[0]] = max(0.0, min(1.0, weight))
    choices = [(weights.get(name, weights.get('*', 0)), -i, name) for i, name in enumerate(available)]
    return max(choices)[2] if choices and max(choices)[0] > 0 else None

@lru_cache(maxsize=128)
def local_bytes(filename, size, mtime_ns):
    return Path(filename).read_bytes()

@lru_cache(maxsize=256)
def body_etag(body):
    return '"' + hashlib.sha256(body).hexdigest()[:24] + '"'

class Handler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'
    def setup(self):
        super().setup()
        self.connection.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
    def handle(self):
        try: super().handle()
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError): pass
    def do_GET(self):
        try:
            parsed=urlsplit(self.path)
            route=unquote(parsed.path)
            if route.startswith('/_remote/'):
                target=route[len('/_remote/'):]
                host=target.split('/')[0]
                if host not in HOSTS: self.send_error(403);return
                body,ct=served_asset('https://'+target+('?' + parsed.query if parsed.query else ''))
                self.reply(body,ct);return
            dest=(SITE/route.lstrip('/')).resolve()
            if not dest.is_relative_to(SITE.resolve()): self.send_error(403);return
            if dest.is_dir(): dest=dest/'index.html'
            if not dest.exists() and not dest.suffix: dest=dest/'index.html'
            if not dest.is_file():
                self.reply((SITE/'404/index.html').read_bytes(),'text/html; charset=utf-8',404);return
            stat = dest.stat()
            representation = dest
            encoding = None
            cached = PRECOMPRESSION_INDEX.get(dest.relative_to(SITE).as_posix())
            valid = cached and cached['size'] == stat.st_size and int(cached['mtime_ns']) == stat.st_mtime_ns
            if not self.headers.get('Range') and valid and accepted_encoding(self.headers.get('Accept-Encoding', ''), ('br', 'gzip')) == 'br':
                candidate = PRECOMPRESSED / cached['file']
                if candidate.is_file():
                    representation = candidate
                    encoding = 'br'
            selected = representation.stat()
            self.reply(local_bytes(str(representation), selected.st_size, selected.st_mtime_ns),mimetypes.guess_type(str(dest))[0] or 'application/octet-stream',404 if route=='/404' else 200, encoding)
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            return
        except Exception as e:
            print('ERROR',self.path,str(e),flush=True)
            self.send_error(502,'Asset fetch failed')
    def do_HEAD(self):
        self.do_GET()
    def reply(self,body,ct,status=200,encoding=None):
        headers={}
        if encoding: headers['Content-Encoding']=encoding
        total=len(body)
        range_header=self.headers.get('Range') if status==200 else None
        # Videos can start playback from a small initial byte range.
        if range_header:
            match=re.fullmatch(r'bytes=(\d*)-(\d*)',range_header)
            if match and any(match.groups()):
                first,last=match.groups()
                start=int(first) if first else max(0,total-int(last))
                end=min(int(last),total-1) if first and last else total-1
                if start>=total or start>end:
                    status=416;body=b'';headers['Content-Range']=f'bytes */{total}'
                else:
                    status=206;body=body[start:end+1]
                    headers['Content-Range']=f'bytes {start}-{end}/{total}'
        elif not encoding and total>1024 and any(t in ct for t in ('text/','javascript','json','xml','svg')) and accepted_encoding(self.headers.get('Accept-Encoding',''), ('gzip',)):
            body=compressed(body)
            headers['Content-Encoding']='gzip'
        headers['Vary']='Accept-Encoding'
        etag=body_etag(body)
        headers['ETag']=etag
        if status==200 and self.headers.get('If-None-Match')==etag:
            status=304;body=b''
        self.send_response(status)
        self.send_header('Content-Type',ct)
        self.send_header('Content-Length',str(len(body)))
        self.send_header('Access-Control-Allow-Origin','*')
        self.send_header('Accept-Ranges','bytes')
        path=urlsplit(self.path).path
        immutable=(path.startswith('/_remote/') and not any(t in ct for t in ('javascript','text/'))) or path.startswith(('/styles/blocks/','/orynthiq/assets/','/process/_next/static/')) or (path.startswith('/fonts/') and path.endswith(('.woff2','.woff','.ttf')))
        self.send_header('Cache-Control','public, max-age=31536000, immutable' if immutable else 'no-cache')
        for key,value in headers.items(): self.send_header(key,value)
        self.end_headers()
        if self.command!='HEAD': self.wfile.write(body)
    def log_message(self,fmt,*args):
        if str(args[1]) not in ('200','304'): super().log_message(fmt,*args)

if __name__=='__main__':
    port=int(os.environ.get('PORT','4175'))
    host=os.environ.get('HOST','127.0.0.1')
    print('Tender Celery local clone: http://'+host+':'+str(port),flush=True)
    class Server(ThreadingHTTPServer):
        request_queue_size = 1024
        daemon_threads = True
    Server((host,port),Handler).serve_forever()
