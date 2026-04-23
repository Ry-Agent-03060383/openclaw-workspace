package com.wisdom.finance.loan.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 贷款申请实体 - M4 贷款申请流程
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_loan_application")
public class LoanApplication extends BaseEntity {
    
    @Column(name = "application_no", unique = true, length = 32)
    private String applicationNo; // 申请单号
    
    @Column(name = "user_id")
    private Long userId; // 申请人ID
    
    @Column(name = "product_id")
    private Long productId; // 贷款产品ID
    
    @Column(name = "company_id")
    private Long companyId; // 企业ID
    
    @Column(name = "company_name", length = 200)
    private String companyName;
    
    @Column(name = "credit_code", length = 18)
    private String creditCode;
    
    @Column(name = "loan_amount", precision = 18, scale = 2, nullable = false)
    private BigDecimal loanAmount; // 申请金额
    
    @Column(name = "loan_term_months")
    private Integer loanTermMonths; // 申请期限（月）
    
    @Column(name = "interest_rate", precision = 8, scale = 4)
    private BigDecimal interestRate; // 贷款利率
    
    @Column(name = "loan_purpose", length = 500)
    private String loanPurpose; // 贷款用途
    
    @Column(name = "repayment_method", length = 20)
    private String repaymentMethod; // 还款方式：等额本息/先息后本/等额本金
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private ApplicationStatus status = ApplicationStatus.DRAFT;
    
    @Column(name = "credit_score")
    private Integer creditScore; // 信用评分
    
    @Column(name = "risk_level", length = 10)
    private String riskLevel; // 风险等级
    
    @Column(name = "risk_score")
    private Integer riskScore; // 风险评分
    
    @Column(name = "approved_amount", precision = 18, scale = 2)
    private BigDecimal approvedAmount; // 审批金额
    
    @Column(name = "approved_term_months")
    private Integer approvedTermMonths; // 审批期限
    
    @Column(name = "approved_interest_rate", precision = 8, scale = 4)
    private BigDecimal approvedInterestRate; // 审批利率
    
    @Column(name = "submit_time")
    private LocalDateTime submitTime; // 提交时间
    
    @Column(name = "review_time")
    private LocalDateTime reviewTime; // 审批时间
    
    @Column(name = "reviewer_id")
    private Long reviewerId; // 审批人ID
    
    @Column(name = "review_comment", length = 1000)
    private String reviewComment; // 审批意见
    
    @Column(name = "materials", columnDefinition = "JSON")
    private String materials; // 申请材料 JSON
    
    @Column(name = "rejection_reason", length = 500)
    private String rejectionReason; // 拒绝原因
    
    /**
     * 申请状态枚举
     */
    public enum ApplicationStatus {
        DRAFT,           // 草稿
        SUBMITTED,       // 已提交
        REVIEWING,       // 审批中
        NEEDS_MANUAL,    // 需要人工复审
        APPROVED,        // 已通过
        REJECTED,        // 已拒绝
        CANCELLED        // 已取消
    }
}