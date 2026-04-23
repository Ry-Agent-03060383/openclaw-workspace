package com.wisdom.finance.guarantee.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.guarantee.entity.Guarantee;
import com.wisdom.finance.guarantee.entity.GuaranteeApplication;
import com.wisdom.finance.guarantee.service.GuaranteeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 担保控制器 - 担保业务流程
 */
@RestController
@RequestMapping("/api/guarantee")
@RequiredArgsConstructor
public class GuaranteeController {

    private final GuaranteeService guaranteeService;

    /**
     * 创建担保申请
     */
    @PostMapping("/application")
    public Result<GuaranteeApplication> createGuaranteeApplication(@RequestBody GuaranteeApplication application) {
        try {
            GuaranteeApplication created = guaranteeService.createGuaranteeApplication(application);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 提交担保申请
     */
    @PostMapping("/application/{applicationId}/submit")
    public Result<GuaranteeApplication> submitGuaranteeApplication(@PathVariable Long applicationId) {
        try {
            GuaranteeApplication submitted = guaranteeService.submitGuaranteeApplication(applicationId);
            return Result.success(submitted);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 审核担保申请
     */
    @PostMapping("/application/{applicationId}/review")
    public Result<GuaranteeApplication> reviewGuaranteeApplication(@PathVariable Long applicationId,
                                                                 @RequestParam String status,
                                                                 @RequestParam String comment,
                                                                 @RequestParam Long reviewerId) {
        try {
            GuaranteeApplication reviewed = guaranteeService.reviewGuaranteeApplication(
                    applicationId, status, comment, reviewerId);
            return Result.success(reviewed);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取担保申请详情
     */
    @GetMapping("/application/{applicationId}")
    public Result<GuaranteeApplication> getGuaranteeApplication(@PathVariable Long applicationId) {
        GuaranteeApplication application = guaranteeService.getGuaranteeApplication(applicationId);
        if (application == null) {
            return Result.error("担保申请不存在");
        }
        return Result.success(application);
    }

    /**
     * 获取担保详情
     */
    @GetMapping("/guarantee/{guaranteeId}")
    public Result<Guarantee> getGuarantee(@PathVariable Long guaranteeId) {
        Guarantee guarantee = guaranteeService.getGuarantee(guaranteeId);
        if (guarantee == null) {
            return Result.error("担保不存在");
        }
        return Result.success(guarantee);
    }

    /**
     * 获取贷款申请的担保列表
     */
    @GetMapping("/guarantees/loan/{loanApplicationId}")
    public Result<List<Guarantee>> getGuaranteesByLoanApplication(@PathVariable Long loanApplicationId) {
        List<Guarantee> guarantees = guaranteeService.getGuaranteesByLoanApplication(loanApplicationId);
        return Result.success(guarantees);
    }

    /**
     * 释放担保
     */
    @PostMapping("/guarantee/{guaranteeId}/release")
    public Result<Guarantee> releaseGuarantee(@PathVariable Long guaranteeId) {
        try {
            Guarantee released = guaranteeService.releaseGuarantee(guaranteeId);
            return Result.success(released);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }
}
