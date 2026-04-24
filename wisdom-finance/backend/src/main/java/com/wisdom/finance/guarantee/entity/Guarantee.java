package com.wisdom.finance.guarantee.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import com.wisdom.finance.loan.entity.LoanApplication;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 担保实体 - 担保业务流程
 */
@Entity
@Table(name = "t_guarantee")
public class Guarantee extends BaseEntity {
    
    @Column(name = "guarantee_no", unique = true, length = 32)
    private String guaranteeNo; // 担保编号
    
    @Column(name = "application_id")
    private Long applicationId; // 贷款申请ID
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", insertable = false, updatable = false)
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
    
    @Column(name = "start_date")
    private LocalDate startDate; // 担保开始日期
    
    @Column(name = "end_date")
    private LocalDate endDate; // 担保结束日期
    
    @Column(name = "status", length = 20)
    private String status; // 担保状态：PENDING/ACTIVE/EXPIRED/RELEASED
    
    @Column(name = "risk_level", length = 10)
    private String riskLevel; // 担保风险等级
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注

    // Getters and Setters
    public String getGuaranteeNo() { return guaranteeNo; }
    public void setGuaranteeNo(String guaranteeNo) { this.guaranteeNo = guaranteeNo; }
    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
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
}
