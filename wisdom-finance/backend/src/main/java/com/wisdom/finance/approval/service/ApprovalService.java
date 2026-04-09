package com.wisdom.approval.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.approval.engine.RuleEngine;
import com.wisdom.approval.entity.ApprovalRecord;
import com.wisdom.approval.entity.ApprovalRule;
import com.wisdom.loan.entity.LoanApplication;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 审批服务 - M5 自动化审批
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ApprovalService {
    
    private final RuleEngine ruleEngine;
    private final ObjectMapper objectMapper;
    
    // 模拟的审批记录仓库（实际项目中应注入 Mapper）
    private final List<ApprovalRecord> approvalRecordStore = new ArrayList<>();
    private final Map<Long, LoanApplication> applicationStore = new HashMap<>();
    
    /**
     * 自动预审 - 根据规则自动审批
     * @param applicationId 申请ID
     * @return 审批记录
     */
    @Transactional
    public ApprovalRecord autoReview(Long applicationId) {
        log.info("开始自动预审，申请ID: {}", applicationId);
        
        // 获取申请信息
        LoanApplication application = getApplication(applicationId);
        if (application == null) {
            throw new RuntimeException("申请不存在: " + applicationId);
        }
        
        // 执行规则引擎
        RuleEngine.RuleResult ruleResult = ruleEngine.execute(application);
        
        // 创建审批记录
        ApprovalRecord record = new ApprovalRecord();
        record.setApplicationId(applicationId);
        record.setApplicationNo(application.getApplicationNo());
        record.setStage(ApprovalRecord.ApprovalStage.AUTO_REVIEW);
        record.setResult(ruleResult.getActionAsStatus());
        record.setAutoApproval(true);
        record.setRuleCodes(String.join(",", ruleResult.getMatchedRules()));
        record.setReviewComment(ruleResult.getMessage());
        record.setCreatedAt(LocalDateTime.now());
        
        // 保存审批记录
        approvalRecordStore.add(record);
        
        // 更新申请状态
        application.setStatus(ruleResult.getActionAsStatus());
        application.setReviewTime(LocalDateTime.now());
        application.setReviewComment(ruleResult.getMessage());
        
        log.info("自动预审完成，申请ID: {}, 结果: {}, 匹配规则: {}", 
                applicationId, record.getResult(), record.getRuleCodes());
        
        return record;
    }
    
    /**
     * 应用审批规则
     * @param applicationId 申请ID
     * @return 规则执行结果
     */
    public RuleEngine.RuleResult applyRules(Long applicationId) {
        log.info("应用审批规则，申请ID: {}", applicationId);
        
        LoanApplication application = getApplication(applicationId);
        if (application == null) {
            throw new RuntimeException("申请不存在: " + applicationId);
        }
        
        return ruleEngine.execute(application);
    }
    
    /**
     * 人工审批
     * @param approvalRecord 审批记录
     * @return 审批后的记录
     */
    @Transactional
    public ApprovalRecord manualReview(ApprovalRecord approvalRecord) {
        log.info("人工审批，申请ID: {}, 审批人ID: {}", 
                approvalRecord.getApplicationId(), approvalRecord.getReviewerId());
        
        // 获取申请信息
        LoanApplication application = getApplication(approvalRecord.getApplicationId());
        if (application == null) {
            throw new RuntimeException("申请不存在: " + approvalRecord.getApplicationId());
        }
        
        // 设置审批信息
        approvalRecord.setStage(ApprovalRecord.ApprovalStage.MANUAL_REVIEW);
        approvalRecord.setAutoApproval(false);
        approvalRecord.setCreatedAt(LocalDateTime.now());
        
        // 保存审批记录
        approvalRecordStore.add(approvalRecord);
        
        // 更新申请状态
        application.setStatus(approvalRecord.getResult());
        application.setReviewTime(LocalDateTime.now());
        application.setReviewerId(approvalRecord.getReviewerId());
        application.setReviewComment(approvalRecord.getReviewComment());
        
        log.info("人工审批完成，申请ID: {}, 结果: {}", 
                approvalRecord.getApplicationId(), approvalRecord.getResult());
        
        return approvalRecord;
    }
    
    /**
     * 获取审批历史
     * @param applicationId 申请ID
     * @return 审批记录列表
     */
    public List<ApprovalRecord> getApprovalHistory(Long applicationId) {
        log.info("查询审批历史，申请ID: {}", applicationId);
        
        List<ApprovalRecord> history = new ArrayList<>();
        for (ApprovalRecord record : approvalRecordStore) {
            if (record.getApplicationId().equals(applicationId)) {
                history.add(record);
            }
        }
        
        // 按审批时间排序
        history.sort((r1, r2) -> r2.getCreatedAt().compareTo(r1.getCreatedAt()));
        
        return history;
    }
    
    /**
     * 获取申请信息
     * 实际项目中应注入 LoanApplicationMapper
     */
    private LoanApplication getApplication(Long applicationId) {
        // 模拟从数据库获取
        return applicationStore.getOrDefault(applicationId, createMockApplication(applicationId));
    }
    
    /**
     * 创建模拟申请数据
     */
    private LoanApplication createMockApplication(Long applicationId) {
        LoanApplication app = new LoanApplication();
        app.setId(applicationId);
        app.setApplicationNo("LA" + String.format("%08d", applicationId));
        app.setLoanAmount(new java.math.BigDecimal("100000"));
        app.setStatus(LoanApplication.ApplicationStatus.SUBMITTED);
        return app;
    }
}