# 智慧金服系统 - 商业化增值服务模块设计方案

## 🎯 模块定位

在融资平台基础上，新增商业化增值服务体系，为企业提供融资之外的数字化、会计、法律等配套服务，打造一站式企业服务平台。

---

## 📦 新增服务类型

### 1. 数字化转型服务
| 服务子类 | 说明 | 定价模式 |
|----------|------|----------|
| IT咨询 | 企业数字化转型规划、技术路线咨询 | 按次/按项目 |
| 系统集成 | ERP、CRM、MES等系统对接集成 | 按项目 |
| SaaS推荐 | 推荐适合的云服务产品 | 订阅制/抽成 |

### 2. 会计代账服务
| 服务子类 | 说明 | 定价模式 |
|----------|------|----------|
| 代理记账 | 月度/季度账务处理 | 按月订阅 |
| 税务申报 | 增值税、企业所得税等申报 | 按次/按月 |
| 财务咨询 | 财务制度设计、税务筹划 | 按次/按项目 |

### 3. 线上法律咨询服务
| 服务子类 | 说明 | 定价模式 |
|----------|------|----------|
| 合同审查 | 劳动合同、采购合同等审查 | 按份 |
| 法律咨询 | 劳动法、合同法等咨询 | 按次 |
| 诉讼指导 | 案件评估、诉讼流程指导 | 按案件 |

---

## 🏢 服务商入驻与审核机制

### 1. 服务商入驻流程

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  提交申请    │ -> │  资料审核    │ -> │  能力评估    │ -> │  签约入驻   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
     │                  │                  │                  │
     ▼                  ▼                  ▼                  ▼
  填写信息         平台初审          样单测试           开通店铺
 企业资料         资质验证          服务考核           上架服务
 服务团队         背景调查          客户反馈           开始接单
```

### 2. 服务商等级体系

| 等级 | 准入条件 | 平台抽成 | 展示权重 |
|------|----------|----------|----------|
| ⭐ 铜牌 | 完成基础认证 | 15% | 普通 |
| 🥈 银牌 | 50+订单+4.5星 | 12% | 优先 |
| 🥇 金牌 | 200+订单+4.8星 | 10% | 置顶 |
| 💎 钻石 | 500+订单+4.9星 | 8% | 推荐 |

### 3. 审核标准

#### 基础资质要求
- 企业营业执照
- 行业相关资质证书
- 固定服务团队（≥3人）
- 至少1名持证专业人员

#### 各服务类型特殊要求

| 服务类型 | 必需资质 |
|----------|----------|
| IT咨询 | 计算机信息系统集成资质/软件企业认证 |
| 系统集成 | 安防资质/系统集成资质 |
| SaaS推荐 | 厂商授权代理证书 |
| 代理记账 | 代理记账许可证 |
| 税务申报 | 税务师事务所资质 |
| 法律咨询 | 律师事务所执业许可证 |

---

## 🗂️ 服务分类与展示

### 1. 服务类目结构

```
增值服务
├── 数字化转型
│   ├── IT咨询
│   │   ├── 战略规划
│   │   ├── 技术选型
│   │   └── 流程优化
│   ├── 系统集成
│   │   ├── ERP对接
│   │   ├── 电商集成
│   │   └── 数据打通
│   └── SaaS推荐
│       ├── 协同办公
│       ├── 营销管理
│       └── 财务软件
├── 会计代账
│   ├── 代理记账
│   │   ├── 小规模纳税人
│   │   └── 一般纳税人
│   ├── 税务申报
│   │   ├── 增值税申报
│   │   ├── 企业所得税
│   │   └── 年度汇算
│   └── 财务咨询
│       ├── 税务筹划
│       └── 制度设计
└── 法律服务
    ├── 合同审查
    │   ├── 劳动合同
    │   ├── 采购合同
    │   └── 租赁合同
    ├── 法律咨询
    │   ├── 劳动法务
    │   └── 商业咨询
    └── 诉讼指导
        ├── 诉前评估
        └── 流程陪跑
```

### 2. 服务详情页展示

```markdown
【服务卡片信息】
├─ 服务名称
├─ 服务分类
├─ 服务商信息
│   ├─ 店铺名称
│   ├─ 等级标识
│   ├─ 评分 (4.8⭐)
│   └─ 成交量 (520+)
├─ 价格信息
│   ├─ 起售价 ¥999/月
│   └─ 原价 ¥1299/月
├─ 服务描述
├─ 服务流程
├─ 客户评价 (3条精选)
└─ 立即预约按钮
```

### 3. 搜索与推荐策略

- **关键词匹配**：服务名称、描述、标签
- **智能推荐**：基于企业行业、规模推荐
- **AI推荐**：根据用户行为智能推荐（见AI集成章节）

---

## 💳 在线交易系统

### 1. 交易流程

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  选择服务  │ -> │  确认订单  │ -> │  在线支付  │ -> │  开始服务  │ -> │  完成评价 │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
      │              │              │              │              │
      ▼              ▼              ▼              ▼              ▼
   浏览/搜索      填写需求       支付锁定       双方确认        评价+佣金
   服务详情       预约时间       托管资金       开始执行        结算完成
```

### 2. 订单状态流转

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  待支付  │ -> │  已支付  │ -> │  服务中  │ -> │  待确认  │ -> │ 已完成  │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
  创建订单      支付成功      服务商开始      成果交付      双方确认
                 │             服务           客户验收       完成评价
                 ▼
           资金到平台
            托管账户
```

### 3. 退款机制

| 阶段 | 退款比例 | 条件 |
|------|----------|------|
| 未开始服务 | 100% | 双方同意 |
| 服务中 | 协商 | 按已完成工作量 |
| 已完成 | 0% | 需协商 |
| 服务商原因 | 100% | 客户投诉成立 |

---

## 💰 平台抽成/佣金模式

### 1. 抽成策略

```
┌─────────────────────────────────────────────────────────┐
│                    平台佣金计算公式                        │
├─────────────────────────────────────────────────────────┤
│  平台收入 = 订单金额 × 抽成比例                            │
│                                                         │
│  服务商收入 = 订单金额 × (1 - 抽成比例)                    │
└─────────────────────────────────────────────────────────┘
```

### 2. 分级抽成比例

| 服务类别 | 铜牌 | 银牌 | 金牌 | 钻石 |
|----------|------|------|------|------|
| 数字化转型 | 15% | 12% | 10% | 8% |
| 会计代账 | 12% | 10% | 8% | 6% |
| 法律服务 | 15% | 12% | 10% | 8% |

### 3. 阶梯激励

| 月度GMV | 额外奖励 |
|---------|----------|
| ¥50,000 | 额外1%返利 |
| ¥100,000 | 额外2%返利 |
| ¥200,000 | 额外3%返利 |

### 4. 结算周期

- **账期**：服务完成后7天结算
- **提现**：每月1日、15日可申请提现
- **手续费**：提现手续费0.5%

---

## 🤖 AI客服智能推荐集成

### 1. 智能推荐场景

```
用户进入平台
      │
      ▼
┌─────────────┐
│  AI客服交互  │
└─────────────┘
      │
      ├─ 明确需求 ──> 直接推荐服务
      │
      ├─ 模糊需求 ──> 引导式提问 ──> 推荐服务
      │
      └─ 无明确需求 ─> 基于企业信息 ─> 智能推荐
```

### 2. 推荐算法

| 推荐维度 | 权重 | 数据来源 |
|----------|------|----------|
| 企业行业 | 30% | 企业认证信息 |
| 企业规模 | 25% | 年营业额/员工数 |
| 近期行为 | 20% | 浏览/搜索记录 |
| 相似企业 | 15% | 同行业采购数据 |
| 评分口碑 | 10% | 服务商评价 |

### 3. AI客服集成方案

#### 3.1 对话能力

```
【AI客服功能矩阵】
├─ 服务咨询
│   ├─ 服务介绍
│   ├─ 价格查询
│   └─ 流程说明
├─ 需求匹配
│   ├─ 智能问答
│   ├─ 需求引导
│   └─ 个性化推荐
├─ 订单服务
│   ├─ 订单查询
│   ├─ 进度跟进
│   └─ 投诉受理
└─ 营销触达
    ├─ 新服务推送
    └─ 优惠活动通知
```

#### 3.2 智能推荐示例

```markdown
【对话场景】
用户：最近感觉记账有点乱
AI：了解，您是需要代账服务吗？我们提供：
   1. 代理记账（小规模纳税人）¥299/月
   2. 代理记账（一般纳税人）¥599/月
   3. 税务健康检查（免费）
   请问您是企业类型是？

用户：一般纳税人
AI：为您推荐以下服务：
   ├─ 【金牌服务商】代理记账 ¥599/月（4.9⭐）
   ├─ 税务申报套餐 ¥199/月
   └─ 免费诊断：您的企业可能需要...
   
   是否需要了解详情或直接预约？
```

#### 3.3 与现有AI客服集成

利用已有的 `t_chat_session` 表，扩展增值服务推荐能力：

```python
# AI推荐服务伪代码
def recommend_service(enterprise_info, chat_history):
    # 1. 提取用户意图
    intent = extract_intent(chat_history)
    
    # 2. 构建推荐
    if intent == "代账需求":
        # 查询匹配的服务商
        services = query_services(
            category="会计代账",
            enterprise_type=enterprise_info.type,
            rating>=4.5
        )
        return format_recommend(services)
    
    # 3. 无明确意图时智能推荐
    return intelligent_recommend(enterprise_info)
```

---

## 📊 新增数据库表结构

### 表清单

| 表名 | 说明 |
|------|------|
| t_service_provider | 服务商信息表 |
| t_service_category | 服务分类表 |
| t_service_product | 服务产品表 |
| t_service_order | 服务订单表 |
| t_service_evaluation | 服务评价表 |
| t_provider_settlement | 结算记录表 |
| t_ai_recommend_log | AI推荐日志表 |

---

### 1. t_service_provider (服务商表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| user_id | BIGINT | 关联用户ID | 外键 |
| provider_name | VARCHAR(100) | 服务商名称 | 非空 |
| provider_type | VARCHAR(20) | 服务商类型 | COMPANY/PERSONAL |
| level | VARCHAR(20) | 等级 | COPPER/SILVER/GOLD/DIAMOND |
| contact_name | VARCHAR(50) | 联系人 | |
| contact_phone | VARCHAR(20) | 联系电话 | |
| business_license | VARCHAR(500) | 营业执照 | |
| qualification_cert | VARCHAR(500) | 资质证书 | 多证 JSON |
| introduction | TEXT | 简介 | |
| service_area | VARCHAR(100) | 服务区域 | |
| team_size | INT | 团队人数 | |
| status | VARCHAR(20) | 状态 | PENDING/ACTIVE/SUSPENDED |
| credit_score | INT | 信用评分 | 0-1000 |
| total_orders | INT | 总订单数 | |
| avg_rating | DECIMAL(3,2) | 平均评分 | |
| created_at | DATETIME | 入驻时间 | |
| updated_at | DATETIME | 更新时间 | |

---

### 2. t_service_category (服务分类表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| parent_id | BIGINT | 父分类ID | 0为顶级 |
| category_name | VARCHAR(50) | 分类名称 | |
| category_code | VARCHAR(30) | 分类编码 | |
| icon | VARCHAR(100) | 图标 | |
| sort_order | INT | 排序 | |
| status | TINYINT | 状态 | 0-禁用 1-启用 |

---

### 3. t_service_product (服务产品表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| provider_id | BIGINT | 服务商ID | 外键 |
| category_id | BIGINT | 分类ID | 外键 |
| product_name | VARCHAR(100) | 产品名称 | |
| product_desc | VARCHAR(500) | 产品描述 | |
| service_content | TEXT | 服务内容 | JSON |
| price_type | VARCHAR(20) | 定价类型 | FIXED/RANGE |
| price_min | DECIMAL(10,2) | 最低价 | |
| price_max | DECIMAL(10,2) | 最高价 | |
| unit | VARCHAR(20) | 计量单位 | 次/月/项目 |
| delivery_days | INT | 交付天数 | |
| cover_image | VARCHAR(500) | 封面图 | |
| images | VARCHAR(1000) | 详情图 | JSON |
| tags | VARCHAR(200) | 标签 | |
| status | VARCHAR(20) | 状态 | DRAFT/ACTIVE/INACTIVE |
| view_count | INT | 浏览量 | |
| order_count | INT | 成交量 | |
| created_at | DATETIME | 创建时间 | |
| updated_at | DATETIME | 更新时间 | |

---

### 4. t_service_order (服务订单表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| order_no | VARCHAR(32) | 订单编号 | 唯一 |
| product_id | BIGINT | 服务产品ID | 外键 |
| provider_id | BIGINT | 服务商ID | 外键 |
| enterprise_id | BIGINT | 购买企业ID | 外键 |
| enterprise_name | VARCHAR(200) | 企业名称 | |
| contact_name | VARCHAR(50) | 联系人 | |
| contact_phone | VARCHAR(20) | 联系电话 | |
| service_requirements | TEXT | 服务需求 | |
| original_price | DECIMAL(10,2) | 原价 | |
| discount_price | DECIMAL(10,2) | 优惠价 | |
| actual_amount | DECIMAL(10,2) | 实付金额 | |
| commission_rate | DECIMAL(5,2) | 抽成比例 | |
| commission_amount | DECIMAL(10,2) | 佣金金额 | |
| status | VARCHAR(20) | 状态 | 待支付/已支付/服务中/待确认/已完成/已取消/退款中 |
| pay_time | DATETIME | 支付时间 | |
| service_start_time | DATETIME | 开始服务时间 | |
| service_end_time | DATETIME | 结束服务时间 | |
| complete_time | DATETIME | 完成时间 | |
| remark | VARCHAR(500) | 备注 | |
| created_at | DATETIME | 创建时间 | |
| updated_at | DATETIME | 更新时间 | |

---

### 5. t_service_evaluation (服务评价表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| order_id | BIGINT | 订单ID | 外键 |
| enterprise_id | BIGINT | 评价企业ID | 外键 |
| provider_id | BIGINT | 被评服务商ID | 外键 |
| product_id | BIGINT | 服务产品ID | 外键 |
| rating | DECIMAL(3,2) | 总体评分 | 1-5 |
| rating_quality | TINYINT | 质量评分 | 1-5 |
| rating_speed | TINYINT | 速度评分 | 1-5 |
| rating_attitude | TINYINT | 态度评分 | 1-5 |
| content | VARCHAR(500) | 评价内容 | |
| images | VARCHAR(500) | 评价图片 | |
| is_anonymous | TINYINT | 是否匿名 | |
| reply_content | VARCHAR(500) | 商户回复 | |
| reply_time | DATETIME | 回复时间 | |
| status | VARCHAR(20) | 状态 | DISPLAY/HIDDEN |
| created_at | DATETIME | 创建时间 | |

---

### 6. t_provider_settlement (服务商结算表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| settlement_no | VARCHAR(32) | 结算单号 | |
| provider_id | BIGINT | 服务商ID | 外键 |
| settlement_type | VARCHAR(20) | 结算类型 | ORDER/WITHDRAW |
| order_ids | VARCHAR(500) | 关联订单ID | |
| amount | DECIMAL(10,2) | 结算金额 | |
| commission_amount | DECIMAL(10,2) | 扣除佣金 | |
| fee_amount | DECIMAL(10,2) | 手续费 | |
| actual_amount | DECIMAL(10,2) | 实际到账 | |
| bank_name | VARCHAR(50) | 银行名称 | |
| bank_account | VARCHAR(30) | 银行账号 | |
| status | VARCHAR(20) | 状态 | PENDING/PROCESSING/COMPLETED/REJECTED |
| apply_time | DATETIME | 申请时间 | |
| process_time | DATETIME | 处理时间 | |
| remark | VARCHAR(200) | 备注 | |

---

### 7. t_ai_recommend_log (AI推荐日志表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| user_id | BIGINT | 用户ID | 外键 |
| session_id | VARCHAR(50) | 会话ID | |
| recommend_type | VARCHAR(20) | 推荐类型 | INTENT/PRODUCT/PROVIDER |
| input_keywords | VARCHAR(200) | 输入关键词 | |
| enterprise_info | JSON | 企业信息 | |
| recommend_result | JSON | 推荐结果 | |
| is_clicked | TINYINT | 是否点击 | |
| clicked_product_id | BIGINT | 点击产品ID | |
| created_at | DATETIME | 推荐时间 | |

---

## 🔄 与现有系统集成

### 1. 用户体系集成

- 复用 `sys_user` 表，新增用户类型 `SERVICE_PROVIDER`
- 增值服务商户使用原有登录体系

### 2. 企业信息复用

- 复用 `t_enterprise` 表识别企业客户
- 服务购买时直接关联企业信息

### 3. AI客服升级

- 扩展现有 `t_chat_session` 功能
- 新增增值服务推荐模块

### 4. 订单流水统一

- 财务流水统一管理（预留接口）

---

## 📈 运营指标

| 指标 | 目标值 |
|------|--------|
| 服务商入驻数 | 首年500+ |
| 月度GMV | ¥500万+ |
| 服务品类覆盖率 | 90%+ |
| 客户满意度 | 4.5⭐+ |
| AI推荐转化率 | 30%+ |

---

*文档版本：1.0*  
*最后更新：2026-04-07*  
*架构师：Ry_Agent06*