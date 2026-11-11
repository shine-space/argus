(() => {
  const sourcePage = new URL('https://reflex-template.framer.ai/contact');

  // Keep the other template destinations outside the one-page local mirror.
  function resolveTemplateLink(event) {
    const link = event.target.closest('a[href]');
    const href = link?.getAttribute('href');
    if (!href || !/^(?:\.\/|\/(?!\/))/.test(href)) return;

    const destination = new URL(href, sourcePage);
    link.href = destination.pathname.replace(/\/$/, '') === '/contact'
      ? '/book' + destination.search + destination.hash
      : destination.href; 
    link.target = '_top';
    if (event.type !== 'contextmenu') event.stopImmediatePropagation();
  }

  for (const type of ['click', 'auxclick', 'contextmenu']) {
    window.addEventListener(type, resolveTemplateLink, true);
  }

  if (window.parent !== window) {
    function scrollPage(event, delta) {
      if (!delta || !event.cancelable) return;
      const field = event.target.closest('textarea');
      if (field && (delta < 0 ? field.scrollTop > 0 : field.scrollTop + field.clientHeight < field.scrollHeight - 1)) return;
      event.preventDefault();
      window.parent.scrollBy({ top: delta, behavior: 'instant' });
    }

    window.addEventListener('wheel', (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.parent.innerHeight : 1;
      scrollPage(event, event.deltaY * unit);
    }, { passive: false });

    let lastTouchY;
    window.addEventListener('touchstart', (event) => {
      lastTouchY = event.touches.length === 1 ? event.touches[0].clientY : undefined;
    }, { passive: true });
    window.addEventListener('touchmove', (event) => {
      if (lastTouchY === undefined || event.touches.length !== 1) return;
      const currentY = event.touches[0].clientY;
      scrollPage(event, lastTouchY - currentY);
      lastTouchY = currentY;
    }, { passive: false });
  }

  window.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    event.preventDefault();
    event.stopImmediatePropagation();

    let status = form.querySelector('[data-preview-status]');
    if (!status) {
      status = document.createElement('p');
      status.dataset.previewStatus = '';
      status.setAttribute('role', 'status');
      status.style.cssText = 'width:100%;margin:0;font:inherit;font-size:13px;line-height:1.5';
      form.append(status);
    }
    status.textContent = '当前为本地预览，需求暂未发送';
  }, true);
})();

