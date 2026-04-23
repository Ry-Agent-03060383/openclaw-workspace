package com.wisdom.finance.admin.controller;

import com.wisdom.finance.admin.entity.AdminOperationLog;
import com.wisdom.finance.admin.entity.CreditAuditReport;
import com.wisdom.finance.admin.entity.DataStatistics;
import com.wisdom.finance.admin.entity.SystemConfig;
import com.wisdom.finance.admin.service.AdminService;
import com.wisdom.finance.common.controller.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * 运营管理控制器 - 平台运营方业务流程
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /**
     * 记录运营操作日志
     */
    @PostMapping("/operation/log")
    public Result<AdminOperationLog> recordOperationLog(@RequestParam Long operatorId,
                                                      @RequestParam String operatorName,
                                                      @RequestParam String operationType,
                                                      @RequestParam String operationDesc,
                                                      @RequestParam(required = false) String targetType,
                                                      @RequestParam(required = false) Long targetId,
                                                      @RequestParam(required = false) String targetName,
                                                      @RequestParam(required = false) String beforeData,
                                                      @RequestParam(required = false) String afterData,
                                                      @RequestParam(required = false) String ipAddress,
                                                      @RequestParam(required = false) String userAgent) {
        try {
            AdminOperationLog log = adminService.recordOperationLog(
                    operatorId, operatorName, operationType, operationDesc,
                    targetType, targetId, targetName, beforeData, afterData,
                    ipAddress, userAgent
            );
            return Result.success(log);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取系统配置
     */
    @GetMapping("/config/{configKey}")
    public Result<SystemConfig> getSystemConfig(@PathVariable String configKey) {
        SystemConfig config = adminService.getSystemConfig(configKey);
        if (config == null) {
            return Result.error("配置不存在");
        }
        return Result.success(config);
    }

    /**
     * 设置系统配置
     */
    @PostMapping("/config/set")
    public Result<SystemConfig> setSystemConfig(@RequestParam String configKey,
                                             @RequestParam String configValue,
                                             @RequestParam String configName,
                                             @RequestParam String configType,
                                             @RequestParam String description,
                                             @RequestParam String updateBy) {
        try {
            SystemConfig config = adminService.setSystemConfig(
                    configKey, configValue, configName, configType, description, updateBy
            );
            return Result.success(config);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取系统配置列表
     */
    @GetMapping("/config/list")
    public Result<List<SystemConfig>> getSystemConfigs(@RequestParam(required = false) String configType) {
        List<SystemConfig> configs = adminService.getSystemConfigs(configType);
        return Result.success(configs);
    }

    /**
     * 生成数据统计
     */
    @PostMapping("/statistics/generate")
    public Result<DataStatistics> generateDataStatistics(@RequestParam String statDate,
                                                       @RequestParam String statType) {
        try {
            LocalDate date = LocalDate.parse(statDate);
            DataStatistics statistics = adminService.generateDataStatistics(date, statType);
            return Result.success(statistics);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取数据统计
     */
    @GetMapping("/statistics/get")
    public Result<DataStatistics> getDataStatistics(@RequestParam String statDate,
                                                  @RequestParam String statType) {
        try {
            LocalDate date = LocalDate.parse(statDate);
            DataStatistics statistics = adminService.getDataStatistics(date, statType);
            if (statistics == null) {
                return Result.error("统计数据不存在");
            }
            return Result.success(statistics);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取数据统计列表
     */
    @GetMapping("/statistics/list")
    public Result<List<DataStatistics>> getDataStatisticsList(@RequestParam(required = false) String statType,
                                                            @RequestParam(required = false) String startDate,
                                                            @RequestParam(required = false) String endDate) {
        try {
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
            List<DataStatistics> statisticsList = adminService.getDataStatisticsList(statType, start, end);
            return Result.success(statisticsList);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 生成征信业务审计报告
     */
    @PostMapping("/credit/audit/generate")
    public Result<CreditAuditReport> generateCreditAuditReport(@RequestParam String auditDate,
                                                             @RequestParam String reportType,
                                                             @RequestParam(required = false) String reportNo,
                                                             @RequestParam String auditor) {
        try {
            LocalDate date = LocalDate.parse(auditDate);
            CreditAuditReport report = adminService.generateCreditAuditReport(date, reportType, reportNo, auditor);
            return Result.success(report);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取征信业务审计报告详情
     */
    @GetMapping("/credit/audit/{reportId}")
    public Result<CreditAuditReport> getCreditAuditReport(@PathVariable Long reportId) {
        CreditAuditReport report = adminService.getCreditAuditReport(reportId);
        if (report == null) {
            return Result.error("审计报告不存在");
        }
        return Result.success(report);
    }

    /**
     * 根据报告编号获取审计报告
     */
    @GetMapping("/credit/audit/by-no/{reportNo}")
    public Result<CreditAuditReport> getCreditAuditReportByNo(@PathVariable String reportNo) {
        CreditAuditReport report = adminService.getCreditAuditReportByNo(reportNo);
        if (report == null) {
            return Result.error("审计报告不存在");
        }
        return Result.success(report);
    }

    /**
     * 审批征信业务审计报告
     */
    @PostMapping("/credit/audit/{reportId}/approve")
    public Result<CreditAuditReport> approveCreditAuditReport(@PathVariable Long reportId,
                                                           @RequestParam String approvalBy) {
        try {
            CreditAuditReport report = adminService.approveCreditAuditReport(reportId, approvalBy);
            return Result.success(report);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取征信业务审计报告列表
     */
    @GetMapping("/credit/audit/list")
    public Result<List<CreditAuditReport>> getCreditAuditReports(@RequestParam(required = false) String reportType,
                                                              @RequestParam(required = false) String startDate,
                                                              @RequestParam(required = false) String endDate) {
        try {
            LocalDate start = startDate != null ? LocalDate.parse(startDate) : null;
            LocalDate end = endDate != null ? LocalDate.parse(endDate) : null;
            List<CreditAuditReport> reports = adminService.getCreditAuditReports(reportType, start, end);
            return Result.success(reports);
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}
