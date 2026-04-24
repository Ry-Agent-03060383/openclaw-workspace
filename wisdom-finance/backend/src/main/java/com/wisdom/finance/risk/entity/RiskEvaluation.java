package com.wisdom.finance.risk.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 风险评估实体 - M6 风险评估模块
 */
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

    // Getters and Setters
    public String getEvaluationNo() {
        return evaluationNo;
    }

    public void setEvaluationNo(String evaluationNo) {
        this.evaluationNo = evaluationNo;
    }

    public String getEvaluationType() {
        return evaluationType;
    }

    public void setEvaluationType(String evaluationType) {
        this.evaluationType = evaluationType;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }

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

    public Integer getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public Integer getBasicQualificationScore() {
        return basicQualificationScore;
    }

    public void setBasicQualificationScore(Integer basicQualificationScore) {
        this.basicQualificationScore = basicQualificationScore;
    }

    public Integer getCreditRecordScore() {
        return creditRecordScore;
    }

    public void setCreditRecordScore(Integer creditRecordScore) {
        this.creditRecordScore = creditRecordScore;
    }

    public Integer getFinancialStatusScore() {
        return financialStatusScore;
    }

    public void setFinancialStatusScore(Integer financialStatusScore) {
        this.financialStatusScore = financialStatusScore;
    }

    public Integer getIndustryRiskScore() {
        return industryRiskScore;
    }

    public void setIndustryRiskScore(Integer industryRiskScore) {
        this.industryRiskScore = industryRiskScore;
    }

    public Integer getEstablishmentYears() {
        return establishmentYears;
    }

    public void setEstablishmentYears(Integer establishmentYears) {
        this.establishmentYears = establishmentYears;
    }

    public BigDecimal getRegisteredCapital() {
        return registeredCapital;
    }

    public void setRegisteredCapital(BigDecimal registeredCapital) {
        this.registeredCapital = registeredCapital;
    }

    public String getBusinessStatus() {
        return businessStatus;
    }

    public void setBusinessStatus(String businessStatus) {
        this.businessStatus = businessStatus;
    }

    public Integer getCreditScore() {
        return creditScore;
    }

    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }

    public Integer getHistoricalOverdueCount() {
        return historicalOverdueCount;
    }

    public void setHistoricalOverdueCount(Integer historicalOverdueCount) {
        this.historicalOverdueCount = historicalOverdueCount;
    }

    public Integer getLawsuitCount() {
        return lawsuitCount;
    }

    public void setLawsuitCount(Integer lawsuitCount) {
        this.lawsuitCount = lawsuitCount;
    }

    public BigDecimal getAnnualRevenue() {
        return annualRevenue;
    }

    public void setAnnualRevenue(BigDecimal annualRevenue) {
        this.annualRevenue = annualRevenue;
    }

    public BigDecimal getDebtRatio() {
        return debtRatio;
    }

    public void setDebtRatio(BigDecimal debtRatio) {
        this.debtRatio = debtRatio;
    }

    public String getCashFlowStatus() {
        return cashFlowStatus;
    }

    public void setCashFlowStatus(String cashFlowStatus) {
        this.cashFlowStatus = cashFlowStatus;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getIndustryCycle() {
        return industryCycle;
    }

    public void setIndustryCycle(String industryCycle) {
        this.industryCycle = industryCycle;
    }

    public String getPolicyImpact() {
        return policyImpact;
    }

    public void setPolicyImpact(String policyImpact) {
        this.policyImpact = policyImpact;
    }

    public LocalDateTime getEvaluateTime() {
        return evaluateTime;
    }

    public void setEvaluateTime(LocalDateTime evaluateTime) {
        this.evaluateTime = evaluateTime;
    }

    public String getModelVersion() {
        return modelVersion;
    }

    public void setModelVersion(String modelVersion) {
        this.modelVersion = modelVersion;
    }

    public String getRiskReport() {
        return riskReport;
    }

    public void setRiskReport(String riskReport) {
        this.riskReport = riskReport;
    }

    public String getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }

    public String getEvaluator() {
        return evaluator;
    }

    public void setEvaluator(String evaluator) {
        this.evaluator = evaluator;
    }
}