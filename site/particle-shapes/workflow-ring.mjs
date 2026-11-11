const mount = () => document.querySelectorAll('.fcsv-top .fcsv-demo').forEach(ring => {
  if (!ring.getClientRects().length || ring.querySelector('iframe')) return;
  const frame = document.createElement('iframe');
  frame.src = '/particle-shapes/core.html?view=particle-core&shape=molecule';
  frame.title = '分子点阵动画';
  ring.append(frame);
  ring.classList.add('has-live-particles');
});
mount();
window.addEventListener('resize', mount);
new MutationObserver(records => {
  if (records.some(record => [...record.addedNodes].some(node =>
    node.matches?.('.fcsv-demo') || node.querySelector?.('.fcsv-demo')
  ))) mount();
}).observe(document.body, { childList: true, subtree: true });
