let illustrationModule;
const loadIllustrations=()=>illustrationModule??=import('./runtime/illustrations.js').then(library=>{library.initDOM();return library});
let lanyardModule;
const loadLanyard=()=>lanyardModule??=import('./lanyard/runtime.mjs');
const textResources=new Map();
function loadText(url){
  if(!textResources.has(url))textResources.set(url,fetch(url).then(response=>{if(!response.ok)throw Error(`Failed to load ${url}: ${response.status}`);return response.text()}));
  return textResources.get(url);
}
let sharedStyles;
const loadSharedStyles=()=>sharedStyles??=Promise.all([
  loadText('/styles/site-section-type.css?v=1'),
  loadText('/styles/site-section-heading.css?v=1'),
]).then(styles=>styles.join('\n'));

const illustrations=[
  {id:'process-02',slot:'.framer-1n57i0g',className:'framer-e17616-container',component:'VeyloOrganize',
    props:mobile=>({variant:mobile?'JD_TVXMYa':'VwgUULGdO',tqSm9VW1z:'工作流',zGqkTYBqh:'记忆',w4dSkuCpo:'工具',kfwRHcf6c:'数据库',g0bztQNkz:'Skill',uKClQyFZX:'知识库',VxpabYDoF:'数字员工',style:{width:'100%',height:'100%'}})},
];
const employeeMessages=[
  ['07-项目管理专家.png','项目管理专家','刚刚','已拆解项目任务，等待各岗位认领'],
  ['06-数据分析师.png','数据分析师','1 分钟前','经营数据已整理，关键趋势已标注'],
  ['09-人力资源经理.png','人力资源经理','2 分钟前','已筛选候选人，并同步面试安排'],
  ['10-市场策略专家.png','市场策略专家','3 分钟前','市场调研已完成，已交接品牌创意总监'],
  ['20-企业知识管理员.png','企业知识管理员','5 分钟前','项目资料已归档，团队知识库已更新'],
];

class VeyloProcess extends HTMLElement{
  constructor(){
    super();
    if(!this.shadowRoot)this.attachShadow({mode:'open'});
    this.roots=new Map();
    this.pending=new Set();
    this.cycle=0;
  }
  connectedCallback(){
    if(this.mounted)return;
    this.mounted=true;
    const cycle=++this.cycle;
    this.mount(cycle).catch(error=>console.error('Process demonstration failed to initialize',error));
  }
  connectedMoveCallback(){}
  async mount(cycle){
    const root=this.shadowRoot;
    const shared=loadSharedStyles();
    const cards=this.hasAttribute('data-process-copy')?loadText('/veylo-process/cards.css'):null;
    if(!this.hasAttribute('data-process-copy')){
      const css=await shared;
      if(!this.isConnected||cycle!==this.cycle)return;
      const style=document.createElement('style');
      style.textContent=css+`
        :host{display:block;width:100%;overflow-x:clip;background:transparent;color:var(--site-ink,#0e0f12);isolation:isolate;font-family:var(--site-font-text,inherit)}
        :host *{box-sizing:border-box;font-family:inherit!important;--framer-font-family:inherit;--framer-font-family-bold:inherit;--framer-font-family-medium:inherit}
        .process-demo-heading{text-align:center;padding:var(--process-heading-space-before,48px) 24px 0;background:#f2f1ec;color:#151515}
        
        .process-demo-heading p{color:#686965}
        .process-work-module{display:block;width:100%}
        .veylo-layer--upper{position:relative;z-index:2;isolation:isolate;width:100%}
      `;
      const heading=document.createElement('header');
      heading.className='process-demo-heading site-section-heading';
      heading.innerHTML='<span class="process-demo-label site-section-heading__label" data-site-section-part="label"><i aria-hidden="true"></i><span>工作协同</span></span><h2 class="site-type-section" data-site-section-part="title" data-site-section-title>数字员工如何参与日常工作</h2><p class="site-type-body" data-site-section-part="description" data-site-section-description>结合岗位知识、技能与工具处理任务，在项目中分工、交接并共同交付</p>';
      heading.querySelector('h2').id='process-work-title';
      const layer=document.createElement('div');
      layer.className='veylo-layer veylo-layer--upper';
      const copy=document.createElement('veylo-process');
      copy.setAttribute('data-process-copy','');
      layer.append(copy);
      const moduleContainer=document.createElement('section');
      moduleContainer.className='process-work-module';
      moduleContainer.setAttribute('aria-labelledby','process-work-title');
      moduleContainer.append(heading,layer);
      root.replaceChildren(style,moduleContainer);
      this.dataset.ready='true';
      return;
    }
    if(!root.querySelector('#process')){
      const [css,html]=await Promise.all([
        loadText('/veylo-process/process.css'),
        loadText('/veylo-process/process.html'),
      ]);
      if(!this.isConnected||cycle!==this.cycle)return;
      root.innerHTML='<style data-process-base>'+css+'</style>'+html;
    }
    if(!root.querySelector('style[data-process-shared]')){
      const css=await shared;
      if(!this.isConnected||cycle!==this.cycle)return;
      const style=document.createElement('style');
      style.dataset.processShared='';
      style.textContent=css;
      root.append(style);
    }
    if(!root.querySelector('.employee-feed')){
      const mount=document.createElement('div');
      mount.className='framer-13sjovs-container';
      const cards=employeeMessages.map(([image,name,time,text])=>`<article class="employee-update"><img src="/veylo-process/avatars/${image}" alt="" loading="lazy" decoding="async" width="36" height="36"><div><header><strong>${name}</strong><time>${time}</time></header><p>${text}</p></div></article>`).join('');
      mount.innerHTML='<div class="employee-feed" aria-label="数字员工协作动态"><div class="employee-feed-track"><div>'+cards+'</div><div aria-hidden="true">'+cards+'</div></div></div>';
      root.querySelector('.framer-nz4g09').replaceChildren(mount);
    }
    if(this.hasAttribute('data-process-copy')){
      root.querySelectorAll('#process-01 .framer-m5he80 p.framer-styles-preset-16vhenz').forEach(description=>{
        description.textContent='结合岗位知识、业务规则、Skill 和工具处理任务，让财务核对、采购比选、资料分析各有专业分工';
      });
      if(!root.querySelector('.process-profile-card')){
        const profile=document.createElement('aside');
        profile.className='process-profile-card';
        profile.innerHTML='<div class="process-profile-card__lanyard"><img class="process-profile-card__fallback" src="/veylo-process/lanyard/assets/card-front-employee-color.svg" alt="" loading="lazy" width="160" height="225"><div data-profile-lanyard-mount></div></div><div class="process-profile-card__copy"><h3>你的第一位数字员工</h3><p>每位数字员工拥有自己的名称、岗位和工作记忆，像了解团队成员一样，查看它承担的任务、处理过程与交付成果</p></div>';
        root.querySelector('#process > .framer-145ot7n').append(profile);
      }
      root.querySelectorAll('#process-01 h3,#process-02 h3,#process-03 h3,.process-profile-card h3').forEach(title=>title.classList.add('site-type-card'));
      root.querySelectorAll('.framer-m5he80 p.framer-styles-preset-16vhenz,.framer-1kov70p p.framer-styles-preset-16vhenz,.framer-ii4v0o p.framer-styles-preset-16vhenz,.process-profile-card__copy p').forEach(description=>description.classList.add('site-type-body'));
      if(!root.querySelector('style[data-process-cards]')){
        const css=await cards;
        if(!this.isConnected||cycle!==this.cycle)return;
        const style=document.createElement('style');
        style.dataset.processCards='';
        style.textContent=css;
        root.append(style);
      }
      this.profileVisibility=new IntersectionObserver(entries=>{
        if(!entries.some(entry=>entry.isIntersecting))return;
        this.profileVisibility.disconnect();
        this.mountProfileLanyard(cycle).catch(error=>console.error('Lanyard demonstration failed to load',error));
      },{rootMargin:'200px 0px'});
      this.profileVisibility.observe(root.querySelector('.process-profile-card'));
    }
    this.media=matchMedia('(max-width:809.98px)');
    this.onBreakpoint=()=>this.roots.forEach(({root:reactRoot,config,library})=>reactRoot.render(library.jsx(library[config.component],config.props(this.media.matches))));
    this.media.addEventListener('change',this.onBreakpoint);
    const track=root.querySelector('.employee-feed-track');
    track.style.animationPlayState='paused';
    this.feedVisibility=new IntersectionObserver(entries=>{
      track.style.animationPlayState=entries.some(entry=>entry.isIntersecting)?'running':'paused';
    });
    this.feedVisibility.observe(root.getElementById('process-01'));
    this.visibility=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(!entry.isIntersecting)continue;
        const config=illustrations.find(item=>item.id===entry.target.id);
        this.mountIllustration(config,cycle).catch(error=>console.error('Process illustration failed to load',error));
        this.visibility.unobserve(entry.target);
      }
    },{rootMargin:'600px 0px'});
    this.visibility.observe(root.getElementById('process-02'));
    this.dataset.ready='true';
  }
  async mountIllustration(config,cycle){
    if(this.roots.has(config.id)||this.pending.has(config.id))return;
    this.pending.add(config.id);
    const library=await loadIllustrations();
    if(!this.isConnected||cycle!==this.cycle)return;
    const mount=document.createElement('div');
    mount.className=config.className;
    this.shadowRoot.querySelector(config.slot).replaceChildren(mount);
    const reactRoot=library.createRoot(mount);
    this.roots.set(config.id,{root:reactRoot,config,library});
    reactRoot.render(library.jsx(library[config.component],config.props(this.media.matches)));
    this.pending.delete(config.id);
    this.dataset.illustrations=String(this.roots.size);
  }
  async mountProfileLanyard(cycle){
    const library=await loadLanyard();
    if(!this.isConnected||cycle!==this.cycle||this.disposeLanyard)return;
    const root=this.shadowRoot;
    if(!root.querySelector('link[data-lanyard-style]')){
      const style=document.createElement('link');
      style.rel='stylesheet';
      style.href='/veylo-process/lanyard/runtime.css';
      style.dataset.lanyardStyle='';
      root.append(style);
    }
    this.disposeLanyard=library.mountLanyard(root.querySelector('[data-profile-lanyard-mount]'));
  }
  disconnectedCallback(){
    this.cycle++;
    this.visibility?.disconnect();
    this.feedVisibility?.disconnect();
    this.profileVisibility?.disconnect();
    this.disposeLanyard?.();
    this.disposeLanyard=null;
    this.media?.removeEventListener('change',this.onBreakpoint);
    this.roots.forEach(({root})=>root.unmount());
    this.roots.clear();
    this.pending.clear();
    this.mounted=false;
  }
}
customElements.define('veylo-process',VeyloProcess);

const processElement=document.getElementById('veylo-process');
function positionProcess(){
  const capabilities=document.querySelector('[data-framer-name="S1 FcServiceList"] .fcsl');
  if(capabilities){
    capabilities.id='agent-capabilities';
    capabilities.setAttribute('aria-label','五组产品能力');
  }
  const launch=document.getElementById('agentops-launch');
  const reveal=launch?.closest('.launch-reveal');
  if(processElement&&reveal){
    let section=reveal.previousElementSibling;
    if(!section?.hasAttribute('data-process-section')){
      section=document.createElement('div');
      section.className='fc-wrap';
      section.setAttribute('data-process-section','');
      reveal.before(section);
    }
    if(processElement.parentElement!==section){
      if(section.moveBefore&&processElement.isConnected)section.moveBefore(processElement,null);
      else section.append(processElement);
    }
    return;
  }
  if(!processElement||!launch||launch.previousElementSibling===processElement)return;
  if(launch.parentElement.moveBefore&&processElement.isConnected)launch.parentElement.moveBefore(processElement,launch);
  else launch.before(processElement);
}
document.addEventListener('agentops-launch:mounted',positionProcess);
positionProcess();
