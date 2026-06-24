package com.wisdom.finance.admin.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.admin.entity.AdminOperationLog;
import com.wisdom.finance.admin.entity.CreditAuditReport;
import com.wisdom.finance.admin.entity.DataStatistics;
import com.wisdom.finance.admin.entity.SystemConfig;
import com.wisdom.finance.admin.mapper.AdminOperationLogRepository;
import com.wisdom.finance.admin.mapper.CreditAuditReportRepository;
import com.wisdom.finance.admin.mapper.DataStatisticsRepository;
import com.wisdom.finance.admin.mapper.SystemConfigRepository;
import com.wisdom.finance.credit.entity.CreditReport;
import com.wisdom.finance.credit.mapper.CreditReportRepository;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.mapper.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private AdminOperationLogRepository adminOperationLogRepository;

    @Mock
    private SystemConfigRepository systemConfigRepository;

    @Mock
    private DataStatisticsRepository dataStatisticsRepository;

    @Mock
    private CreditAuditReportRepository creditAuditReportRepository;

    @Mock
    private CreditReportRepository creditReportRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LoanApplicationRepository loanApplicationRepository;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private AdminService adminService;

    // ======================== recordOperationLog ========================

    @Test
    void recordOperationLog_ShouldSaveWithStatusSuccess() {
        Map<String, String> beforeData = Map.of("status", "OLD");
        Map<String, String> afterData = Map.of("status", "NEW");
        AdminOperationLog savedLog = new AdminOperationLog();
        savedLog.setId(1L);

        when(adminOperationLogRepository.save(any(AdminOperationLog.class))).thenAnswer(i -> {
            AdminOperationLog arg = i.getArgument(0);
            arg.setId(1L);
            return arg;
        });

        AdminOperationLog result = adminService.recordOperationLog(
                10L, "管理员A", "SYSTEM_CONFIG", "修改系统配置",
                "CONFIG", 5L, "利率配置", beforeData, afterData,
                "192.168.1.1", "Mozilla/5.0");

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("SUCCESS", result.getStatus());
        assertEquals(10L, result.getOperatorId());
        assertEquals("管理员A", result.getOperatorName());
        assertEquals("SYSTEM_CONFIG", result.getOperationType());
        assertEquals("192.168.1.1", result.getIpAddress());
        verify(adminOperationLogRepository).save(any(AdminOperationLog.class));
    }

    // ======================== getSystemConfig ========================

    @Test
    void getSystemConfig_ShouldReturnConfigWhenFound() {
        SystemConfig cfg = new SystemConfig();
        cfg.setConfigKey("loan.interest.rate");
        cfg.setConfigValue("4.5");

        when(systemConfigRepository.findByConfigKey("loan.interest.rate")).thenReturn(Optional.of(cfg));

        SystemConfig result = adminService.getSystemConfig("loan.interest.rate");

        assertNotNull(result);
        assertEquals("4.5", result.getConfigValue());
        verify(systemConfigRepository).findByConfigKey("loan.interest.rate");
    }

    @Test
    void getSystemConfig_ShouldReturnNullWhenNotFound() {
        when(systemConfigRepository.findByConfigKey("nonexistent")).thenReturn(Optional.empty());

        SystemConfig result = adminService.getSystemConfig("nonexistent");

        assertNull(result);
        verify(systemConfigRepository).findByConfigKey("nonexistent");
    }

    // ======================== setSystemConfig ========================

    @Test
    void setSystemConfig_ShouldCreateWhenNotExists() {
        when(systemConfigRepository.findByConfigKey("loan.interest.rate")).thenReturn(Optional.empty());
        when(systemConfigRepository.save(any(SystemConfig.class))).thenAnswer(i -> i.getArgument(0));

        SystemConfig result = adminService.setSystemConfig(
                "loan.interest.rate", "4.5", "贷款利率",
                "BUSINESS", "年化利率", "管理员A");

        assertNotNull(result);
        assertEquals("loan.interest.rate", result.getConfigKey());
        assertEquals("4.5", result.getConfigValue());
        assertEquals("ACTIVE", result.getStatus());
        assertEquals("管理员A", result.getUpdateBy());
        verify(systemConfigRepository).findByConfigKey("loan.interest.rate");
        verify(systemConfigRepository).save(any(SystemConfig.class));
    }

    @Test
    void setSystemConfig_ShouldUpdateWhenExists() {
        SystemConfig existing = new SystemConfig();
        existing.setConfigKey("loan.interest.rate");
        existing.setConfigValue("3.0");
        existing.setStatus("ACTIVE");

        when(systemConfigRepository.findByConfigKey("loan.interest.rate")).thenReturn(Optional.of(existing));
        when(systemConfigRepository.save(any(SystemConfig.class))).thenAnswer(i -> i.getArgument(0));

        SystemConfig result = adminService.setSystemConfig(
                "loan.interest.rate", "4.5", "新贷款利率",
                "BUSINESS", "更新利率", "管理员A");

        assertEquals("4.5", result.getConfigValue());
        assertEquals("新贷款利率", result.getConfigName());
        assertEquals("ACTIVE", result.getStatus());
        verify(systemConfigRepository).save(existing);
    }

    // ======================== getSystemConfigs ========================

    @Test
    void getSystemConfigs_ShouldFilterByType() {
        SystemConfig cfg = new SystemConfig();
        cfg.setConfigType("BUSINESS");
        when(systemConfigRepository.findByConfigType("BUSINESS")).thenReturn(List.of(cfg));

        List<SystemConfig> result = adminService.getSystemConfigs("BUSINESS");

        assertEquals(1, result.size());
        verify(systemConfigRepository).findByConfigType("BUSINESS");
        verifyNoMoreInteractions(systemConfigRepository);
    }

    @Test
    void getSystemConfigs_ShouldReturnAllWhenTypeNull() {
        SystemConfig cfg1 = new SystemConfig();
        SystemConfig cfg2 = new SystemConfig();
        when(systemConfigRepository.findAll()).thenReturn(List.of(cfg1, cfg2));

        List<SystemConfig> result = adminService.getSystemConfigs(null);

        assertEquals(2, result.size());
        verify(systemConfigRepository).findAll();
    }

    // ======================== generateDataStatistics ========================

    @Test
    void generateDataStatistics_ShouldComputeStatsCorrectly() {
        LocalDate statDate = LocalDate.of(2025, 6, 1);
        when(dataStatisticsRepository.findByStatDateAndStatType(statDate, "DAILY"))
                .thenReturn(Optional.empty());

        // Users
        User farmer1 = new User();
        farmer1.setUserType(User.UserType.FARMER);
        User farmer2 = new User();
        farmer2.setUserType(User.UserType.FARMER);
        User sme1 = new User();
        sme1.setUserType(User.UserType.SME);

        when(userRepository.count()).thenReturn(3L);
        when(userRepository.findByUserType(User.UserType.FARMER)).thenReturn(List.of(farmer1, farmer2));
        when(userRepository.findByUserType(User.UserType.SME)).thenReturn(List.of(sme1));

        // Loan applications
        LoanApplication app1 = new LoanApplication();
        app1.setStatus(LoanApplication.ApplicationStatus.APPROVED);
        app1.setLoanAmount(new BigDecimal("100000"));
        app1.setApprovedAmount(new BigDecimal("80000"));
        LoanApplication app2 = new LoanApplication();
        app2.setStatus(LoanApplication.ApplicationStatus.REJECTED);
        app2.setLoanAmount(new BigDecimal("50000"));
        app2.setApprovedAmount(BigDecimal.ZERO);
        LoanApplication app3 = new LoanApplication();
        app3.setStatus(LoanApplication.ApplicationStatus.DRAFT);
        app3.setLoanAmount(new BigDecimal("30000"));
        app3.setApprovedAmount(null);

        when(loanApplicationRepository.findAll()).thenReturn(List.of(app1, app2, app3));

        when(dataStatisticsRepository.save(any(DataStatistics.class))).thenAnswer(i -> i.getArgument(0));

        DataStatistics result = adminService.generateDataStatistics(statDate, "DAILY");

        assertEquals(statDate, result.getStatDate());
        assertEquals("DAILY", result.getStatType());
        assertEquals(3, result.getUserCount());
        assertEquals(2, result.getFarmerCount());
        assertEquals(1, result.getEnterpriseCount());
        assertEquals(3, result.getLoanApplicationCount());
        assertEquals(1, result.getApprovedApplicationCount());
        assertEquals(1, result.getRejectedApplicationCount());
        assertEquals(new BigDecimal("180000"), result.getTotalLoanAmount());
        assertEquals(0, new BigDecimal("80000").compareTo(result.getApprovedLoanAmount()));
        assertEquals(0, new BigDecimal("80000").compareTo(result.getAverageLoanAmount()));
        // 1/3 = 0.3333 * 100 = 33.33
        assertEquals(0, new BigDecimal("33.3300").compareTo(result.getApprovalRate()));
        verify(dataStatisticsRepository).save(any(DataStatistics.class));
    }

    @Test
    void generateDataStatistics_ShouldUpdateExistingWhenAlreadyExists() {
        LocalDate statDate = LocalDate.of(2025, 6, 1);
        DataStatistics existing = new DataStatistics();
        existing.setStatDate(statDate);
        existing.setStatType("DAILY");

        when(dataStatisticsRepository.findByStatDateAndStatType(statDate, "DAILY"))
                .thenReturn(Optional.of(existing));
        when(userRepository.count()).thenReturn(1L);
        when(userRepository.findByUserType(User.UserType.FARMER)).thenReturn(List.of());
        when(userRepository.findByUserType(User.UserType.SME)).thenReturn(List.of());
        when(loanApplicationRepository.findAll()).thenReturn(List.of());
        when(dataStatisticsRepository.save(any(DataStatistics.class))).thenAnswer(i -> i.getArgument(0));

        DataStatistics result = adminService.generateDataStatistics(statDate, "DAILY");

        assertNotNull(result);
        assertEquals(0, result.getLoanApplicationCount());
        assertNull(result.getAverageLoanAmount());
        assertNull(result.getApprovalRate());
        verify(dataStatisticsRepository).save(existing);
    }

    // ======================== getDataStatistics ========================

    @Test
    void getDataStatistics_ShouldReturnWhenFound() {
        DataStatistics stats = new DataStatistics();
        stats.setStatDate(LocalDate.of(2025, 6, 1));
        when(dataStatisticsRepository.findByStatDateAndStatType(
                LocalDate.of(2025, 6, 1), "DAILY"))
                .thenReturn(Optional.of(stats));

        DataStatistics result = adminService.getDataStatistics(LocalDate.of(2025, 6, 1), "DAILY");

        assertNotNull(result);
        assertEquals(LocalDate.of(2025, 6, 1), result.getStatDate());
    }

    @Test
    void getDataStatistics_ShouldReturnNullWhenNotFound() {
        when(dataStatisticsRepository.findByStatDateAndStatType(
                LocalDate.of(2025, 1, 1), "DAILY"))
                .thenReturn(Optional.empty());

        DataStatistics result = adminService.getDataStatistics(LocalDate.of(2025, 1, 1), "DAILY");

        assertNull(result);
    }

    // ======================== getDataStatisticsList ========================

    @Test
    void getDataStatisticsList_ShouldFilterByDateRange() {
        DataStatistics s1 = new DataStatistics();
        when(dataStatisticsRepository.findByStatDateBetween(
                LocalDate.of(2025, 1, 1), LocalDate.of(2025, 1, 31)))
                .thenReturn(List.of(s1));

        List<DataStatistics> result = adminService.getDataStatisticsList(
                null, LocalDate.of(2025, 1, 1), LocalDate.of(2025, 1, 31));

        assertEquals(1, result.size());
        verify(dataStatisticsRepository).findByStatDateBetween(
                LocalDate.of(2025, 1, 1), LocalDate.of(2025, 1, 31));
        verifyNoMoreInteractions(dataStatisticsRepository);
    }

    @Test
    void getDataStatisticsList_ShouldFilterByStatType() {
        DataStatistics s1 = new DataStatistics();
        when(dataStatisticsRepository.findByStatType("MONTHLY")).thenReturn(List.of(s1));

        List<DataStatistics> result = adminService.getDataStatisticsList("MONTHLY", null, null);

        assertEquals(1, result.size());
        verify(dataStatisticsRepository).findByStatType("MONTHLY");
        verifyNoMoreInteractions(dataStatisticsRepository);
    }

    @Test
    void getDataStatisticsList_ShouldReturnAllWhenNoFilters() {
        DataStatistics s1 = new DataStatistics();
        DataStatistics s2 = new DataStatistics();
        when(dataStatisticsRepository.findAll()).thenReturn(List.of(s1, s2));

        List<DataStatistics> result = adminService.getDataStatisticsList(null, null, null);

        assertEquals(2, result.size());
        verify(dataStatisticsRepository).findAll();
    }

    // ======================== generateCreditAuditReport ========================

    @Test
    void generateCreditAuditReport_ShouldComputeFromCreditReports() {
        LocalDate auditDate = LocalDate.of(2025, 6, 1);

        CreditReport r1 = new CreditReport();
        r1.setCreditScore(750);
        r1.setRiskLevel("低");
        CreditReport r2 = new CreditReport();
        r2.setCreditScore(500);
        r2.setRiskLevel("中");
        CreditReport r3 = new CreditReport();
        r3.setCreditScore(300);
        r3.setRiskLevel("高");

        when(creditReportRepository.findAll()).thenReturn(List.of(r1, r2, r3));
        when(creditAuditReportRepository.save(any(CreditAuditReport.class)))
                .thenAnswer(i -> i.getArgument(0));

        CreditAuditReport result = adminService.generateCreditAuditReport(
                auditDate, "MONTHLY", "CAR20250601001", "审计员甲");

        assertNotNull(result);
        assertEquals("CAR20250601001", result.getReportNo());
        assertEquals("MONTHLY", result.getReportType());
        assertEquals(auditDate, result.getAuditDate());
        assertEquals(auditDate.minusMonths(1), result.getAuditPeriodStart());
        assertEquals(auditDate.minusDays(1), result.getAuditPeriodEnd());
        assertEquals(3, result.getCreditQueryCount());
        assertEquals(3, result.getCreditReportCount());
        assertEquals(3, result.getScoreCalculationCount());
        assertEquals(516, result.getAverageCreditScore()); // (750+500+300)/3 = 516
        assertEquals(1, result.getHighRiskCount());
        assertEquals(1, result.getMediumRiskCount());
        assertEquals(1, result.getLowRiskCount());
        assertEquals("DRAFT", result.getStatus());
        assertEquals("审计员甲", result.getAuditor());
        verify(creditAuditReportRepository).save(any(CreditAuditReport.class));
    }

    @Test
    void generateCreditAuditReport_ShouldHandleEmptyCreditReports() {
        when(creditReportRepository.findAll()).thenReturn(List.of());
        when(creditAuditReportRepository.save(any(CreditAuditReport.class)))
                .thenAnswer(i -> i.getArgument(0));

        CreditAuditReport result = adminService.generateCreditAuditReport(
                LocalDate.of(2025, 6, 1), "MONTHLY", null, "审计员甲");

        assertNotNull(result);
        assertTrue(result.getReportNo().startsWith("CAR"));
        assertEquals(0, result.getCreditQueryCount());
        assertEquals(0, result.getCreditReportCount());
        assertEquals(0, result.getAverageCreditScore());
        assertEquals(0, result.getHighRiskCount());
        assertEquals(0, result.getMediumRiskCount());
        assertEquals(0, result.getLowRiskCount());
    }

    // ======================== getCreditAuditReport ========================

    @Test
    void getCreditAuditReport_ShouldReturnWhenFound() {
        CreditAuditReport report = new CreditAuditReport();
        report.setId(1L);
        when(creditAuditReportRepository.findById(1L)).thenReturn(Optional.of(report));

        CreditAuditReport result = adminService.getCreditAuditReport(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(creditAuditReportRepository).findById(1L);
    }

    @Test
    void getCreditAuditReport_ShouldReturnNullWhenNotFound() {
        when(creditAuditReportRepository.findById(999L)).thenReturn(Optional.empty());

        CreditAuditReport result = adminService.getCreditAuditReport(999L);

        assertNull(result);
    }

    // ======================== getCreditAuditReportByNo ========================

    @Test
    void getCreditAuditReportByNo_ShouldReturnWhenFound() {
        CreditAuditReport report = new CreditAuditReport();
        report.setReportNo("CAR001");
        when(creditAuditReportRepository.findByReportNo("CAR001")).thenReturn(Optional.of(report));

        CreditAuditReport result = adminService.getCreditAuditReportByNo("CAR001");

        assertNotNull(result);
        assertEquals("CAR001", result.getReportNo());
    }

    @Test
    void getCreditAuditReportByNo_ShouldReturnNullWhenNotFound() {
        when(creditAuditReportRepository.findByReportNo("NONEXISTENT")).thenReturn(Optional.empty());

        CreditAuditReport result = adminService.getCreditAuditReportByNo("NONEXISTENT");

        assertNull(result);
    }

    // ======================== approveCreditAuditReport ========================

    @Test
    void approveCreditAuditReport_ShouldSetApprovedStatus() {
        CreditAuditReport report = new CreditAuditReport();
        report.setId(1L);
        report.setStatus("DRAFT");

        when(creditAuditReportRepository.findById(1L)).thenReturn(Optional.of(report));
        when(creditAuditReportRepository.save(any(CreditAuditReport.class)))
                .thenAnswer(i -> i.getArgument(0));

        CreditAuditReport result = adminService.approveCreditAuditReport(1L, "审批员乙");

        assertEquals("APPROVED", result.getStatus());
        assertEquals("审批员乙", result.getApprovalBy());
        assertNotNull(result.getApprovalDate());
        verify(creditAuditReportRepository).save(report);
    }

    @Test
    void approveCreditAuditReport_ShouldThrowWhenReportNotFound() {
        when(creditAuditReportRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> adminService.approveCreditAuditReport(999L, "审批员乙"));
        assertEquals("审计报告不存在", ex.getMessage());
        verify(creditAuditReportRepository).findById(999L);
    }

    // ======================== getCreditAuditReports ========================

    @Test
    void getCreditAuditReports_ShouldFilterByDateRange() {
        CreditAuditReport r = new CreditAuditReport();
        when(creditAuditReportRepository.findByAuditPeriodStartBetween(
                LocalDate.of(2025, 1, 1), LocalDate.of(2025, 12, 31)))
                .thenReturn(List.of(r));

        List<CreditAuditReport> result = adminService.getCreditAuditReports(
                null, LocalDate.of(2025, 1, 1), LocalDate.of(2025, 12, 31));

        assertEquals(1, result.size());
        verify(creditAuditReportRepository).findByAuditPeriodStartBetween(
                LocalDate.of(2025, 1, 1), LocalDate.of(2025, 12, 31));
        verifyNoMoreInteractions(creditAuditReportRepository);
    }

    @Test
    void getCreditAuditReports_ShouldFilterByReportType() {
        CreditAuditReport r = new CreditAuditReport();
        when(creditAuditReportRepository.findByReportType("MONTHLY")).thenReturn(List.of(r));

        List<CreditAuditReport> result = adminService.getCreditAuditReports("MONTHLY", null, null);

        assertEquals(1, result.size());
        verify(creditAuditReportRepository).findByReportType("MONTHLY");
    }

    @Test
    void getCreditAuditReports_ShouldReturnAllWhenNoFilters() {
        CreditAuditReport r1 = new CreditAuditReport();
        CreditAuditReport r2 = new CreditAuditReport();
        when(creditAuditReportRepository.findAll()).thenReturn(List.of(r1, r2));

        List<CreditAuditReport> result = adminService.getCreditAuditReports(null, null, null);

        assertEquals(2, result.size());
        verify(creditAuditReportRepository).findAll();
    }
}