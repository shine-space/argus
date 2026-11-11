---
title: "订阅Agent运行"
---

`POST /api/v1/agents/run/stream`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Run an agent and stream structured events

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `idempotency_key` | `string` | 否 | 本次执行意图的唯一键；相同意图重试保持键及内容不变。；最长：`128` |
| `agent_id` | `integer (int64)` | 是 | 最小：`1` |
| `conversation_id` | `integer (int64)` | 是 | 最小：`1` |
| `user_input` | `string` | 是 | 用户对本次员工任务提出的要求。；最短：`1`；最长：`8000` |
| `files` | `array<FileRef>` | 否 | 本次选择的文件引用；省略和显式空数组的行为见字段说明。；最多项：`32` |
| `debug_prompt_enabled` | `boolean` | 否 | 按当前业务对象与接口合同提供。 |
| `run_mode` | `string` | 否 | Debug freezes the current enabled Workflow binding versions. Published freezes the selected Release references after checking that their latest logical bindings are still enabled. Existing Runs retain their assigned versions after later configuration changes.；允许值：`["debug", "published"]` |
| `agent_release_id` | `integer (int64)` | 否 | Existing Agent Release selected for published execution; not a Workflow snapshot ID.；最小：`1` |
| `invocation_source` | `string` | 否 | Workflow tools are assembled only for eligible authenticated top-level web or api Runs. Share, channel and workflow Runs receive no Workflow tools; a client-supplied source alone never grants execution authority.；允许值：`["web", "api", "workflow", "share", "channel"]` |
| `workflow_run_id` | `string` | 否 | 最长：`100` |
| `workflow_node_id` | `string` | 否 | 最长：`100` |

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "agent_id": 1,
  "conversation_id": 1,
  "user_input": "<按字段约束替换>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/agents/run/stream" \
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
