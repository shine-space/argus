/* Visual-only reproduction of the user-side /office/conversations workspace.
 * Content is fictional and local. No user-side application APIs are called.
 */
(()=>{
 if(document.documentElement.classList.contains('particle-core-embed'))return;
 class DigitalEmployeeConversation extends HTMLElement{
  constructor(){super();this.attachShadow({mode:'open'});}
  async connectedCallback(){
   if(this.loaded)return;this.loaded=true;
   const response=await fetch('/office-conversation/content.html?v=5');
   if(!response.ok)return;
   const html=await response.text();if(!this.isConnected)return;
   this.shadowRoot.innerHTML='<link rel="stylesheet" href="/office-conversation/style.css?v=23">'+html;
   this.flow=this.shadowRoot.querySelector('.thread-content');
   this.viewport=this.shadowRoot.querySelector('.thread-viewport');
   if(this.hasAttribute('message-flow')){
    const header=document.createElement('div');
    header.className='message-project-header';
    header.innerHTML='<span>订单交付保障</span><span class="message-project-divider" aria-hidden="true"></span><span class="message-project-count" aria-label="5 位成员"><img src="/coze-team/assets/users.svg" alt="" width="14" height="14">5</span><span class="message-project-count" aria-label="4 位数字员工"><img src="/coze-team/assets/bot.svg" alt="" width="14" height="14">4</span>';
    this.viewport.before(header);
   }
   this.messages=[...this.flow.children];
   this.reducedMotion=matchMedia('(prefers-reduced-motion:reduce)').matches;
   this.revealContainer=this.closest('#digital-employee-platform');
   if(this.revealContainer){
    this.revealContainer.style.backgroundImage='linear-gradient(to bottom,#07100c 0,#07100c var(--conversation-background-cut,356px),#f2f0eb var(--conversation-background-cut,356px),#f2f0eb 100%)';
    const heroBackground=document.querySelector('.fch .fch-bg');
    if(heroBackground){
     const blend='linear-gradient(to bottom,#000 0%,#000 calc(100% - 160px),transparent 100%)';
     heroBackground.style.maskImage=blend;heroBackground.style.webkitMaskImage=blend;
    }
   }
   this.handleRevealScroll=()=>this.requestReveal();
   window.addEventListener('scroll',this.handleRevealScroll,{passive:true});
   window.addEventListener('resize',this.handleRevealScroll,{passive:true});
   this.requestReveal();
   this.setStep(this.reducedMotion?this.messages.length-1:1);
   this.resizeObserver=new ResizeObserver(()=>{this.scrollToLatest();this.requestReveal();});
   this.resizeObserver.observe(this);this.resizeObserver.observe(this.viewport);this.resizeObserver.observe(this.flow);
   this.visibilityObserver=new IntersectionObserver(entries=>{
    const visible=entries.some(entry=>entry.isIntersecting);
    clearTimeout(this.timer);
    if(visible&&!this.reducedMotion)this.schedule();
   },{threshold:.2});
   this.visibilityObserver.observe(this);
   this.shadowRoot.querySelector('link').addEventListener('load',()=>{this.scrollToLatest();this.requestReveal();},{once:true});
  }
  requestReveal(){
   if(this.revealFrame)return;
   this.revealFrame=requestAnimationFrame(()=>{this.revealFrame=0;this.updateReveal();});
  }
  updateReveal(){
   if(!this.isConnected)return;
   const frame=this.getBoundingClientRect();
   const viewportHeight=window.innerHeight;
   const progress=Math.min(1,Math.max(0,(viewportHeight*.6-frame.top)/(viewportHeight*.48)));
   const eased=progress*progress*(3-2*progress);
   const maxTilt=window.innerWidth<=800?16:30;
   const tilt=this.reducedMotion?0:maxTilt*(1-eased);
   this.style.setProperty('--conversation-tilt',`${tilt.toFixed(3)}deg`);
   this.dataset.revealProgress=progress.toFixed(3);
   if(this.revealContainer){
    const section=this.revealContainer.getBoundingClientRect();
    const seam=Math.round(frame.top-section.top+this.offsetHeight*.29);
    this.revealContainer.style.setProperty('--conversation-background-cut',`${seam}px`);
   }
  }
  setStep(step){
   this.step=step;
   this.messages.forEach((message,index)=>{message.hidden=index>step});
   this.dataset.step=String(step);
   this.shadowRoot.querySelector('.task-island-positioner').title=this.messages[step].dataset.stage;
   requestAnimationFrame(()=>this.scrollToLatest());
  }
  scrollToLatest(){
   if(!this.flow||!this.viewport)return;
   const distance=Math.max(0,this.flow.scrollHeight-this.viewport.clientHeight);
   this.flow.style.transform=`translateY(-${distance}px)`;
  }
  schedule(){
   this.timer=setTimeout(()=>{
    this.setStep(this.step===this.messages.length-1?1:this.step+1);
    this.schedule();
   },this.step===this.messages.length-1?6500:4300);
  }
  disconnectedCallback(){
   queueMicrotask(()=>{
    if(this.isConnected)return;
    clearTimeout(this.timer);cancelAnimationFrame(this.revealFrame);
    this.resizeObserver?.disconnect();this.visibilityObserver?.disconnect();
    window.removeEventListener('scroll',this.handleRevealScroll);
    window.removeEventListener('resize',this.handleRevealScroll);
   });
  }
 }
 customElements.define('digital-employee-conversation',DigitalEmployeeConversation);
})();
