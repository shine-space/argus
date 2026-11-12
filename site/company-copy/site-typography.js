// Map existing component roles to the shared stylesheet; no text or layout mutation.
(()=>{
 document.body.classList.add('site-marketing');
 const excluded='header.fchd,footer,.fc.fch .fch-h,.fc.fci .fc-hd,.fcsl-demo,.fcs-demo,.fcsv-demo,.hardware-products__art,.v-app,.service-workbench-preview,.fcz,[data-site-type-skip]';
 const roles=[
 ['h1','hero'],
 ['h2,.fcsl-copy>h2','section'],
 ['h3,.hardware-products__copy>h3','card'],
 ['.fcph-sub,.fcsv-short,.fch-sub,.fcsl-short,.fcab-p,.hardware-products__demo-intro>p,.fcz-body,.fcx-body','description'],
 ['.fcs-short,.fcs-det,.fcpr-body,.hardware-products__copy>p:not(.hardware-products__lead),.fcp-d','body'],
 ['.fc-eb,.fcsl-n,.fcz-eb,.hardware-hero-label','label']
 ];
 const pills=[
 ['.fc-eb,.hardware-hero-label','eyebrow'],
 ['.fcpr-pop,.fcjl-meta em,.fcpo-meta em','category'],
 ['.fcsv-tools span,.fccs-facts dd span,.fcp-o span','meta'],
 ['.fch-live,.fcct-on','status'],
 ['.fch-chip,.fcwl-tag,.fcr-co,.fcz-note','floating'],
 ['.fcs-tools span','tool']
 ];
 function sync(){
  document.querySelectorAll('.fc.fci .fc-hd').forEach(el=>{el.classList.remove('site-type-section');if(el.dataset.siteType==='section')delete el.dataset.siteType;});
  document.querySelectorAll('.fc.fch .fch-h').forEach(el=>{el.classList.remove('site-type-hero');if(el.dataset.siteType==='hero')delete el.dataset.siteType;});
  const heroPages=['/about','/pricing','/solution/electronic','/product/hardware','/product/model'];
  if(heroPages.includes(location.pathname.replace(/\/$/,'')))document.body.dataset.siteHero='shared';else delete document.body.dataset.siteHero;
  if(heroPages.includes(location.pathname.replace(/\/$/,'')))document.querySelectorAll('.fcph-copy,.fcsv-top .fcsv-copy').forEach(el=>{el.classList.add('site-hero-copy');el.parentElement.classList.add('site-hero-grid');el.closest('section')?.classList.add('site-hero-section');});

  document.querySelectorAll('link[rel="stylesheet"][href*="/styles/blocks/"]').forEach(link=>{const url=new URL(link.href,location.href);if(url.searchParams.get('palette')!=='1'||url.searchParams.get('font')!=='shared-1'){url.searchParams.set('weight','500');url.searchParams.set('palette','1');url.searchParams.set('font','shared-1');link.href=url.href;}});

  for(const [selector,role]of roles)document.querySelectorAll(selector).forEach(el=>{if(!el.closest(excluded)){if(el.dataset.siteType!==role)el.dataset.siteType=role;el.classList.add('site-type-'+role)}});
  for(const [selector,role]of pills)document.querySelectorAll(selector).forEach(el=>{if(!el.closest('header.fchd,footer,.fcsl-demo,.fcs-demo,.fcsv-demo,.v-app')){if(el.dataset.sitePill!==role)el.dataset.sitePill=role;el.classList.add('site-pill--'+role)}});
  document.querySelectorAll('.fcct-on').forEach(el=>{el.dataset.sitePillVariant='inverse';el.classList.add('site-pill--inverse')});
  document.querySelectorAll('.fcz-note').forEach(el=>{el.dataset.sitePillVariant='light';el.classList.add('site-pill--light')});
 }
 // MutationObserver runs before paint: bind newly mounted content without a raw-style frame.
 const observer=new MutationObserver(records=>{if(records.some(r=>r.addedNodes.length))sync();});
 sync();observer.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('popstate',sync);window.addEventListener('pageshow',sync);
})();
