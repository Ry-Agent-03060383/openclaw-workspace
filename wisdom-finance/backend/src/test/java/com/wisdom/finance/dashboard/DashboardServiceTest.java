package com.wisdom.finance.dashboard;

import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.mapper.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DashboardServiceTest {

    @Mock private UserRepository userRepo;
    @Mock private com.wisdom.finance.user.mapper.EnterpriseRepository enterpriseRepo;
    @Mock private com.wisdom.finance.user.mapper.FarmerRepository farmerRepo;
    @Mock private LoanApplicationRepository loanAppRepo;
    @Mock private com.wisdom.finance.credit.mapper.CompanyRepository companyRepo;
    @Mock private com.wisdom.finance.credit.mapper.CreditReportRepository creditRepo;
    @Mock private com.wisdom.finance.risk.mapper.RiskEvaluationRepository riskRepo;
    @Mock private com.wisdom.finance.thirdparty.mapper.ServiceOrderRepository orderRepo;
    @Mock private com.wisdom.finance.thirdparty.mapper.ThirdPartyServiceRepository tpsRepo;
    @InjectMocks private DashboardService service;

    private User makeUser(Long id, String role) {
        User u = new User();
        u.setId(id);
        u.setUsername("user" + id);
        u.setUserType(User.UserType.valueOf(role));
        return u;
    }

    @Test
    void getDashboard_forAdmin_shouldReturnStats() {
        User admin = makeUser(1L, "ADMIN");
        when(userRepo.count()).thenReturn(100L);
        when(enterpriseRepo.count()).thenReturn(30L);
        when(farmerRepo.count()).thenReturn(20L);
        when(loanAppRepo.count()).thenReturn(50L);
        when(creditRepo.count()).thenReturn(40L);
        when(riskRepo.count()).thenReturn(10L);

        DashboardDTO result = service.getDashboard(admin);
        assertNotNull(result);
        assertFalse(result.getStats().isEmpty());
        assertEquals(6, result.getStats().size());
        assertEquals("注册用户", result.getStats().get(0).getLabel());
        assertEquals(100L, result.getStats().get(0).getValue());
        assertNotNull(result.getRecentLoans());
    }

    @Test
    void getDashboard_forSme_shouldReturnMyLoans() {
        User sme = makeUser(10L, "SME");
        LoanApplication app = new LoanApplication();
        app.setId(1L);
        app.setLoanAmount(BigDecimal.valueOf(100000));
        app.setStatus(LoanApplication.ApplicationStatus.PENDING);

        when(loanAppRepo.findByUserId(10L)).thenReturn(List.of(app));
        when(creditRepo.count()).thenReturn(0L);

        DashboardDTO result = service.getDashboard(sme);
        assertNotNull(result);
        assertFalse(result.getStats().isEmpty());
        assertTrue(result.getStats().stream().anyMatch(s -> "我的贷款".equals(s.getLabel())));
        assertEquals(1, result.getStats().stream().filter(s -> "我的贷款".equals(s.getLabel())).findFirst().get().getValue());
    }

    @Test
    void getDashboard_forBank_shouldReturnBankStats() {
        User bank = makeUser(5L, "FINANCIAL_INSTITUTION");
        when(companyRepo.count()).thenReturn(10L);

        DashboardDTO result = service.getDashboard(bank);
        assertNotNull(result);
        assertFalse(result.getStats().isEmpty());
        assertTrue(result.getStats().stream().anyMatch(s -> "待审核申请".equals(s.getLabel())));
    }

    @Test
    void getDashboard_forFarmer_shouldReturnFarmerData() {
        User farmer = makeUser(7L, "FARMER");
        when(loanAppRepo.findByUserId(7L)).thenReturn(List.of());
        when(creditRepo.count()).thenReturn(0L);

        DashboardDTO result = service.getDashboard(farmer);
        assertNotNull(result);
        assertTrue(result.getStats().stream().anyMatch(s -> "我的贷款".equals(s.getLabel())));
    }

    @Test
    void getDashboard_forGovernment_shouldReturnGovData() {
        User gov = makeUser(2L, "GOVERNMENT");
        when(enterpriseRepo.count()).thenReturn(50L);
        when(farmerRepo.count()).thenReturn(30L);
        when(loanAppRepo.count()).thenReturn(100L);
        when(riskRepo.countByRiskLevel("高")).thenReturn(3L);

        DashboardDTO result = service.getDashboard(gov);
        assertNotNull(result);
        assertEquals(4, result.getStats().size());
    }

    @Test
    void getDashboard_forRiskManager_shouldReturnRiskData() {
        User riskMgr = makeUser(3L, "RISK_MANAGER");
        when(companyRepo.count()).thenReturn(5L);
        when(loanAppRepo.countByStatus(LoanApplication.ApplicationStatus.PENDING)).thenReturn(2L);
        when(riskRepo.countByRiskLevel("高")).thenReturn(1L);

        DashboardDTO result = service.getDashboard(riskMgr);
        assertNotNull(result);
        assertTrue(result.getStats().stream().anyMatch(s -> "待评估企业".equals(s.getLabel())));
    }

    @Test
    void getDashboard_forThirdParty_shouldReturnThirdPartyData() {
        User tp = makeUser(8L, "THIRD_PARTY");
        when(tpsRepo.count()).thenReturn(10L);
        when(orderRepo.count()).thenReturn(5L);

        DashboardDTO result = service.getDashboard(tp);
        assertNotNull(result);
        assertTrue(result.getStats().stream().anyMatch(s -> "我的服务".equals(s.getLabel())));
    }
}
