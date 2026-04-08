package com.wisdom.finance.loan.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 贷款申请
 */
@Entity
@Table(name = "t_loan_application")
@Getter
@Setter
public class LoanApplication extends BaseEntity {
    
    /** 贷款产品ID */
    @Column(name = "product_id", nullable = false)
    private Long productId;
    
    /** 企业ID */
    @Column(name = "enterprise_id", nullable = false)
    private Long enterpriseId;
    
    /** 申请金额 */
    @Column(precision = 18, scale = 2, nullable = false)
    private BigDecimal applyAmount;
    
    /** 申请期限(月) */
    @Column(nullable = false)
    private Integer termMonths;
    
    /** 贷款用途 */
    @Column(length = 200)
    private String purpose;
    
    /** 申请状态: SUBMITTED-已提交, REVIEWING-审核中, APPROVED-已通过, REJECTED-已拒绝, DISBURSED-已放款 */
    @Column(nullable = false, length = 20)
    private String status = "SUBMITTED";
    
    /** 审核备注 */
    @Column(length = 500)
    private String reviewNote;
    
    /** 审核人ID */
    @Column(name = "reviewer_id")
    private Long reviewerId;
    
    /** 审核时间 */
    @Column(name = "review_time")
    private LocalDateTime reviewTime;
    
    /** 实际放款金额 */
    @Column(name = "disburse_amount", precision = 18, scale = 2)
    private BigDecimal disburseAmount;
    
    /** 实际利率 */
    @Column(name = "interest_rate", precision = 5, scale = 2)
    private BigDecimal interestRate;
    
    /** 放款时间 */
    @Column(name = "disburse_time")
    private LocalDateTime disburseTime;
    
    /** 到期日期 */
    @Column(name = "due_date")
    private LocalDateTime dueDate;
}