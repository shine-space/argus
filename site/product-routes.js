/* Keep hydrated component links on the public product URLs. */
(() => {
  const routes = {"/services":"/product/agent","/services/workflow-automation":"/product/model","/services/support-agents":"/product/hardware"};
  const productPath = pathname => routes[pathname.replace(/\/$/, '')] || pathname;
  const sync = () => {
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin !== location.origin) return;
      const next = productPath(url.pathname);
      if (next !== url.pathname) link.setAttribute('href', next + url.search + url.hash);
    });
  };
  new MutationObserver(sync).observe(document.documentElement, {childList:true, subtree:true, attributes:true, attributeFilter:['href']});
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.getAttribute('href'), location.href);
    if (url.origin !== location.origin) return;
    const next = productPath(url.pathname);
    if (!Object.values(routes).includes(next.replace(/\/$/, ''))) return;
    if (next === location.pathname && url.search === location.search) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    location.assign(next + url.search + url.hash);
  }, true);
  sync();
})();
