const portraits = [
  ...['analyst', 'finance', 'purchasing', 'planner', 'product'].map(name => '/office-conversation/assets/employee-' + name + '.png'),
  ...['service', 'procurement', 'operations', 'it', 'finance'].map(name => '/review-portraits/' + name + '.webp'),
  ...['review', 'project-lead', 'planner', 'marketing'].map(name => '/coze-team/assets/' + name + '.png')
];

class EmployeeWall extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount) return;
    const count = 24;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bodies = Array.from({ length: count }, (_, index) => {
      const image = new Image();
      image.src = portraits[index % portraits.length];
      image.alt = '';
      image.draggable = false;
      this.append(image);
      return { image, size: .8 + Math.random() * .4, lane: Math.random(), vx: Math.random() * 3 - 1.5, vy: 0,
        angle: Math.random() * 36 - 18, spin: Math.random() * 5 - 2.5 };
    });

    const play = () => {
      const width = this.clientWidth;
      const height = this.clientHeight;
      const diameter = .72 * Math.min(116, 2 * Math.sqrt(width * height * .4 / (Math.PI * count)));
      bodies.forEach((body, index) => {
        body.r = diameter * body.size / 2;
        body.x = body.r + (width - 2 * body.r) * body.lane;
        body.y = -body.r - Math.random() * 85;
        body.image.style.width = body.r * 2 + 'px';
        body.image.style.height = body.r * 2 + 'px';
        if (reduced) {
          body.x = width * ((index % 6) + .5) / 6;
          body.y = height * .28 + Math.floor(index / 6) * height * .18;
          body.r = Math.min(body.r, width * .9 / 13, height * .9 / 12);
          body.image.style.width = body.image.style.height = body.r * 2 + 'px';
          this.paint(body);
        }
      });
      if (reduced) return;

      const start = performance.now();
      let previous = start;
      let simulated = 0;
      let nextNudge = 4800;
      let nudgeIndex = 0;
      const tick = now => {
        if (!this.isConnected) return;
        const step = Math.min(2, (now - previous) / 16.667);
        previous = now;
        simulated += step * 16.667;
        const active = bodies.slice(0, 1 + Math.floor(simulated / 55));
        if (simulated >= nextNudge) {
          const body = bodies[nudgeIndex++ % bodies.length];
          const direction = nudgeIndex % 2 ? 1 : -1;
          body.vx += direction * 1.4;
          body.vy -= 2.8;
          body.spin += direction * .35;
          nextNudge += 180;
        }
        for (const body of active) {
          body.vx *= Math.pow(.988, step);
          body.vy = body.vy * Math.pow(.988, step) + .65 * step;
          body.x += body.vx * step;
          body.y += body.vy * step;
          body.angle += body.spin * step;
          body.spin *= Math.pow(.988, step);
        }
        for (let pass = 0; pass < 4; pass++) {
          active.forEach((a, index) => {
            for (const b of active.slice(index + 1)) {
              const dx = b.x - a.x, dy = b.y - a.y;
              const distance = Math.hypot(dx, dy);
              const overlap = a.r + b.r - distance;
              if (overlap <= 0 || distance === 0) continue;
              const nx = dx / distance, ny = dy / distance;
              a.x -= nx * overlap / 2; a.y -= ny * overlap / 2;
              b.x += nx * overlap / 2; b.y += ny * overlap / 2;
              const impulse = .66 * ((a.vx - b.vx) * nx + (a.vy - b.vy) * ny);
              if (impulse <= 0) continue;
              a.vx -= impulse * nx; a.vy -= impulse * ny;
              b.vx += impulse * nx; b.vy += impulse * ny;
            }
            if (a.x < a.r || a.x > width - a.r) {
              a.x = Math.max(a.r, Math.min(width - a.r, a.x));
              a.vx *= -.32;
            }
            if (a.y > height - a.r) {
              a.y = height - a.r;
              a.vy *= -.32;
              a.vx *= .7;
              a.spin *= .7;
            }
          });
        }
        active.forEach(body => this.paint(body));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      play();
    }, { threshold: .25 });
    observer.observe(this);
  }

  paint({ image, x, y, r, angle }) {
    image.style.setProperty('--avatar-x', x - r + 'px');
    image.style.setProperty('--avatar-y', y - r + 'px');
    image.style.setProperty('--avatar-angle', angle + 'deg');
    image.style.visibility = 'visible';
  }
}

customElements.define('employee-wall', EmployeeWall);
