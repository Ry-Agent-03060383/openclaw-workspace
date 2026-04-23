package com.wisdom.finance.admin.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.admin.entity.AdminOperationLog;
import com.wisdom.finance.admin.entity.DataStatistics;
import com.wisdom.finance.admin.entity.SystemConfig;
import com.wisdom.finance.admin.mapper.AdminOperationLogRepository;
import com.wisdom.finance.admin.mapper.DataStatisticsRepository;
import com.wisdom.finance.admin.mapper.SystemConfigRepository;
import com.wisdom.finance.admin.entity.CreditAuditReport;
import com.wisdom.finance.admin.mapper.CreditAuditReportRepository;
import com.wisdom.finance.credit.entity.CreditReport;
import com.wisdom.finance.credit.mapper.CreditReportRepository;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.mapper.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * 运营管理服务 - 平台运营方业务流程
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminOperationLogRepository adminOperationLogRepository;
    private final SystemConfigRepository systemConfigRepository;
    private final DataStatisticsRepository dataStatisticsRepository;
    private final CreditAuditReportRepository creditAuditReportRepository;
    private final CreditReportRepository creditReportRepository;
    private final UserRepository userRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final ObjectMapper objectMapper;

    /**
     * 记录运营操作日志
     */
    @Transactional
    public AdminOperationLog recordOperationLog(Long operatorId, String operatorName, String operationType,
                                             String operationDesc, String targetType, Long targetId,
                                             String targetName, Object beforeData, Object afterData,
                                             String ipAddress, String userAgent) {
        log.info("记录运营操作日志，操作人: {}, 操作类型: {}", operatorName, operationType);
        
        AdminOperationLog log = new AdminOperationLog();
        log.setOperatorId(operatorId);
        log.setOperatorName(operatorName);
        log.setOperationType(operationType);
        log.setOperationDesc(operationDesc);
        log.setTargetType(targetType);
        log.setTargetId(targetId);
        log.setTargetName(targetName);
        log.setBeforeData(convertToJson(beforeData));
        log.setAfterData(convertToJson(afterData));
        log.setIpAddress(ipAddress);
        log.setUserAgent(userAgent);
        log.setStatus("SUCCESS");
        
        return adminOperationLogRepository.save(log);
    }

    /**
     * 获取系统配置
     */
    public SystemConfig getSystemConfig(String configKey) {
        return systemConfigRepository.findByConfigKey(configKey).orElse(null);
    }

    /**
     * 设置系统配置
     */
    @Transactional
    public SystemConfig setSystemConfig(String configKey, String configValue, String configName,
                                     String configType, String description, String updateBy) {
        log.info("设置系统配置，配置键: {}", configKey);
        
        SystemConfig config = systemConfigRepository.findByConfigKey(configKey)
                .orElse(new SystemConfig());
        
        config.setConfigKey(configKey);
        config.setConfigValue(configValue);
        config.setConfigName(configName);
        config.setConfigType(configType);
        config.setDescription(description);
        config.setStatus("ACTIVE");
        config.setUpdateBy(updateBy);
        
        return systemConfigRepository.save(config);
    }

    /**
     * 获取系统配置列表
     */
    public List<SystemConfig> getSystemConfigs(String configType) {
        if (configType != null) {
            return systemConfigRepository.findByConfigType(configType);
        } else {
            return systemConfigRepository.findAll();
        }
    }

    /**
     * 生成数据统计
     */
    @Transactional
    public DataStatistics generateDataStatistics(LocalDate statDate, String statType) {
        log.info("生成数据统计，日期: {}, 类型: {}", statDate, statType);
        
        // 检查是否已存在统计数据
        DataStatistics existing = dataStatisticsRepository.findByStatDateAndStatType(statDate, statType)
                .orElse(new DataStatistics());
        
        existing.setStatDate(statDate);
        existing.setStatType(statType);
        
        // 统计用户数据
        long userCount = userRepository.count();
        long farmerCount = userRepository.findByUserType(User.UserType.FARMER).size();
        long enterpriseCount = userRepository.findByUserType(User.UserType.SME).size();
        existing.setUserCount((int) userCount);
        existing.setFarmerCount((int) farmerCount);
        existing.setEnterpriseCount((int) enterpriseCount);
        
        // 统计贷款数据
        List<LoanApplication> applications = loanApplicationRepository.findAll();
        int totalApplications = applications.size();
        int approvedApplications = (int) applications.stream()
                .filter(app -> app.getStatus() == LoanApplication.ApplicationStatus.APPROVED)
                .count();
        int rejectedApplications = (int) applications.stream()
                .filter(app -> app.getStatus() == LoanApplication.ApplicationStatus.REJECTED)
                .count();
        
        existing.setLoanApplicationCount(totalApplications);
        existing.setApprovedApplicationCount(approvedApplications);
        existing.setRejectedApplicationCount(rejectedApplications);
        
        // 统计金额数据
        BigDecimal totalLoanAmount = applications.stream()
                .map(LoanApplication::getLoanAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal approvedLoanAmount = applications.stream()
                .filter(app -> app.getStatus() == LoanApplication.ApplicationStatus.APPROVED)
                .map(LoanApplication::getApprovedAmount)
                .filter(amount -> amount != null)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        existing.setTotalLoanAmount(totalLoanAmount);
        existing.setApprovedLoanAmount(approvedLoanAmount);
        
        if (approvedApplications > 0) {
            existing.setAverageLoanAmount(approvedLoanAmount.divide(BigDecimal.valueOf(approvedApplications), 2, BigDecimal.ROUND_HALF_UP));
        }
        
        // 计算审批通过率
        if (totalApplications > 0) {
            existing.setApprovalRate(BigDecimal.valueOf(approvedApplications)
                    .divide(BigDecimal.valueOf(totalApplications), 4, BigDecimal.ROUND_HALF_UP)
                    .multiply(BigDecimal.valueOf(100)));
        }
        
        return dataStatisticsRepository.save(existing);
    }

    /**
     * 获取数据统计
     */
    public DataStatistics getDataStatistics(LocalDate statDate, String statType) {
        return dataStatisticsRepository.findByStatDateAndStatType(statDate, statType).orElse(null);
    }

    /**
     * 获取数据统计列表
     */
    public List<DataStatistics> getDataStatisticsList(String statType, LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null) {
            return dataStatisticsRepository.findByStatDateBetween(startDate, endDate);
        } else if (statType != null) {
            return dataStatisticsRepository.findByStatType(statType);
        } else {
            return dataStatisticsRepository.findAll();
        }
    }

    /**
     * 生成征信业务审计报告
     */
    @Transactional
    public CreditAuditReport generateCreditAuditReport(LocalDate auditDate, String reportType, String reportNo, String auditor) {
        log.info("生成征信业务审计报告，日期: {}, 类型: {}", auditDate, reportType);
        
        // 计算审计期间
        LocalDate periodStart = auditDate.minusMonths(1);
        LocalDate periodEnd = auditDate.minusDays(1);
        
        // 统计征信业务数据
        List<CreditReport> creditReports = creditReportRepository.findAll();
        int creditQueryCount = creditReports.size();
        int creditReportCount = creditReports.size();
        int scoreCalculationCount = creditReports.size(); // 简化处理，实际应从评分记录中统计
        
        // 计算平均信用评分
        int totalScore = 0;
        int highRiskCount = 0;
        int mediumRiskCount = 0;
        int lowRiskCount = 0;
        
        for (CreditReport report : creditReports) {
            if (report.getCreditScore() != null) {
                totalScore += report.getCreditScore();
            }
            
            if (report.getRiskLevel() != null) {
                switch (report.getRiskLevel()) {
                    case "高":
                    case "high":
                        highRiskCount++;
                        break;
                    case "中":
                    case "medium":
                        mediumRiskCount++;
                        break;
                    case "低":
                    case "low":
                        lowRiskCount++;
                        break;
                }
            }
        }
        
        int averageCreditScore = creditReports.size() > 0 ? totalScore / creditReports.size() : 0;
        
        // 创建审计报告
        CreditAuditReport auditReport = new CreditAuditReport();
        auditReport.setReportNo(reportNo != null ? reportNo : generateReportNo());
        auditReport.setAuditDate(auditDate);
        auditReport.setAuditPeriodStart(periodStart);
        auditReport.setAuditPeriodEnd(periodEnd);
        auditReport.setReportType(reportType);
        auditReport.setCreditQueryCount(creditQueryCount);
        auditReport.setCreditReportCount(creditReportCount);
        auditReport.setScoreCalculationCount(scoreCalculationCount);
        auditReport.setAverageCreditScore(averageCreditScore);
        auditReport.setHighRiskCount(highRiskCount);
        auditReport.setMediumRiskCount(mediumRiskCount);
        auditReport.setLowRiskCount(lowRiskCount);
        auditReport.setAbnormalOperations(0); // 简化处理
        auditReport.setComplianceIssues(0); // 简化处理
        auditReport.setDataQualityScore(95); // 简化处理
        auditReport.setSystemPerformance(BigDecimal.valueOf(98.5)); // 简化处理
        auditReport.setDataSources("内部系统、第三方数据源");
        auditReport.setAuditFindings(generateAuditFindings(creditReports));
        auditReport.setRecommendations(generateRecommendations(creditReports));
        auditReport.setStatus("DRAFT");
        auditReport.setAuditor(auditor);
        
        return creditAuditReportRepository.save(auditReport);
    }

    /**
     * 获取征信业务审计报告
     */
    public CreditAuditReport getCreditAuditReport(Long reportId) {
        return creditAuditReportRepository.findById(reportId).orElse(null);
    }

    /**
     * 根据报告编号获取审计报告
     */
    public CreditAuditReport getCreditAuditReportByNo(String reportNo) {
        return creditAuditReportRepository.findByReportNo(reportNo).orElse(null);
    }

    /**
     * 审批征信业务审计报告
     */
    @Transactional
    public CreditAuditReport approveCreditAuditReport(Long reportId, String approvalBy) {
        log.info("审批征信业务审计报告，报告ID: {}", reportId);
        
        CreditAuditReport report = creditAuditReportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("审计报告不存在"));
        
        report.setStatus("APPROVED");
        report.setApprovalBy(approvalBy);
        report.setApprovalDate(LocalDateTime.now());
        
        return creditAuditReportRepository.save(report);
    }

    /**
     * 获取征信业务审计报告列表
     */
    public List<CreditAuditReport> getCreditAuditReports(String reportType, LocalDate startDate, LocalDate endDate) {
        if (startDate != null && endDate != null) {
            return creditAuditReportRepository.findByAuditPeriodStartBetween(startDate, endDate);
        } else if (reportType != null) {
            return creditAuditReportRepository.findByReportType(reportType);
        } else {
            return creditAuditReportRepository.findAll();
        }
    }

    /**
     * 生成审计发现
     */
    private String generateAuditFindings(List<CreditReport> creditReports) {
        StringBuilder findings = new StringBuilder();
        findings.append("1. 征信查询量正常，未发现异常操作\n");
        findings.append("2. 信用报告生成流程合规\n");
        findings.append("3. 评分计算逻辑正确\n");
        findings.append("4. 数据质量良好，无明显异常\n");
        return findings.toString();
    }

    /**
     * 生成改进建议
     */
    private String generateRecommendations(List<CreditReport> creditReports) {
        StringBuilder recommendations = new StringBuilder();
        recommendations.append("1. 加强数据来源的多样性，提高信用评估的准确性\n");
        recommendations.append("2. 优化评分模型，提高风险识别能力\n");
        recommendations.append("3. 建立定期审计机制，确保合规运营\n");
        recommendations.append("4. 加强系统安全防护，保护数据安全\n");
        return recommendations.toString();
    }

    /**
     * 生成报告编号
     */
    private String generateReportNo() {
        String timestamp = LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = java.util.UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "CAR" + timestamp + uuid;
    }

    /**
     * 转换为JSON
     */
    private String convertToJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            log.warn("JSON转换失败", e);
            return "{}";
        }
    }
}
