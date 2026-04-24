package com.wisdom.finance.approval.entity;

import com.wisdom.finance.loan.entity.LoanApplication;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * 审批流程记录 - M5 自动化审批
 */
@Entity
@Table(name = "t_approval_record")
public class ApprovalRecord {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "application_id", nullable = false)
    private Long applicationId;
    
    @Column(name = "application_no", length = 32)
    private String applicationNo;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "stage", length = 20)
    private ApprovalStage stage; // 审批阶段
    
    @Enumerated(EnumType.STRING)
    @Column(name = "result", length = 20)
    private LoanApplication.ApplicationStatus result; // 审批结果
    
    @Column(name = "reviewer_id")
    private Long reviewerId; // 审批人
    
    @Column(name = "reviewer_name", length = 50)
    private String reviewerName;
    
    @Column(name = "review_comment", length = 1000)
    private String reviewComment;
    
    @Column(name = "auto_approval")
    private Boolean autoApproval; // 是否自动审批
    
    @Column(name = "rule_codes", length = 500)
    private String ruleCodes; // 触发的规则编码
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    public enum ApprovalStage {
        AUTO_REVIEW,    // 自动预审
        RULE_CHECK,     // 规则审核
        MANUAL_REVIEW,  // 人工复审
        FINAL_REVIEW    // 终审
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }
    public String getApplicationNo() { return applicationNo; }
    public void setApplicationNo(String applicationNo) { this.applicationNo = applicationNo; }
    public ApprovalStage getStage() { return stage; }
    public void setStage(ApprovalStage stage) { this.stage = stage; }
    public LoanApplication.ApplicationStatus getResult() { return result; }
    public void setResult(LoanApplication.ApplicationStatus result) { this.result = result; }
    public Long getReviewerId() { return reviewerId; }
    public void setReviewerId(Long reviewerId) { this.reviewerId = reviewerId; }
    public String getReviewerName() { return reviewerName; }
    public void setReviewerName(String reviewerName) { this.reviewerName = reviewerName; }
    public String getReviewComment() { return reviewComment; }
    public void setReviewComment(String reviewComment) { this.reviewComment = reviewComment; }
    public Boolean getAutoApproval() { return autoApproval; }
    public void setAutoApproval(Boolean autoApproval) { this.autoApproval = autoApproval; }
    public String getRuleCodes() { return ruleCodes; }
    public void setRuleCodes(String ruleCodes) { this.ruleCodes = ruleCodes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}