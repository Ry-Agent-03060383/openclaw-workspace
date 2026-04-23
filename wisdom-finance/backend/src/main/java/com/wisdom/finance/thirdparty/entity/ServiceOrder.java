package com.wisdom.finance.thirdparty.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 服务订单 - 第三方服务的订单
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_service_order")
public class ServiceOrder extends BaseEntity {
    
    @Column(name = "order_no", unique = true, length = 32, nullable = false)
    private String orderNo; // 订单编号
    
    @Column(name = "service_id")
    private Long serviceId; // 服务ID
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", insertable = false, updatable = false)
    private ThirdPartyService service;
    
    @Column(name = "user_id")
    private Long userId; // 用户ID
    
    @Column(name = "provider_id")
    private Long providerId; // 提供商ID
    
    @Column(name = "order_amount", precision = 18, scale = 2, nullable = false)
    private BigDecimal orderAmount; // 订单金额
    
    @Column(name = "payment_status", length = 20)
    private String paymentStatus; // 支付状态：PENDING/PAID/REFUNDED
    
    @Column(name = "order_status", length = 20)
    private String orderStatus; // 订单状态：PENDING/IN_PROGRESS/COMPLETED/CANCELLED
    
    @Column(name = "payment_time")
    private LocalDateTime paymentTime; // 支付时间
    
    @Column(name = "service_start_time")
    private LocalDateTime serviceStartTime; // 服务开始时间
    
    @Column(name = "service_end_time")
    private LocalDateTime serviceEndTime; // 服务结束时间
    
    @Column(name = "service_content", columnDefinition = "TEXT")
    private String serviceContent; // 服务内容
    
    @Column(name = "requirements", columnDefinition = "TEXT")
    private String requirements; // 客户需求
    
    @Column(name = "deliverables", columnDefinition = "TEXT")
    private String deliverables; // 交付物
    
    @Column(name = "rating")
    private Integer rating; // 评分
    
    @Column(name = "review", columnDefinition = "TEXT")
    private String review; // 评价
    
    @Column(name = "payment_method", length = 50)
    private String paymentMethod; // 支付方式
    
    @Column(name = "transaction_id", length = 100)
    private String transactionId; // 交易ID
    
    @Column(name = "contact_person", length = 50)
    private String contactPerson; // 联系人
    
    @Column(name = "contact_phone", length = 20)
    private String contactPhone; // 联系电话
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注
    
    // 手动添加getter和setter方法，解决Lombok问题
    public String getOrderNo() {
        return orderNo;
    }
    
    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }
    
    public Long getServiceId() {
        return serviceId;
    }
    
    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
    
    public ThirdPartyService getService() {
        return service;
    }
    
    public void setService(ThirdPartyService service) {
        this.service = service;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public Long getProviderId() {
        return providerId;
    }
    
    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }
    
    public BigDecimal getOrderAmount() {
        return orderAmount;
    }
    
    public void setOrderAmount(BigDecimal orderAmount) {
        this.orderAmount = orderAmount;
    }
    
    public String getPaymentStatus() {
        return paymentStatus;
    }
    
    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
    
    public String getOrderStatus() {
        return orderStatus;
    }
    
    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }
    
    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }
    
    public void setPaymentTime(LocalDateTime paymentTime) {
        this.paymentTime = paymentTime;
    }
    
    public LocalDateTime getServiceStartTime() {
        return serviceStartTime;
    }
    
    public void setServiceStartTime(LocalDateTime serviceStartTime) {
        this.serviceStartTime = serviceStartTime;
    }
    
    public LocalDateTime getServiceEndTime() {
        return serviceEndTime;
    }
    
    public void setServiceEndTime(LocalDateTime serviceEndTime) {
        this.serviceEndTime = serviceEndTime;
    }
    
    public String getServiceContent() {
        return serviceContent;
    }
    
    public void setServiceContent(String serviceContent) {
        this.serviceContent = serviceContent;
    }
    
    public String getRequirements() {
        return requirements;
    }
    
    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }
    
    public String getDeliverables() {
        return deliverables;
    }
    
    public void setDeliverables(String deliverables) {
        this.deliverables = deliverables;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public String getReview() {
        return review;
    }
    
    public void setReview(String review) {
        this.review = review;
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
    
    public String getContactPerson() {
        return contactPerson;
    }
    
    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }
    
    public String getContactPhone() {
        return contactPhone;
    }
    
    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }
    
    public String getRemark() {
        return remark;
    }
    
    public void setRemark(String remark) {
        this.remark = remark;
    }
}
