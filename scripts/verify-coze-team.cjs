const fs=require('fs');
const path=require('path');
const {chromium}=require('C:/Users/ishin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'RECON/coze-team');
(async()=>{
 const b=await chromium.launch({headless:true,channel:'chrome'});
 const results=[];
 for(const width of [1517,768,390]){
  const p=await b.newPage({viewport:{width,height:1220},reducedMotion:'reduce'});
  await p.addInitScript(()=>sessionStorage.setItem('fc-loaded','1'));
  const errors=[],failed=[];
  p.on('pageerror',e=>errors.push(e.message));
  p.on('requestfailed',r=>failed.push(r.url()));
  await p.goto('http://127.0.0.1:4175/',{waitUntil:'domcontentloaded'});
  const host=p.locator('coze-team-workroom');
  await host.locator('#team-workroom').waitFor();
  await host.locator('text=订单交付保障方案.md').waitFor();
  await p.locator('coze-team-workroom[data-step]').waitFor();
  await p.waitForTimeout(900);
  await host.screenshot({path:path.join(out,'clone-final-'+width+'.png')});
  results.push({width,errors,failed,...await host.evaluate(e=>{
   const section=e.shadowRoot.querySelector('#team-workroom');
   return{rect:section.getBoundingClientRect().toJSON(),children:[...section.firstElementChild.children].map(x=>x.getBoundingClientRect().toJSON()),messages:e.messages.length,images:[...e.shadowRoot.querySelectorAll('img')].map(i=>({src:i.src,loaded:i.complete&&i.naturalWidth>0})),overflow:document.documentElement.scrollWidth>innerWidth,beforeBusiness:!!(e.compareDocumentPosition(document.querySelector('#business-applications'))&Node.DOCUMENT_POSITION_FOLLOWING),headingStyle:{font:getComputedStyle(section.querySelector('h2')).font,background:getComputedStyle(section).backgroundColor}};
  })});
  await p.close();
 }
 // Exercise every message and file preview, then verify the real cadence.
 const p=await b.newPage({viewport:{width:1517,height:1220}});
 await p.addInitScript(()=>sessionStorage.setItem('fc-loaded','1'));
 await p.goto('http://127.0.0.1:4175/');
 await p.locator('coze-team-workroom[data-step]').waitFor();
 const timeline=await p.locator('coze-team-workroom').evaluate(e=>{clearInterval(e.timer);return Array.from({length:e.messages.length},(_,step)=>{e.setStep(step);return{step,count:e.flow.children.length,transform:e.flow.style.transform,text:e.flow.lastElementChild.textContent}})});
 await p.locator('coze-team-workroom').evaluate(e=>e.shadowRoot.querySelector('[data-preview="report"]').click());
 const preview=await p.locator('coze-team-workroom').evaluate(e=>({open:e.shadowRoot.querySelector('#preview').open,title:e.shadowRoot.querySelector('#preview-title').textContent}));
 await p.locator('coze-team-workroom').evaluate(e=>e.shadowRoot.querySelector('#preview').close());
 await p.locator('coze-team-workroom').evaluate(e=>e.setStep(0));
 await p.locator('coze-team-workroom').evaluate(e=>{e.timer=setInterval(()=>e.setStep((e.step+1)%e.messages.length),3000)});
 await p.waitForTimeout(3300);
 const automatic=await p.locator('coze-team-workroom').getAttribute('data-step');
 results.push({timeline,automatic,preview});
 fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(results,null,2));
 console.log(JSON.stringify(results.map(r=>({...r,images:r.images?.map(i=>i.loaded),timeline:r.timeline?.map(x=>({step:x.step,count:x.count,transform:x.transform}))})),null,2));
 await b.close();
})().catch(e=>{console.error(e);process.exitCode=1});
