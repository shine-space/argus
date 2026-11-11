from html import unescape
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.runtime/perf-tools'))
from PIL import Image
from fontTools import subset

site = ROOT / 'site'
assets = []
for pattern, limit, quality in [('review-portraits/*.png', 800, 92), ('about-scenes/scene-*.png', 1600, 92), ('coze-team/assets/figma-workbench/*.png', 192, 92), ('orynthiq/assets/mountain-foreground-wide.png', 4096, 96), ('orynthiq/assets/hero-laptop-group-1.png', 4096, 96)]:
    for source in site.glob(pattern):
        if source.stat().st_size < 100_000:
            continue
        target = source.with_suffix('.webp')
        with Image.open(source) as image:
            image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
            image.save(target, 'WEBP', quality=quality, method=6)
        assets.append({'source': '/' + source.relative_to(site).as_posix(), 'target': '/' + target.relative_to(site).as_posix(), 'before': source.stat().st_size, 'after': target.stat().st_size})

page = (site / 'services/workflow-automation/index.html').read_text(encoding='utf-8')
headings = re.findall(r'<h1\b[^>]*>([\s\S]*?)</h1>', page)
text = ''.join(unescape(re.sub(r'<[^>]+>', '', heading)) for heading in headings)
options = subset.Options()
options.flavor = 'woff2'
font = subset.load_font(str(site / 'fonts/DingTalk-JinBuTi.ttf'), options)
selection = subset.Subsetter(options=options)
selection.populate(text=text + ''.join(chr(n) for n in range(32, 127)))
selection.subset(font)
subset.save_font(font, str(site / 'fonts/workflow-title.woff2'), options)

replacements = {asset['source']: asset['target'] for asset in assets}
replacements['/about-scenes/scene-${n}.png'] = '/about-scenes/scene-${n}.webp'
changed = []
for base in [site, ROOT / 'scripts']:
    for source in base.rglob('*'):
        if not source.is_file() or source.suffix not in {'.html', '.css', '.js', '.mjs', '.cjs'}:
            continue
        if '_remote' in source.parts or '_next' in source.parts:
            continue
        content = source.read_text(encoding='utf-8')
        updated = content
        for before, after in replacements.items():
            updated = updated.replace(before, after)
        if updated != content:
            source.write_text(updated, encoding='utf-8')
            changed.append(source.relative_to(ROOT).as_posix())

report = {'images': assets, 'updatedFiles': changed, 'fontBefore': (site / 'fonts/DingTalk-JinBuTi.ttf').stat().st_size, 'fontAfter': (site / 'fonts/workflow-title.woff2').stat().st_size}
(ROOT / 'RECON/performance-assets-20261111.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps({'images': len(assets), 'imageBytesBefore': sum(a['before'] for a in assets), 'imageBytesAfter': sum(a['after'] for a in assets), 'fontBytesBefore': report['fontBefore'], 'fontBytesAfter': report['fontAfter'], 'updatedFiles': changed}))
