const acorn = require('acorn');

function patchCtaEarth(source) {
  if (source.includes('__createEarthRenderer')) return source;
  const ast = acorn.parse(source, {ecmaVersion: 'latest', sourceType: 'module'});
  let effect;
  const walk = node => {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'CallExpression' && node.callee.name === 'd' &&
        node.arguments[0]?.type === 'ArrowFunctionExpression' &&
        source.slice(node.arguments[0].start, node.arguments[0].end).includes('getContext(`2d`)')) {
      effect = node.arguments[0];
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(walk);
      else if (value && typeof value === 'object') walk(value);
    }
  };
  walk(ast);
  if (!effect) throw new Error('CTA canvas effect changed; inspect before patching');
  const replacement = `()=>{
    const canvas=N.current,section=M.current;
    if(!canvas||!section||!k)return;
    const draw=__createEarthRenderer(canvas,{mobile:H,reducedMotion:A,color:z(section,g.brass,$(g.brass)),hovered:()=>q.current});
    let visible=false,offsetX=0,offsetY=0,targetX=0,targetY=0;
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{rootMargin:'10% 0px'});
    observer.observe(section);
    const magnetic=!A&&r.matchMedia('(hover:hover) and (pointer:fine)').matches;
    const move=event=>{
      if(!P.current)return;
      const rect=P.current.parentElement.getBoundingClientRect();
      const dx=event.clientX-(rect.left+rect.width/2),dy=event.clientY-(rect.top+rect.height/2);
      const strength=Math.max(0,1-Math.hypot(dx,dy)/320);
      targetX=dx*strength*.35;targetY=dy*strength*.35;
    };
    const leave=()=>{targetX=targetY=0;};
    if(magnetic){section.addEventListener('pointermove',move);section.addEventListener('pointerleave',leave);}
    const stop=x(time=>{
      if(magnetic&&P.current){
        offsetX+=(targetX-offsetX)*.12;offsetY+=(targetY-offsetY)*.12;
        P.current.style.transform='translate('+offsetX.toFixed(1)+'px,'+offsetY.toFixed(1)+'px)';
      }
      if(visible)draw(time);
    });
    return()=>{stop();observer.disconnect();section.removeEventListener('pointermove',move);section.removeEventListener('pointerleave',leave);};
  }`;
  source = source.slice(0, effect.start) + replacement + source.slice(effect.end);
  // The old hover ring is replaced by the same geographic globe in every state.
  source = source.replace(/^import \{brokenRingPoint as __ctaBrokenRingPoint\}[^\n]*\n/, '');
  source = source.replace(/function D\(shape,count\)\{[\s\S]*?return points;\s*\}/, '');
  source = 'import {createEarthRenderer as __createEarthRenderer} from "/particle-shapes/earth.mjs?v=1";\n' + source;
  acorn.parse(source, {ecmaVersion: 'latest', sourceType: 'module'});
  return source;
}

module.exports = {patchCtaEarth};

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  for (const name of ['site/company-copy/FcCta.mjs', 'site/particle-shapes/cta.mjs']) {
    const file = path.resolve(__dirname, '..', name);
    fs.writeFileSync(file, patchCtaEarth(fs.readFileSync(file, 'utf8')));
  }
  const index = path.resolve(__dirname, '../site/index.html');
  const html = fs.readFileSync(index, 'utf8').replace(/\/company-copy\/FcCta\.mjs\?v=\d+/g, '/company-copy/FcCta.mjs?v=32');
  fs.writeFileSync(index, html);
  console.log('CTA now renders the geographic particle globe.');
}
