const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const importLine = 'import {heroVisual as __heroVisual,mountSaturnRings as __mountSaturnRings,createEarthMotion as __createEarthMotion} from "/particle-shapes/hero-saturn.mjs?v=6";\n';

function preserveHeroInteractions(source) {
  return source
    .replace('it(__heroVisual===`saturn`?0:e,i)', 'it(e,i)')
    .replace('"data-cur":__heroVisual===`saturn`?``:y', '"data-cur":y')
    .replace('role:__heroVisual===`saturn`?`img`:`button`,tabIndex:__heroVisual===`saturn`?void 0:0,"aria-label":__heroVisual===`saturn`?`自转星球与环绕旋转的粒子星环`:`Morph the core, now showing ${W[ae]}`,onClick:__heroVisual===`saturn`?void 0:()=>le(),onKeyDown:e=>{if(__heroVisual===`saturn`)return;', 'role:`button`,tabIndex:0,"aria-label":`Morph the core, now showing ${W[ae]}`,onClick:()=>le(),onKeyDown:e=>{');
}

function patchEarthMotion(source) {
  source = source.replace(/^import \{heroVisual as __heroVisual,mountSaturnRings as __mountSaturnRings[^\n]+\n/m, importLine);
  if (source.includes('const __earthMotion=')) {
    // Keep the user's original pointer response, morphing and scroll effects.
    return preserveHeroInteractions(source)
      .replace('__earthMotion?(y=0,b=0):(y+=(x-y)*.06,b+=(S-b)*.06);', 'y+=(x-y)*.06,b+=(S-b)*.06;')
      .replace('if(__earthMotion){ringPitch=-.35;shapeYaw=z;}else{ringPitch+=((se.current===1?-.9:-.35)-ringPitch)*(k?1:1-.02**t);let targetYaw=z;shapeYaw+=Math.atan2(Math.sin(targetYaw-shapeYaw),Math.cos(targetYaw-shapeYaw))*(k?1:1-.02**t);}', 'ringPitch+=((se.current===1?-.9:-.35)-ringPitch)*(k?1:1-.02**t);if(__earthMotion){shapeYaw=z;}else{let targetYaw=z;shapeYaw+=Math.atan2(Math.sin(targetYaw-shapeYaw),Math.cos(targetYaw-shapeYaw))*(k?1:1-.02**t);}')
      .replace('let m=__earthMotion||k?0:pt(T/(E*.9))', 'let m=k?0:pt(T/(E*.9))')
      .replace('let f=__earthMotion?1:1+.03*Math.sin(e/900+c[t]*12)', 'let f=1+.03*Math.sin(e/900+c[t]*12)')
      .replace('S=h*N+b*M;if(__earthMotion)[y,x,S]=__earthMotion.project(p,h,g,z);let C=1', 'S=h*N+b*M,C=1')
      .replace('if(!__earthMotion&&j<L*L)', 'if(j<L*L)');
  }
  const changes = [
    [';let i=H?zt:Rt,o=[0,1,2].map(e=>it(__heroVisual===`saturn`?0:e,i))', ';const __earthMotion=__heroVisual===`saturn`?__createEarthMotion():null,__resetEarthClock=()=>__earthMotion?.reset();document.addEventListener(`visibilitychange`,__resetEarthClock);let i=H?zt:Rt,o=[0,1,2].map(e=>it(__heroVisual===`saturn`?0:e,i))'],
    ['C=e[0].isIntersecting},{rootMargin:`20% 0px`}', 'C=e[0].isIntersecting,__earthMotion?.reset()},{rootMargin:`20% 0px`}'],
    ['z+=t*(k?0:.22),y+=(x-y)*.06,b+=(S-b)*.06;', 'z=__earthMotion?__earthMotion.phase(e,C&&!document.hidden,k):z+t*(k?0:.22);y+=(x-y)*.06,b+=(S-b)*.06;'],
    ['let targetYaw=z;shapeYaw+=Math.atan2(Math.sin(targetYaw-shapeYaw),Math.cos(targetYaw-shapeYaw))*(k?1:1-.02**t);', 'if(__earthMotion){shapeYaw=z;}else{let targetYaw=z;shapeYaw+=Math.atan2(Math.sin(targetYaw-shapeYaw),Math.cos(targetYaw-shapeYaw))*(k?1:1-.02**t);}'],
    ['te(),__disposeSaturn(),h.disconnect(),N.disconnect()', 'te(),__disposeSaturn(),document.removeEventListener(`visibilitychange`,__resetEarthClock),h.disconnect(),N.disconnect()']
  ];
  for (const [before, after] of changes) {
    if (!source.includes(before)) throw new Error('Earth motion insertion point missing: ' + before.slice(0, 70));
    source = source.replace(before, after);
  }
  return preserveHeroInteractions(source);
}

function patchSaturnHero(source) {
  source = source.replace('/particle-shapes/molecule.mjs?v=1', '/particle-shapes/molecule.mjs?v=2');
  if (!source.includes('moleculePoint as __heroMoleculePoint')) {
    const shapeFactory = 'function it(e,t){let n=';
    if (!source.includes(shapeFactory)) throw new Error('Third hero shape factory missing');
    source = source.replace(shapeFactory, 'function it(e,t){if(e===2)return Array.from({length:t},(_,index)=>__heroMoleculePoint(index,t));let n=');
    source = 'import {moleculePoint as __heroMoleculePoint} from "/particle-shapes/molecule.mjs?v=2";\n' + source;
  }
  if (!source.includes('"data-core-shape":ae')) source = source.replace('className:`fch-orb`,', 'className:`fch-orb`,"data-core-shape":ae,');
  source = source.replace('className:`fch-orb`,"data-cur":y', 'className:`fch-orb`,"data-cur":__heroVisual===`saturn`?``:y');
  if (source.includes('mountSaturnRings as __mountSaturnRings')) return patchEarthMotion(source);
  source = source.replace(/^import \{heroVisual as __heroVisual,mountSaturnHero as __mountSaturnHero\}[^\n]+\n/, '');
  source = source.replace('if(__heroVisual===`saturn`)return __mountSaturnHero(e,t,{mobile:H,reducedMotion:k,color:ht(n,w.brass,Bt(w.brass))});', '');
  const anchor = 'if(!r)return;let i=H?zt:Rt,o=[0,1,2].map(e=>it(e,i))';
  if (!source.includes(anchor)) throw new Error('Hero renderer insertion point missing');
  source = source.replace(anchor, 'if(!r)return;const __disposeSaturn=__heroVisual===`saturn`?__mountSaturnRings(e,t,{mobile:H,reducedMotion:k,color:ht(n,w.brass,Bt(w.brass))}):()=>{};let i=H?zt:Rt,o=[0,1,2].map(e=>it(__heroVisual===`saturn`?0:e,i))');
  source = source.replace('te(),h.disconnect(),N.disconnect()', 'te(),__disposeSaturn(),h.disconnect(),N.disconnect()');
  source = source.replace('role:`button`,tabIndex:0,"aria-label":`Morph the core, now showing ${W[ae]}`,onClick:()=>le(),onKeyDown:e=>{',
    'role:__heroVisual===`saturn`?`img`:`button`,tabIndex:__heroVisual===`saturn`?void 0:0,"aria-label":__heroVisual===`saturn`?`自转星球与环绕旋转的粒子星环`:`Morph the core, now showing ${W[ae]}`,onClick:__heroVisual===`saturn`?void 0:()=>le(),onKeyDown:e=>{if(__heroVisual===`saturn`)return;');
  return patchEarthMotion(importLine + source);
}

module.exports = {patchSaturnHero};

if (require.main === module) {
  const mode = process.argv.includes('--restore') ? 'original' : 'saturn';
  const renderer = path.join(root, 'site/particle-shapes/hero-saturn.mjs');
  fs.writeFileSync(renderer, fs.readFileSync(renderer, 'utf8').replace(/export const heroVisual = '[^']+';/, `export const heroVisual = '${mode}';`));
  const home = path.join(root, 'site/company-copy/home.mjs');
  fs.writeFileSync(home, patchSaturnHero(fs.readFileSync(home, 'utf8')));
  const html = path.join(root, 'site/index.html');
  fs.writeFileSync(html, fs.readFileSync(html, 'utf8').replace(/\/company-copy\/home\.mjs\?v=(\d+)/g, (_, version) => `/company-copy/home.mjs?v=${Number(version) + 1}`));
  console.log(`Hero visual: ${mode}`);
}
