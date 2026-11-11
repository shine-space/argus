---
title: "读取运行环境"
---

`POST /api/v1/environments/detail`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Read an owned environment

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `environment_id` | `string` | 是 | 最短：`1`；最长：`48` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "environment_id": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/environments/detail" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
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
| `data` | `Environment` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `environment_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `created_by` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `current_version` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `revision` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `enabled` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `created_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |
| `updated_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |

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
          "required": [
            "environment_id",
            "workspace_id",
            "name",
            "created_by",
            "current_version",
            "revision",
            "enabled",
            "created_at",
            "updated_at"
          ],
          "properties": {
            "environment_id": {
              "type": "string"
            },
            "workspace_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "created_by": {
              "type": "integer",
              "format": "int64"
            },
            "current_version": {
              "type": "integer",
              "format": "int64"
            },
            "revision": {
              "type": "integer",
              "format": "int64"
            },
            "enabled": {
              "type": "boolean"
            },
            "created_at": {
              "type": "string",
              "format": "date-time"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time"
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
