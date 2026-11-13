/* SOURCE: coze.cn/overview/team, module 39678, #team-workroom.
 * Conversation content/styles: local manufacturing-collaboration demo.
 * Messages enter every 3000ms with a 700ms upward scroll transition.
 * No original analytics or application runtime is loaded.
 */
(()=>{
 if(document.documentElement.classList.contains('particle-core-embed'))return;
 const mountSharedEyebrow=host=>{
  const mount=()=>{
   if(host.querySelector('[slot="eyebrow"]'))return true;
   const reference=document.querySelector('.fci-stage .fc-eb');
   if(!reference)return false;
   const wrapper=document.createElement('div');wrapper.slot='eyebrow';wrapper.className='fc';
   const colors=getComputedStyle(reference);
   ['--fc-cloud','--fc-ink','--fc-fog','--fc-brass'].forEach(token=>wrapper.style.setProperty(token,colors.getPropertyValue(token)));
   wrapper.innerHTML='<p class="fc-eb is-on"><i aria-hidden="true"></i>数字员工</p>';
   host.append(wrapper);return true;
  };
  if(mount())return;
  const observer=new MutationObserver(()=>{if(mount())observer.disconnect();});
  observer.observe(document.body,{childList:true,subtree:true});return observer;
 };
 class DigitalEmployeeIntro extends HTMLElement{
  constructor(){super();this.attachShadow({mode:'open'});}
  async connectedCallback(){
   if(this.loaded)return;this.loaded=true;
   const html=await fetch('/ondrel/content.html?v=5').then(r=>r.text());
   const template=document.createElement('template');template.innerHTML=html;
   const intro=template.content.querySelector('[data-framer-name="Features Intro"]');
   const heading=intro.querySelector('h2'),title=heading.querySelector('span');
   title.textContent='与数字员工协作，省力出成果';
   heading.replaceChildren(title,document.createTextNode('不是对话框，它更能接手工作，把需求做成可用的成果'));
   intro.querySelector('[data-framer-name="Features Eyebrow"]').innerHTML='<slot name="eyebrow"></slot>';
   const shell=template.content.firstElementChild.cloneNode(false);
   const context=template.content.querySelector('.framer-ivkTB').cloneNode(false);
   context.append(intro);shell.append(context);
   this.shadowRoot.innerHTML='<link rel="stylesheet" href="/ondrel/source.css?v=1"><link rel="stylesheet" href="/ondrel/theme.css?v=27"><link rel="stylesheet" href="/typography.css?v=3"><style>:host{display:block;width:100%;background:#f2f0eb}.framer-kZk8h.framer-hwg9m,.framer-ivkTB.framer-72rtr7{width:100%;background:#f2f0eb}[data-framer-name="Features Intro"]{align-items:center!important;width:100%;max-width:1280px;margin-inline:auto;margin-bottom:0!important;padding-top:var(--coze-content-gap,100px)!important;padding-bottom:0!important}slot[name="eyebrow"]{display:flex;justify-content:center}</style>';
   this.shadowRoot.append(shell);
   this.eyebrowObserver=mountSharedEyebrow(this);
  }
 }
 customElements.define('digital-employee-intro',DigitalEmployeeIntro);
 class CozeTeamWorkroom extends HTMLElement{
  constructor(){super();this.attachShadow({mode:'open'});}
  async connectedCallback(){
   if(this.loaded)return;this.loaded=true;
   const [html,conversation,files]=await Promise.all([
    fetch('/coze-team/content.html?v=1').then(r=>r.text()),
    fetch('/coze-team/manufacturing-stream.html?v=3').then(r=>r.text()),
    fetch('/coze-team/manufacturing-files.json?v=1').then(r=>r.json())
   ]);
   if(!this.isConnected)return;
   this.shadowRoot.innerHTML='<link rel="stylesheet" href="/coze-team/source.css?v=2"><link rel="stylesheet" href="/coze-team/theme.css?v=12"><link rel="stylesheet" href="/coze-team/manufacturing-stream.css?v=3"><link rel="stylesheet" href="/coze-team/workbench-design.css?v=6">'+html;
   const header=this.shadowRoot.querySelector('#team-workroom > div > .order-2 > .relative > .absolute > .h-12');
   header.classList.add('coze-project-header');
   header.innerHTML='<span class="coze-project-name">订单交付保障</span><span class="coze-project-divider" aria-hidden="true"></span><span class="coze-project-count" aria-label="5 位成员"><img src="/coze-team/assets/users.svg" alt="" width="16" height="16"><span>5</span></span><span class="coze-project-count" aria-label="4 位数字员工"><img src="/coze-team/assets/bot.svg" alt="" width="16" height="16"><span>4</span></span>';
   this.shadowRoot.querySelector('#team-workroom .absolute.inset-x-4')?.remove();
   const windowFrame=header.parentElement;
   windowFrame.querySelector(':scope > .h-8')?.remove();
   windowFrame.querySelector(':scope > .relative.overflow-hidden').style.height='calc(100% - 48px)';
   const avatars={
    '691bd28641957bd4.jpg':'project-lead.png',
    '9f78e2efb8de9457.jpg':'marketing.png',
    '2a5358340d346592.webp':'planner.png',
    'fb78f567eefe703a.webp':'data.png',
    'd7e0b0bed1ceaf08.webp':'review.png'
   };
   this.shadowRoot.querySelectorAll('img').forEach(img=>{
    const avatar=avatars[img.getAttribute('src').split('/').pop()];
    if(avatar)img.src='/coze-team/assets/'+avatar;
   });
   const copy=this.shadowRoot.querySelector('#team-workroom > div > .order-1');
   const reversed=this.hasAttribute('reversed');
   copy.querySelector('h2').textContent=reversed?'处理具体业务的数字员工':'对话和业务操作，在一起完成';
   copy.querySelector(':scope > p').textContent=reversed?'核对票据和账务、汇总经营数据、筛选供应商。每项结果都附有依据，方便业务人员复核':'把任务交给数字员工，在工作台查看进度、核对结果。需要判断或确认的地方，由业务人员把关';
   const points=reversed?[
    ['财务专员，核对票据和账务','读取票据、核对记录，整理待审申请和凭证草稿；原件随时可查，提交前由人复核'],
    ['商务报表，汇总经营数据','按统一口径生成报表，汇总数字可以查到对应明细'],
    ['采购寻源，筛选合格供应商','按采购规则比较供应商，说明推荐理由，最终名单由采购确认']
   ]:[
    ['多智能体协作，分工配合','任务交给谁、做到哪一步、交回了什么，都能查看；关键操作由人确认'],
    ['企业知识库','统一查找企业资料，回答附上原文和原图，方便核对来源'],
    ['飞书里沟通，平台上处理','用飞书沟通、接收通知，在平台操作和确认，随时查看业务进度']
   ];
   copy.querySelectorAll('h3').forEach((title,i)=>{
    title.textContent=points[i][0];
    title.nextElementSibling.textContent=points[i][1];
   });
   // Only the first homepage example uses the Figma workbench composition.
   // The reversed collaboration example retains its animated conversation.
   if(!reversed&&this.id==='coze-team-workroom'){
    const preview=windowFrame.parentElement;
    preview.classList.add('coze-workbench-preview');
    const design=await fetch('/coze-team/workbench-design.html?v=4').then(r=>r.text());
    if(!this.isConnected)return;
    preview.innerHTML=design;
    const fitContent=()=>preview.style.setProperty('--workbench-design-scale',preview.clientWidth/698);
    this.resizeObserver=new ResizeObserver(fitContent);
    this.resizeObserver.observe(preview);
    fitContent();
    return;
   }
   this.viewport=windowFrame.querySelector(':scope > .relative.overflow-hidden');
   this.viewport.style.visibility='hidden';
   this.viewport.innerHTML=conversation;
   this.flow=this.viewport.querySelector('#messages');
   this.messages=[...this.flow.children];
   this.offsets=[];
   const dialog=this.viewport.querySelector('#preview');
   this.handlePreviewClick=event=>{
    const target=event.composedPath().find(node=>node instanceof Element&&node.matches('[data-preview],#close,#download'));
    if(!target||!this.viewport.contains(target))return;
    // The embedded Framer runtime stops clicks at body capture. Handle only
    // this stream's file controls before that listener receives the event.
    event.preventDefault();event.stopPropagation();
    const preview=target.matches('[data-preview]')?target:null;
    if(preview){
     this.currentFile=files[preview.dataset.preview];
     dialog.querySelector('#preview-title').textContent=this.currentFile.name;
     dialog.querySelector('#preview-content').textContent=this.currentFile.text;
     dialog.showModal();
    }
    if(target.id==='close')dialog.close();
    if(target.id==='download'&&this.currentFile){
     const url=URL.createObjectURL(new Blob(['\ufeff'+this.currentFile.text],{type:'text/plain;charset=utf-8'}));
     const a=document.createElement('a');a.href=url;a.download=this.currentFile.name;a.click();
     setTimeout(()=>URL.revokeObjectURL(url),1000);
    }
   };
   window.addEventListener('click',this.handlePreviewClick,true);
   await Promise.all([...this.shadowRoot.querySelectorAll('link')].map(link=>link.sheet?Promise.resolve():new Promise(resolve=>{link.onload=resolve;link.onerror=resolve;})));
   if(!this.isConnected)return;
   this.step=matchMedia('(prefers-reduced-motion: reduce)').matches?this.messages.length-1:0;
   this.setStep(this.step);
   this.viewport.style.visibility='';
   this.resizeObserver=new ResizeObserver(()=>this.scrollToLatest());
   this.resizeObserver.observe(this.viewport);
   this.syncPlayback=()=>{
    clearInterval(this.timer);
    if(this.visible&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches)
     this.timer=setInterval(()=>this.setStep((this.step+1)%this.messages.length),3000);
   };
   this.visibilityObserver=new IntersectionObserver(([entry])=>{
    this.visible=entry.isIntersecting;
    if(this.visible)this.scrollToLatest();
    this.syncPlayback();
   });
   this.visibilityObserver.observe(this);
   document.addEventListener('visibilitychange',this.syncPlayback);
  }
  setStep(step){
   this.step=step;
   this.messages.forEach((node,i)=>{if(i<=step){if(node.parentNode!==this.flow)this.flow.append(node)}else node.remove()});
   this.scrollToLatest();
   this.dataset.step=step;
  }
  scrollToLatest(){
   if(!this.flow||!this.viewport)return;
   const padding=getComputedStyle(this.flow.parentElement);
   const available=this.viewport.clientHeight-parseFloat(padding.paddingTop)-parseFloat(padding.paddingBottom);
   const offset=Math.max(0,this.flow.scrollHeight-available);
   this.offsets[this.step]=offset;
   this.flow.style.transform=`translateY(-${offset}px)`;
  }
  disconnectedCallback(){
   // Section ordering can move this element without ending its lifetime.
   queueMicrotask(()=>{
    if(this.isConnected)return;
    clearInterval(this.timer);this.resizeObserver?.disconnect();this.eyebrowObserver?.disconnect();this.visibilityObserver?.disconnect();
    document.removeEventListener('visibilitychange',this.syncPlayback);
    window.removeEventListener('click',this.handlePreviewClick,true);
   });
  }
 }
 customElements.define('coze-team-workroom',CozeTeamWorkroom);
 if(location.pathname!=='/')return;
 const mount=()=>{
  if(document.getElementById('coze-team-workroom'))return;
  const target=document.querySelector('#business-applications')?.closest('.framer-1udua1m');
  if(!target)return;
  const host=document.createElement('coze-team-workroom');host.id='coze-team-workroom';host.lang='zh-CN';
  const reversed=document.createElement('coze-team-workroom');reversed.id='coze-team-workroom-reversed';reversed.lang='zh-CN';reversed.setAttribute('reversed','');
  const intro=document.createElement('digital-employee-intro');intro.id='digital-employee-intro';intro.lang='zh-CN';
  const module=document.createElement('section');module.id='digital-employee-platform';
  module.setAttribute('aria-label','数字员工与业务操作');
  module.style.cssText='display:block;width:100%;background-color:#f2f0eb;background-image:linear-gradient(to bottom,#07100c 0,#07100c var(--conversation-background-cut,356px),#f2f0eb var(--conversation-background-cut,356px),#f2f0eb 100%);border-top-left-radius:0;border-top-right-radius:0;clip-path:none;--coze-content-gap:100px';
  const conversation=document.createElement('digital-employee-conversation');conversation.id='digital-employee-conversation';conversation.lang='zh-CN';
  module.append(conversation,intro,host,reversed);target.before(module);
 };
 new MutationObserver(mount).observe(document.body,{childList:true,subtree:true});mount();
})();
