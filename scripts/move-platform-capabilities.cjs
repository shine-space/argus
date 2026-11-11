const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const acorn = require('acorn');
const { findCall, removeHomepageCapabilities } = require('./platform-capabilities.cjs');

const root = path.resolve(__dirname, '..');
const site = path.join(root, 'site');
const remote = '/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/';
const routeModule = '4nXk-eYK6Cxa-LjpCCUxs9P1t_xkxB3FIYKVnt-SLeQ.Dev3sOEX.mjs';
const homePath = path.join(site, 'company-copy/home.mjs');
const indexPath = path.join(site, 'index.html');
const voicePath = path.join(site, 'services/voice-agents/index.html');
const generatorPath = path.join(root, 'scripts/company-copy.cjs');
const home = fs.readFileSync(homePath, 'utf8');
const index = fs.readFileSync(indexPath, 'utf8');
const voice = fs.readFileSync(voicePath, 'utf8');

const call = findCall(home, 'framer-kbb3qa');
if (!call) throw new Error('Homepage capabilities section missing');
let componentProps;
function findProps(node) {
  if (!node || typeof node !== 'object' || componentProps) return;
  if (node.type === 'CallExpression' && node.arguments[0]?.name === 're' && node.arguments[1]?.type === 'ObjectExpression') {
    componentProps = home.slice(node.arguments[1].start, node.arguments[1].end);
    return;
  }
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(findProps);
    else if (value && typeof value === 'object') findProps(value);
  }
}
findProps(call);
if (!componentProps) throw new Error('Original capabilities props missing');

const wrapperStart = index.indexOf('<div class="framer-kbb3qa"');
if (wrapperStart < 0) throw new Error('Homepage SSR wrapper missing');
const tags = /<div\b[^>]*>|<\/div\s*>/g;
tags.lastIndex = wrapperStart;
let depth = 0, wrapperEnd = -1, match;
while ((match = tags.exec(index))) {
  depth += match[0].startsWith('</') ? -1 : 1;
  if (depth === 0) { wrapperEnd = tags.lastIndex; break; }
}
if (wrapperEnd < 0) throw new Error('Homepage SSR wrapper unbalanced');
const sectionStart = index.indexOf('<section class="fc fcl', wrapperStart);
const sectionEnd = index.indexOf('</section>', sectionStart) + '</section>'.length;
if (sectionStart < wrapperStart || sectionEnd > wrapperEnd) throw new Error('Capabilities SSR section missing');
const sectionHtml = index.slice(sectionStart, sectionEnd);

const python = path.join(process.env.USERPROFILE, '.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe');
const transformed = spawnSync(python, ['-c', [
  'from pathlib import Path',
  'import sys',
  'sys.path.insert(0, str(Path("scripts").resolve()))',
  'from common import transform',
  `source=Path("site/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/${routeModule}/plain.zh").read_text(encoding="utf-8")`,
  `print(transform(source,script=True).replace('from"./','from"${remote}'),end="")`
].join('\n')], { cwd: root, encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' }, maxBuffer: 2 * 1024 * 1024 });
if (transformed.status !== 0) throw new Error(transformed.stderr);
let service = transformed.stdout;
const bodyMarker = 'd(`section`,{className:`fcsv-body`';
if (service.split(bodyMarker).length !== 2) throw new Error('Service body boundary changed');
service = [
  'import{n as __initCapabilities,t as __PlatformCapabilities}from"/company-copy/FcLogos.mjs?v=39";',
  'import __platformCapabilitiesProps from"/company-copy/platform-capabilities-props.mjs?v=1";',
  service.replace('function z(e){', 'function z(e){__initCapabilities();').replace(bodyMarker,
    'w.slug===`voice-agents`&&d(__PlatformCapabilities,__platformCapabilitiesProps),' + bodyMarker)
].join('\n');
const nextHome = removeHomepageCapabilities(home);
let nextIndex = index.slice(0, wrapperStart) + index.slice(wrapperEnd);
nextIndex = nextIndex.replace('/company-copy/home.mjs?v=58', '/company-copy/home.mjs?v=59');
const bodyHtml = '<section class="fcsv-body"';
if (voice.split(bodyHtml).length !== 3) throw new Error('Expected desktop and mobile service bodies');
let nextVoice = voice.replaceAll(bodyHtml, sectionHtml + bodyHtml).replace(/\/zh-cn\.css\?v=\d+/g, '/zh-cn.css?v=96');
nextVoice = nextVoice.replace(/<script type="importmap">(.*?)<\/script>/, (_, json) => {
  const map = JSON.parse(json);
  map.imports[remote + routeModule] = '/company-copy/voice-agents.mjs?v=1';
  return '<script type="importmap">' + JSON.stringify(map) + '</script>';
});
let generator = fs.readFileSync(generatorPath, 'utf8');
const generatorMarker = " if(name===home)s=require('./hero-saturn.cjs').patchSaturnHero(s);";
if (!generator.includes(generatorMarker)) throw new Error('Generator insertion point missing');
generator = generator.replace(generatorMarker, generatorMarker + "\n if(name===home)s=require('./platform-capabilities.cjs').removeHomepageCapabilities(s);");

for (const source of [service, nextHome, generator, 'export default ' + componentProps]) {
  acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
}
const backup = path.join(root, 'artifacts/platform-capabilities-move-backup');
fs.mkdirSync(backup, { recursive: true });
for (const [name, source] of Object.entries({ 'home.mjs': home, 'home.html': index, 'voice-agents.html': voice, 'company-copy.cjs': fs.readFileSync(generatorPath, 'utf8') })) {
  const target = path.join(backup, name);
  if (!fs.existsSync(target)) fs.writeFileSync(target, source);
}
fs.writeFileSync(path.join(site, 'company-copy/platform-capabilities-props.mjs'), 'export default ' + componentProps + ';\n');
fs.writeFileSync(path.join(site, 'company-copy/voice-agents.mjs'), service);
fs.writeFileSync(homePath, nextHome);
fs.writeFileSync(indexPath, nextIndex);
fs.writeFileSync(voicePath, nextVoice);
fs.writeFileSync(generatorPath, generator);
console.log('Moved the original capabilities carousel from home to the middle of voice-agents, including SSR and generator alignment.');
