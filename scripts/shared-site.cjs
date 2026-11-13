const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const acorn = require('acorn');
const postcss = require('postcss');

const root = path.resolve(__dirname, '..');
const site = path.join(root, 'site');
const pages = ['', 'about', 'pricing', 'product/agent', 'product/model', 'product/hardware',
  'solution/electronic', 'book', '404', 'services/voice-agents'];
const baseURL = '/styles/shared/component-base.css?v=shared-1';
const layoutURL = '/styles/shared/component-layout.css?v=shared-1';
const stylesModule = '/styles/shared/component-styles.mjs?v=shared-1';
const mobileBrowserURL = '/styles/shared/mobile-browser.css?v=1';
const mobileTheme = '<meta name="theme-color" content="#07100c" media="(max-width: 600px), (max-width: 960px) and (max-height: 500px) and (orientation: landscape)">';
const defaultWidth = 'clamp(1280px, 92vw, 1520px)';
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const signature = node => node.type === 'comment' ? null : [node.type, node.selector,
  node.name, node.params, node.prop, node.value, node.important || false,
  node.nodes?.map(signature).filter(Boolean)];
const signatures = source => postcss.parse(source).nodes.map(signature).filter(Boolean);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function walk(node, visit) {
  if (!node || typeof node !== 'object') return;
  visit(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => walk(child, visit));
    else if (value?.type) walk(value, visit);
  }
}

function factorCSS(source, base, layout) {
  if (source.includes(baseURL)) return source;
  const nodes = postcss.parse(source).nodes.filter(node => node.type !== 'comment');
  const baseNodes = signatures(base), layoutNodes = signatures(layout);
  if (!same(nodes.slice(0, baseNodes.length).map(signature), baseNodes)) return source;
  let count = baseNodes.length;
  let imports = `@import url("${baseURL}");\n`;
  if (same(nodes.slice(count, count + layoutNodes.length).map(signature), layoutNodes)) {
    count += layoutNodes.length;
    imports += `@import url("${layoutURL}");\n`;
  }
  const next = imports + source.slice(nodes[count - 1].source.end.offset + 1);
  const expanded = next.replace(`@import url("${baseURL}");`, base)
    .replace(`@import url("${layoutURL}");`, layout);
  if (!same(signatures(source), signatures(expanded))) throw Error('Shared CSS changed rule order');
  return next;
}

function factorModule(source, base, layout) {
  if (!source.includes('.fc-btn{') && !source.includes('/* shared footer */')) return source;
  const edits = [], imports = new Set();
  const tree = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  walk(tree, node => {
    if (node.type === 'TemplateLiteral' && node.expressions.length === 1) {
      const [before, after] = node.quasis.map(q => q.value.cooked);
      if (before === '@import url("' && after?.replace(/^"\);/, '') === base) {
        edits.push({start:node.start, end:node.end, text:'__sharedBaseCss'});
        imports.add('__sharedBaseCss');
      } else if (before + defaultWidth + after === layout) {
        edits.push({start:node.start, end:node.end,
          text:`__sharedLayoutCss(${source.slice(node.expressions[0].start, node.expressions[0].end)})`});
        imports.add('__sharedLayoutCss');
      }
    }
    if (node.type === 'ArrayExpression' && /\/\* shared footer \*\/\s*$/.test(source.slice(Math.max(0, node.start - 30), node.start))) {
      edits.push({start:node.start, end:node.end, text:'__sharedFooterColumns'});
      imports.add('__sharedFooterColumns');
    }
  });
  for (const edit of edits.sort((a,b) => b.start - a.start)) source = source.slice(0, edit.start) + edit.text + source.slice(edit.end);
  const cssImports = [...imports].filter(name => name !== '__sharedFooterColumns');
  if (cssImports.length) source = `import {${cssImports.join(',')}} from "${stylesModule}";\n` + source;
  if (imports.has('__sharedFooterColumns')) source = 'import {footerColumns as __sharedFooterColumns} from "/company-copy/footer-content.mjs?v=1";\n' + source;
  if (edits.length) acorn.parse(source, { ecmaVersion:'latest', sourceType:'module' });
  return source;
}

function filesIn(directory) {
  return fs.readdirSync(directory, {withFileTypes:true}).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

async function build({check = false} = {}) {
  const outputs = new Map();
  const queue = (file, text) => outputs.set(path.resolve(root, file), text);
  const base = read('site/styles/shared/component-base.css');
  const layout = read('site/styles/shared/component-layout.css');
  if (layout.split(defaultWidth).length !== 2) throw Error('Expected one shared content width');
  const [before, after] = layout.split(defaultWidth);
  queue('site/styles/shared/component-styles.mjs',
    '// Generated by npm run build:shared from the shared CSS sources.\n' +
    `export const __sharedBaseCss = ${JSON.stringify(base)};\n` +
    `export const __sharedLayoutCss = width => ${JSON.stringify(before)} + width + ${JSON.stringify(after)};\n`);

  const navigation = read('site/company-copy/navigation.html').trim();
  queue('site/company-copy/shared/navigation-template.mjs',
    '// Generated from company-copy/navigation.html.\nexport const navigationHTML = ' + JSON.stringify(navigation) + ';\n');
  const {footerColumns} = await import(pathToFileURL(path.join(site, 'company-copy/footer-content.mjs')));
  const {cooperationContent} = await import(pathToFileURL(path.join(site, 'company-copy/cooperation-content.mjs')));
  const columns = footerColumns.map(column => `<nav class="fco-col" aria-label="${escape(column.h)}"><p style="font-family:var(--site-font-label);font-weight:var(--fc-font-mw, 400)">${escape(column.h)}</p><ul>${column.l.map(link => `<li><a href="${escape(link.h)}">${escape(link.l)}</a></li>`).join('')}</ul></nav>`).join('');
  const footer = read('site/company-copy/shared/footer.html').trim().replace('{{footerColumns}}', columns);
  const headingLines = cooperationContent.heading.split('|');
  const cooperationValues = {...cooperationContent, headingLabel:headingLines.join(' '),
    headingFirst:headingLines[0], headingSecond:headingLines[1]};
  const cooperation = read('site/company-copy/shared/cooperation.html').trim()
    .replace(/\{\{(\w+)\}\}/g, (_, key) => {
      if (!(key in cooperationValues)) throw Error('Unknown cooperation token: ' + key);
      return escape(cooperationValues[key]);
    });
  const headerPattern = /(<header\b[^>]*class="fc fchd\b[^"]*"[^>]*>)[\s\S]*?<\/header>/;
  const withBreakpoint = (template, snapshot) => {
    const classes = snapshot.match(/^<\w+\b[^>]*class="([^"]*)"/)[1];
    return template.replace(/^(<\w+\b[^>]*class=")[^"]*"/, '$1' + classes + '"');
  };
  for (const route of pages) {
    const file = 'site/' + (route ? route + '/' : '') + 'index.html';
    let html = read(file);
    html = html.replace(/<meta\b[^>]*name="theme-color"[^>]*>/g, '');
    html = html.replace(/<link\b[^>]*href="\/styles\/shared\/mobile-browser\.css[^"]*"[^>]*>/g, '');
    html = html.replace('</head>', `${mobileTheme}<link rel="stylesheet" href="${mobileBrowserURL}"></head>`);
    if (!headerPattern.test(html)) throw Error('Missing navigation: ' + file);
    html = html.replace(headerPattern, (_, opening) => opening + navigation + '</header>')
      .replace(/<template id="shared-navigation">[\s\S]*?<\/template>/g, '')
      .replace(/<style>footer \.fco-col li:has\(> a\[href="\/legal"\]\)[\s\S]*?<\/style>/g, '')
      .replace(/<footer\b[\s\S]*?<\/footer>/g, snapshot => withBreakpoint(footer, snapshot))
      .replace(/<section\b[^>]*class="fc fcx[^>]*>[\s\S]*?<\/section>/g, snapshot => withBreakpoint(cooperation, snapshot))
      .replace(/<script\b[^>]*src="\/company-copy\/service-menu-link\.js[^"]*"[^>]*><\/script>/g,
        '<script type="module" src="/company-copy/service-menu-link.js?v=shared-1"></script>');
    for (const href of [baseURL, layoutURL]) {
      if (!html.includes(`rel="preload" as="style" href="${href}"`)) html = html.replace('</head>', `<link rel="preload" as="style" href="${href}"></head>`);
    }
    queue(file, html);
  }
  for (const file of filesIn(path.join(site, 'styles/blocks')).filter(f => f.endsWith('.css'))) {
    const source = fs.readFileSync(file, 'utf8');
    const next = factorCSS(source, base, layout);
    if (next !== source) queue(file, next);
  }
  const moduleFiles = [...filesIn(path.join(site, 'company-copy')).filter(f => f.endsWith('.mjs')),
    ...filesIn(path.join(site, '_remote/framerusercontent.com/sites')).filter(f => /\.mjs[\\/]/.test(f) && !f.includes('.map'))];
  for (const file of moduleFiles) {
    const source = fs.readFileSync(file, 'utf8');
    const next = factorModule(source, base, layout);
    if (next !== source) queue(file, next);
  }
  const changes = [...outputs].filter(([file, text]) => !fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== text);
  const saved = changes.reduce((sum, [file, text]) => sum + (fs.existsSync(file) ? fs.statSync(file).size : 0) - Buffer.byteLength(text), 0);
  if (check && changes.length) throw Error('Shared site needs regeneration:\n' + changes.map(([file]) => path.relative(root, file)).join('\n'));
  if (!check) for (const [file, text] of changes) fs.writeFileSync(file, text);
  console.log(`${check ? 'Checked' : 'Updated'} shared site: ${changes.length} files; ${saved} fewer bytes`);
  return {changes, saved};
}

module.exports = {build, pages, factorCSS, factorModule, signatures, baseURL, layoutURL};
if (require.main === module) build({check:process.argv.includes('--check')}).catch(error => {console.error(error);process.exitCode = 1;});
