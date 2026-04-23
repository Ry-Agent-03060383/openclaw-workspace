package com.wisdom.finance.credit.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.service.CreditQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 企业信用查询控制器 - M1 企业信用查询
 */
@RestController
@RequestMapping("/api/credit")
@RequiredArgsConstructor
public class CreditController {

    private final CreditQueryService creditQueryService;

    /**
     * 根据统一社会信用代码查询企业
     */
    @GetMapping("/company/code/{creditCode}")
    public Result<Company> getByCreditCode(@PathVariable String creditCode) {
        Company company = creditQueryService.findByCreditCode(creditCode);
        if (company == null) {
            return Result.error("企业不存在");
        }
        return Result.success(company);
    }

    /**
     * 根据ID查询企业
     */
    @GetMapping("/company/{companyId}")
    public Result<Company> getById(@PathVariable Long companyId) {
        Company company = creditQueryService.findById(companyId);
        if (company == null) {
            return Result.error("企业不存在");
        }
        return Result.success(company);
    }

    /**
     * 按企业名称搜索
     */
    @GetMapping("/company/search")
    public Result<List<Company>> searchByName(@RequestParam String name) {
        List<Company> companies = creditQueryService.searchByName(name);
        return Result.success(companies);
    }

    /**
     * 查询所有企业
     */
    @GetMapping("/companies")
    public Result<List<Company>> getAllCompanies() {
        List<Company> companies = creditQueryService.findAll();
        return Result.success(companies);
    }

    /**
     * 创建企业信息
     */
    @PostMapping("/company")
    public Result<Company> createCompany(@RequestBody Company company) {
        Company created = creditQueryService.createCompany(company);
        return Result.success(created);
    }

    /**
     * 更新企业信息
     */
    @PutMapping("/company/{companyId}")
    public Result<Company> updateCompany(@PathVariable Long companyId, @RequestBody Company company) {
        try {
            Company updated = creditQueryService.updateCompany(companyId, company);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 重新计算企业信用评分
     */
    @PostMapping("/company/{companyId}/recalculate")
    public Result<Company> recalculateCreditScore(@PathVariable Long companyId) {
        Company company = creditQueryService.findById(companyId);
        if (company == null) {
            return Result.error("企业不存在");
        }
        creditQueryService.calculateCreditRisk(company);
        return Result.success(company);
    }
}
