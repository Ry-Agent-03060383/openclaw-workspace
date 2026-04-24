package com.wisdom.finance.common.config;

import com.wisdom.finance.user.entity.Enterprise;
import com.wisdom.finance.user.entity.Farmer;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.entity.Bank;
import com.wisdom.finance.user.mapper.EnterpriseRepository;
import com.wisdom.finance.user.mapper.FarmerRepository;
import com.wisdom.finance.user.mapper.UserRepository;
import com.wisdom.finance.user.mapper.BankRepository;
import com.wisdom.finance.loan.entity.LoanProduct;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanProductRepository;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.bank.entity.BankProduct;
import com.wisdom.finance.bank.mapper.BankProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final FarmerRepository farmerRepository;
    private final BankRepository bankRepository;
    private final LoanProductRepository loanProductRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final BankProductRepository bankProductRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            System.out.println("数据已存在，跳过初始化");
            return;
        }

        System.out.println("开始初始化测试数据...");

        String encodedPassword = passwordEncoder.encode("123456");
        List<User> allUsers = new ArrayList<>();

        // ============ 平台管理员 ============
        User admin = createUser("admin", encodedPassword, "平台管理员",
            "13800138000", "admin@wisdom.com", User.UserType.ADMIN);
        allUsers.add(admin);

        // ============ 风控人员 ============
        User risk = createUser("risk", encodedPassword, "风控专员",
            "13800138001", "risk@wisdom.com", User.UserType.RISK_MANAGER);
        allUsers.add(risk);

        // ============ 金融机构 - 银行 ============
        User bankUser1 = createUser("bank1", encodedPassword, "中国工商银行客户经理",
            "13800138010", "icbc@wisdom.com", User.UserType.FINANCIAL_INSTITUTION);
        allUsers.add(bankUser1);

        User bankUser2 = createUser("bank2", encodedPassword, "中国农业银行客户经理",
            "13800138011", "abc@wisdom.com", User.UserType.FINANCIAL_INSTITUTION);
        allUsers.add(bankUser2);

        User bankUser3 = createUser("bank3", encodedPassword, "中国建设银行客户经理",
            "13800138012", "ccb@wisdom.com", User.UserType.FINANCIAL_INSTITUTION);
        allUsers.add(bankUser3);

        // ============ 中小企业 ============
        User enterpriseUser1 = createUser("enterprise1", encodedPassword, "北京创新科技有限公司CEO",
            "13800138020", "company1@wisdom.com", User.UserType.SME);
        allUsers.add(enterpriseUser1);

        User enterpriseUser2 = createUser("enterprise2", encodedPassword, "上海智慧数据有限公司CEO",
            "13800138021", "company2@wisdom.com", User.UserType.SME);
        allUsers.add(enterpriseUser2);

        User enterpriseUser3 = createUser("enterprise3", encodedPassword, "深圳智能制造有限公司CEO",
            "13800138022", "company3@wisdom.com", User.UserType.SME);
        allUsers.add(enterpriseUser3);

        User enterpriseUser4 = createUser("enterprise4", encodedPassword, "广州绿色农业有限公司CEO",
            "13800138023", "company4@wisdom.com", User.UserType.SME);
        allUsers.add(enterpriseUser4);

        // ============ 农户 ============
        User farmerUser1 = createUser("farmer1", encodedPassword, "农户张三",
            "13800138030", "farmer1@wisdom.com", User.UserType.FARMER);
        allUsers.add(farmerUser1);

        User farmerUser2 = createUser("farmer2", encodedPassword, "农户李四",
            "13800138031", "farmer2@wisdom.com", User.UserType.FARMER);
        allUsers.add(farmerUser2);

        User farmerUser3 = createUser("farmer3", encodedPassword, "农户王五",
            "13800138032", "farmer3@wisdom.com", User.UserType.FARMER);
        allUsers.add(farmerUser3);

        // ============ 政府部门 ============
        User government = createUser("government", encodedPassword, "金融办王主任",
            "13800138040", "gov@wisdom.com", User.UserType.GOVERNMENT);
        allUsers.add(government);

        // ============ 第三方服务商 ============
        User thirdParty1 = createUser("thirdparty1", encodedPassword, "财税服务商张经理",
            "13800138050", "tax@wisdom.com", User.UserType.THIRD_PARTY);
        allUsers.add(thirdParty1);

        User thirdParty2 = createUser("thirdparty2", encodedPassword, "法律服务商李律师",
            "13800138051", "law@wisdom.com", User.UserType.THIRD_PARTY);
        allUsers.add(thirdParty2);

        // ============ 创建银行信息 ============
        Bank bank1 = new Bank();
        bank1.setBankName("中国工商银行");
        bank1.setBankCode("ICBC");
        bank1.setContactPerson("张经理");
        bank1.setContactPhone("010-88888888");
        bank1.setAddress("北京市西城区");
        bank1.setStatus("ACTIVE");
        bankRepository.save(bank1);

        Bank bank2 = new Bank();
        bank2.setBankName("中国农业银行");
        bank2.setBankCode("ABC");
        bank2.setContactPerson("李经理");
        bank2.setContactPhone("010-88888889");
        bank2.setAddress("北京市东城区");
        bank2.setStatus("ACTIVE");
        bankRepository.save(bank2);

        Bank bank3 = new Bank();
        bank3.setBankName("中国建设银行");
        bank3.setBankCode("CCB");
        bank3.setContactPerson("王经理");
        bank3.setContactPhone("010-88888890");
        bank3.setAddress("北京市海淀区");
        bank3.setStatus("ACTIVE");
        bankRepository.save(bank3);

        // ============ 创建企业信息 ============
        Enterprise ent1 = createEnterprise(enterpriseUser1.getId(), "北京创新科技有限公司",
            "91110000MA01234567", "张三", "110101198501011234",
            new BigDecimal("5000000"), LocalDate.of(2018, 3, 15),
            "科技", "北京市海淀区", "技术开发与服务", 50, new BigDecimal("30000000"), 88, "低");

        Enterprise ent2 = createEnterprise(enterpriseUser2.getId(), "上海智慧数据有限公司",
            "91310000MA01234568", "李四", "310101198601011234",
            new BigDecimal("3000000"), LocalDate.of(2020, 6, 20),
            "信息技术", "上海市浦东新区", "大数据服务", 30, new BigDecimal("15000000"), 82, "低");

        Enterprise ent3 = createEnterprise(enterpriseUser3.getId(), "深圳智能制造有限公司",
            "91440000MA01234569", "王五", "440301198701011234",
            new BigDecimal("8000000"), LocalDate.of(2015, 9, 10),
            "智能制造", "深圳市南山区", "智能设备制造", 80, new BigDecimal("60000000"), 90, "低");

        Enterprise ent4 = createEnterprise(enterpriseUser4.getId(), "广州绿色农业有限公司",
            "91440000MA01234570", "赵六", "440101198801011234",
            new BigDecimal("2000000"), LocalDate.of(2019, 4, 5),
            "农业", "广州市白云区", "农产品种植与销售", 25, new BigDecimal("8000000"), 78, "中");

        // ============ 创建农户信息 ============
        Farmer farm1 = createFarmer(farmerUser1.getId(), "张三", "110101198501011234",
            "13800138030", "北京市朝阳区", "幸福村", "朝阳区", "北京市",
            new BigDecimal("15.5"), "粮食作物", 4, new BigDecimal("150000"), 5, 80, "低");

        Farmer farm2 = createFarmer(farmerUser2.getId(), "李四", "110101198601011234",
            "13800138031", "北京市通州区", "光明村", "通州区", "北京市",
            new BigDecimal("20.0"), "蔬菜种植", 3, new BigDecimal("180000"), 8, 85, "低");

        Farmer farm3 = createFarmer(farmerUser3.getId(), "王五", "110101198701011234",
            "13800138032", "北京市大兴区", "前进村", "大兴区", "北京市",
            new BigDecimal("30.0"), "水果种植", 5, new BigDecimal("250000"), 10, 88, "低");

        // ============ 创建贷款产品 ============
        createLoanProduct("LOAN001", "企业经营贷款", "企业贷款",
            new BigDecimal("100000"), new BigDecimal("5000000"),
            new BigDecimal("0.035"), new BigDecimal("0.065"),
            6, 36, "中小微企业", "营业执照满1年，信用记录良好",
            "AI智能评估，快速审批，无需抵押", 1);

        createLoanProduct("LOAN002", "科技企业专项贷", "企业贷款",
            new BigDecimal("500000"), new BigDecimal("10000000"),
            new BigDecimal("0.025"), new BigDecimal("0.045"),
            12, 60, "科技型企业", "高新技术企业认定，科技项目备案",
            "政府贴息，额度高，放款快", 2);

        createLoanProduct("LOAN003", "个人经营贷款", "个人贷款",
            new BigDecimal("50000"), new BigDecimal("1000000"),
            new BigDecimal("0.040"), new BigDecimal("0.080"),
            3, 24, "个人经营者", "有稳定经营收入",
            "无需抵押，线上申请，快速审批", 3);

        createLoanProduct("LOAN004", "农户专项贷款", "农户贷款",
            new BigDecimal("10000"), new BigDecimal("300000"),
            new BigDecimal("0.020"), new BigDecimal("0.040"),
            3, 24, "农户", "有土地承包合同，种植经验",
            "专项扶持，手续简便，利率优惠", 4);

        createLoanProduct("LOAN005", "农业产业链贷款", "企业贷款",
            new BigDecimal("200000"), new BigDecimal("3000000"),
            new BigDecimal("0.030"), new BigDecimal("0.050"),
            6, 36, "农业企业", "农业产业链相关企业",
            "支持农业发展，绿色通道", 5);

        // ============ 创建贷款申请 ============
        createLoanApplication(enterpriseUser1.getId(), ent1.getId(), "测试企业有限公司",
            "91110000MA01234567", new BigDecimal("2000000"), 24,
            new BigDecimal("0.045"), "企业扩大经营", LoanApplication.ApplicationStatus.APPROVED);
        createLoanApplication(enterpriseUser2.getId(), ent2.getId(), "上海智慧数据有限公司",
            "91310000MA01234568", new BigDecimal("1000000"), 12,
            new BigDecimal("0.050"), "购买设备", LoanApplication.ApplicationStatus.SUBMITTED);
        createLoanApplication(farmerUser1.getId(), farm1.getId(), "张三",
            "110101198501011234", new BigDecimal("100000"), 12,
            new BigDecimal("0.030"), "购买农机具", LoanApplication.ApplicationStatus.DRAFT);
        createLoanApplication(enterpriseUser3.getId(), ent3.getId(), "深圳智能制造有限公司",
            "91440000MA01234569", new BigDecimal("5000000"), 36,
            new BigDecimal("0.040"), "研发投入", LoanApplication.ApplicationStatus.APPROVED);

        // ============ 创建银行产品 ============
        createBankProduct("BP001", "工商银行小微企业贷款", bank1.getId(),
            "企业贷款", new BigDecimal("50000"), new BigDecimal("3000000"),
            6, 36, new BigDecimal("0.040"), new BigDecimal("0.065"),
            70, "快速审批，快速到账");
        createBankProduct("BP002", "农业银行惠农贷款", bank2.getId(),
            "农户贷款", new BigDecimal("10000"), new BigDecimal("500000"),
            3, 36, new BigDecimal("0.025"), new BigDecimal("0.045"),
            60, "专享利率，财政贴息");
        createBankProduct("BP003", "建设银行科技贷", bank3.getId(),
            "科技贷款", new BigDecimal("100000"), new BigDecimal("5000000"),
            12, 60, new BigDecimal("0.030"), new BigDecimal("0.050"),
            75, "支持科技创新");

        System.out.println("测试数据初始化完成！共创建 " + allUsers.size() + " 个用户");
    }

    private User createUser(String username, String password, String realName,
                           String phone, String email, User.UserType userType) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setRealName(realName);
        user.setPhone(phone);
        user.setEmail(email);
        user.setUserType(userType);
        user.setStatus(User.UserStatus.ACTIVE);
        user.setTenantId("system");
        return userRepository.save(user);
    }

    private Enterprise createEnterprise(Long userId, String enterpriseName, String creditCode,
                                        String legalPerson, String legalPersonId,
                                        BigDecimal registeredCapital, LocalDate establishmentDate,
                                        String industry, String address, String businessScope,
                                        int employeeCount, BigDecimal annualRevenue,
                                        int creditScore, String riskLevel) {
        Enterprise enterprise = new Enterprise();
        enterprise.setUserId(userId);
        enterprise.setEnterpriseName(enterpriseName);
        enterprise.setCreditCode(creditCode);
        enterprise.setLegalPerson(legalPerson);
        enterprise.setLegalPersonId(legalPersonId);
        enterprise.setRegisteredCapital(registeredCapital);
        enterprise.setEstablishmentDate(establishmentDate);
        enterprise.setBusinessStatus("存续");
        enterprise.setIndustry(industry);
        enterprise.setAddress(address);
        enterprise.setContactPerson(legalPerson);
        enterprise.setContactPhone("13800138000");
        enterprise.setContactEmail(enterpriseName.toLowerCase() + "@wisdom.com");
        enterprise.setBusinessScope(businessScope);
        enterprise.setEmployeeCount(employeeCount);
        enterprise.setAnnualRevenue(annualRevenue);
        enterprise.setCreditScore(creditScore);
        enterprise.setRiskLevel(riskLevel);
        enterprise.setStatus("ACTIVE");
        return enterpriseRepository.save(enterprise);
    }

    private Farmer createFarmer(Long userId, String farmerName, String idCard,
                                String phone, String address, String village,
                                String town, String county, BigDecimal landArea,
                                String farmingType, int familyMembers,
                                BigDecimal annualIncome, int farmingYears,
                                int creditScore, String riskLevel) {
        Farmer farmer = new Farmer();
        farmer.setUserId(userId);
        farmer.setFarmerName(farmerName);
        farmer.setIdCard(idCard);
        farmer.setPhone(phone);
        farmer.setAddress(address);
        farmer.setVillage(village);
        farmer.setTown(town);
        farmer.setCounty(county);
        farmer.setLandArea(landArea);
        farmer.setFarmingType(farmingType);
        farmer.setFamilyMembers(familyMembers);
        farmer.setAnnualIncome(annualIncome);
        farmer.setFarmingYears(farmingYears);
        farmer.setCreditScore(creditScore);
        farmer.setRiskLevel(riskLevel);
        farmer.setStatus("ACTIVE");
        return farmerRepository.save(farmer);
    }

    private void createLoanProduct(String productCode, String productName, String productType,
                                   BigDecimal minAmount, BigDecimal maxAmount,
                                   BigDecimal interestRateMin, BigDecimal interestRateMax,
                                   int minTerm, int maxTerm, String targetUsers,
                                   String requirements, String features, int sortOrder) {
        LoanProduct product = new LoanProduct();
        product.setProductCode(productCode);
        product.setProductName(productName);
        product.setProductType(productType);
        product.setMinAmount(minAmount);
        product.setMaxAmount(maxAmount);
        product.setInterestRateMin(interestRateMin);
        product.setInterestRateMax(interestRateMax);
        product.setMinTermMonths(minTerm);
        product.setMaxTermMonths(maxTerm);
        product.setEligibleIndustry(targetUsers);
        product.setDescription(requirements + "|" + features);
        product.setStatus("ACTIVE");
        product.setSortOrder(sortOrder);
        loanProductRepository.save(product);
    }

    private void createLoanApplication(Long userId, Long companyId, String companyName,
                                       String creditCode, BigDecimal loanAmount,
                                       int loanTerm, BigDecimal interestRate,
                                       String loanPurpose,
                                       LoanApplication.ApplicationStatus status) {
        LoanApplication application = new LoanApplication();
        application.setApplicationNo("LA" + System.currentTimeMillis());
        application.setUserId(userId);
        application.setCompanyId(companyId);
        application.setCompanyName(companyName);
        application.setCreditCode(creditCode);
        application.setLoanAmount(loanAmount);
        application.setLoanTermMonths(loanTerm);
        application.setInterestRate(interestRate);
        application.setLoanPurpose(loanPurpose);
        application.setRepaymentMethod("等额本息");
        application.setStatus(status);
        loanApplicationRepository.save(application);
    }

    private void createBankProduct(String productCode, String productName, Long bankId,
                                    String productType, BigDecimal minAmount,
                                    BigDecimal maxAmount, Integer minTermMonths,
                                    Integer maxTermMonths, BigDecimal interestRateMin,
                                    BigDecimal interestRateMax, Integer requiredCreditScore,
                                    String description) {
        BankProduct product = new BankProduct();
        product.setProductCode(productCode);
        product.setProductName(productName);
        product.setBankId(bankId);
        product.setProductType(productType);
        product.setMinAmount(minAmount);
        product.setMaxAmount(maxAmount);
        product.setMinTermMonths(minTermMonths);
        product.setMaxTermMonths(maxTermMonths);
        product.setInterestRateMin(interestRateMin);
        product.setInterestRateMax(interestRateMax);
        product.setRequiredCreditScore(requiredCreditScore);
        product.setDescription(description);
        product.setStatus("ACTIVE");
        bankProductRepository.save(product);
    }
}
