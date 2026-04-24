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
    
    public String getProductCode() {
        return productCode;
    }
    
    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public Long getBankId() {
        return bankId;
    }
    
    public void setBankId(Long bankId) {
        this.bankId = bankId;
    }
    
    public Bank getBank() {
        return bank;
    }
    
    public void setBank(Bank bank) {
        this.bank = bank;
    }
    
    public String getProductType() {
        return productType;
    }
    
    public void setProductType(String productType) {
        this.productType = productType;
    }
    
    public BigDecimal getMinAmount() {
        return minAmount;
    }
    
    public void setMinAmount(BigDecimal minAmount) {
        this.minAmount = minAmount;
    }
    
    public BigDecimal getMaxAmount() {
        return maxAmount;
    }
    
    public void setMaxAmount(BigDecimal maxAmount) {
        this.maxAmount = maxAmount;
    }
    
    public Integer getMinTermMonths() {
        return minTermMonths;
    }
    
    public void setMinTermMonths(Integer minTermMonths) {
        this.minTermMonths = minTermMonths;
    }
    
    public Integer getMaxTermMonths() {
        return maxTermMonths;
    }
    
    public void setMaxTermMonths(Integer maxTermMonths) {
        this.maxTermMonths = maxTermMonths;
    }
    
    public BigDecimal getInterestRateMin() {
        return interestRateMin;
    }
    
    public void setInterestRateMin(BigDecimal interestRateMin) {
        this.interestRateMin = interestRateMin;
    }
    
    public BigDecimal getInterestRateMax() {
        return interestRateMax;
    }
    
    public void setInterestRateMax(BigDecimal interestRateMax) {
        this.interestRateMax = interestRateMax;
    }
    
    public Integer getRequiredCreditScore() {
        return requiredCreditScore;
    }
    
    public void setRequiredCreditScore(Integer requiredCreditScore) {
        this.requiredCreditScore = requiredCreditScore;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getApplyUrl() {
        return applyUrl;
    }
    
    public void setApplyUrl(String applyUrl) {
        this.applyUrl = applyUrl;
    }
}
