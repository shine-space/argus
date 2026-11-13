const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {pathToFileURL} = require('node:url');
const {build, pages, factorCSS, factorModule, signatures, baseURL, layoutURL} = require('./shared-site.cjs');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const base = read('site/styles/shared/component-base.css');
const layout = read('site/styles/shared/component-layout.css');

test('sharing styles preserves rule order, overrides and media queries', () => {
  const override = '\n.fc-btn{min-height:38px}@media(max-width:600px){.fc-wrap{padding:12px}}';
  const original = base + layout + override;
  const shared = factorCSS(original, base, layout);
  assert(shared.startsWith(`@import url("${baseURL}");`));
  assert(shared.includes(layoutURL));
  const expanded = shared.replace(`@import url("${baseURL}");`, base)
    .replace(`@import url("${layoutURL}");`, layout);
  assert.deepEqual(signatures(expanded), signatures(original));
  assert.equal(factorCSS(shared, base, layout), shared);
});

test('a differing component style is not replaced by the common style', () => {
  const variant = base.replace('min-height:54px', 'min-height:58px') + layout;
  assert.notEqual(variant, base + layout);
  assert.equal(factorCSS(variant, base, layout), variant);
});

test('runtime CSS retains exact strings and custom container widths', async () => {
  const shared = await import(pathToFileURL(path.join(root, 'site/styles/shared/component-styles.mjs')));
  const [before, after] = layout.split('clamp(1280px, 92vw, 1520px)');
  const source = 'const a = `@import url("${font}");' + base + '`;' +
    'const b = `' + before + '${width}' + after + '`; globalThis.result=[a,b];';
  const transformed = factorModule(source, base, layout).replace(/^import[^\n]+\n/gm, '');
  for (const width of ['1280px', 'clamp(1280px, 92vw, 1520px)']) {
    const context = {...shared, width};
    vm.runInNewContext(transformed, context);
    assert.equal(context.result[0], base);
    assert.equal(context.result[1], before + width + after);
  }
});

test('initial pages contain the same footer and navigation without hidden copies', () => {
  const footers = new Set();
  for (const route of pages) {
    const html = read('site/' + (route ? route + '/' : '') + 'index.html');
    const snapshots = html.match(/<footer\b[\s\S]*?<\/footer>/g);
    assert(snapshots?.length, route);
    for (const footer of snapshots) {
      assert(!/argus|href="\/services/.test(footer), route);
      footers.add(footer.replace('fc fco fc-dark is-ph', 'fc fco fc-dark'));
    }
    assert(html.includes('class="fc fco fc-dark is-ph"'), route);
    assert(!html.includes('<template id="shared-navigation">'), route);
    assert(html.includes('<script type="module" src="/company-copy/service-menu-link.js?v=shared-1"></script>'), route);
    assert.equal((html.match(/company-copy\/site-typography\.js/g) || []).length, 1);
    assert(html.indexOf('company-copy/site-typography.js') < html.indexOf('</head>'));
  }
  assert.equal(footers.size, 1);
});

test('a second generation produces no changes', async () => {
  const result = await build({check:true});
  assert.equal(result.changes.length, 0);
});
