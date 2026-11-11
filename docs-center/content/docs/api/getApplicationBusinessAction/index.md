---
title: "读取应用业务操作"
---

`POST /api/v1/applications/business-actions/detail`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Read an assigned or created business action

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `action_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "action_id": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/business-actions/detail" \
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
| `data` | `ApplicationBusinessAction` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `action_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `application_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `participation_binding_id` | `string` | 是 | 当前应用参与绑定，由授权列表或详情返回。 |
| `source_collection` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `source_record_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `source_revision` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `title` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `description` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `assignee_id` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `assignment_source` | `string` | 是 | 允许值：`["manual", "responsibility_profile"]` |
| `assignment_profile_revision` | `integer (int64)` | 是 | 最小：`0` |
| `assignment_score` | `integer` | 是 | 最小：`0` |
| `assignment_reason` | `string` | 是 | 最长：`500` |
| `created_by` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `status` | `string` | 是 | 允许值：`["assigned", "in_progress", "pending_acceptance", "completed", "cancelled"]` |
| `revision` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `due_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `requires_acceptance` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `notify_in_im` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `im_delivery_id` | `string` | 是 | 最长：`48` |
| `im_delivery_status` | `string` | 是 | 允许值：`["disabled", "pending", "not_configured", "unavailable", "failed", "accepted", "failed_retryable", "failed_permanent", "uncertain", "sending"]` |
| `im_last_event` | `string` | 是 | 最长：`32` |
| `completion_note` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `completed_by` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `completed_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `accepted_by` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `accepted_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `created_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |
| `updated_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |
| `application_name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `assignee_name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `created_by_name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `scope_type` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `scope_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `scope_name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `source_readable` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `can_start` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `can_complete` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `can_accept` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `can_return` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `can_cancel` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |

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
            "action_id",
            "workspace_id",
            "application_id",
            "participation_binding_id",
            "source_collection",
            "source_record_id",
            "source_revision",
            "title",
            "description",
            "assignee_id",
            "assignment_source",
            "assignment_profile_revision",
            "assignment_score",
            "assignment_reason",
            "created_by",
            "status",
            "revision",
            "requires_acceptance",
            "notify_in_im",
            "im_delivery_id",
            "im_delivery_status",
            "im_last_event",
            "completion_note",
            "created_at",
            "updated_at",
            "application_name",
            "assignee_name",
            "created_by_name",
            "scope_type",
            "scope_id",
            "scope_name",
            "source_readable",
            "can_start",
            "can_complete",
            "can_accept",
            "can_return",
            "can_cancel"
          ],
          "properties": {
            "action_id": {
              "type": "string"
            },
            "workspace_id": {
              "type": "string"
            },
            "application_id": {
              "type": "string"
            },
            "participation_binding_id": {
              "type": "string"
            },
            "source_collection": {
              "type": "string"
            },
            "source_record_id": {
              "type": "string"
            },
            "source_revision": {
              "type": "integer",
              "format": "int64"
            },
            "title": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "assignee_id": {
              "type": "integer",
              "format": "int64"
            },
            "assignment_source": {
              "type": "string",
              "enum": [
                "manual",
                "responsibility_profile"
              ]
            },
            "assignment_profile_revision": {
              "type": "integer",
              "format": "int64",
              "minimum": 0
            },
            "assignment_score": {
              "type": "integer",
              "minimum": 0
            },
            "assignment_reason": {
              "type": "string",
              "maxLength": 500
            },
            "created_by": {
              "type": "integer",
              "format": "int64"
            },
            "status": {
              "type": "string",
              "enum": [
                "assigned",
                "in_progress",
                "pending_acceptance",
                "completed",
                "cancelled"
              ]
            },
            "revision": {
              "type": "integer",
              "format": "int64"
            },
            "due_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "requires_acceptance": {
              "type": "boolean"
            },
            "notify_in_im": {
              "type": "boolean"
            },
            "im_delivery_id": {
              "type": "string",
              "maxLength": 48
            },
            "im_delivery_status": {
              "type": "string",
              "enum": [
                "disabled",
                "pending",
                "not_configured",
                "unavailable",
                "failed",
                "accepted",
                "failed_retryable",
                "failed_permanent",
                "uncertain",
                "sending"
              ]
            },
            "im_last_event": {
              "type": "string",
              "maxLength": 32
            },
            "completion_note": {
              "type": "string"
            },
            "completed_by": {
              "type": "integer",
              "format": "int64",
              "nullable": true
            },
            "completed_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "accepted_by": {
              "type": "integer",
              "format": "int64",
              "nullable": true
            },
            "accepted_at": {
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
            "application_name": {
              "type": "string"
            },
            "assignee_name": {
              "type": "string"
            },
            "created_by_name": {
              "type": "string"
            },
            "scope_type": {
              "type": "string"
            },
            "scope_id": {
              "type": "string"
            },
            "scope_name": {
              "type": "string"
            },
            "source_readable": {
              "type": "boolean"
            },
            "can_start": {
              "type": "boolean"
            },
            "can_complete": {
              "type": "boolean"
            },
            "can_accept": {
              "type": "boolean"
            },
            "can_return": {
              "type": "boolean"
            },
            "can_cancel": {
              "type": "boolean"
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
