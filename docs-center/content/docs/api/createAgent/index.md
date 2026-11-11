---
title: "创建Agent"
---

`POST /api/v1/agents/create`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Create an agent

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `web_search_enabled` | `boolean` | 否 | Allow the Agent to search and read public web pages. Defaults to false on create; omission preserves the current value on update. |
| `workspace_id` | `string` | 否 | 目标工作区。仍需当前用户具有访问权限。；最长：`100` |
| `name` | `string` | 是 | 最短：`2`；最长：`100` |
| `description` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `system_prompt` | `string` | 是 | 最短：`1` |
| `knowledge_base_ids` | `array<string>` | 否 | 按当前业务对象与接口合同提供。 |
| `llm_config_id` | `integer (int64)` | 是 | 最小：`1` |
| `model_overrides` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `structured_output` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `attachment_enhancement` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `presentation_config` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `plugin_config` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `dataset_bindings` | `array<JsonObject>` | 否 | 最多项：`16` |
| `workflow_bindings` | `array<AgentWorkflowBindingWriteRequest>` | 否 | Desired complete set of Workflow bindings. On update, omission or null keeps the current set; an empty array appends disabled versions for enabled bindings. A semantic change appends an immutable version. Binding identity, version and side effect are assigned by Go. The fixed published snapshot is checked again on save and publish; waiting or unknown capabilities are rejected. This field is independent of plugin_config.enabled. Read back the server result after saving. |

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "name": "<按字段约束替换>",
  "system_prompt": "<按字段约束替换>",
  "llm_config_id": 1
}
```

```bash
curl --request POST "$BASE_URL/api/v1/agents/create" \
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
| `data` | `Agent` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `web_search_enabled` | `boolean` | 否 | 默认：`false` |
| `id` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `description` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `system_prompt` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `knowledge_base_ids` | `array<string>` | 否 | 按当前业务对象与接口合同提供。 |
| `llm_config_id` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `model_overrides` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `structured_output` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `attachment_enhancement` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `status` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `config_revision` | `integer` | 是 | 按当前业务对象与接口合同提供。 |
| `presentation_config` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `plugin_config` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `dataset_bindings` | `array<JsonObject>` | 否 | 按当前业务对象与接口合同提供。 |
| `workflow_bindings` | `array<AgentWorkflowBindingResponse>` | 是 | Latest immutable version of each binding, including disabled entries; empty when no binding exists. |
| `current_release_id` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `published_version` | `integer` | 否 | 按当前业务对象与接口合同提供。 |
| `has_published_release` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `has_unpublished_changes` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
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
            "workspace_id",
            "name",
            "status",
            "config_revision",
            "workflow_bindings"
          ],
          "properties": {
            "web_search_enabled": {
              "type": "boolean",
              "default": false
            },
            "id": {
              "type": "integer",
              "format": "int64"
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
            "system_prompt": {
              "type": "string"
            },
            "knowledge_base_ids": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "llm_config_id": {
              "type": "integer",
              "format": "int64"
            },
            "model_overrides": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "structured_output": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "attachment_enhancement": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "status": {
              "type": "string"
            },
            "config_revision": {
              "type": "integer"
            },
            "presentation_config": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "plugin_config": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "dataset_bindings": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/JsonObject"
              }
            },
            "workflow_bindings": {
              "type": "array",
              "description": "Latest immutable version of each binding, including disabled entries; empty when no binding exists.",
              "items": {
                "$ref": "#/components/schemas/AgentWorkflowBindingResponse"
              }
            },
            "current_release_id": {
              "type": "integer",
              "format": "int64",
              "nullable": true
            },
            "published_version": {
              "type": "integer"
            },
            "has_published_release": {
              "type": "boolean"
            },
            "has_unpublished_changes": {
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
