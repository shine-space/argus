const fs = require('fs');
const path = require('path');
const {chromium} = require('C:/Users/ishin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = path.resolve(__dirname,'..');
const label = process.argv[2] || 'original';
const origin = label === 'original' ? 'https://tender-celery-477359.framer.app' : 'http://127.0.0.1:4175';
const routes = JSON.parse(fs.readFileSync(path.join(root,'RECON/routes.json'))).map(u=>new URL(u).pathname);
const special = ['/', '/services','/work','/journal','/contact','/services/voice-agents','/journal/agents-need-guardrails'];
const output = path.join(root,'RECON',label); fs.mkdirSync(output,{recursive:true});
(async()=>{
  const browser = await chromium.launch({headless:true,channel:'chrome'});
  const jobs = routes.map(route=>({route,width:1440,height:900}));
  for(const width of [768,390]) for(const route of special) jobs.push({route,width,height:900});
  const results=process.env.RETRY ? JSON.parse(fs.readFileSync(path.join(output,'results.json'))).filter(x=>!x.error) : [];
  if(process.env.RETRY){const wanted=JSON.parse(process.env.RETRY);for(let i=jobs.length-1;i>=0;i--)if(!wanted.includes(jobs[i].route+'@'+jobs[i].width))jobs.splice(i,1);}
  let cursor=0;
  async function worker(){
    while(cursor<jobs.length){
      const job=jobs[cursor++];
      const ctx=await browser.newContext({viewport:{width:job.width,height:job.height},deviceScaleFactor:1});
      const page=await ctx.newPage(); const errors=[],failed=[],external=[],consoleErrors=[];
      page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
      page.on('pageerror',e=>errors.push(e.message));
      page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
      page.on('request',r=>{if(!r.url().startsWith(origin)&&r.url().startsWith('http'))external.push(r.url());});
      try{
        const resp=await page.goto(origin+job.route,{waitUntil:'domcontentloaded',timeout:90000});
        await page.waitForLoadState('networkidle',{timeout:12000}).catch(()=>{});
        await page.waitForTimeout(job.route==='/'?6500:2500);
        const height=await page.evaluate(()=>document.documentElement.scrollHeight);
        // Traverse every section to trigger lazy media and scroll animations.
        for(let y=0;y<height;y+=750){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(90);}
        await page.waitForTimeout(700);
        await page.evaluate(()=>window.scrollTo(0,0)); await page.waitForTimeout(1500);
        const metrics=await page.evaluate(()=>({
          title:document.title,height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth,
          h1:[...document.querySelectorAll('h1')].filter(e=>e.getBoundingClientRect().width).map(e=>e.textContent),
          images:[...document.images].filter(i=>i.getBoundingClientRect().width>0).map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0})),
          links:[...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')))],
          canvases:document.querySelectorAll('canvas').length,forms:document.querySelectorAll('form').length
          ,english:[...new Set([...document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,button,label')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.textContent.trim().replace(/\s+/g,' ')).filter(t=>/[a-zA-Z]{2}/.test(t)&&!/[\u3400-\u9fff]/.test(t)))],lang:document.documentElement.lang
        }));
        const name=(job.route==='/'?'home':job.route.slice(1).replaceAll('/','--'))+'-'+job.width;
        await page.screenshot({path:path.join(output,name+'.png'),fullPage:true,timeout:60000});
        results.push({...job,status:resp.status(),...metrics,errors,consoleErrors,failed,external:[...new Set(external)],screenshot:name+'.png'});
        console.log(label,job.width,job.route,'status',resp.status(),'height',metrics.height,'errors',errors.length,flush=true);
      }catch(e){results.push({...job,error:e.message,errors,failed});console.log('ERROR',label,job.route,e.message);}
      finally{await ctx.close(); fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2));}
    }
  }
  await Promise.all([worker(),worker(),worker()]);
  await browser.close();
  console.log('COMPLETE',label,results.length);
})();
