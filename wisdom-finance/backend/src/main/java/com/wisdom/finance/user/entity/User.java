package com.wisdom.finance.user.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;

/**
 * 用户实体 - 支持多租户多角色
 */
@Entity
@Table(name = "t_user")
public class User extends BaseEntity {
    
    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;
    
    @Column(name = "password", nullable = false, length = 200)
    private String password;
    
    @Column(name = "real_name", length = 50)
    private String realName;
    
    @Column(name = "phone", length = 20)
    private String phone;
    
    @Column(name = "email", length = 100)
    private String email;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false, length = 25)
    private UserType userType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private UserStatus status = UserStatus.ACTIVE;
    
    @Column(name = "tenant_id", length = 32)
    private String tenantId; // 租户ID
    
    @Column(name = "city_code", length = 6)
    private String cityCode; // 地市代码
    
    @Column(name = "last_login_time")
    private java.time.LocalDateTime lastLoginTime;
    
    /**
     * 用户类型 - 对应 PRD 中的目标用户
     */
    public enum UserType {
        SME,                    // 中小企业
        FARMER,                 // 农户
        FINANCIAL_INSTITUTION,  // 金融机构
        RISK_MANAGER,           // 风控人员
        ADMIN,                  // 管理人员（平台运营）
        GOVERNMENT,             // 政府部门
        THIRD_PARTY             // 第三方服务商
    }
    
    public enum UserStatus {
        ACTIVE,    // 正常
        DISABLED,  // 禁用
        PENDING    // 待审核
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRealName() { return realName; }
    public void setRealName(String realName) { this.realName = realName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public UserType getUserType() { return userType; }
    public void setUserType(UserType userType) { this.userType = userType; }
    public UserStatus getStatus() { return status; }
    public void setStatus(UserStatus status) { this.status = status; }
    public String getTenantId() { return tenantId; }
    public void setTenantId(String tenantId) { this.tenantId = tenantId; }
    public String getCityCode() { return cityCode; }
    public void setCityCode(String cityCode) { this.cityCode = cityCode; }
    public java.time.LocalDateTime getLastLoginTime() { return lastLoginTime; }
    public void setLastLoginTime(java.time.LocalDateTime lastLoginTime) { this.lastLoginTime = lastLoginTime; }
}