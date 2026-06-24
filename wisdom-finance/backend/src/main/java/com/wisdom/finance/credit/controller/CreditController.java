package com.wisdom.finance.credit.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.service.CreditQueryService;
import com.wisdom.finance.credit.service.CreditScoreModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * 企业信用查询控制器 - 企业信用查询与评分 (增强版 v2.0)
 */
@RestController
@RequestMapping("/api/credit")
@RequiredArgsConstructor
public class CreditController {

    private final CreditQueryService creditQueryService;
    private final CreditScoreModelService creditScoreModelService;

    // ============ 企业查询接口 ============

    @GetMapping("/company/code/{creditCode}")
    public Result<Company> getByCreditCode(@PathVariable String creditCode) {
        Company company = creditQueryService.findByCreditCode(creditCode);
        if (company == null) {
            return Result.error("企业不存在");
        }
        return Result.success(company);
    }

    @GetMapping("/company/{companyId}")
    public Result<Company> getById(@PathVariable Long companyId) {
        Company company = creditQueryService.findById(companyId);
        if (company == null) {
            return Result.error("企业不存在");
        }
        return Result.success(company);
    }

    @GetMapping("/company/search")
    public Result<List<Company>> searchByName(@RequestParam String name) {
        List<Company> companies = creditQueryService.searchByName(name);
        return Result.success(companies);
    }

    @GetMapping("/companies")
    public Result<List<Company>> getAllCompanies() {
        List<Company> companies = creditQueryService.findAll();
        return Result.success(companies);
    }

    @PostMapping("/company")
    public Result<Company> createCompany(@RequestBody Company company) {
        Company created = creditQueryService.createCompany(company);
        return Result.success(created);
    }

    @PutMapping("/company/{companyId}")
    public Result<Company> updateCompany(@PathVariable Long companyId, @RequestBody Company company) {
        try {
            Company updated = creditQueryService.updateCompany(companyId, company);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @PostMapping("/company/{companyId}/recalculate")
    public Result<Company> recalculateCreditScore(@PathVariable Long companyId) {
        Company company = creditQueryService.findById(companyId);
        if (company == null) {
            return Result.error("企业不存在");
        }
        creditQueryService.calculateCreditRisk(company);
        return Result.success(company);
    }

    // ============ 评分分析接口（新增强版） ============

    /**
     * 获取企业完整信息+5维度评分明细
     */
    @GetMapping("/company/{companyId}/full")
    public Result<Map<String, Object>> getCompanyFullInfo(@PathVariable Long companyId) {
        Company company = creditQueryService.findById(companyId);
        if (company == null) {
            return Result.error("企业不存在");
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("company", company);
        result.put("creditScore", creditQueryService.calculateCreditScore(company));
        result.put("scoreBreakdown", creditQueryService.getScoreBreakdown(company));
        result.put("creditLevel", creditScoreModelService.calculateCreditLevel(
                creditQueryService.calculateCreditScore(company)));
        result.put("riskLevel", creditScoreModelService.calculateRiskLevel(
                creditQueryService.calculateCreditScore(company)));
        return Result.success(result);
    }

    /**
     * 获取评分明细（5维度分解）
     */
    @GetMapping("/score/breakdown/{companyId}")
    public Result<Map<String, Object>> getScoreBreakdown(@PathVariable Long companyId) {
        Company company = creditQueryService.findById(companyId);
        if (company == null) {
            return Result.error("企业不存在");
        }
        Map<String, Object> result = creditQueryService.getScoreBreakdown(company);
        return Result.success(result);
    }

    /**
     * 批量评分评估
     */
    @PostMapping("/score/evaluate")
    public Result<List<Map<String, Object>>> batchEvaluate(@RequestBody Map<String, Object> body) {
        @SuppressWarnings("unchecked")
        List<Integer> rawIds = (List<Integer>) body.get("companyIds");
        if (rawIds == null || rawIds.isEmpty()) {
            return Result.error("companyIds不能为空");
        }
        List<Long> companyIds = rawIds.stream()
                .map(Integer::longValue)
                .collect(java.util.stream.Collectors.toList());
        List<Map<String, Object>> results = creditQueryService.batchEvaluate(companyIds);
        return Result.success(results);
    }

    /**
     * 获取多因子评分（含维度分解）
     */
    @GetMapping("/score/multi-factor/{companyId}")
    public Result<Map<String, Object>> getMultiFactorScore(@PathVariable Long companyId) {
        Company company = creditQueryService.findById(companyId);
        if (company == null) {
            return Result.error("企业不存在");
        }
        Map<String, Object> result = creditScoreModelService.calculateCreditScoreWithDimensions(company);
        result.put("companyId", companyId);
        result.put("companyName", company.getCompanyName());
        return Result.success(result);
    }
}