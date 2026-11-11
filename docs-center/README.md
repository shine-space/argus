# 朝夕智能文档中心

文档保存在 `content/docs`。修改 Markdown 后，在本目录运行：

```powershell
npm ci
npm run build
```

构建成功后，运行 `npm run publish:local` 将静态产物复制到官网预览的 `site/process`。官网导航继续使用 `/process`，现有 4175 预览进程直接读取该目录。

如需从旧版官网文档重新导入，可运行 `node scripts/import-docs.mjs <旧版 dist/docs 目录>`。导入会更新对应 Markdown 和接口目录，请先保留本地对这些文件的编辑。
