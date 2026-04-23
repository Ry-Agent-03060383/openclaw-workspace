package com.wisdom.finance.guarantee.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 担保申请实体 - 担保业务流程
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_guarantee_application")
public class GuaranteeApplication extends BaseEntity {
    
    @Column(name = "app_no", unique = true, length = 32)
    private String appNo; // 申请编号
    
    @Column(name = "loan_application_id")
    private Long loanApplicationId; // 关联的贷款申请ID
    
    @Column(name = "applicant_id")
    private Long applicantId; // 申请人ID
    
    @Column(name = "applicant_name", length = 200)
    private String applicantName; // 申请人名称
    
    @Column(name = "guarantee_type", length = 50)
    private String guaranteeType; // 担保类型
    
    @Column(name = "request_amount", precision = 18, scale = 2, nullable = false)
    private BigDecimal requestAmount; // 申请担保金额
    
    @Column(name = "guarantor_info", columnDefinition = "JSON")
    private String guarantorInfo; // 担保人信息 JSON
    
    @Column(name = "collateral_info", columnDefinition = "JSON")
    private String collateralInfo; // 抵押物信息 JSON
    
    @Column(name = "purpose", length = 500)
    private String purpose; // 担保用途
    
    @Column(name = "status", length = 20)
    private String status; // 申请状态：DRAFT/SUBMITTED/APPROVING/APPROVED/REJECTED
    
    @Column(name = "submit_time")
    private LocalDateTime submitTime; // 提交时间
    
    @Column(name = "review_time")
    private LocalDateTime reviewTime; // 审核时间
    
    @Column(name = "reviewer_id")
    private Long reviewerId; // 审核人ID
    
    @Column(name = "review_comment", length = 1000)
    private String reviewComment; // 审核意见
    
    @Column(name = "rejection_reason", length = 500)
    private String rejectionReason; // 拒绝原因
}
