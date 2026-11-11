/* Local copy dictionary. No translation service or external requests. */
(() => {
  const dictionary = /*DICTIONARY*/{};
  const normalize = s => s.replace(/\s+/g, ' ').trim();
  const units=s=>s.replace(/(\d[\d,.]*)\s+(wks|wk|min|yrs|pts|s|h)\b/g,(_,n,u)=>n+' '+({s:'秒',h:'小时',wks:'周',wk:'周',min:'分钟',yrs:'年',pts:'分'}[u]));
  const exact = s => {
    const key=normalize(s),translated = dictionary[key];
    if(translated!==undefined)return units(s.replace(/\S[\s\S]*\S|\S/, translated));
    const morph=key.match(/^Morph the core, now showing (.+)$/);
    if(morph)return '切换核心形态，当前显示：'+exact(morph[1]);
    const closed=key.match(/^Closed · opens (.+)$/);
    if(closed)return '休息中 · '+closed[1]+' 开始服务';
    const timezone=key.match(/^Times in (.+)$/);
    if(timezone)return '时区：'+timezone[1];
    const team=key.match(/^([\d–+\-]+)\s+people$/);
    if(team)return team[1]+' 人';
    if(key.includes(' | argus Case Study'))return key.replace(' | argus Case Study',' | argus 案例');
    if(key.includes(' | argus Journal'))return key.replace(' | argus Journal',' | argus 观察');
    return units(s);
  };
  const ignored = 'script,style,code,pre,textarea';
  const visit = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.parentElement?.closest(ignored)) return;
      const value=exact(node.data); if(value!==node.data)node.data=value;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.matches(ignored)) return;
      for (const attr of ['placeholder','alt','aria-label','title']) if(node.hasAttribute(attr)) {
        const before=node.getAttribute(attr),after=exact(before); if(before!==after)node.setAttribute(attr,after);
      }
      for(const child of [...node.childNodes])visit(child);
    }
  };
  const walk = value => Array.isArray(value) ? value.map(walk) : value && typeof value==='object'
    ? Object.fromEntries(Object.entries(value).map(([k,v])=>[k,walk(v)])) : typeof value==='string' ? translate(value) : value;
  const translate = value => {
    // CMS rows also carry identifiers and status values. Keep those as data;
    // the corresponding visible text still goes through exact() in visit().
    if(/^[a-z][a-z0-9_-]*$/.test(value)||['All','Live','Running','Scheduled','Open','Close'].includes(value))return value;
    const direct=exact(value); if(direct!==value)return direct;
    if(/^[\[{]/.test(value)) { try{return JSON.stringify(walk(JSON.parse(value)))}catch{} }
    if(/<\/?[a-z]/i.test(value)) {
      const template=document.createElement('template');template.innerHTML=value;
      for(const child of template.content.childNodes)visit(child);
      return template.innerHTML;
    }
    return value;
  };
  window.__argusLocalize = translate;
  document.documentElement.lang = 'zh-CN';
  const pageTitle = document.title;
  const setTitle = () => {
    if (document.title !== pageTitle) document.title = pageTitle;
  };
  setTitle();
  new MutationObserver(setTitle).observe(document.head, {subtree:true,childList:true,characterData:true});
  const start = () => {
    visit(document.body);setTitle();
    new MutationObserver(records=>{
      for(const r of records) {
        if(r.type==='characterData'||r.type==='attributes')visit(r.target);
        else for(const n of r.addedNodes)visit(n);
      }
      setTitle();
    }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','alt','placeholder','title']});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(start,1200),{once:true});
  else setTimeout(start,1200);
})();
