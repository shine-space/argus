---
title: "安装与初始化"
---

核验商业软件运行包，安装镜像并验证平台基础功能。

## 取得交付包

从约定渠道取得运行包、版本清单、镜像、配置模板、运维脚本和说明。前端开发包单独交付。不要把内部开发 Compose、临时镜像或本机开发配置当客户安装包使用。

## 校验交付内容

根据交付清单核验包签名、文件摘要及镜像身份。签名公钥或其指纹需要通过约定可信渠道取得。实际包中的参数与说明优先于下面的路径示例。

```powershell
pwsh -File ./scripts/verify-customer-delivery-package.ps1 `
  -PackageRoot ./delivery `
  -TrustedPublicKeyPath ./trusted-delivery-public.pem
```

## 准备配置

使用配置模板建立该环境专用配置，填写数据库、密钥、模型和服务连接。私密配置单独保管，不放进前端源码、浏览器构建变量或工单正文。首次管理员按交付包中的初始化说明建立。

## 检查安装计划

现有运行包提供 PowerShell 7 的计划检查入口。路径、环境文件和组件以实际交付包为准；首次操作建议由实施与运维人员共同完成。

```powershell
pwsh -File ./delivery/scripts/apply-customer-delivery-package.ps1 `
  -PackageRoot ./delivery `
  -DeploymentRoot ./platform `
  -EnvFile ./.env.customer `
  -TrustedPublicKeyPath ./trusted-delivery-public.pem `
  -PlanOnly
```

确认计划、配置、维护窗口与备份条件后，按交付说明执行正式安装。迁移、启动、就绪检查及异常恢复使用同一版本配套的脚本。

## 初始化验收

验证登录、成员权限、应用可见性、模型连接、文件读写及开通模块。知识接入检查解析和检索；执行能力检查实际任务和结果回查。容器存活或健康端点返回成功，不能单独代表业务验收完成。
