const fs = require('node:fs');
const path = require('node:path');

const site = path.join(__dirname, '..', 'site');
const headerPattern = /(<header\b[^>]*class="fc fchd\b[^"]*"[^>]*>)[\s\S]*?<\/header>/;
const shared = fs.readFileSync(path.join(site, 'company-copy', 'navigation.html'), 'utf8').trim();
const runtime = '<template id="shared-navigation">' + shared + '</template>' +
  '<style>footer .fco-col li:has(> a[href="/legal"]) { display: none !important; } .fchd .fchd-drawer { grid-template-columns: minmax(0, 1fr); max-width: 660px; } .fchd .fchd-drawer > .fchd-feat { display: none; } .fchd-list > .fchd-all, .fchd-nav > ul > li:nth-child(n+6), a[href="/services/knowledge-base"], a[href="/services/custom-ai-apps"], li:has(> :is(a[href="/services/knowledge-base"], a[href="/services/custom-ai-apps"])) { display: none !important; }</style>' +
  '<script src="/company-copy/service-menu-link.js?v=16" defer></script>';

let updated = 0;
function sync(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('_')) sync(file);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;
    const html = fs.readFileSync(file, 'utf8');
    if (!headerPattern.test(html)) continue;
    const next = html
      .replace(/<head>(?!<script src="\/product-routes\.js")/, '<head><script src="/product-routes.js"></script>')
      .replace(headerPattern, (_, opening) => opening + shared + '</header>')
      .replace(/<template id="shared-navigation">[\s\S]*?<\/template><style>[^<]*<\/style>/g, '')
      .replace(/<script src="\/company-copy\/service-menu-link\.js[^"]*" defer><\/script>/g, '')
      .replace(/zh-cn\.css\?v=[\w-]+/g, 'zh-cn.css?v=20261112-navigation-current')
      .replace(/zh-cn\.js\?v=\d+/g, 'zh-cn.js?v=5')
      .replace(/navigation\.js\?v=\d+/g, 'navigation.js?v=10')
      .replace('</body>', runtime + '</body>');
    if (next !== html) fs.writeFileSync(file, next);
    updated++;
  }
}

sync(site);
console.log(`Shared navigation synchronized across ${updated} pages`);
