---
title: "重试Agent运行"
---

`POST /api/v1/runs/retry`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Retry an agent run

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `run_id` | `integer (int64)` | 是 | 最小：`1` |

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "run_id": 1
}
```

```bash
curl --request POST "$BASE_URL/api/v1/runs/retry" \
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
| `data` | `AgentRun` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `run_id` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 否 | 目标工作区。仍需当前用户具有访问权限。 |
| `agent_id` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `conversation_id` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `status` | `string` | 是 | Agent run lifecycle status. A succeeded run ended normally; it does not by itself verify a broader business outcome. |
| `answer` | `string` | 否 | 对该待补充问题的回答。 |
| `answer_format` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `structured_output` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `artifacts` | `array<JsonObject>` | 否 | 按当前业务对象与接口合同提供。 |
| `citations` | `array<任意 JSON>` | 否 | 按当前业务对象与接口合同提供。 |
| `visual_evidence` | `array<JsonObject>` | 否 | 按当前业务对象与接口合同提供。 |
| `trace_steps` | `array<任意 JSON>` | 否 | 按当前业务对象与接口合同提供。 |
| `execution_summary` | `AgentExecutionSummary` | 否 | Runtime facts about the model/tool loop. Tool failures remain visible in calls and do not automatically redefine a normally ended Agent run as a failed business task. |
| `metadata` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `created_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `updated_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `agent_release_id` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `release_version` | `integer` | 否 | 按当前业务对象与接口合同提供。 |
| `run_mode` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `invocation_source` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `workflow_run_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `workflow_node_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |

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
            "run_id",
            "agent_id",
            "conversation_id",
            "status"
          ],
          "properties": {
            "run_id": {
              "type": "integer",
              "format": "int64"
            },
            "workspace_id": {
              "type": "string"
            },
            "agent_id": {
              "type": "integer",
              "format": "int64"
            },
            "conversation_id": {
              "type": "integer",
              "format": "int64"
            },
            "status": {
              "type": "string",
              "description": "Agent run lifecycle status. A succeeded run ended normally; it does not by itself verify a broader business outcome."
            },
            "answer": {
              "type": "string"
            },
            "answer_format": {
              "type": "string"
            },
            "structured_output": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "artifacts": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/JsonObject"
              }
            },
            "citations": {
              "type": "array",
              "items": {}
            },
            "visual_evidence": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/JsonObject"
              }
            },
            "trace_steps": {
              "type": "array",
              "items": {}
            },
            "execution_summary": {
              "$ref": "#/components/schemas/AgentExecutionSummary"
            },
            "metadata": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "created_at": {
              "type": "string",
              "format": "date-time"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time"
            },
            "agent_release_id": {
              "type": "integer",
              "format": "int64",
              "nullable": true
            },
            "release_version": {
              "type": "integer"
            },
            "run_mode": {
              "type": "string"
            },
            "invocation_source": {
              "type": "string"
            },
            "workflow_run_id": {
              "type": "string"
            },
            "workflow_node_id": {
              "type": "string"
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
