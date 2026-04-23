package com.wisdom.finance.risk.service;

import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.loan.entity.LoanApplication;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;

/**
 * 风险评分计算器 - M6 风险评估模块
 * 
 * 风险维度权重：
 * - 基础资质 30%（成立年限、注册资本、经营状态）
 * - 信用记录 35%（信用评分、历史逾期、诉讼记录）
 * - 财务状况 25%（营收规模、资产负债、现金流）
 * - 行业风险 10%（行业周期、政策影响）
 */
@Slf4j
@Service
public class RiskScoreCalculator {

    // 评估模型版本
    private static final String MODEL_VERSION = "v1.0.0";
    
    // 风险维度权重
    private static final double WEIGHT_BASIC_QUALIFICATION = 0.30;
    private static final double WEIGHT_CREDIT_RECORD = 0.35;
    private static final double WEIGHT_FINANCIAL_STATUS = 0.25;
    private static final double WEIGHT_INDUSTRY_RISK = 0.10;

    /**
     * 计算企业风险评分
     * 
     * @param company 企业信息
     * @param application 贷款申请（可选，可为null）
     * @return 风险评分计算结果
     */
    public RiskScoreResult calculateRiskScore(Company company, LoanApplication application) {
        log.info("开始计算企业[{}]风险评分", company.getCompanyName());
        
        RiskScoreResult result = new RiskScoreResult();
        result.setCompanyId(company.getId());
        result.setCompanyName(company.getCompanyName());
        result.setCreditCode(company.getCreditCode());
        result.setModelVersion(MODEL_VERSION);
        
        // 1. 计算基础资质评分 (30%)
        int basicScore = calculateBasicQualificationScore(company);
        result.setBasicQualificationScore(basicScore);
        
        // 2. 计算信用记录评分 (35%)
        int creditScore = calculateCreditRecordScore(company);
        result.setCreditRecordScore(creditScore);
        
        // 3. 计算财务状况评分 (25%)
        int financialScore = calculateFinancialStatusScore(company);
        result.setFinancialStatusScore(financialScore);
        
        // 4. 计算行业风险评分 (10%)
        int industryScore = calculateIndustryRiskScore(company);
        result.setIndustryRiskScore(industryScore);
        
        // 计算加权总分
        double totalScore = basicScore * WEIGHT_BASIC_QUALIFICATION
                + creditScore * WEIGHT_CREDIT_RECORD
                + financialScore * WEIGHT_FINANCIAL_STATUS
                + industryScore * WEIGHT_INDUSTRY_RISK;
        
        result.setRiskScore((int) Math.round(totalScore));
        
        // 获取风险等级
        result.setRiskLevel(getRiskLevel(result.getRiskScore()));
        
        // 填充详细信息
        result.setEstablishmentYears(calculateEstablishmentYears(company.getEstablishmentDate()));
        result.setRegisteredCapital(company.getRegisteredCapital());
        result.setBusinessStatus(company.getBusinessStatus());
        result.setCreditScore(company.getCreditScore());
        result.setIndustry(company.getIndustry());
        result.setAnnualRevenue(company.getAnnualRevenue());
        
        log.info("企业[{}]风险评分计算完成: 评分={}, 等级={}", 
                company.getCompanyName(), result.getRiskScore(), result.getRiskLevel());
        
        return result;
    }

    /**
     * 计算信用评分（独立于风险评估）
     * 
     * @param company 企业信息
     * @return 信用评分 0-100
     */
    public Integer calculateCreditScore(Company company) {
        log.info("计算企业[{}]信用评分", company.getCompanyName());
        
        // 基于企业信用评分字段，如果没有则计算
        if (company.getCreditScore() != null) {
            return company.getCreditScore();
        }
        
        // 根据成立年限、注册资本、经营状态计算基础信用分
        int score = 50; // 基础分
        
        // 成立年限加分
        int years = calculateEstablishmentYears(company.getEstablishmentDate());
        if (years >= 10) score += 20;
        else if (years >= 5) score += 15;
        else if (years >= 3) score += 10;
        else if (years >= 1) score += 5;
        
        // 注册资本加分
        if (company.getRegisteredCapital() != null) {
            if (company.getRegisteredCapital().compareTo(new BigDecimal("1000")) >= 0) {
                score += 15;
            } else if (company.getRegisteredCapital().compareTo(new BigDecimal("500")) >= 0) {
                score += 10;
            } else if (company.getRegisteredCapital().compareTo(new BigDecimal("100")) >= 0) {
                score += 5;
            }
        }
        
        // 经营状态加分
        if ("存续".equals(company.getBusinessStatus())) {
            score += 15;
        }
        
        return Math.min(100, score);
    }

    /**
     * 计算基础资质评分 (30%)
     * 包含：成立年限、注册资本、经营状态
     */
    private int calculateBasicQualificationScore(Company company) {
        int score = 0;
        
        // 成立年限评分 (40% of basic qualification)
        int years = calculateEstablishmentYears(company.getEstablishmentDate());
        if (years >= 10) score += 40;
        else if (years >= 7) score += 35;
        else if (years >= 5) score += 30;
        else if (years >= 3) score += 25;
        else if (years >= 1) score += 15;
        else score += 5;
        
        // 注册资本评分 (30% of basic qualification)
        if (company.getRegisteredCapital() != null) {
            if (company.getRegisteredCapital().compareTo(new BigDecimal("1000")) >= 0) {
                score += 30;
            } else if (company.getRegisteredCapital().compareTo(new BigDecimal("500")) >= 0) {
                score += 25;
            } else if (company.getRegisteredCapital().compareTo(new BigDecimal("200")) >= 0) {
                score += 20;
            } else if (company.getRegisteredCapital().compareTo(new BigDecimal("50")) >= 0) {
                score += 15;
            } else {
                score += 10;
            }
        }
        
        // 经营状态评分 (30% of basic qualification)
        String status = company.getBusinessStatus();
        if ("存续".equals(status)) {
            score += 30;
        } else if ("在业".equals(status)) {
            score += 30;
        } else if ("开业".equals(status)) {
            score += 25;
        } else {
            score += 0; // 吊销、注销等状态为0
        }
        
        return score;
    }

    /**
     * 计算信用记录评分 (35%)
     * 包含：信用评分、历史逾期、诉讼记录
     */
    private int calculateCreditRecordScore(Company company) {
        int score = 0;
        
        // 信用评分 (50% of credit record)
        Integer creditScore = company.getCreditScore();
        if (creditScore != null) {
            if (creditScore >= 90) score += 50;
            else if (creditScore >= 80) score += 45;
            else if (creditScore >= 70) score += 40;
            else if (creditScore >= 60) score += 30;
            else if (creditScore >= 50) score += 20;
            else score += 10;
        } else {
            score += 25; // 无信用评分记录给25分
        }
        
        // 历史逾期 (30% of credit record) - 假设从外部数据获取
        // 暂时给默认值
        score += 20; // 假设无逾期记录
        
        // 诉讼记录 (20% of credit record) - 假设从外部数据获取
        // 暂时给默认值
        score += 20; // 假设无诉讼记录
        
        return score;
    }

    /**
     * 计算财务状况评分 (25%)
     * 包含：营收规模、资产负债、现金流
     */
    private int calculateFinancialStatusScore(Company company) {
        int score = 0;
        
        // 年营收规模 (40% of financial status)
        if (company.getAnnualRevenue() != null) {
            if (company.getAnnualRevenue().compareTo(new BigDecimal("100000000")) >= 0) { // 1亿+
                score += 40;
            } else if (company.getAnnualRevenue().compareTo(new BigDecimal("50000000")) >= 0) { // 5000万+
                score += 35;
            } else if (company.getAnnualRevenue().compareTo(new BigDecimal("10000000")) >= 0) { // 1000万+
                score += 30;
            } else if (company.getAnnualRevenue().compareTo(new BigDecimal("5000000")) >= 0) { // 500万+
                score += 25;
            } else if (company.getAnnualRevenue().compareTo(new BigDecimal("1000000")) >= 0) { // 100万+
                score += 15;
            } else {
                score += 5;
            }
        } else {
            score += 15; // 无营收数据
        }
        
        // 资产负债率 (30% of financial status) - 假设从财务数据获取
        // 暂时给中等分
        score += 20;
        
        // 现金流 (30% of financial status) - 假设从财务数据获取
        // 暂时给中等分
        score += 20;
        
        return score;
    }

    /**
     * 计算行业风险评分 (10%)
     * 包含：行业周期、政策影响
     */
    private int calculateIndustryRiskScore(Company company) {
        int score = 100; // 基础分100，扣分明细如下
        
        String industry = company.getIndustry();
        if (industry == null) {
            return 70; // 无行业信息给70分
        }
        
        // 行业周期评估 - 高风险行业扣分
        if (isHighRiskIndustry(industry)) {
            score -= 40;
        } else if (isMediumRiskIndustry(industry)) {
            score -= 25;
        }
        
        // 政策影响评估
        if (isNegativePolicyIndustry(industry)) {
            score -= 30;
        }
        
        return Math.max(0, score);
    }

    /**
     * 根据评分获取风险等级
     * 
     * @param score 风险评分 0-100
     * @return 风险等级
     */
    public String getRiskLevel(int score) {
        if (score >= 90) return "AAA";
        if (score >= 80) return "AA";
        if (score >= 70) return "A";
        if (score >= 60) return "BBB";
        if (score >= 50) return "BB";
        if (score >= 40) return "B";
        return "C";
    }

    /**
     * 计算成立年限
     */
    private int calculateEstablishmentYears(LocalDate establishmentDate) {
        if (establishmentDate == null) {
            return 0;
        }
        return Period.between(establishmentDate, LocalDate.now()).getYears();
    }

    /**
     * 判断高风险行业
     */
    private boolean isHighRiskIndustry(String industry) {
        return industry.contains("房地产") || industry.contains("金融") 
                || industry.contains("投资") || industry.contains("担保")
                || industry.contains("典当") || industry.contains("P2P");
    }

    /**
     * 判断中等风险行业
     */
    private boolean isMediumRiskIndustry(String industry) {
        return industry.contains("建筑") || industry.contains("工程")
                || industry.contains("煤炭") || industry.contains("钢铁")
                || industry.contains("化工") || industry.contains("制造");
    }

    /**
     * 判断政策负面行业
     */
    private boolean isNegativePolicyIndustry(String industry) {
        return industry.contains("娱乐") || industry.contains("网吧")
                || industry.contains("高耗能") || industry.contains("淘汰类");
    }

    /**
     * 风险评分计算结果
     */
    public static class RiskScoreResult {
        private Long companyId;
        private String companyName;
        private String creditCode;
        private Integer riskScore;
        private String riskLevel;
        
        // 各维度评分
        private Integer basicQualificationScore;
        private Integer creditRecordScore;
        private Integer financialStatusScore;
        private Integer industryRiskScore;
        
        // 详细信息
        private Integer establishmentYears;
        private BigDecimal registeredCapital;
        private String businessStatus;
        private Integer creditScore;
        private String industry;
        private BigDecimal annualRevenue;
        private String modelVersion;
        
        // Getters and Setters
        public Long getCompanyId() { return companyId; }
        public void setCompanyId(Long companyId) { this.companyId = companyId; }
        public String getCompanyName() { return companyName; }
        public void setCompanyName(String companyName) { this.companyName = companyName; }
        public String getCreditCode() { return creditCode; }
        public void setCreditCode(String creditCode) { this.creditCode = creditCode; }
        public Integer getRiskScore() { return riskScore; }
        public void setRiskScore(Integer riskScore) { this.riskScore = riskScore; }
        public String getRiskLevel() { return riskLevel; }
        public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
        public Integer getBasicQualificationScore() { return basicQualificationScore; }
        public void setBasicQualificationScore(Integer basicQualificationScore) { this.basicQualificationScore = basicQualificationScore; }
        public Integer getCreditRecordScore() { return creditRecordScore; }
        public void setCreditRecordScore(Integer creditRecordScore) { this.creditRecordScore = creditRecordScore; }
        public Integer getFinancialStatusScore() { return financialStatusScore; }
        public void setFinancialStatusScore(Integer financialStatusScore) { this.financialStatusScore = financialStatusScore; }
        public Integer getIndustryRiskScore() { return industryRiskScore; }
        public void setIndustryRiskScore(Integer industryRiskScore) { this.industryRiskScore = industryRiskScore; }
        public Integer getEstablishmentYears() { return establishmentYears; }
        public void setEstablishmentYears(Integer establishmentYears) { this.establishmentYears = establishmentYears; }
        public BigDecimal getRegisteredCapital() { return registeredCapital; }
        public void setRegisteredCapital(BigDecimal registeredCapital) { this.registeredCapital = registeredCapital; }
        public String getBusinessStatus() { return businessStatus; }
        public void setBusinessStatus(String businessStatus) { this.businessStatus = businessStatus; }
        public Integer getCreditScore() { return creditScore; }
        public void setCreditScore(Integer creditScore) { this.creditScore = creditScore; }
        public String getIndustry() { return industry; }
        public void setIndustry(String industry) { this.industry = industry; }
        public BigDecimal getAnnualRevenue() { return annualRevenue; }
        public void setAnnualRevenue(BigDecimal annualRevenue) { this.annualRevenue = annualRevenue; }
        public String getModelVersion() { return modelVersion; }
        public void setModelVersion(String modelVersion) { this.modelVersion = modelVersion; }
    }
}