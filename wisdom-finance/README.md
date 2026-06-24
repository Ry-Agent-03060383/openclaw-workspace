# 智慧金服系统 - 中小企业融资服务平台

焦作市智慧金融服务平台，连接中小微企业、农户、金融机构、政府部门和第三方服务商的一站式融资服务系统。

## 技术栈

- **后端**: Spring Boot 3.2 + Spring Security + JWT + Spring Data JPA
- **前端**: Vue 3.5 + TypeScript + Vite + Element Plus + Pinia
- **数据库**: H2 (开发) / MySQL 8.0 (生产)
- **文档**: Swagger/OpenAPI (Springdoc)
- **部署**: Docker + Kubernetes (Helm)
- **AI**: OpenAI API / 国产大模型集成 (可配置)

## 模块列表

| 模块 | 说明 | 访问路径 |
|------|------|----------|
| 用户管理 | 多角色用户体系（7种角色） | `/dashboard/user` |
| 企业管理 | 企业/农户/银行信息管理 | 内嵌于用户管理 |
| 贷款管理 | 贷款申请、审核、产品匹配 | `/dashboard/loan` |
| 征信评级 | 企业信用评分、征信报告 | `/dashboard/credit` |
| 风险处置 | 风险评估、风险报告 | `/dashboard/risk` |
| 贷后监控 | 贷款追踪、风险预警 | `/dashboard/monitoring` |
| AI客服 | 智能问答、政策咨询 | `/dashboard/ai-chat` |
| 控制台 | 角色定制化仪表盘 | `/dashboard` |

## 快速启动

### 后端 (开发环境)
```bash
cd backend
mvn spring-boot:run
# 访问: http://localhost:8080/
```

### 后端测试
```bash
cd backend
mvn test                      # 运行所有测试 (51 tests)
mvn clean test jacoco:report  # 含覆盖率报告 → target/site/jacoco/
```

### 前端 (开发环境)
```bash
cd frontend
npm install
npm run dev
# 访问: http://localhost:5173/
```

### Docker 部署
```bash
docker build -t wisdom-finance -f backend/Dockerfile backend
docker run -p 8080:8080 wisdom-finance
```

### K8s 部署 (Helm)
```bash
cd backend/deploy/k8s/helm/wisdom-finance-backend
helm install wisdom-finance . --namespace wisdom-finance --create-namespace
```

## 测试账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| admin | 123456 | 管理员 |
| enterprise1 | 123456 | 中小企业 |
| bank1 | 123456 | 金融机构 |
| farmer1 | 123456 | 农户 |
| government | 123456 | 政府部门 |
| risk | 123456 | 风控人员 |
| thirdparty1 | 123456 | 第三方服务商 |

## 环境变量

复制 `.env.example` 为 `.env` 或直接配置：

- `JWT_SECRET` - JWT 签名密钥 (默认: wisdom-finance-secret-key-2024)
- `JWT_EXPIRATION` - Token 过期时间 (默认: 86400000ms = 24h)
- `OPENAI_API_KEY` - OpenAI API 密钥 (可选，用于 AI 客服)

## API 文档

启动后端后访问: http://localhost:8080/swagger-ui.html
