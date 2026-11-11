// Embedded modules are visual surfaces; their wheel/touch input scrolls the page.
(()=>{
 const wired=new WeakSet();
 function wire(){document.querySelectorAll('#aiora-features iframe').forEach(frame=>{
  if(wired.has(frame))return;wired.add(frame);
  function connect(){let doc;try{doc=frame.contentDocument}catch{return}if(!doc||doc.documentElement.dataset.workScrollBridge)return;doc.documentElement.dataset.workScrollBridge='true';
   const scroll=delta=>window.scrollBy({top:delta,behavior:'instant'});
   doc.addEventListener('wheel',event=>{if(event.ctrlKey||event.defaultPrevented)return;event.preventDefault();const factor=event.deltaMode===1?16:event.deltaMode===2?innerHeight:1;scroll(event.deltaY*factor);},{passive:false,capture:true});
   let previousY=null;doc.addEventListener('touchstart',event=>{previousY=event.touches.length===1?event.touches[0].clientY:null},{passive:true});
   doc.addEventListener('touchmove',event=>{if(previousY===null||event.touches.length!==1)return;const y=event.touches[0].clientY;event.preventDefault();scroll(previousY-y);previousY=y},{passive:false});
   doc.addEventListener('touchend',()=>{previousY=null},{passive:true});
  }
  frame.addEventListener('load',connect);connect();
 });}
 wire();new MutationObserver(wire).observe(document.getElementById('main'),{childList:true,subtree:true});
})();
