-- 测试账户数据
-- 密码统一为: 123456

-- 平台管理员
INSERT INTO t_user (id, username, password, real_name, phone, email, user_type, status, tenant_id, created_at, updated_at)
VALUES (1, 'admin', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '平台管理员', '13800138000', 'admin@wisdom.com', 'ADMIN', 'ACTIVE', 'system', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    real_name = '平台管理员',
    phone = '13800138000',
    email = 'admin@wisdom.com',
    user_type = 'ADMIN',
    status = 'ACTIVE',
    updated_at = NOW();

-- 风控人员
INSERT INTO t_user (id, username, password, real_name, phone, email, user_type, status, tenant_id, created_at, updated_at)
VALUES (2, 'risk', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '风控专员', '13800138001', 'risk@wisdom.com', 'RISK_MANAGER', 'ACTIVE', 'system', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    real_name = '风控专员',
    phone = '13800138001',
    email = 'risk@wisdom.com',
    user_type = 'RISK_MANAGER',
    status = 'ACTIVE',
    updated_at = NOW();

-- 金融机构
INSERT INTO t_user (id, username, password, real_name, phone, email, user_type, status, tenant_id, created_at, updated_at)
VALUES (3, 'bank', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '银行客户经理', '13800138002', 'bank@wisdom.com', 'FINANCIAL_INSTITUTION', 'ACTIVE', 'system', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    real_name = '银行客户经理',
    phone = '13800138002',
    email = 'bank@wisdom.com',
    user_type = 'FINANCIAL_INSTITUTION',
    status = 'ACTIVE',
    updated_at = NOW();

-- 中小企业
INSERT INTO t_user (id, username, password, real_name, phone, email, user_type, status, tenant_id, created_at, updated_at)
VALUES (4, 'enterprise', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '企业负责人', '13800138003', 'enterprise@wisdom.com', 'SME', 'ACTIVE', 'system', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    real_name = '企业负责人',
    phone = '13800138003',
    email = 'enterprise@wisdom.com',
    user_type = 'SME',
    status = 'ACTIVE',
    updated_at = NOW();

-- 农户
INSERT INTO t_user (id, username, password, real_name, phone, email, user_type, status, tenant_id, created_at, updated_at)
VALUES (5, 'farmer', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '农户', '13800138004', 'farmer@wisdom.com', 'FARMER', 'ACTIVE', 'system', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    real_name = '农户',
    phone = '13800138004',
    email = 'farmer@wisdom.com',
    user_type = 'FARMER',
    status = 'ACTIVE',
    updated_at = NOW();

-- 政府部门
INSERT INTO t_user (id, username, password, real_name, phone, email, user_type, status, tenant_id, created_at, updated_at)
VALUES (6, 'government', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '政府工作人员', '13800138005', 'government@wisdom.com', 'GOVERNMENT', 'ACTIVE', 'system', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    real_name = '政府工作人员',
    phone = '13800138005',
    email = 'government@wisdom.com',
    user_type = 'GOVERNMENT',
    status = 'ACTIVE',
    updated_at = NOW();

-- 第三方服务商
INSERT INTO t_user (id, username, password, real_name, phone, email, user_type, status, tenant_id, created_at, updated_at)
VALUES (7, 'thirdparty', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', '第三方服务商', '13800138006', 'thirdparty@wisdom.com', 'THIRD_PARTY', 'ACTIVE', 'system', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    real_name = '第三方服务商',
    phone = '13800138006',
    email = 'thirdparty@wisdom.com',
    user_type = 'THIRD_PARTY',
    status = 'ACTIVE',
    updated_at = NOW();

-- 企业信息
INSERT INTO t_enterprise (id, user_id, enterprise_name, credit_code, legal_person, legal_person_id, registered_capital, establishment_date, business_status, industry, address, contact_person, contact_phone, contact_email, business_scope, employee_count, annual_revenue, credit_score, risk_level, status, created_at, updated_at)
VALUES (1, 4, '测试企业有限公司', '91110000MA12345678', '张三', '110101199001011234', 10000000, '2010-01-01', '存续', '科技', '北京市朝阳区', '张三', '13800138003', 'enterprise@wisdom.com', '技术开发、技术服务', 100, 50000000, 85, '低', 'ACTIVE', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    enterprise_name = '测试企业有限公司',
    credit_code = '91110000MA12345678',
    legal_person = '张三',
    legal_person_id = '110101199001011234',
    registered_capital = 10000000,
    establishment_date = '2010-01-01',
    business_status = '存续',
    industry = '科技',
    address = '北京市朝阳区',
    contact_person = '张三',
    contact_phone = '13800138003',
    contact_email = 'enterprise@wisdom.com',
    business_scope = '技术开发、技术服务',
    employee_count = 100,
    annual_revenue = 50000000,
    credit_score = 85,
    risk_level = '低',
    status = 'ACTIVE',
    updated_at = NOW();

-- 农户信息
INSERT INTO t_farmer (id, user_id, farmer_name, id_card, phone, address, village, town, county, land_area, farming_type, family_members, annual_income, credit_score, risk_level, farming_years, status, created_at, updated_at)
VALUES (1, 5, '李四', '110101198501011234', '13800138004', '北京市朝阳区农村', '幸福村', '朝阳区', '北京市', 10.5, '粮食作物', 4, 100000, 80, '低', 5, 'ACTIVE', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    farmer_name = '李四',
    id_card = '110101198501011234',
    phone = '13800138004',
    address = '北京市朝阳区农村',
    village = '幸福村',
    town = '朝阳区',
    county = '北京市',
    land_area = 10.5,
    farming_type = '粮食作物',
    family_members = 4,
    annual_income = 100000,
    credit_score = 80,
    risk_level = '低',
    farming_years = 5,
    status = 'ACTIVE',
    updated_at = NOW();
