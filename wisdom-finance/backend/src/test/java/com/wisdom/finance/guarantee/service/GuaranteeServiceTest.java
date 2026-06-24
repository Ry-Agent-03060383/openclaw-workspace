package com.wisdom.finance.guarantee.service;

import com.wisdom.finance.guarantee.entity.Guarantee;
import com.wisdom.finance.guarantee.entity.GuaranteeApplication;
import com.wisdom.finance.guarantee.mapper.GuaranteeApplicationRepository;
import com.wisdom.finance.guarantee.mapper.GuaranteeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
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

    @InjectMocks
    private GuaranteeService guaranteeService;

    @Captor
    private ArgumentCaptor<Guarantee> guaranteeCaptor;

    private GuaranteeApplication testApplication;
    private Guarantee testGuarantee;

    @BeforeEach
    void setUp() {
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
        testGuarantee.setApplicationId(1L);
        testGuarantee.setStatus("ACTIVE");
    }

    // ======================== createApplication ========================

    @Test
    void createApplication_ShouldSetAppNoAndDraftStatus() {
        GuaranteeApplication input = new GuaranteeApplication();
        input.setApplicantName("新企业");
        input.setRequestAmount(new BigDecimal("300000"));
        input.setGuaranteeType("抵押");

        when(guaranteeApplicationRepository.save(any(GuaranteeApplication.class)))
                .thenAnswer(i -> i.getArgument(0));

        GuaranteeApplication result = guaranteeService.createApplication(input);

        assertNotNull(result);
        assertEquals("DRAFT", result.getStatus());
        assertTrue(result.getAppNo().startsWith("GA"));
        assertEquals("新企业", result.getApplicantName());
        verify(guaranteeApplicationRepository).save(input);
    }

    // ======================== submitApplication ========================

    @Test
    void submitApplication_ShouldChangeDraftToSubmitted() {
        testApplication.setStatus("DRAFT");

        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));
        when(guaranteeApplicationRepository.save(any(GuaranteeApplication.class)))
                .thenAnswer(i -> i.getArgument(0));

        GuaranteeApplication result = guaranteeService.submitApplication(1L);

        assertEquals("SUBMITTED", result.getStatus());
        assertNotNull(result.getSubmitTime());
        verify(guaranteeApplicationRepository).save(testApplication);
    }

    @Test
    void submitApplication_ShouldThrowWhenNotFound() {
        when(guaranteeApplicationRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.submitApplication(999L));
        assertEquals("担保申请不存在", ex.getMessage());
    }

    @Test
    void submitApplication_ShouldThrowWhenNotDraft() {
        testApplication.setStatus("SUBMITTED");
        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.submitApplication(1L));
        assertEquals("只有草稿状态的申请可以提交", ex.getMessage());
        verify(guaranteeApplicationRepository, never()).save(any());
    }

    // ======================== reviewApplication ========================

    @Test
    void reviewApplication_ShouldApproveAndCreateGuarantee() {
        testApplication.setStatus("SUBMITTED");

        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));
        when(guaranteeApplicationRepository.save(any(GuaranteeApplication.class)))
                .thenAnswer(i -> i.getArgument(0));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> {
            Guarantee g = i.getArgument(0);
            g.setId(10L);
            return g;
        });

        GuaranteeApplication result = guaranteeService.reviewApplication(1L, true, 200L, "审核通过");

        assertEquals("APPROVED", result.getStatus());
        assertEquals("审核通过", result.getReviewComment());
        assertEquals(200L, result.getReviewerId());
        assertNotNull(result.getReviewTime());

        // Verify guarantee was created with correct status
        verify(guaranteeRepository).save(guaranteeCaptor.capture());
        Guarantee created = guaranteeCaptor.getValue();
        assertEquals("PENDING_SIGN", created.getStatus());
        assertEquals(1L, created.getApplicationId());
        assertEquals(100L, created.getLoanApplicationId());
        assertEquals(50L, created.getGuarantorId());
        assertEquals("测试企业", created.getGuarantorName());
        assertEquals(new BigDecimal("500000"), created.getGuaranteeAmount());
        assertEquals("连带责任保证", created.getGuaranteeType());
        assertEquals("PENDING", created.getCounterGuaranteeStatus());
        assertEquals("UNPAID", created.getFeeStatus());
    }

    @Test
    void reviewApplication_ShouldRejectWithoutCreatingGuarantee() {
        testApplication.setStatus("SUBMITTED");

        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));
        when(guaranteeApplicationRepository.save(any(GuaranteeApplication.class)))
                .thenAnswer(i -> i.getArgument(0));

        GuaranteeApplication result = guaranteeService.reviewApplication(1L, false, 200L, "材料不齐全");

        assertEquals("REJECTED", result.getStatus());
        assertEquals("材料不齐全", result.getRejectionReason());
        assertEquals("材料不齐全", result.getReviewComment());
        assertEquals(200L, result.getReviewerId());
        assertNotNull(result.getReviewTime());
        verify(guaranteeApplicationRepository).save(testApplication);
        verifyNoInteractions(guaranteeRepository);
    }

    @Test
    void reviewApplication_ShouldThrowWhenWrongStatus() {
        testApplication.setStatus("DRAFT");
        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.reviewApplication(1L, true, 200L, "ok"));
        assertEquals("只有已提交的申请可以审核", ex.getMessage());
        verify(guaranteeApplicationRepository, never()).save(any());
    }

    @Test
    void reviewApplication_ShouldThrowWhenNotFound() {
        when(guaranteeApplicationRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.reviewApplication(999L, true, 200L, "ok"));
        assertEquals("担保申请不存在", ex.getMessage());
    }

    // ======================== getApplication ========================

    @Test
    void getApplication_ShouldReturnWhenFound() {
        when(guaranteeApplicationRepository.findById(1L)).thenReturn(Optional.of(testApplication));

        GuaranteeApplication result = guaranteeService.getApplication(1L);

        assertNotNull(result);
        assertEquals("测试企业", result.getApplicantName());
        verify(guaranteeApplicationRepository).findById(1L);
    }

    @Test
    void getApplication_ShouldThrowWhenNotFound() {
        when(guaranteeApplicationRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.getApplication(999L));
        assertEquals("担保申请不存在", ex.getMessage());
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
    void getGuarantee_ShouldThrowWhenNotFound() {
        when(guaranteeRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.getGuarantee(999L));
        assertEquals("担保记录不存在", ex.getMessage());
    }

    // ======================== findByLoanApplicationId ========================

    @Test
    void findByLoanApplicationId_ShouldReturnGuarantees() {
        Guarantee g1 = new Guarantee();
        g1.setLoanApplicationId(100L);
        Guarantee g2 = new Guarantee();
        g2.setLoanApplicationId(100L);

        when(guaranteeRepository.findByLoanApplicationId(100L)).thenReturn(List.of(g1, g2));

        List<Guarantee> result = guaranteeService.findByLoanApplicationId(100L);

        assertEquals(2, result.size());
        verify(guaranteeRepository).findByLoanApplicationId(100L);
    }

    @Test
    void findByLoanApplicationId_ShouldReturnEmptyWhenNone() {
        when(guaranteeRepository.findByLoanApplicationId(999L)).thenReturn(List.of());

        List<Guarantee> result = guaranteeService.findByLoanApplicationId(999L);

        assertTrue(result.isEmpty());
        verify(guaranteeRepository).findByLoanApplicationId(999L);
    }

    // ======================== releaseGuarantee ========================

    @Test
    void releaseGuarantee_ShouldChangeActiveToReleased() {
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> i.getArgument(0));

        Guarantee result = guaranteeService.releaseGuarantee(1L, "担保到期");

        assertEquals("RELEASED", result.getStatus());
        assertNotNull(result.getReleaseTime());
        assertEquals("担保到期", result.getReleaseReason());
        verify(guaranteeRepository).save(testGuarantee);
    }

    @Test
    void releaseGuarantee_ShouldThrowWhenNotFound() {
        when(guaranteeRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.releaseGuarantee(999L, "到期"));
        assertEquals("担保记录不存在", ex.getMessage());
    }

    @Test
    void releaseGuarantee_ShouldThrowWhenNotActive() {
        testGuarantee.setStatus("RELEASED");
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.releaseGuarantee(1L, "到期"));
        assertEquals("只有激活状态的担保可以释放", ex.getMessage());
        verify(guaranteeRepository, never()).save(any());
    }

    // ======================== signGuarantee ========================

    @Test
    void signGuarantee_ShouldChangePendingSignToActive() {
        testGuarantee.setStatus("PENDING_SIGN");
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> i.getArgument(0));

        Guarantee result = guaranteeService.signGuarantee(1L, "HT20260001");

        assertEquals("ACTIVE", result.getStatus());
        assertEquals("HT20260001", result.getContractNo());
        assertEquals(LocalDate.now(), result.getSignedDate());
        assertEquals(LocalDate.now(), result.getStartDate());
        assertEquals(LocalDate.now().plusYears(1), result.getEndDate());
        verify(guaranteeRepository).save(testGuarantee);
    }

    @Test
    void signGuarantee_ShouldThrowWhenNotFound() {
        when(guaranteeRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.signGuarantee(999L, "HT20260001"));
        assertEquals("担保记录不存在", ex.getMessage());
    }

    @Test
    void signGuarantee_ShouldThrowWhenNotPendingSign() {
        testGuarantee.setStatus("ACTIVE");
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.signGuarantee(1L, "HT20260001"));
        assertEquals("只有待签约状态的担保可以签约", ex.getMessage());
        verify(guaranteeRepository, never()).save(any());
    }

    // ======================== payFee ========================

    @Test
    void payFee_ShouldChangeUnpaidToPaid() {
        testGuarantee.setFeeStatus("UNPAID");
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> i.getArgument(0));

        Guarantee result = guaranteeService.payFee(1L, new BigDecimal("5000"));

        assertEquals("PAID", result.getFeeStatus());
        assertEquals(new BigDecimal("5000"), result.getFeePaid());
        assertEquals(new BigDecimal("5000"), result.getFeeAmount());
        verify(guaranteeRepository).save(testGuarantee);
    }

    @Test
    void payFee_ShouldThrowWhenNotFound() {
        when(guaranteeRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.payFee(999L, new BigDecimal("5000")));
        assertEquals("担保记录不存在", ex.getMessage());
    }

    @Test
    void payFee_ShouldThrowWhenAlreadyPaid() {
        testGuarantee.setFeeStatus("PAID");
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.payFee(1L, new BigDecimal("5000")));
        assertEquals("担保费不处于未支付状态", ex.getMessage());
        verify(guaranteeRepository, never()).save(any());
    }

    // ======================== registerCounterGuarantee ========================

    @Test
    void registerCounterGuarantee_ShouldChangePendingToRegistered() {
        testGuarantee.setCounterGuaranteeStatus("PENDING");
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> i.getArgument(0));

        Guarantee result = guaranteeService.registerCounterGuarantee(1L, "抵押", "房产抵押", new BigDecimal("800000"));

        assertEquals("REGISTERED", result.getCounterGuaranteeStatus());
        assertEquals("抵押", result.getCounterGuaranteeType());
        assertEquals("房产抵押", result.getCounterGuaranteeDesc());
        assertEquals(new BigDecimal("800000"), result.getCounterGuaranteeValue());
        verify(guaranteeRepository).save(testGuarantee);
    }

    @Test
    void registerCounterGuarantee_ShouldThrowWhenNotFound() {
        when(guaranteeRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.registerCounterGuarantee(999L, "抵押", "房产抵押", new BigDecimal("800000")));
        assertEquals("担保记录不存在", ex.getMessage());
    }

    // ======================== terminateGuarantee ========================

    @Test
    void terminateGuarantee_ShouldChangeActiveToTerminated() {
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));
        when(guaranteeRepository.save(any(Guarantee.class))).thenAnswer(i -> i.getArgument(0));

        Guarantee result = guaranteeService.terminateGuarantee(1L, "企业注销");

        assertEquals("TERMINATED", result.getStatus());
        assertEquals("企业注销", result.getRemark());
        verify(guaranteeRepository).save(testGuarantee);
    }

    @Test
    void terminateGuarantee_ShouldThrowWhenNotFound() {
        when(guaranteeRepository.findById(999L)).thenReturn(Optional.empty());

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.terminateGuarantee(999L, "企业注销"));
        assertEquals("担保记录不存在", ex.getMessage());
    }

    @Test
    void terminateGuarantee_ShouldThrowWhenNotActive() {
        testGuarantee.setStatus("RELEASED");
        when(guaranteeRepository.findById(1L)).thenReturn(Optional.of(testGuarantee));

        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> guaranteeService.terminateGuarantee(1L, "企业注销"));
        assertEquals("只有激活状态的担保可以终止", ex.getMessage());
        verify(guaranteeRepository, never()).save(any());
    }

    // ======================== calculateFee ========================

    @Test
    void calculateFee_ShouldReturnCorrectAmount() {
        BigDecimal result = guaranteeService.calculateFee(
                new BigDecimal("100000"), new BigDecimal("2.5"), 12);
        assertEquals(new BigDecimal("2500.00"), result);
    }

    @Test
    void calculateFee_ShouldReturnZeroForNullInput() {
        assertEquals(BigDecimal.ZERO, guaranteeService.calculateFee(null, new BigDecimal("2.5"), 12));
        assertEquals(BigDecimal.ZERO, guaranteeService.calculateFee(new BigDecimal("100000"), null, 12));
        assertEquals(BigDecimal.ZERO, guaranteeService.calculateFee(new BigDecimal("100000"), new BigDecimal("2.5"), null));
    }

    @Test
    void calculateFee_ShouldHandlePartialYear() {
        // 100000 * 2.5 / 100 * 6 / 12 = 1250.00
        BigDecimal result = guaranteeService.calculateFee(
                new BigDecimal("100000"), new BigDecimal("2.5"), 6);
        assertEquals(new BigDecimal("1250.00"), result);
    }
}
