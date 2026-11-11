'use client';

import { ThemeSwitch } from 'fumadocs-ui/layouts/shared/slots/theme-switch';

export function DocsSidebarFooter() {
  return (
    <div className="flex shrink-0 items-center border-t px-4 py-3">
      <ThemeSwitch />
    </div>
  );
}

