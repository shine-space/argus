const fs=require('fs');const c=require('../RECON/ondrel/capture.json');const e=require('../RECON/ondrel/extras.json');
let html=c.html;
html=html.replaceAll('How Ondrel works','数字员工');
html=html.replace('One workspace for the whole plan.','懂岗位，也能推进工作').replace(' Requests come in, roadmaps take shape and releases go out. No status meetings.','围绕岗位目标，调用知识、数据与工具，把需求转化为可复核的成果');
for(const [from,to] of [
 ['Every request in one inbox.','结合当前应用、资料与工作范围，'],
 [' Ideas from chat, email and your help desk land in one place, grouped and counted.','理解需求并调用适用能力'],
 ['A roadmap that updates itself.','通过对话提出目标，'],
 [' Move a date and every linked project and owner moves with it.','按授权检索资料、调用工具和执行流程'],
 ['Everyone sees the same status.','交回记录、草稿、报表与引用依据，'],
 [' Owners update their work where they already are, and blockers surface before they turn into slipped dates.','关键操作由业务人员确认']
]) html=html.replaceAll(from,to);

for(const [from,to] of [['Collect requests','专业能力，按岗配置'],['Plan the roadmap','对话交办，工具执行'],['Track the work','成果有据，人工确认'],['Ship and share','口径延续，方法复用']]) html=html.replaceAll(from,to);
html=html.replace(/ srcset="[^"]*"/g,'').replace(/https:\/\/framerusercontent.com\/images\/ZklcwB3KmSKgLMzY89upy0vSg.jpg[^" ]*/g,'/ondrel/sand.jpg').replace(/https:\/\/framerusercontent.com\/images\/OtX7bK3CEtk1U11RkWSaEXmA.jpg[^" ]*/g,'/ondrel/clouds.jpg');
const full=`<div class="${c.parents[1]}"><div class="${c.parents[0]}">${html}</div></div><svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs>${e.defs}</defs></svg>`;
fs.writeFileSync('site/ondrel/content.html',full);
const classes=new Set([...full.matchAll(/class="([^"]*)"/g)].flatMap(m=>m[1].split(/\s+/)));
function prune(s){let out='',i=0;while(i<s.length){let b=s.indexOf('{',i);if(b<0)break;let depth=1,j=b+1,quote='';for(;j<s.length&&depth;j++){let ch=s[j];if(quote){if(ch===quote&&s[j-1]!=='\\')quote='';}else if(ch==='"'||ch==="'")quote=ch;else if(ch==='{')depth++;else if(ch==='}')depth--;}
let sel=s.slice(i,b).trim(),body=s.slice(b+1,j-1);i=j;if(sel.startsWith('@font-face'))continue;if(sel.startsWith('@media')||sel.startsWith('@supports')){let inner=prune(body);if(inner)out+=sel+'{'+inner+'}\n';continue;}if(sel.startsWith('@'))continue;
let selectors=sel.split(',').filter(t=>[...t.matchAll(/\.([a-zA-Z_][\w-]*)/g)].every(m=>classes.has(m[1])||m[1]==='rich-text-wrapper'));if(!selectors.length)continue;
body=body.replace(/(?:--framer-)?font-family\s*:[^;}]*(?:;|$)/g,'');out+=selectors.join(',').replace(/\bbody\b/g,':host')+'{'+body+'}\n';}return out;}
fs.writeFileSync('site/ondrel/source.css',prune(c.css.join('\n'))+`
:host{display:block;width:100%;flex:none;background:#fff;color:#17191e;font-family:var(--ty-font-text,Arial,sans-serif)}
*,*::before,*::after{box-sizing:border-box;font-family:inherit!important}
.framer-kZk8h.framer-hwg9m,.framer-ivkTB.framer-72rtr7{width:100%;overflow:visible}
.framer-ivkTB .framer-mgdfhv{top:96px}
[data-framer-name^="Index Item "]:not([data-framer-name$="Text"]):not([data-framer-name$="Marker"]){cursor:pointer;outline-offset:6px}
[data-framer-name$="Text"]{transition:opacity .2s}
[id^="feature-"]{scroll-margin-top:110px}
@media(max-width:1199px){[data-framer-name="Feature Index Column"]{display:none!important}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
`);
console.log('Saved',full.length,fs.statSync('site/ondrel/source.css').size);

