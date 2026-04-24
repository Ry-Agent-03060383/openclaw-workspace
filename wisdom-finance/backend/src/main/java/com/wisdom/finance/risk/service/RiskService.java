package com.wisdom.finance.risk.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.risk.entity.RiskEvaluation;
import com.wisdom.finance.risk.mapper.RiskEvaluationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 风险评估服务 - M6 风险评估模块
 */
@Service
public class RiskService {
    
    private static final Logger log = LoggerFactory.getLogger(RiskService.class);

    @Autowired
    private RiskEvaluationRepository riskEvaluationRepository;
    
    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private LoanApplicationRepository loanApplicationRepository;
    
    @Autowired
    private RiskScoreCalculator riskScoreCalculator;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    /**
     * 企业风险评估
     * 
     * @param companyId 企业ID
     * @return 评估结果
     */
    @Transactional
    public RiskEvaluation evaluateCompany(Long companyId) {
        log.info("开始企业风险评估，企业ID: {}", companyId);
        
        // 查询企业信息
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("企业不存在: " + companyId));
        
        // 计算风险评分
        RiskScoreCalculator.RiskScoreResult scoreResult = riskScoreCalculator.calculateRiskScore(company, null);
        
        // 创建评估记录
        RiskEvaluation evaluation = new RiskEvaluation();
        evaluation.setEvaluationNo(generateEvaluationNo("C"));
        evaluation.setEvaluationType("COMPANY");
        evaluation.setCompanyId(company.getId());
        evaluation.setCompanyName(company.getCompanyName());
        evaluation.setCreditCode(company.getCreditCode());
        evaluation.setRiskScore(scoreResult.getRiskScore());
        evaluation.setRiskLevel(scoreResult.getRiskLevel());
        
        // 各维度评分
        evaluation.setBasicQualificationScore(scoreResult.getBasicQualificationScore());
        evaluation.setCreditRecordScore(scoreResult.getCreditRecordScore());
        evaluation.setFinancialStatusScore(scoreResult.getFinancialStatusScore());
        evaluation.setIndustryRiskScore(scoreResult.getIndustryRiskScore());
        
        // 详细信息
        evaluation.setEstablishmentYears(scoreResult.getEstablishmentYears());
        evaluation.setRegisteredCapital(scoreResult.getRegisteredCapital());
        evaluation.setBusinessStatus(scoreResult.getBusinessStatus());
        evaluation.setCreditScore(scoreResult.getCreditScore());
        evaluation.setIndustry(scoreResult.getIndustry());
        evaluation.setAnnualRevenue(scoreResult.getAnnualRevenue());
        
        // 评估信息
        evaluation.setEvaluateTime(LocalDateTime.now());
        evaluation.setModelVersion(scoreResult.getModelVersion());
        evaluation.setEvaluator("SYSTEM");
        evaluation.setSuggestion(generateSuggestion(scoreResult));
        
        // 生成风险报告
        evaluation.setRiskReport(generateRiskReport(evaluation, scoreResult));
        
        // 保存评估结果
        RiskEvaluation saved = riskEvaluationRepository.save(evaluation);
        
        // 更新企业的风险等级
        company.setRiskLevel(scoreResult.getRiskLevel());
        company.setCreditScore(scoreResult.getCreditScore());
        companyRepository.save(company);
        
        log.info("企业风险评估完成，评估编号: {}, 风险等级: {}", saved.getEvaluationNo(), saved.getRiskLevel());
        
        return saved;
    }
    
    /**
     * 贷款申请风险评估
     * 
     * @param applicationId 贷款申请ID
     * @return 评估结果
     */
    @Transactional
    public RiskEvaluation evaluateApplication(Long applicationId) {
        log.info("开始贷款申请风险评估，申请ID: {}", applicationId);
        
        // 查询贷款申请信息
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("贷款申请不存在: " + applicationId));
        
        // 查询企业信息
        Company company = companyRepository.findById(application.getCompanyId())
                .orElseThrow(() -> new RuntimeException("企业不存在: " + application.getCompanyId()));
        
        // 计算风险评分（包含申请信息）
        RiskScoreCalculator.RiskScoreResult scoreResult = riskScoreCalculator.calculateRiskScore(company, application);
        
        // 创建评估记录
        RiskEvaluation evaluation = new RiskEvaluation();
        evaluation.setEvaluationNo(generateEvaluationNo("A"));
        evaluation.setEvaluationType("APPLICATION");
        evaluation.setCompanyId(company.getId());
        evaluation.setApplicationId(application.getId());
        evaluation.setCompanyName(company.getCompanyName());
        evaluation.setCreditCode(company.getCreditCode());
        evaluation.setRiskScore(scoreResult.getRiskScore());
        evaluation.setRiskLevel(scoreResult.getRiskLevel());
        
        // 各维度评分
        evaluation.setBasicQualificationScore(scoreResult.getBasicQualificationScore());
        evaluation.setCreditRecordScore(scoreResult.getCreditRecordScore());
        evaluation.setFinancialStatusScore(scoreResult.getFinancialStatusScore());
        evaluation.setIndustryRiskScore(scoreResult.getIndustryRiskScore());
        
        // 详细信息
        evaluation.setEstablishmentYears(scoreResult.getEstablishmentYears());
        evaluation.setRegisteredCapital(scoreResult.getRegisteredCapital());
        evaluation.setBusinessStatus(scoreResult.getBusinessStatus());
        evaluation.setCreditScore(scoreResult.getCreditScore());
        evaluation.setIndustry(scoreResult.getIndustry());
        evaluation.setAnnualRevenue(scoreResult.getAnnualRevenue());
        
        // 评估信息
        evaluation.setEvaluateTime(LocalDateTime.now());
        evaluation.setModelVersion(scoreResult.getModelVersion());
        evaluation.setEvaluator("SYSTEM");
        evaluation.setSuggestion(generateSuggestion(scoreResult));
        
        // 生成风险报告
        evaluation.setRiskReport(generateRiskReport(evaluation, scoreResult));
        
        // 保存评估结果
        RiskEvaluation saved = riskEvaluationRepository.save(evaluation);
        
        // 更新申请的风险信息
        application.setRiskScore(scoreResult.getRiskScore());
        application.setRiskLevel(scoreResult.getRiskLevel());
        application.setCreditScore(scoreResult.getCreditScore());
        loanApplicationRepository.save(application);
        
        log.info("贷款申请风险评估完成，评估编号: {}, 风险等级: {}", saved.getEvaluationNo(), saved.getRiskLevel());
        
        return saved;
    }
    
    /**
     * 根据评分获取风险等级
     * 
     * @param score 风险评分 0-100
     * @return 风险等级
     */
    public String getRiskLevel(int score) {
        return riskScoreCalculator.getRiskLevel(score);
    }
    
    /**
     * 获取风险报告
     * 
     * @param evaluationId 评估ID
     * @return 风险报告
     */
    public RiskEvaluation getRiskReport(Long evaluationId) {
        log.info("获取风险报告，评估ID: {}", evaluationId);
        
        RiskEvaluation evaluation = riskEvaluationRepository.findById(evaluationId)
                .orElseThrow(() -> new RuntimeException("评估记录不存在: " + evaluationId));
        
        return evaluation;
    }
    
    /**
     * 根据评估编号获取风险报告
     * 
     * @param evaluationNo 评估编号
     * @return 风险报告
     */
    public RiskEvaluation getRiskReportByNo(String evaluationNo) {
        log.info("获取风险报告，评估编号: {}", evaluationNo);
        
        RiskEvaluation evaluation = riskEvaluationRepository.findByEvaluationNo(evaluationNo);
        if (evaluation == null) {
            throw new RuntimeException("评估记录不存在: " + evaluationNo);
        }
        
        return evaluation;
    }
    
    /**
     * 生成评估编号
     * 
     * @param prefix 前缀 C:企业 A:申请
     * @return 评估编号
     */
    private String generateEvaluationNo(String prefix) {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return prefix + timestamp + uuid;
    }
    
    /**
     * 生成评估建议
     */
    private String generateSuggestion(RiskScoreCalculator.RiskScoreResult scoreResult) {
        String level = scoreResult.getRiskLevel();
        
        if ("AAA".equals(level) || "AA".equals(level) || "A".equals(level)) {
            return "企业资质优秀，风险等级" + level + "，建议批准贷款申请，可提供优惠利率。";
        } else if ("BBB".equals(level)) {
            return "企业资质良好，风险等级" + level + "，建议批准贷款申请，维持标准利率。";
        } else if ("BB".equals(level)) {
            return "企业资质一般，风险等级" + level + "，建议审慎评估，可考虑降低贷款额度或提高利率。";
        } else if ("B".equals(level)) {
            return "企业资质较弱，风险等级" + level + "，建议降低贷款额度或要求提供担保。";
        } else {
            return "企业风险较高，风险等级" + level + "，建议拒绝贷款申请或需要提供强担保。";
        }
    }
    
    /**
     * 生成风险报告JSON
     */
    private String generateRiskReport(RiskEvaluation evaluation, RiskScoreCalculator.RiskScoreResult scoreResult) {
        try {
            Map<String, Object> report = new HashMap<>();
            report.put("evaluationNo", evaluation.getEvaluationNo());
            report.put("companyName", evaluation.getCompanyName());
            report.put("creditCode", evaluation.getCreditCode());
            report.put("riskScore", evaluation.getRiskScore());
            report.put("riskLevel", evaluation.getRiskLevel());
            report.put("evaluateTime", evaluation.getEvaluateTime().toString());
            report.put("modelVersion", evaluation.getModelVersion());
            
            // 维度评分
            Map<String, Object> dimensionScores = new HashMap<>();
            dimensionScores.put("basicQualification", Map.of(
                "score", evaluation.getBasicQualificationScore(),
                "weight", "30%",
                "desc", "基础资质（成立年限、注册资本、经营状态）"
            ));
            dimensionScores.put("creditRecord", Map.of(
                "score", evaluation.getCreditRecordScore(),
                "weight", "35%",
                "desc", "信用记录（信用评分、历史逾期、诉讼记录）"
            ));
            dimensionScores.put("financialStatus", Map.of(
                "score", evaluation.getFinancialStatusScore(),
                "weight", "25%",
                "desc", "财务状况（营收规模、资产负债、现金流）"
            ));
            dimensionScores.put("industryRisk", Map.of(
                "score", evaluation.getIndustryRiskScore(),
                "weight", "10%",
                "desc", "行业风险（行业周期、政策影响）"
            ));
            report.put("dimensionScores", dimensionScores);
            
            // 详细信息
            Map<String, Object> details = new HashMap<>();
            details.put("establishmentYears", evaluation.getEstablishmentYears());
            details.put("registeredCapital", evaluation.getRegisteredCapital());
            details.put("businessStatus", evaluation.getBusinessStatus());
            details.put("creditScore", evaluation.getCreditScore());
            details.put("industry", evaluation.getIndustry());
            details.put("annualRevenue", evaluation.getAnnualRevenue());
            report.put("details", details);
            
            // 建议
            report.put("suggestion", evaluation.getSuggestion());
            
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(report);
        } catch (Exception e) {
            log.error("生成风险报告失败", e);
            return "{}";
        }
    }
}