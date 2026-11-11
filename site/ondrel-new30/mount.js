(()=>{
 const copyOnly=document.currentScript?.hasAttribute('data-copy-only');
 class OndrelNew30 extends HTMLElement{
  constructor(){super();this.attachShadow({mode:'open'})}
  async connectedCallback(){if(this.loaded)return;this.loaded=true;const html=await fetch('/ondrel-new30/content.html?v=4').then(r=>r.text());this.shadowRoot.innerHTML='<link rel="stylesheet" href="/ondrel-new30/theme.css?v=3">'+html;if(copyOnly){this.shadowRoot.querySelector('.new30-visual')?.remove();this.shadowRoot.querySelector('.new30')?.classList.add('new30--copy-only')}}
 }
 customElements.define('ondrel-new30',OndrelNew30);
 const mount=()=>{if(document.getElementById('ondrel-new30'))return;const plan=document.getElementById('ondrel-plan');if(!plan)return;const host=document.createElement('ondrel-new30');host.id='ondrel-new30';host.lang='zh-CN';plan.after(host)};
 new MutationObserver(mount).observe(document.body,{childList:true,subtree:true});mount();
})();
