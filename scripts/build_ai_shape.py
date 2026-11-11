"""Sample the supplied SVG faces and extruded contour walls as a particle target."""
from pathlib import Path
import json
import re
import shutil
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('C:/Users/ishin/Desktop/AI.svg')
OUT = ROOT / 'site/brand'
RECON = ROOT / 'RECON/ai-shape'
OUT.mkdir(exist_ok=True)
RECON.mkdir(exist_ok=True)
svg = ET.parse(SOURCE).getroot()
_, _, width, height = map(float, svg.attrib['viewBox'].split())
scale = 40
image = Image.new('L', (round(width * scale), round(height * scale)))
draw = ImageDraw.Draw(image)


def contours(path):
    tokens = re.findall(r'[A-Za-z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?', path)
    at, command, point, start = 0, None, (0., 0.), (0., 0.)
    contour, result = [], []
    counts = {'M': 2, 'L': 2, 'H': 1, 'V': 1, 'C': 6}
    while at < len(tokens):
        if tokens[at].isalpha():
            command = tokens[at]
            at += 1
        if command == 'Z':
            contour.append(start)
            result.append(contour)
            contour, point, command = [], start, None
            continue
        if command not in counts:
            raise ValueError(f'Unsupported SVG command: {command}')
        count = counts[command]
        values = list(map(float, tokens[at:at + count]))
        at += count
        if command == 'M':
            if contour:
                result.append(contour)
            point = start = tuple(values)
            contour = [point]
            command = 'L'
        elif command == 'L':
            point = tuple(values)
            contour.append(point)
        elif command == 'H':
            point = (values[0], point[1])
            contour.append(point)
        elif command == 'V':
            point = (point[0], values[0])
            contour.append(point)
        else:
            a, b, c, d = np.array(point), np.array(values[:2]), np.array(values[2:4]), np.array(values[4:])
            for t in np.linspace(0, 1, 13)[1:]:
                contour.append(tuple((1-t)**3*a + 3*(1-t)**2*t*b + 3*(1-t)*t*t*c + t**3*d))
            point = tuple(d)
    if contour:
        result.append(contour)
    return result


paths = svg.findall('{http://www.w3.org/2000/svg}path')
for path in paths:
    loops = contours(path.attrib['d'])
    # All supplied paths are single filled outlines, with no compound holes.
    if len(loops) != 1:
        raise ValueError('Inspect compound SVG paths before sampling')
    draw.polygon([(x * scale, y * scale) for x, y in loops[0]], fill=255)
image.save(RECON / 'source-mask.png')
mask = np.asarray(image) > 127
inside = np.zeros_like(mask)
inside[1:-1, 1:-1] = mask[1:-1, 1:-1] & mask[:-2, 1:-1] & mask[2:, 1:-1] & mask[1:-1, :-2] & mask[1:-1, 2:]
edge = mask & ~inside
face_pixels, edge_pixels = np.argwhere(mask), np.argwhere(edge)
rng = np.random.default_rng(463)
points = []
count, world_width, depth = 4200, 2.4, .32
for index in range(count):
    side = index % 4
    pool = edge_pixels if side == 3 else face_pixels
    y, x = pool[rng.integers(len(pool))]
    z = rng.uniform(-depth / 2, depth / 2) if side == 3 else (-depth / 2 if side < 2 else depth / 2)
    points.extend([round(((x + .5) / scale / width - .5) * world_width, 5),
                   round(((y + .5) / scale / height - .5) * world_width * height / width, 5), round(float(z), 5)])
(OUT / 'ai-shape-points.mjs').write_text('/* Extruded from the user-supplied AI.svg outline. */\nexport const aiShapePoints = new Float32Array(' + json.dumps(points, separators=(',', ':')) + ');\n', encoding='utf-8')
shutil.copyfile(SOURCE, OUT / 'ai-shape-reference.svg')
(RECON / 'manifest.json').write_text(json.dumps({'source': str(SOURCE), 'paths': len(paths), 'viewBox': [0, 0, width, height], 'points': count, 'worldWidth': world_width, 'depth': depth, 'faces': 'front 50%, back 25%, contour walls 25%'}, indent=2), encoding='utf-8')
print(f'SVG particle target: {count} points, {len(paths)} exact outlines, {depth} extrusion depth')
