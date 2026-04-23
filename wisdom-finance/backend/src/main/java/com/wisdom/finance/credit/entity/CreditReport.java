package com.wisdom.finance.credit.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 信用报告实体 - 企业信用报告
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_credit_report")
public class CreditReport extends BaseEntity {
    
    @Column(name = "report_no", unique = true, length = 32, nullable = false)
    private String reportNo; // 报告编号
    
    @Column(name = "company_id")
    private Long companyId; // 企业ID
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", insertable = false, updatable = false)
    private Company company;
    
    @Column(name = "company_name", length = 200)
    private String companyName; // 企业名称
    
    @Column(name = "credit_code", length = 18)
    private String creditCode; // 统一社会信用代码
    
    @Column(name = "report_type", length = 50)
    private String reportType; // 报告类型：基础版/标准版/详细版
    
    @Column(name = "credit_score")
    private Integer creditScore; // 信用评分
    
    @Column(name = "credit_level", length = 10)
    private String creditLevel; // 信用等级
    
    @Column(name = "risk_level", length = 10)
    private String riskLevel; // 风险等级
    
    @Column(name = "report_date")
    private LocalDate reportDate; // 报告生成日期
    
    @Column(name = "valid_until")
    private LocalDate validUntil; // 报告有效期
    
    @Column(name = "data_sources", length = 500)
    private String dataSources; // 数据来源
    
    @Column(name = "basic_info", columnDefinition = "TEXT")
    private String basicInfo; // 企业基本信息 JSON
    
    @Column(name = "credit_history", columnDefinition = "TEXT")
    private String creditHistory; // 信用历史 JSON
    
    @Column(name = "financial_info", columnDefinition = "TEXT")
    private String financialInfo; // 财务信息 JSON
    
    @Column(name = "legal_info", columnDefinition = "TEXT")
    private String legalInfo; // 法律信息 JSON
    
    @Column(name = "industry_info", columnDefinition = "TEXT")
    private String industryInfo; // 行业信息 JSON
    
    @Column(name = "risk_analysis", columnDefinition = "TEXT")
    private String riskAnalysis; // 风险分析 JSON
    
    @Column(name = "suggestions", columnDefinition = "TEXT")
    private String suggestions; // 建议 JSON
    
    @Column(name = "status", length = 20)
    private String status; // 报告状态：GENERATED/EXPIRED
    
    @Column(name = "generated_by", length = 50)
    private String generatedBy; // 生成人
    
    @Column(name = "generation_time")
    private LocalDateTime generationTime; // 生成时间
}
