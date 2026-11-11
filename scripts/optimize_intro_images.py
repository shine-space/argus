"""Build responsive WebP copies; preserve the original supplied artwork."""
from pathlib import Path
import hashlib, json, re
from io import BytesIO
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / 'site/orynthiq'
original = BASE / 'assets/f725b40ef291f8f469ce.png'
image = Image.open(original)
variants = []
for width in (1100, 2000, image.width):
    variant = image if width == image.width else image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
    buffer = BytesIO()
    variant.save(buffer, 'WEBP', quality=95, method=6, exact=True)
    body = buffer.getvalue()
    name = hashlib.sha256(body).hexdigest()[:20] + '.webp'
    (BASE / 'assets' / name).write_bytes(body)
    variants.append({'width': width, 'src': '/orynthiq/assets/' + name, 'bytes': len(body)})

srcset = ','.join(f'{v["src"]} {v["width"]}w' for v in variants)
for breakpoint in ('desktop', 'tablet', 'mobile'):
    target = BASE / (breakpoint + '.html')
    text = target.read_text(encoding='utf-8')
    def optimize(match):
        tag = match[0]
        if 'f725b40ef291f8f469ce.png' in tag or 'data-intro-product' in tag:
            tag = re.sub(r'\s+(?:data-)?src(?:set)?="[^"]*"', '', tag)
            tag = re.sub(r'\s+data-intro-product(?:="[^"]*")?', '', tag)
            tag = tag.replace('<img', f'<img data-intro-product data-src="{variants[-1]["src"]}" data-srcset="{srcset}"', 1)
        else:
            tag = re.sub(r'(?<![\w-])(src|srcset)=', r'data-\1=', tag)
        return tag.replace('decoding="auto"', 'decoding="async"')
    target.write_text(re.sub(r'<img\b[^>]*>', optimize, text), encoding='utf-8')

report = {'originalBytes': original.stat().st_size, 'originalDimensions': image.size, 'variants': variants}
(ROOT / 'RECON/optimized-intro-images.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report))
