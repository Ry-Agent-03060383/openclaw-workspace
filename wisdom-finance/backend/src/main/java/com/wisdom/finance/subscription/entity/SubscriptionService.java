package com.wisdom.finance.subscription.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

/**
 * 订阅服务 - 焦作市智慧金服平台的订阅服务
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_subscription_service")
public class SubscriptionService extends BaseEntity {
    
    @Column(name = "service_code", unique = true, length = 50, nullable = false)
    private String serviceCode; // 服务代码
    
    @Column(name = "service_name", length = 200, nullable = false)
    private String serviceName; // 服务名称
    
    @Column(name = "service_type", length = 50)
    private String serviceType; // 服务类型：基础服务/高级服务/定制服务
    
    @Column(name = "target_role", length = 50)
    private String targetRole; // 目标角色：企业/农户/金融机构/政府部门
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 服务描述
    
    @Column(name = "price", precision = 18, scale = 2)
    private BigDecimal price; // 服务价格
    
    @Column(name = "billing_cycle", length = 20)
    private String billingCycle; // 计费周期：月/季/年
    
    @Column(name = "duration")
    private Integer duration; // 服务时长（天）
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/INACTIVE
    
    @Column(name = "feature_list", columnDefinition = "TEXT")
    private String featureList; // 功能列表 JSON
    
    @Column(name = "usage_limit")
    private Integer usageLimit; // 使用次数限制
    
    @Column(name = "concurrent_limit")
    private Integer concurrentLimit; // 并发使用限制
    
    @Column(name = "is_recommended")
    private Boolean isRecommended; // 是否推荐
    
    @Column(name = "sort_order")
    private Integer sortOrder; // 排序顺序
    
    @Column(name = "support_trial")
    private Boolean supportTrial; // 是否支持试用
    
    @Column(name = "trial_days")
    private Integer trialDays; // 试用天数
    
    @Column(name = "support_refund")
    private Boolean supportRefund; // 是否支持退款
    
    @Column(name = "refund_period")
    private Integer refundPeriod; // 退款期限（天）
    
    @Column(name = "technical_support", length = 100)
    private String technicalSupport; // 技术支持方式
    
    @Column(name = "contact_person", length = 50)
    private String contactPerson; // 联系人
    
    @Column(name = "contact_phone", length = 20)
    private String contactPhone; // 联系电话
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注
    
    // 手动添加getter和setter方法，解决Lombok问题
    public String getServiceCode() {
        return serviceCode;
    }
    
    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }
    
    public String getServiceName() {
        return serviceName;
    }
    
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
    
    public String getServiceType() {
        return serviceType;
    }
    
    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }
    
    public String getTargetRole() {
        return targetRole;
    }
    
    public void setTargetRole(String targetRole) {
        this.targetRole = targetRole;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getBillingCycle() {
        return billingCycle;
    }
    
    public void setBillingCycle(String billingCycle) {
        this.billingCycle = billingCycle;
    }
    
    public Integer getDuration() {
        return duration;
    }
    
    public void setDuration(Integer duration) {
        this.duration = duration;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getFeatureList() {
        return featureList;
    }
    
    public void setFeatureList(String featureList) {
        this.featureList = featureList;
    }
    
    public Integer getUsageLimit() {
        return usageLimit;
    }
    
    public void setUsageLimit(Integer usageLimit) {
        this.usageLimit = usageLimit;
    }
    
    public Integer getConcurrentLimit() {
        return concurrentLimit;
    }
    
    public void setConcurrentLimit(Integer concurrentLimit) {
        this.concurrentLimit = concurrentLimit;
    }
    
    public Boolean getIsRecommended() {
        return isRecommended;
    }
    
    public void setIsRecommended(Boolean isRecommended) {
        this.isRecommended = isRecommended;
    }
    
    public Integer getSortOrder() {
        return sortOrder;
    }
    
    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
    
    public Boolean getSupportTrial() {
        return supportTrial;
    }
    
    public void setSupportTrial(Boolean supportTrial) {
        this.supportTrial = supportTrial;
    }
    
    public Integer getTrialDays() {
        return trialDays;
    }
    
    public void setTrialDays(Integer trialDays) {
        this.trialDays = trialDays;
    }
    
    public Boolean getSupportRefund() {
        return supportRefund;
    }
    
    public void setSupportRefund(Boolean supportRefund) {
        this.supportRefund = supportRefund;
    }
    
    public Integer getRefundPeriod() {
        return refundPeriod;
    }
    
    public void setRefundPeriod(Integer refundPeriod) {
        this.refundPeriod = refundPeriod;
    }
    
    public String getTechnicalSupport() {
        return technicalSupport;
    }
    
    public void setTechnicalSupport(String technicalSupport) {
        this.technicalSupport = technicalSupport;
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
