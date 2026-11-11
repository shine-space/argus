---
title: "接口参考"
---

查阅朝夕智能平台的接口用途、请求参数、返回结构及调用示例。

调用前请阅读[身份认证与请求约定](/authentication/)，也可下载 [OpenAPI 文件](/openapi.json)。

## 应用与数字员工 [#group-applications]

- [列出应用组织](/api/listApplicationOrganization/) · `POST /api/v1/applications/organization/list`
- [调整应用组织](/api/placeApplicationOrganization/) · `POST /api/v1/applications/organization/place`
- [列出会议原生操作目标](/api/listMeetingNativeActionTargets/) · `POST /api/v1/applications/meeting-native-actions/targets`
- [列出会议原生操作](/api/listMeetingNativeActions/) · `POST /api/v1/applications/meeting-native-actions/list`
- [执行会议原生操作](/api/executeMeetingNativeAction/) · `POST /api/v1/applications/meeting-native-actions/execute`
- [验证会议原生操作](/api/verifyMeetingNativeAction/) · `POST /api/v1/applications/meeting-native-actions/verify`
- [采用会议原生操作生命周期](/api/applyMeetingNativeActionLifecycle/) · `POST /api/v1/applications/meeting-native-actions/lifecycle`
- [创建应用调度](/api/createApplicationSchedule/) · `POST /api/v1/applications/schedules/create`
- [更新应用调度](/api/updateApplicationSchedule/) · `POST /api/v1/applications/schedules/update`
- [列出应用调度](/api/listApplicationSchedules/) · `POST /api/v1/applications/schedules/list`
- [变更应用调度状态](/api/changeApplicationScheduleState/) · `POST /api/v1/applications/schedules/state`
- [更新应用会话标题](/api/updateApplicationConversationTitle/) · `POST /api/v1/applications/commands/title`
- [生成应用推荐问题](/api/generateApplicationStarterQuestions/) · `POST /api/v1/applications/representative/starter-questions`
- [运行数字员工](/api/runApplicationEmployee/) · `POST /api/v1/applications/representative/run`
- [运行应用项目Agent](/api/runApplicationProjectAgent/) · `POST /api/v1/applications/projects/agent/run`
- [提交应用动作](/api/submitApplicationCommand/) · `POST /api/v1/applications/commands/submit`
- [提交员工补充信息](/api/submitApplicationHumanInput/) · `POST /api/v1/applications/commands/human-input`
- [读取应用命令](/api/getApplicationCommand/) · `POST /api/v1/applications/commands/detail`
- [订阅应用命令事件](/api/streamApplicationCommand/) · `POST /api/v1/applications/commands/stream`
- [列出应用命令](/api/listApplicationCommands/) · `POST /api/v1/applications/commands/list`
- [列出应用工作项](/api/listApplicationWork/) · `POST /api/v1/applications/commands/work`
- [创建应用部署修订](/api/createApplicationDeploymentRevision/) · `POST /api/v1/applications/deployments/revisions/create`
- [列出应用部署](/api/listApplicationDeployments/) · `POST /api/v1/applications/deployments/list`
- [列出应用部署修订](/api/listApplicationDeploymentRevisions/) · `POST /api/v1/applications/deployments/revisions/list`
- [读取应用安装合同](/api/getApplicationInstallationContract/) · `POST /api/v1/applications/deployments/installation-contract`
- [更新应用参与绑定](/api/updateApplicationParticipationBinding/) · `POST /api/v1/applications/participation-bindings/update`
- [列出应用参与绑定](/api/listApplicationParticipationBindings/) · `POST /api/v1/applications/participation-bindings/list`
- [读取应用参与绑定](/api/getApplicationParticipationBinding/) · `POST /api/v1/applications/participation-bindings/detail`
- [创建应用](/api/createApplication/) · `POST /api/v1/applications/create`
- [归属应用团队](/api/affiliateApplicationTeam/) · `POST /api/v1/applications/team/affiliate`
- [更新层级代表员工](/api/updateLayerRepresentative/) · `POST /api/v1/applications/representatives/update`
- [读取层级代表员工](/api/getLayerRepresentative/) · `POST /api/v1/applications/representatives/detail`
- [列出层级代表员工](/api/listLayerRepresentatives/) · `POST /api/v1/applications/representatives/list`
- [读取应用](/api/getApplication/) · `POST /api/v1/applications/detail`
- [删除应用草稿](/api/deleteApplicationDraft/) · `POST /api/v1/applications/drafts/delete`
- [读取应用Agent资源清单](/api/getApplicationAgentResourceInventory/) · `POST /api/v1/applications/resources/agent-inventory`
- [列出应用](/api/listApplications/) · `POST /api/v1/applications/list`
- [列出应用目录](/api/listApplicationCatalog/) · `POST /api/v1/applications/catalog/list`
- [列出应用用户安装](/api/listApplicationUserInstallations/) · `POST /api/v1/applications/user-installations/list`
- [安装应用供用户](/api/installApplicationForUser/) · `POST /api/v1/applications/user-installations/install`
- [更新应用用户安装](/api/updateApplicationUserInstallation/) · `POST /api/v1/applications/user-installations/update`
- [启用应用用户安装项目](/api/activateApplicationUserInstallationProject/) · `POST /api/v1/applications/user-installations/projects/activate`
- [更新应用草稿](/api/updateApplicationDraft/) · `POST /api/v1/applications/draft/update`
- [验证应用草稿](/api/validateApplicationDraft/) · `POST /api/v1/applications/draft/validate`
- [发布并启用应用](/api/publishAndEnableApplication/) · `POST /api/v1/applications/publish-and-enable`
- [发布应用版本](/api/publishApplicationVersion/) · `POST /api/v1/applications/versions/publish`
- [创建应用发布候选](/api/createApplicationReleaseCandidate/) · `POST /api/v1/applications/release-candidates/create`
- [列出应用发布候选](/api/listApplicationReleaseCandidates/) · `POST /api/v1/applications/release-candidates/list`
- [更新应用发布候选](/api/updateApplicationReleaseCandidate/) · `POST /api/v1/applications/release-candidates/update`
- [发布应用发布候选](/api/publishApplicationReleaseCandidate/) · `POST /api/v1/applications/release-candidates/publish`
- [删除应用发布候选](/api/deleteApplicationReleaseCandidate/) · `POST /api/v1/applications/release-candidates/delete`
- [列出应用版本](/api/listApplicationVersions/) · `POST /api/v1/applications/versions/list`
- [授权应用资源](/api/grantApplicationResource/) · `POST /api/v1/applications/resource-grants/grant`
- [撤销应用资源授权](/api/revokeApplicationResourceGrant/) · `POST /api/v1/applications/resource-grants/revoke`
- [列出应用资源授权](/api/listApplicationResourceGrants/) · `POST /api/v1/applications/resource-grants/list`
- [预览应用来源更新](/api/previewApplicationSourceUpdates/) · `POST /api/v1/applications/source-updates/preview`
- [确认应用来源更新](/api/confirmApplicationSourceUpdates/) · `POST /api/v1/applications/source-updates/confirm`
- [预检应用所有权](/api/preflightApplicationOwnership/) · `POST /api/v1/applications/ownership/preflight`
- [列出应用所有权候选](/api/listApplicationOwnershipCandidates/) · `POST /api/v1/applications/ownership/candidates`
- [转移应用所有权](/api/transferApplicationOwnership/) · `POST /api/v1/applications/ownership/transfer`
- [恢复应用所有权](/api/recoverApplicationOwnership/) · `POST /api/v1/applications/ownership/recover`
- [列出应用所有权历史](/api/listApplicationOwnershipHistory/) · `POST /api/v1/applications/ownership/history`
- [列出应用维护者](/api/listApplicationMaintainers/) · `POST /api/v1/applications/maintainers/list`
- [变更应用维护者](/api/changeApplicationMaintainer/) · `POST /api/v1/applications/maintainers/change`

## 业务记录与协作 [#group-records]

- [读取应用协作](/api/getApplicationCollaboration/) · `POST /api/v1/applications/collaboration/detail`
- [检查应用协作](/api/checkApplicationCollaboration/) · `POST /api/v1/applications/collaboration/check`
- [读取应用协作历史](/api/getApplicationCollaborationHistory/) · `POST /api/v1/applications/collaboration/history`
- [变更应用协作](/api/changeApplicationCollaboration/) · `POST /api/v1/applications/collaboration/change`
- [列出应用记忆](/api/listApplicationMemories/) · `POST /api/v1/applications/memories/list`
- [读取应用记忆](/api/getApplicationMemory/) · `POST /api/v1/applications/memories/detail`
- [变更应用记忆](/api/mutateApplicationMemory/) · `POST /api/v1/applications/memories/mutate`
- [读取应用记录](/api/getApplicationRecord/) · `POST /api/v1/applications/records/detail`
- [列出应用记录](/api/listApplicationRecords/) · `POST /api/v1/applications/records/list`
- [保存应用记录](/api/saveApplicationRecord/) · `POST /api/v1/applications/records/save`
- [删除应用记录](/api/deleteApplicationRecord/) · `POST /api/v1/applications/records/delete`
- [列出应用记录授权](/api/listApplicationRecordGrants/) · `POST /api/v1/applications/records/grants/list`
- [列出应用记录候选](/api/listApplicationRecordCandidates/) · `POST /api/v1/applications/records/candidates/list`
- [变更应用记录授权](/api/changeApplicationRecordGrant/) · `POST /api/v1/applications/records/grants/change`
- [列出应用记录渠道主体授权目标](/api/listApplicationRecordChannelPrincipalGrantTargets/) · `POST /api/v1/applications/records/channel-principal-grants/targets`
- [列出应用记录渠道主体授权](/api/listApplicationRecordChannelPrincipalGrants/) · `POST /api/v1/applications/records/channel-principal-grants/list`
- [授权应用记录至渠道主体](/api/grantApplicationRecordToChannelPrincipal/) · `POST /api/v1/applications/records/channel-principal-grants/grant`
- [撤销应用记录渠道主体授权](/api/revokeApplicationRecordChannelPrincipalGrant/) · `POST /api/v1/applications/records/channel-principal-grants/revoke`
- [确认应用记录](/api/confirmApplicationRecord/) · `POST /api/v1/applications/records/confirm`
- [列出应用记录确认回执](/api/listApplicationRecordConfirmations/) · `POST /api/v1/applications/records/confirmations/list`
- [创建应用业务操作](/api/createApplicationBusinessAction/) · `POST /api/v1/applications/business-actions/create`
- [建议应用业务操作责任人](/api/suggestApplicationBusinessActionAssignees/) · `POST /api/v1/applications/business-actions/suggest-assignees`
- [读取应用业务操作](/api/getApplicationBusinessAction/) · `POST /api/v1/applications/business-actions/detail`
- [列出应用业务操作](/api/listApplicationBusinessActions/) · `POST /api/v1/applications/business-actions/list`
- [办理应用业务操作](/api/transitionApplicationBusinessAction/) · `POST /api/v1/applications/business-actions/transition`

## 组织与空间 [#group-organization]

- [创建组织单元](/api/createOrganizationUnit/) · `POST /api/v1/organization/units/create`
- [读取组织单元](/api/getOrganizationUnit/) · `POST /api/v1/organization/units/detail`
- [列出组织单元](/api/listOrganizationUnits/) · `POST /api/v1/organization/units/list`
- [更新组织单元](/api/updateOrganizationUnit/) · `POST /api/v1/organization/units/update`
- [移动组织单元](/api/moveOrganizationUnit/) · `POST /api/v1/organization/units/move`
- [办理组织单元](/api/transitionOrganizationUnit/) · `POST /api/v1/organization/units/transition`
- [列出组织成员](/api/listOrganizationMembers/) · `POST /api/v1/organization/members/list`
- [列出组织成员候选](/api/listOrganizationMemberCandidates/) · `POST /api/v1/organization/members/candidates`
- [更新组织成员](/api/updateOrganizationMember/) · `POST /api/v1/organization/members/update`
- [列出组织职责](/api/listOrganizationResponsibilities/) · `POST /api/v1/organization/responsibilities/list`
- [导入组织职责](/api/importOrganizationResponsibilities/) · `POST /api/v1/organization/responsibilities/import`
- [列出组织团队](/api/listOrganizationTeams/) · `POST /api/v1/organization/teams/list`
- [读取团队组织](/api/getTeamOrganization/) · `POST /api/v1/organization/teams/detail`
- [更新团队组织](/api/updateTeamOrganization/) · `POST /api/v1/organization/teams/update`
- [列出组织审计](/api/listOrganizationAudit/) · `POST /api/v1/organization/audit/list`
- [办理协作空间](/api/transitionSpace/) · `POST /api/v1/spaces/transition`
- [列出协作空间工作项](/api/listSpaceWork/) · `POST /api/v1/spaces/work/list`
- [列出协作空间任务](/api/listSpaceTasks/) · `POST /api/v1/spaces/tasks/list`
- [创建协作空间](/api/createSpace/) · `POST /api/v1/spaces/create`
- [读取协作空间](/api/getSpace/) · `POST /api/v1/spaces/detail`
- [列出协作空间](/api/listSpaces/) · `POST /api/v1/spaces/list`
- [更新协作空间](/api/updateSpace/) · `POST /api/v1/spaces/update`
- [列出协作空间成员](/api/listSpaceMembers/) · `POST /api/v1/spaces/members/list`
- [列出协作空间资源文件夹](/api/listSpaceResourceFolders/) · `POST /api/v1/spaces/resource-folders/list`
- [创建协作空间资源文件夹](/api/createSpaceResourceFolder/) · `POST /api/v1/spaces/resource-folders/create`
- [列出协作空间资源文件归属](/api/listSpaceResourceFilePlacements/) · `POST /api/v1/spaces/resource-files/placements/list`
- [移动协作空间资源文件](/api/moveSpaceResourceFile/) · `POST /api/v1/spaces/resource-files/move`
- [列出协作空间成员候选](/api/listSpaceMemberCandidates/) · `POST /api/v1/spaces/members/candidates`
- [更新协作空间成员](/api/updateSpaceMember/) · `POST /api/v1/spaces/members/update`
- [转移协作空间所有者](/api/transferSpaceOwner/) · `POST /api/v1/spaces/owner/transfer`
- [更新协作空间参与](/api/updateSpaceParticipation/) · `POST /api/v1/spaces/participation/update`
- [列出协作空间工作项上下文](/api/listSpaceWorkContext/) · `POST /api/v1/spaces/work-context/list`
- [保存协作空间工作项上下文](/api/saveSpaceWorkContext/) · `POST /api/v1/spaces/work-context/save`
- [停用协作空间工作项上下文](/api/retireSpaceWorkContext/) · `POST /api/v1/spaces/work-context/retire`
- [列出协作空间参与团队](/api/listSpaceParticipatingTeams/) · `POST /api/v1/spaces/participation/teams`
- [邀请协作空间员工](/api/inviteSpaceEmployee/) · `POST /api/v1/spaces/participation/invite`
- [列出协作空间员工](/api/listSpaceEmployees/) · `POST /api/v1/spaces/participation/employees`
- [列出协作空间员工候选](/api/listSpaceEmployeeCandidates/) · `POST /api/v1/spaces/participation/employee-candidates`

## Agent 与运行 [#group-agents]

- [创建Agent](/api/createAgent/) · `POST /api/v1/agents/create`
- [更新Agent](/api/updateAgent/) · `POST /api/v1/agents/update`
- [读取Agent](/api/getAgent/) · `POST /api/v1/agents/detail`
- [列出Agent](/api/listAgents/) · `POST /api/v1/agents/list`
- [删除Agent](/api/deleteAgent/) · `POST /api/v1/agents/delete`
- [发布Agent](/api/publishAgent/) · `POST /api/v1/agents/publish`
- [运行Agent](/api/runAgent/) · `POST /api/v1/agents/run`
- [订阅Agent运行](/api/streamAgentRun/) · `POST /api/v1/agents/run/stream`
- [读取Agent运行](/api/getAgentRun/) · `POST /api/v1/runs/detail`
- [列出Agent运行](/api/listAgentRuns/) · `POST /api/v1/runs/list`
- [取消Agent运行](/api/cancelAgentRun/) · `POST /api/v1/runs/cancel`
- [重试Agent运行](/api/retryAgentRun/) · `POST /api/v1/runs/retry`

## Workflow 与运行 [#group-workflows]

- [创建Workflow](/api/createWorkflow/) · `POST /api/v1/workflows/create`
- [更新Workflow](/api/updateWorkflow/) · `POST /api/v1/workflows/update`
- [读取Workflow](/api/getWorkflow/) · `POST /api/v1/workflows/detail`
- [列出Workflow](/api/listWorkflows/) · `POST /api/v1/workflows/list`
- [搜索Workflow](/api/searchWorkflows/) · `POST /api/v1/workflows/search`
- [删除Workflow](/api/deleteWorkflow/) · `POST /api/v1/workflows/delete`
- [发布Workflow](/api/publishWorkflow/) · `POST /api/v1/workflows/publish`
- [运行Workflow](/api/runWorkflow/) · `POST /api/v1/workflows/run`
- [列出Workflow运行](/api/listWorkflowRuns/) · `POST /api/v1/workflows/runs/list`
- [读取Workflow运行](/api/getWorkflowRun/) · `POST /api/v1/workflows/runs/detail`
- [订阅Workflow运行](/api/streamWorkflowRun/) · `POST /api/v1/workflows/runs/stream`
- [预览Workflow更新](/api/previewWorkflowUpdate/) · `POST /api/v1/workflows/tools/update/preview`
- [采用Workflow更新](/api/applyWorkflowUpdate/) · `POST /api/v1/workflows/tools/update/apply`
- [上传Workflow开始节点引用](/api/uploadWorkflowStartRef/) · `POST /api/v1/workflows/start-node/refs/upload`

## 知识与文件处理 [#group-knowledge]

- [读取知识资料内容](/api/getKnowledgeAssetContent/) · `GET /api/v1/knowledge/assets/{asset_id}/content`
- [读取知识范围](/api/getKnowledgeScope/) · `POST /api/v1/knowledge/scopes/detail`
- [列出知识条目](/api/listKnowledgeEntries/) · `POST /api/v1/knowledge/entries/list`
- [读取知识条目](/api/getKnowledgeEntry/) · `POST /api/v1/knowledge/entries/detail`
- [保存知识条目](/api/saveKnowledgeEntry/) · `POST /api/v1/knowledge/entries/save`
- [变更知识条目状态](/api/changeKnowledgeEntryState/) · `POST /api/v1/knowledge/entries/state`
- [列出知识候选](/api/listKnowledgeCandidates/) · `POST /api/v1/knowledge/entries/candidates`
- [复核知识候选](/api/reviewKnowledgeCandidate/) · `POST /api/v1/knowledge/entries/review`
- [匹配知识回复](/api/matchKnowledgeReply/) · `POST /api/v1/knowledge/reply-rules/match`
- [创建知识库](/api/createKnowledgeBase/) · `POST /api/v1/knowledge/bases/create`
- [列出知识库](/api/listKnowledgeBases/) · `POST /api/v1/knowledge/bases/list`
- [读取知识库](/api/getKnowledgeBase/) · `POST /api/v1/knowledge/bases/detail`
- [更新知识库](/api/updateKnowledgeBase/) · `POST /api/v1/knowledge/bases/update`
- [预检知识库删除](/api/precheckKnowledgeBaseDelete/) · `POST /api/v1/knowledge/bases/delete-precheck`
- [删除知识库](/api/deleteKnowledgeBase/) · `POST /api/v1/knowledge/bases/delete`
- [列出知识文档](/api/listKnowledgeDocuments/) · `POST /api/v1/knowledge/documents/list`
- [读取知识文档](/api/getKnowledgeDocument/) · `POST /api/v1/knowledge/documents/detail`
- [更新知识文档](/api/updateKnowledgeDocument/) · `POST /api/v1/knowledge/documents/update`
- [预检知识文档删除](/api/precheckKnowledgeDocumentDelete/) · `POST /api/v1/knowledge/documents/delete-precheck`
- [删除知识文档](/api/deleteKnowledgeDocument/) · `POST /api/v1/knowledge/documents/delete`
- [读取知识删除操作](/api/getKnowledgeDeletionOperation/) · `POST /api/v1/knowledge/deletion-operations/detail`
- [搜索知识](/api/searchKnowledge/) · `POST /api/v1/knowledge/search`
- [上传知识文档](/api/uploadKnowledgeDocument/) · `POST /api/v1/knowledge/files`
- [列出知识暂存文件](/api/listKnowledgeStagedFiles/) · `POST /api/v1/knowledge/files/staged/list`
- [复查知识暂存文件](/api/recheckKnowledgeStagedFile/) · `POST /api/v1/knowledge/files/staged/recheck`
- [创建知识上传批次](/api/createKnowledgeUploadBatch/) · `POST /api/v1/knowledge/upload-batches/create`
- [列出知识上传批次](/api/listKnowledgeUploadBatches/) · `POST /api/v1/knowledge/upload-batches/list`
- [读取知识上传批次](/api/getKnowledgeUploadBatch/) · `POST /api/v1/knowledge/upload-batches/detail`
- [恢复知识上传批次](/api/resumeKnowledgeUploadBatch/) · `POST /api/v1/knowledge/upload-batches/resume`
- [重试知识上传批次](/api/retryKnowledgeUploadBatch/) · `POST /api/v1/knowledge/upload-batches/retry`
- [取消知识上传批次](/api/cancelKnowledgeUploadBatch/) · `POST /api/v1/knowledge/upload-batches/cancel`

## 文件与成果 [#group-files]

- [修订成果文件](/api/reviseArtifactFile/) · `POST /api/v1/files/revisions/create`
- [取消成果修订](/api/cancelArtifactRevision/) · `POST /api/v1/files/revisions/cancel`
- [上传文件](/api/uploadFile/) · `POST /api/v1/files/upload`
- [下载文件](/api/downloadFile/) · `GET /api/v1/files/{file_id}/download`

## HTTP 与 MCP 工具 [#group-tools]

- [列出HTTP工具定义](/api/listHTTPToolDefinitions/) · `POST /api/v1/tools/http/definitions/list`
- [读取HTTP工具定义](/api/getHTTPToolDefinition/) · `POST /api/v1/tools/http/definitions/detail`
- [保存HTTP工具定义](/api/saveHTTPToolDefinition/) · `POST /api/v1/tools/http/definitions/save`
- [删除HTTP工具定义](/api/deleteHTTPToolDefinition/) · `POST /api/v1/tools/http/definitions/delete`
- [测试HTTP工具定义](/api/testHTTPToolDefinition/) · `POST /api/v1/tools/http/definitions/test`
- [列出MCP工具定义](/api/listMCPToolDefinitions/) · `POST /api/v1/tools/mcp/definitions/list`
- [读取MCP工具定义](/api/getMCPToolDefinition/) · `POST /api/v1/tools/mcp/definitions/detail`
- [保存MCP工具定义](/api/saveMCPToolDefinition/) · `POST /api/v1/tools/mcp/definitions/save`
- [删除MCP工具定义](/api/deleteMCPToolDefinition/) · `POST /api/v1/tools/mcp/definitions/delete`
- [刷新MCP工具定义工具](/api/refreshMCPToolDefinitionTools/) · `POST /api/v1/tools/mcp/definitions/refresh`
- [列出MCP工具定义工具](/api/listMCPToolDefinitionTools/) · `POST /api/v1/tools/mcp/definitions/tools`

## 渠道与身份 [#group-channels]

- [准备应用渠道](/api/prepareApplicationChannels/) · `POST /api/v1/applications/channels/prepare`
- [创建或更新应用渠道](/api/upsertApplicationChannel/) · `POST /api/v1/applications/channels/upsert`
- [设置应用渠道启用状态](/api/setApplicationChannelEnabled/) · `POST /api/v1/applications/channels/set-enabled`
- [列出渠道身份](/api/listChannelIdentities/) · `POST /api/v1/channels/identities/list`
- [创建或更新渠道身份映射](/api/upsertChannelIdentityMapping/) · `POST /api/v1/channels/identities/upsert`
- [撤销渠道身份映射](/api/revokeChannelIdentityMapping/) · `POST /api/v1/channels/identities/revoke`
- [列出渠道身份候选](/api/listChannelIdentityCandidates/) · `POST /api/v1/channels/identities/candidates`

## 运行环境管理 [#group-environments]

- [发布运行环境版本](/api/publishEnvironmentVersion/) · `POST /api/v1/environments/versions/publish`
- [读取运行环境](/api/getEnvironment/) · `POST /api/v1/environments/detail`
- [列出运行环境](/api/listEnvironments/) · `POST /api/v1/environments/list`
- [列出运行环境版本](/api/listEnvironmentVersions/) · `POST /api/v1/environments/versions/list`
- [更新运行环境状态](/api/updateEnvironmentState/) · `POST /api/v1/environments/state/update`
- [列出运行环境协作者](/api/listEnvironmentCollaborators/) · `POST /api/v1/environments/collaborators/list`
- [列出运行环境协作者候选](/api/listEnvironmentCollaboratorCandidates/) · `POST /api/v1/environments/collaborators/candidates`
- [变更运行环境协作者](/api/changeEnvironmentCollaborator/) · `POST /api/v1/environments/collaborators/change`

## 身份认证 [#group-auth]

- [登录](/api/loginCustomer/) · `POST /api/auth/login`
- [刷新会话令牌](/api/refreshCustomerSession/) · `POST /api/auth/refresh`
- [退出当前会话](/api/logoutCustomer/) · `POST /api/auth/logout`

## 应用领域操作 [#group-modules]

- [读取应用领域操作目录](/api/listApplicationModuleOperations/) · `POST /api/v1/applications/modules/catalog`
- [调用应用领域操作](/api/callApplicationModuleOperation/) · `POST /api/v1/applications/modules/call`

## 能力目录 [#group-platform]

- [创建工作项目](/api/createOfficeProject/) · `POST /api/v1/office/projects/create`
- [列出工作项目](/api/listOfficeProjects/) · `POST /api/v1/office/projects/list`
- [更新工作项目](/api/updateOfficeProject/) · `POST /api/v1/office/projects/update`
- [归档工作项目](/api/archiveOfficeProject/) · `POST /api/v1/office/projects/archive`
- [发现Agent能力目录](/api/discoverAgentSurface/) · `POST /api/v1/meta/discover`
- [读取平台OpenAPI](/api/getCoreOpenAPI/) · `GET /api/v1/meta/openapi`
- [列出能力](/api/listCapabilities/) · `POST /api/v1/capabilities/list`