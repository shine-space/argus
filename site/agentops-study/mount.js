(() => {
  function mountFrame(id, target, section) {
    if (!target || document.getElementById(id)) return;
    const frame = document.createElement('iframe');
    frame.id = id;
    frame.loading = 'lazy';
    frame.title = section === 'launch' ? 'Launch Your AI Agent in Minutes' : 'AgentOps agents and features';
    frame.dataset.lazySrc = '/agentops-study/?section=' + section;
    frame.style.cssText = 'display:block;width:100%;height:650px;border:0;';
    if (section === 'launch') {
      const wrapper = document.createElement('div');
      wrapper.className = 'fc-wrap';
      wrapper.append(frame);
      wrapper.classList.add('launch-reveal');
      target.before(wrapper);
      const reveal = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        wrapper.classList.add('is-on');
        reveal.disconnect();
      }, { rootMargin: '0px 0px -40px 0px' });
      reveal.observe(wrapper);
      return;
    }
    target.before(frame);
  }

  function mount() {
    mountFrame('agentops-study', document.getElementById('ondrel-plan'), 'overview');
    mountFrame('agentops-launch', document.querySelector('[data-framer-name="S2 FcCta"]'), 'launch');
  }

  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.data?.type !== 'agentops-study:height') return;
    const frame = ['agentops-study', 'agentops-launch']
      .map(id => document.getElementById(id))
      .find(frame => frame && event.source === frame.contentWindow);
    const height = event.data.height;
    if (frame && Number.isSafeInteger(height) && height > 0 && frame.style.height !== height + 'px') {
      frame.style.height = height + 'px';
    }
  });

  const observer = new MutationObserver(mount);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
