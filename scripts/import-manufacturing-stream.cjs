const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const {chromium}=require('C:/Users/ishin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const out=path.join(root,'site/coze-team');
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1000,height:1000}});
 await page.goto('http://127.0.0.1:4186/manufacturing-collaboration.html',{waitUntil:'networkidle'});
 let html=await page.locator('.thread').evaluate(e=>e.outerHTML);
 html+=await page.locator('#preview').evaluate(e=>e.outerHTML);
 for(const src of await page.locator('.thread img').evaluateAll(es=>[...new Set(es.map(e=>e.src))])){
  const name='manufacturing-'+crypto.createHash('sha256').update(src).digest('hex').slice(0,10)+'.png';
  const response=await page.request.get(src);
  if(!response.ok())throw new Error('Avatar failed: '+src);
  fs.writeFileSync(path.join(out,'assets',name),await response.body());
  html=html.replaceAll(new URL(src).pathname.slice(1),'/coze-team/assets/'+name);
 }
 fs.writeFileSync(path.join(out,'manufacturing-stream.html'),'<div class="manufacturing-stream stream-only">'+html+'</div>');
 fs.writeFileSync(path.join(out,'manufacturing-files.json'),JSON.stringify(await page.evaluate(()=>files),null,2));
 let css=fs.readFileSync(path.join(root,'RECON/coze-team/manufacturing-collaboration.css'),'utf8');
 css=css.replace(/font-family:[^;}]+/g,'font-family:inherit').replace(/font:14px\/1\.65[^;}]+/g,'font:inherit');
 css='@scope (.manufacturing-stream) {\n'+css+'\n}\n.manufacturing-stream{color:#343434;font-size:13px;line-height:1.55;font-family:inherit}\n.manufacturing-stream #messages{transition:transform 700ms ease-out;will-change:transform}\n.manufacturing-stream .message{animation:team-message-appear 520ms cubic-bezier(.16,1,.3,1) both}\n@media(prefers-reduced-motion:reduce){.manufacturing-stream #messages{transition:none}.manufacturing-stream .message{animation:none}}';
 fs.writeFileSync(path.join(out,'manufacturing-stream.css'),css);
 await page.screenshot({path:path.join(root,'RECON/coze-team/manufacturing-source.png'),fullPage:true});
 console.log('Imported '+await page.locator('.message').count()+' source messages, styles, avatars and file previews.');
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
