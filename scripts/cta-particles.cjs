// Build the closing CTA's geographic globe from the original particle component.
const acorn = require('acorn');

function patchCtaParticles(source) {
  if (source.includes('__createEarthRenderer') || source.includes('__ctaBrokenRingPoint')) return source;
  const ast = acorn.parse(source, { ecmaVersion: 'latest', sourceType: 'module' });
  const generator = ast.body.find(node => node.type === 'FunctionDeclaration' && node.id.name === 'D');
  if (!generator || !source.slice(generator.start, generator.end).includes('Math.sqrt(5)')) {
    throw new Error('CTA particle generator changed; inspect before patching');
  }
  const replacement = `function D(shape,count){
    const points=[],goldenAngle=Math.PI*(3-Math.sqrt(5));
    for(let index=0;index<count;index++){
      if(shape===1){points.push(__ctaBrokenRingPoint(index,count));continue;}
      const y=1-2*(index+.5)/count,radius=Math.sqrt(Math.max(0,1-y*y)),angle=index*goldenAngle;
      points.push([Math.cos(angle)*radius,y,Math.sin(angle)*radius]);
    }
    return points;
  }`;
  let output = source.slice(0, generator.start) + replacement + source.slice(generator.end);
  const replaceOnce = (before, after) => {
    if (output.split(before).length !== 2) throw new Error('CTA camera changed: ' + before);
    output = output.replace(before, after);
  };
  replaceOnce('let _=0,v=performance.now()', 'let _=0,__ctaPitch=-.35,v=performance.now()');
  replaceOnce('let f=_,p=-.3,h=Math.cos(f)', '__ctaPitch+=((q.current?-.9:-.35)-__ctaPitch)*(A?1:1-.02**t);let f=_,p=__ctaPitch,h=Math.cos(f)');
  // Both targets use the same extent; entering hover does not shrink the cloud.
  replaceOnce('D=Math.min(u,d)*(q.current?.24:.4)', 'D=Math.min(u,d)*.4');
  output = 'import {brokenRingPoint as __ctaBrokenRingPoint} from "/particle-shapes/broken-ring.mjs";\n' + output;
  acorn.parse(output, { ecmaVersion: 'latest', sourceType: 'module' });
  return output;
}
module.exports = { patchCtaParticles };

function publishCtaParticles(source) {
  const fs = require('fs');
  const path = require('path');
  const base = '/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/';
  const output = require('./sync-cooperation.cjs').patchSharedCooperation(require('./cta-earth.cjs').patchCtaEarth(source).replace(/from(["'])\.\//g, (_, quote) => 'from' + quote + base)
    .replaceAll('https://fonts.googleapis.com', '/_remote/fonts.googleapis.com')
    .replace(/#(?:19d98b|2fbf71|58d68d)\b/gi, '#F36A4B')
    .replace(/25,217,139|47,191,113|88,214,141/g, '243,106,75'));
  fs.writeFileSync(path.resolve(__dirname, '../site/particle-shapes/cta.mjs'), output);
}
module.exports.publishCtaParticles = publishCtaParticles;

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const file = path.resolve(__dirname, '../site/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/FcCta.xuPCq5x9.mjs/plain.zh');
  const output = patchCtaParticles(fs.readFileSync(file, 'utf8'));
  fs.writeFileSync(file, output);
  publishCtaParticles(output);
  console.log('CTA sphere and hover ring updated; module syntax verified.');
}
