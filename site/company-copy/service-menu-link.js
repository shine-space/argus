import {navigationHTML} from './shared/navigation-template.mjs?v=shared-1';

const setNavigationCurrentPage = header => {
  const normalizePath = pathname => {
    const path = pathname.replace(/\/+$/, '') || '/';
    if (path === '/services/voice-agents') return '/product/agent';
    return path.replace(/^\/work(?=\/|$)/, '/solution/electronic');
  };
  const currentPath = normalizePath(location.pathname);
  const markCurrent = links => {
    let selected = null;
    let longestMatch = -1;
    for (const link of links) {
      const url = new URL(link.getAttribute('href'), location.href);
      if (url.origin !== location.origin) continue;
      const path = normalizePath(url.pathname);
      if ((currentPath === path || currentPath.startsWith(path + '/')) && path.length > longestMatch) {
        selected = link;
        longestMatch = path.length;
      }
    }
    for (const link of links) {
      if (link === selected) {
        if (link.getAttribute('aria-current') !== 'page') link.setAttribute('aria-current', 'page');
      } else if (link.hasAttribute('aria-current')) link.removeAttribute('aria-current');
    }
    return selected;
  };
  for (const drawer of header.querySelectorAll('.fchd-drawer')) {
    markCurrent([...drawer.querySelectorAll('.fchd-list > ul > li > a[href]')]);
  }
  markCurrent([...header.querySelectorAll('.fchd-schips a[href]')]);
  const group = currentPath.startsWith('/product/') ? 0 : currentPath.startsWith('/solution/') ? 1 : -1;
  header.querySelectorAll('.fchd-nav > ul > li > a').forEach((link, index) => {
    if (index < 2) link.classList.toggle('is-cur', index === group);
  });
};

const setupNavigationDropdowns = (() => {
  const controllers = new WeakMap();
  let sequence = 0;
  return () => document.querySelectorAll('header.fc.fchd').forEach(header => {
    const triggers = [...header.querySelectorAll('.fchd-nav > ul > li > a')].slice(0, 2);
    const product = header.querySelector('.fchd-drawer:not(.fchd-solution-drawer)');
    if (triggers.length !== 2 || !product) return;
    const previous = controllers.get(header);
    if (previous?.product === product && triggers.every((trigger, index) => trigger === previous.triggers[index]) && header.contains(previous.solution)) return;
    previous?.dispose();
    header.querySelectorAll('.fchd-solution-drawer').forEach(drawer => drawer.remove());
    const solution = product.cloneNode(true);
    solution.classList.add('fchd-solution-drawer');
    solution.setAttribute('aria-label', '解决方案');
    solution.querySelector('.fchd-feat')?.remove();
    solution.querySelector('.fchd-all')?.remove();
    solution.querySelector('.fchd-dt').textContent = '电子制造解决方案';
    const list = solution.querySelector('.fchd-list > ul');
    const item = list.firstElementChild.cloneNode(true);
    list.replaceChildren();
    for (let index = 0; index < 3; index++) {
      const row = item.cloneNode(true);
      row.style.setProperty('--i', index);
      const link = row.querySelector('a');
      link.classList.remove('is-hv');
      link.removeAttribute('aria-current');
      link.href = '/solution/electronic';
      row.querySelector('.fchd-tx b').textContent = '电子制造';
      row.querySelector('.fchd-tx em').textContent = '物料齐套与生产准备的 AI 方案';
      row.querySelector('.fchd-out').textContent = '查看方案';
      list.append(row);
    }
    header.append(solution);
    header.dataset.dropdownController = 'shared';
    const drawers = [product, solution];
    const listeners = new AbortController();
    const options = {capture: true, signal: listeners.signal};
    let active = null, pinned = null, closeTimer, returningFocus = false;
    const setOpen = index => {
      clearTimeout(closeTimer);
      if (active !== index) pinned = null;
      active = index;
      if (index === null) { pinned = null; delete header.dataset.openMenu; }
      else header.dataset.openMenu = String(index);
      drawers.forEach((drawer, current) => {
        const open = current === index;
        triggers[current].setAttribute('aria-expanded', String(open));
        drawer.setAttribute('aria-hidden', String(!open));
        drawer.inert = !open;
        drawer.querySelectorAll('a').forEach(link => link.tabIndex = open ? 0 : -1);
      });
    };
    triggers.forEach((trigger, index) => {
      const drawer = drawers[index];
      drawer.id = 'navigation-menu-' + (++sequence);
      trigger.removeAttribute('href');
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-controls', drawer.id);
      trigger.tabIndex = 0;
      trigger.dataset.dropdownTrigger = String(index);
    });
    const activate = index => {
      if (active === index && pinned === index) setOpen(null);
      else { setOpen(index); pinned = index; }
    };
    const highlight = target => {
      const row = target.closest('.fchd-drawer .fchd-list > ul > li > a');
      if (row) row.closest('.fchd-drawer').querySelectorAll('.fchd-list > ul > li > a').forEach(link => link.classList.toggle('is-hv', link === row));
    };
    // Own both dropdowns before React's delegated product-only handlers run.
    header.addEventListener('mouseover', event => {
      clearTimeout(closeTimer);
      if (!event.target.closest('.fchd-nav, .fchd-drawer')) return;
      event.stopPropagation();
      const index = triggers.findIndex(trigger => trigger.contains(event.target));
      if (index >= 0) setOpen(index);
      else if (event.target.closest('.fchd-nav')) setOpen(null);
      highlight(event.target);
    }, options);
    header.addEventListener('mouseout', event => {
      if (event.target.closest('.fchd-nav, .fchd-drawer')) event.stopPropagation();
      if (!header.contains(event.relatedTarget)) closeTimer = setTimeout(() => setOpen(null), 180);
    }, options);
    header.addEventListener('focusin', event => {
      if (!event.target.closest('.fchd-nav, .fchd-drawer')) return;
      event.stopPropagation();
      const index = triggers.indexOf(event.target);
      if (index >= 0 && !returningFocus) setOpen(index);
      else if (index < 0 && event.target.closest('.fchd-nav')) setOpen(null);
      highlight(event.target);
    }, options);
    header.addEventListener('focusout', event => {
      if (event.target.closest('.fchd-nav, .fchd-drawer')) event.stopPropagation();
      if (!header.contains(event.relatedTarget)) setOpen(null);
    }, options);
    header.addEventListener('click', event => {
      const index = triggers.findIndex(trigger => trigger.contains(event.target));
      if (index < 0) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      activate(index);
    }, options);
    header.addEventListener('keydown', event => {
      const index = triggers.indexOf(event.target);
      if (event.key === 'Escape' && active !== null) {
        const last = active;
        event.preventDefault(); event.stopPropagation(); setOpen(null);
        returningFocus = true; triggers[last].focus({preventScroll: true}); returningFocus = false;
      } else if (index >= 0 && ['Enter', ' '].includes(event.key)) {
        event.preventDefault(); event.stopPropagation();
        if (!event.repeat) activate(index);
      } else if (index >= 0 && ['ArrowDown', 'ArrowUp'].includes(event.key)) {
        event.preventDefault(); event.stopPropagation(); setOpen(index);
        const links = drawers[index].querySelectorAll('.fchd-list > ul > li > a');
        const target = event.key === 'ArrowDown' ? links[0] : links[links.length - 1];
        requestAnimationFrame(() => { if (active === index) target?.focus(); });
      } else if (active !== null && event.target.closest('.fchd-drawer') && ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        const links = [...drawers[active].querySelectorAll('.fchd-list > ul > li > a')];
        const current = links.indexOf(event.target);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? links.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
        event.preventDefault(); event.stopPropagation(); links[next]?.focus();
      }
    }, options);
    document.addEventListener('click', event => { if (!header.contains(event.target)) setOpen(null); }, {signal: listeners.signal});
    window.addEventListener('resize', () => setOpen(null), {signal: listeners.signal});
    window.addEventListener('popstate', () => setOpen(null), {signal: listeners.signal});
    window.addEventListener('pageshow', () => setOpen(null), {signal: listeners.signal});
    controllers.set(header, {product, solution, triggers, dispose() { clearTimeout(closeTimer); listeners.abort(); }});
    setOpen(null);
  });
})();

(() => {
  const selector = '.fchd-list > ul > li:first-child > a[href="/services/voice-agents"]';
  const menuEntry = '.fchd-list > ul > li > a[href]';
  const sharedTemplate = document.createElement('template');
  sharedTemplate.innerHTML = navigationHTML;
  const template = sharedTemplate.content;
  const copySelector = '.fchd-nav > ul > li:nth-child(-n+5) > a, .fchd-dt, .fchd-tx b, .fchd-tx em, .fchd-out';
  const retiredLinks = 'a[href="/services/knowledge-base"], a[href="/services/custom-ai-apps"]';
  const activeCopy = root => [...root.querySelectorAll(copySelector)].filter(element => !element.closest(retiredLinks + ', .fchd-solution-drawer'));
  const sharedCopy = template ? activeCopy(template) : [];
  const iconSelector = '.fchd-list > ul > li > a[href]';
  const sharedIcons = new Map(
    [...(template?.querySelectorAll(iconSelector) ?? [])].map(link => [
      link.getAttribute('href'), link.querySelector('.fchd-ic svg'),
    ])
  );
  document.addEventListener('click', event => {
    const link = event.target.closest(menuEntry + ', header.fc.fchd .fchd-nav a[href]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(link.href);
  }, true);
  // Mobile uses the same navigation template and active product entries as desktop.
  const syncMobileNavigation = () => {
    if (!template) return;
    const mainLinks = [...template.querySelectorAll('.fchd-nav > ul > li > a')];
    const productLinks = [...template.querySelectorAll('.fchd-list > ul > li > a')];
    document.querySelectorAll('.fchd-sheet').forEach(sheet => {
      sheet.querySelectorAll('.fchd-sfoot a[href="mailto:hello@argus.ai"], .fchd-sfoot a[href="mailto:"]').forEach(link => link.remove());
      const list = sheet.querySelector('.fchd-slinks');
      if (!list || sheet.dataset.navigationSynced === 'shared') return;
      sheet.dataset.navigationSynced = 'shared';
      const fragment = document.createDocumentFragment();
      mainLinks.forEach((source, index) => {
        const row = document.createElement('li');
        row.style.setProperty('--i', index);
        const grouped = index < 2;
        const link = document.createElement(grouped ? 'button' : 'a');
        if (grouped) link.type = 'button';
        else link.href = source.getAttribute('href');
        const number = document.createElement('em');
        number.textContent = String(index + 1).padStart(2, '0');
        link.append(number, source.childNodes[0].textContent.trim());
        row.append(link);
        if (grouped) {
          link.className = 'fchd-mobile-group';
          link.setAttribute('aria-expanded', 'false');
          const submenu = document.createElement('ul');
          submenu.className = 'fchd-mobile-submenu';
          submenu.id = 'mobile-navigation-group-' + index;
          submenu.hidden = true;
          submenu.inert = true;
          link.setAttribute('aria-controls', submenu.id);
          const entries = index === 0 ? productLinks.map(item => ({
            href: item.getAttribute('href'),
            title: item.querySelector('.fchd-tx b').textContent,
            description: item.querySelector('.fchd-tx em').textContent,
          })) : [{href:'/solution/electronic', title:'电子制造', description:'物料齐套与生产准备的 AI 方案'}];
          entries.forEach(entry => {
            const child = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.href = entry.href;
            const title = document.createElement('span');
            title.textContent = entry.title;
            const description = document.createElement('small');
            description.textContent = entry.description;
            anchor.append(title, description);
            if (location.pathname === entry.href) anchor.setAttribute('aria-current', 'page');
            child.append(anchor);
            submenu.append(child);
          });
          let transition;
          link.addEventListener('click', () => {
            const open = link.getAttribute('aria-expanded') !== 'true';
            const height = submenu.hidden ? 0 : submenu.getBoundingClientRect().height;
            const opacity = submenu.hidden ? 0 : Number(getComputedStyle(submenu).opacity);
            transition?.cancel();
            link.setAttribute('aria-expanded', String(open));
            submenu.inert = !open;
            if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
              submenu.hidden = !open;
              return;
            }
            submenu.hidden = false;
            const animation = submenu.animate([
              {height: height + 'px', opacity},
              {height: (open ? submenu.scrollHeight : 0) + 'px', opacity: open ? 1 : 0},
            ], {
              duration: open ? 280 : 200,
              easing: open ? 'cubic-bezier(.2,0,0,1)' : 'cubic-bezier(.4,0,1,1)',
              fill: 'both',
            });
            transition = animation;
            animation.finished.then(() => {
              if (transition !== animation) return;
              submenu.hidden = !open;
              animation.cancel();
              transition = null;
            }).catch(() => {});
          });
          row.append(submenu);
        } else if (location.pathname === link.pathname) link.setAttribute('aria-current', 'page');
        fragment.append(row);
      });
      list.replaceChildren(fragment);
      const chips = sheet.querySelector('.fchd-schips');
      if (chips) chips.hidden = true;
      sheet.querySelectorAll('.fchd-sfoot .fc-l1,.fchd-sfoot .fc-l2').forEach(label => label.textContent = '业务合作');
    });
  };
  const update = () => {
    document.querySelectorAll('link[href="/styles/blocks/6be71b81-3805.css"]').forEach(link=>link.href='/styles/blocks/6be71b81-3805.css?v=solution-shared-3');
    document.querySelectorAll('a[href*="/work"]').forEach(link => {
      const url=new URL(link.getAttribute('href'),location.href);
      if(url.origin===location.origin && /^\/work(?:\/|$)/.test(url.pathname)){
        url.pathname=url.pathname.replace(/^\/work/, '/solution/electronic');
        link.setAttribute('href',url.pathname+url.search+url.hash);
      }
    });
    document.querySelectorAll('header.fc.fchd').forEach(header => {
      const pill = header.querySelector('.fchd-pill');
      const cooperation = template?.querySelector('.fchd-cta');
      const current = pill?.querySelector('.fchd-cta');
      if (cooperation && current?.querySelector('.fc-l1')?.textContent !== '业务合作') {
        const button = document.importNode(cooperation, true);
        if (current) current.replaceWith(button);
        else pill?.querySelector('.fchd-burger')?.before(button);
      }
      const docs = header.querySelector('.fchd-nav li:has(> a[href="/process"])');
      const about = header.querySelector('.fchd-nav li:has(> a[href="/about"])');
      if (docs && about && docs.nextElementSibling !== about) about.before(docs);
      header.querySelectorAll(iconSelector).forEach(link => {
        const href = link.matches(selector) ? '/product/agent' : link.getAttribute('href');
        const expected = sharedIcons.get(href);
        const icon = link.querySelector('.fchd-ic svg');
        if (expected && icon && !icon.isEqualNode(expected)) {
          icon.replaceWith(document.importNode(expected, true));
        }
      });
      activeCopy(header).forEach((element, index) => {
        const expected = sharedCopy[index];
        if (!expected || element.textContent === expected.textContent) return;
        const text = [...element.childNodes].find(node => node.nodeType === Node.TEXT_NODE);
        if (text && text.data !== expected.textContent) text.data = expected.textContent;
      });
    });
    setupNavigationDropdowns();
    document.querySelectorAll(selector).forEach(link => link.setAttribute('href', '/product/agent'));
    document.querySelectorAll(headerSelector).forEach(setNavigationCurrentPage);
    syncMobileNavigation();
  };
  const headerSelector = 'header.fc.fchd, .fchd-sheet';
  let scheduled = false;
  new MutationObserver(records => {
    if (scheduled || !records.some(record =>
      record.target.closest?.(headerSelector) ||
      [...record.addedNodes].some(node => node.matches?.(headerSelector) || node.querySelector?.(headerSelector))
    )) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      update();
    });
  }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href', 'aria-current'] });
  window.addEventListener('popstate', update);
  window.addEventListener('pageshow', update);
  update();
})();
