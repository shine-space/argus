const fs = require('fs');
const path = require('path');
const {pathToFileURL} = require('url');

const root = path.resolve(__dirname, '..');
const site = path.join(root, 'site');
const remoteCta = '/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/FcCta.xuPCq5x9.mjs';
const sharedCta = '/company-copy/FcCta.mjs?v=33';
const importLine = 'import {cooperationContent as __cooperationContent} from "/company-copy/cooperation-content.mjs?v=1";\n';

function patchSharedCooperation(source) {
  if (source.includes('cooperationContent as __cooperationContent')) return source;
  const entry = 'function O(e){';
  if (!source.includes(entry)) throw new Error('Shared cooperation component entry not found');
  return importLine + source.replace(entry, entry + 'e={...e,...__cooperationContent};');
}

function htmlEscape(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function syncSection(section, copy) {
  const headingLabel = copy.heading.replaceAll('|', ' ');
  section = section.replace(/aria-label="[^"]*"/, 'aria-label="' + htmlEscape(headingLabel) + '"');
  section = section.replace(/(<p\b[^>]*class="fc-eb[^"<>]*"[^>]*>)([\s\S]*?)(<\/p>)/, (_, open, old, close) =>
    open + '<i aria-hidden="true"></i>' + htmlEscape(copy.eyebrow) + close);
  section = section.replace(/(<h2\b[^>]*>)[\s\S]*?(<\/h2>)/, (_, open, close) => {
    open = open.replace(/aria-label="[^"]*"/, 'aria-label="' + htmlEscape(headingLabel) + '"');
    return open + copy.heading.split('|').map((line, i) => {
      const delay = 100 + i * 55;
      return '<span class="fc-hd-l" aria-hidden="true"><span class="fc-hd-w"><span class="fc-hd-i" style="transition-delay:' + delay + 'ms;--pd:' + (delay + 500) + 'ms">' + htmlEscape(line) + '</span> </span></span>';
    }).join('') + close;
  });
  section = section.replace(/(<a\b[^>]*class="fcx-core"[^>]*>)([\s\S]*?)(<\/a>)/, (_, open, inner, close) =>
    open.replace(/href="[^"]*"/, 'href="' + copy.buttonLink + '"') + inner.replace(/(<b\b[^>]*>)[\s\S]*?(<\/b>)/, '$1' + htmlEscape(copy.core) + '$2') + close);
  for (const [className, text] of [['fcx-body', copy.body], ['fcx-note', copy.note]]) {
    section = section.replace(new RegExp('(<p\\b[^>]*class="' + className + '"[^>]*>)[\\s\\S]*?(<\\/p>)'),
      '$1' + (className === 'fcx-note' ? '<i aria-hidden="true"></i>' : '') + htmlEscape(text) + '$2');
  }
  section = section.replace(/(<label\b[^>]*for="fcx-email"[^>]*>)[\s\S]*?(<\/label>)/, '$1' + htmlEscape(copy.placeholder) + '$2');
  section = section.replace(/(<input\b[^>]*id="fcx-email"[^>]*placeholder=")[^"]*(")/, '$1' + htmlEscape(copy.placeholder) + '$2');
  return section.replace(/(<button\b[^>]*type="submit"[^>]*>)[\s\S]*?(<\/button>)/, '$1' + htmlEscape(copy.button) + '$2');
}

async function syncCooperation() {
  const {cooperationContent: copy} = await import(pathToFileURL(path.join(site, 'company-copy/cooperation-content.mjs')).href);
  for (const relative of ['company-copy/FcCta.mjs', 'particle-shapes/cta.mjs']) {
    const file = path.join(site, relative);
    const source = fs.readFileSync(file, 'utf8');
    const next = patchSharedCooperation(source);
    if (next !== source) fs.writeFileSync(file, next);
  }
  const updated = [];
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      if (entry.name === '_remote') continue;
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) { visit(file); continue; }
      if (!entry.name.endsWith('.html')) continue;
      let html = fs.readFileSync(file, 'utf8');
      if (!/<section\b[^>]*class="[^"]*\bfcx\b/.test(html)) continue;
      if (!/<script type="importmap">/.test(html)) throw new Error('Import map missing: ' + file);
      html = html.replace(/<script type="importmap">([\s\S]*?)<\/script>/, (_, json) => {
        const map = JSON.parse(json);
        map.imports = {...map.imports, [remoteCta]: sharedCta};
        return '<script type="importmap">' + JSON.stringify(map) + '</script>';
      });
      html = html.replace(/<section\b[^>]*class="[^"]*\bfcx\b[^"]*"[^>]*>[\s\S]*?<\/section>/g, section => syncSection(section, copy));
      fs.writeFileSync(file, html);
      updated.push('/' + path.relative(site, file).replaceAll('\\', '/').replace(/index\.html$/, ''));
    }
  }
  visit(site);
  console.log(JSON.stringify({sharedComponent: sharedCta, pages: updated}, null, 2));
}

module.exports = {patchSharedCooperation, syncCooperation};
if (require.main === module) syncCooperation().catch(error => { console.error(error); process.exitCode = 1; });
