package com.wisdom.finance.guarantee.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import com.wisdom.finance.loan.entity.LoanApplication;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 担保实体 - 担保业务流程
 */
@Entity
@Table(name = "t_guarantee")
public class Guarantee extends BaseEntity {
    
    @Column(name = "guarantee_no", unique = true, length = 32)
    private String guaranteeNo; // 担保编号
    
    @Column(name = "application_id")
    private Long applicationId; // 担保申请ID
    
    @Column(name = "loan_application_id")
    private Long loanApplicationId; // 贷款申请ID
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_application_id", insertable = false, updatable = false)
    private LoanApplication loanApplication;
    
    @Column(name = "guarantor_type", length = 20)
    private String guarantorType; // 担保人类型：企业/个人
    
    @Column(name = "guarantor_id")
    private Long guarantorId; // 担保人ID（企业ID或用户ID）
    
    @Column(name = "guarantor_name", length = 200)
    private String guarantorName; // 担保人名称
    
    @Column(name = "guarantee_amount", precision = 18, scale = 2, nullable = false)
    private BigDecimal guaranteeAmount; // 担保金额
    
    @Column(name = "guarantee_ratio", precision = 8, scale = 4)
    private BigDecimal guaranteeRatio; // 担保比例
    
    @Column(name = "guarantee_type", length = 50)
    private String guaranteeType; // 担保类型：连带责任保证/抵押/质押
    
    @Column(name = "collateral_desc", length = 500)
    private String collateralDesc; // 抵押物描述
    
    @Column(name = "collateral_value", precision = 18, scale = 2)
    private BigDecimal collateralValue; // 抵押物价值
    
    // ═══ 新增：反担保字段 ═══
    @Column(name = "counter_guarantee_type", length = 50)
    private String counterGuaranteeType; // 反担保类型：抵押/质押/保证
    
    @Column(name = "counter_guarantee_desc", length = 500)
    private String counterGuaranteeDesc; // 反担保描述
    
    @Column(name = "counter_guarantee_value", precision = 18, scale = 2)
    private BigDecimal counterGuaranteeValue; // 反担保价值
    
    @Column(name = "counter_guarantee_status", length = 20)
    private String counterGuaranteeStatus; // 反担保状态：PENDING/REGISTERED/RELEASED
    
    // ═══ 新增：担保费字段 ═══
    @Column(name = "fee_rate", precision = 8, scale = 4)
    private BigDecimal feeRate; // 担保费率（年化 %）
    
    @Column(name = "fee_amount", precision = 18, scale = 2)
    private BigDecimal feeAmount; // 担保费金额
    
    @Column(name = "fee_paid", precision = 18, scale = 2)
    private BigDecimal feePaid; // 已付担保费
    
    @Column(name = "fee_status", length = 20)
    private String feeStatus; // 担保费状态：UNPAID/PARTIAL/PAID/REFUNDED
    
    // ═══ 新增：合同字段 ═══
    @Column(name = "contract_no", length = 64)
    private String contractNo; // 担保合同编号
    
    @Column(name = "contract_file_url", length = 500)
    private String contractFileUrl; // 合同文件URL
    
    @Column(name = "signed_date")
    private LocalDate signedDate; // 签约日期
    
    // ═══ 原有字段 ═══
    @Column(name = "start_date")
    private LocalDate startDate; // 担保开始日期
    
    @Column(name = "end_date")
    private LocalDate endDate; // 担保结束日期
    
    @Column(name = "status", length = 20)
    private String status; // 担保状态：PENDING_SIGN/ACTIVE/EXPIRED/RELEASED/TERMINATED
    
    @Column(name = "risk_level", length = 10)
    private String riskLevel; // 担保风险等级
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注

    @Column(name = "release_time")
    private LocalDateTime releaseTime; // 释放时间

    @Column(name = "release_reason", length = 500)
    private String releaseReason; // 释放原因

    // ===== Getters and Setters =====
    public String getGuaranteeNo() { return guaranteeNo; }
    public void setGuaranteeNo(String guaranteeNo) { this.guaranteeNo = guaranteeNo; }
    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
    public Long getLoanApplicationId() { return loanApplicationId; }
    public void setLoanApplicationId(Long loanApplicationId) { this.loanApplicationId = loanApplicationId; }
    public LoanApplication getLoanApplication() { return loanApplication; }
    public void setLoanApplication(LoanApplication loanApplication) { this.loanApplication = loanApplication; }
    public String getGuarantorType() { return guarantorType; }
    public void setGuarantorType(String guarantorType) { this.guarantorType = guarantorType; }
    public Long getGuarantorId() { return guarantorId; }
    public void setGuarantorId(Long guarantorId) { this.guarantorId = guarantorId; }
    public String getGuarantorName() { return guarantorName; }
    public void setGuarantorName(String guarantorName) { this.guarantorName = guarantorName; }
    public BigDecimal getGuaranteeAmount() { return guaranteeAmount; }
    public void setGuaranteeAmount(BigDecimal guaranteeAmount) { this.guaranteeAmount = guaranteeAmount; }
    public BigDecimal getGuaranteeRatio() { return guaranteeRatio; }
    public void setGuaranteeRatio(BigDecimal guaranteeRatio) { this.guaranteeRatio = guaranteeRatio; }
    public String getGuaranteeType() { return guaranteeType; }
    public void setGuaranteeType(String guaranteeType) { this.guaranteeType = guaranteeType; }
    public String getCollateralDesc() { return collateralDesc; }
    public void setCollateralDesc(String collateralDesc) { this.collateralDesc = collateralDesc; }
    public BigDecimal getCollateralValue() { return collateralValue; }
    public void setCollateralValue(BigDecimal collateralValue) { this.collateralValue = collateralValue; }
    public String getCounterGuaranteeType() { return counterGuaranteeType; }
    public void setCounterGuaranteeType(String counterGuaranteeType) { this.counterGuaranteeType = counterGuaranteeType; }
    public String getCounterGuaranteeDesc() { return counterGuaranteeDesc; }
    public void setCounterGuaranteeDesc(String counterGuaranteeDesc) { this.counterGuaranteeDesc = counterGuaranteeDesc; }
    public BigDecimal getCounterGuaranteeValue() { return counterGuaranteeValue; }
    public void setCounterGuaranteeValue(BigDecimal counterGuaranteeValue) { this.counterGuaranteeValue = counterGuaranteeValue; }
    public String getCounterGuaranteeStatus() { return counterGuaranteeStatus; }
    public void setCounterGuaranteeStatus(String counterGuaranteeStatus) { this.counterGuaranteeStatus = counterGuaranteeStatus; }
    public BigDecimal getFeeRate() { return feeRate; }
    public void setFeeRate(BigDecimal feeRate) { this.feeRate = feeRate; }
    public BigDecimal getFeeAmount() { return feeAmount; }
    public void setFeeAmount(BigDecimal feeAmount) { this.feeAmount = feeAmount; }
    public BigDecimal getFeePaid() { return feePaid; }
    public void setFeePaid(BigDecimal feePaid) { this.feePaid = feePaid; }
    public String getFeeStatus() { return feeStatus; }
    public void setFeeStatus(String feeStatus) { this.feeStatus = feeStatus; }
    public String getContractNo() { return contractNo; }
    public void setContractNo(String contractNo) { this.contractNo = contractNo; }
    public String getContractFileUrl() { return contractFileUrl; }
    public void setContractFileUrl(String contractFileUrl) { this.contractFileUrl = contractFileUrl; }
    public LocalDate getSignedDate() { return signedDate; }
    public void setSignedDate(LocalDate signedDate) { this.signedDate = signedDate; }
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public String getRemark() { return remark; }
    public void setRemark(String remark) { this.remark = remark; }
    public LocalDateTime getReleaseTime() { return releaseTime; }
    public void setReleaseTime(LocalDateTime releaseTime) { this.releaseTime = releaseTime; }
    public String getReleaseReason() { return releaseReason; }
    public void setReleaseReason(String releaseReason) { this.releaseReason = releaseReason; }
}
