package com.wisdom.finance.admin.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;

/**
 * 运营操作日志 - 平台运营方操作记录
 */
@Entity
@Table(name = "t_admin_operation_log")
public class AdminOperationLog extends BaseEntity {
    
    @Column(name = "operator_id")
    private Long operatorId; // 操作人ID
    
    @Column(name = "operator_name", length = 50)
    private String operatorName; // 操作人姓名
    
    @Column(name = "operation_type", length = 50)
    private String operationType; // 操作类型：用户管理/贷款审批/系统配置等
    
    @Column(name = "operation_desc", length = 200)
    private String operationDesc; // 操作描述
    
    @Column(name = "target_type", length = 50)
    private String targetType; // 操作对象类型
    
    @Column(name = "target_id")
    private Long targetId; // 操作对象ID
    
    @Column(name = "target_name", length = 200)
    private String targetName; // 操作对象名称
    
    @Column(name = "before_data", columnDefinition = "TEXT")
    private String beforeData; // 操作前数据
    
    @Column(name = "after_data", columnDefinition = "TEXT")
    private String afterData; // 操作后数据
    
    @Column(name = "ip_address", length = 50)
    private String ipAddress; // 操作IP地址
    
    @Column(name = "user_agent", length = 500)
    private String userAgent; // 用户代理
    
    @Column(name = "status", length = 20)
    private String status; // 操作状态：SUCCESS/FAILED
    
    @Column(name = "error_message", length = 500)
    private String errorMessage; // 错误信息

    // Getters and Setters
    public Long getOperatorId() { return operatorId; }
    public void setOperatorId(Long operatorId) { this.operatorId = operatorId; }
    public String getOperatorName() { return operatorName; }
    public void setOperatorName(String operatorName) { this.operatorName = operatorName; }
    public String getOperationType() { return operationType; }
    public void setOperationType(String operationType) { this.operationType = operationType; }
    public String getOperationDesc() { return operationDesc; }
    public void setOperationDesc(String operationDesc) { this.operationDesc = operationDesc; }
    public String getTargetType() { return targetType; }
    public void setTargetType(String targetType) { this.targetType = targetType; }
    public Long getTargetId() { return targetId; }
    public void setTargetId(Long targetId) { this.targetId = targetId; }
    public String getTargetName() { return targetName; }
    public void setTargetName(String targetName) { this.targetName = targetName; }
    public String getBeforeData() { return beforeData; }
    public void setBeforeData(String beforeData) { this.beforeData = beforeData; }
    public String getAfterData() { return afterData; }
    public void setAfterData(String afterData) { this.afterData = afterData; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
}
