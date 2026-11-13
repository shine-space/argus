/* Publish only the dependency closure used by the retained process cards. */
const fs = require('node:fs');
const path = require('node:path');
const acorn = require('acorn');
const scope = require('eslint-scope');
const esbuild = require('esbuild');
const postcss = require('postcss');
const selectors = require('postcss-selector-parser');

const root = path.resolve(__dirname, '..');
const site = path.join(root, 'site/veylo-process');
const archive = path.join(root, 'RECON/veylo/vendor-source');
const source = fs.existsSync(archive) ? archive : path.join(site, 'source');
const out = path.join(root, '.cache/agent-process-build');
const read = name => fs.readFileSync(name, 'utf8');
const home = path.join(source, '0O6VumrboDTM1tqk40v8vPe5apJbb91SK78aKIWQ7RY.DWoJvw08.mjs');

function componentSource() {
  const text = read(home);
  const ast = acorn.parse(text, {ecmaVersion:'latest', sourceType:'module', ranges:true});
  const manager = scope.analyze(ast, {ecmaVersion:2024, sourceType:'module', optimistic:true});
  const bindings = manager.scopes.find(s => s.type === 'module').variables;
  // Rolldown can merge unrelated lazy factories into a single `var` statement.
  // Treat each declarator separately so unused components do not become roots.
  const statements = ast.body.flatMap(statement => statement.type === 'VariableDeclaration'
    ? statement.declarations.map(declaration => ({...declaration,kind:statement.kind}))
    : [statement]);
  const owner = position => statements.findIndex(s => s.start <= position && position < s.end);
  const owners = new Map(bindings.filter(v => v.identifiers.length).map(v => [v.name, owner(v.identifiers[0].start)]));
  const graph = statements.map(() => new Set());
  for (const binding of bindings) {
    const dependency = owners.get(binding.name);
    if (dependency === undefined) continue;
    for (const reference of binding.references) {
      const parent = owner(reference.identifier.start);
      if (parent >= 0 && parent !== dependency) graph[parent].add(dependency);
    }
  }
  const included = new Set();
  function include(index) {
    if (index === undefined || index < 0) throw Error('Missing component dependency');
    if (included.has(index)) return;
    included.add(index);
    graph[index].forEach(include);
  }
  const initializers = [];
  for (const name of ['Gd']) {
    const index = owners.get(name);
    include(index);
    const writes=bindings.find(binding=>binding.name===name).references.filter(reference=>reference.isWrite());
    const factories = statements.filter(d => d.type === 'VariableDeclarator'
      && d.init?.type === 'CallExpression' && d.init.callee.name === 'e'
      && writes.some(reference=>d.init.start<=reference.identifier.start&&reference.identifier.start<d.init.end));
    if (factories.length !== 1) throw Error(`Unexpected initialization shape for ${name}`);
    initializers.push(factories[0].id.name);
    include(statements.indexOf(factories[0]));
  }
  return [...included].sort((a,b) => a-b).map(i => {
    const statement=statements[i],code=text.slice(statement.start,statement.end);
    return statement.type==='VariableDeclarator'?statement.kind+' '+code+';':code;
  }).join('\n')
    + '\n' + initializers.map(name => name+'();').join('\n')
    + '\nexport {Gd as VeyloOrganize};\n'
    + 'export {n as initDOM,r as createRoot,c as jsx} from "./react.CHKtYt_3.mjs";\n';
}

function replaceElementInner(html, className, content) {
  const marker = `class="${className}"`;
  const found = html.indexOf(marker);
  if (found < 0) throw Error('Missing illustration slot '+className);
  const start = html.lastIndexOf('<div', found);
  const tags = /<\/?div\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/g;
  tags.lastIndex = start;
  let depth = 0, innerStart;
  for (let token; (token = tags.exec(html));) {
    if (innerStart === undefined) innerStart = tags.lastIndex;
    depth += token[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(0,innerStart)+content+html.slice(token.index);
  }
  throw Error('Unbalanced illustration slot');
}

function cleanFragment(html) {
  for (const slot of ['framer-nz4g09','framer-1n57i0g']) html=replaceElementInner(html,slot,'');
  html=html.replace(/<ul\b[^>]*>[\s\S]*?<\/ul>/g,'');
  html=html.replace(/<[^>]+data-veylo-reveal[^>]*>/g, tag => tag
    .replace(/\sdata-veylo-reveal=""/,'')
    .replace(/\sstyle="([^"]*)"/,(_,style) => {
      const kept=style.split(';').filter(d => !/^\s*(will-change|opacity|transform|visibility)\s*:/.test(d)).filter(Boolean);
      return kept.length ? ` style="${kept.join(';')}"` : '';
    }));
  return html;
}

function pruneStyles(css, html, bundle) {
  const known = new Set(['rich-text-wrapper','ssr-variant']);
  for (const match of html.matchAll(/\bclass="([^"]+)"/g)) match[1].split(/\s+/).forEach(c => known.add(c));
  for (const match of (bundle+'\n'+read(path.join(site,'mount.mjs'))).matchAll(/\b(?:framer-|employee-|resume-|process-demo-|site-type-|is-)[\w-]+/g)) known.add(match[0]);
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const tree=postcss.parse(css);
  tree.walkAtRules('font-face', rule => rule.remove());
  tree.walkRules(rule => {
    if (rule.parent.type==='atrule' && /keyframes$/.test(rule.parent.name)) return;
    const parsed=selectors().astSync(rule.selector);
    parsed.nodes=parsed.nodes.filter(selector => {
      let keep=true;
      selector.walkClasses(node => {
        let parent=node.parent, negative=false;
        while(parent){if(parent.type==='pseudo' && parent.value===':not')negative=true;parent=parent.parent;}
        if(!negative&&!known.has(node.value))keep=false;
      });
      selector.walkIds(node => {if(!ids.has(node.value))keep=false;});
      selector.walkTags(node => {if(['html','body'].includes(node.value))keep=false;});
      return keep;
    });
    if(!parsed.nodes.length)rule.remove();else rule.selector=parsed.toString();
  });
  // Earlier iterations added repeated rules. Remove only declarations superseded
  // by the same property and selector within the same cascade scope.
  function deduplicate(container) {
    const declarations=new Map();
    for(const rule of container.nodes||[]) {
      if(rule.type==='atrule'){deduplicate(rule);continue;}
      if(rule.type!=='rule')continue;
      for(const decl of [...rule.nodes]) {
        if(decl.type!=='decl')continue;
        const key=rule.selector+'\0'+decl.prop;
        const earlier=declarations.get(key);
        if(earlier&&(!earlier.important||decl.important))earlier.remove();
        if(!earlier||!earlier.important||decl.important)declarations.set(key,decl);
      }
    }
  }
  deduplicate(tree);
  tree.walkComments(comment=>comment.remove());
  tree.walkRules(rule=>{if(!rule.nodes.length)rule.remove();});
  tree.walkAtRules(rule=>{if(rule.nodes&&!rule.nodes.length)rule.remove();});
  return esbuild.transformSync(tree.toString(),{loader:'css',minify:true,target:'chrome120'}).code;
}

function deduplicateStyleLinks(html) {
  const tags=/<\/?([a-z][\w-]*)\b(?:[^"'<>]|"[^"]*"|'[^']*')*>/gi;
  const scopes=[0],seen=new Set(),removed=[];
  let scopeId=0;
  for(let token;(token=tags.exec(html));){
    const tag=token[1].toLowerCase(),closing=token[0].startsWith('</');
    if(tag==='template'){
      if(closing)scopes.pop();else scopes.push(++scopeId);
    }
    if(!closing&&['script','style','textarea'].includes(tag)){
      const end=html.toLowerCase().indexOf('</'+tag,tags.lastIndex);
      if(end>=0)tags.lastIndex=html.indexOf('>',end)+1;
    }
    if(tag!=='link'||closing)continue;
    const attrs=Object.fromEntries([...token[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],m[2].replaceAll('&amp;','&')]));
    if(attrs.rel!=='stylesheet')continue;
    const key=scopes.at(-1)+'\0'+attrs.href;
    if(seen.has(key))removed.push([token.index,tags.lastIndex]);else seen.add(key);
  }
  for(const [start,end] of removed.reverse())html=html.slice(0,start)+html.slice(end);
  return {html,removed:removed.length};
}

function publish(result,html,css,report) {
  const generatedRoot=path.resolve(site,'runtime');
  const currentFiles=new Set();
  for(const file of Object.keys(result.metafile.outputs)){
    const relative=path.relative(path.join(out,'runtime'),path.resolve(root,file));
    if(relative.startsWith('..'))throw Error('Unexpected bundle output path');
    const target=path.join(site,'runtime',relative);
    currentFiles.add(path.resolve(target));
    fs.mkdirSync(path.dirname(target),{recursive:true});
    fs.copyFileSync(path.resolve(root,file),target);
  }
  function removeObsoleteChunks(directory){
    for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
      const file=path.resolve(directory,entry.name);
      if(!file.startsWith(generatedRoot+path.sep))throw Error('Bundle path escaped runtime directory');
      if(entry.isDirectory())removeObsoleteChunks(file);
      else if(entry.isFile()&&file.endsWith('.js')&&!currentFiles.has(file))fs.unlinkSync(file);
    }
  }
  removeObsoleteChunks(generatedRoot);
  const snapshot='<veylo-process id="veylo-process"></veylo-process>';
  const page=path.join(root,'site/product/agent/index.html');
  let document=read(page);
  report.pageBefore=Buffer.byteLength(document);
  const start=document.indexOf('<veylo-process '),end=document.indexOf('</veylo-process>',start);
  if(start<0||end<0||document.indexOf('<veylo-process ',start+1)>=0)throw Error('Unexpected process host count');
  document=document.slice(0,start)+snapshot+document.slice(end+'</veylo-process>'.length);
  if(!document.includes('id="ondrel-plan"'))document=document.replace(/<script\b[^>]*src="\/ondrel-new30\/mount\.js[^\"]*"[^>]*><\/script>/g,'');
  document=document.replace(/<link\b[^>]*href="\/veylo-process\/fonts\.css[^\"]*"[^>]*>/g,'');
  document=document.replace(/\/veylo-process\/mount\.mjs\?v=[^"']+/g,'/veylo-process/mount.mjs?v=section-headings-20261113');
  document=document.replace(/\/company-copy\/site-typography\.js(?:\?[^"'<> ]*)?/g,'/company-copy/site-typography.js?v=section-headings-1').replace(/\/styles\/site-typography\.css(?:\?[^"'<> ]*)?/g,'/styles/site-typography.css?v=section-headings-1');
  const deduplicated=deduplicateStyleLinks(document);
  report.duplicateStyleLinksRemoved=deduplicated.removed;
  report.pageAfter=Buffer.byteLength(deduplicated.html);
  fs.writeFileSync(page,deduplicated.html);
  fs.writeFileSync(path.join(site,'process.css'),css);
  fs.writeFileSync(path.join(site,'process.html'),html);
  fs.writeFileSync(path.join(site,'snapshot.html'),snapshot);
  fs.writeFileSync(path.join(site,'preview.html'),'<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Product process preview</title><link rel="stylesheet" href="/styles/site-typography.css?v=section-headings-1"><style>body{margin:0;background:#f1f0eb}</style></head><body class="site-marketing">'+snapshot+'<script type="module" src="/veylo-process/mount.mjs?v=section-headings-20261113"></script></body></html>');
}

(async()=>{
  fs.mkdirSync(out,{recursive:true});
  const selected=componentSource();
  fs.writeFileSync(path.join(out,'selected-components.mjs'),selected);
  const fontCatalogs=[];
  const localFontCatalog={name:'local-font-catalog',setup(build){
    build.onLoad({filter:/(?:google-|fontshare-|framer-font-).*\.mjs$/},args=>{
      const original=read(args.path);
      const ast=acorn.parse(original,{ecmaVersion:'latest',sourceType:'module'});
      let catalog;
      function visit(node){
        if(!node||typeof node!=='object')return;
        if(node.type==='ObjectExpression'&&node.properties.some(p=>/^(GF|FS|FR);/.test(p.key?.value||'')))catalog=node;
        for(const value of Object.values(node)){
          if(Array.isArray(value))value.forEach(visit);
          else if(value&&typeof value==='object')visit(value);
        }
      }
      visit(ast);
      if(!catalog)return;
      const kept=catalog.properties.filter(p=>/^(GF|FS|FR);(?:VeyloGeist|Geist|Inter)(?:$|[ -])/.test(p.key?.value||''));
      fontCatalogs.push({file:path.basename(args.path),before:catalog.properties.length,after:kept.length});
      return {contents:original.slice(0,catalog.start)+'{'+kept.map(p=>original.slice(p.start,p.end)).join(',')+'}'+original.slice(catalog.end),loader:'js',resolveDir:path.dirname(args.path)};
    });
  }};
  const result=await esbuild.build({
    stdin:{contents:selected,resolveDir:source,sourcefile:'selected-components.mjs',loader:'js'},
    outdir:path.join(out,'runtime'),entryNames:'illustrations',chunkNames:'chunks/[name]-[hash]',
    bundle:true,splitting:true,format:'esm',platform:'browser',target:'chrome120',minify:true,
    treeShaking:true,metafile:true,legalComments:'eof',charset:'utf8',write:true,plugins:[localFontCatalog],
  });
  const bundle=read(path.join(out,'runtime/illustrations.js'));
  const html=cleanFragment(read(path.join(site,'process.html')));
  const css=pruneStyles(read(path.join(site,'process.css')),html,bundle);
  fs.writeFileSync(path.join(out,'process.html'),html);
  fs.writeFileSync(path.join(out,'process.css'),css);
  fs.writeFileSync(path.join(out,'metafile.json'),JSON.stringify(result.metafile,null,2));
  const report={
    originalComponentBytes:fs.statSync(home).size,selectedComponentBytes:Buffer.byteLength(selected),
    entryBytes:Buffer.byteLength(bundle),cssBefore:fs.statSync(path.join(site,'process.css')).size,cssAfter:Buffer.byteLength(css),
    fragmentBefore:fs.statSync(path.join(site,'process.html')).size,fragmentAfter:Buffer.byteLength(html),
    fontCatalogs,
    outputs:Object.fromEntries(Object.entries(result.metafile.outputs).map(([file,value])=>[file,value.bytes])),
  };
  if(process.argv.includes('--publish'))publish(result,html,css,report);
  fs.writeFileSync(path.join(out,'report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
})().catch(error=>{console.error(error);process.exitCode=1;});
