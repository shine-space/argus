---
title: "删除应用发布候选"
---

`POST /api/v1/applications/release-candidates/delete`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Delete one unpublished digital employee version

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `application_id` | `string` | 是 | 格式：`"^app_[a-f0-9]{32}$"` |
| `candidate_id` | `string` | 是 | 格式：`"^acand_[a-f0-9]{32}$"` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "application_id": "<按字段约束替换>",
  "candidate_id": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/release-candidates/delete" \
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
| `data` | `ApplicationReleaseCandidate` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `candidate_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `application_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `version` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `version_label` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `draft_revision` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `manifest` | `ApplicationManifest` | 是 | 按当前业务对象与接口合同提供。 |
| `scope_type` | `string` | 是 | 允许值：`["workspace", "team", "project"]` |
| `scope_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `team_ids` | `array<string>` | 否 | 按当前业务对象与接口合同提供。 |
| `participation_binding_id` | `string` | 否 | 当前应用参与绑定，由授权列表或详情返回。 |
| `expected_binding_revision` | `integer (int64)` | 否 | 按当前业务对象与接口合同提供。 |
| `release_note` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `knowledge_access` | `ApplicationKnowledgeAccess` | 否 | Omission preserves previous or legacy configuration. An explicit empty object selects no extra knowledge bases. The default write base must also be in read_base_ids. Server-issued capture authority is never client input. |
| `runtime_configuration` | `ApplicationReleaseRuntimeConfiguration` | 否 | 按当前业务对象与接口合同提供。 |
| `status` | `string` | 是 | 允许值：`["pending", "published"]` |
| `published_version_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `created_by` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `created_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |
| `updated_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |
| `published_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |

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
            "candidate_id",
            "workspace_id",
            "application_id",
            "version",
            "version_label",
            "draft_revision",
            "name",
            "manifest",
            "scope_type",
            "scope_id",
            "release_note",
            "status",
            "created_by",
            "created_at",
            "updated_at"
          ],
          "properties": {
            "candidate_id": {
              "type": "string"
            },
            "workspace_id": {
              "type": "string"
            },
            "application_id": {
              "type": "string"
            },
            "version": {
              "type": "integer",
              "format": "int64"
            },
            "version_label": {
              "type": "string"
            },
            "draft_revision": {
              "type": "integer",
              "format": "int64"
            },
            "name": {
              "type": "string"
            },
            "manifest": {
              "$ref": "#/components/schemas/ApplicationManifest"
            },
            "scope_type": {
              "type": "string",
              "enum": [
                "workspace",
                "team",
                "project"
              ]
            },
            "scope_id": {
              "type": "string"
            },
            "team_ids": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "participation_binding_id": {
              "type": "string"
            },
            "expected_binding_revision": {
              "type": "integer",
              "format": "int64"
            },
            "release_note": {
              "type": "string"
            },
            "knowledge_access": {
              "$ref": "#/components/schemas/ApplicationKnowledgeAccess"
            },
            "runtime_configuration": {
              "$ref": "#/components/schemas/ApplicationReleaseRuntimeConfiguration"
            },
            "status": {
              "type": "string",
              "enum": [
                "pending",
                "published"
              ]
            },
            "published_version_id": {
              "type": "string"
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
            },
            "published_at": {
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
