(()=>{
 let markup=null;
 function mount(){const root=document.getElementById('aiora-features');if(!root||!markup||root.querySelector('#work-service-list'))return;const wrapper=document.createElement('div');wrapper.id='work-service-list';wrapper.dataset.framerName='S1 FcServiceList';wrapper.innerHTML=markup;root.append(wrapper);wrapper.querySelectorAll('workbench-illustration').forEach(el=>el.remove());import('/company-copy/workbench-illustration.mjs?v=26');
 const cards=[...wrapper.querySelectorAll('.fcsl-card,article[id]')];const links=[...wrapper.querySelectorAll('.fcsl-idx a')];
 links.forEach(link=>link.addEventListener('click',event=>{const card=wrapper.querySelector(link.getAttribute('href'));if(card){event.preventDefault();card.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}}));
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-on');links.forEach((link,index)=>{const active=link.getAttribute('href')==='#'+entry.target.id;link.parentElement.classList.toggle('is-cur',active);if(active){const bar=wrapper.querySelector('.fcsl-bar i');if(bar)bar.style.transform='translateY('+(index*100/links.length)+'%) scaleY('+(1/links.length)+')';}});}}},{rootMargin:'-20% 0px -30% 0px',threshold:0});cards.forEach(card=>observer.observe(card));
 }
 fetch('/company-copy/work-service-list.html').then(r=>{if(!r.ok)throw Error('Unable to load services module');return r.text()}).then(html=>{markup=html;mount()});new MutationObserver(mount).observe(document.getElementById('main'),{childList:true,subtree:true});
})();
