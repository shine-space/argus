---
title: "首次接口调用"
---

读取可用应用，使用当前修订提交一次任务并回查结果。

## 准备上下文

从企业管理员取得实际平台地址、账号及允许使用的工作区。按[身份认证](/authentication/)取得访问令牌。下面示例使用 Bash、curl 和已设置的环境变量，不包含真实账号或密钥。

```bash
export BASE_URL="https://ai.example.com"
export ACCESS_TOKEN="<当前用户的访问令牌>"
export WORKSPACE_ID="<已授权工作区>"
```

## 读取应用列表

```bash
curl --fail-with-body "$BASE_URL/api/v1/applications/participation-bindings/list" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"workspace_id\":\"$WORKSPACE_ID\"}"
```

从结果中选取当前可用应用，读取它的参与绑定 ID 和当前修订。不要从过期页面复制修订，也不要人为选择一个无权使用的绑定。

## 提交员工任务

替换下面的绑定、修订和幂等键占位符。该调用会实际创建任务，先在企业测试工作区使用获授权资料验证。

```json
{
  "workspace_id": "<已授权工作区>",
  "participation_binding_id": "<列表返回的绑定ID>",
  "expected_binding_revision_id": "<当前修订ID>",
  "user_input": "整理本次任务的输入，并说明还需要我补充什么信息。",
  "idempotency_key": "<本次意图唯一且重试保持不变的键>"
}
```

将该 JSON 作为请求体发送到 `POST /api/v1/applications/representative/run`。保留返回的 `data.command` 和原运行标识。

## 回查任务

使用 `POST /api/v1/applications/commands/detail`，请求中提供 `workspace_id` 和 `command_id`。检查当前状态、输出校验、文件与人工补充问题，不把 HTTP 200 直接当成业务完成。

需要显示增量内容时，使用[流式与任务状态](/tasks-streams/)中的原命令订阅入口。文档示例展示接口结构，不代表你的企业实例已经启用同名应用或模型。
