"""Build the requested source slice from captured, rendered Framer DOM and CSS.

The Shadow DOM boundary keeps both sites' tokens, typography and translations
independent. Source assets are resolved by manifest; the user-confirmed laptop
image replacement is deliberately preserved across rebuilds.
"""
from pathlib import Path
import html
import json
import re
from external_styles import externalize_html
from orynthiq_sections import remove_retired_sections

ROOT = Path(__file__).resolve().parents[1]
RECON = ROOT / 'RECON/orynthiq'
OUT = ROOT / 'site/orynthiq'
manifest = json.loads((RECON / 'asset-manifest.json').read_text(encoding='utf-8'))
assets = {item['url']: item['path'] for item in manifest if 'path' in item}
PLATFORM_COPY = {
    'INTELLIGENCE BEHIND EVERY ORDER': '智能体平台',
    'An AI operations layer for the next generation of commerce.': '应用、数字员工与工作台， 把知识、流程、工具和模型组织为可用的能力',
    'Less busywork. More business in motion.':
        '一个工作入口，连接人、AI 与业务',
    'Great commerce feels effortless. Orynthiq brings orders, customers, and operations into one intelligent flow.':
        '我们以制造业为切入点，连接企业知识、业务数据与已有系统，让 AI Agent 和业务人员协同工作。',
    'Less switching tabs. Fewer loose ends. A connected way to handle the work behind every purchase, with your team in control.':
        '以平台沉淀共性能力，以现场工程适配真实差异。从一个边界清晰的场景开始，交付可以使用、能够复核、持续维护的业务应用',
}


def localize(value):
    for url, path in sorted(assets.items(), key=lambda item: -len(item[0])):
        value = value.replace(html.escape(url, quote=True), path).replace(url, path)
    # Unique font names prevent the two Framer sites' Inter subsets colliding.
    return re.sub(r'\bInter\b', 'Orynthiq Inter', value)


desktop = json.loads((RECON / 'desktop-region.json').read_text(encoding='utf-8'))
runtime_css = json.loads((RECON / 'runtime-css.json').read_text(encoding='utf-8'))
css = localize('\n'.join(runtime_css[:3]))
fonts = re.findall(r'@font-face\s*\{[^{}]*\}', css)
(OUT / 'fonts.css').write_text('\n'.join(fonts), encoding='utf-8')
css = re.sub(r'@font-face\s*\{[^{}]*\}', '', css)
variables = ';'.join(f'{key}:{value}' for key, value in desktop['variables'].items())
css = ':host{display:block;flex:none;width:100%;min-width:0;background:#080808;font-family:sans-serif;font-size:12px;line-height:normal;-webkit-font-smoothing:antialiased;' + variables + '}\n' + css
css += '''
/* Recreate the source's animated CTA using its original two-label structure. */
a[name="Request a demo"] .framer-1jg95za-container > div > div,
a[name="Request a demo"] .framer-1jg95za-container > div > span > span {
  transition:transform .65s cubic-bezier(.22,1,.36,1);
}
a[name="Request a demo"]:is(:hover,:focus-visible) .framer-1jg95za-container > div > div {transform:translateY(0)!important}
a[name="Request a demo"]:is(:hover,:focus-visible) .framer-1jg95za-container > div > span > span:first-child {transform:translateY(-115%)!important}
a[name="Request a demo"]:is(:hover,:focus-visible) .framer-1jg95za-container > div > span > span:last-child {transform:translateY(0)!important}
a:focus-visible{outline:2px solid #f4f4f4;outline-offset:4px}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
'''
css += '\n/* Compact single-line platform headline. */\n#home .framer-4tgzny { width: max-content !important; max-width: 100% !important; }\n#home h1.framer-styles-preset-t82fp5 {\n  font-size: clamp(18px, 3.15vw, 48px) !important;\n  font-weight: 700 !important;\n  line-height: 1.25 !important;\n  letter-spacing: -0.02em !important;\n  white-space: nowrap;\n}\n'
(OUT / 'source.css').write_text(css, encoding='utf-8')
for breakpoint in ('desktop', 'tablet', 'mobile'):
    data = json.loads((RECON / f'{breakpoint}-region.json').read_text(encoding='utf-8'))
    content = remove_retired_sections(''.join(data['sections']))
    # Captures were taken after scrolling; start parallax at the local hero top.
    content = re.sub(r'transform: translateY\([-\d.]+px\);', 'transform: none;', content)
    content = content.replace('href="./request-demo"', 'href="/book"')
    content = localize(content)
    for original, replacement in PLATFORM_COPY.items():
        content = content.replace(original, replacement)
    # User confirmed the concurrently replaced Chaoxi Intelligent visual.
    # Reuse that file at every viewport rather than the earlier source srcset.
    laptop = next(path for url, path in assets.items() if '/bj1xdwx40hpikJbAwqb7oSLCGeo.png?width=' in url)
    content = re.sub(r'srcset="[^"]*"(?= src="' + re.escape(laptop) + r'")', '', content)
    content = content.replace('alt="Orynthiq dashboard on a black laptop resting on volcanic sand"', 'alt="朝夕智能工作台，展示在火山沙丘上的黑色笔记本电脑中"')
    outer, parent = data['outer'], data['parent']
    fragment = f'<div class="{outer["className"]}" style="{outer["style"]}"><div class="{parent["className"]}" style="{parent["style"]}">{content}</div></div>'
    (OUT / f'{breakpoint}.html').write_text(externalize_html(fragment), encoding='utf-8')

(OUT / 'preview.html').write_text('''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Orynthiq source slice · local comparison</title><style>html,body{margin:0;padding:0;background:#080808}</style><script src="/typography.js"></script><link rel="stylesheet" href="/typography.css" data-ty-global><script src="/orynthiq/mount.js" defer></script></head><body><orynthiq-intro id="orynthiq-intro" lang="en"></orynthiq-intro></body></html>''', encoding='utf-8')
preview = OUT / 'preview.html'
preview.write_text(externalize_html(preview.read_text(encoding='utf-8')), encoding='utf-8')
print('Orynthiq slice: three responsive source captures;', len(assets), 'local source assets')
