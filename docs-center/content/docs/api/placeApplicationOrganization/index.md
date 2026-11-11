---
title: "调整应用组织"
---

`POST /api/v1/applications/organization/place`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Change directory placement without changing team ownership or resource grants

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `application_id` | `string` | 是 | 格式：`"^app_[a-f0-9]{32}$"` |
| `org_unit_id` | `string` | 是 | Empty places the employee at company level.；最长：`48` |
| `expected_revision` | `integer (int64)` | 是 | 调用方最近读取的对象修订；创建与修改按接口要求使用。；最小：`0` |
| `idempotency_key` | `string` | 是 | 本次执行意图的唯一键；相同意图重试保持键及内容不变。；最短：`8`；最长：`200` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "application_id": "<按字段约束替换>",
  "org_unit_id": "<按字段约束替换>",
  "expected_revision": 0,
  "idempotency_key": "<idempotency_key>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/organization/place" \
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
| `data` | `ApplicationOrganizationEntry` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `application_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `team_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `org_unit_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `org_unit_name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `org_unit_available` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |
| `revision` | `integer (int64)` | 是 | 按当前业务对象与接口合同提供。 |
| `can_edit` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |

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
            "application_id",
            "name",
            "team_id",
            "org_unit_id",
            "org_unit_name",
            "org_unit_available",
            "revision",
            "can_edit"
          ],
          "properties": {
            "application_id": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "team_id": {
              "type": "string"
            },
            "org_unit_id": {
              "type": "string"
            },
            "org_unit_name": {
              "type": "string"
            },
            "org_unit_available": {
              "type": "boolean"
            },
            "revision": {
              "type": "integer",
              "format": "int64"
            },
            "can_edit": {
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
