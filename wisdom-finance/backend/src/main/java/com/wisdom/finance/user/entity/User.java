package com.wisdom.user.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EquasAndHashCode;

/**
 * 用户实体 - 支持多租户多角色
 */
@Data
@EquasAndHashCode(callSuper = true)
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
    @Column(name = "user_type", nullable = false, length = 20)
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
}