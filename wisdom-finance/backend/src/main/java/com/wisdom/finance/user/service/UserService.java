package com.wisdom.finance.user.service;

import com.wisdom.finance.user.entity.Enterprise;
import com.wisdom.finance.user.entity.Farmer;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.mapper.EnterpriseRepository;
import com.wisdom.finance.user.mapper.FarmerRepository;
import com.wisdom.finance.user.mapper.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 用户服务 - 用户管理和角色业务流程
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final FarmerRepository farmerRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * 创建用户
     */
    @Transactional
    public User createUser(User user) {
        log.info("创建用户: {}", user.getUsername());
        
        // 检查用户名是否已存在
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("用户名已存在");
        }
        
        // 加密密码
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(User.UserStatus.ACTIVE);
        
        return userRepository.save(user);
    }

    /**
     * 创建农户用户
     */
    @Transactional
    public User createFarmerUser(User user, Farmer farmer) {
        log.info("创建农户用户: {}", user.getUsername());
        
        user.setUserType(User.UserType.FARMER);
        User savedUser = createUser(user);
        
        farmer.setUserId(savedUser.getId());
        farmer.setFarmerName(user.getRealName());
        farmer.setPhone(user.getPhone());
        farmer.setStatus("ACTIVE");
        farmerRepository.save(farmer);
        
        return savedUser;
    }

    /**
     * 创建企业用户
     */
    @Transactional
    public User createEnterpriseUser(User user, Enterprise enterprise) {
        log.info("创建企业用户: {}", user.getUsername());
        
        user.setUserType(User.UserType.SME);
        User savedUser = createUser(user);
        
        enterprise.setUserId(savedUser.getId());
        enterprise.setContactPerson(user.getRealName());
        enterprise.setContactPhone(user.getPhone());
        enterprise.setContactEmail(user.getEmail());
        enterprise.setStatus("ACTIVE");
        enterpriseRepository.save(enterprise);
        
        return savedUser;
    }

    /**
     * 更新用户信息
     */
    @Transactional
    public User updateUser(Long userId, User user) {
        log.info("更新用户信息，用户ID: {}", userId);
        
        User existing = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        if (user.getRealName() != null) existing.setRealName(user.getRealName());
        if (user.getPhone() != null) existing.setPhone(user.getPhone());
        if (user.getEmail() != null) existing.setEmail(user.getEmail());
        if (user.getCityCode() != null) existing.setCityCode(user.getCityCode());
        
        return userRepository.save(existing);
    }

    /**
     * 更新农户信息
     */
    @Transactional
    public Farmer updateFarmer(Long farmerId, Farmer farmer) {
        log.info("更新农户信息，农户ID: {}", farmerId);
        
        Farmer existing = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("农户不存在"));
        
        if (farmer.getFarmerName() != null) existing.setFarmerName(farmer.getFarmerName());
        if (farmer.getIdCard() != null) existing.setIdCard(farmer.getIdCard());
        if (farmer.getPhone() != null) existing.setPhone(farmer.getPhone());
        if (farmer.getAddress() != null) existing.setAddress(farmer.getAddress());
        if (farmer.getVillage() != null) existing.setVillage(farmer.getVillage());
        if (farmer.getTown() != null) existing.setTown(farmer.getTown());
        if (farmer.getCounty() != null) existing.setCounty(farmer.getCounty());
        if (farmer.getLandArea() != null) existing.setLandArea(farmer.getLandArea());
        if (farmer.getFarmingType() != null) existing.setFarmingType(farmer.getFarmingType());
        if (farmer.getFamilyMembers() != null) existing.setFamilyMembers(farmer.getFamilyMembers());
        if (farmer.getAnnualIncome() != null) existing.setAnnualIncome(farmer.getAnnualIncome());
        if (farmer.getFarmingYears() != null) existing.setFarmingYears(farmer.getFarmingYears());
        if (farmer.getCooperativeId() != null) existing.setCooperativeId(farmer.getCooperativeId());
        if (farmer.getCooperativeName() != null) existing.setCooperativeName(farmer.getCooperativeName());
        if (farmer.getRemark() != null) existing.setRemark(farmer.getRemark());
        
        return farmerRepository.save(existing);
    }

    /**
     * 更新企业信息
     */
    @Transactional
    public Enterprise updateEnterprise(Long enterpriseId, Enterprise enterprise) {
        log.info("更新企业信息，企业ID: {}", enterpriseId);
        
        Enterprise existing = enterpriseRepository.findById(enterpriseId)
                .orElseThrow(() -> new RuntimeException("企业不存在"));
        
        if (enterprise.getEnterpriseName() != null) existing.setEnterpriseName(enterprise.getEnterpriseName());
        if (enterprise.getLegalPerson() != null) existing.setLegalPerson(enterprise.getLegalPerson());
        if (enterprise.getLegalPersonId() != null) existing.setLegalPersonId(enterprise.getLegalPersonId());
        if (enterprise.getRegisteredCapital() != null) existing.setRegisteredCapital(enterprise.getRegisteredCapital());
        if (enterprise.getEstablishmentDate() != null) existing.setEstablishmentDate(enterprise.getEstablishmentDate());
        if (enterprise.getBusinessStatus() != null) existing.setBusinessStatus(enterprise.getBusinessStatus());
        if (enterprise.getIndustry() != null) existing.setIndustry(enterprise.getIndustry());
        if (enterprise.getIndustryCode() != null) existing.setIndustryCode(enterprise.getIndustryCode());
        if (enterprise.getAddress() != null) existing.setAddress(enterprise.getAddress());
        if (enterprise.getContactPerson() != null) existing.setContactPerson(enterprise.getContactPerson());
        if (enterprise.getContactPhone() != null) existing.setContactPhone(enterprise.getContactPhone());
        if (enterprise.getContactEmail() != null) existing.setContactEmail(enterprise.getContactEmail());
        if (enterprise.getBusinessScope() != null) existing.setBusinessScope(enterprise.getBusinessScope());
        if (enterprise.getEmployeeCount() != null) existing.setEmployeeCount(enterprise.getEmployeeCount());
        if (enterprise.getAnnualRevenue() != null) existing.setAnnualRevenue(enterprise.getAnnualRevenue());
        if (enterprise.getRemark() != null) existing.setRemark(enterprise.getRemark());
        
        return enterpriseRepository.save(existing);
    }

    /**
     * 获取用户详情
     */
    public User getUser(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    /**
     * 获取农户详情
     */
    public Farmer getFarmer(Long farmerId) {
        return farmerRepository.findById(farmerId).orElse(null);
    }

    /**
     * 根据用户ID获取农户信息
     */
    public Farmer getFarmerByUserId(Long userId) {
        return farmerRepository.findByUserId(userId).orElse(null);
    }

    /**
     * 获取企业详情
     */
    public Enterprise getEnterprise(Long enterpriseId) {
        return enterpriseRepository.findById(enterpriseId).orElse(null);
    }

    /**
     * 根据用户ID获取企业信息
     */
    public Enterprise getEnterpriseByUserId(Long userId) {
        return enterpriseRepository.findByUserId(userId).orElse(null);
    }

    /**
     * 获取用户列表
     */
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /**
     * 根据用户类型获取用户列表
     */
    public List<User> getUsersByType(User.UserType userType) {
        return userRepository.findByUserType(userType);
    }

    /**
     * 获取农户列表
     */
    public List<Farmer> getFarmers() {
        return farmerRepository.findAll();
    }

    /**
     * 获取企业列表
     */
    public List<Enterprise> getEnterprises() {
        return enterpriseRepository.findAll();
    }

    /**
     * 用户登录
     */
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("密码错误");
        }
        
        if (user.getStatus() != User.UserStatus.ACTIVE) {
            throw new RuntimeException("用户状态异常");
        }
        
        user.setLastLoginTime(LocalDateTime.now());
        userRepository.save(user);
        
        return user;
    }
    
    /**
     * 用户注册
     */
    public User registerUser(User user) {
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new RuntimeException("用户名不能为空");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("密码不能为空");
        }
        
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("用户名已存在");
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setStatus(User.UserStatus.ACTIVE);
        user.setTenantId("system");
        
        return userRepository.save(user);
    }
}
