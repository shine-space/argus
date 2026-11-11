import type { Metadata } from 'next';
import type { AnchorHTMLAttributes } from 'react';
import { notFound } from 'next/navigation';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/notebook/page';
import { Card, Cards } from 'fumadocs-ui/components/card';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { source } from '../../lib/source';

const components = {
  ...defaultMdxComponents,
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (props.href === '/openapi.json') {
      return <a {...props} href="/process/openapi.json" download />;
    }
    return <defaultMdxComponents.a {...props} />;
  },
};

type Props = { params: Promise<{ slug?: string[] }> };

export default async function Page({ params }: Props) {
  const page = source.getPage((await params).slug);
  if (!page) notFound();

  const { body: Content, toc, title, description } = page.data;
  return (
    <DocsPage toc={toc}>
      <DocsTitle>{title}</DocsTitle>
      {description && <DocsDescription>{description}</DocsDescription>}
      <DocsBody>
        {page.slugs.length === 0 && (
          <Cards>
            <Card title="快速开始" href="/quickstart/" description="登录平台，选择应用，完成第一次任务。" />
            <Card title="本地部署" href="/deployment/" description="安装、初始化、升级和备份。" />
            <Card title="开发集成" href="/development/" description="认证、调用示例及系统扩展。" />
            <Card title="接口参考" href="/api/" description="按业务领域查找接口、参数和返回示例。" />
          </Cards>
        )}
        <Content components={components} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = source.getPage((await params).slug);
  if (!page) notFound();
  return { title: page.data.title, description: page.data.description };
}
