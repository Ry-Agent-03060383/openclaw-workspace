package com.wisdom.finance.credit.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 企业信息实体 - M1 企业信用查询
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_company")
public class Company extends BaseEntity {
    
    @Column(name = "company_name", nullable = false, length = 200)
    private String companyName;
    
    @Column(name = "credit_code", unique = true, length = 18)
    private String creditCode; // 统一社会信用代码
    
    @Column(name = "legal_person", length = 50)
    private String legalPerson; // 法定代表人
    
    @Column(name = "registered_capital", precision = 18, scale = 2)
    private BigDecimal registeredCapital; // 注册资本
    
    @Column(name = "establishment_date")
    private LocalDate establishmentDate; // 成立日期
    
    @Column(name = "business_status", length = 20)
    private String businessStatus; // 经营状态: 存续/吊销/注销
    
    @Column(name = "industry", length = 100)
    private String industry; // 所属行业
    
    @Column(name = "region_code", length = 6)
    private String regionCode; // 行政区划代码
    
    @Column(name = "address", length = 500)
    private String address; // 企业地址
    
    @Column(name = "credit_score")
    private Integer creditScore; // 信用评分 0-100
    
    @Column(name = "risk_level", length = 10)
    private String riskLevel; // 风险等级: AAA/AA/A/BBB/BB/B/C
    
    @Column(name = "business_scope", columnDefinition = "TEXT")
    private String businessScope; // 经营范围
    
    @Column(name = "employee_count")
    private Integer employeeCount; // 员工人数
    
    @Column(name = "annual_revenue", precision = 18, scale = 2)
    private BigDecimal annualRevenue; // 年营收
    
    @Column(name = "data_source", length = 50)
    private String dataSource; // 数据来源
    
    // 手动添加getter和setter方法，解决Lombok问题
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getCreditCode() {
        return creditCode;
    }
    
    public void setCreditCode(String creditCode) {
        this.creditCode = creditCode;
    }
    
    public String getLegalPerson() {
        return legalPerson;
    }
    
    public void setLegalPerson(String legalPerson) {
        this.legalPerson = legalPerson;
    }
    
    public BigDecimal getRegisteredCapital() {
        return registeredCapital;
    }
    
    public void setRegisteredCapital(BigDecimal registeredCapital) {
        this.registeredCapital = registeredCapital;
    }
    
    public LocalDate getEstablishmentDate() {
        return establishmentDate;
    }
    
    public void setEstablishmentDate(LocalDate establishmentDate) {
        this.establishmentDate = establishmentDate;
    }
    
    public String getBusinessStatus() {
        return businessStatus;
    }
    
    public void setBusinessStatus(String businessStatus) {
        this.businessStatus = businessStatus;
    }
    
    public String getIndustry() {
        return industry;
    }
    
    public void setIndustry(String industry) {
        this.industry = industry;
    }
    
    public String getRegionCode() {
        return regionCode;
    }
    
    public void setRegionCode(String regionCode) {
        this.regionCode = regionCode;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public Integer getCreditScore() {
        return creditScore;
    }
    
    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }
    
    public String getRiskLevel() {
        return riskLevel;
    }
    
    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
    
    public String getBusinessScope() {
        return businessScope;
    }
    
    public void setBusinessScope(String businessScope) {
        this.businessScope = businessScope;
    }
    
    public Integer getEmployeeCount() {
        return employeeCount;
    }
    
    public void setEmployeeCount(Integer employeeCount) {
        this.employeeCount = employeeCount;
    }
    
    public BigDecimal getAnnualRevenue() {
        return annualRevenue;
    }
    
    public void setAnnualRevenue(BigDecimal annualRevenue) {
        this.annualRevenue = annualRevenue;
    }
    
    public String getDataSource() {
        return dataSource;
    }
    
    public void setDataSource(String dataSource) {
        this.dataSource = dataSource;
    }
}