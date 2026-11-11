const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const remote='/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/';
const name='-5DwPJsa9pWeM4C-1pOHWNvuXhnxE6_8iwkR9WlXQp8.BkGkNq2i.mjs';
let source=fs.readFileSync(path.join(root,'site',remote,name,'plain.zh'),'utf8');
const quotes=[
['企业知识库','以前查设备资料，要在多个文件夹里反复找。现在直接提问，就能找到相关原文和配图，判断是否适用也更方便。老师傅的经验也有了可以持续整理的地方。','售后服务负责人'],
['财务专员','票据读取、重复记录核对和凭证草稿准备，省去了不少来回操作。我们可以把精力放在异常复核上，原件、草稿和正式记录也分得清楚。','财务主管'],
['商务报表','过去每个月都要重新整理出货和退货台账，现在能按统一口径生成报表。汇总数字可以回到明细，讨论销售变化时，大家终于能围绕同一份数据沟通。','商务运营经理'],
['采购寻源','推荐名单之外，我们更关心为什么推荐、哪些条件不满足。资格、规格和历史依据放在一起比较，筛选供应商时更有条理，最终选择仍由采购团队确认。','采购负责人'],
['平台与现场交付','朝夕团队先和我们一起梳理流程，再围绕实际样本做验证。数字员工和工作台连接起来后，业务人员既能交办任务，也能查看过程、核对结果，落地路径更清晰。','信息化负责人']
];
const old=source.match(/reviews:(\[\{slug:`r1`[\s\S]*?\}\])\},Zr=/);
if(!old)throw Error('Review data missing');
const imgs=[...old[1].matchAll(/img:`([^`]+)`/g)].map(m=>m[1]);
const reviews=quotes.map(([label,quote,role],i)=>({slug:'r'+(i+1),f1:quote.replace(/。$/, ''),f2:'某制造企业 · '+role,f3:String(i+1).padStart(2,'0')+'｜'+label,f4:label,img:'/review-portraits/'+['service','finance','operations','procurement','it'][i]+'.png',n1:String(i+1)}));
source=source.replace(old[1],JSON.stringify(reviews)).replace('C=Dr(`reviews`,Xr.reviews).slice(0,8)','C=Xr.reviews');
source=source.replace('u(`span`,{style:m,children:[M.f3,` · `,M.f4]})','null');
source=source.replaceAll('客户怎么说','来自用户的声音');
source=source.replace('d(`span`,{className:`fcr-co`,style:m,children:M.f4})','null');
source=source.replace(/from"\.\//g,'from"'+remote);
require('acorn').parse(source,{ecmaVersion:'latest',sourceType:'module'});
fs.writeFileSync(path.join(root,'site/reviews-home.mjs'),source);
const file=path.join(root,'site/index.html');
let html=fs.readFileSync(file,'utf8');
html=html.replace(/<script type="importmap">(.*?)<\/script>/,(_,json)=>{const map=JSON.parse(json);map.imports[remote+name]='/reviews-home.mjs?v=4';return '<script type="importmap">'+JSON.stringify(map)+'</script>';});
fs.writeFileSync(file,html);
console.log('Published five review quotes; module syntax valid.');
