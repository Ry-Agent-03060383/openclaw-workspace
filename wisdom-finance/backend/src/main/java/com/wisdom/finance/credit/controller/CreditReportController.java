package com.wisdom.finance.credit.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.credit.entity.CreditReport;
import com.wisdom.finance.credit.service.CreditReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 信用报告控制器 - 企业信用报告管理
 */
@RestController
@RequestMapping("/api/credit/report")
@RequiredArgsConstructor
public class CreditReportController {

    private final CreditReportService creditReportService;

    /**
     * 生成企业信用报告
     */
    @PostMapping("/generate")
    public Result<CreditReport> generateCreditReport(@RequestParam Long companyId,
                                                  @RequestParam String reportType,
                                                  @RequestParam String generatedBy) {
        try {
            CreditReport report = creditReportService.generateCreditReport(companyId, reportType, generatedBy);
            return Result.success(report);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取信用报告详情
     */
    @GetMapping("/{reportId}")
    public Result<CreditReport> getCreditReport(@PathVariable Long reportId) {
        CreditReport report = creditReportService.getCreditReport(reportId);
        if (report == null) {
            return Result.error("信用报告不存在");
        }
        return Result.success(report);
    }

    /**
     * 根据报告编号获取报告
     */
    @GetMapping("/by-no/{reportNo}")
    public Result<CreditReport> getCreditReportByNo(@PathVariable String reportNo) {
        CreditReport report = creditReportService.getCreditReportByNo(reportNo);
        if (report == null) {
            return Result.error("信用报告不存在");
        }
        return Result.success(report);
    }

    /**
     * 获取企业的信用报告列表
     */
    @GetMapping("/company/{companyId}")
    public Result<List<CreditReport>> getCompanyCreditReports(@PathVariable Long companyId) {
        List<CreditReport> reports = creditReportService.getCompanyCreditReports(companyId);
        return Result.success(reports);
    }
}
