package com.wisdom.loan.loan.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.wisdom.loan.loan.entity.BaseEntity;

/**
 * 贷款产品
 */
@Entity
@Table(name = "t_loan_product")
@Getter
@Setter
public class LoanProduct {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /** 产品名称 */
    @Column(nullable = false, length = 100)
    private String name;
    
    /** 产品描述 */
    @Column(length = 500)
    private String description;
    
    /** 银行ID */
    @Column(name = "bank_id", nullable = false)
    private Long bankId;
    
    /** 贷款金额上限 */
    @Column(name = "max_amount", precision = 18, scale = 2)
    private BigDecimal maxAmount;
    
    /** 贷款金额下限 */
    @Column(name = "min_amount", precision = 18, scale = 2)
    private BigDecimal minAmount;
    
    /** 年利率(%) */
    @Column(precision = 5, scale = 2)
    private BigDecimal interestRate;
    
    /** 贷款期限上限(月) */
    @Column(name = "max_term_months")
    private Integer maxTermMonths;
    
    /** 贷款期限下限(月) */
    @Column(name = "min_term_months")
    private Integer minTermMonths;
    
    /** 放款时间(天) */
    private Integer loanDays;
    
    /** 申请条件 */
    @Column(length = 500)
    private String requirements;
    
    /** 所需材料 */
    @Column(length = 500)
    private String materials;
    
    /** 产品状态: DRAFT-草稿, ACTIVE-上架, INACTIVE-下架 */
    @Column(nullable = false, length = 20)
    private String status;
}