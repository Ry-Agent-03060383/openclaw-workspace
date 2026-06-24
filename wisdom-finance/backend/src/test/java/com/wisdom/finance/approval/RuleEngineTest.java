package com.wisdom.finance.approval;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.approval.engine.RuleEngine;
import com.wisdom.finance.approval.entity.ApprovalRule;
import com.wisdom.finance.loan.entity.LoanApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RuleEngineTest {

    private RuleEngine ruleEngine;

    @BeforeEach
    void setUp() {
        ruleEngine = new RuleEngine(new ObjectMapper());
    }

    @Test
    void execute_SmallLoan_ShouldAutoApprove() {
        LoanApplication app = new LoanApplication();
        app.setApplicationNo("LA001");
        app.setLoanAmount(new BigDecimal("10000"));
        app.setLoanTermMonths(12);

        RuleEngine.RuleResult result = ruleEngine.execute(app);

        assertEquals("APPROVE", result.getAction());
        assertTrue(result.getMatchedRules().contains("AMOUNT_LOW_AUTO_PASS"));
    }

    @Test
    void execute_LargeLoan_ShouldNeedManual() {
        LoanApplication app = new LoanApplication();
        app.setApplicationNo("LA002");
        app.setLoanAmount(new BigDecimal("1000000"));
        app.setLoanTermMonths(12);

        RuleEngine.RuleResult result = ruleEngine.execute(app);

        assertEquals("NEEDS_MANUAL", result.getAction());
        assertTrue(result.getMatchedRules().contains("AMOUNT_HIGH_NEEDS_MANUAL"));
    }

    @Test
    void execute_LowCreditScore_ShouldReject() {
        LoanApplication app = new LoanApplication();
        app.setApplicationNo("LA003");
        app.setLoanAmount(new BigDecimal("100000"));
        app.setLoanTermMonths(12);
        app.setCreditScore(50);

        RuleEngine.RuleResult result = ruleEngine.execute(app);

        assertEquals("REJECT", result.getAction());
        assertTrue(result.getMatchedRules().contains("LOW_CREDIT_REJECT"));
    }

    @Test
    void execute_LongTerm_ShouldNeedManual() {
        LoanApplication app = new LoanApplication();
        app.setApplicationNo("LA004");
        app.setLoanAmount(new BigDecimal("100000"));
        app.setLoanTermMonths(48);

        RuleEngine.RuleResult result = ruleEngine.execute(app);

        assertEquals("NEEDS_MANUAL", result.getAction());
        assertTrue(result.getMatchedRules().contains("LONG_TERM_NEEDS_MANUAL"));
    }

    @Test
    void execute_NoMatchingRules_ShouldDefaultManual() {
        LoanApplication app = new LoanApplication();
        app.setApplicationNo("LA005");
        app.setLoanAmount(new BigDecimal("200000"));
        app.setLoanTermMonths(24);
        app.setCreditScore(80);

        RuleEngine.RuleResult result = ruleEngine.execute(app);

        assertEquals("NEEDS_MANUAL", result.getAction());
        assertTrue(result.getMatchedRules().isEmpty());
    }

    @Test
    void getEnabledRules_ShouldReturnAllFive() {
        List<ApprovalRule> rules = ruleEngine.getEnabledRules();
        assertEquals(5, rules.size());
    }

    @Test
    void getActionAsStatus_ShouldMapCorrectly() {
        assertEquals(LoanApplication.ApplicationStatus.APPROVED,
                new RuleEngine.RuleResult("APPROVE", "", List.of()).getActionAsStatus());
        assertEquals(LoanApplication.ApplicationStatus.REJECTED,
                new RuleEngine.RuleResult("REJECT", "", List.of()).getActionAsStatus());
        assertEquals(LoanApplication.ApplicationStatus.NEEDS_MANUAL,
                new RuleEngine.RuleResult("NEEDS_MANUAL", "", List.of()).getActionAsStatus());
        assertEquals(LoanApplication.ApplicationStatus.NEEDS_MANUAL,
                new RuleEngine.RuleResult("UNKNOWN", "", List.of()).getActionAsStatus());
    }
}