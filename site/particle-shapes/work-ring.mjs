const mount = () => document.querySelectorAll('.fcph .fcph-ring').forEach(ring => {
  if (!ring.getClientRects().length || ring.querySelector('iframe')) return;
  const frame = document.createElement('iframe');
  frame.src = '/particle-shapes/core.html?view=particle-core';
  frame.title = '首页点阵轮廓切换';
  ring.append(frame);
  ring.classList.add('has-live-particles');
});
mount();
window.addEventListener('resize', mount);
new MutationObserver(records => {
  if (records.some(record => [...record.addedNodes].some(node =>
    node.matches?.('.fcph-ring') || node.querySelector?.('.fcph-ring')
  ))) mount();
}).observe(document.body, { childList: true, subtree: true });
