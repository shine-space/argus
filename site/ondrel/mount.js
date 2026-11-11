/* Source slice from Ondrel; styles and assets are scoped locally. */
(()=>{
 class OndrelPlan extends HTMLElement {
  constructor(){super();this.attachShadow({mode:'open'});}
  async connectedCallback(){
   if(this.loaded)return;this.loaded=true;
   const html=await fetch('/ondrel/content.html?v=5').then(r=>r.text());
   this.shadowRoot.innerHTML='<link rel="stylesheet" href="/ondrel/source.css?v=1"><link rel="stylesheet" href="/ondrel/theme.css?v=26"><link rel="stylesheet" href="/typography.css?v=3">'+html;
   const root=this.shadowRoot;
   const items=[1,2,3,4].map(i=>root.querySelector(`[data-framer-name="Index Item ${i}"]`));
   const panels=[1,2,3,4].map(i=>root.getElementById(`feature-${i}`));
   panels.forEach(panel=>{const heading=panel.querySelector(':scope > div:has(> h3)');if(heading)panel.append(heading);});
   const featureHeadings=[
    '结合岗位知识、业务规则与 Skill，配置适合具体任务的专业能力',
    '通过对话提出目标，按授权检索资料、调用工具和执行流程',
    '交回记录、草稿、报表与引用依据，关键操作由业务人员确认',
    '维护已确认的规则与任务记忆，让后续工作从已有成果继续'
   ];
   panels.forEach((panel,i)=>{const heading=panel.querySelector('h3');if(heading)heading.textContent=featureHeadings[i];});
   const descriptions=[
    '围绕知识查询、财务核对、报表整理与采购寻源，组合岗位所需的知识、工具和 Skill',
    '通过对话提出目标，按授权检索资料、调用工具和执行流程',
    '交回记录、草稿、报表与引用依据，关键操作由业务人员确认',
    '维护已确认的规则与任务记忆，让后续工作从已有成果继续'
   ];
   items.forEach((item,i)=>{
    item.setAttribute('aria-label',item.textContent.trim());
    if(!descriptions[i])return;
    item.classList.add('plan-index-item');
    const detail=document.createElement('div');detail.className='plan-index-detail';detail.id='plan-index-detail-'+i;
    const inner=document.createElement('div');const p=document.createElement('p');p.textContent=descriptions[i];
    inner.append(p);detail.append(inner);item.querySelector('[data-framer-name$="Text"]').append(detail);
    item.setAttribute('aria-controls',detail.id);
   });
   let selected=-1;
   const select=index=>{if(selected===index)return;selected=index;items.forEach((item,i)=>{
    item.setAttribute('aria-current',i===index?'step':'false');
    const detail=item.querySelector('.plan-index-detail');
    if(detail){item.setAttribute('aria-expanded',String(i===index));detail.setAttribute('aria-hidden',String(i!==index));}
    item.querySelector('[data-framer-name$="Text"]').style.opacity=i===index?'1':'.45';
    item.querySelector('[data-framer-name$="Marker"]').style.backgroundColor=i===index?'#f36a4b':'rgba(14,15,18,.12)';
   });};
   items.forEach((item,i)=>{item.setAttribute('role','button');item.tabIndex=0;const go=()=>panels[i].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});item.addEventListener('click',go);item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
   this.onScroll=()=>{if(this.frame)return;this.frame=requestAnimationFrame(()=>{this.frame=0;let index=0;panels.forEach((p,i)=>{if(p.getBoundingClientRect().top<innerHeight*.4)index=i;});select(index);});};
   addEventListener('scroll',this.onScroll,{passive:true});this.onScroll();
  }
  disconnectedCallback(){removeEventListener('scroll',this.onScroll);cancelAnimationFrame(this.frame);}
 }
 customElements.define('ondrel-plan',OndrelPlan);
 const mount=()=>{if(document.getElementById('ondrel-plan'))return;const isWorkflow=/^\/services\/workflow-automation\/?$/.test(location.pathname);const target=isWorkflow?document.querySelector('[data-framer-name="S1 FcCta"]'):document.querySelector('#business-applications')?.closest('.framer-1udua1m');if(!target)return;const host=document.createElement('ondrel-plan');host.id='ondrel-plan';host.lang='zh-CN';target.before(host);};
 new MutationObserver(mount).observe(document.body,{childList:true,subtree:true});mount();
})();
