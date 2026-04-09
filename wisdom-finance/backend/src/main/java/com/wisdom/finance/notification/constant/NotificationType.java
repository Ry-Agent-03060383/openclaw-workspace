package com.wisdom.finance.notification.constant;

/**
 * 通知类型常量 - M8 通知中心
 * 
 * 定义系统中的通知类型，用于区分不同业务场景的通知
 */
public enum NotificationType {
    
    /**
     * 贷款申请提交通知
     * 当用户提交贷款申请后发送
     */
    LOAN_APPLICATION_SUBMITTED("贷款申请提交通知", "您已成功提交贷款申请，请等待审批"),
    
    /**
     * 贷款审批进度通知
     * 贷款审批流程中各阶段进度更新
     */
    LOAN_APPROVAL_PROGRESS("贷款审批进度通知", "您的贷款申请已进入审批阶段"),
    
    /**
     * 贷款审批结果通知
     * 贷款审批通过或拒绝
     */
    LOAN_APPROVAL_RESULT("贷款审批结果通知", "您的贷款申请审批已完成"),
    
    /**
     * 风险预警通知
     * 系统检测到潜在风险时发送
     */
    RISK_ALERT("风险预警通知", "检测到异常情况，请及时关注"),
    
    /**
     * 系统通知
     * 系统公告、更新等通用通知
     */
    SYSTEM("系统通知", "系统通知");
    
    private final String title;
    private final String defaultContent;
    
    NotificationType(String title, String defaultContent) {
        this.title = title;
        this.defaultContent = defaultContent;
    }
    
    public String getTitle() {
        return title;
    }
    
    public String getDefaultContent() {
        return defaultContent;
    }
}