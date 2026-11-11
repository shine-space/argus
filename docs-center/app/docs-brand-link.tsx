'use client';

import type { ComponentProps } from 'react';

export function DocsBrandLink(props: ComponentProps<'a'>) {
  return (
    <a {...props} href="/" aria-label="朝夕智能官网首页">
      <span className="docs-brand">
        <img className="docs-logo dark:hidden" src="/brand/logo_l.svg" alt="" />
        <img className="docs-logo hidden dark:block" src="/brand/logo_w.svg" alt="" />
        <span className="docs-brand-label">文档中心</span>
      </span>
    </a>
  );
}

