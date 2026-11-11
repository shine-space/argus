---
title: "启用应用用户安装项目"
---

`POST /api/v1/applications/user-installations/projects/activate`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Materialize the installed version for one explicitly linked Office project

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `installation_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `project_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `idempotency_key` | `string` | 是 | 本次执行意图的唯一键；相同意图重试保持键及内容不变。；最短：`8`；最长：`200` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "installation_id": "<按字段约束替换>",
  "project_id": "<按字段约束替换>",
  "idempotency_key": "<idempotency_key>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/user-installations/projects/activate" \
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
| `data` | `ApplicationUserInstallationProject` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `installation_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `project_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `participation_binding_id` | `string` | 是 | 当前应用参与绑定，由授权列表或详情返回。 |
| `participation_binding_revision_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `active` | `boolean` | 是 | 按当前业务对象与接口合同提供。 |

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
            "installation_id",
            "project_id",
            "participation_binding_id",
            "participation_binding_revision_id",
            "active"
          ],
          "properties": {
            "installation_id": {
              "type": "string"
            },
            "project_id": {
              "type": "string"
            },
            "participation_binding_id": {
              "type": "string"
            },
            "participation_binding_revision_id": {
              "type": "string"
            },
            "active": {
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
