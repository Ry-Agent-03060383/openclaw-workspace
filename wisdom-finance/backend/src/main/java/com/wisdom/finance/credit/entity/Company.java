package com.wisdom.credit.entity;

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
}