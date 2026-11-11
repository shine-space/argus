/* Platform selects a stack; the page's lang attribute selects its script. */
(() => {
  if (!document.getElementById('fc-fonts')) {
    const localFonts = document.createElement('meta');
    localFonts.id = 'fc-fonts';
    localFonts.name = 'argus-fonts';
    localFonts.content = 'local';
    document.head.append(localFonts);
  }
  const platform = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent;
  document.documentElement.dataset.tyPlatform = /Win/i.test(platform) ? 'windows'
    : /Mac|iPhone|iPad|iPod/i.test(platform) ? 'mac' : 'other';
})();
