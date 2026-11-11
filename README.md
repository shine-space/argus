# 朝夕智能官网

朝夕智能官网的本地源码与运行资源，包含首页、产品能力、解决方案、交付服务、关于我们、业务合作和文档中心

## 本地预览

需要 Python 3.11 或更新版本

Windows 双击 `start.cmd`，或运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\Start-Clone.ps1
```

访问 http://127.0.0.1:4175/

也可以直接运行：

```powershell
$env:CLONE_OFFLINE = '1'
$env:HOST = '127.0.0.1'
$env:PORT = '4175'
python scripts/serve.py
```

预览服务器使用 Python 标准库，默认启动脚本开启离线模式，页面所需资源已保存在 `site/` 中

## 目录

- `site/`：官网页面、样式、交互、图片、视频及离线资源
- `site/company-copy/`：官网组件与中文内容
- `site/particle-shapes/`、`site/opening-loader.js`：首页粒子标志和入场动画
- `site/process/`：文档中心的静态发布文件
- `docs-center/`：基于 Next.js、Fumadocs 和 MDX 的文档中心源码
- `scripts/`：本地服务器及资源、内容与组件维护脚本

`site/_remote/` 是官网运行所需的本地资源，包含资源内容及其 MIME 类型元数据，需要一起保留

## 文档中心

在 `docs-center/` 中安装锁定的依赖后构建，再将结果发布到本地官网：

```powershell
cd docs-center
npm ci
npm run build
npm run publish:local
```

文档内容位于 `docs-center/content/`，构建产物发布到 `site/process/`

## 维护说明

直接运行官网预览不需要 Node.js 构建；文档中心构建和部分维护脚本需要 Node.js

根目录的开发依赖由 `package.json` 和 `pnpm-lock.yaml` 管理。`scripts/` 中保留了不同阶段的导入和生成工具，运行前应确认其输入文件与当前页面对应

本仓库只包含官网，不包含 Argus 产品服务端、管理端或用户端工程。依赖目录、运行缓存、日志、原始抓取快照及本地预览截图不纳入版本管理
