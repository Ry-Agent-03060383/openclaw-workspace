package com.wisdom.finance.bank.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import com.wisdom.finance.user.entity.Bank;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

/**
 * 银行产品实体 - 银行贷款产品
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_bank_product")
public class BankProduct extends BaseEntity {
    
    @Column(name = "product_code", unique = true, length = 50, nullable = false)
    private String productCode; // 产品代码
    
    @Column(name = "product_name", length = 100, nullable = false)
    private String productName; // 产品名称
    
    @Column(name = "bank_id")
    private Long bankId; // 所属银行ID
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_id", insertable = false, updatable = false)
    private Bank bank;
    
    @Column(name = "product_type", length = 50)
    private String productType; // 产品类型
    
    @Column(name = "min_amount", precision = 18, scale = 2)
    private BigDecimal minAmount; // 最小金额
    
    @Column(name = "max_amount", precision = 18, scale = 2)
    private BigDecimal maxAmount; // 最大金额
    
    @Column(name = "min_term_months")
    private Integer minTermMonths; // 最短期限（月）
    
    @Column(name = "max_term_months")
    private Integer maxTermMonths; // 最长期限（月）
    
    @Column(name = "interest_rate_min", precision = 8, scale = 4)
    private BigDecimal interestRateMin; // 最低利率
    
    @Column(name = "interest_rate_max", precision = 8, scale = 4)
    private BigDecimal interestRateMax; // 最高利率
    
    @Column(name = "required_credit_score")
    private Integer requiredCreditScore; // 要求信用分
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 产品描述
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/INACTIVE
    
    @Column(name = "apply_url", length = 200)
    private String applyUrl; // 申请链接
}
