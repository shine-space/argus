/* Homepage opening: paint independently of Framer hydration and font loading. */
(() => {
  'use strict';
  const root = document.documentElement;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !window.__fcLoaderMark) return;
  try { if (sessionStorage.getItem('fc-loaded')) return; } catch (_) {}

  window.__fcEarlyLoaderActive = true;
  root.classList.add('fc-hold-early');
  let overlay, observer, frame, safety, finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frame);
    clearTimeout(safety);
    observer?.disconnect();
    overlay?.remove();
    root.classList.remove('fc-hold-early');
    window.__fcEarlyLoaderActive = false;
    motion.removeEventListener('change', finish);
  };
  const mount = () => {
    if (!document.body || finished) return;
    observer?.disconnect();
    try {
      overlay = document.createElement('div');
      overlay.id = 'fc-opening-loader';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483000;overflow:hidden;touch-action:none;background:radial-gradient(ellipse at center,#101b14 0%,#07100c 70%);';
      const canvas = document.createElement('canvas');
      canvas.style.cssText = 'display:block;width:100%;height:100%;';
      overlay.append(canvas);
      document.body.append(overlay);
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) { finish(); return; }
      try { sessionStorage.setItem('fc-loaded', '1'); } catch (_) {}

      const width = innerWidth, height = innerHeight, small = width < 810;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.scale(dpr, dpr);
      const geometry = window.__fcLoaderMark;
      const markHeight = Math.min(width * (small ? .2 : .14), height * .26, 220);
      const markWidth = markHeight * geometry.aspect;
      const cx = width / 2, cy = height / 2;
      const particles = geometry.points.filter((_, i) => !small || i % 2 === 0).map((point, i) => {
        const source = small ? i * 2 : i;
        const angle = i * 2.399963;
        const radius = Math.min(width, height) * (.12 + ((i * 137) % 997) / 997 * .32);
        return {
          x: (point[0] - .5) * markWidth,
          y: (point[1] - .5) * markHeight,
          sx: Math.cos(angle) * radius,
          sy: Math.sin(angle) * radius,
          edge: geometry.edges[source] === 1,
          white: i % 19 === 0,
          size: (small ? .65 : .9) + (i % 5) * .1,
          delay: (i % 17) / 17 * 60,
        };
      });
      const ease = x => 1 - (1 - Math.min(1, Math.max(0, x))) ** 3;
      const smooth = x => {
        x = Math.min(1, Math.max(0, x));
        return x * x * (3 - 2 * x);
      };
      const began = performance.now();
      let released = false;
      const draw = now => {
        if (finished) return;
        const elapsed = now - began;
        if (elapsed >= 1960) { finish(); return; }
        const leaving = smooth((elapsed - 1120) / 440);
        const contraction = 1 - leaving;
        const opacity = (.08 + .92 * smooth(elapsed / 180)) * (1 - leaving ** 3);
        ctx.clearRect(0, 0, width, height);
        // Three batches retain contour contrast without thousands of fill calls.
        for (let layer = 0; layer < 3; layer++) {
          ctx.beginPath();
          ctx.fillStyle = layer === 2 ? '#f4f2eb' : layer === 1 ? '#ff895f' : '#f36747';
          ctx.globalAlpha = (layer === 0 ? .72 : .94) * opacity;
          for (const p of particles) {
            if ((p.white ? 2 : p.edge ? 1 : 0) !== layer) continue;
            const assembled = smooth((elapsed - p.delay) / 620);
            const orbit = elapsed * .0012 * (1 - assembled);
            const sx = p.sx * Math.cos(orbit) - p.sy * Math.sin(orbit);
            const sy = p.sx * Math.sin(orbit) + p.sy * Math.cos(orbit);
            const x = cx + (sx * (1 - assembled) + p.x * assembled) * contraction;
            const y = cy + (sy * (1 - assembled) + p.y * assembled) * contraction;
            const size = p.size * Math.max(.25, contraction);
            ctx.moveTo(x + size, y);
            ctx.arc(x, y, size, 0, Math.PI * 2);
          }
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        overlay.dataset.phase = elapsed < 680 ? 'assemble' : elapsed < 1120 ? 'word' : elapsed < 1560 ? 'core' : 'reveal';
        if (elapsed >= 1560) {
          if (!released) {
            released = true;
            root.classList.remove('fc-hold-early');
            overlay.style.pointerEvents = 'none';
          }
          const radius = ease((elapsed - 1560) / 400) * Math.hypot(cx, cy) * 1.02;
          overlay.style.maskImage = `radial-gradient(circle at center,transparent ${radius}px,#000 ${radius + 1}px)`;
        }
        frame = requestAnimationFrame(draw);
      };
      // Do not wait for requestAnimationFrame, webfonts, or the application bundle.
      draw(began);
    } catch (_) { finish(); }
  };
  motion.addEventListener('change', finish);
  safety = setTimeout(finish, 3200);
  if (document.body) mount();
  else {
    observer = new MutationObserver(mount);
    observer.observe(root, { childList: true });
  }
})();
