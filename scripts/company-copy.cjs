const fs=require('fs'),path=require('path'),acorn=require('acorn');
const root=path.resolve(__dirname,'..'), site=path.join(root,'site');
const remote='/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/';
const home='-5DwPJsa9pWeM4C-1pOHWNvuXhnxE6_8iwkR9WlXQp8.BkGkNq2i.mjs';
const map={
'朝夕智能，专注企业级人工智能应用。 以制造业为起点，将平台、业务应用与现场工程结合， 帮助企业把智能能力带入真实工作':'朝夕智能专注企业级 AI 应用。我们从制造业做起，提供平台、业务应用和现场实施服务，帮助企业把 AI 用到日常工作中。',
'core':'企业智能体','客户':'平台能力','60+':'智能协同，业务贯通','个运营团队在使用我们的智能体':'从一个清晰场景开始，逐步扩展企业智能能力',
'查看案例':'了解产品体系','全部案例':'探索业务场景','精选案例':'解决方案','已经投入|*实际工作* 的智能体。':'理解行业的复杂|解决工作中的 *具体*','案例':'业务场景',
'控制台':'数字员工与工作台','走进':'走进','我们构建的每个智能体都接入同一个控制台：做了什么、何时执行、哪些任务转交了人工，一目了然。':'业务人员通过数字员工提出目标，在工作台查看依据、处理任务和确认结果。两种方式围绕同一业务对象与权限边界协作。',
'console.argus.ai':'朝夕智能 · 业务工作台','实时动态':'任务过程示意','推送中':'示例','记录每一步操作;由你掌控的人工接管规则;在你自己的账户中运行':'对话交办，连续工作;查看依据，确认结果;授权访问，过程可查',
'1,284|本月节省工时;3,912|今日完成任务;14|已转交人工':'01|理解目标与边界;02|连接能力与业务;03|确认成果与复用',
'12k+|项任务由智能体每天完成;94%|无需人工解决;3 周|从评估到智能体上线':'平台|组织业务与协作;模型|适配工业任务;硬件|按需适配部署载体',
'线索已回复|38 s;发票已入账|Xero · 2 分钟;工单已解决|客户满意度 5/5':'知识与规则|回答附带来源;流程与工具|关键操作确认;任务与成果|过程可以回查',
'我们交付的智能体':'系统连接','十个智能体。|*一个* 核心。':'A2A，让企业的能力|成为 *智能工作* 的基础',
'每个智能体都运行在同一个核心之上：你的数据、你的规则、一个控制台。悬停查看它为客户带来的成果。':'从企业到产业链，在授权边界内开展智能体协作',
'成效':'为什么选择朝夕','来自 *实际运行中* 智能体的数据。':'让智能 *有能力* 也有边界','数据来自 60 多个运行中的智能体，均在客户自有工具中衡量，取平均值。':'从接入到运行，明确授权、人工确认、过程记录与版本管理，让人始终掌握关键判断。',
'合作流程':'现场工程','五周，从评估|到 *自主运行。*':'走进现场|把工作 *做成*','查看完整流程':'了解现场交付',
'价格':'交付服务','价格清晰。|每笔费用 *心中有数。*':'从业务问题|到可用的 *应用*','从评估开始。如果继续由我们开发，评估费可抵扣首个项目费用。':'从岗位访谈与流程诊断出发，共同明确业务目标、实施条件与验收方式。','热门选择':'场景落地',
'自动化评估':'AI 咨询规划','$1,500':'方案蓝图','one-off':'明确建设路径','找出值得自动化的耗时工作':'把业务问题变成有优先级的落地方案','与你的团队进行两天流程评估;按投资回报排序的自动化清单;架构与工具方案;开发固定报价':'梳理流程与业务价值;评估数据、系统与现场;明确场景优先级与实施边界;形成阶段计划与验收标准','预约评估':'沟通业务需求',
'智能体开发':'FDE 现场实施','$8,500':'应用交付','起 / 每个智能体':'围绕真实业务样本','一个智能体或一条工作流，数周即可上线':'围绕实际系统，交付可持续使用的业务应用','包含评估计划的全部内容;设计、开发与测试;与你现有工具集成;团队培训与交接;上线后提供 30 天调优':'配置数字员工、流程与工作台;组织知识、数据与模型能力;完成接口、权限及设备适配;试运行与联合验收;培训、运行说明与运维交接','启动开发':'讨论实施方案',
'AI 长期合作计划':'持续运营与扩展','$3,900':'能力积累','per month':'以验证结果持续迭代','每月都有 AI 团队随时支持':'将验证有效的方法沉淀为企业可复用资产','每月新增自动化流程;运行监控与月度报告;Slack 优先支持;季度策略研讨':'维护知识、规则与业务配置;跟踪运行、定位问题与改进;沉淀流程、连接器和评测用例;验证新岗位与新场景','联系我们':'探索合作',
'免费自动化评估':'探索合作','告诉我们时间都花在了哪里。20 分钟内，我们会指出最值得优先构建的三项自动化，以及预计能节省的时间。':'从一个业务问题出发，用真实样本验证价值','无需演示文稿，没有合作义务，2 小时内回复。':'明确范围、职责与验收，推进下一步交流','或留下你的工作邮箱':'留下工作邮箱，沟通业务需求',
'全部服务':'了解产品详情'
};
const clients='智能体|理解目标，协同执行|理解岗位目标，在授权范围内调用工具推进任务;工作流|串联步骤，推进业务|串联业务步骤、分支判断与人工确认;企业知识|沉淀经验，有据可查|汇聚文档与经验，关联原文来源，让回答有据可查;业务数据|统一口径，连接业务|连接业务记录，统一数据口径与任务上下文;工具与模型|按需组合，拓展能力|按需组合工具与模型，适配具体业务任务;运行治理|权限可控，过程可溯|管理权限、版本与记录，让操作可控、过程可溯';
const agents='ERP|经营管理|连接订单、采购与财务数据;MES|生产执行|关联工单、生产进度与质量记录;CRM|客户管理|连接客户、商机与服务记录;WMS|仓储管理|查询库存、库位与出入库记录;OA|办公协同|衔接审批、通知与协同流程;数据库|业务数据|按授权查询业务数据与关联明细;文档|知识资料|检索制度、手册与原始资料;API 接口|系统集成|通过授权接口调用所需业务能力';
const steps='场景诊断|明确目标|还原现有流程，明确首期目标、业务负责人及验收样本。|业务流程,首期范围,验收口径;配置与联调|连接能力|构建应用，连接授权接口，核对规则、权限和异常路径。|应用配置,系统连接,人工边界;联合验收|验证结果|通过真实业务样本检查结果、操作、状态与人工确认。|业务样本,验证记录,联合验收;持续积累|运营迭代|交接维护职责，将知识、流程与连接方法沉淀为可复用资产。|操作培训,运维分工,复用资产';
const homepageServices=[
 ['knowledge-base','企业知识库','回答附上原文和原图','把分散的文档、图片和经验整理到一起。查到答案后，可以查看原文和配图，判断能否用于手头的工作','智能问答,查看原文原图,整理业务经验'],
 ['finance','财务专员','从票据原件核对到账务记录','数字员工和财务工作台使用同一账套、期间和业务规则，读取原件，整理待审申请和凭证草稿。每一步都能回查，由人复核','票据识别,账务核对,凭证草稿'],
 ['reporting','商务报表','把业务台账整理成报表','按约定口径整理台账、计算并对账，生成业务类型、销售团队和年度趋势三类工作簿。汇总数字都能查到明细','台账汇总,经营分析,查看明细'],
 ['procurement','采购寻源','推荐供应商，也说明理由','先核对供应商资格和物料规格，再比较合格候选的历史记录。采购规则可以调整，也能预演权重变化的影响；最终名单由采购确认','资格筛选,供应商比选,推荐依据'],
].map(([slug,f1,f2,f7,f6])=>({slug,f1,f2,f3:'',f4:'',f5:'',f6,f7}));
function patchCurrentHomepageServices(source){
 // The public cards already use these four applications. Do not mount the
 // retired phone/CRM demos while hero-layout installs the current flow diagrams.
 source=source.replace('S=hi(`services`,Bi.services).slice(0,5)','S='+JSON.stringify(homepageServices));
 source=source.replace('className:`fcs-demo`,children:d(gi,{kind:e.f5,M:m,D:f})','className:`fcs-demo`,children:null');
 return source;
}
function translated(v){if(/^(?:Now booking Q4 builds · 3 slots left|第四(?:个)?季度项目预约中 · 剩余 3 个名额)$/i.test(v))return '';
 if(v==='hello@argus.ai')return '';
 if(v==='价格以美元计，不包含你自有工具的订阅费。每个开发项目均包含 30 天调优。')return '';
 if(Object.hasOwn(map,v))return map[v];
 if(v.startsWith('Northwind Dental|'))return clients;
 if(v.startsWith('接待员|诊所|'))return agents;
 if(v.startsWith('Audit|Week 1|')||v.startsWith('评估|第 1 周|'))return steps;
 if(v.startsWith('Voice agent|Live|'))return '企业知识库|Live|授权资料 · 原文与配图;财务专员|Running|票据核对 · 凭证草稿;商务报表|Live|统一口径 · 明细追溯;采购寻源|Live|资格与规格 · 证据比较;订单处理|Scheduled|字段核对 · 人工确认';
 if(v.startsWith('Voice agent booked Emma'))return '企业知识库已关联设备手册原文与配图;财务专员已整理票据与采购订单核对结果;商务报表已生成待复核的业务类型月报;采购寻源已整理供应商资格与规格缺口;订单处理已提取邮件附件中的订单字段;财务专员已标记一条疑似重复记录;商务报表已关联汇总数据与来源明细;采购寻源已生成待采购团队确认的候选名单';
 if(v.startsWith('12,000+|tasks our agents')){const rows=v.split(';');const labels=['专注企业级 AI，以制造业为起点，融合平台与现场工程，将知识、数据和系统转化为业务能力','结合企业经营、企业 IT 与一线信息化视角，让业务负责人和技术人员围绕同一目标协作','平台承载共性能力，FDE 深入现场完成诊断、配置、联调与验收，处理实际业务差异','将验证有效的知识、流程、连接方法与用例沉淀为资产，为后续岗位和场景扩展提供基础'];return rows.map((r,i)=>[i===0?'把智能带到业务现场':i===1?'连接产业与专业经验':i===2?'平台与现场工程结合':'让交付持续积累',labels[i],r.split('|')[2]].join('|')).join(';')}
 return v;
}
function transform(s){let edits=[];const ast=acorn.parse(s,{ecmaVersion:'latest',sourceType:'module'});function walk(n){if(!n||typeof n!=='object')return;const v=n.type==='Literal'?n.value:n.type==='TemplateLiteral'&&n.expressions.length===0?n.quasis[0].value.cooked:null;if(typeof v==='string'){const t=translated(v);if(t!==v)edits.push({start:n.start,end:n.end,text:JSON.stringify(t)});if(n.type==='Literal'||n.type==='TemplateLiteral')return;}for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object')walk(v)}}walk(ast);for(const e of edits.sort((a,b)=>b.start-a.start))s=s.slice(0,e.start)+e.text+s.slice(e.end);return s;}
function syncHomepageSectionOrder(html) {
  const block = className => {
    const start = html.indexOf('<div class="' + className + '"');
    if (start < 0) throw new Error('Homepage section missing: ' + className);
    const tags = /<\/?div\b[^>]*>/g;
    tags.lastIndex = start;
    let depth = 0, tag;
    while ((tag = tags.exec(html))) {
      depth += tag[0].startsWith('</') ? -1 : 1;
      if (depth === 0) return {start, end: tags.lastIndex};
    }
    throw new Error('Unclosed homepage section: ' + className);
  };
  const impact = block('framer-n3blqa'), agents = block('framer-184qns8');
  if (agents.start < impact.start) return html;
  const between = html.slice(impact.end, agents.start);
  if (between.trim()) throw new Error('Unexpected content between homepage sections');
  return html.slice(0, impact.start) + html.slice(agents.start, agents.end) + between +
    html.slice(impact.start, impact.end) + html.slice(agents.end);
}

const names=[home,'FcLogos.C56jAPIg.mjs','FcProcess.DD6BEyf_.mjs','FcPricing.BHcVFo1n.mjs','FcCta.xuPCq5x9.mjs'];
function removeRetiredHomeSections(source){
 const tree=acorn.parse(source,{ecmaVersion:'latest',sourceType:'module'}),edits=[];
 const value=node=>node?.type==='Literal'?node.value:node?.type==='TemplateLiteral'&&!node.expressions.length?node.quasis[0].value.cooked:undefined;
 function visit(node){
  if(!node||typeof node!=='object')return;
  if(node.type==='CallExpression'&&node.arguments[1]?.type==='ObjectExpression'){
   const props=node.arguments[1].properties;
   const className=value(props.find(prop=>(prop.key?.name||value(prop.key))==='className')?.value);
   if(['framer-nt5jd6','framer-10h0c00'].includes(className)){edits.push({start:node.start,end:node.end});return;}
  }
  for(const child of Object.values(node)){if(Array.isArray(child))child.forEach(visit);else if(child&&typeof child==='object')visit(child);}
 }
 visit(tree);
 for(const edit of edits.sort((a,b)=>b.start-a.start))source=source.slice(0,edit.start)+'null'+source.slice(edit.end);
 return source;
}
fs.mkdirSync(path.join(site,'company-copy'),{recursive:true});
let html=fs.readFileSync(path.join(site,'index.html'),'utf8');const imports=JSON.parse(html.match(/<script type="importmap">(.*?)<\/script>/)[1]);
for(const name of names){let s=fs.readFileSync(name===home?path.join(site,'reviews-home.mjs'):name.startsWith('FcCta')?path.join(site,'particle-shapes/cta.mjs'):path.join(site,remote,name,'plain.zh'),'utf8');
 if(name===home){
  s=s.replace("children:[N&&u(`p`,{className:`fch-live`,style:D,children:[d(`i`,{\"aria-hidden\":!0}),N]}),!H&&d(Tt,{text:M,on:V,M:D,delay:200})]","children:[!H&&d(Tt,{text:M,on:V,M:D,delay:200}),N&&u(`p`,{className:`fch-live`,style:D,children:[d(`i`,{\"aria-hidden\":!0}),N]})]");
  const ast=acorn.parse(s,{ecmaVersion:'latest',sourceType:'module'});let edit;
  function find(n){if(!n||typeof n!=='object')return;if(n.type==='Property'&&(n.key.name||n.key.value)==='work'&&n.value.type==='ArrayExpression'&&s.slice(n.value.start,n.value.end).includes('northwind-dental'))edit=n.value;for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(find);else if(v&&typeof v==='object')find(v)}}find(ast);
  const rows=[['order-processing','订单处理','从客户邮件与附件，到可复核的订单信息','字段核对','人工确认','订单与主数据'],['material-shortage','缺料与供应协同','将需求、库存与在途，组织成可跟进的行动','供需协同','责任跟进','供应链与计划'],['cost-analysis','成本与经营分析','沿 BOM、采购价格与报价，找到差异和依据','差异复核','依据可查','成本与报价'],['knowledge','知识与规则查询','让文档、表格与经验成为可用的决策依据','有据问答','原文溯源','企业知识'],['implementation','现场工程','从场景诊断到联合验收，让方案进入真实工作','联合验收','持续积累','FDE 服务']];
  const imgs=[...s.slice(edit.start,edit.end).matchAll(/img:`([^`]+)`/g)].map(x=>x[1]);
  const data=rows.map((r,i)=>({slug:['northwind-dental','ledgerly','oakline-home','vantage-legal','brightpath-realty'][i],f1:r[1],f2:'制造业',f3:r[2],f4:r[3],f5:r[4],f7:r[5],img:imgs[i],n1:''+(i+1)}));
  s=s.slice(0,edit.start)+JSON.stringify(data)+s.slice(edit.end);
  s=s.replace('C=ea(`work`,Ta.work).slice(0,8)','C=Ta.work');
 }
 if(name.startsWith('FcPricing'))s=s.replace('D=E(`plans`,Y.plans).slice(0,3)','D=Y.plans');
 s=s.replace('P.pre,kn(P.n*j,P.dec),P.suf','String(N.v).padStart(2,`0`)');
 if(name===home)s=s.replace('n+=a*(1+l)','n+=a*.10').replace('className:`fci-num`,','className:`fci-num${(N.v===`把智能带到业务现场`||N.v===`连接产业与专业经验`||N.v===`平台与现场工程结合`||N.v===`让交付持续积累`)?` is-copy`:``}`,');
 if(name===home)s=s.replace('d(`p`,{className:`fci-note`,style:v,children:f})','null').replace('O=[i,a,c,l]','O=[1,2,3,4].map(n=>({src:`/about-scenes/scene-${n}.webp`}))');
 if(name===home)s=s.replace(/Dn=\[[\s\S]*?\],On=/, "Dn=[\"shape(from 10% 4%, curve to 54% 4% with 16.13% -1.63% / 43.25% 3.38%, curve to 96% 9% with 64.75% 4.63% / 90.75% 3.25%, curve to 96% 50% with 101.25% 14.75% / 96.63% 39.13%, curve to 91% 96% with 95.38% 60.88% / 97% 90.25%, curve to 48% 96% with 85% 101.75% / 58.75% 96.5%, curve to 5% 92% with 37.25% 95.5% / 10.38% 97.88%, curve to 5% 49% with -0.38% 86.13% / 4.38% 60%, curve to 10% 4% with 5.63% 38% / 3.88% 9.63%, close)\",\"shape(from 8% 7%, curve to 51% 4% with 13.75% 1.13% / 40.25% 4%, curve to 94% 7% with 61.75% 4% / 88.5% 1.5%, curve to 95% 48% with 99.5% 12.5% / 95% 37.38%, curve to 94% 92% with 95% 58.63% / 99.38% 86%, curve to 52% 96% with 88.63% 98% / 62.88% 95.63%, curve to 7% 95% with 41.13% 96.38% / 12.88% 100.63%, curve to 5% 51% with 1.13% 89.38% / 4.88% 62%, curve to 8% 7% with 5.13% 40% / 2.25% 12.88%, close)\",\"shape(from 10% 4%, curve to 54% 4% with 16.13% -1.63% / 43.25% 3.38%, curve to 96% 9% with 64.75% 4.63% / 90.75% 3.25%, curve to 96% 50% with 101.25% 14.75% / 96.63% 39.13%, curve to 91% 96% with 95.38% 60.88% / 97% 90.25%, curve to 48% 96% with 85% 101.75% / 58.75% 96.5%, curve to 5% 92% with 37.25% 95.5% / 10.38% 97.88%, curve to 5% 49% with -0.38% 86.13% / 4.38% 60%, curve to 10% 4% with 5.63% 38% / 3.88% 9.63%, close)\",\"shape(from 8% 7%, curve to 51% 4% with 13.75% 1.13% / 40.25% 4%, curve to 94% 7% with 61.75% 4% / 88.5% 1.5%, curve to 95% 48% with 99.5% 12.5% / 95% 37.38%, curve to 94% 92% with 95% 58.63% / 99.38% 86%, curve to 52% 96% with 88.63% 98% / 62.88% 95.63%, curve to 7% 95% with 41.13% 96.38% / 12.88% 100.63%, curve to 5% 51% with 1.13% 89.38% / 4.88% 62%, curve to 8% 7% with 5.13% 40% / 2.25% 12.88%, close)\"],On=");
 s=transform(s).replace(/from"\.\//g,'from"'+remote);
 if(name===home)s=s.replace(/(button1:\s*(?:\{[^{}]*defaultValue:\s*)?)(["`])预约免费评估\2/g,'$1"探索业务应用"');
 s=s.replaceAll('预约免费评估','商务合作');
 if(name.startsWith('FcLogos'))s=s.replace('F=Math.max(6,M.length)','F=Math.max(12,M.length)');
 if(name.startsWith('FcLogos'))s=s.replace('.fcl-cap{min-height:118px;','.fcl-cap{');
 if(name.startsWith('FcLogos'))s=s.replace(",s(`span`,{style:S,children:J.a})",'').replace('.fcl-now em{font-style:normal;font-size:15px;','.fcl-now em{font-style:normal;font-size:13px;');
 if(name===home)s=s.replaceAll('cursorLabel:a="了解产品体系"','cursorLabel:a="查看解决方案"').replaceAll('cursorLabel:"了解产品体系"','cursorLabel:"查看解决方案"').replaceAll('title:`Cursor Label`,defaultValue:"了解产品体系"','title:`Cursor Label`,defaultValue:"查看解决方案"');

 // Swap the complete React section nodes so visual and document order agree.
 if(name===home){
  const tree=acorn.parse(s,{ecmaVersion:'latest',sourceType:'module'}), sections={};
  function locate(n){if(!n||typeof n!=='object')return;
   if(n.type==='CallExpression'){const props=n.arguments[1];if(props?.type==='ObjectExpression'){const prop=props.properties.find(p=>p.key?.name==='className');const v=prop?.value;const cls=v?.type==='TemplateLiteral'?v.quasis[0].value.cooked:v?.value;if(cls==='framer-n3blqa'||cls==='framer-184qns8')sections[cls]=n;}}
   for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(locate);else if(v&&typeof v==='object')locate(v);}}
  locate(tree);const a=sections['framer-n3blqa'],b=sections['framer-184qns8'];
  if(!a||!b)throw Error('Section order targets missing');
  if(a.start<b.start)s=s.slice(0,a.start)+s.slice(b.start,b.end)+s.slice(a.end,b.start)+s.slice(a.start,a.end)+s.slice(b.end);
 }
 if(name===home){
  s=s.replace(/(button:\w+=(?:"了解产品详情"|`了解产品详情`),buttonLink:\w+=)`\/product\/model`/g,'$1`/product/agent`');
  s=s.replace(/(button:\{[^{}]*defaultValue:(?:"了解产品详情"|`了解产品详情`)\},buttonLink:\{[^{}]*defaultValue:)`\/product\/model`/g,'$1`/product/agent`');
  s=s.replace(/(button:"了解产品详情",buttonLink:)`\/product\/model`/g,'$1`/product/agent`');
 }
 if(name===home)s=s.replaceAll('AI Agent 平台','企业智能体平台').replaceAll('N="工业模型"','N="工业模型与硬件"');
 if(name===home){
  s=s.replace('M="FDE \u73b0\u573a\u5de5\u7a0b"','M="\u4f01\u4e1a\u667a\u80fd\u4f53\u5e73\u53f0"');
  const chipsStart=s.indexOf(',!H&&d(`ul`,{className:`fch-chips`');
  if(chipsStart!==-1){const chipsEnd=s.indexOf(',u(`div`,{className:`fch-foot`',chipsStart);if(chipsEnd===-1)throw new Error('Hero chips boundary missing');s=s.slice(0,chipsStart)+s.slice(chipsEnd);}
 }

 if(name===home)s=s.replace("d(`b`,{style:m,children:\"企业智能体\"})","d(`b`,{style:m,children:\"企业\\n智能体\"})");
 if(name===home){
  const shape='d(`span`,{className:`fch-shape`,style:D,"aria-hidden":!0,children:W.map((e,t)=>d(`b`,{className:t===ae?`is-on`:``,children:e},t))})';
  const foot='u(`div`,{className:`fch-foot`,children:[';
  s=s.replace(','+shape,'').replace(foot,foot+shape+',');
 }
 if(name===home)s=s.replace('d(Li,{text:t,on:b,M:m}),d(Ii,{text:n,on:b,D:f,','d(Ii,{text:n,on:b,D:f,');
 if(name===home)s=require('./hero-saturn.cjs').patchSaturnHero(s);
 if(name===home)s=require('./hero-entrance.cjs').patchHeroEntrance(s);
 if(name===home)s=require('./hero-performance.cjs').patchHeroPerformance(s);
 if(name===home)s=require('./hero-performance.cjs').patchMotionLayout(s);
 if(name===home)s=require('./platform-capabilities.cjs').removeHomepageCapabilities(s);
 if(name===home)s=removeRetiredHomeSections(s);
 if(name===home)s=patchCurrentHomepageServices(s);
  if(name===home||name.startsWith('FcPricing')){
   for(const [before,after] of Object.entries(require('./home-humanized-copy.json')))s=s.replaceAll(before,after);
  }
  if(name.startsWith('FcPricing'))s=require('./shared-pricing.cjs').patchPricingCards(s);
  if(name.startsWith('FcCta'))s=require('./sync-cooperation.cjs').patchSharedCooperation(s);
  acorn.parse(s,{ecmaVersion:'latest',sourceType:'module'});
 const file=name===home?'home.mjs':name.split('.')[0]+'.mjs';fs.writeFileSync(path.join(site,'company-copy',file),s);imports.imports[remote+name]='/company-copy/'+file+'?v=30';
}
html=html.replaceAll('>全部业务应用</span>','>了解产品详情</span>');
html=(html=>html.replace(/<a\b[^>]*href="\/product\/model"[^>]*>[\s\S]*?<\/a>/g,a=>a.includes('>了解产品详情</span>')?a.replace('href="/product/model"','href="/product/agent"'):a))(html);
html=syncHomepageSectionOrder(html);
html=html.replace(/<script type="importmap">.*?<\/script>/,'<script type="importmap">'+JSON.stringify(imports)+'</script>');
fs.writeFileSync(path.join(site,'index.html'),html);
fs.writeFileSync(path.join(root,'RECON/company-copy-sources.json'),JSON.stringify({sources:['https://zhaoxi-ai.com/','http://127.0.0.1:4186/index.html'],mapping:map,notes:'Homepage structure retained. User-approved reviews and application flow diagrams preserved. Original template pricing and numerical claims replaced with source-backed services and governance stages.'},null,2));
require('./sync-cooperation.cjs').syncCooperation().catch(error=>{console.error(error);process.exitCode=1;});
console.log('Published five syntax-checked homepage modules.');
