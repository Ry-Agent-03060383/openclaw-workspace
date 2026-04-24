package com.wisdom.finance.common.config;

import com.wisdom.finance.user.entity.Enterprise;
import com.wisdom.finance.user.entity.Farmer;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.mapper.EnterpriseRepository;
import com.wisdom.finance.user.mapper.FarmerRepository;
import com.wisdom.finance.user.mapper.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 数据初始化组件
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final FarmerRepository farmerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            System.out.println("数据已存在，跳过初始化");
            return;
        }

        System.out.println("开始初始化测试数据...");

        // 创建用户
        String encodedPassword = passwordEncoder.encode("123456");

        // 平台管理员
        User admin = createUser("admin", encodedPassword, "平台管理员",
            "13800138000", "admin@wisdom.com", User.UserType.ADMIN);
        
        // 风控人员
        User risk = createUser("risk", encodedPassword, "风控专员",
            "13800138001", "risk@wisdom.com", User.UserType.RISK_MANAGER);
        
        // 金融机构
        User bank = createUser("bank", encodedPassword, "银行客户经理",
            "13800138002", "bank@wisdom.com", User.UserType.FINANCIAL_INSTITUTION);
        
        // 中小企业
        User enterpriseUser = createUser("enterprise", encodedPassword, "企业负责人",
            "13800138003", "enterprise@wisdom.com", User.UserType.SME);
        
        // 农户
        User farmerUser = createUser("farmer", encodedPassword, "农户",
            "13800138004", "farmer@wisdom.com", User.UserType.FARMER);
        
        // 政府部门
        User government = createUser("government", encodedPassword, "政府工作人员",
            "13800138005", "government@wisdom.com", User.UserType.GOVERNMENT);
        
        // 第三方服务商
        User thirdParty = createUser("thirdparty", encodedPassword, "第三方服务商",
            "13800138006", "thirdparty@wisdom.com", User.UserType.THIRD_PARTY);

        // 创建企业信息
        Enterprise enterprise = new Enterprise();
        enterprise.setUserId(enterpriseUser.getId());
        enterprise.setEnterpriseName("测试企业有限公司");
        enterprise.setCreditCode("91110000MA12345678");
        enterprise.setLegalPerson("张三");
        enterprise.setLegalPersonId("110101199001011234");
        enterprise.setRegisteredCapital(new BigDecimal("10000000"));
        enterprise.setEstablishmentDate(LocalDate.of(2010, 1, 1));
        enterprise.setBusinessStatus("存续");
        enterprise.setIndustry("科技");
        enterprise.setAddress("北京市朝阳区");
        enterprise.setContactPerson("张三");
        enterprise.setContactPhone("13800138003");
        enterprise.setContactEmail("enterprise@wisdom.com");
        enterprise.setBusinessScope("技术开发、技术服务");
        enterprise.setEmployeeCount(100);
        enterprise.setAnnualRevenue(new BigDecimal("50000000"));
        enterprise.setCreditScore(85);
        enterprise.setRiskLevel("低");
        enterprise.setStatus("ACTIVE");
        enterpriseRepository.save(enterprise);

        // 创建农户信息
        Farmer farmer = new Farmer();
        farmer.setUserId(farmerUser.getId());
        farmer.setFarmerName("李四");
        farmer.setIdCard("110101198501011234");
        farmer.setPhone("13800138004");
        farmer.setAddress("北京市朝阳区农村");
        farmer.setVillage("幸福村");
        farmer.setTown("朝阳区");
        farmer.setCounty("北京市");
        farmer.setLandArea(new BigDecimal("10.5"));
        farmer.setFarmingType("粮食作物");
        farmer.setFamilyMembers(4);
        farmer.setAnnualIncome(new BigDecimal("100000"));
        farmer.setCreditScore(80);
        farmer.setRiskLevel("低");
        farmer.setFarmingYears(5);
        farmer.setStatus("ACTIVE");
        farmerRepository.save(farmer);

        System.out.println("测试数据初始化完成！");
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
}
