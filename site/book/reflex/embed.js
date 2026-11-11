(() => {
  const root = document.querySelector('#main');
  const frame = document.createElement('iframe');
  frame.id = 'book-contact-frame';
  frame.title = '联系表单';
  frame.src = '/book/reflex/contact.html';
  frame.height = window.innerWidth < 810 ? 2225 : 1617;

  let resizeObserver;
  frame.addEventListener('load', () => {
    resizeObserver?.disconnect();
    const content = frame.contentDocument.querySelector('#main');
    if (!content) return;

    function fitFrame() {
      const section = content.querySelector('section[data-framer-name="Contact"]');
      if (!section) return;
      const height = Math.ceil(section.getBoundingClientRect().bottom);
      if (height > 0 && frame.height !== String(height)) frame.height = height;
    }

    resizeObserver = new ResizeObserver(fitFrame);
    resizeObserver.observe(content);
    fitFrame();
  });

  function mountFrame() {
    const slot = root.querySelector('[data-framer-name="S0 FcBook"]');
    if (slot && frame.parentElement !== slot) slot.append(frame);
  }

  new MutationObserver(mountFrame).observe(root, { childList: true, subtree: true });
  mountFrame();
})();
