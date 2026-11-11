const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');

const root = path.resolve(__dirname, '..');
const site = path.join(root, 'site');
const output = path.join(root, '.cache', 'precompressed');
fs.mkdirSync(output, { recursive: true });
const runtime = path.join(site, 'stylesheet-runtime.js');
const sheets = fs.readdirSync(path.join(site, 'styles', 'blocks')).filter(name => name.endsWith('.css')).sort();
fs.writeFileSync(runtime, fs.readFileSync(runtime, 'utf8').replace(
  /\/\* stylesheet-manifest:start \*\/[\s\S]*?\/\* stylesheet-manifest:end \*\//,
  '/* stylesheet-manifest:start */' + JSON.stringify(sheets) + '/* stylesheet-manifest:end */',
));
const manifest = {};
let originalBytes = 0, brotliBytes = 0;
function visit(directory) {
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    if (['_remote', 'node_modules'].includes(item.name)) continue;
    const file = path.join(directory, item.name);
    if (item.isDirectory()) { visit(file); continue; }
    if (!/\.(html|css|js|mjs|json|svg|txt)$/.test(item.name)) continue;
    const stat = fs.statSync(file, { bigint: true });
    if (stat.size < 1024n) continue;
    const relative = path.relative(site, file).split(path.sep).join('/');
    const body = fs.readFileSync(file);
    const compressed = zlib.brotliCompressSync(body, { params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 5,
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
    } });
    if (compressed.length >= body.length) continue;
    const name = crypto.createHash('sha256').update(relative).digest('hex') + '.br';
    fs.writeFileSync(path.join(output, name), compressed);
    manifest[relative] = { size: Number(stat.size), mtime_ns: String(stat.mtimeNs), file: name };
    originalBytes += body.length;
    brotliBytes += compressed.length;
  }
}
visit(site);
fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest));
console.log(JSON.stringify({ files: Object.keys(manifest).length, originalBytes, brotliBytes }));
