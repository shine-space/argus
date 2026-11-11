---
title: "上传知识文档"
---

`POST /api/v1/knowledge/files`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Upload a document to a knowledge base

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`multipart/form-data`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `file` | `string (binary)` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `knowledge_base_id` | `string` | 是 | 最短：`1`；最长：`160` |
| `title` | `string` | 否 | 最长：`255` |
| `parse_mode` | `string` | 否 | 最长：`50` |
| `metadata` | `string` | 否 | JSON object encoded as a string |

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

通过 multipart/form-data 按上表传入各字段。文件字段发送真实二进制，Content-Type 的 boundary 由客户端生成。

## 返回结果

成功响应类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `status` | `boolean` | 是 | 允许值：`[true]` |
| `code` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `message` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `data` | `KnowledgeDocument` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `knowledge_base_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `title` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `filename` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `content_type` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `size` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `parse_mode` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `source_asset_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `status` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `processing_stage` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `attempt_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `attempt_no` | `integer` | 否 | 按当前业务对象与接口合同提供。 |
| `attempt_status` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `chunk_count` | `integer` | 否 | 按当前业务对象与接口合同提供。 |
| `metadata` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `warnings` | `array<JsonObject>` | 否 | 按当前业务对象与接口合同提供。 |
| `retryable` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `error` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
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
            "knowledge_base_id",
            "title",
            "status"
          ],
          "properties": {
            "id": {
              "type": "integer",
              "format": "int64"
            },
            "workspace_id": {
              "type": "string"
            },
            "knowledge_base_id": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "filename": {
              "type": "string"
            },
            "content_type": {
              "type": "string"
            },
            "size": {
              "type": "integer",
              "format": "int64"
            },
            "parse_mode": {
              "type": "string"
            },
            "source_asset_id": {
              "type": "string"
            },
            "status": {
              "type": "string"
            },
            "processing_stage": {
              "type": "string"
            },
            "attempt_id": {
              "type": "string"
            },
            "attempt_no": {
              "type": "integer"
            },
            "attempt_status": {
              "type": "string"
            },
            "chunk_count": {
              "type": "integer"
            },
            "metadata": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "warnings": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/JsonObject"
              }
            },
            "retryable": {
              "type": "boolean"
            },
            "error": {
              "$ref": "#/components/schemas/JsonObject"
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
