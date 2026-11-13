// Subscribe to the shared frame loop only while the illustration can be seen.
export function whileVisible(element, subscribe) {
  let visible = false, stop;
  const sync = () => {
    const active = visible && !document.hidden;
    if (active && !stop) stop = subscribe();
    else if (!active && stop) { stop(); stop = undefined; }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }, {rootMargin: '80px'});
  observer.observe(element);
  document.addEventListener('visibilitychange', sync);
  return () => {
    stop?.();
    observer.disconnect();
    document.removeEventListener('visibilitychange', sync);
  };
}
