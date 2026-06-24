# 发布计划 · Phase 3

> **计划人**: P11 发布经理 Agent  
> **版本**: v1.0.0  
> **计划日期**: 2026-06-22  

---

## 一、发布范围

| 模块 | 版本 | 变更类型 | 说明 |
|------|:----:|:--------:|------|
| 后端服务 | v1.0.0 | 🆕 首次发布 | 15 个模块，101 个 Java 文件 |
| 前端应用 | v1.0.0 | 🆕 首次发布 | 19 个页面，7 角色 Dashboard |
| 数据库 | v1.0.0 | 🆕 首次发布 | 20 张表初始化 |
| CI/CD | v1.0.0 | 🆕 首次发布 | 3 个 GitHub Actions 流水线 |

## 二、发布检查清单

| # | 检查项 | 责任岗 | 状态 | 签字 |
|---|--------|:------:|:----:|:----:|
| 1 | 后端编译通过 | P04 | ✅ | Hermes |
| 2 | 全部 51 个测试通过 | P06 | ✅ | Hermes |
| 3 | 代码审查通过 | P08 | ✅ | Hermes |
| 4 | 安全审计通过 | P10 | ✅ | Hermes |
| 5 | 文档完整 | P09 | ✅ | Hermes |
| 6 | API 文档 100% 覆盖 | P09 | ✅ | Hermes |
| 7 | 回滚方案制定 | P07 | ✅ | Hermes |
| 8 | Release Notes 签发 | P11 | ✅ | Hermes |

## 三、发布步骤

### 步骤 1: 代码标签
```bash
git tag -a v1.0.0 -m "智慧金服系统 v1.0.0 — 首次发布"
git push origin v1.0.0
```

### 步骤 2: CI/CD 构建
- GitHub Actions 自动触发 backend-ci.yml + frontend-ci.yml
- 构建通过后触发 deploy.yml 构建 Docker 镜像

### 步骤 3: 数据库初始化
```bash
# 创建数据库
mysql -u root -p -e "CREATE DATABASE wisdom_finance DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;"
# 执行迁移
mysql -u root -p wisdom_finance < backend/src/main/resources/db/migration/V1__init_schema.sql
```

### 步骤 4: 部署后端
```bash
docker run -d --name wisdom-finance \
  -p 8080:8080 \
  -e MYSQL_ROOT_PASSWORD=your_password \
  -e JWT_SECRET=your_jwt_secret \
  wisdom-finance-backend:latest
```

### 步骤 5: 部署前端
```bash
cd frontend
npm run build
# 将 dist/ 目录部署到 Nginx/Apache/CDN
```

## 四、回滚方案

| 场景 | 回滚步骤 | 预估时间 |
|------|----------|:--------:|
| 功能异常 | 停止新容器，启动上一个版本容器 | 5 分钟 |
| 数据库问题 | 执行回滚 SQL 或恢复备份 | 15 分钟 |
| 前端问题 | 切换 CDN 回滚到上一版本 | 3 分钟 |

## 五、Release Notes

```
版本: v1.0.0
日期: 2026-06-22
类型: 首次发布

### 新增功能
- 用户系统：7 角色体系（管理员/企业/银行/农户/政府/风控/第三方）
- 贷款服务：申请、审核、审批全流程管理
- 征信评级：企业信用评分、征信报告生成
- 风险处置：多维风险评估、贷后监控预警
- 银企对接：银行产品智能匹配、融资需求发布
- AI 智能客服：多角色定制化政策咨询
- 通知中心：站内信通知系统
- 7 个角色定制化 Dashboard

### 技术特性
- 后端: Spring Boot 3.2 + JPA + JWT + JaCoCo
- 前端: Vue 3 + TypeScript + Vite + Element Plus + Pinia
- 测试: 51 个后端单元测试，100% 通过
- 部署: Docker + GitHub Actions CI/CD
- 安全: OWASP Top 10 B 级

### 已知问题
- 登录接口暂无速率限制（Phase 4 修复）
- 密码复杂度策略待增强（Phase 4 修复）
```
