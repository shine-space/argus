---
title: "修订成果文件"
---

`POST /api/v1/files/revisions/create`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Upload or restore an immutable human revision of an owned artifact

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 请求参数

请求类型：`application/json`。

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | `string` | 是 | 目标工作区。仍需当前用户具有访问权限。；最短：`1`；最长：`100` |
| `expected_file_id` | `string` | 是 | 最短：`1`；最长：`100` |
| `source_file_id` | `string` | 是 | 最短：`1`；最长：`100` |
| `request_id` | `string` | 是 | 最短：`1`；最长：`128`；格式：`"^[A-Za-z0-9_-]+$"` |
| `operation` | `string` | 是 | 当前授权操作目录返回的领域操作名。；允许值：`["upload", "restore"]` |

该请求结构不接受未声明字段。

## 请求示例

下面是结构示例。尖括号内容必须替换为真实授权资源及满足字段约束的值；示例不会连接你的平台。

```json
{
  "workspace_id": "<workspace_id>",
  "expected_file_id": "<按字段约束替换>",
  "source_file_id": "<按字段约束替换>",
  "request_id": "<按字段约束替换>",
  "operation": "upload"
}
```

```bash
curl --request POST "$BASE_URL/api/v1/files/revisions/create" \
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
| `data` | `FileRef` | 否 | 按当前业务对象与接口合同提供。 |

### data 字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `__type` | `string` | 是 | 允许值：`["file_ref"]` |
| `file_id` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `filename` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `mime_type` | `string` | 是 | 按当前业务对象与接口合同提供。 |
| `size_bytes` | `integer (int64)` | 是 | 最小：`0` |

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
            "__type",
            "file_id",
            "filename",
            "mime_type",
            "size_bytes"
          ],
          "properties": {
            "__type": {
              "type": "string",
              "enum": [
                "file_ref"
              ]
            },
            "file_id": {
              "type": "string"
            },
            "filename": {
              "type": "string"
            },
            "mime_type": {
              "type": "string"
            },
            "size_bytes": {
              "type": "integer",
              "format": "int64",
              "minimum": 0
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
