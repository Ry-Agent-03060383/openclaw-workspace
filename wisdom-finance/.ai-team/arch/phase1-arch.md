# Phase 1 技术架构方案

> **版本**: v1.0  
> **日期**: 2026-06-22  
> **作者**: Hermes 全域调度主控 (代 P02 系统架构师)  
> **状态**: ✅ 已发布

---

## 1. 分层架构图

```
┌─────────────────────────────────────────────────────┐
│                    Presentation Layer                   │
│  Vue 3 + Element Plus + Pinia + Vue Router             │
│  src/views/ → {dashboards/*, loan/*, credit/*, ...}    │
│  src/api/ → axios 统一封装 → HTTP → 后端 API           │
└──────────────────────┬──────────────────────────────────┘
                       │ REST API (JSON)
┌──────────────────────▼──────────────────────────────────┐
│                    Controller Layer                        │
│  @RestController → JWT Auth (SecurityContext)             │
│  → 参数校验 (@Valid) → 统一 Result<T> 返回               │
└──────────────────────┬──────────────────────────────────┘
┌──────────────────────▼──────────────────────────────────┐
│                    Service Layer                          │
│  @Service → 业务逻辑 + 事务管理 (@Transactional)         │
│  LoanService | CreditQueryService | ApprovalService | ... │
└──────────────────────┬──────────────────────────────────┘
┌──────────────────────▼──────────────────────────────────┐
│                    Repository Layer                       │
│  Spring Data JPA Repository <Entity, Long>               │
│  → H2 (dev) / MySQL (prod)                              │
└─────────────────────────────────────────────────────────┘
```

## 2. 银企对接核心流程时序图

```
企业                     后端                    银行                   数据库
 │                       │                      │                     │
 ├── POST /api/loans ───►│                      │                     │
 │   (融资需求)          │                      │                     │
 │                       ├── LoanService.create()─┬─────────────────►│
 │◄── 201 Created ───────┤                      │                     │
 │                       │                      │                     │
 │                       │                      │                     │
 │                       │◄── GET /api/bank/match ─┤                     │
 │                       │    (企业ID)           │                     │
 │                       ├── BankMatchService     │                     │
 │                       │   .match() ──────────►│                     │
 │                       │◄── 匹配产品列表 ───────┤                     │
 │◄── 匹配结果 ──────────┤                      │                     │
 │                       │                      │                     │
 ├── PUT /api/loans/{id}─►│                      │                     │
 │   (选择产品提交)      │                      │                     │
 │                       ├── LoanService.submit()─┬─────────────────►│
 │                       ├── ApprovalService      │                     │
 │                       │   .createApproval() ──►│                     │
 │                       │◄── 待审批 ─────────────┤                     │
 │                       │                      │                     │
 │                       │                      ├── GET /api/approvals─►│
 │                       │                      │    (待审批列表)       │
 │                       │◄── 审批请求 ──────────┤                     │
 │                       │                      │                     │
 │                       │◄── PUT /api/approve ──┤                     │
 │                       │    (通过)             │                     │
 │                       ├── ApprovalService     │                     │
 │                       │   .approve() ────────►│                     │
 │                       ├── LoanService         │                     │
 │                       │   .disburse() ───────►│                     │
 │                       │                      │                     │
 │◄── 放款通知 ──────────┤                      │                     │
 │                       │                      │                     │
 │                       │◄── GET /api/loans/{id} ┤                     │
 │                       │    (查询贷款状态)      │                     │
 │◄── 实时状态 ──────────┤                      │                     │
```

## 3. 前端组件树和状态流

```
App.vue
 ├── LandingPage.vue           (首页/公开展示)
 ├── LoginView.vue             (登录)
 └── MainLayout.vue            (需认证)
      ├── Sidebar              (导航菜单 - 角色驱动)
      ├── DashboardView.vue    (通用控制台 - 角色路由转发)
      │    ├── AdminDashboard.vue      (管理员)
      │    ├── FarmerDashboard.vue     (农户)
      │    ├── SmeDashboard.vue        (中小企业)
      │    ├── BankDashboard.vue       (银行)
      │    ├── GovDashboard.vue        (政府)
      │    ├── RiskDashboard.vue       (风控)
      │    └── ThirdPartyDashboard.vue (第三方)
      ├── LoanView.vue         (贷款管理)
      ├── CreditView.vue       (征信评级)
      ├── RiskView.vue         (风险评估)
      ├── MonitoringView.vue   (贷后监控)
      ├── AiChatView.vue       (AI 客服)
      ├── UserView.vue         (用户管理)
      └── NotificationView.vue (通知中心)
```

### 状态流
```
Pinia Store (src/store/user.ts)
  └─ userStore: { user, token, isLoggedIn, role, ... }

API 层 (src/api/*.ts)
  └─ 每个模块一个 .ts 文件
     ├─ request.ts (axios 实例 + interceptor)
     ├─ auth.ts    (login/register/logout)
     ├─ loan.ts    (CRUD loans)
     ├─ credit.ts  (credit reports/scores)
     ├─ risk.ts    (risk evaluations)
     ├─ dashboard.ts (dashboard data)
     ├─ user.ts    (user management)
     ├─ notification.ts (notifications)
     └─ ai.ts      (AI chat)
```

## 4. 测试架构

### 4.1 依赖配置 (pom.xml 已有)
JUnit 5 + Mockito + Spring Boot Test 已在 pom.xml 中配置。

### 4.2 添加 JaCoCo 插件
```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.11</version>
    <executions>
        <execution>
            <id>prepare-agent</id>
            <goals><goal>prepare-agent</goal></goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals><goal>report</goal></goals>
        </execution>
    </executions>
</plugin>
```

### 4.3 测试类模板
```java
@ExtendWith(MockitoExtension.class)
class XxxServiceTest {

    @Mock
    private XxxRepository xxxRepository;

    @InjectMocks
    private XxxService xxxService;

    // 测试正常路径
    @Test
    void shouldCreateEntitySuccessfully() { ... }

    // 测试异常路径
    @Test
    void shouldThrowExceptionWhenEntityNotFound() { ... }

    // 测试边界条件
    @Test
    void shouldHandleEmptyListGracefully() { ... }
}
```

### 4.4 需测试的 Service 类清单
| # | Service 类 | 模块 | 优先级 |
|---|-----------|------|--------|
| 1 | UserService | user | P0 |
| 2 | LoanService | loan | P0 |
| 3 | CreditQueryService | credit | P0 |
| 4 | CreditReportService | credit | P0 |
| 5 | CreditScoreModelService | credit | P1 |
| 6 | RiskService | risk | P0 |
| 7 | RiskScoreCalculator | risk | P1 |
| 8 | ApprovalService | approval | P0 |
| 9 | GuaranteeService | guarantee | P1 |
| 10 | BankService | bank | P1 |
| 11 | BankMatchService | bank | P0 |
| 12 | AdminService | admin | P1 |
| 13 | NotificationService | notification | P1 |
| 14 | SubscriptionService | subscription | P2 |
| 15 | ThirdPartyServiceService | thirdparty | P2 |
| 16 | DashboardService | dashboard | P0 |

## 5. API 接口规范

### 5.1 统一响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

### 5.2 分页响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "content": [],
    "totalElements": 100,
    "totalPages": 10,
    "number": 0,
    "size": 10
  }
}
```

### 5.3 核心 API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/auth/login | 登录 |
| POST | /api/auth/register | 注册 |
| GET | /api/users | 用户列表（管理） |
| GET | /api/dashboard/stats | 仪表盘统计数据 |
| POST | /api/loans | 创建贷款申请 |
| GET | /api/loans | 贷款列表 |
| GET | /api/loans/{id} | 贷款详情 |
| PUT | /api/loans/{id}/submit | 提交申请 |
| POST | /api/bank/match | 产品匹配 |
| GET | /api/bank/products | 银行产品列表 |
| POST | /api/credit/report | 生成征信报告 |
| GET | /api/credit/report/{id} | 报告详情 |
| GET | /api/credit/score | 信用评分 |
| POST | /api/approvals | 创建审批 |
| PUT | /api/approvals/{id} | 审批操作 |
| GET | /api/guarantees | 担保列表 |
| POST | /api/risks/evaluate | 风险评估 |
| POST | /api/ai/chat | AI 对话 |
| GET | /api/notifications | 通知列表 |

## 6. 数据模型变更（Phase 1）

当前数据模型基本完成，Phase 1 仅需以下微调：

### LoanApplication 补充字段
```java
// 新增
private String matchingProductId;    // 匹配的银行产品ID
private LocalDateTime submittedAt;   // 提交时间
private String rejectReason;         // 驳回原因
private BigDecimal disbursedAmount;  // 放款金额
private LocalDateTime disbursedAt;   // 放款时间
```

### Approval 审批状态机
```
DRAFT → REVIEW → APPROVED → DISBURSED
               → REJECTED
               → RETURN_FOR_SUPPLEMENT
```

## 7. 技术要点和注意事项

1. **测试隔离**：Mockito 测试不加载 Spring Context，使用 @ExtendWith(MockitoExtension.class)
2. **前端数据流**：所有 API 调用通过 src/api/request.ts 的 axios 实例，自动处理 JWT token 注入和 401 跳转
3. **角色路由**：Dashboard 根据 user.role 动态渲染对应组件
4. **异常统一**：GlobalExceptionHandler 捕获所有异常并返回统一格式
5. **事务管理**：贷款申请-放款流程使用 @Transactional(rollbackFor = Exception.class)
6. **空安全**：前端所有列表页需要处理 null/空数据状态，展示 Element Plus 空状态组件
7. **加载态**：所有数据请求异步显示 el-skeleton 或 loading 状态
8. **前端跨域**：CorsConfig 已配置，Vite proxy 可选