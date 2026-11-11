import { createMDX } from 'fumadocs-mdx/next';

export default createMDX()({
  turbopack: { root: import.meta.dirname },
  basePath: '/process',
  output: 'export',
  trailingSlash: true,
});
