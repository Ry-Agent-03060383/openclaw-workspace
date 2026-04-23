package com.wisdom.finance.subscription.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订阅 - 用户订阅记录
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_subscription")
public class Subscription extends BaseEntity {
    
    @Column(name = "subscription_no", unique = true, length = 32, nullable = false)
    private String subscriptionNo; // 订阅编号
    
    @Column(name = "service_id")
    private Long serviceId; // 服务ID
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", insertable = false, updatable = false)
    private SubscriptionService service;
    
    @Column(name = "user_id")
    private Long userId; // 用户ID
    
    @Column(name = "user_type", length = 50)
    private String userType; // 用户类型
    
    @Column(name = "start_time")
    private LocalDateTime startTime; // 开始时间
    
    @Column(name = "end_time")
    private LocalDateTime endTime; // 结束时间
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/EXPIRED/CANCELLED
    
    @Column(name = "payment_status", length = 20)
    private String paymentStatus; // 支付状态：PENDING/PAID/REFUNDED
    
    @Column(name = "amount", precision = 18, scale = 2)
    private BigDecimal amount; // 订阅金额
    
    @Column(name = "payment_method", length = 50)
    private String paymentMethod; // 支付方式
    
    @Column(name = "transaction_id", length = 100)
    private String transactionId; // 交易ID
    
    @Column(name = "auto_renew")
    private Boolean autoRenew; // 是否自动续费
    
    @Column(name = "usage_count")
    private Integer usageCount; // 已使用次数
    
    @Column(name = "remaining_count")
    private Integer remainingCount; // 剩余次数
    
    @Column(name = "trial_period")
    private Boolean trialPeriod; // 是否试用
    
    @Column(name = "trial_end_time")
    private LocalDateTime trialEndTime; // 试用结束时间
    
    @Column(name = "cancel_reason", length = 500)
    private String cancelReason; // 取消原因
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注
    
    // 手动添加getter和setter方法，解决Lombok问题
    public String getSubscriptionNo() {
        return subscriptionNo;
    }
    
    public void setSubscriptionNo(String subscriptionNo) {
        this.subscriptionNo = subscriptionNo;
    }
    
    public Long getServiceId() {
        return serviceId;
    }
    
    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
    
    public SubscriptionService getService() {
        return service;
    }
    
    public void setService(SubscriptionService service) {
        this.service = service;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getUserType() {
        return userType;
    }
    
    public void setUserType(String userType) {
        this.userType = userType;
    }
    
    public LocalDateTime getStartTime() {
        return startTime;
    }
    
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
    
    public LocalDateTime getEndTime() {
        return endTime;
    }
    
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getPaymentStatus() {
        return paymentStatus;
    }
    
    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public String getPaymentMethod() {
        return paymentMethod;
    }
    
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
    
    public String getTransactionId() {
        return transactionId;
    }
    
    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
    
    public Boolean getAutoRenew() {
        return autoRenew;
    }
    
    public void setAutoRenew(Boolean autoRenew) {
        this.autoRenew = autoRenew;
    }
    
    public Integer getUsageCount() {
        return usageCount;
    }
    
    public void setUsageCount(Integer usageCount) {
        this.usageCount = usageCount;
    }
    
    public Integer getRemainingCount() {
        return remainingCount;
    }
    
    public void setRemainingCount(Integer remainingCount) {
        this.remainingCount = remainingCount;
    }
    
    public Boolean getTrialPeriod() {
        return trialPeriod;
    }
    
    public void setTrialPeriod(Boolean trialPeriod) {
        this.trialPeriod = trialPeriod;
    }
    
    public LocalDateTime getTrialEndTime() {
        return trialEndTime;
    }
    
    public void setTrialEndTime(LocalDateTime trialEndTime) {
        this.trialEndTime = trialEndTime;
    }
    
    public String getCancelReason() {
        return cancelReason;
    }
    
    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }
    
    public String getRemark() {
        return remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }
}
