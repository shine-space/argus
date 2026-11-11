---
title: "执行会议原生操作"
---

`POST /api/v1/applications/meeting-native-actions/execute`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Explicitly confirm one adopted task, calendar event or online meeting from the exact persisted meeting revision

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `participation_binding_id` | `string` | 是 | 当前应用参与绑定，由授权列表或详情返回。；格式：`"^abind_[0-9a-f]{32}$"` |
| `collection` | `string` | 是 | 应用已声明的记录集合。；允许值：`["meetings"]` |
| `record_id` | `string` | 是 | 集合内业务记录标识。；格式：`"^[a-z][a-z0-9_.-]{0,79}$"` |
| `expected_binding_revision_id` | `string` | 是 | 调用方最近读取的绑定修订，服务端据此检查并发与版本。；格式：`"^abrev_[0-9a-f]{32}$"` |
| `expected_record_revision` | `integer (int64)` | 是 | 最小：`1`；最大：`9007199254740990` |
| `plan_action_index` | `integer` | 是 | 最小：`0`；最大：`7` |
| `publication_binding_id` | `string` | 是 | 格式：`"^(fpb / wpb / dtpb)_[0-9a-f]{32}$"` |
| `publication_binding_version` | `integer (int64)` | 是 | 最小：`1` |
| `due_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `start_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `end_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `assignee_user_id` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `attendee_user_ids` | `array<integer (int64)>` | 否 | 最多项：`20` |
| `confirm` | `boolean` | 是 | Explicit confirmation by the current logged-in user.；允许值：`[true]` |
| `idempotency_key` | `string` | 是 | 本次执行意图的唯一键；相同意图重试保持键及内容不变。；最短：`8`；最长：`200` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "participation_binding_id": "<participation_binding_id>",
  "collection": "meetings",
  "record_id": "<按字段约束替换>",
  "expected_binding_revision_id": "<expected_binding_revision_id>",
  "expected_record_revision": 1,
  "plan_action_index": 0,
  "publication_binding_id": "<按字段约束替换>",
  "publication_binding_version": 1,
  "confirm": true,
  "idempotency_key": "<idempotency_key>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/meeting-native-actions/execute" \
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
| `data` | `ApplicationMeetingNativeActionReceipt` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `action_id` | `string` | 是 | 格式：`"^mact_[0-9a-f]{32}$"` |
| `source_record_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `source_record_revision` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `source_snapshot_revision` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `plan_command_id` | `string` | 是 | 格式：`"^acmd_[0-9a-f]{32}$"` |
| `plan_action_index` | `integer` | 是 | 最小：`0` |
| `binding_revision_id` | `string` | 是 | 格式：`"^abrev_[0-9a-f]{32}$"` |
| `application_version_id` | `string` | 是 | 格式：`"^aver_[0-9a-f]{32}$"` |
| `publication_binding_id` | `string` | 是 | 格式：`"^(fpb / wpb / dtpb)_[0-9a-f]{32}$"` |
| `publication_binding_version` | `integer (int64)` | 是 | 最小：`1` |
| `publication_id` | `string` | 是 | 格式：`"^pub_[0-9a-f]{32}$"` |
| `publication_version_id` | `string` | 是 | 格式：`"^pver_[0-9a-f]{32}$"` |
| `installation_id` | `string` | 是 | 最长：`40` |
| `provider` | `string` | 是 | 允许值：`["feishu", "wecom_intelligent_bot", "dingtalk"]` |
| `kind` | `string` | 是 | 允许值：`["channel_create_task", "channel_create_event", "channel_create_meeting"]` |
| `status` | `string` | 是 | 允许值：`["pending", "succeeded", "failed", "partial", "uncertain"]` |
| `action_revision` | `integer (int64)` | 是 | 最小：`1` |
| `object_state` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `provider_object_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `provider_link` | `string (uri)` | 否 | 按当前业务对象与接口合同提供。 |
| `provider_calendar_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `attendees_status` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `attendee_count` | `integer` | 否 | 最小：`0` |
| `video_meeting_status` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `safe_error_code` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `requested_details` | `object` | 否 | 按当前业务对象与接口合同提供。 |
| `operations` | `array<ApplicationMeetingNativeActionOperationReceipt>` | 是 | 按当前业务对象与接口合同提供。 |
| `stale` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `replayed` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `confirmed_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |
| `created_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |
| `updated_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |

该请求结构不接受未声明字段。

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
          "additionalProperties": false,
          "required": [
            "action_id",
            "source_record_id",
            "source_record_revision",
            "source_snapshot_revision",
            "plan_command_id",
            "plan_action_index",
            "binding_revision_id",
            "application_version_id",
            "publication_binding_id",
            "publication_binding_version",
            "publication_id",
            "publication_version_id",
            "installation_id",
            "provider",
            "kind",
            "status",
            "action_revision",
            "operations",
            "stale",
            "replayed",
            "confirmed_at",
            "created_at",
            "updated_at"
          ],
          "properties": {
            "action_id": {
              "type": "string",
              "pattern": "^mact_[0-9a-f]{32}$"
            },
            "source_record_id": {
              "type": "string"
            },
            "source_record_revision": {
              "type": "integer",
              "format": "int64"
            },
            "source_snapshot_revision": {
              "type": "integer",
              "format": "int64"
            },
            "plan_command_id": {
              "type": "string",
              "pattern": "^acmd_[0-9a-f]{32}$"
            },
            "plan_action_index": {
              "type": "integer",
              "minimum": 0
            },
            "binding_revision_id": {
              "type": "string",
              "pattern": "^abrev_[0-9a-f]{32}$"
            },
            "application_version_id": {
              "type": "string",
              "pattern": "^aver_[0-9a-f]{32}$"
            },
            "publication_binding_id": {
              "type": "string",
              "pattern": "^(fpb|wpb|dtpb)_[0-9a-f]{32}$"
            },
            "publication_binding_version": {
              "type": "integer",
              "format": "int64",
              "minimum": 1
            },
            "publication_id": {
              "type": "string",
              "pattern": "^pub_[0-9a-f]{32}$"
            },
            "publication_version_id": {
              "type": "string",
              "pattern": "^pver_[0-9a-f]{32}$"
            },
            "installation_id": {
              "type": "string",
              "maxLength": 40
            },
            "provider": {
              "type": "string",
              "enum": [
                "feishu",
                "wecom_intelligent_bot",
                "dingtalk"
              ]
            },
            "kind": {
              "type": "string",
              "enum": [
                "channel_create_task",
                "channel_create_event",
                "channel_create_meeting"
              ]
            },
            "status": {
              "type": "string",
              "enum": [
                "pending",
                "succeeded",
                "failed",
                "partial",
                "uncertain"
              ]
            },
            "action_revision": {
              "type": "integer",
              "format": "int64",
              "minimum": 1
            },
            "object_state": {
              "type": "string"
            },
            "provider_object_id": {
              "type": "string"
            },
            "provider_link": {
              "type": "string",
              "format": "uri"
            },
            "provider_calendar_id": {
              "type": "string"
            },
            "attendees_status": {
              "type": "string"
            },
            "attendee_count": {
              "type": "integer",
              "minimum": 0
            },
            "video_meeting_status": {
              "type": "string"
            },
            "safe_error_code": {
              "type": "string"
            },
            "requested_details": {
              "type": "object",
              "additionalProperties": true
            },
            "operations": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ApplicationMeetingNativeActionOperationReceipt"
              }
            },
            "stale": {
              "type": "boolean"
            },
            "replayed": {
              "type": "boolean"
            },
            "confirmed_at": {
              "type": "string",
              "format": "date-time"
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
