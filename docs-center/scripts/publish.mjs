import { access, copyFile, cp, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const output = fileURLToPath(new URL('../out/', import.meta.url));
const destination = fileURLToPath(new URL('../../site/process/', import.meta.url));
const entry = join(output, 'index.html');

await Promise.all(['index.html', 'search-index.json', 'quickstart/index.html'].map(
  file => access(join(output, file)),
));

await cp(output, destination, {
  recursive: true,
  filter: file => file !== entry,
});

// On Windows Next can export nested segment files while the browser requests
// the corresponding dot-separated URL.
for (const file of await readdir(output, { recursive: true, withFileTypes: true })) {
  if (!file.isFile() || !file.name.endsWith('.txt')) continue;
  const parents = relative(output, file.parentPath).split(sep);
  const start = parents.findIndex(part => part.startsWith('__next.'));
  if (start < 0) continue;
  const flatName = [...parents.slice(start), file.name].join('.');
  await copyFile(join(file.parentPath, file.name), join(destination, ...parents.slice(0, start), flatName));
}

await copyFile(entry, join(destination, 'index.html'));
execFileSync(process.execPath, [fileURLToPath(new URL('../../scripts/precompress.cjs', import.meta.url))], { stdio: 'inherit' });
console.log('文档中心已更新：/process');
