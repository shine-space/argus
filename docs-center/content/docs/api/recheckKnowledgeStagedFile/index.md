---
title: "复查知识暂存文件"
---

`POST /api/v1/knowledge/files/staged/recheck`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Recompute current preflight from the authorized stored original without uploading again

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `knowledge_base_id` | `string` | 是 | 最短：`1`；最长：`100` |
| `file_id` | `string` | 是 | 最短：`1`；最长：`120` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "knowledge_base_id": "<按字段约束替换>",
  "file_id": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/knowledge/files/staged/recheck" \
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
| `data` | `KnowledgeDocumentPreflight` | 是 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `schema_version` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `source` | `JsonObject` | 是 | 按当前业务对象与接口合同提供。 |
| `requested_parse_mode` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `resolved_parse_mode` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `profile` | `JsonObject` | 是 | 按当前业务对象与接口合同提供。 |
| `capability_plan` | `JsonObject` | 是 | 按当前业务对象与接口合同提供。 |
| `page_plan` | `array<object>` | 是 | 按当前业务对象与接口合同提供。 |
| `planned_document_parser_calls` | `integer` | 是 | 按当前业务对象与接口合同提供。 |
| `planned_ocr_calls` | `integer` | 是 | 按当前业务对象与接口合同提供。 |
| `planned_vlm_calls` | `integer` | 是 | 按当前业务对象与接口合同提供。 |
| `model_snapshots` | `JsonObject` | 是 | 按当前业务对象与接口合同提供。 |
| `estimate` | `object` | 是 | 按当前业务对象与接口合同提供。 |
| `execution_budget` | `JsonObject` | 是 | 按当前业务对象与接口合同提供。 |
| `staged_file` | `KnowledgeStagedFile` | 是 | 按当前业务对象与接口合同提供。 |

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
      "required": [
        "data"
      ],
      "properties": {
        "data": {
          "type": "object",
          "required": [
            "schema_version",
            "source",
            "resolved_parse_mode",
            "profile",
            "capability_plan",
            "page_plan",
            "planned_document_parser_calls",
            "planned_ocr_calls",
            "planned_vlm_calls",
            "model_snapshots",
            "estimate",
            "execution_budget",
            "staged_file"
          ],
          "properties": {
            "schema_version": {
              "type": "string"
            },
            "source": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "requested_parse_mode": {
              "type": "string"
            },
            "resolved_parse_mode": {
              "type": "string"
            },
            "profile": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "capability_plan": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "page_plan": {
              "type": "array",
              "items": {
                "type": "object",
                "required": [
                  "page_number",
                  "primary_method",
                  "native_text_chars",
                  "media_count",
                  "quality_score",
                  "planned_methods",
                  "reason_codes"
                ],
                "properties": {
                  "page_number": {
                    "type": "integer"
                  },
                  "primary_method": {
                    "type": "string"
                  },
                  "native_text_chars": {
                    "type": "integer"
                  },
                  "media_count": {
                    "type": "integer"
                  },
                  "quality_score": {
                    "type": "number"
                  },
                  "planned_methods": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "reason_codes": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            },
            "planned_document_parser_calls": {
              "type": "integer"
            },
            "planned_ocr_calls": {
              "type": "integer"
            },
            "planned_vlm_calls": {
              "type": "integer"
            },
            "model_snapshots": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "estimate": {
              "type": "object",
              "required": [
                "status",
                "minimum_cost",
                "maximum_cost",
                "duration_ms_min",
                "duration_ms_max",
                "reason_codes"
              ],
              "properties": {
                "status": {
                  "type": "string"
                },
                "currency": {
                  "type": "string"
                },
                "minimum_cost": {
                  "type": "number",
                  "nullable": true
                },
                "maximum_cost": {
                  "type": "number",
                  "nullable": true
                },
                "duration_ms_min": {
                  "type": "integer",
                  "format": "int64",
                  "nullable": true
                },
                "duration_ms_max": {
                  "type": "integer",
                  "format": "int64",
                  "nullable": true
                },
                "reason_codes": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                }
              }
            },
            "execution_budget": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "staged_file": {
              "$ref": "#/components/schemas/KnowledgeStagedFile"
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
