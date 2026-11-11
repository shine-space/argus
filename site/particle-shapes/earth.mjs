import {earthPointData} from './earth-points.mjs';

const clouds = new Map();

function pointCloud(mobile) {
  if (clouds.has(mobile)) return clouds.get(mobile);
  const bytes = Uint8Array.from(atob(earthPointData), char => char.charCodeAt(0));
  const data = new DataView(bytes.buffer);
  const points = [];
  for (let offset = 0; offset < bytes.length; offset += 5) {
    const kind = data.getUint8(offset + 4);
    if (mobile && kind === 0 && (offset / 5) % 2) continue;
    const lon = data.getInt16(offset, true) * Math.PI / 18000;
    const lat = data.getInt16(offset + 2, true) * Math.PI / 18000;
    const radius = Math.cos(lat);
    points.push(radius * Math.sin(lon), -Math.sin(lat), -radius * Math.cos(lon), kind);
  }
  const cloud = new Float32Array(points);
  clouds.set(mobile, cloud);
  return cloud;
}

/** Paint a rotating, opaque globe; the hidden hemisphere never shines through land or ocean. */
export function createEarthRenderer(canvas, {mobile = false, reducedMotion = false, color = '243,106,75', hovered = () => false} = {}) {
  const context = canvas.getContext('2d');
  if (!context) return () => {};
  const points = pointCloud(mobile);
  const ratio = Math.min(1.75, window.devicePixelRatio || 1);
  let width = 0, height = 0, rotation = -.38, lastTime = 0, drawn = false;
  const colors = Array.from({length: 3}, (_, kind) => Array.from({length: 40}, (_, level) => {
    const alpha = (level + 1) / 40;
    return `rgba(${kind === 1 ? '255,188,158' : color},${alpha})`;
  }));

  return function drawEarth(time) {
    if (lastTime && time - lastTime < (mobile ? 40 : 33)) return;
    const rect = canvas.getBoundingClientRect();
    const resized = width !== rect.width || height !== rect.height;
    if (resized) {
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      drawn = false;
    }
    if (reducedMotion && drawn) return;
    const delta = lastTime ? Math.min(.08, (time - lastTime) / 1000) : 0;
    lastTime = time;
    if (!reducedMotion) rotation += delta * (hovered() ? .055 : .035);
    const spinCos = Math.cos(rotation), spinSin = Math.sin(rotation);
    const tilt = -.12, tiltCos = Math.cos(tilt), tiltSin = Math.sin(tilt);
    const radius = Math.min(width, height) * .4;
    const centerX = width / 2, centerY = height / 2;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = 'source-over';

    // A restrained limb describes the planet even where the visible hemisphere is ocean.
    const limb = context.createRadialGradient(centerX, centerY, radius * .94, centerX, centerY, radius * 1.05);
    limb.addColorStop(0, `rgba(${color},0)`);
    limb.addColorStop(.65, `rgba(${color},.055)`);
    limb.addColorStop(1, `rgba(${color},0)`);
    context.fillStyle = limb;
    context.beginPath();
    context.arc(centerX, centerY, radius * 1.05, 0, Math.PI * 2);
    context.fill();

    for (let offset = 0; offset < points.length; offset += 4) {
      const x = points[offset] * spinCos - points[offset + 2] * spinSin;
      const spinZ = points[offset] * spinSin + points[offset + 2] * spinCos;
      const y = points[offset + 1] * tiltCos - spinZ * tiltSin;
      const z = points[offset + 1] * tiltSin + spinZ * tiltCos;
      // Perspective camera at -3.5: clip the far side at the true tangent, not the equator.
      if (z > -1 / 3.5) continue;
      const perspective = 3.5 / (3.5 + z);
      const kind = points[offset + 3];
      const depth = Math.max(0, Math.min(1, (-z - 1 / 3.5) / .715));
      const jitter = ((offset * 9301 + 49297) % 233280) / 233280;
      const opacity = (kind === 2 ? .04 : kind === 1 ? .36 : .22) + depth * (kind === 2 ? .055 : .25);
      const level = Math.min(39, Math.floor(opacity * (0.7 + jitter * .3) * 40));
      const size = (kind === 1 ? .85 : kind === 2 ? .65 : .75 + jitter * .55) * perspective;
      context.fillStyle = colors[kind][level];
      context.fillRect(centerX + x * radius * perspective - size / 2,
                       centerY + y * radius * perspective - size / 2, size, size);
    }
    drawn = true;
  };
}
