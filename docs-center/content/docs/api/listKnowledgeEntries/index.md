---
title: "列出知识条目"
---

`POST /api/v1/knowledge/entries/list`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

listKnowledgeEntries using current scope and source authority

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。 |
| `space_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `knowledge_base_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `cursor` | `string` | 否 | 上一次响应返回的分页游标，首次按接口约定省略或传空。 |
| `limit` | `integer` | 否 | 本次读取数量，范围见字段约束。；最小：`1`；最大：`100` |
| `query` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `kind` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `status` | `string` | 否 | 按当前业务对象与接口合同提供。 |
| `produced_by_application_id` | `string` | 否 | 按当前业务对象与接口合同提供。 |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/knowledge/entries/list" \
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
| `data` | `JsonObject` | 否 | 按当前业务对象与接口合同提供。 |

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
