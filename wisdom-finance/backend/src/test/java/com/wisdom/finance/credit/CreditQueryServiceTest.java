package com.wisdom.finance.credit;

import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.credit.service.CreditQueryService;
import org.junit.jupiter.api.BeforeEach;
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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreditQueryServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private CreditQueryService creditQueryService;

    private Company testCompany;

    @BeforeEach
    void setUp() {
        testCompany = new Company();
        testCompany.setId(1L);
        testCompany.setCompanyName("测试科技公司");
        testCompany.setCreditCode("91110000MA12345678");
        testCompany.setLegalPerson("张三");
        testCompany.setRegisteredCapital(new BigDecimal("1000"));
        testCompany.setEstablishmentDate(LocalDate.of(2015, 6, 1));
        testCompany.setBusinessStatus("存续");
        testCompany.setIndustry("科技");
        testCompany.setAnnualRevenue(new BigDecimal("5000"));
    }

    @Test
    void findByCreditCode_ShouldReturnCompany() {
        when(companyRepository.findByCreditCode("91110000MA12345678")).thenReturn(Optional.of(testCompany));

        Company result = creditQueryService.findByCreditCode("91110000MA12345678");

        assertNotNull(result);
        assertEquals("测试科技公司", result.getCompanyName());
    }

    @Test
    void findByCreditCode_ShouldReturnNullWhenNotFound() {
        when(companyRepository.findByCreditCode("NONEXISTENT")).thenReturn(Optional.empty());

        Company result = creditQueryService.findByCreditCode("NONEXISTENT");

        assertNull(result);
    }

    @Test
    void searchByName_ShouldReturnMatchingCompanies() {
        when(companyRepository.findByCompanyNameContaining("科技")).thenReturn(List.of(testCompany));

        List<Company> results = creditQueryService.searchByName("科技");

        assertEquals(1, results.size());
        assertEquals("测试科技公司", results.get(0).getCompanyName());
    }

    @Test
    void findById_ShouldReturnCompany() {
        when(companyRepository.findById(1L)).thenReturn(Optional.of(testCompany));

        Company result = creditQueryService.findById(1L);

        assertNotNull(result);
        assertEquals("测试科技公司", result.getCompanyName());
    }

    @Test
    void createCompany_ShouldCalculateCreditScore() {
        when(companyRepository.save(any(Company.class))).thenAnswer(i -> i.getArgument(0));

        Company result = creditQueryService.createCompany(testCompany);

        assertNotNull(result);
        assertNotNull(result.getCreditScore());
        assertNotNull(result.getRiskLevel());
        assertEquals(76, result.getCreditScore());
        assertEquals("MEDIUM", result.getRiskLevel());
    }

    @Test
    void updateCompany_ShouldMergeAndRecalculate() {
        Company existing = new Company();
        existing.setId(1L);
        existing.setCompanyName("原名称");
        existing.setCreditCode("OLD");
        existing.setBusinessStatus("存续");
        existing.setEstablishmentDate(LocalDate.of(2020, 1, 1));
        existing.setRegisteredCapital(new BigDecimal("100"));
        existing.setIndustry("制造");
        existing.setAnnualRevenue(new BigDecimal("500"));

        Company update = new Company();
        update.setCompanyName("新名称");
        update.setAnnualRevenue(new BigDecimal("1000"));

        when(companyRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(companyRepository.save(any(Company.class))).thenAnswer(i -> i.getArgument(0));

        Company result = creditQueryService.updateCompany(1L, update);

        assertEquals("新名称", result.getCompanyName());
        assertEquals("OLD", result.getCreditCode()); // unchanged
        assertNotNull(result.getCreditScore());
    }

    @Test
    void updateCompany_ShouldThrowWhenNotFound() {
        when(companyRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> creditQueryService.updateCompany(999L, new Company()));
    }

    @Test
    void calculateCreditRisk_StartupCompanyShouldHaveLowScore() {
        Company startup = new Company();
        startup.setEstablishmentDate(LocalDate.now().minusMonths(6));
        startup.setRegisteredCapital(new BigDecimal("10"));
        startup.setBusinessStatus("存续");
        startup.setIndustry("餐饮");
        startup.setAnnualRevenue(new BigDecimal("50"));

        creditQueryService.calculateCreditRisk(startup);

        // 成立<1年+资本10万+存续+餐饮+营收50万 => 多因子评分约55分
        assertTrue(startup.getCreditScore() <= 60);
        assertNotNull(startup.getRiskLevel());
    }
}