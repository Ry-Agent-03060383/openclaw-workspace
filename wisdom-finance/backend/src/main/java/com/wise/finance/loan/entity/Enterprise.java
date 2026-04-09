package com.wisdom.finance.loan.entity;

import com.wisdom.loan.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 企业信息
 */
@Entity
@Table(name = "t_enterprise")
@Getter
@Setter
public class Enterprise extends BaseEntity {
    
    /** 企业名称 */
    @Column(nullable = false, length = 200)
    private String name;
    
    /** 统一社会信用代码 */
    @Column(unique = true, length = 18)
    private String creditCode;
    
    /** 法定代表人 */
    @Column(length = 50)
    private String legalPerson;
    
    /** 注册资本 */
    @Column(precision = 18, scale = 2)
    private BigDecimal registeredCapital;
    
    /** 成立日期 */
    private LocalDate establishedDate;
    
    /** 经营范围 */
    @Column(length = 500)
    private String businessScope;
    
    /** 所属行业 */
    @Column(length = 50)
    private String industry;
    
    /** 员工人数 */
    private Integer employeeCount;
    
    /** 年营业额 */
    @Column(precision = 18, scale = 2)
    private BigDecimal annualRevenue;
    
    /** 信用评级 */
    @Column(length = 10)
    private String creditRating;
    
    /** 营业执照 */
    @Column(length = 500)
    private String businessLicense;
    
    /** 联系人 */
    @Column(length = 50)
    private String contactPerson;
    
    /** 联系电话 */
    @Column(length = 20)
    private String contactPhone;
    
    /** 地址 */
    @Column(length = 500)
    private String address;
}