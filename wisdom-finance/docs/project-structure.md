# 智慧金服系统 - 项目目录结构

## 项目结构

```
wisdom-finance/
├── README.md
│
├── backend/                          # 后端 Spring Boot 项目
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/wisdom/finance/
│   │   │   │   ├── WisdomFinanceApplication.java   # 启动类
│   │   │   │   │
│   │   │   │   ├── common/                          # 公共模块
│   │   │   │   │   ├── entity/BaseEntity.java      # 基础实体
│   │   │   │   │   ├── enums/                       # 枚举类
│   │   │   │   │   ├── exception/                   # 异常处理
│   │   │   │   │   ├── result/                      # 统一返回结果
│   │   │   │   │   └── config/                      # 配置类
│   │   │   │   │
│   │   │   │   ├── user/                            # 用户模块
│   │   │   │   │   ├── entity/User.java             # 用户实体
│   │   │   │   │   ├── entity/Enterprise.java       # 企业实体
│   │   │   │   │   ├── entity/Bank.java             # 银行实体
│   │   │   │   │   ├── mapper/UserMapper.java       # 用户Mapper
│   │   │   │   │   ├── service/UserService.java     # 用户服务
│   │   │   │   │   ├── service/impl/UserServiceImpl.java
│   │   │   │   │   ├── controller/UserController.java
│   │   │   │   │   └── dto/UserDTO.java
│   │   │   │   │
│   │   │   │   ├── loan/                            # 贷款模块
│   │   │   │   │   ├── entity/LoanProduct.java      # 贷款产品
│   │   │   │   │   ├── entity/LoanApplication.java  # 贷款申请
│   │   │   │   │   ├── mapper/LoanMapper.java
│   │   │   │   │   ├── service/LoanService.java
│   │   │   │   │   └── controller/LoanController.java
│   │   │   │   │
│   │   │   │   ├── credit/                          # 征信评级模块
│   │   │   │   │   ├── entity/CreditReport.java     # 征信报告
│   │   │   │   │   ├── entity/CreditScore.java      # 信用评分
│   │   │   │   │   ├── service/CreditService.java
│   │   │   │   │   └── controller/CreditController.java
│   │   │   │   │
│   │   │   │   ├── monitoring/                      # 贷后监控模块
│   │   │   │   │   ├── entity/MonitoringAlert.java  # 监控预警
│   │   │   │   │   ├── entity/RepaymentRecord.java  # 还款记录
│   │   │   │   │   ├── service/MonitoringService.java
│   │   │   │   │   └── controller/MonitoringController.java
│   │   │   │   │
│   │   │   │   ├── risk/                            # 风险处置模块
│   │   │   │   │   ├── entity/RiskCase.java         # 风险案件
│   │   │   │   │   ├── entity/CollectionRecord.java # 催收记录
│   │   │   │   │   ├── service/RiskService.java
│   │   │   │   │   └── controller/RiskController.java
│   │   │   │   │
│   │   │   │   ├── ai/                              # AI客服模块
│   │   │   │   │   ├── service/AiChatService.java   # AI对话服务
│   │   │   │   │   ├── service/AiAnalysisService.java # AI分析服务
│   │   │   │   │   ├── controller/AiController.java
│   │   │   │   │   └── dto/AiRequest.java
│   │   │   │   │
│   │   │   │   └── security/                        # 安全认证模块
│   │   │   │       ├── config/SecurityConfig.java   # Spring Security配置
│   │   │   │       ├── jwt/JwtTokenProvider.java    # JWT提供者
│   │   │   │       ├── jwt/JwtAuthenticationFilter.java # JWT过滤器
│   │   │   │       └── handler/CustomAuthEntryPoint.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.yml                  # 配置文件
│   │   │
│   │   └── test/java/                               # 测试类
│   │
│   ├── build.gradle                                  # 依赖配置
│   └── pom.xml                                       # Maven配置(备选)
│
├── frontend/                         # 前端 Vue3 项目
│   ├── src/
│   │   ├── api/                          # API请求
│   │   │   ├── user.js                   # 用户API
│   │   │   ├── loan.js                   # 贷款API
│   │   │   ├── credit.js                 # 征信API
│   │   │   └── ai.js                     # AI API
│   │   ├── assets/                       # 静态资源
│   │   ├── components/                   # 公共组件
│   │   ├── composables/                  # 组合式API
│   │   ├── layouts/                      # 布局组件
│   │   ├── router/                       # 路由配置
│   │   │   └── index.js
│   │   ├── store/                        # 状态管理(Pinia)
│   │   │   ├── user.js
│   │   │   └── app.js
│   │   ├── views/                        # 页面视图
│   │   │   ├── login/                    # 登录页
│   │   │   ├── home/                     # 首页
│   │   │   ├── user/                     # 用户管理
│   │   │   ├── loan/                     # 贷款管理
│   │   │   ├── credit/                   # 征信管理
│   │   │   ├── monitoring/               # 贷后监控
│   │   │   ├── risk/                     # 风险处置
│   │   │   └── ai-chat/                  # AI客服
│   │   ├── App.vue
│   │   └── main.js
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
└── docs/                               # 文档
    ├── db-design.md                     # 数据库设计
    ├── api-design.md                    # API设计
    └── deploy.md                        # 部署文档
```

## 模块说明

| 模块 | 说明 |
|------|------|
| user | 用户系统 - 企业、银行、第三方、运营 |
| loan | 贷款服务 - 产品管理、申请、审批 |
| credit | 征信评级 - 信用评分、报告生成 |
| monitoring | 贷后监控 - 预警、还款跟踪 |
| risk | 风险处置 - 催收、诉讼 |
| ai | AI客服 - 智能问答、数据分析 |
| security | 安全认证 - JWT、权限控制 |