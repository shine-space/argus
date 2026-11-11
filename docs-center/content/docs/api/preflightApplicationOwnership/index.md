---
title: "预检应用所有权"
---

`POST /api/v1/applications/ownership/preflight`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

预检应用所有权

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `application_id` | `string` | 是 | 最短：`1`；最长：`100` |
| `target_owner_user_id` | `integer (int64)` | 是 | 最小：`1` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "application_id": "<按字段约束替换>",
  "target_owner_user_id": 1
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/ownership/preflight" \
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
| `data` | `ApplicationOwnershipPreflight` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `application_id` | `string` | 是 | 最短：`1`；最长：`100` |
| `current_owner_user_id` | `integer (int64)` | 是 | 最小：`1` |
| `target_owner_user_id` | `integer (int64)` | 是 | 最小：`1` |
| `target_is_workspace_member` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `target_is_team_member` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `can_transfer` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `missing_application_permissions` | `array<string>` | 是 | 按当前业务对象与接口合同提供。 |
| `missing_sources` | `array<ApplicationOwnershipSourceGap>` | 是 | 按当前业务对象与接口合同提供。 |
| `missing_environments` | `array<ApplicationOwnershipEnvironmentGap>` | 是 | 按当前业务对象与接口合同提供。 |
| `preserved_workspace_bindings` | `array<ApplicationOwnershipPrivateBinding>` | 是 | 按当前业务对象与接口合同提供。 |
| `preflight_digest` | `string` | 是 | 按当前业务对象与接口合同提供。 |

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
            "workspace_id",
            "application_id",
            "current_owner_user_id",
            "target_owner_user_id",
            "target_is_workspace_member",
            "target_is_team_member",
            "can_transfer",
            "missing_application_permissions",
            "missing_sources",
            "missing_environments",
            "preserved_workspace_bindings",
            "preflight_digest"
          ],
          "properties": {
            "workspace_id": {
              "type": "string",
              "minLength": 1,
              "maxLength": 100
            },
            "application_id": {
              "type": "string",
              "minLength": 1,
              "maxLength": 100
            },
            "current_owner_user_id": {
              "type": "integer",
              "format": "int64",
              "minimum": 1
            },
            "target_owner_user_id": {
              "type": "integer",
              "format": "int64",
              "minimum": 1
            },
            "target_is_workspace_member": {
              "type": "boolean"
            },
            "target_is_team_member": {
              "type": "boolean"
            },
            "can_transfer": {
              "type": "boolean"
            },
            "missing_application_permissions": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "missing_sources": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ApplicationOwnershipSourceGap"
              }
            },
            "missing_environments": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ApplicationOwnershipEnvironmentGap"
              }
            },
            "preserved_workspace_bindings": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ApplicationOwnershipPrivateBinding"
              }
            },
            "preflight_digest": {
              "type": "string"
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
