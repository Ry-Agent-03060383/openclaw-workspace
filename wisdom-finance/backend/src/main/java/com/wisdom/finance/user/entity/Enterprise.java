package com.wisdom.finance.user.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 企业实体 - 企业信息管理
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_enterprise")
public class Enterprise extends BaseEntity {
    
    @Column(name = "user_id", unique = true)
    private Long userId; // 关联的用户ID
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
    
    @Column(name = "enterprise_name", length = 200, nullable = false)
    private String enterpriseName; // 企业名称
    
    @Column(name = "credit_code", length = 18, unique = true, nullable = false)
    private String creditCode; // 统一社会信用代码
    
    @Column(name = "legal_person", length = 50)
    private String legalPerson; // 法定代表人
    
    @Column(name = "legal_person_id", length = 18)
    private String legalPersonId; // 法人身份证号
    
    @Column(name = "registered_capital", precision = 18, scale = 2)
    private BigDecimal registeredCapital; // 注册资本
    
    @Column(name = "establishment_date")
    private LocalDate establishmentDate; // 成立日期
    
    @Column(name = "business_status", length = 20)
    private String businessStatus; // 经营状态
    
    @Column(name = "industry", length = 100)
    private String industry; // 所属行业
    
    @Column(name = "industry_code", length = 10)
    private String industryCode; // 行业代码
    
    @Column(name = "address", length = 500)
    private String address; // 企业地址
    
    @Column(name = "contact_person", length = 50)
    private String contactPerson; // 联系人
    
    @Column(name = "contact_phone", length = 20)
    private String contactPhone; // 联系电话
    
    @Column(name = "contact_email", length = 100)
    private String contactEmail; // 联系邮箱
    
    @Column(name = "business_scope", columnDefinition = "TEXT")
    private String businessScope; // 经营范围
    
    @Column(name = "employee_count")
    private Integer employeeCount; // 员工人数
    
    @Column(name = "annual_revenue", precision = 18, scale = 2)
    private BigDecimal annualRevenue; // 年营收
    
    @Column(name = "credit_score")
    private Integer creditScore; // 信用评分
    
    @Column(name = "risk_level", length = 10)
    private String riskLevel; // 风险等级
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/INACTIVE
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注
}
