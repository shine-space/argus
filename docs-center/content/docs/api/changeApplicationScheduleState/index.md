---
title: "变更应用调度状态"
---

`POST /api/v1/applications/schedules/state`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Schedule state for the authenticated user's current digital employee or project

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `schedule_id` | `string` | 是 | 格式：`"^asched_[a-f0-9]{32}$"` |
| `expected_revision` | `integer (int64)` | 是 | 调用方最近读取的对象修订；创建与修改按接口要求使用。；最小：`1` |
| `state` | `string` | 是 | 允许值：`["enabled", "paused", "archived"]` |
| `mutation_id` | `string` | 是 | 最短：`1`；最长：`120` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "schedule_id": "<按字段约束替换>",
  "expected_revision": 1,
  "state": "enabled",
  "mutation_id": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/schedules/state" \
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
| `data` | `任意 JSON` | 否 | 按当前业务对象与接口合同提供。 |

### 完整响应结构

以下是 Schema 结构，包含嵌套对象的类型与约束；不是一次真实业务响应。

```json
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
}
```

## 异常与恢复

按 HTTP 状态、错误码和当前业务状态处理。[错误与异常恢复](/errors/)说明身份、权限、修订和未知结果的处理方式。带幂等键的操作不要因超时更换键后重复提交。

## 相关文档

- [身份认证](/authentication/)
- [任务与流式响应](/tasks-streams/)
- [接口目录](/api/)
- [OpenAPI 合同](/openapi.json)
