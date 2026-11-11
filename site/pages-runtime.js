/* Static-host equivalent of the local server's asset aliases and CMS byte slices. */
(() => {
  const script = document.currentScript;
  const base = new URL(script.src).pathname.replace(/\/pages-runtime\.js$/, '');
  const originalFetch = window.fetch.bind(window);
  const manifest = originalFetch(base + '/pages-assets.json').then(response => {
    if (!response.ok) throw new Error('Static asset manifest could not be loaded');
    return response.json();
  });
  const buffers = new Map();
  // Framer's original router still contains its upstream route identifiers.
  // Use the published HTML links for marketing-page navigation on static hosting.
  const navigation = { '交付服务': '/pricing/', '文档中心': '/process/', '关于我们': '/about/' };
  const syncNavigation = () => {
    document.querySelectorAll('header.fc.fchd .fchd-nav a').forEach(link => {
      const route = navigation[link.textContent.replace(/\s+/g, '')];
      if (route && link.getAttribute('href') !== base + route) link.setAttribute('href', base + route);
    });
  };
  let navigationFrame;
  new MutationObserver(() => {
    if (!navigationFrame) navigationFrame = requestAnimationFrame(() => {
      navigationFrame = 0;
      syncNavigation();
    });
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['href'] });
  window.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (link.hasAttribute('aria-expanded') || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
    if (link.closest('header.fc.fchd .fchd-nav')) {
      const route = navigation[link.textContent.replace(/\s+/g, '')];
      if (route) url.pathname = base + route;
    }
    if (!url.pathname.startsWith(base + '/') && url.pathname !== base) url.pathname = base + url.pathname;
    if (url.pathname === location.pathname && url.search === location.search) return;
    if (location.pathname.startsWith(base + '/process/') && url.pathname.startsWith(base + '/process/')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(url.href);
  }, true);
  window.fetch = async (input, options) => {
    const url = new URL(input instanceof Request ? input.url : input, location.href);
    const localPath = url.pathname.startsWith(base + '/') ? url.pathname.slice(base.length) : url.pathname;
    if (!localPath.startsWith('/_remote/')) return originalFetch(input, options);
    const map = await manifest;
    const range = url.searchParams.get('range');
    const original = localPath + url.search;
    const mapped = map.urls[original] || map.urls[localPath];
    if (!mapped) return originalFetch(input, options);
    if (range && localPath.endsWith('.framercms')) {
      if (!buffers.has(mapped)) buffers.set(mapped, originalFetch(mapped).then(response => {
        if (!response.ok) throw new Error('CMS asset could not be loaded');
        return response.arrayBuffer();
      }));
      const bytes = new Uint8Array(await buffers.get(mapped));
      const chunks = range.split(',').map(segment => {
        if (!/^\d+-\d+$/.test(segment)) throw new Error('Invalid CMS byte range');
        const [start, end] = segment.split('-').map(Number);
        if (start > end || end >= bytes.length) throw new Error('CMS byte range outside asset');
        return bytes.slice(start, end + 1);
      });
      return new Response(new Blob(chunks), { headers: { 'Content-Type': 'application/octet-stream' } });
    }
    return originalFetch(mapped, options);
  };
})();
