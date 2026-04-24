package com.wisdom.finance.guarantee.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 担保申请实体 - 担保业务流程
 */
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

    // Getters and Setters
    public String getAppNo() { return appNo; }
    public void setAppNo(String appNo) { this.appNo = appNo; }
    public Long getLoanApplicationId() { return loanApplicationId; }
    public void setLoanApplicationId(Long loanApplicationId) { this.loanApplicationId = loanApplicationId; }
    public Long getApplicantId() { return applicantId; }
    public void setApplicantId(Long applicantId) { this.applicantId = applicantId; }
    public String getApplicantName() { return applicantName; }
    public void setApplicantName(String applicantName) { this.applicantName = applicantName; }
    public String getGuaranteeType() { return guaranteeType; }
    public void setGuaranteeType(String guaranteeType) { this.guaranteeType = guaranteeType; }
    public BigDecimal getRequestAmount() { return requestAmount; }
    public void setRequestAmount(BigDecimal requestAmount) { this.requestAmount = requestAmount; }
    public String getGuarantorInfo() { return guarantorInfo; }
    public void setGuarantorInfo(String guarantorInfo) { this.guarantorInfo = guarantorInfo; }
    public String getCollateralInfo() { return collateralInfo; }
    public void setCollateralInfo(String collateralInfo) { this.collateralInfo = collateralInfo; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getSubmitTime() { return submitTime; }
    public void setSubmitTime(LocalDateTime submitTime) { this.submitTime = submitTime; }
    public LocalDateTime getReviewTime() { return reviewTime; }
    public void setReviewTime(LocalDateTime reviewTime) { this.reviewTime = reviewTime; }
    public Long getReviewerId() { return reviewerId; }
    public void setReviewerId(Long reviewerId) { this.reviewerId = reviewerId; }
    public String getReviewComment() { return reviewComment; }
    public void setReviewComment(String reviewComment) { this.reviewComment = reviewComment; }
    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
}
