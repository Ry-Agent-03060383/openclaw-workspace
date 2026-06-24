# 智慧金服平台 - 模块开发进度
项目：焦作市智慧金服平台 | 开始日期：2026-04-09 | 最后更新：2026-06-16

---

## ✅ 已完成模块

| # | 模块名称 | 状态 | 说明 |
|---|----------|------|------|
| 1 | 用户系统 | ✅ 已完成 | User/Enterprise/Bank/Farmer 实体 + CRUD，支持多角色多租户 |
| 2 | 认证模块 (JWT) | ✅ 已完成 | JWT 登录/注册，Spring Security 6 + `@EnableMethodSecurity` |
| 3 | 贷款服务 | ✅ 已完成 | 贷款产品管理、贷款申请、自动/人工审批 |
| 4 | 征信评级 | ✅ 已完成 | 企业信用评分、模型管理、征信报告生成 |
| 5 | 风险评估 | ✅ 已完成 | 多维度风险评分引擎（基础资质/信用/财务/行业） |
| 6 | 审批规则引擎 | ✅ 已完成 | 5 条默认审批规则引擎（小额自动通过/大额人工等） |
| 7 | 银行管理 | ✅ 已完成 | 银行信息、银行产品、模拟银行 API 调用 |
| 8 | 担保管理 | ✅ 已完成 | 担保申请、担保记录、状态流转 |
| 9 | 订阅服务 | ✅ 已完成 | 服务目录、订阅管理、计费周期 |
| 10 | 第三方服务 | ✅ 已完成 | 第三方服务目录、订单管理、评价 |
| 11 | 通知服务 | ✅ 已完成 | 站内信/短信/邮件/微信多渠道通知 |
| 12 | 运营管理后台 | ✅ 已完成 | 操作日志、系统配置、数据统计、征信审计 |
| 13 | 统一响应/公共模块 | ✅ 已完成 | BaseEntity、Result、PageResult、RestTemplateConfig |
| 14 | Vue3 前端框架 | ✅ 已完成 | Vite + Vue 3 + Element Plus + Pinia + Router + Axios |
| 15 | 后端单元测试 | ✅ 已完成 | UserServiceTest |

## 📋 待开发

| # | 模块名称 | 状态 | 说明 |
|---|----------|------|------|
| 1 | 前端完整页面开发 | ⏳ 待完善 | Login/Home/User/Loan 已有骨架，其余待填充 |
| 2 | 移动端 | ⏳ 待开发 | 微信小程序/App |
| 3 | 银企对接完整流程 | ⏳ 待完善 | 产品匹配、需求发布 |
| 4 | AI 智能客服 | ⏳ 待开发 | OpenAI SDK 依赖已添加，业务逻辑待实现 |
| 5 | 数据分析/报表 | ⏳ 待开发 | 运营数据可视化 |
| 6 | CI/CD 流水线 | ⏳ 待配置 | GitHub Actions 已部分配置 |
| 7 | 数据库完整配置 | ⏳ 待完善 | 从 H2 迁移到 MySQL |

---

## 🛠 技术栈

| 层级 | 技术 |
|------|------|
| **后端** | Spring Boot 3.2, Spring Security 6, JPA/Hibernate, H2(dev)/MySQL(prod) |
| **认证** | JWT (jjwt 0.12.3), BCrypt |
| **构建** | Maven (pom.xml) |
| **前端** | Vue 3 + TypeScript, Vite, Element Plus, Pinia, Axios |
| **数据库** | H2 内存 (开发), MySQL 8.0 (生产) |

---

## 🚀 快速启动

### 后端
```bash
cd wisdom-finance/backend
mvn spring-boot:run
# 运行在 http://localhost:8080
# 测试账号: admin / 123456
```

### 前端
```bash
cd wisdom-finance/frontend
npm install
npm run dev
# 运行在 http://localhost:3000
```

### API 测试
```bash
# 登录获取 Token
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'

# 带 Token 访问需认证接口
curl http://localhost:8080/api/user/list \
  -H "Authorization: Bearer <token>"
```
