package com.wisdom.finance.user.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

/**
 * 用户实体
 */
@Entity
@Table(name = "sys_user")
@Getter
@Setter
public class User extends BaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /** 用户名 */
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    
    /** 密码 */
    @Column(nullable = false)
    private String password;
    
    /** 真实姓名 */
    @Column(length = 50)
    private String realName;
    
    /** 手机号 */
    @Column(length = 20)
    private String phone;
    
    /** 邮箱 */
    @Column(length = 100)
    private String email;
    
    /** 用户类型: ENTERPRISE-企业, BANK-银行, THIRD_PARTY-第三方, OPERATION-运营 */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UserType userType;
    
    /** 状态: 0-禁用, 1-正常 */
    @Column(nullable = false)
    private Boolean status = true;
    
    /** 企业ID(如果用户类型为企业) */
    @Column(name = "enterprise_id")
    private Long enterpriseId;
    
    /** 银行ID(如果用户类型为银行) */
    @Column(name = "bank_id")
    private Long bankId;
    
    public enum UserType {
        ENTERPRISE,
        BANK,
        THIRD_PARTY,
        OPERATION
    }
}