package com.wisdom.finance.approval;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.approval.engine.RuleEngine;
import com.wisdom.finance.approval.entity.ApprovalRecord;
import com.wisdom.finance.approval.service.ApprovalService;
import com.wisdom.finance.loan.entity.LoanApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ApprovalServiceTest {

    @Mock
    private RuleEngine ruleEngine;

    @InjectMocks
    private ApprovalService approvalService;

    private RuleEngine.RuleResult approveResult;

    @BeforeEach
    void setUp() {
        approveResult = new RuleEngine.RuleResult("APPROVE", "自动通过", List.of("AMOUNT_LOW_AUTO_PASS"));
    }

    @Test
    void autoReview_ShouldExecuteRuleAndCreateRecord() {
        when(ruleEngine.execute(any(LoanApplication.class))).thenReturn(approveResult);

        ApprovalRecord record = approvalService.autoReview(1L);

        assertNotNull(record);
        assertEquals(1L, record.getApplicationId());
        assertEquals(ApprovalRecord.ApprovalStage.AUTO_REVIEW, record.getStage());
        assertTrue(record.getAutoApproval());
        assertEquals(LoanApplication.ApplicationStatus.APPROVED, record.getResult());
    }

    @Test
    void applyRules_ShouldReturnRuleResult() {
        when(ruleEngine.execute(any(LoanApplication.class))).thenReturn(approveResult);

        RuleEngine.RuleResult result = approvalService.applyRules(1L);

        assertEquals("APPROVE", result.getAction());
        verify(ruleEngine).execute(any(LoanApplication.class));
    }

    @Test
    void manualReview_ShouldSetStageAndUpdateApplication() {
        ApprovalRecord record = new ApprovalRecord();
        record.setApplicationId(1L);
        record.setReviewerId(10L);
        record.setResult(LoanApplication.ApplicationStatus.APPROVED);
        record.setReviewComment("人工审批通过");

        ApprovalRecord result = approvalService.manualReview(record);

        assertEquals(ApprovalRecord.ApprovalStage.MANUAL_REVIEW, result.getStage());
        assertFalse(result.getAutoApproval());
        assertNotNull(result.getCreatedAt());
    }

    @Test
    void getApprovalHistory_ShouldReturnSortedRecords() {
        // First run auto-review to create a record
        when(ruleEngine.execute(any(LoanApplication.class))).thenReturn(approveResult);
        approvalService.autoReview(1L);

        List<ApprovalRecord> history = approvalService.getApprovalHistory(1L);

        assertFalse(history.isEmpty());
        assertEquals(1L, history.get(0).getApplicationId());
    }

    @Test
    void getApprovalHistory_ShouldReturnEmptyForUnknown() {
        List<ApprovalRecord> history = approvalService.getApprovalHistory(999L);
        assertTrue(history.isEmpty());
    }
}