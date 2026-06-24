package com.wisdom.finance.common.config;

import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.entity.CreditReport;
import com.wisdom.finance.credit.entity.CreditScoreModel;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.credit.mapper.CreditReportRepository;
import com.wisdom.finance.credit.mapper.CreditScoreModelRepository;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.user.entity.Bank;
import com.wisdom.finance.user.entity.Enterprise;
import com.wisdom.finance.user.entity.GuaranteeInstitution;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.mapper.BankRepository;
import com.wisdom.finance.user.mapper.EnterpriseRepository;
import com.wisdom.finance.user.mapper.GuaranteeInstitutionRepository;
import com.wisdom.finance.user.mapper.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final UserRepository userRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final BankRepository bankRepository;
    private final PasswordEncoder passwordEncoder;
    private final CompanyRepository companyRepository;
    private final CreditScoreModelRepository creditScoreModelRepository;
    private final CreditReportRepository creditReportRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final GuaranteeInstitutionRepository guaranteeInstitutionRepository;

    @PostConstruct
    @Transactional
    public void init() {
        if (userRepository.count() > 0) {
            log.info("Database already has users, skipping initialization");
            return;
        }

        log.info("Initializing test data...");

        // 1. Admin
        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("password"));
        admin.setRealName("系统管理员");
        admin.setEmail("admin@test.com");
        admin.setPhone("13800000000");
        admin.setUserType(User.UserType.ADMIN);
        admin.setStatus(User.UserStatus.ACTIVE);
        admin.setTenantId("system");
        userRepository.save(admin);

        // 2. SME + Enterprise
        User sme = new User();
        sme.setUsername("sme");
        sme.setPassword(passwordEncoder.encode("password"));
        sme.setRealName("张企业");
        sme.setEmail("sme@test.com");
        sme.setPhone("13900000001");
        sme.setUserType(User.UserType.SME);
        sme.setStatus(User.UserStatus.ACTIVE);
        sme.setTenantId("system");
        userRepository.save(sme);

        Enterprise ent = new Enterprise();
        ent.setEnterpriseName("智信科技");
        ent.setCreditCode("91440101MA5XXXXXX1");
        ent.setLegalPerson("张企业");
        ent.setRegisteredCapital(BigDecimal.valueOf(1000));
        ent.setEstablishmentDate(LocalDate.of(2020, 1, 15));
        ent.setBusinessStatus("正常");
        ent.setIndustry("软件和信息技术");
        ent.setAddress("广州市天河区");
        ent.setContactPerson("张企业");
        ent.setContactPhone("13900000001");
        ent.setEmployeeCount(120);
        ent.setAnnualRevenue(BigDecimal.valueOf(5000));
        ent.setCreditScore(85);
        ent.setRiskLevel("LOW");
        ent.setStatus("ACTIVE");
        enterpriseRepository.save(ent);

        // 3. Bank (FINANCIAL_INSTITUTION)
        User bankUser = new User();
        bankUser.setUsername("bank");
        bankUser.setPassword(passwordEncoder.encode("password"));
        bankUser.setRealName("李银行");
        bankUser.setEmail("bank@test.com");
        bankUser.setPhone("13900000002");
        bankUser.setUserType(User.UserType.FINANCIAL_INSTITUTION);
        bankUser.setStatus(User.UserStatus.ACTIVE);
        bankUser.setTenantId("system");
                userRepository.save(bankUser);

        Bank bank = new Bank();
        bank.setBankName("广州银行");
        bank.setBankCode("GZ_BANK_001");
        bank.setContactPerson("李银行");
        bank.setContactPhone("020-88888888");
        bank.setAddress("广州市天河区");
        bank.setStatus("ACTIVE");
        bankRepository.save(bank);

        // 4. Farmer
        User farmer = new User();
        farmer.setUsername("farmer");
        farmer.setPassword(passwordEncoder.encode("password"));
        farmer.setRealName("王农户");
        farmer.setEmail("farmer@test.com");
        farmer.setPhone("13900000003");
        farmer.setUserType(User.UserType.FARMER);
        farmer.setStatus(User.UserStatus.ACTIVE);
        farmer.setTenantId("system");
        userRepository.save(farmer);

        // 5. Government
        User gov = new User();
        gov.setUsername("gov");
        gov.setPassword(passwordEncoder.encode("password"));
        gov.setRealName("赵政府");
        gov.setEmail("gov@test.com");
        gov.setPhone("13900000004");
        gov.setUserType(User.UserType.GOVERNMENT);
        gov.setStatus(User.UserStatus.ACTIVE);
        gov.setTenantId("system");
        userRepository.save(gov);

        // 6. Risk Manager
        User risk = new User();
        risk.setUsername("risk");
        risk.setPassword(passwordEncoder.encode("password"));
        risk.setRealName("孙风控");
        risk.setEmail("risk@test.com");
        risk.setPhone("13900000005");
        risk.setUserType(User.UserType.RISK_MANAGER);
        risk.setStatus(User.UserStatus.ACTIVE);
        risk.setTenantId("system");
        userRepository.save(risk);

        // 7. Third Party
        User third = new User();
        third.setUsername("third");
        third.setPassword(passwordEncoder.encode("password"));
        third.setRealName("周第三方");
        third.setEmail("third@test.com");
        third.setPhone("13900000006");
        third.setUserType(User.UserType.THIRD_PARTY);
        third.setStatus(User.UserStatus.ACTIVE);
        third.setTenantId("system");
        userRepository.save(third);

        // 8. Guarantee Institution
        User guarantee = new User();
        guarantee.setUsername("guarantee");
        guarantee.setPassword(passwordEncoder.encode("password"));
        guarantee.setRealName("刘担保");
        guarantee.setEmail("guarantee@test.com");
        guarantee.setPhone("13900000007");
        guarantee.setUserType(User.UserType.GUARANTEE_INSTITUTION);
        guarantee.setStatus(User.UserStatus.ACTIVE);
        guarantee.setTenantId("system");
        userRepository.save(guarantee);

        GuaranteeInstitution gi = new GuaranteeInstitution();
        gi.setInstitutionName("焦作市中小企业融资担保有限公司");
        gi.setCreditCode("91410800MAXXXXXXG1");
        gi.setLegalPerson("刘担保");
        gi.setRegisteredCapital(new BigDecimal("50000"));
        gi.setContactPhone("0391-XXXXXXX");
        gi.setAddress("焦作市山阳区XXX路XXX号");
        gi.setRating("AA");
        gi.setBusinessScope("一般项目：非融资担保服务；融资咨询服务；信息咨询服务（不含许可类信息咨询服务）");
        gi.setStatus("ACTIVE");
        gi.setUserId(guarantee.getId());
        guaranteeInstitutionRepository.save(gi);

        log.info("Test data initialized: 8 users created");

        // ============ 信用评分模型种子数据 ============
        if (creditScoreModelRepository.count() == 0) {
            CreditScoreModel model = new CreditScoreModel();
            model.setModelCode("SME_CREDIT_V1");
            model.setModelName("企业信用评分模型V1");
            model.setVersion("1.0.0");
            model.setDescription("面向中小企业的5维度多因子信用评分模型。包含基础素质(20%)、信用记录(25%)、财务状况(35%)、法律合规(12%)、行业市场(8%)");
            model.setModelType("RULE_BASED");
            model.setStatus("ACTIVE");
            model.setScoreRangeMin(0);
            model.setScoreRangeMax(100);
            model.setDefaultScore(50);
            model.setWeightConfig("{\"basic\":0.20,\"credit\":0.25,\"financial\":0.35,\"legal\":0.12,\"industry\":0.08}");
            model.setCreatedBy("SYSTEM");
            model.setAccuracy(BigDecimal.valueOf(0.85));
            creditScoreModelRepository.save(model);

            CreditScoreModel modelV2 = new CreditScoreModel();
            modelV2.setModelCode("SME_CREDIT_V2");
            modelV2.setModelName("企业信用评分模型V2-成长型");
            modelV2.setVersion("2.0.0");
            modelV2.setDescription("面向高成长型科技企业的增强版评分模型。侧重营收增长(40%)和行业前景(20%)，降低基础素质权重(10%)");
            modelV2.setModelType("RULE_BASED");
            modelV2.setStatus("ACTIVE");
            modelV2.setScoreRangeMin(0);
            modelV2.setScoreRangeMax(100);
            modelV2.setDefaultScore(55);
            modelV2.setWeightConfig("{\"basic\":0.10,\"credit\":0.25,\"financial\":0.40,\"legal\":0.05,\"industry\":0.20}");
            modelV2.setCreatedBy("SYSTEM");
            modelV2.setAccuracy(BigDecimal.valueOf(0.82));
            creditScoreModelRepository.save(modelV2);

            log.info("Credit score models created: SME_CREDIT_V1, SME_CREDIT_V2");
        }

        // ============ 企业信用数据（8家） ============
        Company[] companies = createCompanies();
        log.info("Company credit data initialized: {} companies created", companies.length);

        // ============ 贷款申请记录（信用历史） ============
        if (loanApplicationRepository.count() == 0) {
            createLoanApplications(companies, sme);
            log.info("Loan application data initialized: 5 loan records created");
        }

        // ============ 信用报告种子数据 ============
        if (creditReportRepository.count() == 0) {
            createCreditReports(companies);
            log.info("Credit report data initialized: {} credit reports generated", companies.length);
        }
    }

    private Company[] createCompanies() {
        Company c1 = new Company();
        c1.setCompanyName("智信科技"); c1.setCreditCode("91440101MA5XXXXXX1");
        c1.setLegalPerson("张企业"); c1.setRegisteredCapital(BigDecimal.valueOf(1000));
        c1.setEstablishmentDate(LocalDate.of(2020, 1, 15)); c1.setBusinessStatus("存续");
        c1.setIndustry("软件和信息技术"); c1.setRegionCode("440100");
        c1.setAddress("广州市天河区科技园A栋10层");
        c1.setBusinessScope("软件开发、信息系统集成服务、大数据分析");
        c1.setEmployeeCount(120); c1.setAnnualRevenue(BigDecimal.valueOf(5000));
        c1.setCreditScore(85); c1.setRiskLevel("LOW"); c1.setDataSource("工商登记系统");
        companyRepository.save(c1);

        Company c2 = new Company();
        c2.setCompanyName("智创制造"); c2.setCreditCode("91440101MA5XXXXXX2");
        c2.setLegalPerson("李制造"); c2.setRegisteredCapital(BigDecimal.valueOf(500));
        c2.setEstablishmentDate(LocalDate.of(2018, 3, 10)); c2.setBusinessStatus("存续");
        c2.setIndustry("高端装备制造"); c2.setRegionCode("440100");
        c2.setAddress("广州市黄埔区智能制造产业园");
        c2.setBusinessScope("智能装备研发、精密零部件制造");
        c2.setEmployeeCount(250); c2.setAnnualRevenue(BigDecimal.valueOf(8000));
        c2.setCreditScore(78); c2.setRiskLevel("MEDIUM"); c2.setDataSource("工商登记系统");
        companyRepository.save(c2);

        Company c3 = new Company();
        c3.setCompanyName("华兴新能源"); c3.setCreditCode("91440101MA5XXXXXX3");
        c3.setLegalPerson("陈华"); c3.setRegisteredCapital(BigDecimal.valueOf(5000));
        c3.setEstablishmentDate(LocalDate.of(2021, 6, 1)); c3.setBusinessStatus("存续");
        c3.setIndustry("新能源"); c3.setRegionCode("440300");
        c3.setAddress("深圳市南山区新能源产业园B栋");
        c3.setBusinessScope("新能源电池研发、储能系统解决方案");
        c3.setEmployeeCount(800); c3.setAnnualRevenue(BigDecimal.valueOf(20000));
        c3.setCreditScore(88); c3.setRiskLevel("LOW"); c3.setDataSource("工商登记系统");
        companyRepository.save(c3);

        Company c4 = new Company();
        c4.setCompanyName("瑞康医药"); c4.setCreditCode("91440101MA5XXXXXX4");
        c4.setLegalPerson("刘瑞"); c4.setRegisteredCapital(BigDecimal.valueOf(3000));
        c4.setEstablishmentDate(LocalDate.of(2012, 8, 20)); c4.setBusinessStatus("存续");
        c4.setIndustry("医药"); c4.setRegionCode("440100");
        c4.setAddress("广州市白云区医药港C区");
        c4.setBusinessScope("药品批发、医疗器械销售");
        c4.setEmployeeCount(380); c4.setAnnualRevenue(BigDecimal.valueOf(15000));
        c4.setCreditScore(75); c4.setRiskLevel("MEDIUM"); c4.setDataSource("工商登记系统");
        companyRepository.save(c4);

        Company c5 = new Company();
        c5.setCompanyName("恒达地产"); c5.setCreditCode("91440101MA5XXXXXX5");
        c5.setLegalPerson("王恒"); c5.setRegisteredCapital(BigDecimal.valueOf(10000));
        c5.setEstablishmentDate(LocalDate.of(2009, 5, 10)); c5.setBusinessStatus("存续");
        c5.setIndustry("房地产"); c5.setRegionCode("440100");
        c5.setAddress("广州市天河区珠江新城CBD");
        c5.setBusinessScope("房地产开发、物业管理");
        c5.setEmployeeCount(1500); c5.setAnnualRevenue(BigDecimal.valueOf(50000));
        c5.setCreditScore(70); c5.setRiskLevel("MEDIUM"); c5.setDataSource("工商登记系统");
        companyRepository.save(c5);

        Company c6 = new Company();
        c6.setCompanyName("聚源餐饮"); c6.setCreditCode("91440101MA5XXXXXX6");
        c6.setLegalPerson("赵聚"); c6.setRegisteredCapital(BigDecimal.valueOf(200));
        c6.setEstablishmentDate(LocalDate.of(2016, 7, 5)); c6.setBusinessStatus("存续");
        c6.setIndustry("餐饮"); c6.setRegionCode("440100");
        c6.setAddress("广州市越秀区美食街88号");
        c6.setBusinessScope("中式快餐连锁经营");
        c6.setEmployeeCount(45); c6.setAnnualRevenue(BigDecimal.valueOf(800));
        c6.setCreditScore(55); c6.setRiskLevel("HIGH"); c6.setDataSource("工商登记系统");
        companyRepository.save(c6);

        Company c7 = new Company();
        c7.setCompanyName("南方建筑"); c7.setCreditCode("91440101MA5XXXXXX7");
        c7.setLegalPerson("林南方"); c7.setRegisteredCapital(BigDecimal.valueOf(2000));
        c7.setEstablishmentDate(LocalDate.of(2004, 2, 8)); c7.setBusinessStatus("存续");
        c7.setIndustry("建筑"); c7.setRegionCode("440100");
        c7.setAddress("广州市番禺区建筑科技园");
        c7.setBusinessScope("建筑工程总承包、市政工程");
        c7.setEmployeeCount(520); c7.setAnnualRevenue(BigDecimal.valueOf(12000));
        c7.setCreditScore(72); c7.setRiskLevel("MEDIUM"); c7.setDataSource("工商登记系统");
        companyRepository.save(c7);

        Company c8 = new Company();
        c8.setCompanyName("盛达物流"); c8.setCreditCode("91440101MA5XXXXXX8");
        c8.setLegalPerson("吴盛"); c8.setRegisteredCapital(BigDecimal.valueOf(300));
        c8.setEstablishmentDate(LocalDate.of(2018, 11, 20)); c8.setBusinessStatus("存续");
        c8.setIndustry("物流"); c8.setRegionCode("440111");
        c8.setAddress("广州市白云区物流园");
        c8.setBusinessScope("道路货物运输、仓储服务");
        c8.setEmployeeCount(80); c8.setAnnualRevenue(BigDecimal.valueOf(1500));
        c8.setCreditScore(60); c8.setRiskLevel("HIGH"); c8.setDataSource("工商登记系统");
        companyRepository.save(c8);

        return new Company[]{c1, c2, c3, c4, c5, c6, c7, c8};
    }

    private void createLoanApplications(Company[] companies, User sme) {
        LoanApplication la1 = new LoanApplication();
        la1.setUser(sme); la1.setApplicationNo("LN20240001");
        la1.setCompanyId(companies[0].getId()); la1.setCompanyName("智信科技");
        la1.setLoanAmount(BigDecimal.valueOf(200000)); la1.setInterestRate(4.5);
        la1.setLoanTermMonths(12); la1.setLoanPurpose("研发投入");
        la1.setStatus(LoanApplication.ApplicationStatus.APPROVED);
        la1.setCreditScore(88); la1.setRiskLevel("LOW");
        la1.setApprovedAmount(BigDecimal.valueOf(200000));
        loanApplicationRepository.save(la1);

        LoanApplication la2 = new LoanApplication();
        la2.setUser(sme); la2.setApplicationNo("LN20240002");
        la2.setCompanyId(companies[2].getId()); la2.setCompanyName("华兴新能源");
        la2.setLoanAmount(BigDecimal.valueOf(1000000)); la2.setInterestRate(3.8);
        la2.setLoanTermMonths(36); la2.setLoanPurpose("产线扩建");
        la2.setStatus(LoanApplication.ApplicationStatus.APPROVED);
        la2.setCreditScore(90); la2.setRiskLevel("LOW");
        la2.setApprovedAmount(BigDecimal.valueOf(1000000));
        loanApplicationRepository.save(la2);

        LoanApplication la3 = new LoanApplication();
        la3.setUser(sme); la3.setApplicationNo("LN20240003");
        la3.setCompanyId(companies[4].getId()); la3.setCompanyName("恒达地产");
        la3.setLoanAmount(BigDecimal.valueOf(5000000)); la3.setInterestRate(5.2);
        la3.setLoanTermMonths(60); la3.setLoanPurpose("项目开发");
        la3.setStatus(LoanApplication.ApplicationStatus.APPROVED);
        la3.setCreditScore(75); la3.setRiskLevel("MEDIUM");
        la3.setApprovedAmount(BigDecimal.valueOf(4000000));
        la3.setReviewComment("项目前景良好，但房地产业风险较高，建议适当降低授信额度");
        loanApplicationRepository.save(la3);

        LoanApplication la4 = new LoanApplication();
        la4.setUser(sme); la4.setApplicationNo("LN20240004");
        la4.setCompanyId(companies[5].getId()); la4.setCompanyName("聚源餐饮");
        la4.setLoanAmount(BigDecimal.valueOf(50000)); la4.setInterestRate(6.0);
        la4.setLoanTermMonths(12); la4.setLoanPurpose("门店扩张");
        la4.setStatus(LoanApplication.ApplicationStatus.REJECTED);
        la4.setCreditScore(55); la4.setRiskLevel("HIGH");
        la4.setApprovedAmount(BigDecimal.ZERO);
        la4.setReviewComment("信用评分不足，建议补充担保措施后重新申请");
        loanApplicationRepository.save(la4);

        LoanApplication la5 = new LoanApplication();
        la5.setUser(sme); la5.setApplicationNo("LN20240005");
        la5.setCompanyId(companies[7].getId()); la5.setCompanyName("盛达物流");
        la5.setLoanAmount(BigDecimal.valueOf(100000)); la5.setInterestRate(5.5);
        la5.setLoanTermMonths(24); la5.setLoanPurpose("车辆购置");
        la5.setStatus(LoanApplication.ApplicationStatus.PENDING);
        la5.setCreditScore(63); la5.setRiskLevel("HIGH");
        la5.setCreatedAt(LocalDateTime.now().minusDays(5));
        loanApplicationRepository.save(la5);
    }

    private void createCreditReports(Company[] companies) {
        LocalDate now = LocalDate.now();
        // 智信科技 85 LOW / 智创制造 78 MEDIUM / 华兴新能源 88 LOW / 瑞康医药 75 MEDIUM
        // 恒达地产 70 MEDIUM / 聚源餐饮 55 HIGH / 南方建筑 72 MEDIUM / 盛达物流 60 HIGH
        saveReport(companies[0], "STANDARD", "SYSTEM", 85, "AA", "LOW",
            "{\"registeredCapital\":1000,\"employees\":120,\"industry\":\"软件和信息技术\",\"establishmentDate\":\"2020-01-15\"}",
            "{\"totalLoans\":3,\"totalAmount\":350,\"overdueCount\":0,\"maxOverdueDays\":0,\"creditUtilization\":\"35%\",\"historyMonths\":48}",
            "{\"annualRevenue\":5000,\"netProfit\":650,\"totalAssets\":3500,\"totalLiabilities\":1200,\"assetLiabilityRatio\":\"34.3%\",\"revenueGrowth\":\"28%\"}",
            "{\"litigationCount\":0,\"administrativePenalties\":0,\"taxArrears\":false,\"abnormalOperation\":false}",
            "{\"industry\":\"软件和信息技术\",\"industryAvgScore\":72,\"industryRank\":\"前10%\",\"marketTrend\":\"上升\"}",
            "{\"overallRisk\":\"低风险\",\"keyRiskFactors\":[\"行业竞争加剧\",\"技术迭代风险\"],\"mitigationMeasures\":[\"加大研发投入\",\"拓展客户多元化\"]}",
            "{\"creditLimit\":500,\"suggestedRate\":\"3.5%-4.5%\",\"recommendedProducts\":[\"科技企业专项贷\",\"知识产权质押贷\"],\"remarks\":\"优质科技企业，建议给予优惠利率\"}",
            "智信科技 85分 AA级 低风险");

        saveReport(companies[1], "STANDARD", "SYSTEM", 78, "A", "MEDIUM",
            "{\"registeredCapital\":500,\"employees\":250,\"industry\":\"高端装备制造\",\"establishmentDate\":\"2018-03-10\"}",
            "{\"totalLoans\":5,\"totalAmount\":1200,\"overdueCount\":1,\"maxOverdueDays\":15,\"creditUtilization\":\"52%\",\"historyMonths\":72}",
            "{\"annualRevenue\":8000,\"netProfit\":720,\"totalAssets\":6800,\"totalLiabilities\":3400,\"assetLiabilityRatio\":\"50%\",\"revenueGrowth\":\"15%\"}",
            "{\"litigationCount\":1,\"administrativePenalties\":0,\"taxArrears\":false,\"abnormalOperation\":false}",
            "{\"industry\":\"高端装备制造\",\"industryAvgScore\":70,\"industryRank\":\"前20%\",\"marketTrend\":\"稳定\"}",
            "{\"overallRisk\":\"中低风险\",\"keyRiskFactors\":[\"原材料价格波动\",\"短期偿债压力\"],\"mitigationMeasures\":[\"优化供应链管理\",\"增加流动资金储备\"]}",
            "{\"creditLimit\":800,\"suggestedRate\":\"4.0%-5.0%\",\"recommendedProducts\":[\"企业经营贷款\",\"设备融资租赁\"],\"remarks\":\"制造业龙头企业，经营稳健\"}",
            "智创制造 78分 A级 中低风险");

        saveReport(companies[2], "STANDARD", "SYSTEM", 88, "AA", "LOW",
            "{\"registeredCapital\":5000,\"employees\":800,\"industry\":\"新能源\",\"establishmentDate\":\"2021-06-01\"}",
            "{\"totalLoans\":2,\"totalAmount\":2000,\"overdueCount\":0,\"maxOverdueDays\":0,\"creditUtilization\":\"25%\",\"historyMonths\":24}",
            "{\"annualRevenue\":20000,\"netProfit\":3200,\"totalAssets\":28000,\"totalLiabilities\":9800,\"assetLiabilityRatio\":\"35%\",\"revenueGrowth\":\"65%\"}",
            "{\"litigationCount\":0,\"administrativePenalties\":0,\"taxArrears\":false,\"abnormalOperation\":false}",
            "{\"industry\":\"新能源\",\"industryAvgScore\":75,\"industryRank\":\"前5%\",\"marketTrend\":\"上升\"}",
            "{\"overallRisk\":\"低风险\",\"keyRiskFactors\":[\"产能扩张过快\",\"补贴政策变动\"],\"mitigationMeasures\":[\"控制扩张节奏\",\"多元化收入来源\"]}",
            "{\"creditLimit\":2000,\"suggestedRate\":\"3.0%-4.0%\",\"recommendedProducts\":[\"绿色金融专项贷\",\"科技创新贷\"],\"remarks\":\"高成长新能源龙头，建议大额授信\"}",
            "华兴新能源 88分 AA级 低风险");

        saveReport(companies[3], "STANDARD", "SYSTEM", 75, "A", "MEDIUM",
            "{\"registeredCapital\":3000,\"employees\":380,\"industry\":\"医药\",\"establishmentDate\":\"2012-08-20\"}",
            "{\"totalLoans\":8,\"totalAmount\":4500,\"overdueCount\":2,\"maxOverdueDays\":30,\"creditUtilization\":\"60%\",\"historyMonths\":120}",
            "{\"annualRevenue\":15000,\"netProfit\":900,\"totalAssets\":12000,\"totalLiabilities\":7200,\"assetLiabilityRatio\":\"60%\",\"revenueGrowth\":\"8%\"}",
            "{\"litigationCount\":2,\"administrativePenalties\":0,\"taxArrears\":false,\"abnormalOperation\":false}",
            "{\"industry\":\"医药流通\",\"industryAvgScore\":68,\"industryRank\":\"前30%\",\"marketTrend\":\"稳定\"}",
            "{\"overallRisk\":\"中等风险\",\"keyRiskFactors\":[\"应收账款周期长\",\"行业政策调整\"],\"mitigationMeasures\":[\"加强应收账款管理\",\"优化库存周转\"]}",
            "{\"creditLimit\":1000,\"suggestedRate\":\"4.5%-5.5%\",\"recommendedProducts\":[\"供应链金融\",\"应收账款质押贷\"],\"remarks\":\"控制授信额度，加强贷后管理\"}",
            "瑞康医药 75分 A级 中等风险");

        saveReport(companies[4], "STANDARD", "SYSTEM", 70, "BBB", "MEDIUM",
            "{\"registeredCapital\":10000,\"employees\":1500,\"industry\":\"房地产\",\"establishmentDate\":\"2009-05-10\"}",
            "{\"totalLoans\":12,\"totalAmount\":35000,\"overdueCount\":3,\"maxOverdueDays\":45,\"creditUtilization\":\"75%\",\"historyMonths\":180}",
            "{\"annualRevenue\":50000,\"netProfit\":3500,\"totalAssets\":120000,\"totalLiabilities\":84000,\"assetLiabilityRatio\":\"70%\",\"revenueGrowth\":\"-5%\"}",
            "{\"litigationCount\":5,\"administrativePenalties\":1,\"taxArrears\":false,\"abnormalOperation\":false}",
            "{\"industry\":\"房地产\",\"industryAvgScore\":62,\"industryRank\":\"前35%\",\"marketTrend\":\"下降\"}",
            "{\"overallRisk\":\"中高风险\",\"keyRiskFactors\":[\"行业下行周期\",\"高负债率\"],\"mitigationMeasures\":[\"降低拿地节奏\",\"加快去化速度\"]}",
            "{\"creditLimit\":3000,\"suggestedRate\":\"5.5%-6.5%\",\"recommendedProducts\":[\"经营性物业抵押贷\",\"房地产开发贷\"],\"remarks\":\"房地产业整体承压，建议降低授信敞口\"}",
            "恒达地产 70分 BBB级 中高风险");

        saveReport(companies[5], "STANDARD", "SYSTEM", 55, "B", "HIGH",
            "{\"registeredCapital\":200,\"employees\":45,\"industry\":\"餐饮\",\"establishmentDate\":\"2016-07-05\"}",
            "{\"totalLoans\":2,\"totalAmount\":80,\"overdueCount\":1,\"maxOverdueDays\":60,\"creditUtilization\":\"85%\",\"historyMonths\":36}",
            "{\"annualRevenue\":800,\"netProfit\":-20,\"totalAssets\":350,\"totalLiabilities\":280,\"assetLiabilityRatio\":\"80%\",\"revenueGrowth\":\"-8%\"}",
            "{\"litigationCount\":1,\"administrativePenalties\":0,\"taxArrears\":true,\"abnormalOperation\":false}",
            "{\"industry\":\"餐饮\",\"industryAvgScore\":56,\"industryRank\":\"前50%\",\"marketTrend\":\"稳定\"}",
            "{\"overallRisk\":\"高风险\",\"keyRiskFactors\":[\"经营亏损\",\"高资产负债率\"],\"mitigationMeasures\":[\"建议补充担保措施\",\"优化成本结构\"]}",
            "{\"creditLimit\":20,\"suggestedRate\":\"7.0%-8.0%\",\"recommendedProducts\":[\"个人经营性贷款\",\"担保贷款\"],\"remarks\":\"财务状况较差，建议足额担保，审慎授信\"}",
            "聚源餐饮 55分 B级 高风险");

        saveReport(companies[6], "STANDARD", "SYSTEM", 72, "BBB", "MEDIUM",
            "{\"registeredCapital\":2000,\"employees\":520,\"industry\":\"建筑\",\"establishmentDate\":\"2004-02-08\"}",
            "{\"totalLoans\":6,\"totalAmount\":3500,\"overdueCount\":1,\"maxOverdueDays\":20,\"creditUtilization\":\"55%\",\"historyMonths\":180}",
            "{\"annualRevenue\":12000,\"netProfit\":600,\"totalAssets\":15000,\"totalLiabilities\":9750,\"assetLiabilityRatio\":\"65%\",\"revenueGrowth\":\"5%\"}",
            "{\"litigationCount\":3,\"administrativePenalties\":0,\"taxArrears\":false,\"abnormalOperation\":false}",
            "{\"industry\":\"建筑工程\",\"industryAvgScore\":65,\"industryRank\":\"前25%\",\"marketTrend\":\"稳定\"}",
            "{\"overallRisk\":\"中等风险\",\"keyRiskFactors\":[\"工程款回款周期长\",\"项目集中度高\"],\"mitigationMeasures\":[\"多元化项目类型\",\"加强合同管理\"]}",
            "{\"creditLimit\":600,\"suggestedRate\":\"4.5%-5.5%\",\"recommendedProducts\":[\"工程保函\",\"应收账款保理\"],\"remarks\":\"经营历史较长，建议以项目为单位授信\"}",
            "南方建筑 72分 BBB级 中等风险");

        saveReport(companies[7], "STANDARD", "SYSTEM", 60, "B", "HIGH",
            "{\"registeredCapital\":300,\"employees\":80,\"industry\":\"物流\",\"establishmentDate\":\"2018-11-20\"}",
            "{\"totalLoans\":2,\"totalAmount\":150,\"overdueCount\":1,\"maxOverdueDays\":35,\"creditUtilization\":\"70%\",\"historyMonths\":36}",
            "{\"annualRevenue\":1500,\"netProfit\":75,\"totalAssets\":800,\"totalLiabilities\":520,\"assetLiabilityRatio\":\"65%\",\"revenueGrowth\":\"12%\"}",
            "{\"litigationCount\":1,\"administrativePenalties\":0,\"taxArrears\":false,\"abnormalOperation\":false}",
            "{\"industry\":\"物流运输\",\"industryAvgScore\":58,\"industryRank\":\"前40%\",\"marketTrend\":\"上升\"}",
            "{\"overallRisk\":\"高风险\",\"keyRiskFactors\":[\"资产规模小\",\"经营历史短\"],\"mitigationMeasures\":[\"建议增加车辆抵押\",\"引入担保方\"]}",
            "{\"creditLimit\":50,\"suggestedRate\":\"6.0%-7.0%\",\"recommendedProducts\":[\"车辆抵押贷款\",\"担保贷款\"],\"remarks\":\"成长型企业但资产有限，建议抵押授信\"}",
            "盛达物流 60分 B级 高风险");
    }

    private void saveReport(Company company, String reportType, String generatedBy,
                             int creditScore, String creditLevel, String riskLevel,
                             String basicInfo, String creditHistory, String financialInfo,
                             String legalInfo, String industryInfo, String riskAnalysis,
                             String suggestions, String summaryLog) {
        CreditReport report = new CreditReport();
        report.setReportNo("CR-" + company.getCreditCode() + "-" + LocalDate.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd")));
        report.setCompanyId(company.getId());
        report.setCompanyName(company.getCompanyName());
        report.setCreditCode(company.getCreditCode());
        report.setReportType(reportType);
        report.setCreditScore(creditScore);
        report.setCreditLevel(creditLevel);
        report.setRiskLevel(riskLevel);
        report.setReportDate(LocalDate.now());
        report.setValidUntil(LocalDate.now().plusMonths(6));
        report.setDataSources("工商登记系统、税务系统、司法系统、银行征信系统、企业自主申报");
        report.setBasicInfo(basicInfo);
        report.setCreditHistory(creditHistory);
        report.setFinancialInfo(financialInfo);
        report.setLegalInfo(legalInfo);
        report.setIndustryInfo(industryInfo);
        report.setRiskAnalysis(riskAnalysis);
        report.setSuggestions(suggestions);
        report.setStatus("GENERATED");
        report.setGeneratedBy(generatedBy);
        report.setGenerationTime(LocalDateTime.now());
        creditReportRepository.save(report);
        log.info("  ✓ Credit report created: {}", summaryLog);
    }
}