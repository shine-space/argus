import { OverlayScrollbars } from '/vendor/overlayscrollbars-2.17.0.mjs';

if (!document.documentElement.classList.contains('particle-core-embed')) {
const stylesheet = new CSSStyleSheet();
const styles = await Promise.all([
  '/vendor/overlayscrollbars-2.17.0.css',
  '/styles/site-scrollbars.css',
].map(async path => {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Could not load scrollbar styles: ' + path);
  return response.text();
}));
stylesheet.replaceSync(styles.join('\n'));

const options = {
  update: {
    // These attributes only move/paint the clipped hero illustration. They do
    // not change scroll extents; ResizeObserver still handles actual resizing.
    ignoreMutation: record => record.type === 'attributes' &&
      record.attributeName === 'style' && record.target instanceof Element &&
      !!record.target.closest('.fch'),
  },
  scrollbars: {
    theme: 'site-scrollbar',
    autoHide: 'move',
    autoHideDelay: 650,
    autoHideSuspend: true,
  },
};
const scrollable = /^(auto|scroll|overlay)$/;
const instances = new Map();
const shadowRoots = new WeakSet();
const elements = new Set();
const trees = new Set();
const waitingForDefinition = new Set();
const internal = '.os-scrollbar, .os-size-observer, .os-trinsic-observer';
let scheduled = false;

function adoptStyles(root) {
  root.adoptedStyleSheets = [...root.adoptedStyleSheets, stylesheet];
}

function mount(element) {
  if (!(element instanceof HTMLElement) || element === document.documentElement ||
      element === document.body || instances.has(element) || element.closest(internal) ||
      element.matches('textarea, select, input, iframe')) return;

  const style = getComputedStyle(element);
  const x = scrollable.test(style.overflowX);
  const y = scrollable.test(style.overflowY);
  if (!(x && element.scrollWidth > element.clientWidth) &&
      !(y && element.scrollHeight > element.clientHeight)) return;
  if (element.clientWidth === 0 || element.clientHeight === 0) return;

  element.dataset.siteScrollViewport = '';
  if (style.position !== 'static') {
    element.style.setProperty('--site-scroll-position', style.position);
  }
  const instance = OverlayScrollbars({
    target: element,
    elements: { viewport: element },
  }, {
    ...options,
    overflow: {
      x: x ? 'scroll' : style.overflowX === 'visible' ? 'visible' : 'hidden',
      y: y ? 'scroll' : style.overflowY === 'visible' ? 'visible' : 'hidden',
    },
  });
  instances.set(element, instance);
}

function scan(root) {
  if (root instanceof Element) inspect(root);
  root.querySelectorAll('*').forEach(inspect);
}

function inspect(element) {
  if (!(element instanceof HTMLElement) || element.closest('.fch')) return;
  if (element.closest(internal)) return;
  mount(element);
  const shadow = element.shadowRoot;
  if (shadow && !shadowRoots.has(shadow)) {
    shadowRoots.add(shadow);
    adoptStyles(shadow);
    observe(shadow);
    scan(shadow);
  } else if (!shadow && element.localName.includes('-') &&
             !customElements.get(element.localName) &&
             !waitingForDefinition.has(element.localName)) {
    const name = element.localName;
    waitingForDefinition.add(name);
    customElements.whenDefined(name).then(() => queueTree(document));
  }
}

function flush() {
  scheduled = false;
  for (const [element, instance] of instances) {
    if (!element.isConnected) {
      instance?.destroy();
      instances.delete(element);
    }
  }
  for (const root of trees) if (root.isConnected) scan(root);
  trees.clear();
  for (const element of elements) if (element.isConnected) mount(element);
  elements.clear();
}

function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(flush);
}

function queueTree(root) {
  trees.add(root);
  schedule();
}

function queueAncestors(element) {
  for (let current = element; current instanceof Element; current = current.parentElement) {
    elements.add(current);
  }
  schedule();
}

const observer = new MutationObserver(records => {
  for (const record of records) {
    if (record.target instanceof Element && record.target.closest('.fch')) continue;
    if (record.target instanceof Element && record.target.closest(internal)) continue;
    if (record.type === 'attributes') {
      elements.add(record.target);
      schedule();
      continue;
    }
    if (record.target instanceof Element) queueAncestors(record.target);
    for (const node of record.addedNodes) {
      if (node instanceof HTMLElement && !node.matches(internal)) queueTree(node);
    }
  }
});

function observe(root) {
  observer.observe(root, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['class', 'hidden', 'open'],
  });
}

adoptStyles(document);
OverlayScrollbars(document.body, options);
observe(document.body);
queueTree(document);
window.addEventListener('resize', () => queueTree(document), { passive: true });
document.addEventListener('load', event => {
  if (event.target instanceof HTMLImageElement) queueAncestors(event.target);
}, true);
document.fonts.ready.then(() => queueTree(document));

}
