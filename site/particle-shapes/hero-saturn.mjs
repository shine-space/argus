// Trial switch: 'original' restores the existing three-shape particle orb.
export const heroVisual = 'saturn';

// Time-compressed display: one steady prograde turn per minute. The original
// renderer layers its pointer response and shape transitions over this phase.
export function createEarthMotion() {
  const speed = Math.PI * 2 / 60;
  let angle = 0, previous = null;
  return {
    reset() { previous = null; },
    phase(time, active = true, reduced = false) {
      if (active && !reduced && previous !== null) {
        angle = (angle + Math.max(0, time - previous) / 1000 * speed) % (Math.PI * 2);
      }
      previous = active && !reduced ? time : null;
      return angle;
    }
  };
}

const fract = value => value - Math.floor(value);
const noise = index => fract(Math.sin(index * 127.1 + 311.7) * 43758.5453);

/** Add two orbital layers without changing the original sphere's renderer or size. */
export function mountSaturnRings(referenceCanvas, host, {mobile = false, reducedMotion = false, color = '243,106,75'} = {}) {
  const backCanvas = document.createElement('canvas');
  const frontCanvas = document.createElement('canvas');
  const back = backCanvas.getContext('2d'), front = frontCanvas.getContext('2d');
  if (!back || !front) return () => {};
  for (const [canvas, depth] of [[backCanvas, 0], [frontCanvas, 2]]) {
    canvas.setAttribute('aria-hidden', 'true');
    canvas.dataset.saturnRing = depth === 0 ? 'back' : 'front';
    Object.assign(canvas.style, {position: 'absolute', width: '240%', height: '240%',
      left: '-70%', top: '-70%', pointerEvents: 'none', zIndex: String(depth)});
  }
  const oldIndex = referenceCanvas.style.zIndex;
  referenceCanvas.style.zIndex = '1';
  host.dataset.heroVisual = 'saturn';
  host.prepend(backCanvas); host.append(frontCanvas);

  const particles = [];
  const count = mobile ? 2800 : 7200;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < count; index++) {
    const radius = Math.sqrt(1.25 ** 2 + noise(index + 6200) * (1.92 ** 2 - 1.25 ** 2));
    if (radius > 1.57 && radius < 1.63) continue;
    particles.push([radius, index * golden, (noise(index + 12900) - .5) * .018,
      .45 + noise(index + 21100) * .55, .7 + noise(index + 31300) * .85]);
  }
  const ratio = Math.min(mobile ? 1.25 : 1.5, window.devicePixelRatio || 1);
  const palette = Array.from({length: 64}, (_, level) => `rgba(${color},${(level + 1) / 64})`);
  const highlights = Array.from({length: 64}, (_, level) => `rgba(255,192,158,${(level + 1) / 64})`);
  const tilt = .36, roll = -.43;
  const ct = Math.cos(tilt), st = Math.sin(tilt), cr = Math.cos(roll), sr = Math.sin(roll);
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width = 0, height = 0, coreRadius = 0, elapsed = 0, lastTime = 0;
  let visible = true, frame = 0, drawn = false;
  let sphereActive = (host.getAttribute('data-core-shape') || '0') === '0';

  const project = (radius, angle, vertical = 0) => {
    const x = Math.cos(angle) * radius, z = Math.sin(angle) * radius;
    const y = vertical * ct - z * st;
    return [x * cr - y * sr, x * sr + y * cr, vertical * st + z * ct];
  };
  const dot = (context, x, y, size, opacity, bright = false) => {
    context.fillStyle = (bright ? highlights : palette)[Math.max(0, Math.min(63, Math.round(opacity * 63)))];
    context.fillRect(x - size / 2, y - size / 2, size, size);
  };
  const resize = () => {
    const bounds = frontCanvas.getBoundingClientRect();
    const original = referenceCanvas.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    // Match the old perspective sphere's silhouette, using its untouched canvas.
    coreRadius = Math.min(original.width, original.height) * .33 * 2.6 / Math.sqrt(2.6 ** 2 - .9 ** 2);
    for (const canvas of [backCanvas, frontCanvas]) {
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    }
    drawn = false;
  };
  const draw = time => {
    if (lastTime && time - lastTime < (mobile ? 40 : 33)) return;
    if (!width || !height || (reducedMotion && drawn)) return;
    if (!reducedMotion && lastTime) elapsed += Math.min(.075, (time - lastTime) / 1000);
    lastTime = time;
    const spin = elapsed * .39;
    const centerX = width / 2, centerY = height / 2;
    for (const context of [back, front]) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
    }
    for (let index = 0; index < particles.length; index++) {
      const [radius, phase, vertical, strength, size] = particles[index];
      const angle = phase + spin / Math.pow(radius / 1.55, 1.5);
      const [x, y, z] = project(radius, angle, vertical);
      const near = z < 0;
      // Far-side particles disappear behind the existing central sphere.
      if (!near && x * x + y * y < 1.015 ** 2) continue;
      const opacity = (near ? .77 : .40) * strength * (.85 + .15 * Math.sin(angle * 4 - spin));
      dot(near ? front : back, centerX + x * coreRadius, centerY + y * coreRadius,
        size * (mobile ? .8 : 1), opacity, index % 23 === 0);
    }
    // Bright orbiting stars make the ring's revolution easy to see.
    for (let index = 0; index < 7; index++) {
      const radius = 1.3 + (index % 4) * .18;
      const angle = index * golden + spin / Math.pow(radius / 1.55, 1.5);
      const [x, y, z] = project(radius, angle);
      const near = z < 0;
      if (!near && x * x + y * y < 1.015 ** 2) continue;
      const context = near ? front : back;
      const px = centerX + x * coreRadius, py = centerY + y * coreRadius;
      const glow = context.createRadialGradient(px, py, 0, px, py, 6);
      glow.addColorStop(0, `rgba(${color},.45)`); glow.addColorStop(1, `rgba(${color},0)`);
      context.fillStyle = glow; context.fillRect(px - 6, py - 6, 12, 12);
      dot(context, px, py, near ? 2.3 : 1.6, near ? .95 : .5, true);
    }
    drawn = true;
  };
  const tick = time => {
    frame = 0;
    if (!sphereActive || !visible || document.hidden) return;
    draw(time);
    if (!reducedMotion) frame = requestAnimationFrame(tick);
  };
  const resume = () => {
    if (!frame && sphereActive && visible && !document.hidden) frame = requestAnimationFrame(tick);
  };
  const syncShape = () => {
    sphereActive = (host.getAttribute('data-core-shape') || '0') === '0';
    for (const canvas of [backCanvas, frontCanvas]) {
      canvas.style.visibility = sphereActive ? 'visible' : 'hidden';
    }
    host.dataset.saturnRings = sphereActive ? 'visible' : 'hidden';
    lastTime = 0; drawn = false;
    if (!sphereActive && frame) { cancelAnimationFrame(frame); frame = 0; }
    resume();
  };
  const shapeObserver = new MutationObserver(syncShape);
  shapeObserver.observe(host, {attributes: true, attributeFilter: ['data-core-shape']});
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    lastTime = 0;
    if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    resume();
  }, {rootMargin: '40px'});
  observer.observe(host);
  const sizeObserver = new ResizeObserver(() => { resize(); resume(); });
  sizeObserver.observe(host);
  const visibility = () => {
    lastTime = 0;
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
    resume();
  };
  const onPreference = () => { reducedMotion = preference.matches; drawn = false; resume(); };
  document.addEventListener('visibilitychange', visibility);
  preference.addEventListener('change', onPreference);
  resize(); syncShape();
  return () => {
    cancelAnimationFrame(frame); observer.disconnect(); sizeObserver.disconnect(); shapeObserver.disconnect();
    document.removeEventListener('visibilitychange', visibility);
    preference.removeEventListener('change', onPreference);
    referenceCanvas.style.zIndex = oldIndex;
    backCanvas.remove(); frontCanvas.remove(); delete host.dataset.heroVisual; delete host.dataset.saturnRings;
  };
}
