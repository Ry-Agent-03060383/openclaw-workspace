-- =====================================================
-- 智慧金服系统 - 完整测试数据脚本
-- 数据库: wisdom_finance
-- =====================================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS wisdom_finance DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE wisdom_finance;

-- =====================================================
-- 用户表
-- =====================================================
INSERT INTO t_user (id, username, password, real_name, phone, email, user_type, status, tenant_id, created_at, updated_at, deleted) VALUES
(1, 'admin', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '平台管理员', '13800138000', 'admin@wisdom.com', 'ADMIN', 'ACTIVE', 'system', NOW(), NOW(), false),
(2, 'risk', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '风控专员', '13800138001', 'risk@wisdom.com', 'RISK_MANAGER', 'ACTIVE', 'system', NOW(), NOW(), false),
(3, 'bank', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '银行客户经理', '13800138002', 'bank@wisdom.com', 'FINANCIAL_INSTITUTION', 'ACTIVE', 'system', NOW(), NOW(), false),
(4, 'enterprise', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '企业负责人', '13800138003', 'enterprise@wisdom.com', 'SME', 'ACTIVE', 'system', NOW(), NOW(), false),
(5, 'farmer', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '农户', '13800138004', 'farmer@wisdom.com', 'FARMER', 'ACTIVE', 'system', NOW(), NOW(), false),
(6, 'government', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '政府工作人员', '13800138005', 'government@wisdom.com', 'GOVERNMENT', 'ACTIVE', 'system', NOW(), NOW(), false),
(7, 'thirdparty', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '第三方服务商', '13800138006', 'thirdparty@wisdom.com', 'THIRD_PARTY', 'ACTIVE', 'system', NOW(), NOW(), false),
(8, 'testuser1', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '测试企业A', '13800138010', 'test1@wisdom.com', 'SME', 'ACTIVE', 'system', NOW(), NOW(), false),
(9, 'testuser2', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '测试农户B', '13800138011', 'test2@wisdom.com', 'FARMER', 'ACTIVE', 'system', NOW(), NOW(), false),
(10, 'testuser3', '$2a$10$bk6PKuu3HBlcJhEv6zZiH.sdNxDeHKw9wDv/79.3pWATPdDy6HQw.', '测试银行C', '13800138012', 'test3@wisdom.com', 'FINANCIAL_INSTITUTION', 'ACTIVE', 'system', NOW(), NOW(), false);

-- =====================================================
-- 企业信息表
-- =====================================================
INSERT INTO t_enterprise (id, user_id, enterprise_name, credit_code, legal_person, legal_person_id, registered_capital, establishment_date, business_status, industry, address, contact_person, contact_phone, contact_email, business_scope, employee_count, annual_revenue, credit_score, risk_level, status, created_at, updated_at, deleted) VALUES
(1, 4, '测试企业有限公司', '91110000MA12345678', '张三', '110101199001011234', 10000000, '2010-01-01', '存续', '科技', '北京市朝阳区', '张三', '13800138003', 'enterprise@wisdom.com', '技术开发、技术服务', 100, 50000000, 85, '低', 'ACTIVE', NOW(), NOW(), false),
(2, 8, 'AI智能科技有限公司', '91110000MA87654321', '李四', '110101198501011234', 5000000, '2018-06-15', '存续', '人工智能', '北京市海淀区', '李四', '13800138010', 'test1@wisdom.com', 'AI技术研发', 50, 20000000, 90, '低', 'ACTIVE', NOW(), NOW(), false),
(3, 10, '创新银行股份有限公司', '91000000MA11111111', '王五', '110101197501011234', 100000000, '2005-03-20', '存续', '金融', '北京市西城区', '王五', '13800138012', 'test3@wisdom.com', '银行业务', 500, 500000000, 95, '低', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 农户信息表
-- =====================================================
INSERT INTO t_farmer (id, user_id, farmer_name, id_card, phone, address, village, town, county, land_area, farming_type, family_members, annual_income, credit_score, risk_level, farming_years, status, created_at, updated_at, deleted) VALUES
(1, 5, '李四', '110101198501011234', '13800138004', '北京市朝阳区农村', '幸福村', '朝阳区', '北京市', 10.5, '粮食作物', 4, 100000, 80, '低', 5, 'ACTIVE', NOW(), NOW(), false),
(2, 9, '王五', '110101198801011234', '13800138011', '北京市通州区农村', '光明村', '通州区', '北京市', 15.0, '蔬菜种植', 3, 150000, 85, '低', 8, 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 银行信息表
-- =====================================================
INSERT INTO t_bank (id, bank_code, bank_name, bank_type, contact_person, contact_phone, address, status, created_at, updated_at, deleted) VALUES
(1, 'BOC', '中国银行', '国有大型银行', '张经理', '010-12345678', '北京市西城区复兴门内大街1号', 'ACTIVE', NOW(), NOW(), false),
(2, 'ICBC', '工商银行', '国有大型银行', '李经理', '010-23456789', '北京市西城区复兴大街55号', 'ACTIVE', NOW(), NOW(), false),
(3, 'CCB', '建设银行', '国有大型银行', '王经理', '010-34567890', '北京市宣武区宣武门西大街28号', 'ACTIVE', NOW(), NOW(), false),
(4, 'ABC', '农业银行', '国有大型银行', '赵经理', '010-45678901', '北京市东城区建国门内大街69号', 'ACTIVE', NOW(), NOW(), false),
(5, 'BCOM', '交通银行', '股份制银行', '刘经理', '010-56789012', '北京市西城区金融街15号', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 银行产品表
-- =====================================================
INSERT INTO t_bank_product (id, bank_id, product_name, product_type, min_amount, max_amount, min_rate, max_rate, min_term, max_term, target_users, features, status, created_at, updated_at, deleted) VALUES
(1, 1, '中小微企业贷款', '企业贷款', 100000, 5000000, 0.035, 0.065, 6, 36, '中小微企业', '额度高、审批快', 'ACTIVE', NOW(), NOW(), false),
(2, 1, '个人经营贷款', '个人贷款', 50000, 1000000, 0.04, 0.08, 3, 24, '个体工商户', '无需抵押、随借随还', 'ACTIVE', NOW(), NOW(), false),
(3, 2, '科技企业贷款', '企业贷款', 500000, 10000000, 0.03, 0.055, 12, 60, '科技型企业', '政府贴息、利率优惠', 'ACTIVE', NOW(), NOW(), false),
(4, 3, '农户小额贷款', '农户贷款', 10000, 300000, 0.025, 0.05, 3, 24, '农户', '手续简、放款快', 'ACTIVE', NOW(), NOW(), false),
(5, 4, '乡村振兴贷款', '农户贷款', 50000, 500000, 0.02, 0.04, 12, 60, '农户、合作社', '专项扶持、利率低', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 贷款产品表
-- =====================================================
INSERT INTO t_loan_product (id, product_name, product_type, bank_id, min_amount, max_amount, min_rate, max_rate, min_term, max_term, target_users, requirements, features, status, created_at, updated_at, deleted) VALUES
(1, '智慧贷款-企业版', '企业贷款', 1, 100000, 5000000, 0.035, 0.065, 6, 36, '中小微企业', '营业执照满1年、信用记录良好', 'AI智能评估、快速审批', 'ACTIVE', NOW(), NOW(), false),
(2, '智慧贷款-个人版', '个人贷款', 2, 50000, 1000000, 0.04, 0.08, 3, 24, '个人经营者', '有稳定收入来源', '无需抵押、线上申请', 'ACTIVE', NOW(), NOW(), false),
(3, '智慧贷款-农户版', '农户贷款', 4, 10000, 300000, 0.025, 0.05, 3, 24, '农户', '有土地承包合同', '专项扶持、手续简便', 'ACTIVE', NOW(), NOW(), false),
(4, '科技企业发展贷', '企业贷款', 2, 500000, 10000000, 0.03, 0.055, 12, 60, '科技型企业', '高新技术企业认定', '政府贴息、额度高', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 担保机构表
-- =====================================================
INSERT INTO t_guarantee (id, guarantee_name, guarantee_type, contact_person, contact_phone, address, max_amount, fee_rate, status, created_at, updated_at, deleted) VALUES
(1, '中小企业信用担保中心', '信用担保', '陈经理', '010-88888888', '北京市朝阳区', 10000000, 0.02, 'ACTIVE', NOW(), NOW(), false),
(2, '农业发展担保公司', '农户担保', '刘经理', '010-77777777', '北京市海淀区', 500000, 0.015, 'ACTIVE', NOW(), NOW(), false),
(3, '科技企业担保基金', '科技担保', '周经理', '010-66666666', '北京市西城区', 20000000, 0.018, 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 担保申请表
-- =====================================================
INSERT INTO t_guarantee_application (id, loan_application_id, guarantee_id, applicant_name, applicant_type, guarantee_amount, guarantee_type, status, apply_date, review_date, reviewer, remark, created_at, updated_at, deleted) VALUES
(1, 1, 1, '测试企业有限公司', 'ENTERPRISE', 500000, '信用担保', 'APPROVED', '2024-01-15', '2024-01-18', 'risk', '资料齐全、符合条件', NOW(), NOW(), false),
(2, 2, 2, '李四', 'INDIVIDUAL', 100000, '农户担保', 'PENDING', '2024-02-01', NULL, NULL, '待审核', NOW(), NOW(), false);

-- =====================================================
-- 贷款申请表
-- =====================================================
INSERT INTO t_loan_application (id, user_id, product_id, bank_id, loan_amount, loan_term, loan_purpose, status, apply_date, approval_date, approver, interest_rate, remark, created_at, updated_at, deleted) VALUES
(1, 4, 1, 1, 500000, 12, '企业经营周转', 'APPROVED', '2024-01-10', '2024-01-15', 'risk', 0.05, '正常审批', NOW(), NOW(), false),
(2, 5, 3, 4, 100000, 6, '农业生产投入', 'PENDING', '2024-02-01', NULL, NULL, 0.04, '待审批', NOW(), NOW(), false),
(3, 8, 4, 2, 2000000, 24, '科技研发投入', 'APPROVED', '2024-01-20', '2024-01-25', 'risk', 0.035, '科技企业专项审批', NOW(), NOW(), false);

-- =====================================================
-- 审批规则表
-- =====================================================
INSERT INTO t_approval_rule (id, rule_code, rule_name, rule_type, condition_expression, min_score, max_score, action, priority, status, created_at, updated_at, deleted) VALUES
(1, 'RULE001', '自动通过-优质客户', 'AUTO_PASS', 'credit_score >= 85 AND risk_level = "低"', 85, 100, 'AUTO_PASS', 1, 'ACTIVE', NOW(), NOW(), false),
(2, 'RULE002', '自动拒绝-高风险', 'AUTO_REJECT', 'risk_level = "高" OR credit_score < 60', 0, 59, 'AUTO_REJECT', 99, 'ACTIVE', NOW(), NOW(), false),
(3, 'RULE003', '人工审批-中等风险', 'MANUAL_REVIEW', 'credit_score >= 60 AND credit_score < 85', 60, 84, 'MANUAL_REVIEW', 50, 'ACTIVE', NOW(), NOW(), false),
(4, 'RULE004', '大额贷款审批', 'HIGH_AMOUNT', 'loan_amount > 1000000', 0, 100, 'MANUAL_REVIEW', 30, 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 第三方服务商表
-- =====================================================
INSERT INTO t_third_party_service (id, service_name, service_type, provider_name, contact_person, contact_phone, description, price_range, status, created_at, updated_at, deleted) VALUES
(1, '财税咨询服务', '财税', '金财咨询公司', '张顾问', '010-11111111', '专业财税咨询、税务筹划', '5000-50000', 'ACTIVE', NOW(), NOW(), false),
(2, '法律顾问服务', '法律', '天平律师事务所', '李律师', '010-22222222', '企业法律顾问、合同审核', '10000-100000', 'ACTIVE', NOW(), NOW(), false),
(3, '知识产权服务', '知识产权', '智权保护中心', '王专家', '010-33333333', '专利申请、商标注册', '3000-30000', 'ACTIVE', NOW(), NOW(), false),
(4, 'IT外包服务', 'IT服务', '智慧科技公司', '赵工程师', '010-44444444', '软件开发、系统维护', '50000-500000', 'ACTIVE', NOW(), NOW(), false),
(5, '人力资源服务', '人力资源', '人力咨询公司', '钱经理', '010-55555555', '招聘代理、培训服务', '10000-100000', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 订阅服务表
-- =====================================================
INSERT INTO t_subscription_service (id, service_name, service_type, description, monthly_price, yearly_price, features, status, created_at, updated_at, deleted) VALUES
(1, '企业基础套餐', 'SUBSCRIPTION', '基础企业服务套餐', 299, 2990, '贷款申请、基础信用查询、消息通知', 'ACTIVE', NOW(), NOW(), false),
(2, '企业高级套餐', 'SUBSCRIPTION', '高级企业服务套餐', 599, 5990, '贷款申请、信用报告、AI智能匹配、优先审批', 'ACTIVE', NOW(), NOW(), false),
(3, '农户专属套餐', 'SUBSCRIPTION', '农户专享服务', 99, 990, '农户贷款、农业保险、专家咨询', 'ACTIVE', NOW(), NOW(), false),
(4, '金融机构套餐', 'SUBSCRIPTION', '银行/金融机构专用', 999, 9990, '企业推荐、批量审核、数据分析', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 订阅表
-- =====================================================
INSERT INTO t_subscription (id, user_id, service_id, subscription_type, start_date, end_date, status, created_at, updated_at, deleted) VALUES
(1, 4, 2, 'YEARLY', '2024-01-01', '2025-01-01', 'ACTIVE', NOW(), NOW(), false),
(2, 5, 3, 'MONTHLY', '2024-02-01', '2024-03-01', 'ACTIVE', NOW(), NOW(), false),
(3, 8, 2, 'YEARLY', '2024-01-15', '2025-01-15', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 信用评分模型表
-- =====================================================
INSERT INTO t_credit_score_model (id, model_name, model_type, version, description, weights, status, created_at, updated_at, deleted) VALUES
(1, '企业信用评分模型v1.0', 'ENTERPRISE', 'v1.0', '基于多维度数据的企业信用评估模型', '{"basic_info": 0.2, "credit_record": 0.3, "financial_status": 0.3, "industry_risk": 0.2}', 'ACTIVE', NOW(), NOW(), false),
(2, '农户信用评分模型v1.0', 'FARMER', 'v1.0', '针对农户群体的信用评估模型', '{"basic_info": 0.25, "credit_record": 0.25, "farming_status": 0.3, "income_stability": 0.2}', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 信用评估记录表
-- =====================================================
INSERT INTO t_risk_evaluation (id, user_id, evaluation_type, evaluation_no, credit_score, risk_level, basic_score, credit_record_score, financial_score, industry_score, evaluation_result, evaluation_date, status, created_at, updated_at, deleted) VALUES
(1, 4, 'ENTERPRISE', 'EV202401001', 85, '低', 80, 90, 85, 80, '符合准入条件', '2024-01-10', 'COMPLETED', NOW(), NOW(), false),
(2, 5, 'FARMER', 'EV202402001', 80, '低', 75, 85, 80, 75, '符合准入条件', '2024-02-01', 'COMPLETED', NOW(), NOW(), false),
(3, 8, 'ENTERPRISE', 'EV202401002', 90, '低', 88, 92, 90, 85, '优质客户', '2024-01-20', 'COMPLETED', NOW(), NOW(), false);

-- =====================================================
-- 系统配置表
-- =====================================================
INSERT INTO t_system_config (id, config_key, config_value, config_type, description, status, created_at, updated_at, deleted) VALUES
(1, 'platform.name', '焦作市智慧金融服务平台', 'STRING', '平台名称', 'ACTIVE', NOW(), NOW(), false),
(2, 'platform.version', 'v1.0.0', 'STRING', '系统版本', 'ACTIVE', NOW(), NOW(), false),
(3, 'loan.max_amount', '10000000', 'NUMBER', '最大贷款额度', 'ACTIVE', NOW(), NOW(), false),
(4, 'loan.min_amount', '10000', 'NUMBER', '最小贷款额度', 'ACTIVE', NOW(), NOW(), false),
(5, 'credit.score_threshold', '60', 'NUMBER', '信用评分准入阈值', 'ACTIVE', NOW(), NOW(), false),
(6, 'ai.enabled', 'true', 'BOOLEAN', 'AI功能开关', 'ACTIVE', NOW(), NOW(), false),
(7, 'ai.model', 'gpt-4', 'STRING', 'AI模型选择', 'ACTIVE', NOW(), NOW(), false);

-- =====================================================
-- 统计数据表
-- =====================================================
INSERT INTO t_data_statistics (id, stat_type, stat_date, stat_value, description, created_at, updated_at, deleted) VALUES
(1, 'ENTERPRISE_COUNT', '2024-02-01', 150, '入驻企业数量', NOW(), NOW(), false),
(2, 'LOAN_AMOUNT', '2024-02-01', 52000000, '累计撮合贷款金额', NOW(), NOW(), false),
(3, 'LOAN_COUNT', '2024-02-01', 128, '累计撮合贷款笔数', NOW(), NOW(), false),
(4, 'BANK_COUNT', '2024-02-01', 15, '合作银行数量', NOW(), NOW(), false),
(5, 'GUARANTEE_AMOUNT', '2024-02-01', 35000000, '担保金额', NOW(), NOW(), false);

-- =====================================================
-- 操作日志表
-- =====================================================
INSERT INTO t_admin_operation_log (id, user_id, operation_type, operation_module, operation_desc, ip_address, created_at, deleted) VALUES
(1, 1, 'LOGIN', '系统', '用户登录', '127.0.0.1', NOW(), false),
(2, 1, 'CREATE', '贷款产品', '创建贷款产品', '127.0.0.1', NOW(), false),
(3, 2, 'APPROVE', '贷款审批', '审批通过贷款申请', '127.0.0.1', NOW(), false);

-- 输出完成信息
SELECT '测试数据导入完成！' AS message;
