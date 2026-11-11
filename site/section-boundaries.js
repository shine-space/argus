/* One scroll listener for all light/dark section entries. */
(() => {
 const selector='.fc.fcs,.fc.fci,.fc.fcr,.fc.fcpr,.fc.fcx';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0;
 const update=()=>{
  frame=0;
  const maxRadius=Math.min(120,Math.max(40,innerWidth*.08));
  document.querySelectorAll(selector).forEach(section=>{
   let edge=section.getBoundingClientRect().top;
   const progress=Math.max(0,Math.min(1,edge/(innerHeight*.7)));
   section.style.setProperty('--boundary-radius',`${reduced.matches?0:(maxRadius*progress).toFixed(2)}px`);
  });
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule);
 reduced.addEventListener('change',schedule);
 new MutationObserver(records=>{if(records.some(record=>record.addedNodes.length))schedule()}).observe(document.documentElement,{childList:true,subtree:true});
 schedule();
})();
