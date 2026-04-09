# 智慧金服系统 - 核心表结构设计

## ER图设计思路

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              智慧金服系统 ER图                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐
│  sys_user    │         │  t_enterprise │
└──────────────┘         └──────────────┘
- id (PK)              - id (PK)
- username             - name
- password             - credit_code
- real_name            - legal_person
- phone                - industry
- email                - credit_rating
- user_type            - ...
- status               
- enterprise_id (FK)  ────────────┐
- bank_id (FK)                  │
└──────────────┘                  │
                                  │
                                  ▼
┌──────────────┐         ┌──────────────┐
│  t_bank      │         │ t_loan_product│
└──────────────┘         └──────────────┘
- id (PK)              - id (PK)
- name                 - name
- code                 - bank_id (FK)
- level                - max_amount
- ...                  - interest_rate
                       - ...
                              │
                              ▼
                    ┌──────────────────┐
                    │t_loan_application│
                    └──────────────────┘
                    - id (PK)
                    - product_id (FK)
                    - enterprise_id (FK)
                    - apply_amount
                    - status
                    - ...
                              │
                              ▼
                    ┌──────────────────┐
                    │ t_credit_report  │
                    └──────────────────┘
                    - id (PK)
                    - enterprise_id (FK)
                    - credit_score
                    - report_data
                    - ...
                              │
                              ▼
                    ┌──────────────────┐
                    │ t_monitoring     │
                    └──────────────────┘
                    - id (PK)
                    - application_id (FK)
                    - alert_type
                    - alert_level
```

## 核心表结构

### 1. 用户相关表

#### 1.1 sys_user (用户表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| username | VARCHAR(50) | 用户名 | 唯一，非空 |
| password | VARCHAR(255) | 密码 | 加密存储 |
| real_name | VARCHAR(50) | 真实姓名 | |
| phone | VARCHAR(20) | 手机号 | |
| email | VARCHAR(100) | 邮箱 | |
| user_type | VARCHAR(20) | 用户类型 | ENTERPRISE/BANK/THIRD_PARTY/OPERATION |
| status | TINYINT | 状态 | 0-禁用 1-正常 |
| enterprise_id | BIGINT | 企业ID | 关联企业 |
| bank_id | BIGINT | 银行ID | 关联银行 |
| created_at | DATETIME | 创建时间 | |
| updated_at | DATETIME | 更新时间 | |

#### 1.2 t_enterprise (企业表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| name | VARCHAR(200) | 企业名称 | 非空 |
| credit_code | VARCHAR(18) | 统一社会信用代码 | 唯一 |
| legal_person | VARCHAR(50) | 法定代表人 | |
| registered_capital | DECIMAL(18,2) | 注册资本 | |
| established_date | DATE | 成立日期 | |
| industry | VARCHAR(50) | 所属行业 | |
| employee_count | INT | 员工人数 | |
| annual_revenue | DECIMAL(18,2) | 年营业额 | |
| credit_rating | VARCHAR(10) | 信用评级 | AAA/AA/A/BBB/BB/B |
| business_license | VARCHAR(500) | 营业执照 | |
| contact_person | VARCHAR(50) | 联系人 | |
| contact_phone | VARCHAR(20) | 联系电话 | |
| address | VARCHAR(500) | 地址 | |

#### 1.3 t_bank (银行表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| name | VARCHAR(200) | 银行名称 | 非空 |
| code | VARCHAR(20) | 银行代码 | 唯一 |
| level | VARCHAR(20) | 银行级别 | 国有/股份/城商 |
| address | VARCHAR(500) | 地址 | |
| contact_person | VARCHAR(50) | 联系人 | |
| contact_phone | VARCHAR(20) | 联系电话 | |

### 2. 贷款相关表

#### 2.1 t_loan_product (贷款产品表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| name | VARCHAR(100) | 产品名称 | 非空 |
| description | VARCHAR(500) | 产品描述 | |
| bank_id | BIGINT | 银行ID | 外键，非空 |
| max_amount | DECIMAL(18,2) | 最高额度 | |
| min_amount | DECIMAL(18,2) | 最低额度 | |
| interest_rate | DECIMAL(5,2) | 年利率(%) | |
| max_term_months | INT | 最长期限(月) | |
| min_term_months | INT | 最短期限(月) | |
| loan_days | INT | 放款时间(天) | |
| requirements | VARCHAR(500) | 申请条件 | |
| materials | VARCHAR(500) | 所需材料 | |
| status | VARCHAR(20) | 状态 | DRAFT/ACTIVE/INACTIVE |

#### 2.2 t_loan_application (贷款申请表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| product_id | BIGINT | 产品ID | 外键 |
| enterprise_id | BIGINT | 企业ID | 外键 |
| apply_amount | DECIMAL(18,2) | 申请金额 | 非空 |
| term_months | INT | 期限(月) | 非空 |
| purpose | VARCHAR(200) | 贷款用途 | |
| status | VARCHAR(20) | 申请状态 | SUBMITTED/REVIEWING/APPROVED/REJECTED/DISBURSED |
| review_note | VARCHAR(500) | 审核备注 | |
| reviewer_id | BIGINT | 审核人 | 外键 |
| review_time | DATETIME | 审核时间 | |
| disburse_amount | DECIMAL(18,2) | 实际放款金额 | |
| interest_rate | DECIMAL(5,2) | 实际利率 | |
| disburse_time | DATETIME | 放款时间 | |
| due_date | DATETIME | 到期日期 | |

### 3. 征信相关表

#### 3.1 t_credit_report (征信报告表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| enterprise_id | BIGINT | 企业ID | 外键 |
| report_no | VARCHAR(50) | 报告编号 | 唯一 |
| credit_score | INT | 信用评分 | 0-1000 |
| credit_rating | VARCHAR(10) | 信用等级 | |
| credit_limit | DECIMAL(18,2) | 授信额度 | |
| report_data | JSON | 报告详情 | |
| report_date | DATE | 报告日期 | |
| valid_until | DATE | 有效期至 | |

#### 3.2 t_credit_record (信用记录表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| enterprise_id | BIGINT | 企业ID | 外键 |
| record_type | VARCHAR(20) | 记录类型 | LOAN/PAYMENT/OVERDUE |
| amount | DECIMAL(18,2) | 金额 | |
| status | VARCHAR(20) | 状态 | |
| occur_date | DATE | 发生日期 | |

### 4. 贷后监控表

#### 4.1 t_monitoring_alert (监控预警表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| application_id | BIGINT | 贷款申请ID | 外键 |
| alert_type | VARCHAR(20) | 预警类型 | OVERDUE/RISK/CHANGE |
| alert_level | VARCHAR(10) | 预警级别 | LOW/MEDIUM/HIGH |
| alert_content | VARCHAR(500) | 预警内容 | |
| is_handled | TINYINT | 是否处理 | 0-否 1-是 |
| handle_note | VARCHAR(500) | 处理备注 | |

#### 4.2 t_repayment_record (还款记录表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| application_id | BIGINT | 贷款申请ID | 外键 |
| repay_date | DATE | 应还日期 | |
| actual_date | DATE | 实还日期 | |
| repay_amount | DECIMAL(18,2) | 应还金额 | |
| actual_amount | DECIMAL(18,2) | 实还金额 | |
| status | VARCHAR(20) | 状态 | NORMAL/OVERDUE |

### 5. 风险处置表

#### 5.1 t_risk_case (风险案件表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| application_id | BIGINT | 贷款申请ID | 外键 |
| case_type | VARCHAR(20) | 案件类型 | OVERDUE/DEFAULT |
| case_level | VARCHAR(10) | 案件级别 | NORMAL/SERIOUS |
| risk_amount | DECIMAL(18,2) | 风险金额 | |
| status | VARCHAR(20) | 状态 | OPEN/PROCESSING/CLOSED |
| case_date | DATE | 立案日期 | |
| close_date | DATE | 结案日期 | |

#### 5.2 t_collection_record (催收记录表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| case_id | BIGINT | 案件ID | 外键 |
| collector_id | BIGINT | 催收员ID | 外键 |
| collection_type | VARCHAR(20) | 催收方式 | PHONE/VISIT/LEGAL |
| collection_date | DATETIME | 催收时间 | |
| content | VARCHAR(500) | 催收内容 | |
| result | VARCHAR(20) | 催收结果 | PROMISED/REJECTED |

### 6. AI客服表

#### 6.1 t_chat_session (会话记录表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| user_id | BIGINT | 用户ID | 外键 |
| session_id | VARCHAR(50) | 会话ID | |
| messages | JSON | 消息记录 | |
| created_at | DATETIME | 创建时间 | |
| updated_at | DATETIME | 更新时间 | |

### 7. 系统表

#### 7.1 sys_dict (字典表)

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| id | BIGINT | 主键 | 自增 |
| dict_type | VARCHAR(50) | 字典类型 | |
| dict_label | VARCHAR(100) | 字典标签 | |
| dict_value | VARCHAR(100) | 字典值 | |
| sort | INT | 排序 | |