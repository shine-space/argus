const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const acorn = require('acorn');

const footerBundleQuery = 'brand=9';
const footerTagline = '从朝到夕，把日常工作做好';
const footerColumns = [
  { h: '产品', l: [
    { l: '智能体平台', h: '/product/agent' },
    { l: '工业模型工程', h: '/product/model' },
    { l: '智能硬件', h: '/product/hardware' },
  ] },
  { h: '解决方案', l: [
    { l: '业务场景', h: '/work' },
    { l: '文档中心', h: '/process' },
    { l: '交付服务', h: '/pricing' },
    { l: '关于我们', h: '/about' },
  ] },
  { h: '公司', l: [
    { l: '关于我们', h: '/about' },
    { l: '需求沟通', h: '/book?plan=audit' },
  ] },
];

function removeFooterBand(source) {
  return source.replace("v(`a`,{className:`fco-band`,href:r,\"aria-label\":t,children:[T(t,0),T(n,1)]}),", "");
}

function patchFooterBrand(source) {
  if (source.includes('className:`fco-logo`,href:`/`,style:u,"aria-label":"朝夕智能，首页"')) return source;
  const edits = [
    ['className:`fco-logo`,href:`/`,style:u,children:[x(ee,{}),g.name||`argus`]', 'className:`fco-logo`,href:`/`,style:u,"aria-label":"朝夕智能，首页",children:[x("img",{src:"/brand/logo_w.svg",alt:"朝夕智能",width:131,height:32})]'],
    ['className:`fco-tag`,children:g.tagline', 'className:`fco-tag`,children:"从朝到夕，让价值持续生长"'],
    ['className:`fco-mail`,href:`mailto:${g.email}`,style:u,children:g.email', 'className:`fco-mail`,href:"mailto:content@zhaoxi-ai.com",style:u,children:"content@zhaoxi-ai.com"'],
    ['className:`fco-meta`,style:p,children:[g.phone&&x(`a`,{href:`tel:${at(g.phone)}`,children:g.phone}),x(`span`,{children:g.address}),x(`span`,{children:g.hours})]', 'className:`fco-meta`,style:p,children:"中国 · 深圳"'],
    ['children:[`© 2026 `,g.name||`argus`,`. `,a]', 'children:"© 2026 朝夕智能"'],
  ];
  for (const [before, after] of edits) {
    if (source.split(before).length !== 2) throw new Error('Footer source changed: ' + before);
    source = source.replace(before, after);
  }
  return source;
}

function removeFooterContacts(source) {
  const ast = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  const edits = [];
  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'CallExpression' && node.arguments[1]?.type === 'ObjectExpression') {
      const field = node.arguments[1].properties.find(property =>
        (property.key?.name || property.key?.value) === 'className');
      const value = field?.value;
      const className = value?.type === 'Literal' ? value.value :
        value?.type === 'TemplateLiteral' && value.expressions.length === 0 ? value.quasis[0].value.cooked : null;
      if (className === 'fco-mail' || className === 'fco-meta') {
        edits.push({ start: node.start, end: node.end });
        return;
      }
    }
    for (const child of Object.values(node)) {
      if (Array.isArray(child)) child.forEach(visit);
      else if (child && typeof child === 'object') visit(child);
    }
  }
  visit(ast);
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    source = source.slice(0, edit.start) + 'null' + source.slice(edit.end);
  }
  return source;
}

function patchFooter(source) {
  const branded = patchFooterBrand(source).replaceAll('1@zhaoxi-ai.com', 'content@zhaoxi-ai.com');
  const columns = /,C=(?:Ct\(i\)\.map\(e=>\{[\s\S]*?\}\)\.slice\(0,3\)|\/\* shared footer \*\/[\s\S]*?)(?=,w=St\(g\.socials\))/;
  const serialized = ',C=/* shared footer */' + JSON.stringify(footerColumns);
  if (!columns.test(branded)) throw new Error('Footer column source changed');
  const updated = removeFooterContacts(removeFooterBand(branded))
    .replace(columns, () => serialized)
    .replace(/className:`fco-tag`,children:"[^"]*"/, () => 'className:`fco-tag`,children:' + JSON.stringify(footerTagline));
  acorn.parse(updated, { ecmaVersion: 'latest', sourceType: 'module' });
  return updated;
}

// Version the cached asset so an already-running preview reads the new source.
function publishFooter(source) {
  const dir = path.resolve(__dirname, '../site/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/script_main.Dz3kE6Zy.mjs');
  const version = crypto.createHash('sha256').update(footerBundleQuery).digest('hex').slice(0, 16);
  fs.copyFileSync(path.join(dir, 'plain'), path.join(dir, version));
  fs.copyFileSync(path.join(dir, 'plain.json'), path.join(dir, version + '.json'));
  fs.writeFileSync(path.join(dir, version + '.zh'), source);
}

function syncFooterPages() {
  const site = path.resolve(__dirname, '../site');
  const sitemap = fs.readFileSync(path.join(site, 'sitemap.xml'), 'utf8');
  const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const nav = /(?:<nav class="fco-col"[^>]*>[\s\S]*?<\/nav>)+/;
  const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, url]) => new URL(url).pathname)
    .filter(route => route !== '/process' && !route.startsWith('/process/'));
  for (const route of pages) {
    const file = path.join(site, route, 'index.html');
    const html = fs.readFileSync(file, 'utf8');
    const updated = html
      .replace(/script_main\.Dz3kE6Zy\.mjs\?brand=\d+/g, 'script_main.Dz3kE6Zy.mjs?' + footerBundleQuery)
      .replace(/(<script\b[^>]*\bsrc="[^" ]*\/script_main\.Dz3kE6Zy\.mjs)(?=")/g, (_, script) => script + '?' + footerBundleQuery)
      .replace(/<footer class="fc fco\b[^>]*>[\s\S]*?<\/footer>/g, footer => {
        const headingStyle = footer.match(/<nav class="fco-col"[^>]*><p([^>]*)>/)?.[1];
        if (headingStyle === undefined || !nav.test(footer)) throw new Error('Unexpected footer markup in ' + file);
        const columns = footerColumns.map(({ h, l }) =>
          '<nav class="fco-col" aria-label="' + escape(h) + '"><p' + headingStyle + '>' + escape(h) + '</p><ul>' +
          l.map(link => '<li><a href="' + escape(link.h) + '">' + escape(link.l) + '</a></li>').join('') + '</ul></nav>'
        ).join('');
        return footer.replace(nav, () => columns)
          .replace(/<a\b[^>]*class="fco-mail"[^>]*>[\s\S]*?<\/a>/g, '')
          .replace(/<p\b[^>]*class="fco-meta"[^>]*>[\s\S]*?<\/p>/g, '')
          .replaceAll('1@zhaoxi-ai.com', 'content@zhaoxi-ai.com')
          .replaceAll('深圳市福田区XXXXX', '中国 · 深圳')
          .replace(/(<p class="fco-tag"[^>]*>)[^<]*(<\/p>)/, (_, start, end) => start + escape(footerTagline) + end);
      });
    if (updated !== html) fs.writeFileSync(file, updated);
  }
  console.log('Shared footer synchronized across', pages.length, 'pages');
}

module.exports = { patchFooter, publishFooter };
if (require.main === module) {
  const file = path.resolve(__dirname, '../site/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/script_main.Dz3kE6Zy.mjs/plain.zh');
  const output = patchFooter(fs.readFileSync(file, 'utf8'));
  fs.writeFileSync(file, output);
  publishFooter(output);
  syncFooterPages();
}
