const home = location.pathname === '/' || location.pathname === '/index.html';
const particlePreview = new URLSearchParams(location.search).get('view') === 'particle-core';

if (home && !particlePreview) {
  const homeRoute = () => (location.pathname === '/' || location.pathname === '/index.html') &&
    new URLSearchParams(location.search).get('view') !== 'particle-core';
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pagedScreens = new Set(['applications']);
  const editable = 'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]';
  const controls = 'button, a, summary, [role="button"], [role="tab"], [role="slider"], [role="combobox"], [role="listbox"]';
  const observed = new Set();
  let stops = [];
  let regions = [];
  let measureFrame = 0;
  let moving = false;
  let finishTimer = 0;
  let nativeFrame = 0;
  let wheelAt = 0;
  let wheelDistance = 0;
  let wheelDirection = 0;
  let wheelUsed = false;
  let nativeWheel = false;
  let touch = null;

  document.documentElement.classList.add('home-screen-scroll');

  function blocked() {
    return !homeRoute() || !!document.getElementById('fc-opening-loader') ||
      !!window.__fcLenis?.isStopped ||
      !!document.querySelector('.fchd-burger[aria-expanded="true"]');
  }

  function pathContains(event, selector) {
    return event.composedPath().some(node => node instanceof Element && node.matches(selector));
  }

  function nativeScroller(event, direction) {
    for (const node of event.composedPath()) {
      if (!(node instanceof HTMLElement) || node === document.body || node === document.documentElement) continue;
      if (node.scrollHeight <= node.clientHeight + 2) continue;
      if (!/^(auto|scroll|overlay)$/.test(getComputedStyle(node).overflowY)) continue;
      const remaining = direction > 0 ? node.scrollHeight - node.clientHeight - node.scrollTop : node.scrollTop;
      if (remaining > 2) {
        node.style.overscrollBehaviorY = 'contain';
        return node;
      }
    }
    return null;
  }

  function measure() {
    measureFrame = 0;
    if (!homeRoute()) {
      document.documentElement.classList.remove('home-screen-scroll');
      for (const node of observed) {
        node.removeAttribute('data-home-screen');
        resizeObserver.unobserve(node);
      }
      observed.clear();
      stops = [];
      regions = [];
      moving = false;
      touch = null;
      clearTimeout(finishTimer);
      cancelAnimationFrame(nativeFrame);
      return;
    }
    if (!document.documentElement.classList.contains('home-screen-scroll')) document.documentElement.classList.add('home-screen-scroll');
    const panels = [];
    const add = (element, name, kind = 'content', anchor = element) => {
      if (!element?.isConnected || !element.checkVisibility() || element.getBoundingClientRect().height < 1) return;
      const paged = pagedScreens.has(name);
      if (paged) element.dataset.homeScreen = name;
      else element.removeAttribute('data-home-screen');
      panels.push({element, anchor, name, kind, paged});
    };
    add(document.querySelector('.fc.fch'), 'hero');
    add(document.getElementById('digital-employee-conversation'), 'conversation');
    add(document.getElementById('digital-employee-intro'), 'intro');
    add(document.getElementById('coze-team-workroom'), 'team');
    add(document.getElementById('coze-team-workroom-reversed'), 'workbench');
    add(document.querySelector('.fc.fcs'), 'applications');
    add(document.querySelector('.fc.fcw'), 'delivery');
    add(document.querySelector('.fc.fca'), 'systems', 'pinned');
    add(document.querySelector('.fc.fci'), 'impact', 'steps');
    const reviews = document.querySelector('.fc.fcr');
    add(reviews, 'reviews', 'content', reviews?.closest('[data-framer-name="Reviews"]') || reviews);
    add(document.querySelector('.fc.fcpr'), 'plans');
    add(document.querySelector('.zx-business-faq'), 'faq');
    add(document.querySelector('.fc.fcx'), 'cooperation');

    const current = new Set(panels.flatMap(panel => [panel.element, panel.anchor]));
    for (const node of observed) if (!current.has(node)) {
      resizeObserver.unobserve(node);
      observed.delete(node);
    }
    for (const node of current) if (!observed.has(node)) {
      observed.add(node);
      resizeObserver.observe(node);
    }

    const height = innerHeight;
    const header = document.querySelector('.fchd-pill')?.getBoundingClientRect().bottom || 80;
    const pageHeight = Math.max(height * .65, height - header - 20);
    const limit = Math.max(0, document.documentElement.scrollHeight - height);
    const points = [{key: 'start', top: 0}];
    const sections = [];
    for (const {element, anchor, name, kind, paged} of panels) {
      const box = element.getBoundingClientRect();
      const start = anchor.getBoundingClientRect().top + scrollY;
      const range = Math.max(0, box.height - height);
      const ownPoints = [{key: name, top: start}];
      if (kind === 'steps') {
        const count = Math.max(1, parseInt(element.style.getPropertyValue('--n'), 10) || 4);
        for (let index = 1; index < count; index++) {
          ownPoints.push({key: `${name}-${index}`, top: start + range * index / (count - 1)});
        }
      } else if (kind !== 'pinned' && range > 3) {
        for (let offset = pageHeight; offset < range - 3; offset += pageHeight) {
          ownPoints.push({key: `${name}-${Math.round(offset)}`, top: start + offset});
        }
        ownPoints.push({key: `${name}-end`, top: start + range});
      }
      points.push(...ownPoints);
      sections.push({start, paged, first: ownPoints[0], last: ownPoints.at(-1)});
    }
    sections.sort((a, b) => a.start - b.start);
    regions = [];
    sections.forEach((section, index) => {
      if (!section.paged) return;
      const end = sections[index + 1]?.start ?? limit + height;
      const previous = regions.at(-1);
      if (previous && Math.abs(previous.end - section.start) < 4) {
        previous.end = end;
        previous.last = section.last;
      } else regions.push({...section, end});
    });
    points.push({key: 'end', top: limit});
    stops = points.map(point => ({...point, top: Math.round(Math.max(0, Math.min(limit, point.top)))}))
      .sort((a, b) => a.top - b.top)
      .filter((point, index, all) => !index || point.top - all[index - 1].top > 3);
  }

  function queueMeasure() {
    if (!measureFrame) measureFrame = requestAnimationFrame(measure);
  }

  function pagedAt(top = scrollY) {
    return regions.some(region => top >= region.start - 5 && top < region.end - 5);
  }

  function entryPoint(direction, from, to) {
    const ordered = direction > 0 ? regions : [...regions].reverse();
    const region = ordered.find(item => direction > 0
      ? from < item.start - 5 && to >= item.start - 5
      : from >= item.end - 5 && to < item.end - 5);
    return region && (direction > 0 ? region.first : region.last);
  }

  function goTo(point) {
    if (!point || moving) return;
    moving = true;
    clearTimeout(finishTimer);
    cancelAnimationFrame(nativeFrame);
    const duration = .95 + Math.min(.22, Math.max(0, Math.abs(point.top - scrollY) / innerHeight - 1) * .14);
    const easing = value => (1 - Math.cos(Math.PI * value)) / 2;
    const complete = () => {
      moving = false;
      clearTimeout(finishTimer);
      cancelAnimationFrame(nativeFrame);
      nativeFrame = 0;
    };
    const lenis = window.__fcLenis;
    if (lenis) {
      lenis.scrollTo(point.top, {
        immediate: reducedMotion.matches,
        duration,
        easing,
        onComplete: complete,
      });
    } else if (reducedMotion.matches) {
      window.scrollTo({top: point.top, behavior: 'instant'});
      complete();
    } else {
      const from = scrollY;
      const started = performance.now();
      const animate = now => {
        const progress = Math.min(1, (now - started) / (duration * 1000));
        window.scrollTo({top: from + (point.top - from) * easing(progress), behavior: 'instant'});
        if (progress < 1) nativeFrame = requestAnimationFrame(animate);
        else complete();
      };
      nativeFrame = requestAnimationFrame(animate);
    }
    finishTimer = setTimeout(() => {
      if (!lenis && !reducedMotion.matches && homeRoute()) window.scrollTo({top: point.top, behavior: 'instant'});
      complete();
    }, reducedMotion.matches ? 0 : duration * 1000 + 180);
  }

  function advance(direction) {
    measure();
    const points = direction > 0 ? stops : [...stops].reverse();
    const point = points.find(item => direction * (item.top - scrollY) > 6);
    goTo(point);
  }

  window.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || blocked() || pathContains(event, editable) || Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY) return;
    const now = performance.now();
    if (now - wheelAt > 180) {
      wheelUsed = false;
      nativeWheel = false;
      wheelDistance = 0;
      wheelDirection = 0;
    }
    wheelAt = now;
    const direction = Math.sign(event.deltaY);
    if (moving || wheelUsed) {
      wheelUsed = true;
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const pixels = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    const target = window.__fcLenis?.targetScroll ?? scrollY;
    const entry = entryPoint(direction, scrollY, target + pixels);
    if (!pagedAt() && !entry) return;
    const scroller = nativeScroller(event, direction);
    if (scroller || nativeWheel) {
      nativeWheel = true;
      event.stopImmediatePropagation();
      if (!scroller) event.preventDefault();
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    if (direction !== wheelDirection) wheelDistance = 0;
    wheelDirection = direction;
    wheelDistance += Math.abs(event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (wheelDistance >= 36) {
      wheelUsed = true;
      if (entry && !pagedAt()) goTo(entry);
      else advance(direction);
    }
  }, {capture: true, passive: false});

  window.addEventListener('keydown', event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || blocked() || pathContains(event, `${editable}, ${controls}`)) return;
    const direction = ['PageDown', 'ArrowDown', ' '].includes(event.key) ? 1 : ['PageUp', 'ArrowUp'].includes(event.key) ? -1 : 0;
    if (!direction && event.key !== 'Home' && event.key !== 'End') return;
    if (!pagedAt()) return;
    event.preventDefault();
    if (event.repeat || moving) return;
    if (event.key === 'Home' || event.key === 'End') {
      measure();
      goTo(event.key === 'Home' ? stops[0] : stops.at(-1));
    } else advance(event.shiftKey && event.key === ' ' ? -1 : direction);
  });

  window.addEventListener('touchstart', event => {
    if (event.touches.length !== 1 || blocked() || pathContains(event, `${editable}, .os-scrollbar, [role="scrollbar"]`)) {
      touch = null;
      return;
    }
    touch = {x: event.touches[0].clientX, y: event.touches[0].clientY, distance: 0, native: false, paged: pagedAt(), from: scrollY};
  }, {passive: true});

  window.addEventListener('touchmove', event => {
    if (!touch || event.touches.length !== 1) {
      touch = null;
      return;
    }
    const distance = touch.y - event.touches[0].clientY;
    if (Math.abs(distance) < 12 || Math.abs(event.touches[0].clientX - touch.x) > Math.abs(distance)) return;
    if (touch.native || nativeScroller(event, Math.sign(distance))) {
      touch.native = true;
      return;
    }
    touch.distance = distance;
    if (!touch.paged) return;
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
  }, {capture: true, passive: false});

  window.addEventListener('touchend', () => {
    const gesture = touch;
    touch = null;
    if (!gesture || gesture.native || Math.abs(gesture.distance) < 48 || blocked()) return;
    const direction = Math.sign(gesture.distance);
    if (gesture.paged) advance(direction);
    else {
      measure();
      const intended = gesture.from + gesture.distance;
      const end = direction > 0 ? Math.max(scrollY, intended) : Math.min(scrollY, intended);
      const entry = entryPoint(direction, gesture.from, end);
      if (entry) goTo(entry);
    }
  }, {passive: true});
  window.addEventListener('touchcancel', () => { touch = null; }, {passive: true});

  const resizeObserver = new ResizeObserver(queueMeasure);
  new MutationObserver(records => {
    if (records.some(record => record.addedNodes.length || record.removedNodes.length)) queueMeasure();
  }).observe(document.body, {childList: true, subtree: true});
  window.addEventListener('resize', queueMeasure, {passive: true});
  window.addEventListener('popstate', queueMeasure);
  window.addEventListener('pageshow', queueMeasure);
  document.fonts.ready.then(queueMeasure);
  queueMeasure();
}
