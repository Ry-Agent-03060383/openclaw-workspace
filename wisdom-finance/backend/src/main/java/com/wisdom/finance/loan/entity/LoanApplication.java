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
    
    // 手动添加getter和setter方法，解决Lombok问题
    public String getApplicationNo() {
        return applicationNo;
    }
    
    public void setApplicationNo(String applicationNo) {
        this.applicationNo = applicationNo;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public Long getCompanyId() {
        return companyId;
    }
    
    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }
    
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getCreditCode() {
        return creditCode;
    }
    
    public void setCreditCode(String creditCode) {
        this.creditCode = creditCode;
    }
    
    public BigDecimal getLoanAmount() {
        return loanAmount;
    }
    
    public void setLoanAmount(BigDecimal loanAmount) {
        this.loanAmount = loanAmount;
    }
    
    public Integer getLoanTermMonths() {
        return loanTermMonths;
    }
    
    public void setLoanTermMonths(Integer loanTermMonths) {
        this.loanTermMonths = loanTermMonths;
    }
    
    public BigDecimal getInterestRate() {
        return interestRate;
    }
    
    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }
    
    public String getLoanPurpose() {
        return loanPurpose;
    }
    
    public void setLoanPurpose(String loanPurpose) {
        this.loanPurpose = loanPurpose;
    }
    
    public String getRepaymentMethod() {
        return repaymentMethod;
    }
    
    public void setRepaymentMethod(String repaymentMethod) {
        this.repaymentMethod = repaymentMethod;
    }
    
    public ApplicationStatus getStatus() {
        return status;
    }
    
    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
    
    public Integer getCreditScore() {
        return creditScore;
    }
    
    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }
    
    public String getRiskLevel() {
        return riskLevel;
    }
    
    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
    
    public Integer getRiskScore() {
        return riskScore;
    }
    
    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }
    
    public BigDecimal getApprovedAmount() {
        return approvedAmount;
    }
    
    public void setApprovedAmount(BigDecimal approvedAmount) {
        this.approvedAmount = approvedAmount;
    }
    
    public Integer getApprovedTermMonths() {
        return approvedTermMonths;
    }
    
    public void setApprovedTermMonths(Integer approvedTermMonths) {
        this.approvedTermMonths = approvedTermMonths;
    }
    
    public BigDecimal getApprovedInterestRate() {
        return approvedInterestRate;
    }
    
    public void setApprovedInterestRate(BigDecimal approvedInterestRate) {
        this.approvedInterestRate = approvedInterestRate;
    }
    
    public LocalDateTime getSubmitTime() {
        return submitTime;
    }
    
    public void setSubmitTime(LocalDateTime submitTime) {
        this.submitTime = submitTime;
    }
    
    public LocalDateTime getReviewTime() {
        return reviewTime;
    }
    
    public void setReviewTime(LocalDateTime reviewTime) {
        this.reviewTime = reviewTime;
    }
    
    public Long getReviewerId() {
        return reviewerId;
    }
    
    public void setReviewerId(Long reviewerId) {
        this.reviewerId = reviewerId;
    }
    
    public String getReviewComment() {
        return reviewComment;
    }
    
    public void setReviewComment(String reviewComment) {
        this.reviewComment = reviewComment;
    }
    
    public String getMaterials() {
        return materials;
    }
    
    public void setMaterials(String materials) {
        this.materials = materials;
    }
    
    public String getRejectionReason() {
        return rejectionReason;
    }
    
    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
    
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