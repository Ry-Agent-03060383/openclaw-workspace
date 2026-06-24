package com.wisdom.finance.user.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;

/**
 * 担保公司信息实体
 */
@Entity
@Table(name = "t_guarantee_institution")
public class GuaranteeInstitution extends BaseEntity {

    @Column(name = "institution_name", length = 200, nullable = false)
    private String institutionName; // 担保公司名称

    @Column(name = "credit_code", unique = true, length = 18)
    private String creditCode; // 统一社会信用代码

    @Column(name = "legal_person", length = 50)
    private String legalPerson; // 法定代表人

    @Column(name = "registered_capital", precision = 18, scale = 2)
    private BigDecimal registeredCapital; // 注册资本（万元）

    @Column(name = "contact_phone", length = 20)
    private String contactPhone; // 联系电话

    @Column(name = "address", length = 300)
    private String address; // 地址

    @Column(name = "rating", length = 10)
    private String rating; // 评级

    @Column(name = "business_scope", length = 500)
    private String businessScope; // 经营范围

    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/DISABLED

    @Column(name = "user_id")
    private Long userId; // 关联的系统用户ID

    // Getters and Setters
    public String getInstitutionName() { return institutionName; }
    public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }
    public String getCreditCode() { return creditCode; }
    public void setCreditCode(String creditCode) { this.creditCode = creditCode; }
    public String getLegalPerson() { return legalPerson; }
    public void setLegalPerson(String legalPerson) { this.legalPerson = legalPerson; }
    public BigDecimal getRegisteredCapital() { return registeredCapital; }
    public void setRegisteredCapital(BigDecimal registeredCapital) { this.registeredCapital = registeredCapital; }
    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getRating() { return rating; }
    public void setRating(String rating) { this.rating = rating; }
    public String getBusinessScope() { return businessScope; }
    public void setBusinessScope(String businessScope) { this.businessScope = businessScope; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
