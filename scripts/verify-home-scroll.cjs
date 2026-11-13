const assert = require('node:assert/strict');
const path = require('node:path');
const os = require('node:os');
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }

const origin = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4175';
const mode = process.argv[2] || 'all';
const errors = [];
const near = (actual, expected, label) => assert.ok(Math.abs(actual-expected)<=5, `${label}: ${actual} instead of ${expected}`);
const position = page => page.evaluate(() => Math.round(scrollY));
const top = (page, selector) => page.locator(selector).evaluate(el => Math.round(el.getBoundingClientRect().top+scrollY));
const settle = page => page.waitForTimeout(1300);

async function jump(page, selector, offset=0) {
  await page.evaluate(({selector,offset}) => {
    const el=document.querySelector(selector),target=el.getBoundingClientRect().top+scrollY+offset;
    if(window.__fcLenis)window.__fcLenis.scrollTo(target,{immediate:true,force:true});
    else scrollTo({top:target,behavior:'instant'});
  }, {selector,offset});
  await page.waitForTimeout(250);
}

async function wheel(page, delta) {
  const size=page.viewportSize();
  await page.mouse.move(size.width-20,Math.round(size.height/2));
  await page.mouse.wheel(0,delta);
  await settle(page);
}

async function swipe(page, direction, delay=25) {
  const cdp=await page.context().newCDPSession(page),{width,height}=page.viewportSize();
  const x=width-35,start=direction>0?height*.78:height*.3,end=direction>0?height*.3:height*.78;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y:start}]});
  for(let i=1;i<=5;i++) {
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:start+(end-start)*i/5}]});
    await page.waitForTimeout(delay);
  }
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await settle(page);
  await cdp.detach();
}

(async()=>{
  const browser=await playwright.chromium.launch({headless:true,channel:'chrome'}),passed=[];
  try {
    const sizes=mode==='desktop'?[{width:1470,height:1243}]:mode==='mobile'?[{width:390,height:844}]:[{width:1470,height:1243},{width:390,height:844}];
    for(const viewport of sizes) {
      const phone=viewport.width<600;
      const page=await browser.newPage({viewport,isMobile:phone,hasTouch:phone});
      page.on('pageerror',error=>errors.push(error.message));
      await page.goto(origin+'/',{waitUntil:'load'});
      await page.waitForFunction(()=>!document.getElementById('fc-opening-loader')&&document.querySelectorAll('.fcs').length===1&&document.getElementById('coze-team-workroom'));
      await page.waitForTimeout(350);
      assert.deepEqual(await page.locator('[data-home-screen]').evaluateAll(nodes=>nodes.map(el=>el.dataset.homeScreen)),['applications'],'Only business cards retain paging');
      assert.deepEqual(await page.locator('#digital-employee-platform').evaluate(el=>[...el.children].map(node=>node.id)),['digital-employee-conversation','digital-employee-intro','coze-team-workroom','coze-team-workroom-reversed'],'The employee module stays in its original continuous flow');
      await wheel(page,120);
      assert.ok(await position(page)>30&&await position(page)<300,'Hero uses ordinary scrolling');
      await jump(page,'#digital-employee-intro',-120);
      let before=await position(page);
      await wheel(page,120);
      let distance=await position(page)-before;
      assert.ok(distance>30&&distance<300,'The intro and following content use ordinary scrolling');
      await jump(page,'#coze-team-workroom');
      before=await position(page);
      await wheel(page,120);
      distance=await position(page)-before;
      assert.ok(distance>30&&distance<300,'The selected business-operations module does not page');
      passed.push(`${viewport.width}px continuous hero, intro and employee content`);

      await jump(page,'.fc.fcs',-60);
      await wheel(page,120);
      near(await position(page),await top(page,'.fc.fcs'),'Entering the independent card showcase still aligns it');
      let steps=0;
      while(await position(page)<await top(page,'.fc.fcw')-5&&steps<6) { await wheel(page,120);steps++; }
      near(await position(page),await top(page,'.fc.fcw'),'Paging exits at service delivery');
      before=await position(page);
      await wheel(page,120);
      distance=await position(page)-before;
      assert.ok(distance>30&&distance<300,'Later content keeps ordinary scrolling');
      await wheel(page,-120);
      await wheel(page,-120);
      assert.ok(await position(page)>=await top(page,'.fc.fcs')-5&&await position(page)<await top(page,'.fc.fcw')-5,'Reverse scrolling reenters the card showcase');
      passed.push(`${viewport.width}px card paging entry, exit and reverse handoff`);

      if(mode!=='layout') {
        await jump(page,'.fc.fcs');
        const size=page.viewportSize();
        await page.mouse.move(size.width-20,size.height/2);
        for(let i=0;i<28;i++) { await page.mouse.wheel(0,24);await page.waitForTimeout(50); }
        await settle(page);
        const expected=await page.locator('.fc.fcs').evaluate(el=>{const r=el.getBoundingClientRect(),start=r.top+scrollY;return Math.round(r.height>innerHeight+3?start+r.height-innerHeight:document.querySelector('.fc.fcw').getBoundingClientRect().top+scrollY)});
        near(await position(page),expected,'One long inertia gesture produces one page transition');
        passed.push(`${viewport.width}px inertia remains bounded at the paged area`);
      }
      if(phone&&mode!=='layout') {
        await jump(page,'.fc.fcs',-30);
        await swipe(page,1);
        near(await position(page),await top(page,'.fc.fcs'),'Touch enters only the configured card region');
        await jump(page,'.fc.fcpr');
        before=await position(page);
        await swipe(page,1,100);
        assert.ok(await position(page)>before+100,'Long pricing content remains natively scrollable');
        passed.push('mobile touch entry and native long-content scrolling');
      }
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'No horizontal overflow');
      await page.close();
    }
    assert.deepEqual(errors,[],'No browser runtime errors');
    console.log(JSON.stringify({passed},null,2));
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
