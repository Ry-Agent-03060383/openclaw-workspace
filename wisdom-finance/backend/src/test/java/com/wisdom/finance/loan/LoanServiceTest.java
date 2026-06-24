package com.wisdom.finance.loan;

import com.wisdom.finance.loan.dto.LoanApplicationCreateDTO;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.loan.service.LoanService;
import com.wisdom.finance.user.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LoanServiceTest {

    @Mock
    private LoanApplicationRepository repo;

    @InjectMocks
    private LoanService loanService;

    private User testUser;
    private LoanApplicationCreateDTO testDTO;
    private LoanApplication testApp;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testEnterprise");

        testDTO = new LoanApplicationCreateDTO();
        testDTO.setProductId(1L);
        testDTO.setCompanyId(100L);
        testDTO.setCompanyName("测试企业");
        testDTO.setCreditCode("91110000MA12345678");
        testDTO.setLoanAmount(new BigDecimal("100000"));
        testDTO.setLoanTermMonths(12);
        testDTO.setLoanPurpose("扩大生产");
        testDTO.setRepaymentMethod("等额本息");
    }

    @Test
    void apply_ShouldCreateLoanWithPendingStatus() {
        when(repo.save(any(LoanApplication.class))).thenAnswer(i -> i.getArgument(0));

        LoanApplication result = loanService.apply(testUser, testDTO);

        assertNotNull(result);
        assertEquals(testUser, result.getUser());
        assertEquals(LoanApplication.ApplicationStatus.PENDING, result.getStatus());
        assertEquals(new BigDecimal("100000"), result.getLoanAmount());
        assertEquals("测试企业", result.getCompanyName());
        assertEquals(0.045, result.getInterestRate());
        assertTrue(result.getApplicationNo().startsWith("LA"));
        verify(repo).save(any(LoanApplication.class));
    }

    @Test
    void listByUser_ShouldReturnUserLoans() {
        LoanApplication app = new LoanApplication();
        app.setUser(testUser);
        when(repo.findByUserId(1L)).thenReturn(List.of(app));

        List<LoanApplication> result = loanService.listByUser(testUser);

        assertEquals(1, result.size());
        verify(repo).findByUserId(1L);
    }

    @Test
    void listByUser_ShouldReturnEmptyWhenNoLoans() {
        when(repo.findByUserId(1L)).thenReturn(List.of());

        List<LoanApplication> result = loanService.listByUser(testUser);

        assertTrue(result.isEmpty());
    }

    @Test
    void approve_ShouldUpdateStatusAndReviewer() {
        LoanApplication app = new LoanApplication();
        app.setId(1L);
        app.setStatus(LoanApplication.ApplicationStatus.PENDING);
        when(repo.findById(1L)).thenReturn(Optional.of(app));
        when(repo.save(any())).thenAnswer(i -> i.getArgument(0));

        LoanApplication result = loanService.approve(1L, 10L);

        assertEquals(LoanApplication.ApplicationStatus.APPROVED, result.getStatus());
        assertEquals(10L, result.getReviewerId());
        verify(repo).save(app);
    }

    @Test
    void approve_ShouldThrowWhenNotFound() {
        when(repo.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> loanService.approve(999L, 10L));
    }

    @Test
    void reject_ShouldSetStatusAndReason() {
        LoanApplication app = new LoanApplication();
        app.setId(1L);
        app.setStatus(LoanApplication.ApplicationStatus.PENDING);
        when(repo.findById(1L)).thenReturn(Optional.of(app));
        when(repo.save(any())).thenAnswer(i -> i.getArgument(0));

        LoanApplication result = loanService.reject(1L, 10L, "信用评分不足");

        assertEquals(LoanApplication.ApplicationStatus.REJECTED, result.getStatus());
        assertEquals(10L, result.getReviewerId());
        assertEquals("信用评分不足", result.getReviewComment());
    }

    @Test
    void listAll_ShouldReturnAllLoansDesc() {
        when(repo.findAllByOrderByCreatedAtDesc()).thenReturn(List.of(new LoanApplication(), new LoanApplication()));

        List<LoanApplication> result = loanService.listAll();

        assertEquals(2, result.size());
    }
}