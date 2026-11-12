(() => {
  const sectionIds = {
    '.fcpr': 'delivery-services',
    '.fcs-stage': 'business-applications',
    '.fc.fcx': 'cooperation',
    '.fc.fcp': 'field-delivery',
  };

  function assignSectionIds() {
    // Keep all three service-delivery entries on the current solution route,
    // including links recreated by the page runtime after hydration.
    document.querySelectorAll('.fcw a[href]:not(.fc-btn)').forEach(link => {
      if (link.getAttribute('href') !== '/solution/electronic') {
        link.setAttribute('href', '/solution/electronic');
      }
    });

    for (const [selector, id] of Object.entries(sectionIds)) {
      const section = document.querySelector(selector);
      if (section && !section.id) section.id = id;
    }
  }

  function start() {
    assignSectionIds();
    new MutationObserver(assignSectionIds).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
