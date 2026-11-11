---
title: "列出应用记忆"
---

`POST /api/v1/applications/memories/list`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

List current scene memories within an authorized application binding

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `participation_binding_id` | `string` | 是 | 当前应用参与绑定，由授权列表或详情返回。 |
| `scene` | `string` | 是 | 允许值：`["employee", "project", "direct"]` |
| `origin` | `string` | 否 | Optional source selector; never an authorization grant.；允许值：`["manual", "automatic"]` |
| `memory_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `before` | `integer (int64)` | 否 | 最小：`0` |
| `limit` | `integer` | 否 | 本次读取数量，范围见字段约束。；最小：`0`；最大：`100` |
| `active_only` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `view` | `string` | 否 | List projection; omit for detail. Timeline includes changes to currently accessible non-deleted memories.；允许值：`["items", "timeline"]` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "participation_binding_id": "<participation_binding_id>",
  "scene": "employee"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/memories/list" \
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
| `data` | `ApplicationMemoryPage` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `items` | `array<ApplicationMemory>` | 是 | 按当前业务对象与接口合同提供。 |
| `can_edit` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `next_cursor` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `changes` | `array<object>` | 否 | 按当前业务对象与接口合同提供。 |

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
            "items",
            "can_edit"
          ],
          "properties": {
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ApplicationMemory"
              }
            },
            "can_edit": {
              "type": "boolean"
            },
            "next_cursor": {
              "type": "integer",
              "format": "int64"
            },
            "changes": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "memory_id",
                  "version"
                ],
                "properties": {
                  "memory_id": {
                    "type": "string"
                  },
                  "origin": {
                    "type": "string",
                    "enum": [
                      "automatic"
                    ]
                  },
                  "version": {
                    "$ref": "#/components/schemas/ApplicationMemoryVersion"
                  }
                }
              }
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
