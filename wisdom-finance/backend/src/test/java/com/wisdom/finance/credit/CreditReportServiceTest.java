package com.wisdom.finance.credit;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.entity.CreditReport;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.credit.mapper.CreditReportRepository;
import com.wisdom.finance.credit.service.CreditQueryService;
import com.wisdom.finance.credit.service.CreditReportService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreditReportServiceTest {

    @Mock
    private CreditReportRepository creditReportRepository;
    @Mock
    private CompanyRepository companyRepository;
    @Mock
    private CreditQueryService creditQueryService;
    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private CreditReportService creditReportService;

    @Test
    void generateCreditReport_ShouldCreateReportFromCompany() throws JsonProcessingException {
        Company company = new Company();
        company.setId(1L);
        company.setCompanyName("测试公司");
        company.setCreditCode("CODE001");
        company.setCreditScore(85);
        company.setRiskLevel("AA");
        company.setRegisteredCapital(new BigDecimal("1000"));
        company.setEstablishmentDate(LocalDate.of(2010, 1, 1));
        company.setLegalPerson("李四");
        company.setBusinessStatus("存续");
        company.setIndustry("科技");
        company.setAnnualRevenue(new BigDecimal("5000"));

        when(companyRepository.findById(1L)).thenReturn(Optional.of(company));
        when(objectMapper.writeValueAsString(any())).thenReturn("{}");
        when(creditReportRepository.save(any(CreditReport.class))).thenAnswer(i -> i.getArgument(0));

        CreditReport report = creditReportService.generateCreditReport(1L, "FULL", "SYSTEM");

        assertNotNull(report);
        assertEquals("测试公司", report.getCompanyName());
        assertEquals("AA", report.getCreditLevel());
        assertEquals(80, report.getCreditScore());
        assertEquals(1, report.getCompanyId());
        assertEquals("FULL", report.getReportType());
        assertEquals("SYSTEM", report.getGeneratedBy());
        assertTrue(report.getReportNo().startsWith("CR"));
        assertEquals("GENERATED", report.getStatus());
        assertNotNull(report.getReportDate());
        assertNotNull(report.getValidUntil());
    }

    @Test
    void generateCreditReport_ShouldThrowWhenCompanyNotFound() {
        when(companyRepository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> creditReportService.generateCreditReport(999L, "FULL", "SYSTEM"));
    }

    @Test
    void getCreditReport_ShouldReturnReport() {
        CreditReport report = new CreditReport();
        report.setId(1L);
        report.setReportNo("CR001");
        when(creditReportRepository.findById(1L)).thenReturn(Optional.of(report));

        CreditReport result = creditReportService.getCreditReport(1L);

        assertNotNull(result);
        assertEquals("CR001", result.getReportNo());
    }

    @Test
    void getCreditReport_ShouldReturnNullWhenNotFound() {
        when(creditReportRepository.findById(999L)).thenReturn(Optional.empty());
        assertNull(creditReportService.getCreditReport(999L));
    }

    @Test
    void getCreditReportByNo_ShouldReturnReport() {
        CreditReport report = new CreditReport();
        report.setReportNo("CR001");
        when(creditReportRepository.findByReportNo("CR001")).thenReturn(Optional.of(report));

        CreditReport result = creditReportService.getCreditReportByNo("CR001");

        assertNotNull(result);
        assertEquals("CR001", result.getReportNo());
    }

    @Test
    void getCompanyCreditReports_ShouldReturnList() {
        when(creditReportRepository.findByCompanyId(1L))
                .thenReturn(List.of(new CreditReport(), new CreditReport()));

        List<CreditReport> results = creditReportService.getCompanyCreditReports(1L);

        assertEquals(2, results.size());
    }
}