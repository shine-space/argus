"""Sample the supplied SVG silhouette for the existing opening particle loader."""
from pathlib import Path
import json
import re
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'site/particle-shapes/loader-mark-reference.svg'
OUT = ROOT / 'site/particle-shapes'
RECON = ROOT / 'RECON/loader-mark'
OUT.mkdir(exist_ok=True)
RECON.mkdir(exist_ok=True)
svg = ET.parse(SOURCE).getroot()
left, top, width, height = map(float, svg.attrib['viewBox'].split())
scale = 32


def contours(data):
    tokens = re.findall(r'[A-Za-z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?', data)
    index, command, point, start = 0, None, (0., 0.), (0., 0.)
    loop, result = [], []
    counts = {'M': 2, 'L': 2, 'C': 6}
    while index < len(tokens):
        if tokens[index].isalpha():
            command = tokens[index]
            index += 1
        if command == 'Z':
            if loop:
                result.append(loop)
            loop, point, command = [], start, None
            continue
        if command not in counts:
            raise ValueError(f'Unsupported SVG command: {command}')
        count = counts[command]
        values = list(map(float, tokens[index:index + count]))
        index += count
        if command == 'M':
            if loop:
                result.append(loop)
            point = start = tuple(values)
            loop = [point]
            command = 'L'
        elif command == 'L':
            point = tuple(values)
            loop.append(point)
        else:
            a, b, c, d = np.array(point), np.array(values[:2]), np.array(values[2:4]), np.array(values[4:])
            for t in np.linspace(0, 1, 65)[1:]:
                loop.append(tuple((1-t)**3*a + 3*(1-t)**2*t*b + 3*(1-t)*t*t*c + t**3*d))
            point = tuple(d)
    if loop:
        result.append(loop)
    return result


size = (round(width * scale), round(height * scale))
mask = np.zeros((size[1], size[0]), dtype=bool)
paths = svg.findall('.//{http://www.w3.org/2000/svg}path')
hole_count = 0
for path in paths:
    winding = np.zeros_like(mask, dtype=np.int16)
    loops = contours(path.attrib['d'])
    hole_count += max(0, len(loops) - 1)
    for loop in loops:
        area = sum(a[0]*b[1] - b[0]*a[1] for a, b in zip(loop, loop[1:] + loop[:1]))
        if not area:
            continue
        layer = Image.new('L', size)
        ImageDraw.Draw(layer).polygon([((x-left)*scale, (y-top)*scale) for x, y in loop], fill=1)
        winding += np.asarray(layer, dtype=np.int16) * (1 if area > 0 else -1)
    # Apply SVG's default nonzero winding per path, preserving character holes.
    mask |= winding != 0

interior = mask.copy()
interior[1:] &= mask[:-1]
interior[:-1] &= mask[1:]
interior[:, 1:] &= mask[:, :-1]
interior[:, :-1] &= mask[:, 1:]
interior[[0, -1], :] = False
interior[:, [0, -1]] = False
boundary = np.argwhere(mask & ~interior)
pixels = np.argwhere(interior)
count = 3900
edge_count = round(count * .45)


def sample(pool, amount):
    indices = ((np.arange(amount) + .5) / amount * len(pool)).astype(int)
    return pool[indices]


# Sample outer contours and counterforms explicitly, then fill the strokes.
points = np.concatenate((sample(boundary, edge_count), sample(pixels, count-edge_count)))
edges = np.concatenate((np.ones(edge_count, dtype=int), np.zeros(count-edge_count, dtype=int)))
order = np.random.default_rng(3371).permutation(count)
points, edges = points[order], edges[order]
normalized = [[round((float(x)+.5)/size[0], 6), round((float(y)+.5)/size[1], 6)] for y, x in points]
(OUT / 'loader-mark.mjs').write_text(
    '/* Opening loader silhouette sampled from the supplied 1.svg. */\n'
    f'export const loaderMarkAspect={width/height};\n'
    'export const loaderMarkPoints=new Float32Array(' + json.dumps([v for p in normalized for v in p], separators=(',', ':')) + ');\n', encoding='utf-8')
(OUT / 'loader-mark-data.js').write_text(
    '/* Precomputed SVG geometry: no font or application runtime needed. */\n'
    'window.__fcLoaderMark=' + json.dumps({'aspect': width/height, 'points': normalized, 'edges': edges.tolist()}, separators=(',', ':')) + ';\n', encoding='utf-8')
Image.fromarray(mask.astype(np.uint8)*255).save(RECON / 'reference-mask.png')
preview = Image.new('RGB', size, '#07100C')
draw = ImageDraw.Draw(preview)
for x, y in normalized:
    draw.ellipse((x*size[0]-2, y*size[1]-2, x*size[0]+2, y*size[1]+2), fill='#F36A4B')
preview.save(RECON / 'particle-silhouette.png')
report = {'source': str(SOURCE), 'paths': len(paths), 'compoundHoles': hole_count, 'viewBox': [left, top, width, height], 'points': count, 'edgePoints': edge_count, 'mobilePoints': 1950, 'preserves': 'SVG nonzero winding and inner counterforms; contour-weighted particle sampling'}
(RECON / 'manifest.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report))
