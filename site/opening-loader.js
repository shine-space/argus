
/* Opening paints on an independent thread while Framer hydrates the page. */
(()=>{
  'use strict';
  const root=document.documentElement,motion=matchMedia('(prefers-reduced-motion: reduce)');
  const prepareContent=()=>{
    if(root.classList.contains('fc-hero-ready'))return;
    root.classList.add('fc-hero-ready');
    document.dispatchEvent(new Event('fc:hero-ready'));
  };
  if(motion.matches||!window.__fcLoaderMark)return;
  try{if(sessionStorage.getItem('fc-loaded'))return;}catch(_){}
  window.__fcEarlyLoaderActive=true;root.classList.add('fc-hold-early');
  let overlay,observer,safety,worker,renderer,finished=false,fallingBack=false,started=false,startFrame=0;
  const viewport=()=>({width:innerWidth,height:innerHeight,ratio:devicePixelRatio||1});
  const resize=()=>{const size=viewport();worker?.postMessage({type:'resize',viewport:size});renderer?.resize(size);};
  const visibility=()=>{if(!started)return;worker?.postMessage({type:'pause',paused:document.hidden});renderer?.pause(document.hidden);};
  const finish=()=>{
    if(finished)return;finished=true;clearTimeout(safety);cancelAnimationFrame(startFrame);observer?.disconnect();worker?.terminate();renderer?.dispose();overlay?.remove();
    prepareContent();root.classList.remove('fc-hold-early');window.__fcEarlyLoaderActive=false;
    motion.removeEventListener('change',finish);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);
  };
  const receive=message=>{
    if(finished)return;
    if(message.type==='ready'){
      startFrame=requestAnimationFrame(()=>{startFrame=requestAnimationFrame(()=>{
        if(finished)return;started=true;overlay.style.background='transparent';visibility();
      });});
      return;
    }
    if(message.type==='done'){finish();return;}
    if(message.type==='phase'){
      overlay.dataset.phase=message.phase;
      // Complete the content entrance beneath the opening before its circular reveal.
      if(message.phase==='word'||message.phase==='core'||message.phase==='reveal')prepareContent();
      if(message.phase==='reveal'){root.classList.remove('fc-hold-early');overlay.style.pointerEvents='none';}
    }
  };
  const mount=()=>{
    if(!document.body||finished||overlay)return;observer?.disconnect();
    overlay=document.createElement('div');overlay.id='fc-opening-loader';overlay.setAttribute('aria-hidden','true');
    overlay.style.cssText='position:fixed;inset:0;z-index:2147483000;overflow:hidden;touch-action:none;pointer-events:auto;background:radial-gradient(ellipse at center,#101b14 0%,#07100c 70%);';
    const canvas=document.createElement('canvas');canvas.style.cssText='display:block;width:100%;height:100%;';
    overlay.append(canvas);document.body.append(overlay);
    try{sessionStorage.setItem('fc-loaded','1');}catch(_){}
    const fallback=async()=>{
      if(fallingBack||finished)return;fallingBack=true;worker?.terminate();worker=undefined;
      const replacement=canvas.cloneNode(false);canvas.replaceWith(replacement);overlay.dataset.renderer='main';
      try{const {createOpeningRenderer}=await import('/particle-shapes/opening-renderer.mjs');
        if(!finished)renderer=createOpeningRenderer(replacement,window.__fcLoaderMark,viewport(),receive);
      }catch(_){finish();}
    };
    if(canvas.transferControlToOffscreen&&typeof Worker==='function'){
      try{
        worker=new Worker('/particle-shapes/opening-worker.mjs',{type:'module'});
        worker.onmessage=({data})=>data.type==='error'?fallback():receive(data);
        worker.onerror=event=>{event.preventDefault();fallback();};
        const surface=canvas.transferControlToOffscreen();
        worker.postMessage({type:'start',canvas:surface,geometry:window.__fcLoaderMark,viewport:viewport()},[surface]);
        overlay.dataset.renderer='worker';
      }catch(_){fallback();}
    }else fallback();
    window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',visibility);
  };
  motion.addEventListener('change',finish);
  // Failure escape only: normal completion follows rendered animation frames.
  safety=setTimeout(finish,8000);
  if(document.body)mount();else{observer=new MutationObserver(mount);observer.observe(root,{childList:true});}
})();
