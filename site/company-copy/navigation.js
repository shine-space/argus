(() => {
  const sectionIds = {
    '.fcpr': 'delivery-services',
    '.fcs-stage': 'business-applications',
    '.fc.fcx': 'cooperation',
    '.fc.fcp': 'field-delivery',
  };

  function assignSectionIds() {
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
