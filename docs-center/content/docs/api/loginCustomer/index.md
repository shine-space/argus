---
title: "登录"
---

`POST /api/auth/login`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

登录

## 认证与权限

无需 Bearer 访问令牌；按当前登录或刷新合同提交凭据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `email` | `string` | 是 | 企业已开通账号的登录邮箱。 |
| `password` | `string (password)` | 是 | 该账号的密码。只发送给企业自己的平台。 |

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "email": "<按字段约束替换>",
  "password": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  --data @request.json
```

## 返回结果

成功响应类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status` | `boolean` | 是 | 允许值：`[true]` |
| `code` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `message` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `data` | `CustomerTokenResponse` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `access_token` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `refresh_token` | `string` | 否 | 当前会话的刷新令牌。不得进入日志或公开源码。 |
| `role` | `string` | 否 | 按当前业务对象与接口合同提供。 |

### 完整响应结构

以下是 Schema 结构，包含嵌套对象的类型与约束；不是一次真实业务响应。

```json
{
  "allOf": [
    {
      "type": "object",
      "required": [
        "status",
        "message"
      ],
      "properties": {
        "status": {
          "type": "boolean",
          "enum": [
            true
          ]
        },
        "code": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "data": {}
      }
    },
    {
      "type": "object",
      "properties": {
        "data": {
          "type": "object",
          "properties": {
            "access_token": {
              "type": "string"
            },
            "refresh_token": {
              "type": "string"
            },
            "role": {
              "type": "string"
            }
          }
        }
      }
    }
  ]
}
```

## 异常与恢复

按 HTTP 状态、错误码和当前业务状态处理。[错误与异常恢复](/errors/)说明身份、权限、修订和未知结果的处理方式。带幂等键的操作不要因超时更换键后重复提交。

## 相关文档

- [身份认证](/authentication/)
- [任务与流式响应](/tasks-streams/)
- [接口目录](/api/)
- [OpenAPI 合同](/openapi.json)
