"""Self-host the requested typefaces without changing original mirror assets."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import re
import shutil
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
FONTS = ROOT / 'site/fonts'
RECON = ROOT / 'RECON/typography'
FONTS.mkdir(parents=True, exist_ok=True)
RECON.mkdir(parents=True, exist_ok=True)
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36'


def fetch(url):
    request = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(request, timeout=45) as response:
        return response.read()


sources = {
    'plus_css': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap',
    'LICENSE-PlusJakartaSans.txt': 'https://raw.githubusercontent.com/google/fonts/main/ofl/plusjakartasans/OFL.txt',
    'LICENSE-Inter.txt': 'https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt',
}
with ThreadPoolExecutor(max_workers=3) as pool:
    downloads = dict(zip(sources, pool.map(fetch, sources.values())))
for name, data in downloads.items():
    if name != 'plus_css':
        (FONTS / name).write_bytes(data)
plus_css = downloads['plus_css'].decode('utf-8')
(RECON / 'plus-jakarta-googlefonts.css').write_text(plus_css, encoding='utf-8')
latin = re.search(r'/\* latin \*/\s*(@font-face\s*\{[^{}]+\})', plus_css)
if not latin:
    raise RuntimeError('Google Fonts response did not contain the Latin subset.')
plus_face = latin[1]
url = re.search(r'url\(([^)]+)\)', plus_face)[1].strip('"\'')
plus_bytes = fetch(url)
if plus_bytes[:4] != b'wOF2':
    raise RuntimeError('Expected a WOFF2 variable font.')
(FONTS / 'PlusJakartaSans-latin.woff2').write_bytes(plus_bytes)
plus_face = re.sub(r'font-family:[^;]+;', 'font-family: "PlusJakartaSans";', plus_face)
plus_face = plus_face.replace(url, '/fonts/PlusJakartaSans-latin.woff2')

# Reuse the Inter subsets already downloaded from the reference. Keep their
# weight/style/unicode metadata and put global typography assets in one folder.
original = (ROOT / 'site/orynthiq/fonts.css').read_text(encoding='utf-8')
faces = []
for face in re.findall(r'@font-face\s*\{[^{}]*\}', original):
    if 'Placeholder' in face:
        continue
    match = re.search(r'url\("([^"]+)"\)', face)
    if not match:
        continue
    relative = match[1]
    source = ROOT / 'site' / relative.lstrip('/')
    name = 'Inter-' + source.name
    shutil.copyfile(source, FONTS / name)
    face = face.replace('Orynthiq Inter', 'Inter').replace(relative, '/fonts/' + name)
    faces.append(face)
faces.append(plus_face)
(FONTS / 'font-faces.css').write_text('\n'.join(faces), encoding='utf-8')
manifest = [{'file': '/fonts/' + file.name, 'bytes': file.stat().st_size,
             'sha256': hashlib.sha256(file.read_bytes()).hexdigest()}
            for file in sorted(FONTS.iterdir()) if file.is_file()]
(RECON / 'font-manifest.json').write_text(json.dumps({'sources': sources, 'plus_font': url, 'files': manifest}, indent=2), encoding='utf-8')
print(json.dumps({'font_faces': len(faces), 'font_files': len(manifest), 'bytes': sum(item['bytes'] for item in manifest)}))
