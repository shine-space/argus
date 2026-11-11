const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const {chromium} = require('C:/Users/ishin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'RECON/coze-team');
const assets = path.join(root, 'site/coze-team/assets');
fs.mkdirSync(out, {recursive:true});
fs.mkdirSync(assets, {recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1517,height:1220}});
 const source=[];
 page.on('response',async response=>{
  if(/\.js(?:\?|$)/.test(response.url())&&response.url().includes('/_next/')){
   try{const body=await response.text();if(body.includes('就是团队的作战室')){source.push(response.url());fs.writeFileSync(path.join(out,'source-'+path.basename(new URL(response.url()).pathname)),body)}}catch{}
  }
 });
 await page.goto('https://www.coze.cn/overview/team',{waitUntil:'domcontentloaded',timeout:45000});
 const section=page.locator('#team-workroom');
 await section.waitFor();
 await section.evaluate(e=>e.scrollIntoView({block:'start'}));
 await page.waitForTimeout(700);
 fs.writeFileSync(path.join(out,'page.html'),await page.content());
 const data=await section.evaluate(e=>({html:e.outerHTML,images:[...e.querySelectorAll('img')].map(i=>({src:i.src,srcset:i.srcset})),inlineStyles:[...document.querySelectorAll('style')].map(s=>s.textContent),stylesheets:[...document.querySelectorAll('link[rel=stylesheet]')].map(s=>s.href),computed:{font:getComputedStyle(e).font,background:getComputedStyle(e).background,color:getComputedStyle(e).color}}));
 fs.writeFileSync(path.join(out,'source-section.html'),data.html);
 fs.writeFileSync(path.join(out,'recon.json'),JSON.stringify({...data,html:undefined},null,2));
 await Promise.all(data.stylesheets.map(async(url,i)=>{const r=await page.request.get(url);fs.writeFileSync(path.join(out,'source-'+i+'.css'),await r.body())}));
 const mapping={};
 await Promise.all([...new Set(data.images.map(i=>i.src))].map(async url=>{const r=await page.request.get(url);const ext=path.extname(new URL(url).pathname)||'.png';const name=crypto.createHash('sha256').update(url).digest('hex').slice(0,16)+ext;fs.writeFileSync(path.join(assets,name),await r.body());mapping[url]='/coze-team/assets/'+name}));
 fs.writeFileSync(path.join(out,'asset-map.json'),JSON.stringify(mapping,null,2));
 const frames=[];
 for(let i=0;i<13;i++){
  frames.push({second:i*1.2,html:await section.innerHTML(),text:await section.innerText()});
  if([0,4,8,12].includes(i))await section.screenshot({path:path.join(out,'source-state-'+i+'.png')});
  await page.waitForTimeout(1200);
 }
 fs.writeFileSync(path.join(out,'frames.json'),JSON.stringify(frames,null,2));
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:1000});await section.screenshot({path:path.join(out,'source-'+width+'.png')});}
 console.log(JSON.stringify({source,computed:data.computed,images:data.images,frameTexts:frames.map(f=>({second:f.second,text:f.text.slice(0,f.text.indexOf('一个项目，'))}))},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
