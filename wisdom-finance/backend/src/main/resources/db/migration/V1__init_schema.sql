-- ============================================================
-- 智慧金服平台 - 数据库初始化脚本 V1
-- Flyway Migration: V1__init_schema.sql
-- ============================================================

-- ----------------------------
-- 1. 用户表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_user (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '用户ID',
    username        VARCHAR(50)     NOT NULL COMMENT '用户名',
    password        VARCHAR(255)    NOT NULL COMMENT '密码(BCrypt加密)',
    real_name       VARCHAR(100)    DEFAULT NULL COMMENT '真实姓名',
    email           VARCHAR(100)    DEFAULT NULL COMMENT '邮箱',
    phone           VARCHAR(20)     DEFAULT NULL COMMENT '手机号',
    user_type       ENUM('ADMIN', 'ENTERPRISE', 'FARMER', 'BANK', 'COMPANY') NOT NULL DEFAULT 'ENTERPRISE' COMMENT '用户类型',
    status          ENUM('ACTIVE', 'INACTIVE', 'LOCKED') NOT NULL DEFAULT 'ACTIVE' COMMENT '状态',
    avatar_url      VARCHAR(500)    DEFAULT NULL COMMENT '头像URL',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_username (username),
    UNIQUE KEY uk_email (email),
    UNIQUE KEY uk_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- ----------------------------
-- 2. 企业信息表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_enterprise (
    id                  BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '企业ID',
    user_id             BIGINT          NOT NULL COMMENT '关联用户ID',
    enterprise_name     VARCHAR(200)    NOT NULL COMMENT '企业名称',
    credit_code         VARCHAR(18)     NOT NULL COMMENT '统一社会信用代码',
    legal_person        VARCHAR(100)    DEFAULT NULL COMMENT '法定代表人',
    registered_capital  DECIMAL(20,2)   DEFAULT NULL COMMENT '注册资本(万元)',
    establishment_date  DATE            DEFAULT NULL COMMENT '成立日期',
    business_status     VARCHAR(50)     DEFAULT NULL COMMENT '经营状态',
    industry            VARCHAR(100)    DEFAULT NULL COMMENT '所属行业',
    region_code         VARCHAR(20)     DEFAULT NULL COMMENT '地区编码',
    address             VARCHAR(300)    DEFAULT NULL COMMENT '注册地址',
    credit_score        INT             DEFAULT NULL COMMENT '信用评分',
    risk_level          VARCHAR(20)     DEFAULT NULL COMMENT '风险等级',
    annual_revenue      DECIMAL(20,2)   DEFAULT NULL COMMENT '年营收(万元)',
    employee_count      INT             DEFAULT NULL COMMENT '员工人数',
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_credit_code (credit_code),
    KEY idx_user_id (user_id),
    CONSTRAINT fk_enterprise_user FOREIGN KEY (user_id) REFERENCES t_user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='企业信息表';

-- ----------------------------
-- 3. 农户信息表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_farmer (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '农户ID',
    user_id         BIGINT          NOT NULL COMMENT '关联用户ID',
    farmer_name     VARCHAR(100)    NOT NULL COMMENT '农户姓名',
    id_card         VARCHAR(18)     DEFAULT NULL COMMENT '身份证号',
    phone           VARCHAR(20)     DEFAULT NULL COMMENT '联系电话',
    address         VARCHAR(300)    DEFAULT NULL COMMENT '家庭地址',
    land_area       DECIMAL(10,2)   DEFAULT NULL COMMENT '土地面积(亩)',
    main_crops      VARCHAR(200)    DEFAULT NULL COMMENT '主要作物',
    annual_income   DECIMAL(20,2)   DEFAULT NULL COMMENT '年收入(元)',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_id_card (id_card),
    KEY idx_user_id (user_id),
    CONSTRAINT fk_farmer_user FOREIGN KEY (user_id) REFERENCES t_user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='农户信息表';

-- ----------------------------
-- 4. 银行信息表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_bank (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '银行ID',
    user_id         BIGINT          NOT NULL COMMENT '关联用户ID',
    bank_name       VARCHAR(200)    NOT NULL COMMENT '银行名称',
    bank_code       VARCHAR(50)     NOT NULL COMMENT '银行编码',
    contact_person  VARCHAR(100)    DEFAULT NULL COMMENT '联系人',
    contact_phone   VARCHAR(20)     DEFAULT NULL COMMENT '联系电话',
    address         VARCHAR(300)    DEFAULT NULL COMMENT '地址',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_bank_code (bank_code),
    KEY idx_user_id (user_id),
    CONSTRAINT fk_bank_user FOREIGN KEY (user_id) REFERENCES t_user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='银行信息表';

-- ----------------------------
-- 5. 公共企业信息表（外部数据源）
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_company (
    id                  BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '企业ID',
    company_name        VARCHAR(200)    NOT NULL COMMENT '企业名称',
    credit_code         VARCHAR(18)     NOT NULL COMMENT '统一社会信用代码',
    legal_person        VARCHAR(100)    DEFAULT NULL COMMENT '法定代表人',
    registered_capital  DECIMAL(20,2)   DEFAULT NULL COMMENT '注册资本(万元)',
    establishment_date  DATE            DEFAULT NULL COMMENT '成立日期',
    business_status     VARCHAR(50)     DEFAULT NULL COMMENT '经营状态',
    industry            VARCHAR(100)    DEFAULT NULL COMMENT '所属行业',
    region_code         VARCHAR(20)     DEFAULT NULL COMMENT '地区编码',
    address             VARCHAR(300)    DEFAULT NULL COMMENT '注册地址',
    credit_score        INT             DEFAULT NULL COMMENT '信用评分',
    risk_level          VARCHAR(20)     DEFAULT NULL COMMENT '风险等级',
    annual_revenue      DECIMAL(20,2)   DEFAULT NULL COMMENT '年营收(万元)',
    employee_count      INT             DEFAULT NULL COMMENT '员工人数',
    data_source         VARCHAR(50)     DEFAULT NULL COMMENT '数据来源',
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_credit_code (credit_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='公共企业信息表';

-- ----------------------------
-- 6. 银行产品表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_bank_product (
    id                      BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '产品ID',
    bank_id                 BIGINT          NOT NULL COMMENT '所属银行ID',
    product_name            VARCHAR(200)    NOT NULL COMMENT '产品名称',
    product_code            VARCHAR(50)     NOT NULL COMMENT '产品编码',
    product_type            VARCHAR(50)     DEFAULT NULL COMMENT '产品类型',
    min_amount              DECIMAL(20,2)   DEFAULT NULL COMMENT '最低金额(元)',
    max_amount              DECIMAL(20,2)   DEFAULT NULL COMMENT '最高金额(元)',
    interest_rate           DECIMAL(10,4)   DEFAULT NULL COMMENT '年利率(%)',
    min_term                INT             DEFAULT NULL COMMENT '最短期限(月)',
    max_term                INT             DEFAULT NULL COMMENT '最长期限(月)',
    required_credit_score   INT             DEFAULT NULL COMMENT '要求最低信用分',
    status                  ENUM('ACTIVE', 'INACTIVE', 'DISCONTINUED') NOT NULL DEFAULT 'ACTIVE' COMMENT '状态',
    description             TEXT            DEFAULT NULL COMMENT '产品描述',
    created_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_product_code (product_code),
    KEY idx_bank_id (bank_id),
    CONSTRAINT fk_bank_product_bank FOREIGN KEY (bank_id) REFERENCES t_bank(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='银行产品表';

-- ----------------------------
-- 7. 贷款申请表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_loan_application (
    id                  BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '申请ID',
    user_id             BIGINT          NOT NULL COMMENT '申请人用户ID',
    application_no      VARCHAR(50)     NOT NULL COMMENT '申请编号',
    product_id          BIGINT          DEFAULT NULL COMMENT '产品ID',
    company_id          BIGINT          DEFAULT NULL COMMENT '企业ID(t_company)',
    company_name        VARCHAR(200)    DEFAULT NULL COMMENT '企业名称',
    credit_code         VARCHAR(18)     DEFAULT NULL COMMENT '统一社会信用代码',
    loan_amount         DECIMAL(20,2)   NOT NULL COMMENT '申请金额(元)',
    interest_rate       DECIMAL(10,4)   DEFAULT NULL COMMENT '利率(%)',
    loan_term_months    INT             NOT NULL COMMENT '贷款期限(月)',
    loan_purpose        VARCHAR(500)    DEFAULT NULL COMMENT '贷款用途',
    repayment_method    VARCHAR(50)     DEFAULT NULL COMMENT '还款方式',
    status              ENUM('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'DISBURSED', 'COMPLETED', 'OVERDUE') NOT NULL DEFAULT 'DRAFT' COMMENT '申请状态',
    credit_score        INT             DEFAULT NULL COMMENT '信用评分',
    risk_score          INT             DEFAULT NULL COMMENT '风险评分',
    risk_level          VARCHAR(20)     DEFAULT NULL COMMENT '风险等级',
    approved_amount     DECIMAL(20,2)   DEFAULT NULL COMMENT '审批金额(元)',
    review_time         DATETIME        DEFAULT NULL COMMENT '审批时间',
    reviewer_id         BIGINT          DEFAULT NULL COMMENT '审批人ID',
    review_comment      VARCHAR(500)    DEFAULT NULL COMMENT '审批意见',
    created_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at          DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_application_no (application_no),
    KEY idx_user_id (user_id),
    KEY idx_product_id (product_id),
    KEY idx_company_id (company_id),
    KEY idx_status (status),
    CONSTRAINT fk_loan_user FOREIGN KEY (user_id) REFERENCES t_user(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='贷款申请表';

-- ----------------------------
-- 8. 审批规则表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_approval_rule (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '规则ID',
    rule_code       VARCHAR(50)     NOT NULL COMMENT '规则编码',
    rule_name       VARCHAR(200)    NOT NULL COMMENT '规则名称',
    rule_condition  TEXT            NOT NULL COMMENT '规则条件(JSON/表达式)',
    rule_action     VARCHAR(100)    NOT NULL COMMENT '规则动作',
    priority        INT             NOT NULL DEFAULT 0 COMMENT '优先级(值越小优先级越高)',
    enabled         TINYINT(1)      NOT NULL DEFAULT 1 COMMENT '是否启用',
    description     VARCHAR(500)    DEFAULT NULL COMMENT '规则描述',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_rule_code (rule_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审批规则表';

-- ----------------------------
-- 9. 审批记录表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_approval_record (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    application_id  BIGINT          NOT NULL COMMENT '贷款申请ID',
    application_no  VARCHAR(50)     NOT NULL COMMENT '申请编号',
    stage           ENUM('INITIAL', 'RISK_ASSESSMENT', 'MANUAL_REVIEW', 'FINAL_APPROVAL') NOT NULL COMMENT '审批阶段',
    result          ENUM('PASS', 'REJECT', 'PENDING', 'SKIP') NOT NULL DEFAULT 'PENDING' COMMENT '审批结果',
    auto_approval   TINYINT(1)      NOT NULL DEFAULT 0 COMMENT '是否自动审批',
    reviewer_id     BIGINT          DEFAULT NULL COMMENT '审批人ID',
    rule_codes      VARCHAR(500)    DEFAULT NULL COMMENT '触发的规则编码列表(逗号分隔)',
    review_comment  VARCHAR(500)    DEFAULT NULL COMMENT '审批意见',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    KEY idx_application_id (application_id),
    KEY idx_application_no (application_no),
    CONSTRAINT fk_approval_record_application FOREIGN KEY (application_id) REFERENCES t_loan_application(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='审批记录表';

-- ----------------------------
-- 10. 担保表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_guarantee (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '担保ID',
    guarantee_no    VARCHAR(50)     NOT NULL COMMENT '担保编号',
    company_id      BIGINT          DEFAULT NULL COMMENT '担保企业ID',
    guarantee_type  VARCHAR(50)     DEFAULT NULL COMMENT '担保类型',
    guarantee_amount DECIMAL(20,2)  DEFAULT NULL COMMENT '担保金额(元)',
    status          ENUM('ACTIVE', 'EXPIRED', 'CANCELLED', 'CLAIMED') NOT NULL DEFAULT 'ACTIVE' COMMENT '担保状态',
    valid_from      DATE            DEFAULT NULL COMMENT '生效日期',
    valid_until     DATE            DEFAULT NULL COMMENT '失效日期',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_guarantee_no (guarantee_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='担保表';

-- ----------------------------
-- 11. 担保申请表（贷款与担保关联）
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_guarantee_application (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '关联ID',
    application_id  BIGINT          NOT NULL COMMENT '贷款申请ID',
    guarantee_id    BIGINT          NOT NULL COMMENT '担保ID',
    status          ENUM('PENDING', 'ACTIVE', 'RELEASED', 'CANCELLED') NOT NULL DEFAULT 'PENDING' COMMENT '关联状态',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    KEY idx_application_id (application_id),
    KEY idx_guarantee_id (guarantee_id),
    CONSTRAINT fk_ga_application FOREIGN KEY (application_id) REFERENCES t_loan_application(id) ON DELETE CASCADE,
    CONSTRAINT fk_ga_guarantee FOREIGN KEY (guarantee_id) REFERENCES t_guarantee(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='担保申请表';

-- ----------------------------
-- 12. 风险评估表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_risk_evaluation (
    id                          BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '评估ID',
    evaluation_no               VARCHAR(50)     NOT NULL COMMENT '评估编号',
    evaluation_type             VARCHAR(50)     NOT NULL COMMENT '评估类型',
    company_id                  BIGINT          DEFAULT NULL COMMENT '企业ID(t_company)',
    application_id              BIGINT          DEFAULT NULL COMMENT '贷款申请ID',
    company_name                VARCHAR(200)    DEFAULT NULL COMMENT '企业名称',
    credit_code                 VARCHAR(18)     DEFAULT NULL COMMENT '统一社会信用代码',
    risk_score                  INT             DEFAULT NULL COMMENT '综合风险评分',
    risk_level                  VARCHAR(20)     DEFAULT NULL COMMENT '风险等级',
    basic_qualification_score   INT             DEFAULT NULL COMMENT '基础资质评分',
    credit_record_score         INT             DEFAULT NULL COMMENT '信用记录评分',
    financial_status_score      INT             DEFAULT NULL COMMENT '财务状况评分',
    industry_risk_score         INT             DEFAULT NULL COMMENT '行业风险评分',
    establishment_years         INT             DEFAULT NULL COMMENT '成立年限',
    registered_capital          DECIMAL(20,2)   DEFAULT NULL COMMENT '注册资本(万元)',
    business_status             VARCHAR(50)     DEFAULT NULL COMMENT '经营状态',
    credit_score                INT             DEFAULT NULL COMMENT '信用评分',
    industry                    VARCHAR(100)    DEFAULT NULL COMMENT '所属行业',
    annual_revenue              DECIMAL(20,2)   DEFAULT NULL COMMENT '年营收(万元)',
    evaluate_time               DATETIME        DEFAULT NULL COMMENT '评估时间',
    model_version               VARCHAR(50)     DEFAULT NULL COMMENT '模型版本',
    evaluator                   VARCHAR(100)    DEFAULT NULL COMMENT '评估人/系统',
    suggestion                  VARCHAR(500)    DEFAULT NULL COMMENT '评估建议',
    risk_report                 TEXT            DEFAULT NULL COMMENT '风险评估报告(JSON)',
    created_at                  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at                  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_evaluation_no (evaluation_no),
    KEY idx_company_id (company_id),
    KEY idx_application_id (application_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='风险评估表';

-- ----------------------------
-- 13. 消息通知表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_notification (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '通知ID',
    user_id         BIGINT          NOT NULL COMMENT '接收用户ID',
    title           VARCHAR(200)    NOT NULL COMMENT '通知标题',
    content         TEXT            DEFAULT NULL COMMENT '通知内容',
    type            ENUM('SYSTEM', 'LOAN_PROGRESS', 'LOAN_RESULT', 'RISK_ALERT', 'MARKETING', 'OTHER') NOT NULL DEFAULT 'SYSTEM' COMMENT '通知类型',
    channel         ENUM('IN_APP', 'SMS', 'EMAIL', 'WECHAT') NOT NULL DEFAULT 'IN_APP' COMMENT '发送渠道',
    reference_type  VARCHAR(50)     DEFAULT NULL COMMENT '关联业务类型',
    reference_id    BIGINT          DEFAULT NULL COMMENT '关联业务ID',
    read_status     TINYINT(1)      NOT NULL DEFAULT 0 COMMENT '是否已读',
    read_at         DATETIME        DEFAULT NULL COMMENT '阅读时间',
    send_status     ENUM('PENDING', 'SENT', 'FAILED') NOT NULL DEFAULT 'PENDING' COMMENT '发送状态',
    send_at         DATETIME        DEFAULT NULL COMMENT '发送时间',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    KEY idx_user_id (user_id),
    KEY idx_read_status (read_status),
    KEY idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='消息通知表';

-- ----------------------------
-- 14. 用户订阅表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_subscription (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '订阅ID',
    user_id         BIGINT          NOT NULL COMMENT '用户ID',
    service_id      BIGINT          NOT NULL COMMENT '服务ID(t_subscription_service)',
    status          ENUM('ACTIVE', 'EXPIRED', 'CANCELLED', 'PENDING') NOT NULL DEFAULT 'PENDING' COMMENT '订阅状态',
    start_date      DATETIME        DEFAULT NULL COMMENT '开始日期',
    end_date        DATETIME        DEFAULT NULL COMMENT '结束日期',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    KEY idx_user_id (user_id),
    KEY idx_service_id (service_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户订阅表';

-- ----------------------------
-- 15. 订阅服务表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_subscription_service (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '服务ID',
    name            VARCHAR(200)    NOT NULL COMMENT '服务名称',
    code            VARCHAR(50)     NOT NULL COMMENT '服务编码',
    description     TEXT            DEFAULT NULL COMMENT '服务描述',
    price           DECIMAL(10,2)   NOT NULL DEFAULT 0.00 COMMENT '价格(元)',
    billing_cycle   VARCHAR(20)     DEFAULT NULL COMMENT '计费周期(MONTHLY/QUARTERLY/YEARLY)',
    status          ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE' COMMENT '状态',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    UNIQUE KEY uk_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订阅服务表';

-- ----------------------------
-- 16. 第三方服务表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_third_party_service (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '服务ID',
    service_name    VARCHAR(200)    NOT NULL COMMENT '服务名称',
    service_code    VARCHAR(50)     NOT NULL COMMENT '服务编码',
    service_type    VARCHAR(50)     DEFAULT NULL COMMENT '服务类型',
    provider        VARCHAR(200)    DEFAULT NULL COMMENT '服务提供商',
    description     TEXT            DEFAULT NULL COMMENT '服务描述',
    price           DECIMAL(10,2)   DEFAULT NULL COMMENT '价格(元)',
    status          ENUM('ACTIVE', 'INACTIVE', 'MAINTENANCE') NOT NULL DEFAULT 'ACTIVE' COMMENT '状态',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_service_code (service_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='第三方服务表';

-- ----------------------------
-- 17. 服务订单表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_service_order (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '订单ID',
    order_no        VARCHAR(50)     NOT NULL COMMENT '订单编号',
    user_id         BIGINT          NOT NULL COMMENT '用户ID',
    service_id      BIGINT          NOT NULL COMMENT '服务ID',
    status          ENUM('PENDING', 'PAID', 'CANCELLED', 'REFUNDED', 'COMPLETED') NOT NULL DEFAULT 'PENDING' COMMENT '订单状态',
    amount          DECIMAL(10,2)   NOT NULL COMMENT '订单金额(元)',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_order_no (order_no),
    KEY idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='服务订单表';

-- ----------------------------
-- 18. 系统配置表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_system_config (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '配置ID',
    config_key      VARCHAR(100)    NOT NULL COMMENT '配置键',
    config_value    TEXT            NOT NULL COMMENT '配置值',
    description     VARCHAR(500)    DEFAULT NULL COMMENT '配置说明',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    UNIQUE KEY uk_config_key (config_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- ----------------------------
-- 19. 管理员操作日志表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_admin_operation_log (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '日志ID',
    admin_id        BIGINT          NOT NULL COMMENT '管理员ID',
    operation       VARCHAR(100)    NOT NULL COMMENT '操作类型',
    target_type     VARCHAR(50)     DEFAULT NULL COMMENT '操作对象类型',
    target_id       BIGINT          DEFAULT NULL COMMENT '操作对象ID',
    detail          TEXT            DEFAULT NULL COMMENT '操作详情',
    ip_address      VARCHAR(50)     DEFAULT NULL COMMENT 'IP地址',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    KEY idx_admin_id (admin_id),
    KEY idx_operation (operation),
    KEY idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员操作日志表';

-- ----------------------------
-- 20. 数据统计表
-- ----------------------------
CREATE TABLE IF NOT EXISTS t_data_statistics (
    id              BIGINT          AUTO_INCREMENT PRIMARY KEY COMMENT '统计ID',
    stat_date       DATE            NOT NULL COMMENT '统计日期',
    stat_type       VARCHAR(50)     NOT NULL COMMENT '统计类型',
    stat_key        VARCHAR(100)    NOT NULL COMMENT '统计键',
    stat_value      DECIMAL(20,2)   NOT NULL DEFAULT 0.00 COMMENT '统计值',
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    KEY idx_stat_date (stat_date),
    KEY idx_stat_type (stat_type),
    KEY idx_stat_key (stat_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='数据统计表';

-- ============================================================
-- 测试数据
-- ============================================================

-- admin 用户 (密码: 123456, BCrypt加密)
INSERT INTO t_user (id, username, password, real_name, email, phone, user_type, status, avatar_url)
VALUES (1, 'admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '系统管理员', 'admin@wisdom-finance.com', '13800000000', 'ADMIN', 'ACTIVE', NULL);

-- 示例企业用户
INSERT INTO t_user (id, username, password, real_name, email, phone, user_type, status)
VALUES (2, 'enterprise01', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '张三', 'enterprise01@test.com', '13900000001', 'ENTERPRISE', 'ACTIVE');

-- 示例银行用户
INSERT INTO t_user (id, username, password, real_name, email, phone, user_type, status)
VALUES (3, 'bank01', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '李四', 'bank01@test.com', '13900000002', 'BANK', 'ACTIVE');

-- 示例企业
INSERT INTO t_enterprise (id, user_id, enterprise_name, credit_code, legal_person, registered_capital, establishment_date, business_status, industry, region_code, address, credit_score, risk_level, annual_revenue, employee_count)
VALUES (1, 2, '智信科技有限公司', '91440101MA5XXXXXX1', '张三', 1000.00, '2020-01-15', '正常', '软件和信息技术服务业', '440100', '广州市天河区科技园A栋10层', 85, 'LOW', 5000.00, 120);

-- 示例银行
INSERT INTO t_bank (id, user_id, bank_name, bank_code, contact_person, contact_phone, address)
VALUES (1, 3, '平安银行广州分行', 'PAYH_GZ', '李四', '13900000002', '广州市天河区珠江新城花城大道66号');

-- 示例银行产品
INSERT INTO t_bank_product (id, bank_id, product_name, product_code, product_type, min_amount, max_amount, interest_rate, min_term, max_term, required_credit_score, status, description)
VALUES (1, 1, '科技企业贷', 'KJQYD_001', '信用贷', 100000.00, 5000000.00, 4.3500, 3, 36, 60, 'ACTIVE', '面向科技型中小企业的纯信用贷款，额度高、放款快、利率优惠。');

-- 示例企业公共信息（用于贷款申请）
INSERT INTO t_company (id, company_name, credit_code, legal_person, registered_capital, establishment_date, business_status, industry, region_code, address, credit_score, risk_level, annual_revenue, employee_count, data_source)
VALUES (1, '智信科技有限公司', '91440101MA5XXXXXX1', '张三', 1000.00, '2020-01-15', '正常', '软件和信息技术服务业', '440100', '广州市天河区科技园A栋10层', 85, 'LOW', 5000.00, 120, '手动录入');

-- 测试贷款1: 已审批通过
INSERT INTO t_loan_application (id, user_id, application_no, product_id, company_id, company_name, credit_code, loan_amount, interest_rate, loan_term_months, loan_purpose, repayment_method, status, credit_score, risk_score, risk_level, approved_amount, review_time, reviewer_id, review_comment)
VALUES (1, 2, 'LOAN20240601001', 1, 1, '智信科技有限公司', '91440101MA5XXXXXX1', 2000000.00, 4.3500, 12, '用于AI大数据平台研发投入和团队扩张', '等额本息', 'APPROVED', 85, 25, 'LOW', 2000000.00, '2024-06-05 10:30:00', 1, '企业资质良好，信用评分85分，风险等级低，同意放款。');

-- 测试贷款2: 待审批
INSERT INTO t_loan_application (id, user_id, application_no, product_id, company_id, company_name, credit_code, loan_amount, interest_rate, loan_term_months, loan_purpose, repayment_method, status, credit_score, risk_score, risk_level)
VALUES (2, 2, 'LOAN20240620001', 1, 1, '智信科技有限公司', '91440101MA5XXXXXX1', 3000000.00, 4.5000, 24, '用于智慧金融平台二期开发与市场推广', '等额本金', 'PENDING', 85, 30, 'LOW');

-- 测试审批规则
INSERT INTO t_approval_rule (id, rule_code, rule_name, rule_condition, rule_action, priority, enabled, description)
VALUES (1, 'RISK_LOW_AUTO', '低风险自动审批', '{"riskLevel": "LOW", "creditScore": 80, "loanAmount": 5000000}', 'AUTO_APPROVE', 1, 1, '低风险且信用分80分以上、金额500万以下的贷款自动通过'),
       (2, 'RISK_HIGH_MANUAL', '高风险人工审批', '{"riskLevel": "HIGH"}', 'MANUAL_REVIEW', 2, 1, '高风险贷款必须人工审批'),
       (3, 'AMOUNT_LIMIT', '大额贷款限制', '{"loanAmount": 10000000}', 'FLAG_FOR_REVIEW', 3, 1, '金额超过1000万的贷款标记复审');

-- 测试订阅服务
INSERT INTO t_subscription_service (id, name, code, description, price, billing_cycle, status)
VALUES (1, '企业信用报告基础版', 'CREDIT_REPORT_BASIC', '提供企业基础信用报告查询服务', 99.00, 'MONTHLY', 'ACTIVE'),
       (2, '企业信用报告专业版', 'CREDIT_REPORT_PRO', '提供企业深度信用报告及风险评估', 299.00, 'MONTHLY', 'ACTIVE'),
       (3, '风险监控预警服务', 'RISK_MONITOR', '7x24小时企业风险监控与预警推送', 499.00, 'QUARTERLY', 'ACTIVE');

-- 测试第三方服务
INSERT INTO t_third_party_service (id, service_name, service_code, service_type, provider, description, price, status)
VALUES (1, '工商信息查询', 'GSXX_SERVICE', '数据查询', '国家企业信用信息公示系统', '企业工商登记信息查询接口', 0.50, 'ACTIVE'),
       (2, '司法信息查询', 'SFXX_SERVICE', '数据查询', '中国裁判文书网', '企业涉诉及司法风险信息查询', 0.80, 'ACTIVE'),
       (3, '发票验真', 'FPYZ_SERVICE', '数据核验', '国家税务总局', '增值税发票真伪核验服务', 1.00, 'ACTIVE');

-- 测试系统配置
INSERT INTO t_system_config (id, config_key, config_value, description)
VALUES (1, 'risk_evaluation_model_version', 'v2.1.0', '当前风险评估模型版本号'),
       (2, 'loan_max_amount', '50000000', '单笔贷款最大金额上限(元)'),
       (3, 'auto_approval_enabled', 'true', '是否启用自动审批功能'),
       (4, 'interest_rate_base', '3.4500', '基准年利率(%)');