function patchHeroPerformance(source) {
  if (source.includes('createParticleSurface as __createParticleSurface')) return source;
  const changes = [
    ['let r=e.getContext(`2d`);if(!r)return;__heroFrameReady.current=!1;', 'let r=__createParticleSurface(e,{capacity:4200,additive:!0});__heroFrameReady.current=!1;'],
    ['{mobile:H,reducedMotion:k,color:ht(n,w.brass,Bt(w.brass))}', '{mobile:H,reducedMotion:k,color:ht(n,w.brass,Bt(w.brass)),manualFrame:!0}'],
    ['f=1,p=1,m=()=>', 'f=1,p=1,__needsPaint=!0,__paintedShape=-1,m=()=>'],
    ['e.width=width;e.height=height}', 'e.width=width;e.height=height;__needsPaint=!0}'],
    ['const __particleColors=Array.from({length:256},(_,i)=>`rgba(${u},${i/255})`),__particleHighlights=Array.from({length:256},(_,i)=>`rgba(255,255,255,${i/255})`);', 'const __particleRgb=u.split(`,`).map(Number).map(v=>v/255),__setMotionVar=(key,value)=>{if(n.style.getPropertyValue(key)!==value)n.style.setProperty(key,value)};'],
    ['B=e,I.current&&(', 'B=e,I.current&&(j||I.current.style.opacity!==`0`)&&('],
    ['!C)return;let i=o[se.current]', '!C||document.hidden)return;if(k&&!__needsPaint&&__paintedShape===se.current)return;__disposeSaturn.draw?.(e);let i=o[se.current]'],
    ['r.setTransform(d,0,0,d,0,0),r.clearRect(0,0,f,p),r.globalCompositeOperation=`lighter`;', 'r.begin(f,p,d);'],
    ['r.fillStyle=l[t]>.15||t%9==0?__particleHighlights[Math.max(0,Math.min(255,Math.round(R*.95*255)))]:__particleColors[Math.max(0,Math.min(255,Math.round(R*255)))],r.fillRect(E-z/2,D-z/2,z,z)', 'const bright=l[t]>.15||t%9==0;r.point(E,D,z,bright?1:__particleRgb[0],bright?1:__particleRgb[1],bright?1:__particleRgb[2],bright?R*.95:R)'],
    ['r.globalCompositeOperation=`source-over`,__heroFrameReady.current=!0,n.style.setProperty(`--sc`,m.toFixed(4)),n.style.setProperty(`--lx`,y.toFixed(4)),n.style.setProperty(`--ly`,b.toFixed(4))', 'r.draw();__needsPaint=!1;__paintedShape=se.current;__heroFrameReady.current=!0;__setMotionVar(`--sc`,m.toFixed(4));__setMotionVar(`--lx`,y.toFixed(4));__setMotionVar(`--ly`,b.toFixed(4))'],
    ['te(),__disposeSaturn(),document.removeEventListener', 'te(),__disposeSaturn(),r.dispose(),document.removeEventListener'],
    ['let[ue,de]=o(0);h(()=>{if(!z||k||A)return;let e=a.setInterval(()=>de(e=>(e+1)%Math.max(1,re.length)),1800);return()=>a.clearInterval(e)},[z,k,A,re.length]);', ''],
  ];
  for (const [before, after] of changes) {
    if (!source.includes(before)) throw new Error('Hero performance target missing: ' + before);
    source = source.replace(before, after);
  }
  return 'import {createParticleSurface as __createParticleSurface} from "/particle-shapes/particle-surface.mjs";\n' + source;
}
module.exports = {patchHeroPerformance};

function patchMotionLayout(source) {
  if (source.includes('whileVisible as __whileVisible')) return source;
  const changes = [
    ['shapeYaw=0,te=Xe(', 'shapeYaw=0,__readViewport=()=>{T=a.scrollY;E=a.innerHeight||1};__readViewport();a.addEventListener(`scroll`,__readViewport,{passive:!0});a.addEventListener(`resize`,__readViewport,{passive:!0});let te=Xe('],
    ['},()=>{T=a.scrollY,E=a.innerHeight||1});return()=>{__heroFrameReady', '});return()=>{a.removeEventListener(`scroll`,__readViewport);a.removeEventListener(`resize`,__readViewport);__heroFrameReady'],
    ['l=0;return fe(e=>{let a=Math.min(.05,(e-r)/1e3)', 'l=0;return __whileVisible(e,()=>fe(e=>{let a=Math.min(.05,(e-r)/1e3)'],
    ['},()=>{i=e.offsetWidth||1,o=e.offsetHeight||1,c=a.scrollY})},[g,_,C,w.length])', '},()=>{i=e.offsetWidth||1,o=e.offsetHeight||1,c=a.scrollY}))},[g,_,C,w.length])'],
  ];
  for (const [before, after] of changes) {
    if (!source.includes(before)) throw new Error('Motion layout target missing: ' + before);
    source = source.replace(before, after);
  }
  return 'import {whileVisible as __whileVisible} from "/particle-shapes/visible-motion.mjs";\n' + source;
}
module.exports.patchMotionLayout = patchMotionLayout;
