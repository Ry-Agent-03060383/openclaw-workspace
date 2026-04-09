package com.wisdom.approval.controller;

import com.wisdom.approval.entity.ApprovalRecord;
import com.wisdom.approval.engine.RuleEngine;
import com.wisdom.approval.service.ApprovalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 审批控制器 - M5 自动化审批
 */
@Slf4j
@RestController
@RequestMapping("/api/approval")
@RequiredArgsConstructor
public class ApprovalController {
    
    private final ApprovalService approvalService;
    private final RuleEngine ruleEngine;
    
    /**
     * 审批申请
     * POST /api/approval/{applicationId}/review
     */
    @PostMapping("/{applicationId}/review")
    public ResponseEntity<Map<String, Object>> review(
            @PathVariable Long applicationId,
            @RequestBody ApprovalRequest request) {
        
        log.info("收到审批请求，申请ID: {}, 审批人ID: {}", applicationId, request.getReviewerId());
        
        ApprovalRecord record;
        
        // 判断是否自动审批
        if (Boolean.TRUE.equals(request.getAutoReview())) {
            record = approvalService.autoReview(applicationId);
        } else {
            // 人工审批
            record = new ApprovalRecord();
            record.setApplicationId(applicationId);
            record.setReviewerId(request.getReviewerId());
            record.setReviewerName(request.getReviewerName());
            record.setResult(request.getResultAsStatus());
            record.setReviewComment(request.getComment());
            record = approvalService.manualReview(record);
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "审批完成");
        response.put("data", buildRecordResponse(record));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 获取审批历史
     * GET /api/approval/{applicationId}/history
     */
    @GetMapping("/{applicationId}/history")
    public ResponseEntity<Map<String, Object>> getHistory(@PathVariable Long applicationId) {
        
        log.info("查询审批历史，申请ID: {}", applicationId);
        
        List<ApprovalRecord> history = approvalService.getApprovalHistory(applicationId);
        
        List<Map<String, Object>> records = history.stream()
                .map(this::buildRecordResponse)
                .toList();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", records);
        response.put("total", records.size());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 主动触发规则检查
     * POST /api/approval/{applicationId}/rules
     */
    @PostMapping("/{applicationId}/rules")
    public ResponseEntity<Map<String, Object>> applyRules(@PathVariable Long applicationId) {
        
        log.info("应用审批规则，申请ID: {}", applicationId);
        
        RuleEngine.RuleResult result = approvalService.applyRules(applicationId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", Map.of(
                "action", result.getAction(),
                "message", result.getMessage(),
                "matchedRules", result.getMatchedRules()
        ));
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 构建审批记录响应
     */
    private Map<String, Object> buildRecordResponse(ApprovalRecord record) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", record.getId());
        map.put("applicationId", record.getApplicationId());
        map.put("applicationNo", record.getApplicationNo());
        map.put("stage", record.getStage());
        map.put("result", record.getResult());
        map.put("reviewerId", record.getReviewerId());
        map.put("reviewerName", record.getReviewerName());
        map.put("reviewComment", record.getReviewComment());
        map.put("autoApproval", record.getAutoApproval());
        map.put("ruleCodes", record.getRuleCodes());
        map.put("createdAt", record.getCreatedAt());
        return map;
    }
    
    /**
     * 审批请求DTO
     */
    @Validated
    public static class ApprovalRequest {
        private Long reviewerId;
        private String reviewerName;
        private String result;
        private String comment;
        private Boolean autoReview = false;
        
        public Long getReviewerId() { return reviewerId; }
        public void setReviewerId(Long reviewerId) { this.reviewerId = reviewerId; }
        
        public String getReviewerName() { return reviewerName; }
        public void setReviewerName(String reviewerName) { this.reviewerName = reviewerName; }
        
        public String getResult() { return result; }
        public void setResult(String result) { this.result = result; }
        
        public com.wisdom.loan.entity.LoanApplication.ApplicationStatus getResultAsStatus() {
            try {
                return com.wisdom.loan.entity.LoanApplication.ApplicationStatus.valueOf(result);
            } catch (Exception e) {
                return null;
            }
        }
        
        public String getComment() { return comment; }
        public void setComment(String comment) { this.comment = comment; }
        
        public Boolean getAutoReview() { return autoReview; }
        public void setAutoReview(Boolean autoReview) { this.autoReview = autoReview; }
    }
}