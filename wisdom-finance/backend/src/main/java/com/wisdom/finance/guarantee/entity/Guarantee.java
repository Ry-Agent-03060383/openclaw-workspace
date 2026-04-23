package com.wisdom.finance.guarantee.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import com.wisdom.finance.loan.entity.LoanApplication;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 担保实体 - 担保业务流程
 */
@Data
@EqualsAndHashCode(callSuper = true)
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
}
