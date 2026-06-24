package com.wisdom.finance.guarantee.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.guarantee.entity.Guarantee;
import com.wisdom.finance.guarantee.entity.GuaranteeApplication;
import com.wisdom.finance.guarantee.mapper.GuaranteeApplicationRepository;
import com.wisdom.finance.guarantee.mapper.GuaranteeRepository;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
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
class GuaranteeServiceTest {

    @Mock
    private GuaranteeApplicationRepository guaranteeApplicationRepository;

    @Mock
    private GuaranteeRepository guaranteeRepository;

    @Mock
    private LoanApplicationRepository loanApplicationRepository;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private GuaranteeService guaranteeService;

    private GuaranteeApplication testApplication;
    private Guarantee testGuarantee;
    private LoanApplication testLoanApp;

    @BeforeEach
    void setUp() {
        testLoanApp = new LoanApplication();
        testLoanApp.setId(100L);
        testLoanApp.setLoanTermMonths(12);
        testLoanApp.setRiskLevel("低");

        testApplication = new GuaranteeApplication();
        testApplication.setId(1L);
        testApplication.setApplicantName("测试企业");
        testApplication.setApplicantId(50L);
        testApplication.setLoanApplicationId(100L);
        testApplication.setRequestAmount(new BigDecimal("500000"));
        testApplication.setGuaranteeType("连带责任保证");

        testGuarantee = new Guarantee();
        testGuarantee.setId(1L);
        testGuarantee.setGuaranteeNo("GU20250601000001");
        testGuarantee.setApplicationId(100L);
        testGuarantee.setStatus("ACTIVE");
    }

    // ======================== createGuaranteeApplication ========================

    @Test
    void createGuaranteeApplication_ShouldSetAppNoAndDraftStatus() {
        GuaranteeApplication input = new GuaranteeApplication();
        input.setApplicantName("新企业");
        input.setRequestAmount(new BigDecimal("300000"));
        input.setGuaranteeType("抵押");

        when(guaranteeApplicationRepository.save(any(GuaranteeApplication.class)))
                .thenAnswer(i -> i.getArgument(0));

        GuaranteeApplication result = guaranteeService.createGuaranteeApplication(input);

        assertNotNull(result);
        assertEquals("DRAFT", result.getStatus());
        assertTrue(result.getAppNo().startsWith("GA"));
        assertEquals("新企业", result.getApplicantName());
        verify(guaranteeApplicationRepository).save(input);
    }

    // ======================== submitGuaranteeApplication ========================

    @Test
    void submitGuaranteeApplication_ShouldChangeDraftToSubmitted() {
        testApplication.setStatus("DRAFT");

        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));
        when(guaranteeApplicationRepository.save(any(GuaranteeApplication.class)))
                .thenAnswer(i -> i.getArgument(0));

        GuaranteeApplication result = guaranteeService.submitGuaranteeApplication(1L);

        assertEquals("SUBMITTED", result.getStatus());
        assertNotNull(result.getSubmitTime());
        verify(guaranteeApplicationRepository).save(testApplication);
    }

    @Test
    void submitGuaranteeApplication_ShouldThrowWhenNotFound() {
        when(guaranteeApplicationRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.submitGuaranteeApplication(999L));
        assertEquals("担保申请不存在", ex.getMessage());
    }

    @Test
    void submitGuaranteeApplication_ShouldThrowWhenNotDraft() {
        testApplication.setStatus("SUBMITTED");
        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.submitGuaranteeApplication(1L));
        assertEquals("只有草稿状态的申请可以提交", ex.getMessage());
        verify(guaranteeApplicationRepository, never()).save(any());
    }

    // ======================== reviewGuaranteeApplication ========================

    @Test
    void reviewGuaranteeApplication_ShouldApproveAndCreateGuarantee() {
        testApplication.setStatus("SUBMITTED");

        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));
        when(guaranteeApplicationRepository.save(any(GuaranteeApplication.class)))
                .thenAnswer(i -> i.getArgument(0));
        when(loanApplicationRepository.findById(100L)).thenReturn(Optional.of(testLoanApp));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> {
            Guarantee g = i.getArgument(0);
            g.setId(10L);
            return g;
        });

        GuaranteeApplication result = guaranteeService.reviewGuaranteeApplication(
                1L, "APPROVED", "审核通过", 200L);

        assertEquals("APPROVED", result.getStatus());
        assertEquals("审核通过", result.getReviewComment());
        assertEquals(200L, result.getReviewerId());
        assertNotNull(result.getReviewTime());
        verify(guaranteeApplicationRepository).save(testApplication);
        verify(guaranteeRepository).save(any(Guarantee.class));
    }

    @Test
    void reviewGuaranteeApplication_ShouldRejectWithoutCreatingGuarantee() {
        testApplication.setStatus("APPROVING");

        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));
        when(guaranteeApplicationRepository.save(any(GuaranteeApplication.class)))
                .thenAnswer(i -> i.getArgument(0));

        GuaranteeApplication result = guaranteeService.reviewGuaranteeApplication(
                1L, "REJECTED", "材料不齐全", 200L);

        assertEquals("REJECTED", result.getStatus());
        assertEquals("材料不齐全", result.getRejectionReason());
        assertEquals("材料不齐全", result.getReviewComment());
        verify(guaranteeApplicationRepository).save(testApplication);
        verifyNoInteractions(guaranteeRepository);
    }

    @Test
    void reviewGuaranteeApplication_ShouldThrowWhenWrongStatus() {
        testApplication.setStatus("DRAFT");
        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.reviewGuaranteeApplication(1L, "APPROVED", "ok", 200L));
        assertEquals("只有已提交或审核中的申请可以审核", ex.getMessage());
        verify(guaranteeApplicationRepository, never()).save(any());
    }

    @Test
    void reviewGuaranteeApplication_ShouldThrowWhenNotFound() {
        when(guaranteeApplicationRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.reviewGuaranteeApplication(999L, "APPROVED", "ok", 200L));
        assertEquals("担保申请不存在", ex.getMessage());
    }

    // ======================== createGuaranteeFromApplication ========================

    @Test
    void createGuaranteeFromApplication_ShouldCreateActiveGuarantee() {
        when(loanApplicationRepository.findById(100L)).thenReturn(Optional.of(testLoanApp));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> {
            Guarantee g = i.getArgument(0);
            g.setId(10L);
            return g;
        });

        Guarantee result = guaranteeService.createGuaranteeFromApplication(testApplication);

        assertNotNull(result);
        assertTrue(result.getGuaranteeNo().startsWith("GU"));
        assertEquals(testApplication.getLoanApplicationId(), result.getApplicationId());
        assertEquals("企业", result.getGuarantorType());
        assertEquals(50L, result.getGuarantorId());
        assertEquals("测试企业", result.getGuarantorName());
        assertEquals(new BigDecimal("500000"), result.getGuaranteeAmount());
        assertEquals(new BigDecimal("100"), result.getGuaranteeRatio());
        assertEquals("连带责任保证", result.getGuaranteeType());
        assertEquals(LocalDate.now(), result.getStartDate());
        assertEquals(LocalDate.now().plusMonths(12), result.getEndDate());
        assertEquals("ACTIVE", result.getStatus());
        assertEquals("低", result.getRiskLevel());
        verify(guaranteeRepository).save(any(Guarantee.class));
    }

    @Test
    void createGuaranteeFromApplication_ShouldThrowWhenLoanAppNotFound() {
        testApplication.setLoanApplicationId(999L);
        when(loanApplicationRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.createGuaranteeFromApplication(testApplication));
        assertEquals("贷款申请不存在", ex.getMessage());
        verifyNoInteractions(guaranteeRepository);
    }

    // ======================== getGuaranteeApplication ========================

    @Test
    void getGuaranteeApplication_ShouldReturnWhenFound() {
        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));

        GuaranteeApplication result = guaranteeService.getGuaranteeApplication(1L);

        assertNotNull(result);
        assertEquals("测试企业", result.getApplicantName());
        verify(guaranteeApplicationRepository).findById(1L);
    }

    @Test
    void getGuaranteeApplication_ShouldReturnNullWhenNotFound() {
        when(guaranteeApplicationRepository.findById(999L)).thenReturn(Optional.empty());

        GuaranteeApplication result = guaranteeService.getGuaranteeApplication(999L);

        assertNull(result);
    }

    // ======================== getGuarantee ========================

    @Test
    void getGuarantee_ShouldReturnWhenFound() {
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));

        Guarantee result = guaranteeService.getGuarantee(1L);

        assertNotNull(result);
        assertEquals("GU20250601000001", result.getGuaranteeNo());
        verify(guaranteeRepository).findById(1L);
    }

    @Test
    void getGuarantee_ShouldReturnNullWhenNotFound() {
        when(guaranteeRepository.findById(999L)).thenReturn(Optional.empty());

        Guarantee result = guaranteeService.getGuarantee(999L);

        assertNull(result);
    }

    // ======================== getGuaranteesByLoanApplication ========================

    @Test
    void getGuaranteesByLoanApplication_ShouldReturnGuarantees() {
        Guarantee g1 = new Guarantee();
        g1.setApplicationId(100L);
        Guarantee g2 = new Guarantee();
        g2.setApplicationId(100L);

        when(guaranteeRepository.findByApplicationId(100L)).thenReturn(List.of(g1, g2));

        List<Guarantee> result = guaranteeService.getGuaranteesByLoanApplication(100L);

        assertEquals(2, result.size());
        verify(guaranteeRepository).findByApplicationId(100L);
    }

    @Test
    void getGuaranteesByLoanApplication_ShouldReturnEmptyWhenNone() {
        when(guaranteeRepository.findByApplicationId(999L)).thenReturn(List.of());

        List<Guarantee> result = guaranteeService.getGuaranteesByLoanApplication(999L);

        assertTrue(result.isEmpty());
        verify(guaranteeRepository).findByApplicationId(999L);
    }

    // ======================== releaseGuarantee ========================

    @Test
    void releaseGuarantee_ShouldChangeActiveToReleased() {
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> i.getArgument(0));

        Guarantee result = guaranteeService.releaseGuarantee(1L);

        assertEquals("RELEASED", result.getStatus());
        verify(guaranteeRepository).save(testGuarantee);
    }

    @Test
    void releaseGuarantee_ShouldThrowWhenNotFound() {
        when(guaranteeRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.releaseGuarantee(999L));
        assertEquals("担保不存在", ex.getMessage());
    }

    @Test
    void releaseGuarantee_ShouldThrowWhenNotActive() {
        testGuarantee.setStatus("RELEASED");
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.releaseGuarantee(1L));
        assertEquals("只有激活状态的担保可以释放", ex.getMessage());
        verify(guaranteeRepository, never()).save(any());
    }
}