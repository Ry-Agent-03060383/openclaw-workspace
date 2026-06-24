package com.wisdom.finance.risk;

import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.risk.entity.RiskEvaluation;
import com.wisdom.finance.risk.mapper.RiskEvaluationRepository;
import com.wisdom.finance.risk.service.RiskScoreCalculator;
import com.wisdom.finance.risk.service.RiskService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.isNull;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RiskServiceTest {

    @Mock
    private RiskEvaluationRepository riskEvaluationRepository;
    @Mock
    private CompanyRepository companyRepository;
    @Mock
    private LoanApplicationRepository loanApplicationRepository;
    @Mock
    private RiskScoreCalculator riskScoreCalculator;

    @InjectMocks
    private RiskService riskService;

    private RiskScoreCalculator.RiskScoreResult createScoreResult(int riskScore, String riskLevel,
            int basicScore, int creditScore, int financialScore, int industryScore) {
        RiskScoreCalculator.RiskScoreResult result = new RiskScoreCalculator.RiskScoreResult();
        result.setRiskScore(riskScore);
        result.setRiskLevel(riskLevel);
        result.setBasicQualificationScore(basicScore);
        result.setCreditRecordScore(creditScore);
        result.setFinancialStatusScore(financialScore);
        result.setIndustryRiskScore(industryScore);
        result.setEstablishmentYears(10);
        result.setRegisteredCapital(new java.math.BigDecimal("1000"));
        result.setBusinessStatus("存续");
        result.setCreditScore(80);
        result.setIndustry("科技");
        result.setAnnualRevenue(new java.math.BigDecimal("5000"));
        result.setModelVersion("v1.0");
        return result;
    }

    @Test
    void evaluateCompany_ShouldCreateEvaluation() {
        Company company = new Company();
        company.setId(1L);
        company.setCompanyName("测试公司");
        company.setCreditCode("CODE001");

        RiskScoreCalculator.RiskScoreResult scoreResult = createScoreResult(85, "AA", 25, 30, 15, 15);

        when(companyRepository.findById(1L)).thenReturn(Optional.of(company));
        when(riskScoreCalculator.calculateRiskScore(eq(company), isNull())).thenReturn(scoreResult);
        when(riskEvaluationRepository.save(any(RiskEvaluation.class))).thenAnswer(i -> i.getArgument(0));
        when(companyRepository.save(any(Company.class))).thenAnswer(i -> i.getArgument(0));

        RiskEvaluation result = riskService.evaluateCompany(1L);

        assertNotNull(result);
        assertEquals("测试公司", result.getCompanyName());
        assertEquals("AA", result.getRiskLevel());
        assertEquals(85, result.getRiskScore());
        assertTrue(result.getEvaluationNo().startsWith("C"));
    }

    @Test
    void evaluateCompany_ShouldThrowWhenNotFound() {
        when(companyRepository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> riskService.evaluateCompany(999L));
    }

    @Test
    void evaluateApplication_ShouldCreateEvaluation() {
        Company company = new Company();
        company.setId(1L);
        company.setCompanyName("测试公司");
        company.setCreditCode("CODE001");

        LoanApplication app = new LoanApplication();
        app.setId(100L);
        app.setCompanyId(1L);

        RiskScoreCalculator.RiskScoreResult scoreResult = createScoreResult(70, "BBB", 20, 20, 15, 15);

        when(loanApplicationRepository.findById(100L)).thenReturn(Optional.of(app));
        when(companyRepository.findById(1L)).thenReturn(Optional.of(company));
        when(riskScoreCalculator.calculateRiskScore(eq(company), eq(app))).thenReturn(scoreResult);
        when(riskEvaluationRepository.save(any(RiskEvaluation.class))).thenAnswer(i -> i.getArgument(0));
        lenient().when(companyRepository.save(any(Company.class))).thenAnswer(i -> i.getArgument(0));
        lenient().when(loanApplicationRepository.save(any(LoanApplication.class))).thenAnswer(i -> i.getArgument(0));

        RiskEvaluation result = riskService.evaluateApplication(100L);

        assertNotNull(result);
        assertEquals("APPLICATION", result.getEvaluationType());
        assertEquals(100L, result.getApplicationId());
        assertTrue(result.getEvaluationNo().startsWith("A"));
    }

    @Test
    void getRiskReport_ShouldReturnEvaluation() {
        RiskEvaluation eval = new RiskEvaluation();
        eval.setId(1L);
        eval.setEvaluationNo("C20260622001");
        when(riskEvaluationRepository.findById(1L)).thenReturn(Optional.of(eval));

        RiskEvaluation result = riskService.getRiskReport(1L);

        assertNotNull(result);
        assertEquals("C20260622001", result.getEvaluationNo());
    }

    @Test
    void getRiskReport_ShouldThrowWhenNotFound() {
        when(riskEvaluationRepository.findById(999L)).thenReturn(Optional.empty());
        assertThrows(RuntimeException.class, () -> riskService.getRiskReport(999L));
    }

    @Test
    void listByCompany_ShouldReturnList() {
        when(riskEvaluationRepository.findByCompanyId(1L))
                .thenReturn(List.of(new RiskEvaluation(), new RiskEvaluation()));

        List<RiskEvaluation> results = riskService.listByCompany(1L);
        assertEquals(2, results.size());
    }

    @Test
    void listByApplication_ShouldReturnList() {
        when(riskEvaluationRepository.findByApplicationId(100L))
                .thenReturn(List.of(new RiskEvaluation()));

        List<RiskEvaluation> results = riskService.listByApplication(100L);
        assertEquals(1, results.size());
    }

    @Test
    void listAll_ShouldReturnAll() {
        when(riskEvaluationRepository.findAllByOrderByEvaluateTimeDesc())
                .thenReturn(List.of(new RiskEvaluation(), new RiskEvaluation(), new RiskEvaluation()));

        List<RiskEvaluation> results = riskService.listAll();
        assertEquals(3, results.size());
    }
}