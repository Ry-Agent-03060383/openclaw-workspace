package com.wisdom.risk.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;

/**
 * 风控规则实体 - M5/M6 自动化审批 + 风险评估
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_risk_rule")
public class RiskRule extends BaseEntity {
    
    @Column(name = "rule_code", unique = true, length = 50)
    private String ruleCode; // 规则编码: R001, R002...
    
    @Column(name = "rule_name", nullable = false, length = 100)
    private String ruleName; // 规则名称
    
    @Column(name = "rule_type", length = 20)
    private String ruleType; // 规则类型: AUTO_PASS/AUTO_REJECT/MANUAL_REVIEW
    
    @Column(name = "condition_expression", columnDefinition = "TEXT")
    private String conditionExpression; // 条件表达式
    
    @Column(name = "condition_desc", length = 500)
    private String conditionDesc; // 条件描述
    
    @Column(name = "action_result", length = 20)
    private String actionResult; // 触发动作: APPROVE/REJECT/MANUAL
    
    @Column(name = "action_message", length = 500)
    private String actionMessage; // 动作消息
    
    @Column(name = "priority")
    private Integer priority = 0; // 优先级
    
    @Column(name = "enabled")
    private Boolean enabled = true; // 是否启用
    
    @Column(name = "rule_group", length = 50)
    private String ruleGroup; // 规则组: CREDIT/APPLICANTION/INDUSTRY
}