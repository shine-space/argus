(() => {
  const pending = new WeakSet();
  const selector = 'iframe[data-lazy-src]';
  const ready = new Set();
  let pageLoaded = document.readyState === 'complete';
  function activate(frame) {
    if (!frame.isConnected) return;
    if (!pageLoaded) { ready.add(frame); return; }
    frame.src = frame.dataset.lazySrc;
  }
  if (!pageLoaded) addEventListener('load', () => requestAnimationFrame(() => {
    pageLoaded = true;
    for (const frame of ready) activate(frame);
    ready.clear();
  }), { once: true });
  const observer = new IntersectionObserver(entries => {
    for (const { target: frame, isIntersecting, boundingClientRect: rect } of entries) {
      if (!isIntersecting || !rect.width || !rect.height || !frame.isConnected) continue;
      activate(frame);
      observer.unobserve(frame);
    }
  }, { rootMargin: '1000px 0px' });
  function scan(root) {
    const frames = root.matches?.(selector) ? [root] : [...root.querySelectorAll(selector)];
    for (const frame of frames) {
      if (pending.has(frame)) continue;
      pending.add(frame);
      observer.observe(frame);
    }
  }
  scan(document);
  new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) if (node instanceof Element) scan(node);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
