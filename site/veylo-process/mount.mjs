// The text and native activity feed render without loading the Framer runtime.
let illustrationModule;
const loadIllustrations=()=>illustrationModule??=import('./runtime/illustrations.js');
let sharedStyles;
const loadSharedStyles=()=>sharedStyles??=Promise.all([
  fetch('/styles/site-section-type.css?v=1').then(response=>response.text()),
  fetch('/styles/site-product-demo-pill.css?v=1').then(response=>response.text()),
]).then(styles=>styles.join('\n'));

const illustrations=[
  {id:'process-02',slot:'.framer-1n57i0g',className:'framer-e17616-container',component:'VeyloOrganize',
    props:mobile=>({variant:mobile?'JD_TVXMYa':'VwgUULGdO',tqSm9VW1z:'工作流',zGqkTYBqh:'记忆',w4dSkuCpo:'工具',kfwRHcf6c:'数据库',g0bztQNkz:'Skill',uKClQyFZX:'知识库',VxpabYDoF:'数字员工',style:{width:'100%',height:'100%'}})},
  {id:'process-03',slot:'.framer-1xltms7',className:'framer-17xrq7r-container',component:'VeyloActions',
    props:()=>({variant:'Xm5ZuEi76',width:'100%',height:'100%'})},
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
    this.handleChange=event=>{
      const form=event.target.closest?.('.resume-confirmation');
      form?.querySelectorAll('label').forEach(label=>label.classList.toggle('is-selected',label.querySelector('input').checked));
    };
    this.handleSubmit=event=>{
      if(!event.target.matches('.resume-confirmation'))return;
      event.preventDefault();
      event.target.querySelector('.resume-submit').textContent='已提交';
    };
    this.handleClick=event=>{
      const form=event.target.closest?.('.resume-skip')?.closest('.resume-confirmation');
      if(!form)return;
      form.querySelector('.resume-submit').textContent='提交';
      form.querySelectorAll('input').forEach(input=>input.checked=false);
      form.querySelectorAll('label').forEach(label=>label.classList.remove('is-selected'));
    };
  }
  connectedCallback(){
    if(this.mounted)return;
    this.mounted=true;
    const cycle=++this.cycle;
    this.mount(cycle).catch(error=>console.error('Process demonstration failed to initialize',error));
  }
  // Repositioning beside the launch iframe preserves the existing DOM and roots.
  connectedMoveCallback(){}
  async mount(cycle){
    const root=this.shadowRoot;
    if(!root.querySelector('#process')){
      const [css,html]=await Promise.all([
        fetch('/veylo-process/process.css').then(response=>response.text()),
        fetch('/veylo-process/process.html').then(response=>response.text()),
      ]);
      if(!this.isConnected||cycle!==this.cycle)return;
      root.innerHTML='<style data-process-base>'+css+'</style>'+html;
    }
    if(!root.querySelector('style[data-process-shared]')){
      const css=await loadSharedStyles();
      if(!this.isConnected||cycle!==this.cycle)return;
      const style=document.createElement('style');
      style.dataset.processShared='';
      style.textContent=css;
      root.append(style);
    }
    if(!root.querySelector('.process-demo-heading')){
      const heading=document.createElement('header');
      heading.className='process-demo-heading';
      heading.innerHTML='<span class="process-demo-label"><i aria-hidden="true"></i><span>产品演示</span></span><h2 class="site-type-section">数字员工如何参与日常工作</h2><p class="site-type-body">结合岗位知识、技能与工具处理任务，在项目中分工、交接并共同交付</p>';
      root.prepend(heading);
    }
    if(!root.querySelector('.employee-feed')){
      const mount=document.createElement('div');
      mount.className='framer-13sjovs-container';
      const cards=employeeMessages.map(([image,name,time,text])=>`<article class="employee-update"><img src="/veylo-process/avatars/${image}" alt="" loading="lazy" decoding="async" width="36" height="36"><div><header><strong>${name}</strong><time>${time}</time></header><p>${text}</p></div></article>`).join('');
      mount.innerHTML='<div class="employee-feed" aria-label="数字员工协作动态"><div class="employee-feed-track"><div>'+cards+'</div><div aria-hidden="true">'+cards+'</div></div></div>';
      root.querySelector('.framer-nz4g09').replaceChildren(mount);
    }
    this.media=matchMedia('(max-width:809.98px)');
    this.onBreakpoint=()=>this.roots.forEach(({root:reactRoot,config,library})=>reactRoot.render(library.jsx(library[config.component],config.props(this.media.matches))));
    this.media.addEventListener('change',this.onBreakpoint);
    root.addEventListener('change',this.handleChange);
    root.addEventListener('submit',this.handleSubmit);
    root.addEventListener('click',this.handleClick);
    const track=root.querySelector('.employee-feed-track');
    track.style.animationPlayState='paused';
    this.visibility=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.target.id==='process-01'){
          track.style.animationPlayState=entry.isIntersecting?'running':'paused';
        }else if(entry.isIntersecting){
          const config=illustrations.find(item=>item.id===entry.target.id);
          this.mountIllustration(config,cycle).catch(error=>console.error('Process illustration failed to load',error));
          this.visibility.unobserve(entry.target);
        }
      }
    },{rootMargin:'600px 0px'});
    for(const id of ['process-01','process-02','process-03'])this.visibility.observe(root.getElementById(id));
    this.dataset.ready='true';
  }
  async mountIllustration(config,cycle){
    if(this.roots.has(config.id)||this.pending.has(config.id))return;
    this.pending.add(config.id);
    const library=await loadIllustrations();
    if(!this.isConnected||cycle!==this.cycle)return;
    library.initDOM();
    const mount=document.createElement('div');
    mount.className=config.className;
    this.shadowRoot.querySelector(config.slot).replaceChildren(mount);
    const reactRoot=library.createRoot(mount);
    this.roots.set(config.id,{root:reactRoot,config,library});
    if(config.id==='process-03'){
      this.actionObserver=new MutationObserver(()=>this.installActions());
      this.actionObserver.observe(this.shadowRoot.getElementById('process-03'),{childList:true,subtree:true});
    }
    reactRoot.render(library.jsx(library[config.component],config.props(this.media.matches)));
    this.pending.delete(config.id);
    this.dataset.illustrations=String(this.roots.size);
  }
  installActions(){
    const root=this.shadowRoot;
    const target=root.querySelector('#process-03 .framer-13z6rkf .framer-v9mrk4');
    if(!target||target.querySelector('.resume-confirmation'))return;
    target.innerHTML='<form class="resume-confirmation"><strong>请补充本次排产的优先目标</strong><div class="resume-options"><label class="is-selected"><input type="radio" name="candidate" value="优先保障交期" checked><span class="resume-index">1</span><span>优先保障交期</span><img src="/veylo-process/assets/resume-arrow-right.svg" alt="" width="16" height="16"></label><label><input type="radio" name="candidate" value="优先减少换线"><span class="resume-index">2</span><span>优先减少换线</span></label></div><footer><button type="button" class="resume-skip">跳过</button><button type="submit" class="resume-submit">提交</button></footer></form>';
    const paragraphs=root.querySelectorAll('#process-03 .framer-1de7nik p');
    if(paragraphs[0])paragraphs[0].textContent='生产排程';
    if(paragraphs[1])paragraphs[1].textContent='请结合订单交期、物料齐套与产线产能，整理下周排产方案，并标注可能延期的订单';
  }
  disconnectedCallback(){
    this.cycle++;
    this.visibility?.disconnect();
    this.actionObserver?.disconnect();
    this.media?.removeEventListener('change',this.onBreakpoint);
    this.shadowRoot.removeEventListener('change',this.handleChange);
    this.shadowRoot.removeEventListener('submit',this.handleSubmit);
    this.shadowRoot.removeEventListener('click',this.handleClick);
    this.roots.forEach(({root})=>root.unmount());
    this.roots.clear();
    this.pending.clear();
    this.mounted=false;
  }
}
customElements.define('veylo-process',VeyloProcess);

const processElement=document.getElementById('veylo-process');
function positionProcess(){
  const launch=document.getElementById('agentops-launch');
  if(!processElement||!launch||launch.previousElementSibling===processElement)return;
  if(launch.parentElement.moveBefore&&processElement.isConnected)launch.parentElement.moveBefore(processElement,launch);
  else launch.before(processElement);
}
document.addEventListener('agentops-launch:mounted',positionProcess);
positionProcess();
