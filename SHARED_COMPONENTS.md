# 公共模块维护

官网营销页共用以下源码。`site/process` 的文档站使用独立框架，产品插图和嵌入演示保留各自实现。

| 内容 | 修改位置 |
| --- | --- |
| 导航结构、Logo、菜单内容 | `site/company-copy/navigation.html` |
| 导航外观、下拉菜单、移动菜单 | `site/styles/shared/navigation.css` |
| 导航交互与当前页状态 | `site/company-copy/service-menu-link.js` |
| 页脚列名与链接 | `site/company-copy/footer-content.mjs` |
| 页脚结构 | `site/company-copy/shared/footer.html` |
| 合作区文案 | `site/company-copy/cooperation-content.mjs` |
| 合作区结构 | `site/company-copy/shared/cooperation.html` |
| 按钮、焦点状态、基础颜色映射 | `site/styles/shared/component-base.css` |
| 内容容器、标题及显示动效 | `site/styles/shared/component-layout.css` |
| 字号、行高、颜色与标题角色 | `site/styles/site-typography.css` 及其导入的公共样式 |

修改后执行 `npm run build:shared`，再运行 `npm run test:shared`。`npm run check:shared` 检查生成结果是否同步；原 `node scripts/sync-navigation.cjs` 入口保留并转到同一生成器。

HTML 中保留公共模块的静态快照，首屏无需等待 JavaScript。隐藏导航模板已删除，导航运行时使用可缓存的公共模板模块。页脚静态快照和 React 运行时读取同一份链接数据，合作区同样共用已有文案模块。

基础 CSS 与布局 CSS 是源码；`component-styles.mjs` 是供现有 React 组件使用的生成文件。组件 CSS 在原位置导入公共规则，保留原规则顺序及局部覆盖。遇到不同的样式变体，生成器会保留它，不强行合并。

`site/_remote` 中仍有运行依赖，`originals` 和 `RECON` 中部分文件仍是构建输入。不能仅根据名称旧或没有显式 HTML 链接判断为可删除文件。已有抓取/生成脚本运行后，应再次执行公共模块生成命令。
