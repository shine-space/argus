/* Native source DOM, scoped styles, local assets. No third-party site runtime. */
(() => {
  const base = '/orynthiq/';
  const fragments = new Map();
  const fragment = name => {
    if (!fragments.has(name)) fragments.set(name, fetch(base + name + '.html').then(response => response.text()));
    return fragments.get(name);
  };
  class OrynthiqIntro extends HTMLElement {
    constructor() {
      super();
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      this.onResize = () => this.render();
      this.onScroll = () => {
        if (this.frame) return;
        this.frame = requestAnimationFrame(() => {
          this.frame = 0;
          const y = Math.max(0, -this.getBoundingClientRect().top) * .2;
          const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
          this.shadowRoot.querySelectorAll('.framer-hxdyr4').forEach(node => {
            node.style.transform = reduced ? 'none' : `translateY(${y}px)`;
          });
        });
      };
    }
    connectedCallback() {
      this.lang = 'zh-CN';
      addEventListener('resize', this.onResize, { passive: true });
      addEventListener('scroll', this.onScroll, { passive: true });
      this.render();
    }
    disconnectedCallback() {
      removeEventListener('resize', this.onResize);
      removeEventListener('scroll', this.onScroll);
      cancelAnimationFrame(this.frame);
      this.imageObserver?.disconnect();
      this.clearMotion();
      this.screenObserver?.disconnect();
    }
    setupImages() {
      this.imageObserver?.disconnect();
      const load = image => {
        if (image.dataset.srcset) image.srcset = image.dataset.srcset;
        image.src = image.dataset.src;
        delete image.dataset.src;
        delete image.dataset.srcset;
      };
      const images = this.shadowRoot.querySelectorAll('img[data-src]');
      if (!('IntersectionObserver' in window)) { images.forEach(load); return; }
      this.imageObserver = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          load(entry.target);
          this.imageObserver.unobserve(entry.target);
        }
      }, { rootMargin: '400px' });
      images.forEach(image => this.imageObserver.observe(image));
    }
    clearMotion() {
      this.observers?.forEach(observer => observer.disconnect());
      this.animations?.forEach(animation => animation.cancel());
      this.countFrames?.forEach(frame => cancelAnimationFrame(frame));
      this.observers = [];
      this.animations = [];
      this.countFrames = [];
    }
    setupLaptopScreen() {
      this.screenObserver?.disconnect();
      this.shadowRoot.querySelectorAll('.framer-c7depz').forEach(laptop => {
        const screen = document.createElement('div');
        screen.className = 'laptop-live-screen';
        const demo = document.createElement('digital-employee-conversation');
        demo.setAttribute('laptop', '');
        demo.lang = 'zh-CN';
        screen.append(demo);
        laptop.append(screen);
      });
      this.screenObserver = new ResizeObserver(entries => {
        entries.forEach(({ target, contentRect }) => {
          target.style.setProperty('--screen-scale', contentRect.width / 1240);
        });
      });
      this.shadowRoot.querySelectorAll('.laptop-live-screen').forEach(screen => this.screenObserver.observe(screen));
    }
    setupPrimaryAction() {
      this.shadowRoot.querySelectorAll('#home a[name="即刻体验"]').forEach(button => {
      button.parentElement.classList.add('fc', 'fc-dark', 'intro-primary-action');
      button.className = 'fc-btn fc-solid';
      button.removeAttribute('style');
      button.innerHTML = '<span class="fc-cap"><span class="fc-lbl"><span class="fc-l1">即刻体验</span><span class="fc-l2" aria-hidden="true">即刻体验</span></span><span class="fc-arr" aria-hidden="true"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></span>';
      });
    }
    setupMotion() {
      this.clearMotion();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const enter = (selector, start, duration, easing, delay = 0, threshold = .15) => {
        this.shadowRoot.querySelectorAll(selector).forEach(node => {
          node.style.transform = start;
          const observer = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) return;
            observer.disconnect();
            this.animations.push(node.animate([{ transform: start }, { transform: 'none' }], { duration, easing, delay, fill: 'both' }));
            node.style.transform = 'none';
          }, { threshold });
          observer.observe(node);
          this.observers.push(observer);
        });
      };
      // Source homepage: mv/vv + hv; platform/metrics: bv + xv/Sv/Cv.
      if (this.dataset.ready !== 'ssr') {
      enter('.framer-1aus0yj', 'translateY(32px) scale(1.1)', 1600, 'cubic-bezier(.61,0,0,1)', 0, 0);
      enter('.framer-c7depz', 'translateY(130px)', 1600, 'cubic-bezier(.61,0,0,1)', 0, 0);
      }
      enter('.framer-1bag8q3,.framer-1xmyx8s-container', 'scale(1.1)', 1000, 'cubic-bezier(.22,1,.36,1)');
      enter('.framer-142xrri-container', 'scale(1.1)', 1000, 'cubic-bezier(.22,1,.36,1)', 100);
      enter('.framer-1r7fcdj-container', 'scale(1.1)', 1000, 'cubic-bezier(.22,1,.36,1)', 200);
      // Source shared-lib je: 1400ms cubic ease-out; preserve leading zeroes.
      this.shadowRoot.querySelectorAll('.framer-u32k4s').forEach(node => {
        const text = node.querySelector('p');
        const original = text.textContent;
        const target = parseInt(original, 10);
        const observer = new IntersectionObserver(entries => {
          if (!entries[0].isIntersecting) return;
          observer.disconnect();
          const start = performance.now();
          const step = now => {
            const progress = Math.min(1, (now - start) / 1400);
            const value = Math.round(target * (1 - (1 - progress) ** 3));
            text.textContent = (original.startsWith('0') ? String(value).padStart(2, '0') : String(value)) + original.replace(/^\s*\d+/, '');
            if (progress < 1) this.countFrames.push(requestAnimationFrame(step));
            else text.textContent = original;
          };
          this.countFrames.push(requestAnimationFrame(step));
        }, { threshold: .6 });
        observer.observe(node);
        this.observers.push(observer);
      });
    }
    async render() {
      const name = matchMedia('(max-width:809.98px)').matches ? 'mobile' : matchMedia('(max-width:1199.98px)').matches ? 'tablet' : 'desktop';
      if (this.initialized && this.dataset.ready === 'ssr') return;
      if (name === this.breakpoint) return;
      this.breakpoint = name;
      const serverRendered = this.dataset.ready === 'ssr';
      const html = serverRendered ? null : await fragment(name);
      if (name !== this.breakpoint || !this.isConnected) return;
      if (!serverRendered) this.shadowRoot.innerHTML = `<link rel="stylesheet" href="${base}source.css"><link rel="stylesheet" href="/styles/blocks/6c8fadfe-3b35.css"><link rel="stylesheet" href="${base}laptop-screen.css?v=3"><link rel="stylesheet" href="/typography.css?v=3">${html}`;
      const overline = this.shadowRoot.querySelector('[data-framer-name="Hero Overline"]');
      if (overline) {
        const badge = document.createElement('p');
        badge.className = 'intro-service-badge';
        badge.innerHTML = '<i aria-hidden="true"></i>企业级 AI Agent 平台';
        overline.replaceWith(badge);
      }
      this.shadowRoot.querySelector('h1')?.style.setProperty('font-size', innerWidth <= 809 ? '36px' : '56px', 'important');
      await Promise.all([...this.shadowRoot.querySelectorAll('link[rel="stylesheet"]')].map(link =>
        link.sheet ? Promise.resolve() : new Promise((resolve, reject) => {
          link.addEventListener('load', resolve, { once: true });
          link.addEventListener('error', () => reject(new Error(`Stylesheet failed: ${link.href}`)), { once: true });
        })));
      if (name !== this.breakpoint || !this.isConnected) return;
      this.setupPrimaryAction();
      this.setupLaptopScreen();
      const hero = this.shadowRoot.querySelector('#home');
      hero?.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse') return;
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty('--glow-x', (event.clientX - bounds.left) + 'px');
        hero.style.setProperty('--glow-y', (event.clientY - bounds.top) + 'px');
        hero.classList.add('has-pointer-glow');
      }, { passive: true });
      hero?.addEventListener('pointerleave', () => hero.classList.remove('has-pointer-glow'));
      this.setupImages();
      this.setupMotion();
      this.dataset.ready = serverRendered ? 'ssr' : name;
      this.onScroll();
      if (!this.initialized && location.hash === '#orynthiq-intro') this.scrollIntoView({ block: 'start' });
      this.initialized = true;
    }
  }
  customElements.define('orynthiq-intro', OrynthiqIntro);
  if (!/^\/product\/agent\/?$/.test(location.pathname)) return;
  const mount = () => {
    if (document.getElementById('orynthiq-intro')) return;
    const target = document.querySelector('[data-framer-name="S0 FcPageHero"]');
    if (!target) return;
    const host = document.createElement('orynthiq-intro');
    host.id = 'orynthiq-intro';
    target.before(host);
  };
  new MutationObserver(mount).observe(document.body, { childList: true, subtree: true });
  mount();
})();
