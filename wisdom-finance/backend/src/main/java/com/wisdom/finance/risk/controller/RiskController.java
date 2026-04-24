package com.wisdom.finance.risk.controller;

import com.wisdom.finance.risk.entity.RiskEvaluation;
import com.wisdom.finance.risk.service.RiskService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 风险评估控制器 - M6 风险评估模块
 */
@RestController
@RequestMapping("/api/risk")
@RequiredArgsConstructor
public class RiskController {
    
    private static final Logger log = LoggerFactory.getLogger(RiskController.class);
    
    private final RiskService riskService;
    
    /**
     * 企业风险评估
     * POST /api/risk/evaluate/company
     */
    @PostMapping("/evaluate/company")
    public ResponseEntity<Map<String, Object>> evaluateCompany(
            @RequestBody EvaluateCompanyRequest request) {
        
        log.info("收到企业风险评估请求，企业ID: {}", request.getCompanyId());
        
        RiskEvaluation evaluation = riskService.evaluateCompany(request.getCompanyId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "企业风险评估完成");
        response.put("data", buildEvaluationResponse(evaluation));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 贷款申请风险评估
     * POST /api/risk/evaluate/application
     */
    @PostMapping("/evaluate/application")
    public ResponseEntity<Map<String, Object>> evaluateApplication(
            @RequestBody EvaluateApplicationRequest request) {
        
        log.info("收到贷款申请风险评估请求，申请ID: {}", request.getApplicationId());
        
        RiskEvaluation evaluation = riskService.evaluateApplication(request.getApplicationId());
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "贷款申请风险评估完成");
        response.put("data", buildEvaluationResponse(evaluation));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 获取风险报告
     * GET /api/risk/report/{evaluationId}
     */
    @GetMapping("/report/{evaluationId}")
    public ResponseEntity<Map<String, Object>> getRiskReport(
            @PathVariable Long evaluationId) {
        
        log.info("获取风险报告，评估ID: {}", evaluationId);
        
        RiskEvaluation evaluation = riskService.getRiskReport(evaluationId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", buildFullReportResponse(evaluation));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 根据评估编号获取风险报告
     * GET /api/risk/report/no/{evaluationNo}
     */
    @GetMapping("/report/no/{evaluationNo}")
    public ResponseEntity<Map<String, Object>> getRiskReportByNo(
            @PathVariable String evaluationNo) {
        
        log.info("获取风险报告，评估编号: {}", evaluationNo);
        
        RiskEvaluation evaluation = riskService.getRiskReportByNo(evaluationNo);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", buildFullReportResponse(evaluation));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 获取风险等级（根据评分）
     * GET /api/risk/level/{score}
     */
    @GetMapping("/level/{score}")
    public ResponseEntity<Map<String, Object>> getRiskLevel(@PathVariable Integer score) {
        
        log.info("获取风险等级，评分: {}", score);
        
        String level = riskService.getRiskLevel(score);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", Map.of(
                "score", score,
                "level", level
        ));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 构建评估响应
     */
    private Map<String, Object> buildEvaluationResponse(RiskEvaluation evaluation) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", evaluation.getId());
        map.put("evaluationNo", evaluation.getEvaluationNo());
        map.put("evaluationType", evaluation.getEvaluationType());
        map.put("companyId", evaluation.getCompanyId());
        map.put("companyName", evaluation.getCompanyName());
        map.put("riskScore", evaluation.getRiskScore());
        map.put("riskLevel", evaluation.getRiskLevel());
        map.put("suggestion", evaluation.getSuggestion());
        map.put("evaluateTime", evaluation.getEvaluateTime());
        return map;
    }
    
    /**
     * 构建完整报告响应
     */
    private Map<String, Object> buildFullReportResponse(RiskEvaluation evaluation) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", evaluation.getId());
        map.put("evaluationNo", evaluation.getEvaluationNo());
        map.put("evaluationType", evaluation.getEvaluationType());
        map.put("companyId", evaluation.getCompanyId());
        map.put("applicationId", evaluation.getApplicationId());
        map.put("companyName", evaluation.getCompanyName());
        map.put("creditCode", evaluation.getCreditCode());
        map.put("riskScore", evaluation.getRiskScore());
        map.put("riskLevel", evaluation.getRiskLevel());
        
        // 维度评分
        Map<String, Object> dimensions = new HashMap<>();
        dimensions.put("basicQualification", evaluation.getBasicQualificationScore());
        dimensions.put("creditRecord", evaluation.getCreditRecordScore());
        dimensions.put("financialStatus", evaluation.getFinancialStatusScore());
        dimensions.put("industryRisk", evaluation.getIndustryRiskScore());
        map.put("dimensionScores", dimensions);
        
        // 详细信息
        map.put("establishmentYears", evaluation.getEstablishmentYears());
        map.put("registeredCapital", evaluation.getRegisteredCapital());
        map.put("businessStatus", evaluation.getBusinessStatus());
        map.put("creditScore", evaluation.getCreditScore());
        map.put("industry", evaluation.getIndustry());
        map.put("annualRevenue", evaluation.getAnnualRevenue());
        map.put("industryCycle", evaluation.getIndustryCycle());
        map.put("policyImpact", evaluation.getPolicyImpact());
        
        map.put("suggestion", evaluation.getSuggestion());
        map.put("evaluateTime", evaluation.getEvaluateTime());
        map.put("modelVersion", evaluation.getModelVersion());
        map.put("evaluator", evaluation.getEvaluator());
        
        // 报告JSON
        map.put("riskReport", evaluation.getRiskReport());
        
        return map;
    }
    
    /**
     * 企业评估请求
     */
    @Validated
    public static class EvaluateCompanyRequest {
        private Long companyId;
        
        public Long getCompanyId() { return companyId; }
        public void setCompanyId(Long companyId) { this.companyId = companyId; }
    }
    
    /**
     * 申请评估请求
     */
    @Validated
    public static class EvaluateApplicationRequest {
        private Long applicationId;
        
        public Long getApplicationId() { return applicationId; }
        public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
    }
}