package com.wisdom.finance.loan.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.loan.dto.LoanApplicationCreateDTO;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.entity.LoanProduct;
import com.wisdom.finance.loan.service.LoanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 贷款控制器 - M4 贷款申请流程
 */
@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    /**
     * 获取所有贷款产品
     */
    @GetMapping("/products")
    public Result<List<LoanProduct>> getAllProducts() {
        List<LoanProduct> products = loanService.getAllProducts();
        return Result.success(products);
    }

    /**
     * 根据ID获取产品详情
     */
    @GetMapping("/product/{productId}")
    public Result<LoanProduct> getProductById(@PathVariable Long productId) {
        LoanProduct product = loanService.getProductById(productId);
        if (product == null) {
            return Result.error("产品不存在");
        }
        return Result.success(product);
    }

    /**
     * 创建贷款产品
     */
    @PostMapping("/product")
    public Result<LoanProduct> createProduct(@RequestBody LoanProduct product) {
        LoanProduct created = loanService.createProduct(product);
        return Result.success(created);
    }

    /**
     * 创建贷款申请
     */
    @PostMapping("/application")
    public Result<LoanApplication> createApplication(@Valid @RequestBody LoanApplicationCreateDTO dto,
                                                      @RequestParam(required = false) Long userId) {
        try {
            LoanApplication application = loanService.createApplication(dto, userId != null ? userId : 1L);
            return Result.success(application);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 提交贷款申请
     */
    @PostMapping("/application/{applicationId}/submit")
    public Result<LoanApplication> submitApplication(@PathVariable Long applicationId) {
        try {
            LoanApplication application = loanService.submitApplication(applicationId);
            return Result.success(application);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 根据ID获取申请详情
     */
    @GetMapping("/application/{applicationId}")
    public Result<LoanApplication> getApplicationById(@PathVariable Long applicationId) {
        LoanApplication application = loanService.getApplicationById(applicationId);
        if (application == null) {
            return Result.error("申请不存在");
        }
        return Result.success(application);
    }

    /**
     * 根据申请单号获取
     */
    @GetMapping("/application/no/{applicationNo}")
    public Result<LoanApplication> getApplicationByNo(@PathVariable String applicationNo) {
        LoanApplication application = loanService.getApplicationByNo(applicationNo);
        if (application == null) {
            return Result.error("申请不存在");
        }
        return Result.success(application);
    }

    /**
     * 获取用户的申请列表
     */
    @GetMapping("/applications/user/{userId}")
    public Result<List<LoanApplication>> getUserApplications(@PathVariable Long userId) {
        List<LoanApplication> applications = loanService.getUserApplications(userId);
        return Result.success(applications);
    }

    /**
     * 获取企业的申请列表
     */
    @GetMapping("/applications/company/{companyId}")
    public Result<List<LoanApplication>> getCompanyApplications(@PathVariable Long companyId) {
        List<LoanApplication> applications = loanService.getCompanyApplications(companyId);
        return Result.success(applications);
    }
}
