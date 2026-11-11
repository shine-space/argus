---
title: "身份认证与请求约定"
---

使用客户实例的登录与令牌，明确请求地址、返回结构和权限。

## 请求地址

将 `BASE_URL` 设置为客户平台地址，不包含末尾斜杠。例如 `https://ai.example.com` 是占位地址，需要替换为企业实际域名。接口路径按参考页完整拼接，不重复添加 `/api/v1`。

## 登录与令牌

现有登录入口为 `POST /api/auth/login`，请求包含 `email`、`password`。成功响应的 `data` 中返回 `access_token`、`refresh_token`、`role`。账号由企业按其开户流程提供；不要假设任意环境允许自助注册。

受保护请求携带：

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

`POST /api/auth/refresh` 接收 `refresh_token`。刷新成功后使用响应中当前有效的令牌。`POST /api/auth/logout` 使用访问令牌退出当前会话。

这是现有用户身份的令牌合同，不是全员共用的应用管理员 Key。SSO、服务身份和自动化接入按交付版本另行配置；不伪造用户 ID 代替认证。

## JSON 响应

成功响应包含 `status: true`、`message` 和业务 `data`。错误通常包含 `status: false`、`code` 和 `message`。HTTP 状态和业务结果一起检查；`code` 在部分成功响应中可以省略。

```json
{"status": true, "message": "success", "data": {}}
```

以上仅说明通用外层结构，`data` 按各接口返回定义解释。流式响应和二进制文件下载不使用该 JSON 外层结构。

## 工作区与业务权限

传入 `workspace_id` 或绑定标识只是在选择目标范围，服务端仍检查身份、成员与资源权限。权限不足时停止本次操作，不能切换到一个全局管理员凭据继续执行。
