import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { defineTranslations } from 'fumadocs-core/i18n';
import { i18nProvider, uiTranslations } from 'fumadocs-ui/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { FullSearchTrigger } from 'fumadocs-ui/layouts/shared/slots/search-trigger';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { source } from '../lib/source';
import { groupSidebar } from '../lib/sidebar-tree';
import { DocsBrandLink } from './docs-brand-link';
import { DocsSidebarFooter } from './docs-sidebar-footer';
import { DocsOverlayScrollbar } from './docs-overlay-scrollbar';
import './styles.css';

const translations = defineTranslations().extend(uiTranslations()).add({
  "Search(search trigger)": "搜索文档",
  "Open Search(search trigger)(aria-label)": "打开搜索",
  "Search(search dialog)": "输入关键词搜索",
  "No results found(search dialog)": "没有找到相关文档",
  "Search failed(search dialog)": "搜索失败",
  "Close Search(search dialog)(aria-label)": "关闭搜索",
  "On this page(table of contents)": "本页目录",
  "No Headings(table of contents)": "暂无小节",
  "Next Page(pagination)": "下一篇",
  "Previous Page(pagination)": "上一篇",
  "Skip to Content(skip link)": "跳到正文",
  "Open Sidebar(sidebar)(aria-label)": "打开目录",
  "Close Sidebar(sidebar)(aria-label)": "关闭目录",
  "Close Sidebar(aria-label)": "关闭目录",
  "Collapse Sidebar(sidebar)(aria-label)": "收起目录",
  "Toggle Menu(mobile menu)(aria-label)": "切换导航",
  "Toggle Theme(theme switcher)(aria-label)": "切换主题",
  "Light(theme switcher)(aria-label)": "浅色",
  "Dark(theme switcher)(aria-label)": "深色",
  "System(theme switcher)(aria-label)": "跟随系统",
  "Copy Text(code block)(aria-label)": "复制代码",
  "Copied Text(code block)(aria-label)": "已复制",
  "Copy Anchor Link(heading anchor)(aria-label)": "复制小节链接",
  "Copied Anchor Link(heading anchor)(aria-label)": "已复制小节链接"
});

export const metadata: Metadata = {
  title: { default: '文档中心 - 朝夕智能', template: '%s - 朝夕智能' },
  icons: { icon: { url: '/office-conversation/assets/logo-mark.svg', type: 'image/svg+xml' } },
  description: '朝夕智能平台的使用指南、本地部署、开发集成与接口参考。',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-overlayscrollbars-initialize="">
      <head><link rel="stylesheet" href="/vendor/overlayscrollbars-2.17.0.css" /></head>
      <body className="flex min-h-screen flex-col" data-overlayscrollbars-initialize="">
        <DocsOverlayScrollbar />
        <RootProvider
          i18n={i18nProvider(translations)}
          search={{ options: { type: 'static', api: '/process/search-index.json' } }}
        >
          <DocsLayout
            tree={groupSidebar(source.getPageTree())}
            slots={{ navTitle: DocsBrandLink }}
            themeSwitch={{ enabled: false }}
            sidebar={{
              defaultOpenLevel: 0,
              collapsible: true,
              banner: <FullSearchTrigger className="w-full rounded-[10px]" />,
              footer: DocsSidebarFooter,
            }}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
