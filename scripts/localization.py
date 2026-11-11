"""Local Chinese copy, applied to rendered HTML and deployed string literals."""
from pathlib import Path
from html.parser import HTMLParser
import html, json, re

ROOT = Path(__file__).resolve().parents[1]
DICTIONARY_FILE = ROOT / 'site/zh-cn.json'
DICTIONARY = json.loads(DICTIONARY_FILE.read_text(encoding='utf-8')) if DICTIONARY_FILE.exists() else {}
normalize = lambda value: re.sub(r'\s+', ' ', value).strip()

def exact(value):
    key = normalize(value)
    translated = DICTIONARY.get(key)
    if translated is None: return value
    start = len(value)-len(value.lstrip())
    end = len(value.rstrip())
    return value[:start] + translated + value[end:]

class LocalizedHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.parts=[]
        self.skip=0
    def handle_starttag(self, tag, attrs):
        raw=self.get_starttag_text()
        if tag in ('script','style'): self.skip+=1
        allowed={'alt','title','placeholder','aria-label'}
        for name,value in attrs:
            content_field=bool(re.fullmatch(r'data-f\d+',name))
            internal_value=value in {'All','Live','Running','Scheduled','Open','Close'} or bool(value and re.fullmatch(r'[a-z][a-z0-9_-]*',value))
            if value and (name in allowed or tag=='meta' and name=='content' or content_field and not internal_value):
                translated=exact(value)
                if translated!=value:
                    pattern=r'(?<![\w-])'+re.escape(name)+r'\s*=\s*([\"\'])(.*?)\1'
                    raw=re.sub(pattern,lambda m:name+'="'+html.escape(translated,quote=True)+'"',raw,flags=re.S)
        if tag=='html':
            raw=re.sub(r'\s+lang=([\"\']).*?\1','',raw)
            raw=raw[:-1]+' lang="zh-CN">'
        self.parts.append(raw)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag,attrs)
    def handle_endtag(self,tag):
        self.parts.append('</'+tag+'>')
        if tag in ('script','style'):self.skip=max(0,self.skip-1)
    def handle_data(self,value):
        self.parts.append(value if self.skip else html.escape(exact(html.unescape(value)),quote=False))
    def handle_entityref(self,name):self.parts.append('&'+name+';')
    def handle_charref(self,name):self.parts.append('&#'+name+';')
    def handle_comment(self,data):self.parts.append('<!--'+data+'-->')
    def handle_decl(self,decl):self.parts.append('<!'+decl+'>')

def localize_html(text, inject=True):
    parser=LocalizedHTML();parser.feed(text);parser.close()
    text=''.join(parser.parts)
    if inject and '/zh-cn.js' not in text:
        text=text.replace('</head>','<script src="/typography.js"></script><script src="/zh-cn.js?v=1"></script><link rel="stylesheet" href="/zh-cn.css?v=1"><link rel="stylesheet" href="/typography.css" data-ty-global></head>')
    return text

