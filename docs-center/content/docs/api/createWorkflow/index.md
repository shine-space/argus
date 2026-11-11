---
title: "创建Workflow"
---

`POST /api/v1/workflows/create`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Create a workflow working copy

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `contract_version` | `integer` | 否 | 允许值：`[2]`；默认：`2` |
| `workspace_id` | `string` | 否 | 目标工作区。仍需当前用户具有访问权限。；最长：`100` |
| `name` | `string` | 是 | 最短：`2`；最长：`100` |
| `description` | `string` | 否 | 最长：`500` |
| `inputs` | `JsonObject` | 否 | 该动作输入，按当前已发布能力的 Schema 提供。 |
| `nodes` | `array<JsonObject>` | 否 | 按当前业务对象与接口合同提供。 |
| `edges` | `array<JsonObject>` | 否 | 按当前业务对象与接口合同提供。 |
| `outputs` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `metadata` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `canvas_metadata` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "name": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/workflows/create" \
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
| `data` | `Workflow` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `workflow_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `description` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `edit_revision` | `integer` | 是 | 按当前业务对象与接口合同提供。 |
| `contract_version` | `integer` | 是 | 按当前业务对象与接口合同提供。 |
| `inputs` | `JsonObject` | 否 | 该动作输入，按当前已发布能力的 Schema 提供。 |
| `nodes` | `array<任意 JSON>` | 否 | 按当前业务对象与接口合同提供。 |
| `edges` | `array<任意 JSON>` | 否 | 按当前业务对象与接口合同提供。 |
| `outputs` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `metadata` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `canvas_metadata` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `published_snapshot_id` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `published_version` | `integer` | 否 | 按当前业务对象与接口合同提供。 |
| `has_published_snapshot` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `has_unpublished_changes` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `can_edit` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `can_save` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `can_publish` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `can_run` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `created_by` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `created_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `updated_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |

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
            "id",
            "workflow_id",
            "workspace_id",
            "name",
            "edit_revision",
            "contract_version"
          ],
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            },
            "workflow_id": {
              "type": "string"
            },
            "workspace_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "edit_revision": {
              "type": "integer"
            },
            "contract_version": {
              "type": "integer"
            },
            "inputs": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "nodes": {
              "type": "array",
              "items": {}
            },
            "edges": {
              "type": "array",
              "items": {}
            },
            "outputs": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "metadata": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "canvas_metadata": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "published_snapshot_id": {
              "type": "integer",
              "format": "int64",
              "nullable": true
            },
            "published_version": {
              "type": "integer"
            },
            "has_published_snapshot": {
              "type": "boolean"
            },
            "has_unpublished_changes": {
              "type": "boolean"
            },
            "can_edit": {
              "type": "boolean"
            },
            "can_save": {
              "type": "boolean"
            },
            "can_publish": {
              "type": "boolean"
            },
            "can_run": {
              "type": "boolean"
            },
            "created_by": {
              "type": "integer",
              "format": "int64"
            },
            "created_at": {
              "type": "string",
              "format": "date-time"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time"
            }
          },
          "additionalProperties": true
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
