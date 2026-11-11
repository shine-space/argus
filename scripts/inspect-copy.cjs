const fs=require('fs'),acorn=require('acorn');
const base='site/_remote/framerusercontent.com/sites/2xG5N1t69lPfya3rt87ktW/';
for(const name of ['-5DwPJsa9pWeM4C-1pOHWNvuXhnxE6_8iwkR9WlXQp8.BkGkNq2i.mjs','FcLogos.C56jAPIg.mjs','FcProcess.DD6BEyf_.mjs','FcPricing.BHcVFo1n.mjs']){
const s=fs.readFileSync(base+name+'/plain.zh','utf8'); const a=acorn.parse(s,{ecmaVersion:'latest',sourceType:'module'});const vals=[];
function walk(n){if(!n||typeof n!=='object')return;let v=n.type==='Literal'?n.value:n.type==='TemplateLiteral'&&n.expressions.length===0?n.quasis[0].value.cooked:null;if(typeof v==='string'&&v.length>1&&v.length<500&&!/^https?:|^\.|^\/|^data:/.test(v)&&!v.includes('{'))vals.push(v);for(const [k,v]of Object.entries(n)){if(k==='quasis')continue;if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object')walk(v)}}walk(a);fs.writeFileSync('RECON/copy-'+name+'.json',JSON.stringify([...new Set(vals)],null,2));console.log(name,vals.length);
}
