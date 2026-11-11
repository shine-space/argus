'use client';

import Script from 'next/script';

export function DocsOverlayScrollbar() {
  return <Script src="/overlay-scrollbars.js?v=2" type="module" strategy="afterInteractive" />;
}
