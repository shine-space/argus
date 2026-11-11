---
title: "验证应用草稿"
---

`POST /api/v1/applications/draft/validate`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Validate exact draft and authorized immutable dependencies

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `application_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `draft_revision` | `integer (int64)` | 是 | 最小：`1` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "application_id": "<按字段约束替换>",
  "draft_revision": 1
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/draft/validate" \
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
| `data` | `ApplicationValidation` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `validation_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `application_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `draft_revision` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `draft_digest` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `dependencies` | `array<ApplicationDependency>` | 是 | 按当前业务对象与接口合同提供。 |
| `checks` | `array<object>` | 是 | 按当前业务对象与接口合同提供。 |
| `publishable` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `created_by` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `created_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |

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
            "validation_id",
            "workspace_id",
            "application_id",
            "draft_revision",
            "draft_digest",
            "dependencies",
            "checks",
            "publishable",
            "created_by",
            "created_at"
          ],
          "properties": {
            "validation_id": {
              "type": "string"
            },
            "workspace_id": {
              "type": "string"
            },
            "application_id": {
              "type": "string"
            },
            "draft_revision": {
              "type": "integer",
              "format": "int64"
            },
            "draft_digest": {
              "type": "string"
            },
            "dependencies": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ApplicationDependency"
              }
            },
            "checks": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "code",
                  "path"
                ],
                "properties": {
                  "code": {
                    "type": "string"
                  },
                  "path": {
                    "type": "string"
                  },
                  "message": {
                    "type": "string",
                    "description": "Optional safe field validation detail"
                  }
                }
              }
            },
            "publishable": {
              "type": "boolean"
            },
            "created_by": {
              "type": "integer",
              "format": "int64"
            },
            "created_at": {
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
