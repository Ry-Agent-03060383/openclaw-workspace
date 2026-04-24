package com.wisdom.finance.approval.engine;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.approval.entity.ApprovalRule;
import com.wisdom.finance.loan.entity.LoanApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;

/**
 * 简单规则引擎 - M5 自动化审批
 */
@Component
public class RuleEngine {
    
    private static final Logger log = LoggerFactory.getLogger(RuleEngine.class);
    
    private final ObjectMapper objectMapper;
    
    private final List<ApprovalRule> ruleStore = new ArrayList<>();
    
    public RuleEngine(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        initializeDefaultRules();
    }
    
    private void initializeDefaultRules() {
        ApprovalRule rule1 = new ApprovalRule();
        rule1.setId(1L);
        rule1.setRuleCode("AMOUNT_LOW_AUTO_PASS");
        rule1.setRuleName("小额贷款自动通过");
        rule1.setRuleCondition("{\"field\": \"loanAmount\", \"operator\": \"lt\", \"value\": 50000}");
        rule1.setRuleAction("APPROVE");
        rule1.setPriority(1);
        rule1.setEnabled(true);
        rule1.setDescription("贷款金额小于5万元的申请自动通过");
        ruleStore.add(rule1);
        
        ApprovalRule rule2 = new ApprovalRule();
        rule2.setId(2L);
        rule2.setRuleCode("AMOUNT_HIGH_NEEDS_MANUAL");
        rule2.setRuleName("大额贷款人工复审");
        rule2.setRuleCondition("{\"field\": \"loanAmount\", \"operator\": \"gt\", \"value\": 500000}");
        rule2.setRuleAction("NEEDS_MANUAL");
        rule2.setPriority(2);
        rule2.setEnabled(true);
        rule2.setDescription("贷款金额大于50万元的申请需要人工复审");
        ruleStore.add(rule2);
        
        ApprovalRule rule3 = new ApprovalRule();
        rule3.setId(3L);
        rule3.setRuleCode("LOW_CREDIT_REJECT");
        rule3.setRuleName("低信用评分拒绝");
        rule3.setRuleCondition("{\"field\": \"creditScore\", \"operator\": \"lt\", \"value\": 60}");
        rule3.setRuleAction("REJECT");
        rule3.setPriority(3);
        rule3.setEnabled(true);
        rule3.setDescription("信用评分低于60分的申请自动拒绝");
        ruleStore.add(rule3);
        
        ApprovalRule rule4 = new ApprovalRule();
        rule4.setId(4L);
        rule4.setRuleCode("HIGH_RISK_NEEDS_MANUAL");
        rule4.setRuleName("高风险人工复审");
        rule4.setRuleCondition("{\"field\": \"riskLevel\", \"operator\": \"eq\", \"value\": \"C\"}");
        rule4.setRuleAction("NEEDS_MANUAL");
        rule4.setPriority(4);
        rule4.setEnabled(true);
        rule4.setDescription("风险等级为C的申请需要人工复审");
        ruleStore.add(rule4);
        
        ApprovalRule rule5 = new ApprovalRule();
        rule5.setId(5L);
        rule5.setRuleCode("LONG_TERM_NEEDS_MANUAL");
        rule5.setRuleName("长期贷款人工复审");
        rule5.setRuleCondition("{\"field\": \"loanTermMonths\", \"operator\": \"gt\", \"value\": 36}");
        rule5.setRuleAction("NEEDS_MANUAL");
        rule5.setPriority(5);
        rule5.setEnabled(true);
        rule5.setDescription("贷款期限超过36个月的申请需要人工复审");
        ruleStore.add(rule5);
    }
    
    public RuleResult execute(LoanApplication application) {
        log.info("开始执行规则引擎，申请编号: {}", application.getApplicationNo());
        
        List<ApprovalRule> enabledRules = getEnabledRules();
        enabledRules.sort(Comparator.comparingInt(ApprovalRule::getPriority));
        
        List<String> matchedRules = new ArrayList<>();
        String finalAction = "NEEDS_MANUAL";
        String message = "";
        
        for (ApprovalRule rule : enabledRules) {
            if (matchRule(rule, application)) {
                matchedRules.add(rule.getRuleCode());
                finalAction = rule.getRuleAction();
                message = String.format("规则[%s]触发: %s", rule.getRuleCode(), rule.getDescription());
                
                log.info("规则匹配成功: {}, 动作: {}", rule.getRuleCode(), rule.getRuleAction());
                
                if ("REJECT".equals(finalAction) || "APPROVE".equals(finalAction)) {
                    break;
                }
            }
        }
        
        if (matchedRules.isEmpty()) {
            message = "无匹配规则，默认需要人工复审";
            log.info("无规则匹配，需要人工复审");
        }
        
        return new RuleResult(finalAction, message, matchedRules);
    }
    
    public List<ApprovalRule> getEnabledRules() {
        List<ApprovalRule> enabled = new ArrayList<>();
        for (ApprovalRule rule : ruleStore) {
            if (Boolean.TRUE.equals(rule.getEnabled())) {
                enabled.add(rule);
            }
        }
        return enabled;
    }
    
    private boolean matchRule(ApprovalRule rule, LoanApplication application) {
        try {
            Map<String, Object> condition = objectMapper.readValue(
                    rule.getRuleCondition(), Map.class);
            
            String field = (String) condition.get("field");
            String operator = (String) condition.get("operator");
            Object value = condition.get("value");
            
            Object fieldValue = getFieldValue(application, field);
            if (fieldValue == null) {
                return false;
            }
            
            return evaluateCondition(fieldValue, operator, value);
            
        } catch (JsonProcessingException e) {
            log.error("解析规则条件失败: {}", rule.getRuleCode(), e);
            return false;
        }
    }
    
    private Object getFieldValue(LoanApplication application, String field) {
        return switch (field) {
            case "loanAmount" -> application.getLoanAmount();
            case "creditScore" -> application.getCreditScore();
            case "riskLevel" -> application.getRiskLevel();
            case "loanTermMonths" -> application.getLoanTermMonths();
            default -> null;
        };
    }
    
    private boolean evaluateCondition(Object fieldValue, String operator, Object targetValue) {
        return switch (operator) {
            case "eq" -> Objects.equals(fieldValue.toString(), targetValue.toString());
            case "ne" -> !Objects.equals(fieldValue.toString(), targetValue.toString());
            case "gt" -> compareValues(fieldValue, targetValue) > 0;
            case "gte" -> compareValues(fieldValue, targetValue) >= 0;
            case "lt" -> compareValues(fieldValue, targetValue) < 0;
            case "lte" -> compareValues(fieldValue, targetValue) <= 0;
            case "in" -> {
                if (targetValue instanceof List) {
                    yield ((List<?>) targetValue).contains(fieldValue);
                }
                yield false;
            }
            default -> false;
        };
    }
    
    private int compareValues(Object value1, Object value2) {
        if (value1 instanceof Comparable && value2 instanceof Comparable) {
            @SuppressWarnings("unchecked")
            Comparable<Object> c1 = (Comparable<Object>) value1;
            return c1.compareTo(value2);
        }
        
        if (value1 instanceof BigDecimal && value2 instanceof Number) {
            return ((BigDecimal) value1).compareTo(new BigDecimal(value2.toString()));
        }
        
        if (value1 instanceof Number && value2 instanceof Number) {
            return Double.compare(((Number) value1).doubleValue(), ((Number) value2).doubleValue());
        }
        
        return value1.toString().compareTo(value2.toString());
    }
    
    public static class RuleResult {
        private final String action;
        private final String message;
        private final List<String> matchedRules;
        
        public RuleResult(String action, String message, List<String> matchedRules) {
            this.action = action;
            this.message = message;
            this.matchedRules = matchedRules;
        }
        
        public String getAction() { return action; }
        
        public String getMessage() { return message; }
        
        public List<String> getMatchedRules() { return matchedRules; }
        
        public LoanApplication.ApplicationStatus getActionAsStatus() {
            return switch (action) {
                case "APPROVE" -> LoanApplication.ApplicationStatus.APPROVED;
                case "REJECT" -> LoanApplication.ApplicationStatus.REJECTED;
                default -> LoanApplication.ApplicationStatus.NEEDS_MANUAL;
            };
        }
    }
}
