const setNavigationCurrentPage = header => {
  const normalizePath = pathname => {
    const path = pathname.replace(/\/+$/, '') || '/';
    if (path === '/services/voice-agents') return '/services';
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
  const group = currentPath.startsWith('/services') ? 0 : currentPath.startsWith('/solution/') ? 1 : -1;
  header.querySelectorAll('.fchd-nav > ul > li > a').forEach((link, index) => {
    if (index < 2) link.classList.toggle('is-cur', index === group);
  });
};

(() => {
  const selector = '.fchd-list > ul > li:first-child > a[href="/services/voice-agents"]';
  const menuEntry = '.fchd-list > ul > li:first-child > a';
  const triggerSelector = '.fchd-nav > ul > li:first-child > a[aria-expanded]';
  const template = document.getElementById('shared-navigation')?.content;
  const copySelector = '.fchd-nav > ul > li:nth-child(-n+5) > a, .fchd-dt, .fchd-tx b, .fchd-tx em, .fchd-out';
  const retiredLinks = 'a[href="/services/knowledge-base"], a[href="/services/custom-ai-apps"]';
  const activeCopy = root => [...root.querySelectorAll(copySelector)].filter(element => !element.closest(retiredLinks));
  const sharedCopy = template ? activeCopy(template) : [];
  const iconSelector = '.fchd-list > ul > li > a[href]';
  const sharedIcons = new Map(
    [...(template?.querySelectorAll(iconSelector) ?? [])].map(link => [
      link.getAttribute('href'), link.querySelector('.fchd-ic svg'),
    ])
  );
  document.addEventListener('click', event => {
    const trigger = event.target.closest(triggerSelector);
    if (!trigger) return;
    event.preventDefault();
    if (trigger.getAttribute('aria-expanded') === 'false') {
      trigger.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    }
  }, true);
  document.addEventListener('keydown', event => {
    if (!event.target.matches(triggerSelector) || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    event.target.click();
  });
  document.addEventListener('click', event => {
    const link = event.target.closest(menuEntry + ', header.fc.fchd .fchd-nav a[href]');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.assign(link.matches(menuEntry) && !link.closest('.fchd-solution-drawer') ? '/services' : link.href);
  }, true);
  // Mobile uses the same navigation template and active product entries as desktop.
  const syncMobileNavigation = () => {
    if (!template) return;
    const mainLinks = [...template.querySelectorAll('.fchd-nav > ul > li > a')];
    const productLinks = [...template.querySelectorAll('.fchd-list > ul > li > a')];
    document.querySelectorAll('.fchd-sheet').forEach(sheet => {
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
    document.querySelectorAll('link[href="/styles/blocks/6be71b81-3805.css"]').forEach(link=>link.href='/styles/blocks/6be71b81-3805.css?v=solution-shared-2');
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
        const href = link.matches(selector) ? '/services' : link.getAttribute('href');
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
    document.querySelectorAll(triggerSelector).forEach(trigger => {
      if (trigger.hasAttribute('href')) trigger.removeAttribute('href');
      if (trigger.getAttribute('role') !== 'button') trigger.setAttribute('role', 'button');
      if (trigger.tabIndex !== 0) trigger.tabIndex = 0;
    });
    document.querySelectorAll(selector).forEach(link => link.setAttribute('href', '/services'));
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

// Reuse the product drawer for the solutions navigation.
(()=>{
 const style=document.createElement('style');style.textContent=`
 /* Visibility routing only; appearance and motion use the shared header stylesheet. */
 .fchd .fchd-solution-drawer{display:none}
 .fchd.is-solution-mega>.fchd-drawer:not(.fchd-solution-drawer){display:none!important}
 .fchd.is-solution-mega>.fchd-solution-drawer{display:grid}
 @media(max-width:1060px){.fchd.is-solution-mega>.fchd-solution-drawer{display:none}}
 `;document.head.append(style);
 const bound=new WeakSet();
 function mount(){document.querySelectorAll('header.fc.fchd').forEach(header=>{
  const trigger=header.querySelector('.fchd-nav>ul>li:nth-child(2)>a');const original=header.querySelector('.fchd-drawer:not(.fchd-solution-drawer)');
  if(!trigger||!original||bound.has(header))return;bound.add(header);
  const drawer=original.cloneNode(true);drawer.classList.add('fchd-solution-drawer');drawer.id='solution-menu';drawer.setAttribute('aria-label','解决方案');drawer.querySelector('.fchd-feat')?.remove();drawer.querySelector('.fchd-all')?.remove();drawer.querySelector('.fchd-dt').textContent='电子制造解决方案';
  const list=drawer.querySelector('.fchd-list>ul');const item=list.firstElementChild.cloneNode(true);list.replaceChildren();
  for(let i=0;i<3;i++){const row=item.cloneNode(true);row.style.setProperty('--i',i);const link=row.querySelector('a');link.classList.remove('is-hv');link.href='/solution/electronic';link.tabIndex=-1;row.querySelector('.fchd-tx b').textContent='电子制造';row.querySelector('.fchd-tx em').textContent='物料齐套与生产准备的 AI 方案';row.querySelector('.fchd-out').textContent='查看方案';list.append(row);}
  header.append(drawer);trigger.removeAttribute('href');trigger.dataset.solutionTrigger='';trigger.setAttribute('role','button');trigger.tabIndex=0;trigger.setAttribute('aria-haspopup','true');trigger.setAttribute('aria-controls',drawer.id);trigger.setAttribute('aria-expanded','false');
  if(!trigger.querySelector('.fchd-car')){const arrow=document.createElement('span');arrow.className='fchd-car';arrow.setAttribute('aria-hidden','true');trigger.append(arrow);}
  let closeTimer;function setOpen(open){clearTimeout(closeTimer);header.classList.toggle('is-solution-mega',open);trigger.setAttribute('aria-expanded',String(open));drawer.setAttribute('aria-hidden',String(!open));drawer.querySelectorAll('a').forEach(link=>link.tabIndex=open?0:-1);}
  trigger.addEventListener('mouseenter',()=>setOpen(true));trigger.addEventListener('focus',()=>setOpen(true));trigger.addEventListener('click',event=>{event.preventDefault();setOpen(!header.classList.contains('is-solution-mega'));});
  trigger.addEventListener('keydown',event=>{if(['Enter',' '].includes(event.key)){event.preventDefault();setOpen(!header.classList.contains('is-solution-mega'));}if(event.key==='ArrowDown'){event.preventDefault();setOpen(true);drawer.querySelector('a').focus();}});
  drawer.addEventListener('mouseenter',()=>setOpen(true));header.addEventListener('mouseenter',()=>clearTimeout(closeTimer));header.addEventListener('mouseleave',()=>{clearTimeout(closeTimer);closeTimer=setTimeout(()=>setOpen(false),180);});header.addEventListener('focusout',event=>{if(!header.contains(event.relatedTarget))setOpen(false)});header.addEventListener('keydown',event=>{if(event.key==='Escape'){setOpen(false);trigger.blur();}});
  header.querySelectorAll('.fchd-nav>ul>li:not(:nth-child(2))>a').forEach(link=>link.addEventListener('mouseenter',()=>setOpen(false)));
  setNavigationCurrentPage(header);
 });}
 let scheduled=false;new MutationObserver(records=>{if(scheduled||!records.some(r=>r.target.closest?.('header.fchd')||[...r.addedNodes].some(n=>n.matches?.('header.fchd')||n.querySelector?.('header.fchd'))))return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;mount()})}).observe(document.body,{childList:true,subtree:true});mount();
})();

(() => {
 const style = document.createElement('style');
 style.textContent = `
 .fchd-sheet .fchd-mobile-group{display:flex;align-items:baseline;gap:14px;width:100%;padding:14px 0;border:0;background:none;color:var(--fc-cloud);font:inherit;font-size:36px;font-weight:500;letter-spacing:-.045em;text-align:left;cursor:pointer}
 .fchd-mobile-group::after{content:'+';margin-left:auto;font-size:24px;font-weight:400}
 .fchd-mobile-group[aria-expanded="true"]::after{content:'−'}
 .fchd-sheet .fchd-mobile-submenu{list-style:none;margin:0;padding:0 0 0 28px;overflow:hidden}
 .fchd-sheet .fchd-mobile-submenu[hidden],.fchd-sheet .fchd-schips[hidden]{display:none}
 .fchd-sheet .fchd-mobile-submenu li{border:0;animation:none}
 .fchd-sheet .fchd-mobile-submenu a{display:flex;flex-direction:column;gap:3px;padding:12px 0;font-size:18px;letter-spacing:normal}
 .fchd-sheet .fchd-mobile-submenu small{font-size:12px;font-weight:400;color:var(--site-text-on-dark-secondary,rgba(255,255,255,.78));letter-spacing:normal}
 `;
 document.head.append(style);
})();
