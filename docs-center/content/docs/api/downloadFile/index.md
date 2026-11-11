---
title: "下载文件"
---

`GET /api/v1/files/{file_id}/download`

请求发送到客户自己的本地部署实例，功能与权限以安装版本为准。

## 接口用途

Download an owned durable Argus file

## 认证与权限

请求携带 `Authorization: Bearer <access_token>`。服务端检查当前身份、目标工作区及对应对象权限；接口可调用不意味着可以访问所有数据。

## 路径与查询参数

| 名称 | 位置 | 必填 | 类型 |
| --- | --- | --- | --- |
| `file_id` | path | 是 | `string` |
| `workspace_id` | query | 是 | `string` |
| `filename` | query | 是 | `string` |
| `mime_type` | query | 是 | `string` |
| `size_bytes` | query | 是 | `integer (int64)` |

## 请求参数

该接口没有声明 JSON 请求体。按路径与查询参数调用。

## 返回结果

成功响应类型：`application/octet-stream`。

按该媒体类型读取文件或原始内容，不尝试按统一 JSON envelope 解析。

## 异常与恢复

按 HTTP 状态、错误码和当前业务状态处理。[错误与异常恢复](/errors/)说明身份、权限、修订和未知结果的处理方式。带幂等键的操作不要因超时更换键后重复提交。

## 相关文档

- [身份认证](/authentication/)
- [任务与流式响应](/tasks-streams/)
- [接口目录](/api/)
- [OpenAPI 合同](/openapi.json)
