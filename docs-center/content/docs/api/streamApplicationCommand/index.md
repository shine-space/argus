---
title: "订阅应用命令事件"
---

`POST /api/v1/applications/commands/stream`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Subscribe to the original Agent run for an authorized application command

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `command_id` | `string` | 是 | 原应用命令标识。不得用另一个命令替代原任务恢复。；最短：`1`；最长：`48` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "command_id": "<command_id>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/applications/commands/stream" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  --data @request.json
```

## 返回结果

成功响应类型：`text/event-stream`。

返回 POST SSE 事件流。按完整事件边界读取，断开后回查原运行。[流式处理说明](/tasks-streams/)。

## 异常与恢复

按 HTTP 状态、错误码和当前业务状态处理。[错误与异常恢复](/errors/)说明身份、权限、修订和未知结果的处理方式。带幂等键的操作不要因超时更换键后重复提交。

## 相关文档

- [身份认证](/authentication/)
- [任务与流式响应](/tasks-streams/)
- [接口目录](/api/)
- [OpenAPI 合同](/openapi.json)
