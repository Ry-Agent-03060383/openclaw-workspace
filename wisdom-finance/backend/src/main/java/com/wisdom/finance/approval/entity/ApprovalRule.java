package com.wisdom.approval.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 审批规则实体 - M5 自动化审批
 */
@Data
@Entity
@Table(name = "t_approval_rule")
public class ApprovalRule {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "rule_code", unique = true, nullable = false, length = 50)
    private String ruleCode; // 规则编码
    
    @Column(name = "rule_name", nullable = false, length = 100)
    private String ruleName; // 规则名称
    
    @Column(name = "rule_condition", columnDefinition = "JSON")
    private String ruleCondition; // 规则条件（JSON格式）
    
    @Column(name = "rule_action", length = 50)
    private String ruleAction; // 规则动作：APPROVE/REJECT/NEEDS_MANUAL
    
    @Column(name = "priority", nullable = false)
    private Integer priority = 0; // 优先级（数字越小优先级越高）
    
    @Column(name = "enabled", nullable = false)
    private Boolean enabled = true; // 启用状态
    
    @Column(name = "description", length = 500)
    private String description; // 规则描述
    
    @Column(name = "created_by", length = 50)
    private String createdBy;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    /**
     * 规则动作类型
     */
    public enum RuleAction {
        APPROVE,         // 自动通过
        REJECT,          // 自动拒绝
        NEEDS_MANUAL     // 需要人工复审
    }
}