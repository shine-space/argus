---
title: "任务、幂等与流式响应"
---

保持同一执行意图，恢复原任务，并正确处理 POST SSE。

## 幂等键对应一次意图

写入或任务接口要求 `idempotency_key` 时，在用户确认一次意图时生成并保存。相同意图重试使用相同键与内容；用户改变目标或输入后再产生新键。

未知响应不等于执行失败。先回查原对象或任务，不能因网络超时直接创建第二笔写入。

## 应用命令和原运行

应用命令关联原 Agent 或 Workflow 运行。`commands/detail` 读取原命令；`commands/list` 和 `commands/work` 用于历史或工作项。业务行动及外部系统回执另有状态。

## POST SSE

`POST /api/v1/applications/commands/stream` 的请求包含 `workspace_id`、`command_id`，携带 Bearer 认证。成功订阅返回 `text/event-stream`，只适用于接口支持的原 Agent 运行。

```text
event: <event_type>
data: <一个完整的 JSON 事件>

```

事件以空行分隔。网络分块可能从 UTF-8 字符或 JSON 中间切开，客户端必须使用流式解码并缓存完整事件后再解析。不要对每个网络 chunk 直接 JSON.parse，也不要 trim 掉文本增量边界的空白。

浏览器原生 EventSource 不能直接满足这个 POST 加认证请求体的合同；使用 fetch 流读取或交付 SDK 的对应传输。文档站不建立到业务实例的流式连接。

## 断开与补充信息

流断开后查询原命令，不自动重复运行。员工等待补充信息时，使用该命令返回的确切 `continuation_id`，通过 `commands/human-input` 提交回答；不要创建另一个命令冒充恢复。

用户取消订阅与服务端取消业务运行是不同动作。是否可以取消、重试或恢复，以原运行支持的操作为准。
