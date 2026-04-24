package com.wisdom.finance.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 企业实体 - 企业信息管理
 */
@Entity
@Table(name = "t_enterprise")
public class Enterprise extends BaseEntity {
    
    @Column(name = "user_id", unique = true)
    private Long userId; // 关联的用户ID
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @JsonIgnore
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

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getEnterpriseName() { return enterpriseName; }
    public void setEnterpriseName(String enterpriseName) { this.enterpriseName = enterpriseName; }
    public String getCreditCode() { return creditCode; }
    public void setCreditCode(String creditCode) { this.creditCode = creditCode; }
    public String getLegalPerson() { return legalPerson; }
    public void setLegalPerson(String legalPerson) { this.legalPerson = legalPerson; }
    public String getLegalPersonId() { return legalPersonId; }
    public void setLegalPersonId(String legalPersonId) { this.legalPersonId = legalPersonId; }
    public BigDecimal getRegisteredCapital() { return registeredCapital; }
    public void setRegisteredCapital(BigDecimal registeredCapital) { this.registeredCapital = registeredCapital; }
    public LocalDate getEstablishmentDate() { return establishmentDate; }
    public void setEstablishmentDate(LocalDate establishmentDate) { this.establishmentDate = establishmentDate; }
    public String getBusinessStatus() { return businessStatus; }
    public void setBusinessStatus(String businessStatus) { this.businessStatus = businessStatus; }
    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }
    public String getIndustryCode() { return industryCode; }
    public void setIndustryCode(String industryCode) { this.industryCode = industryCode; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
    public String getBusinessScope() { return businessScope; }
    public void setBusinessScope(String businessScope) { this.businessScope = businessScope; }
    public Integer getEmployeeCount() { return employeeCount; }
    public void setEmployeeCount(Integer employeeCount) { this.employeeCount = employeeCount; }
    public BigDecimal getAnnualRevenue() { return annualRevenue; }
    public void setAnnualRevenue(BigDecimal annualRevenue) { this.annualRevenue = annualRevenue; }
    public Integer getCreditScore() { return creditScore; }
    public void setCreditScore(Integer creditScore) { this.creditScore = creditScore; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }
}
