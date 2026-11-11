---
title: "保存MCP工具定义"
---

`POST /api/v1/tools/mcp/definitions/save`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Create or update an MCP server definition and connect to discover its tools

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `plugin_key` | `string` | 否 | Omit when creating a definition.；最长：`160` |
| `name` | `string` | 是 | 最短：`1`；最长：`160` |
| `description` | `string` | 否 | 最长：`1000` |
| `server_config` | `MCPToolServerConfig` | 是 | 按当前业务对象与接口合同提供。 |
| `status` | `ToolDefinitionStatus` | 否 | 允许值：`["ready"]` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "name": "<按字段约束替换>",
  "server_config": {
    "mcpServers": {}
  }
}
```

```bash
curl --request POST "$BASE_URL/api/v1/tools/mcp/definitions/save" \
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
| `data` | `MCPToolDefinition` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `plugin_key` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `name` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `description` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `server_config` | `MCPToolServerConfig` | 是 | 按当前业务对象与接口合同提供。 |
| `tools_snapshot` | `array<MCPToolSnapshot>` | 是 | 按当前业务对象与接口合同提供。 |
| `tools_refreshed_at` | `string (date-time)` | 否 | 按当前业务对象与接口合同提供。 |
| `status` | `ToolDefinitionStatus` | 是 | 允许值：`["ready"]` |
| `created_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |
| `updated_at` | `string (date-time)` | 是 | 按当前业务对象与接口合同提供。 |

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
          "required": [
            "plugin_key",
            "name",
            "description",
            "server_config",
            "tools_snapshot",
            "status",
            "created_at",
            "updated_at"
          ],
          "properties": {
            "plugin_key": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "server_config": {
              "$ref": "#/components/schemas/MCPToolServerConfig"
            },
            "tools_snapshot": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/MCPToolSnapshot"
              }
            },
            "tools_refreshed_at": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "status": {
              "$ref": "#/components/schemas/ToolDefinitionStatus"
            },
            "created_at": {
              "type": "string",
              "format": "date-time"
            },
            "updated_at": {
              "type": "string",
              "format": "date-time"
            }
          },
          "additionalProperties": false
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
