// Build the supplied React Bits component as a viewport-loaded local module.
const path = require('node:path');
const esbuild = require('esbuild');

esbuild.buildSync({
  absWorkingDir: path.resolve(__dirname, '..'),
  entryPoints: ['site/veylo-process/lanyard/entry.jsx'],
  outfile: 'site/veylo-process/lanyard/runtime.mjs',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2022'],
  jsx: 'automatic',
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'linked',
  metafile: true,
});
