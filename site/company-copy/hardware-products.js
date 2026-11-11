const template = document.getElementById('hardware-products-template');
const main = document.getElementById('main');

if (template instanceof HTMLTemplateElement && main) {
  const section = template.content.firstElementChild.cloneNode(true);

  const copySource = main.querySelector('[data-fc-row="services"][data-slug="support-agents"]');
  const headingLines = copySource?.dataset.f1.split('|');
  const description = copySource?.dataset.f2;

  function placeHeroCopy() {
    main.querySelectorAll('.fcsv-top .fcsv-copy').forEach(copy => {
      const heading = copy.querySelector('h1');
      const lines = heading && [...heading.querySelectorAll('.fc-hd-l')];
      if (headingLines && lines?.length &&
          lines.map(line => line.textContent.trim()).join('|') !== headingLines.join('|')) {
        const lineTemplate = lines[0].cloneNode(true);
        const word = lineTemplate.querySelector('.fc-hd-w');
        lineTemplate.replaceChildren(word);
        heading.replaceChildren(...headingLines.map(text => {
          const line = lineTemplate.cloneNode(true);
          line.querySelector('.fc-hd-i').textContent = text;
          return line;
        }));
        heading.setAttribute('aria-label', headingLines.join(' '));
      }

      const summary = copy.querySelector('.fcsv-short');
      if (summary && description && summary.textContent !== description) summary.textContent = description;

      if (copy.querySelector('.hardware-hero-label')) return;
      const label = document.createElement('p');
      label.className = 'fc-eb is-on hardware-hero-label';
      const icon = document.createElement('i');
      icon.setAttribute('aria-hidden', 'true');
      label.append(icon, '智能硬件');
      copy.prepend(label);
    });
  }

  function placeProducts() {
    const contact = main.querySelector('[data-framer-name="S1 FcCta"]');
    if (contact && section.nextElementSibling !== contact) {
      contact.before(section);
    }
  }

  placeProducts();
  placeHeroCopy();
  // Framer can replace its prerendered layout when it hydrates or changes breakpoint.
  new MutationObserver(() => {
    if (!section.isConnected) placeProducts();
    placeHeroCopy();
  }).observe(main, { childList: true, characterData: true, subtree: true });
}
