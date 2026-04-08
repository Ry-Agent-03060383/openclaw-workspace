# 智慧金服系统 - API接口规划

## 接口规范

- **基础路径**: `/api/v1`
- **认证方式**: Bearer Token (JWT)
- **请求格式**: JSON
- **响应格式**: 统一响应结构

```json
// 成功响应
{
  "code": 200,
  "message": "success",
  "data": {}
}

// 失败响应
{
  "code": 400,
  "message": "error message",
  "data": null
}
```

---

## 一、用户系统 API

### 1.1 认证接口

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | /auth/login | 用户登录 | 公开 |
| POST | /auth/register | 用户注册 | 公开 |
| POST | /auth/logout | 退出登录 | 登录 |
| POST | /auth/refresh | 刷新Token | 登录 |
| GET | /auth/me | 获取当前用户信息 | 登录 |

### 1.2 企业管理

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /enterprises | 获取企业列表 | 运营 |
| GET | /enterprises/{id} | 获取企业详情 | 运营/企业 |
| POST | /enterprises | 创建企业信息 | 运营/企业 |
| PUT | /enterprises/{id} | 更新企业信息 | 运营/企业 |
| GET | /enterprises/{id}/credit | 获取企业信用报告 | 企业/银行/运营 |

### 1.3 银行管理

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /banks | 获取银行列表 | 公开 |
| GET | /banks/{id} | 获取银行详情 | 公开 |
| POST | /banks | 添加银行 | 运营 |
| PUT | /banks/{id} | 更新银行信息 | 运营 |
| GET | /banks/{id}/products | 获取银行产品列表 | 公开 |

### 1.4 用户管理

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /users | 获取用户列表 | 运营 |
| GET | /users/{id} | 获取用户详情 | 运营 |
| POST | /users | 创建用户 | 运营 |
| PUT | /users/{id} | 更新用户信息 | 运营 |
| PUT | /users/{id}/status | 启用/禁用用户 | 运营 |
| DELETE | /users/{id} | 删除用户 | 运营 |

---

## 二、银企对接 API

### 2.1 贷款产品

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /products | 获取产品列表 | 公开 |
| GET | /products/{id} | 获取产品详情 | 公开 |
| GET | /products/bank/{bankId} | 获取银行产品 | 公开 |
| GET | /products/recommend | 推荐产品 | 登录 |
| POST | /products | 创建产品 | 银行/运营 |
| PUT | /products/{id} | 更新产品 | 银行/运营 |
| PUT | /products/{id}/status | 上架/下架产品 | 银行/运营 |
| DELETE | /products/{id} | 删除产品 | 银行/运营 |

### 2.2 贷款申请

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /applications | 获取申请列表 | 银行/运营/企业 |
| GET | /applications/{id} | 获取申请详情 | 申请人/银行/运营 |
| POST | /applications | 提交贷款申请 | 企业 |
| PUT | /applications/{id} | 修改申请 | 企业(待审核) |
| DELETE | /applications/{id} | 撤回申请 | 企业(待审核) |
| PUT | /applications/{id}/review | 审核申请 | 银行/运营 |
| PUT | /applications/{id}/disburse | 放款 | 银行 |

### 2.3 产品申请条件匹配

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | /products/match | 智能匹配产品 | 登录 |

---

## 三、征信评级 API

### 3.1 征信报告

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /credit/reports/{enterpriseId} | 获取企业征信报告 | 企业/银行/运营 |
| POST | /credit/reports/generate | 生成征信报告 | 系统/运营 |
| GET | /credit/reports/{id}/download | 下载征信报告 | 运营/企业 |

### 3.2 信用评分

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /credit/scores/{enterpriseId} | 获取信用评分 | 企业/银行/运营 |
| POST | /credit/scores/calculate | 计算信用评分 | 运营 |

### 3.3 信用记录

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /credit/records/{enterpriseId} | 获取信用记录 | 企业/银行/运营 |
| POST | /credit/records | 添加信用记录 | 系统/运营 |

---

## 四、助贷服务 API

### 4.1 智能匹配

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | /loan/match | 贷款产品智能匹配 | 登录 |
| GET | /loan/match/history | 匹配历史 | 登录 |

### 4.2 预审服务

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | /loan/precheck | 贷款预审 | 登录 |
| GET | /loan/precheck/{id} | 预审结果 | 登录 |

### 4.3 进度查询

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /loan/progress/{applicationId} | 贷款进度 | 登录 |

---

## 五、贷后监控 API

### 5.1 预警管理

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /monitoring/alerts | 获取预警列表 | 银行/运营 |
| GET | /monitoring/alerts/{id} | 预警详情 | 银行/运营 |
| PUT | /monitoring/alerts/{id}/handle | 处理预警 | 银行/运营 |
| GET | /monitoring/alerts/pending | 待处理预警 | 银行/运营 |
| GET | /monitoring/alerts/enterprise/{id} | 企业预警 | 运营 |

### 5.2 还款管理

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /monitoring/repayments | 还款记录列表 | 银行/运营 |
| GET | /monitoring/repayments/{id} | 还款详情 | 银行/运营 |
| GET | /monitoring/repayments/overdue | 逾期列表 | 银行/运营 |
| POST | /monitoring/repayments/{id}/confirm | 确认还款 | 银行 |

### 5.3 监控看板

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /monitoring/dashboard | 监控看板数据 | 银行/运营 |
| GET | /monitoring/stats | 监控统计 | 运营 |

---

## 六、风险处置 API

### 6.1 风险案件

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /risk/cases | 风险案件列表 | 运营 |
| GET | /risk/cases/{id} | 案件详情 | 运营 |
| POST | /risk/cases | 创建风险案件 | 系统/运营 |
| PUT | /risk/cases/{id} | 更新案件 | 运营 |
| PUT | /risk/cases/{id}/status | 更新案件状态 | 运营 |

### 6.2 催收管理

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /risk/collections | 催收记录列表 | 运营 |
| GET | /risk/collections/{id} | 催收记录详情 | 运营 |
| POST | /risk/collections | 添加催收记录 | 运营 |
| GET | /risk/collections/case/{caseId} | 案件催收记录 | 运营 |
| PUT | /risk/collections/{id}/result | 更新催收结果 | 运营 |

### 6.3 统计分析

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /risk/stats | 风险统计 | 运营 |
| GET | /risk/stats/trend | 风险趋势 | 运营 |

---

## 七、AI客服 API

### 7.1 智能问答

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | /ai/chat | 发送消息 | 登录 |
| POST | /ai/chat/stream | 流式对话 | 登录 |
| GET | /ai/chat/history/{sessionId} | 会话历史 | 登录 |
| GET | /ai/chat/sessions | 会话列表 | 登录 |
| DELETE | /ai/chat/sessions/{sessionId} | 删除会话 | 登录 |

### 7.2 政策咨询

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | /ai/policy/search | 政策搜索 | 登录 |
| GET | /ai/policy/recommend | 政策推荐 | 登录 |

### 7.3 贷款咨询

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | /ai/loan/consult | 贷款咨询 | 登录 |
| POST | /ai/loan/compare | 产品对比 | 登录 |

### 7.4 数据分析

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| POST | /ai/analyze/enterprise | 企业分析 | 运营/银行 |
| POST | /ai/analyze/market | 市场分析 | 运营 |

---

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 400 | 参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 422 | 业务验证失败 |
| 500 | 服务器错误 |