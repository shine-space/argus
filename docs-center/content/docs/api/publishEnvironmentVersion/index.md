---
title: "发布运行环境版本"
---

`POST /api/v1/environments/versions/publish`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Publish an immutable environment version

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `environment_id` | `string` | 否 | 最长：`48` |
| `expected_revision` | `integer (int64)` | 否 | 调用方最近读取的对象修订；创建与修改按接口要求使用。；最小：`0` |
| `name` | `string` | 是 | 最短：`1`；最长：`60` |
| `stage` | `string` | 是 | 允许值：`["development", "test", "production"]` |
| `knowledge_models` | `EnvironmentKnowledgeModels` | 否 | Explicit knowledge model roles, each referencing model_config_ids in the same immutable environment version. No workspace-default fallback. |
| `allow_registered_agent_tools` | `boolean` | 否 | Allow pinned registered read-only tools of direct Application Agents with per-invocation authorization.；默认：`false` |
| `model_config_ids` | `array<integer (int64)>` | 是 | 最多项：`32` |
| `max_concurrent_runs` | `integer` | 是 | 最小：`1`；最大：`100` |
| `run_timeout_seconds` | `integer` | 是 | 最小：`30`；最大：`1800` |
| `idempotency_key` | `string` | 是 | 本次执行意图的唯一键；相同意图重试保持键及内容不变。；最短：`8`；最长：`200` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "name": "<按字段约束替换>",
  "stage": "development",
  "model_config_ids": [],
  "max_concurrent_runs": 1,
  "run_timeout_seconds": 30,
  "idempotency_key": "<idempotency_key>"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/environments/versions/publish" \
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
| `data` | `EnvironmentPublishResult` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `environment` | `Environment` | 是 | 按当前业务对象与接口合同提供。 |
| `version` | `EnvironmentVersion` | 是 | 按当前业务对象与接口合同提供。 |

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
            "environment",
            "version"
          ],
          "properties": {
            "environment": {
              "$ref": "#/components/schemas/Environment"
            },
            "version": {
              "$ref": "#/components/schemas/EnvironmentVersion"
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
