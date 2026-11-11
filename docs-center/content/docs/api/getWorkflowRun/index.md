---
title: "读取Workflow运行"
---

`POST /api/v1/workflows/runs/detail`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Get a workflow run

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workflow_run_id` | `string` | 是 | 最短：`1`；最长：`100` |
| `include_definition_snapshot` | `boolean` | 否 | Read the exact immutable publication after current definition-read authorization. Omitted for ordinary status polls.；默认：`false` |

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workflow_run_id": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/workflows/runs/detail" \
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
| `data` | `WorkflowRun` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `id` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `workflow_run_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `workflow_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `workflow_version` | `integer` | 否 | 按当前业务对象与接口合同提供。 |
| `workflow_snapshot_id` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `trigger_type` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `status` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `inputs` | `JsonObject` | 否 | 该动作输入，按当前已发布能力的 Schema 提供。 |
| `outputs` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `node_runs` | `array<任意 JSON>` | 否 | 按当前业务对象与接口合同提供。 |
| `node_outputs` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `events` | `array<JsonObject>` | 否 | 按当前业务对象与接口合同提供。 |
| `usage` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `error` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |
| `created_by` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `started_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `ended_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `created_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `updated_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `definition_snapshot` | `WorkflowRunDefinitionSnapshotView` | 否 | 按当前业务对象与接口合同提供。 |
| `interpretation` | `WorkflowRunInterpretation` | 否 | 按当前业务对象与接口合同提供。 |
| `sub_workflow_runs` | `array<WorkflowSubRun>` | 否 | 按当前业务对象与接口合同提供。 |

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
            "id": {
              "type": "integer",
              "format": "int64"
            },
            "workflow_run_id": {
              "type": "string"
            },
            "workflow_id": {
              "type": "string"
            },
            "workspace_id": {
              "type": "string"
            },
            "workflow_version": {
              "type": "integer"
            },
            "workflow_snapshot_id": {
              "type": "integer",
              "format": "int64",
              "nullable": true
            },
            "trigger_type": {
              "type": "string"
            },
            "status": {
              "type": "string"
            },
            "inputs": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "outputs": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "node_runs": {
              "type": "array",
              "items": {}
            },
            "node_outputs": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "events": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/JsonObject"
              }
            },
            "usage": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "error": {
              "$ref": "#/components/schemas/JsonObject"
            },
            "created_by": {
              "type": "integer",
              "format": "int64"
            },
            "started_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "ended_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "created_at": {
              "type": "string",
              "format": "date-time"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time"
            },
            "definition_snapshot": {
              "$ref": "#/components/schemas/WorkflowRunDefinitionSnapshotView"
            },
            "interpretation": {
              "$ref": "#/components/schemas/WorkflowRunInterpretation"
            },
            "sub_workflow_runs": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/WorkflowSubRun"
              }
            }
          },
          "required": [
            "workflow_run_id",
            "workflow_id",
            "workspace_id",
            "status"
          ]
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
