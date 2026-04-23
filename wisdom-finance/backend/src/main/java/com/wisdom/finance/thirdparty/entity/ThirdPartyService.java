package com.wisdom.finance.thirdparty.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

/**
 * 第三方服务 - 财税法等第三方服务商的服务
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_third_party_service")
public class ThirdPartyService extends BaseEntity {
    
    @Column(name = "service_code", unique = true, length = 50, nullable = false)
    private String serviceCode; // 服务代码
    
    @Column(name = "service_name", length = 200, nullable = false)
    private String serviceName; // 服务名称
    
    @Column(name = "service_type", length = 50)
    private String serviceType; // 服务类型：财务/税务/法律/咨询
    
    @Column(name = "service_provider", length = 200)
    private String serviceProvider; // 服务提供商
    
    @Column(name = "provider_id")
    private Long providerId; // 提供商ID
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 服务描述
    
    @Column(name = "price", precision = 18, scale = 2)
    private BigDecimal price; // 服务价格
    
    @Column(name = "price_unit", length = 20)
    private String priceUnit; // 价格单位：次/月/年
    
    @Column(name = "duration")
    private Integer duration; // 服务时长（天）
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/INACTIVE
    
    @Column(name = "rating")
    private Integer rating; // 服务评分
    
    @Column(name = "review_count")
    private Integer reviewCount; // 评价数量
    
    @Column(name = "is_recommended")
    private Boolean isRecommended; // 是否推荐
    
    @Column(name = "tags", length = 500)
    private String tags; // 标签
    
    @Column(name = "min_order_amount", precision = 18, scale = 2)
    private BigDecimal minOrderAmount; // 最小订单金额
    
    @Column(name = "max_order_amount", precision = 18, scale = 2)
    private BigDecimal maxOrderAmount; // 最大订单金额
    
    @Column(name = "delivery_time", length = 100)
    private String deliveryTime; // 交付时间
    
    @Column(name = "support_contract")
    private Boolean supportContract; // 是否支持合同
    
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
    
    public String getServiceProvider() {
        return serviceProvider;
    }
    
    public void setServiceProvider(String serviceProvider) {
        this.serviceProvider = serviceProvider;
    }
    
    public Long getProviderId() {
        return providerId;
    }
    
    public void setProviderId(Long providerId) {
        this.providerId = providerId;
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
    
    public String getPriceUnit() {
        return priceUnit;
    }
    
    public void setPriceUnit(String priceUnit) {
        this.priceUnit = priceUnit;
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
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public Integer getReviewCount() {
        return reviewCount;
    }
    
    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }
    
    public Boolean getIsRecommended() {
        return isRecommended;
    }
    
    public void setIsRecommended(Boolean isRecommended) {
        this.isRecommended = isRecommended;
    }
    
    public String getTags() {
        return tags;
    }
    
    public void setTags(String tags) {
        this.tags = tags;
    }
    
    public BigDecimal getMinOrderAmount() {
        return minOrderAmount;
    }
    
    public void setMinOrderAmount(BigDecimal minOrderAmount) {
        this.minOrderAmount = minOrderAmount;
    }
    
    public BigDecimal getMaxOrderAmount() {
        return maxOrderAmount;
    }
    
    public void setMaxOrderAmount(BigDecimal maxOrderAmount) {
        this.maxOrderAmount = maxOrderAmount;
    }
    
    public String getDeliveryTime() {
        return deliveryTime;
    }
    
    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
    
    public Boolean getSupportContract() {
        return supportContract;
    }
    
    public void setSupportContract(Boolean supportContract) {
        this.supportContract = supportContract;
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
