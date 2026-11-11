// Change actual JavaScript string values, preserving code, enums and property keys.
const fs=require('fs'),path=require('path'),acorn=require('acorn');
const root=path.resolve(__dirname,'..');
const dictionary=JSON.parse(fs.readFileSync(path.join(root,'site/zh-cn.json'),'utf8'));
const normalize=s=>s.replace(/\s+/g,' ').trim();
const protectedValues=new Set(['All','Live','Running','Scheduled','Open','Close']);
const base=path.join(root,'site/_remote/framerusercontent.com/sites');
let files=0,replacements=0;const changes=[];
function transform(filename){
  const source=fs.readFileSync(filename,'utf8');
  const ast=acorn.parse(source,{ecmaVersion:'latest',sourceType:'module'});
  const edits=[];
  const heroModule=path.basename(path.dirname(filename)).startsWith('-5DwPJsa9pWeM4C-1pOHWNvuXhnxE6_8iwkR9WlXQp8.');
  const headerModule=path.basename(path.dirname(filename)).startsWith('script_main.');
  const serviceModule=path.basename(path.dirname(filename)).startsWith('4nXk-eYK6Cxa-LjpCCUxs9P1t_xkxB3FIYKVnt-SLeQ.');
  let loaderPatched=false;
  const scopedCopy=new Map();
  function visit(node,parent,key){
    if(!node||typeof node!=='object')return;
    let value;
    if(node.type==='Literal'&&typeof node.value==='string')value=node.value;
    if(node.type==='TemplateLiteral'&&node.expressions.length===0)value=node.quasis[0].value.cooked;
    if(value!==undefined){
      const translated=scopedCopy.get(node)??dictionary[normalize(value)];
      const internal=parent&&(parent.type==='SwitchCase'||parent.type==='BinaryExpression'||parent.type==='MemberExpression'||parent.type==='Property'&&key==='key'||parent.type==='ImportDeclaration'||parent.type==='ExportNamedDeclaration');
      const identifier=/^[a-z][a-z0-9_-]*$/.test(value);
      if(!internal&&!identifier&&!protectedValues.has(value)&&translated!==undefined&&translated!==value&&(value.length>=12||/[A-Z]/.test(value))){
        edits.push({start:node.start,end:node.end,value:JSON.stringify(translated),before:value,after:translated});
      }
      // A template contains TemplateElements; do not visit it twice.
      return;
    }
  }
  function walk(node,parent,key){
    if(!node||typeof node!=='object')return;
    if(serviceModule&&node.type==='CallExpression'){
      const props=node.arguments[1];
      const className=props?.type==='ObjectExpression'&&props.properties.find(p=>(p.key?.name??p.key?.value)==='className');
      if(staticString(className?.value)==='fcsv-copy'){
        const children=props.properties.find(p=>(p.key?.name??p.key?.value)==='children')?.value;
        if(children?.type==='ArrayExpression')edits.push({start:children.start+1,end:children.start+1,value:'w.slug==="workflow-automation"&&u("p",{className:"fc-eb is-on workflow-hero-label",style:v,children:[d("i",{"aria-hidden":!0}),"工业模型工程"]}),'});
      }
      if(node.callee.name==='ze'&&props?.type==='ObjectExpression'&&props.properties.some(p=>(p.key?.name??p.key?.value)==='tag'&&staticString(p.value)==='h1')){
        const text=props.properties.find(p=>(p.key?.name??p.key?.value)==='text').value;
        edits.push({start:text.start,end:text.end,value:`w.slug==="workflow-automation"?"从现场数据|到适合工业任务的 *模型*":${source.slice(text.start,text.end)}`});
      }
      if(['fcsv-cr','fcsv-meta','fcsv-cta','fcsv-body'].includes(staticString(className?.value))){
        edits.push({start:node.start,end:node.start,value:'(w.slug==="workflow-automation"?null:'});
        edits.push({start:node.end,end:node.end,value:')'});
      }
    }
    if(headerModule&&node.type==='FunctionDeclaration'&&source.slice(node.start,node.end).includes('fcpt-enter')){
      edits.push({start:node.body.start,end:node.body.end,value:'{return null}'});
      return;
    }
    // Remove the homepage's complete Manifesto wrapper, including its layout
    // space; the shared component remains available to any other pages.
    if(heroModule&&node.type==='CallExpression'&&node.arguments[1]?.type==='ObjectExpression'&&node.arguments[1].properties.some(p=>(p.key?.value??p.key?.name)==='data-framer-name'&&staticString(p.value)==='Manifesto')){
      edits.push({start:node.start,end:node.end,value:'null',before:source.slice(node.start,node.end),after:'null'});
      return;
    }
    // Replace only the opening loader's text-sampled target, preserving its
    // existing orbit, aggregation, collapse and circular reveal animation.
    if(headerModule&&node.type==='VariableDeclarator'&&node.id?.name==='k'&&node.init?.type==='ArrowFunctionExpression'&&source.slice(node.init.body.start,node.init.body.end).includes('n.fillText(h,m/2,t.height/2)')){
      const value='{let h=Math.min(m*(v?.2:.14),g*.26,220),w=h*__loaderMarkAspect,total=__loaderMarkPoints.length/2;for(let e=0;e<x;e++){let at=Math.floor(e/x*total)*2;T[e].tx=m/2+(__loaderMarkPoints[at]-.5)*w;T[e].ty=g/2+(__loaderMarkPoints[at+1]-.5)*h}}';
      edits.push({start:node.init.body.start,end:node.init.body.end,value,before:source.slice(node.init.body.start,node.init.body.end),after:value});
      loaderPatched=true;
      return;
    }
    // Sphere, reference-shaped round tube arcs, then the original network.
    if(heroModule&&node.type==='FunctionDeclaration'&&node.id?.name==='it'){
      const loop=node.body.body.find(item=>item.type==='ForStatement');
      const sphere=loop?.body.body.find(item=>item.type==='IfStatement');
      const torus=sphere?.alternate;
      if(sphere?.test?.right?.value!==0||torus?.test?.right?.value!==1)throw new Error('Hero shape generator changed; inspect before patching');
      const ball='{let e=1-2*(a+.5)/t,i=Math.sqrt(Math.max(0,1-e*e)),s=a*r;n.push([Math.cos(s)*i,e,Math.sin(s)*i])}';
      const ring='{n.push(__heroBrokenRingPoint(a,t))}';
      for(const [branch,value] of [[sphere.consequent,ball],[torus.consequent,ring]])edits.push({start:branch.start,end:branch.end,value,before:source.slice(branch.start,branch.end),after:value});
      return;
    }
    // The header reuses this logo renderer in desktop and phone navigation.
    if(headerModule&&node.type==='VariableDeclarator'&&node.init?.type==='ArrowFunctionExpression'){
      const call=node.init.body,props=call?.arguments?.[1];
      const logo=props?.type==='ObjectExpression'&&props.properties.some(property=>
        property.key?.name==='className'&&source.slice(property.value.start,property.value.end)==='`fchd-logo`');
      if(logo){
        const render=call.callee.name;
        const output=`()=>${render}("a",{className:"fchd-logo",href:"/","aria-label":"朝夕智能，首页",children:[${render}("img",{className:"chaoxi-logo-white",src:"/brand/logo_w.svg",alt:"",width:131,height:32},"white"),${render}("img",{className:"chaoxi-logo-light",src:"/brand/logo_l.svg",alt:"",width:131,height:32},"light")]})`;
        edits.push({start:node.init.start,end:node.init.end,value:output,before:source.slice(node.init.start,node.init.end),after:output});
        return;
      }
    }
    // Change only the homepage Hero CTA, preserving other booking buttons.
    if(heroModule&&node.type==='Property'&&(node.key.name??node.key.value)==='button1'){
      const value=node.value.type==='AssignmentPattern'?node.value.right:node.value;
      if(value.type==='Literal'||value.type==='TemplateLiteral')scopedCopy.set(value,'探索业务应用');
    }
    // Keep the header's drawer trigger matched to the renamed navigation link.
    if(headerModule&&node.type==='Property'&&(node.key.name??node.key.value)==='megaLabel'){
      const value=node.value.type==='AssignmentPattern'?node.value.right:node.value;
      if(value.type==='Literal'||value.type==='TemplateLiteral')scopedCopy.set(value,'产品能力');
    }
    if(node.type==='Literal'&&typeof node.value==='string'||node.type==='TemplateLiteral'&&node.expressions.length===0){visit(node,parent,key);return;}
    for(const [k,v]of Object.entries(node)){
      if(Array.isArray(v)){for(const c of v)if(c?.type)walk(c,node,k);}
      else if(v?.type)walk(v,node,k);
    }
  }
  walk(ast);
  if(headerModule&&!loaderPatched)throw new Error('Opening loader target changed; inspect before patching');
  let output=source;
  for(const edit of edits.sort((a,b)=>b.start-a.start))output=output.slice(0,edit.start)+edit.value+output.slice(edit.end);
  if(heroModule){
    const heroTags='M=At(t,j.role),N=At(m,j.intake)';
    if(!output.includes(heroTags))throw new Error('Hero tag bindings changed; inspect before patching');
    output=output.replace(heroTags,'M="FDE 现场工程",N="工业模型"');
    const chipLabel='d(`b`,{children:e.a}),d(`span`,{style:D,children:e.b})';
    if(output.split(chipLabel).length!==2)throw new Error('Hero chip label renderer changed; inspect before patching');
    output=output.replace(chipLabel,'d(`b`,{children:t===0?"AI Agent 平台":e.a}),t===0?null:d(`span`,{style:D,children:e.b})');
    const chipList='re.map((e,t)=>u(`li`,{className:`fch-chip';
    if(output.split(chipList).length!==2)throw new Error('Hero chip list changed; inspect before patching');
    output=output.replace(chipList,'re.slice(0,1).map((e,t)=>u(`li`,{className:`fch-chip');
    // Ease the ring into a readable three-quarter view, then return the camera
    // to its original pitch for the other shapes without a rotation jump.
    const start='let z=0,B=performance.now(),V=0,U=0,te=Xe(';
    const angle='let m=k?0:pt(T/(E*.9)),h=z+y*.9,g=-.35+b*.6';
    if(!output.includes(start)||!output.includes(angle))throw new Error('Hero camera changed; inspect before patching');
    output=output.replace(start,'let z=0,B=performance.now(),V=0,U=0,ringPitch=-.35,shapeYaw=0,te=Xe(')
      .replace(angle,'ringPitch+=((se.current===1?-.9:-.35)-ringPitch)*(k?1:1-.02**t);let targetYaw=z;shapeYaw+=Math.atan2(Math.sin(targetYaw-shapeYaw),Math.cos(targetYaw-shapeYaw))*(k?1:1-.02**t);let m=k?0:pt(T/(E*.9)),h=shapeYaw+y*.9,g=ringPitch+b*.6');
    const labels='let re=Lt(_).slice(0,3)';
    if(!output.includes(labels)||!output.includes('(se.current+1)%3')||!output.includes('o=[0,1,2].map'))throw new Error('Hero cycle changed; inspect before patching');
    output=output.replace(labels,'W.splice(0,3,"企业知识","业务执行","系统连接");'+labels);
  }
  // Keep hydration and subsequent route renders on the external stylesheets.
  // Only replace stylesheet elements; animated React style props stay intact.
  const cssAst=acorn.parse(output,{ecmaVersion:'latest',sourceType:'module'}),cssEdits=[];
  function staticString(node){return node?.type==='TemplateLiteral'&&node.expressions.length===0?node.quasis[0].value.cooked:node?.value;}
  function cssWalk(node){
    if(!node||typeof node!=='object')return;
    if(node.type==='CallExpression'&&staticString(node.arguments[0])==='style'){
      const props=node.arguments[1];
      const inner=props?.properties?.find(p=>(p.key?.name??p.key?.value)==='dangerouslySetInnerHTML');
      const text=inner?.value?.properties?.find(p=>(p.key?.name??p.key?.value)==='__html')?.value;
      if(text){
        cssEdits.push({start:node.arguments[0].start,end:node.arguments[0].end,value:'"link"'});
        cssEdits.push({start:inner.start,end:inner.end,value:`rel:"stylesheet",href:window.__argusStylesheet(${output.slice(text.start,text.end)})`});
      }
    }
    for(const value of Object.values(node)){
      if(Array.isArray(value))value.forEach(child=>child?.type&&cssWalk(child));
      else if(value?.type)cssWalk(value);
    }
  }
  cssWalk(cssAst);
  for(const edit of cssEdits.sort((a,b)=>b.start-a.start))output=output.slice(0,edit.start)+edit.value+output.slice(edit.end);
  if(heroModule)output='import {brokenRingPoint as __heroBrokenRingPoint} from "/particle-shapes/broken-ring.mjs";\n'+output;
  if(headerModule)output='import {loaderMarkPoints as __loaderMarkPoints,loaderMarkAspect as __loaderMarkAspect} from "/particle-shapes/loader-mark.mjs";\n'+output;
  if(headerModule){
    const footer=require('./footer-brand.cjs');
    output=footer.patchFooter(output);
    footer.publishFooter(output);
  }
  if(path.basename(path.dirname(filename)).startsWith('FcCta.')){
    const cta=require('./cta-particles.cjs');
    output=cta.patchCtaParticles(output);
    cta.publishCtaParticles(output);
  }
  // Verify the emitted code before it reaches the preview.
  acorn.parse(output,{ecmaVersion:'latest',sourceType:'module'});
  fs.writeFileSync(filename+'.zh',output);files++;replacements+=edits.length;
  if(serviceModule){
    const hash=require('crypto').createHash('sha256').update('hero=workflow-minimal-4').digest('hex').slice(0,16);
    const variant=path.join(path.dirname(filename),hash);
    fs.copyFileSync(filename,variant);
    fs.copyFileSync(filename+'.json',variant+'.json');
    fs.writeFileSync(variant+'.zh',output);
  }
  changes.push({file:path.relative(root,filename),count:edits.length,changes:edits.map(({before,after})=>({before,after}))});
}
for(const site of fs.readdirSync(base,{withFileTypes:true}))if(site.isDirectory()){
  const dir=path.join(base,site.name);
  for(const file of fs.readdirSync(dir,{withFileTypes:true}))if(file.isDirectory()&&file.name.endsWith('.mjs')&&!/^(framer\.|react\.|motion\.|rolldown-)/.test(file.name)){
    const p=path.join(dir,file.name,'plain');if(fs.existsSync(p))transform(p);
  }
}
fs.writeFileSync(path.join(root,'RECON/translation-module-changes.json'),JSON.stringify(changes,null,2));
console.log(JSON.stringify({files,replacements,syntax:'parsed before and after'}));
