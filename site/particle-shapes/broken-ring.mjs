/* Rounded tube arcs and a sphere, following the supplied white silhouette.
 * The source ring has centre (523, 504), centreline radius 400, tube radius
 * 64, and a detached dot at (139, 760) with radius 80. Normalize by 464.
 * X/Z is the ring plane; Y retains a circular tube's full 3D depth.
 */
const majorRadius = 400 / 464;
const tubeRadius = 64 / 464;
const dotRadius = 80 / 464;
const goldenAngle = Math.PI * (3 - Math.sqrt(5));
const radians = degrees => degrees * Math.PI / 180;
const arcs = [[176.57, 347.28], [16.26, 114.21]].map(([start, end]) => ({
  start: radians(start), end: radians(end),
}));
const parts = [];
for (const arc of arcs) {
  parts.push({ kind: 'tube', arc, area: 2 * Math.PI * tubeRadius * majorRadius * (arc.end - arc.start) });
  parts.push({ kind: 'cap', angle: arc.start, direction: -1, area: 2 * Math.PI * tubeRadius ** 2 });
  parts.push({ kind: 'cap', angle: arc.end, direction: 1, area: 2 * Math.PI * tubeRadius ** 2 });
}
parts.push({ kind: 'dot', area: 4 * Math.PI * dotRadius ** 2 });
const totalArea = parts.reduce((sum, part) => sum + part.area, 0);

export function brokenRingPoint(index, count) {
  let distance = (index + .5) / count * totalArea;
  let part = parts[parts.length - 1];
  for (const candidate of parts) {
    if (distance < candidate.area) { part = candidate; break; }
    distance -= candidate.area;
  }
  const fraction = Math.min(1, Math.max(0, distance / part.area));
  const phi = index * goldenAngle;
  if (part.kind === 'tube') {
    const theta = part.arc.start + fraction * (part.arc.end - part.arc.start);
    const radius = majorRadius + tubeRadius * Math.cos(phi);
    return [radius * Math.cos(theta), tubeRadius * Math.sin(phi), radius * Math.sin(theta)];
  }
  if (part.kind === 'cap') {
    const radial = Math.sqrt(1 - fraction * fraction);
    const cos = Math.cos(part.angle), sin = Math.sin(part.angle);
    const across = radial * Math.cos(phi);
    const along = fraction * part.direction;
    return [majorRadius * cos + tubeRadius * (across * cos - along * sin),
      tubeRadius * radial * Math.sin(phi),
      majorRadius * sin + tubeRadius * (across * sin + along * cos)];
  }
  const latitude = 1 - 2 * fraction;
  const radius = Math.sqrt(Math.max(0, 1 - latitude * latitude));
  return [(139 - 523) / 464 + dotRadius * radius * Math.cos(phi),
    dotRadius * radius * Math.sin(phi), (760 - 504) / 464 + dotRadius * latitude];
}
