package com.wisdom.finance.risk.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 风险评估实体 - M6 风险评估模块
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_risk_evaluation")
public class RiskEvaluation extends BaseEntity {
    
    @Column(name = "evaluation_no", unique = true, length = 32)
    private String evaluationNo; // 评估编号
    
    @Column(name = "evaluation_type", length = 20)
    private String evaluationType; // 评估类型: COMPANY/APPLICATION
    
    @Column(name = "company_id")
    private Long companyId; // 企业ID
    
    @Column(name = "application_id")
    private Long applicationId; // 贷款申请ID
    
    @Column(name = "company_name", length = 200)
    private String companyName; // 企业名称
    
    @Column(name = "credit_code", length = 18)
    private String creditCode; // 统一社会信用代码
    
    @Column(name = "risk_score")
    private Integer riskScore; // 风险评分 0-100
    
    @Column(name = "risk_level", length = 10)
    private String riskLevel; // 风险等级: AAA/AA/A/BBB/BB/B/C
    
    // ==================== 各项维度评分 ====================
    
    @Column(name = "basic_qualification_score")
    private Integer basicQualificationScore; // 基础资质评分 0-100
    
    @Column(name = "credit_record_score")
    private Integer creditRecordScore; // 信用记录评分 0-100
    
    @Column(name = "financial_status_score")
    private Integer financialStatusScore; // 财务状况评分 0-100
    
    @Column(name = "industry_risk_score")
    private Integer industryRiskScore; // 行业风险评分 0-100
    
    // ==================== 基础资质明细 ====================
    
    @Column(name = "establishment_years")
    private Integer establishmentYears; // 成立年限
    
    @Column(name = "registered_capital")
    private BigDecimal registeredCapital; // 注册资本
    
    @Column(name = "business_status", length = 20)
    private String businessStatus; // 经营状态
    
    // ==================== 信用记录明细 ====================
    
    @Column(name = "credit_score")
    private Integer creditScore; // 信用评分
    
    @Column(name = "historical_overdue_count")
    private Integer historicalOverdueCount; // 历史逾期次数
    
    @Column(name = "lawsuit_count")
    private Integer lawsuitCount; // 诉讼记录数量
    
    // ==================== 财务状况明细 ====================
    
    @Column(name = "annual_revenue")
    private BigDecimal annualRevenue; // 年营收
    
    @Column(name = "debt_ratio")
    private BigDecimal debtRatio; // 资产负债率
    
    @Column(name = "cash_flow_status", length = 20)
    private String cashFlowStatus; // 现金流状况
    
    // ==================== 行业风险明细 ====================
    
    @Column(name = "industry", length = 100)
    private String industry; // 所属行业
    
    @Column(name = "industry_cycle", length = 20)
    private String industryCycle; // 行业周期
    
    @Column(name = "policy_impact", length = 20)
    private String policyImpact; // 政策影响
    
    // ==================== 评估信息 ====================
    
    @Column(name = "evaluate_time")
    private LocalDateTime evaluateTime; // 评估时间
    
    @Column(name = "model_version", length = 20)
    private String modelVersion; // 评估模型版本
    
    @Column(name = "risk_report", columnDefinition = "TEXT")
    private String riskReport; // 风险报告JSON
    
    @Column(name = "suggestion", length = 500)
    private String suggestion; // 建议
    
    @Column(name = "evaluator", length = 50)
    private String evaluator; // 评估人/系统
}