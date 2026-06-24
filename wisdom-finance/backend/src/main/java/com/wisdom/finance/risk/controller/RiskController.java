package com.wisdom.finance.risk.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.risk.entity.RiskEvaluation;
import com.wisdom.finance.risk.service.RiskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 风险评估控制器 - M6 风险评估模块
 */
@RestController
@RequestMapping("/api/risk")
@RequiredArgsConstructor
public class RiskController {

    private final RiskService riskService;

    @GetMapping("/evaluations")
    public Result<List<RiskEvaluation>> listAll() {
        return Result.success(riskService.listAll());
    }

    @GetMapping("/evaluations/company/{companyId}")
    public Result<List<RiskEvaluation>> listByCompany(@PathVariable Long companyId) {
        return Result.success(riskService.listByCompany(companyId));
    }

    @GetMapping("/evaluations/application/{applicationId}")
    public Result<List<RiskEvaluation>> listByApplication(@PathVariable Long applicationId) {
        return Result.success(riskService.listByApplication(applicationId));
    }

    @PostMapping("/evaluate/company")
    public Result<RiskEvaluation> evaluateCompany(@RequestBody Map<String, Long> request) {
        Long companyId = request.get("companyId");
        return Result.success(riskService.evaluateCompany(companyId));
    }

    @PostMapping("/evaluate/application")
    public Result<RiskEvaluation> evaluateApplication(@RequestBody Map<String, Long> request) {
        Long applicationId = request.get("applicationId");
        return Result.success(riskService.evaluateApplication(applicationId));
    }

    @GetMapping("/report/{evaluationId}")
    public Result<RiskEvaluation> getRiskReport(@PathVariable Long evaluationId) {
        return Result.success(riskService.getRiskReport(evaluationId));
    }

    @GetMapping("/report/no/{evaluationNo}")
    public Result<RiskEvaluation> getRiskReportByNo(@PathVariable String evaluationNo) {
        return Result.success(riskService.getRiskReportByNo(evaluationNo));
    }

    @GetMapping("/level/{score}")
    public Result<Map<String, Object>> getRiskLevel(@PathVariable Integer score) {
        String level = riskService.getRiskLevel(score);
        return Result.success(Map.of("score", score, "level", level));
    }
}