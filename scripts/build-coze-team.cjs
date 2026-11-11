const fs=require('fs');
const path=require('path');
const {chromium}=require('C:/Users/ishin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'site/coze-team');
const recon=path.join(root,'RECON/coze-team');
(async()=>{
 const b=await chromium.launch({headless:true,channel:'chrome'});
 const p=await b.newPage({viewport:{width:1517,height:1220},reducedMotion:'reduce'});
 await p.goto('https://www.coze.cn/overview/team',{waitUntil:'domcontentloaded',timeout:45000});
 const section=p.locator('#team-workroom');
 await p.waitForFunction(()=>document.querySelector('#team-workroom')?.textContent.includes('等待验收'));
 await p.evaluate(()=>document.fonts.ready);
 await p.waitForTimeout(900);
 let html=await section.evaluate(e=>e.outerHTML);
 const map=JSON.parse(fs.readFileSync(path.join(recon,'asset-map.json'),'utf8'));
 for(const [url,local] of Object.entries(map)){html=html.replaceAll(url,local).replaceAll(new URL(url).pathname,local)}
 fs.writeFileSync(path.join(out,'content.html'),'<div class="sem-marketing-page">'+html+'</div>');
 const data=JSON.parse(fs.readFileSync(path.join(recon,'recon.json'),'utf8'));
 let css=[0,1,2].map(i=>fs.readFileSync(path.join(recon,'source-'+i+'.css'),'utf8')).join('\n');
 // Shadow roots do not register Tailwind's document-level @property defaults.
 // Reproduce those initial values in the original lowest-priority layer.
 const defaults=[...css.matchAll(/@property\s+(--[\w-]+)\{([^}]+)\}/g)].flatMap(m=>{const initial=m[2].match(/initial-value:([^;}]+)/);return initial?[m[1]+':'+initial[1]+';']:[]}).join('');
 css+='\n@layer properties{:host,*,::before,::after{'+defaults+'}}';
 const fontFaces=css.match(/@font-face\s*\{[^}]+\}/g)||[];
 for(const face of fontFaces)css=css.replace(face,'');
 css=css.replace(/font-family:[^;}]+/g,'font-family:var(--ty-font-text)');
 css=css.replaceAll(':root',':host');
 css+='\n'+data.inlineStyles.join('\n')+'\n:host{display:block;width:100%;min-width:0;color:rgb(9,9,11);--sidebar-background:oklch(0.985 0.001 106.424)}.sem-marketing-page{font-family:inherit;font-size:16px;line-height:1.5}\n';
 fs.writeFileSync(path.join(out,'source.css'),css);
 fs.writeFileSync(path.join(recon,'source-final.html'),await section.evaluate(e=>e.outerHTML));
 const metrics=[];
 for(const width of [1517,768,390]){
  await p.setViewportSize({width,height:1220});
  await section.screenshot({path:path.join(recon,'original-final-'+width+'.png')});
  metrics.push(await section.evaluate(e=>({width:innerWidth,rect:e.getBoundingClientRect().toJSON(),heading:getComputedStyle(e.querySelector('h2')).cssText,children:[...e.firstElementChild.children].map(x=>x.getBoundingClientRect().toJSON())})));
 }
 fs.writeFileSync(path.join(recon,'baseline-metrics.json'),JSON.stringify(metrics,null,2));
 console.log('Saved original DOM, CSS, assets and three responsive baselines.');
 await b.close();
})().catch(e=>{console.error(e);process.exitCode=1});
