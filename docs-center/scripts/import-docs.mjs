import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

if (!process.argv[2]) throw new Error('请传入现有官网 dist/docs 的路径');

const source = resolve(process.argv[2]);
const target = resolve('content/docs');
const manifest = JSON.parse(await readFile(join(source, 'search-index.json'), 'utf8'));
const apiHtml = await readFile(join(source, 'api/index.html'), 'utf8');

const pages = new Map();
for (const entry of await readdir(source, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || entry.name !== 'index.md') continue;
  const folder = entry.parentPath.slice(source.length).replaceAll('\\', '/');
  const raw = await readFile(join(entry.parentPath, entry.name), 'utf8');
  const match = raw.replace(/\r\n/g, '\n').match(/^# ([^\n]+)\n+([\s\S]*)$/);
  if (!match) throw new Error('缺少文档标题：' + folder);
  pages.set('/docs' + folder + '/', { folder, title: match[1], body: match[2] });
}

const groups = [...apiHtml.matchAll(/<h2 id="group-([^"]+)">([^<]+)<small>/g)];
const endpoints = [...apiHtml.matchAll(/href="(\/docs\/api\/[^"]+)" data-api-group="([^"]+)"[^>]*><span[^>]*>([^<]+)<\/span><span><strong>[^<]+<\/strong><code>([^<]+)<\/code>/g)];
if (endpoints.length !== [...pages.keys()].filter(path => path.startsWith('/docs/api/')).length) {
  throw new Error('接口目录与 Markdown 数量不一致');
}

const code = value => String.fromCharCode(96) + value + String.fromCharCode(96);
const api = [
  '查阅朝夕智能平台的接口用途、请求参数、返回结构及调用示例。',
  '调用前请阅读[身份认证与请求约定](/docs/authentication/)，也可下载 [OpenAPI 文件](/docs/openapi.json)。',
  ...groups.flatMap(([, group, title]) => {
    const rows = endpoints.filter(([, , id]) => id === group);
    return [
      '## ' + title.trim() + ' [#group-' + group + ']',
      rows.map(([, path, , method, endpoint]) => {
        const page = pages.get(path);
        if (!page) throw new Error('缺少接口文档：' + path);
        return '- [' + page.title + '](' + path + ') · ' + code(method + ' ' + endpoint);
      }).join('\n'),
    ];
  }),
].join('\n\n');
pages.set('/docs/api/', { folder: '/api', title: '接口参考', body: api });

for (const [path, page] of pages) {
  const body = page.body
    .replace(/\[([^\]]+)\]\(\/cloud\/\)/g, '$1')
    .replace(/\]\((\/docs\/[^)\s#]*)(#[^)\s]+)?\)/g, (_, url, hash = '') => {
      if (url === '/docs/openapi.json') return '](/openapi.json' + hash + ')';
      if (url.startsWith('/docs/api/?group=')) return '](/api/#group-' + url.split('=')[1] + ')';
      if (!pages.has(url)) throw new Error(path + ' 引用了不存在的文档：' + url);
      return '](' + url.slice('/docs'.length) + hash + ')';
    });
  const file = join(target, page.folder.slice(1), 'index.md');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, '---\ntitle: ' + JSON.stringify(page.title) + '\n---\n\n' + body);
}

const sidebar = ['index'];
const used = new Set();
for (const entry of manifest) {
  const path = entry.path;
  if (path === '/docs/' || path.startsWith('/docs/api/') || !pages.has(path)) continue;
  if (!used.has(entry.group)) {
    sidebar.push('---' + entry.group + '---');
    used.add(entry.group);
  }
  sidebar.push(path.slice(6, -1));
}
sidebar.push('---开发参考---', 'api');
await writeFile(join(target, 'meta.json'), JSON.stringify({ pages: sidebar }, null, 2) + '\n');
await writeFile(join(target, 'api/meta.json'), JSON.stringify({ title: '接口参考', pages: ['index', '...'] }, null, 2) + '\n');
await mkdir('public', { recursive: true });
await copyFile(join(source, 'openapi.json'), 'public/openapi.json');
console.log('已导入 ' + pages.size + ' 页文档');
