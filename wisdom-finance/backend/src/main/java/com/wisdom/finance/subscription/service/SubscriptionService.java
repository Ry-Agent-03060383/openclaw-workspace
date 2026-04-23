package com.wisdom.finance.subscription.service;

import com.wisdom.finance.subscription.entity.Subscription;
import com.wisdom.finance.subscription.entity.SubscriptionService;
import com.wisdom.finance.subscription.mapper.SubscriptionRepository;
import com.wisdom.finance.subscription.mapper.SubscriptionServiceRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * 订阅服务 - 焦作市智慧金服平台的订阅服务
 */
@Service
@RequiredArgsConstructor
public class SubscriptionService {
    
    private static final Logger log = LoggerFactory.getLogger(SubscriptionService.class);

    private final SubscriptionServiceRepository subscriptionServiceRepository;
    private final SubscriptionRepository subscriptionRepository;

    /**
     * 创建订阅服务
     */
    @Transactional
    public SubscriptionService createSubscriptionService(SubscriptionService service) {
        log.info("创建订阅服务: {}", service.getServiceName());
        
        service.setServiceCode(generateServiceCode());
        service.setStatus("ACTIVE");
        service.setIsRecommended(false);
        service.setSortOrder(0);
        service.setSupportTrial(false);
        service.setTrialDays(0);
        service.setSupportRefund(false);
        service.setRefundPeriod(0);
        
        return subscriptionServiceRepository.save(service);
    }

    /**
     * 更新订阅服务
     */
    @Transactional
    public SubscriptionService updateSubscriptionService(Long serviceId, SubscriptionService service) {
        log.info("更新订阅服务，服务ID: {}", serviceId);
        
        SubscriptionService existing = subscriptionServiceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("服务不存在"));
        
        if (service.getServiceName() != null) existing.setServiceName(service.getServiceName());
        if (service.getServiceType() != null) existing.setServiceType(service.getServiceType());
        if (service.getTargetRole() != null) existing.setTargetRole(service.getTargetRole());
        if (service.getDescription() != null) existing.setDescription(service.getDescription());
        if (service.getPrice() != null) existing.setPrice(service.getPrice());
        if (service.getBillingCycle() != null) existing.setBillingCycle(service.getBillingCycle());
        if (service.getDuration() != null) existing.setDuration(service.getDuration());
        if (service.getStatus() != null) existing.setStatus(service.getStatus());
        if (service.getFeatureList() != null) existing.setFeatureList(service.getFeatureList());
        if (service.getUsageLimit() != null) existing.setUsageLimit(service.getUsageLimit());
        if (service.getConcurrentLimit() != null) existing.setConcurrentLimit(service.getConcurrentLimit());
        if (service.getIsRecommended() != null) existing.setIsRecommended(service.getIsRecommended());
        if (service.getSortOrder() != null) existing.setSortOrder(service.getSortOrder());
        if (service.getSupportTrial() != null) existing.setSupportTrial(service.getSupportTrial());
        if (service.getTrialDays() != null) existing.setTrialDays(service.getTrialDays());
        if (service.getSupportRefund() != null) existing.setSupportRefund(service.getSupportRefund());
        if (service.getRefundPeriod() != null) existing.setRefundPeriod(service.getRefundPeriod());
        if (service.getTechnicalSupport() != null) existing.setTechnicalSupport(service.getTechnicalSupport());
        if (service.getContactPerson() != null) existing.setContactPerson(service.getContactPerson());
        if (service.getContactPhone() != null) existing.setContactPhone(service.getContactPhone());
        if (service.getRemark() != null) existing.setRemark(service.getRemark());
        
        return subscriptionServiceRepository.save(existing);
    }

    /**
     * 获取订阅服务
     */
    public SubscriptionService getSubscriptionService(Long serviceId) {
        return subscriptionServiceRepository.findById(serviceId).orElse(null);
    }

    /**
     * 获取订阅服务列表
     */
    public List<SubscriptionService> getSubscriptionServices(String serviceType, String targetRole, String status) {
        if (serviceType != null) {
            return subscriptionServiceRepository.findByServiceType(serviceType);
        } else if (targetRole != null) {
            return subscriptionServiceRepository.findByTargetRole(targetRole);
        } else if (status != null) {
            return subscriptionServiceRepository.findByStatus(status);
        } else {
            return subscriptionServiceRepository.findAll();
        }
    }

    /**
     * 创建订阅
     */
    @Transactional
    public Subscription createSubscription(Subscription subscription) {
        log.info("创建订阅");
        
        SubscriptionService service = subscriptionServiceRepository.findById(subscription.getServiceId())
                .orElseThrow(() -> new RuntimeException("服务不存在"));
        
        // 检查是否已存在活跃订阅
        Subscription existing = subscriptionRepository.findByUserIdAndServiceId(subscription.getUserId(), subscription.getServiceId())
                .orElse(null);
        if (existing != null && "ACTIVE".equals(existing.getStatus())) {
            throw new RuntimeException("已存在该服务的活跃订阅");
        }
        
        subscription.setSubscriptionNo(generateSubscriptionNo());
        subscription.setAmount(subscription.getAmount() != null ? subscription.getAmount() : service.getPrice());
        subscription.setStartTime(LocalDateTime.now());
        subscription.setEndTime(LocalDateTime.now().plusDays(service.getDuration()));
        subscription.setStatus("ACTIVE");
        subscription.setPaymentStatus("PENDING");
        subscription.setAutoRenew(false);
        subscription.setUsageCount(0);
        subscription.setRemainingCount(service.getUsageLimit());
        subscription.setTrialPeriod(false);
        
        return subscriptionRepository.save(subscription);
    }

    /**
     * 支付订阅
     */
    @Transactional
    public Subscription paySubscription(Long subscriptionId, String paymentMethod, String transactionId) {
        log.info("支付订阅，订阅ID: {}", subscriptionId);
        
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("订阅不存在"));
        
        subscription.setPaymentStatus("PAID");
        subscription.setPaymentMethod(paymentMethod);
        subscription.setTransactionId(transactionId);
        
        return subscriptionRepository.save(subscription);
    }

    /**
     * 取消订阅
     */
    @Transactional
    public Subscription cancelSubscription(Long subscriptionId, String cancelReason) {
        log.info("取消订阅，订阅ID: {}", subscriptionId);
        
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("订阅不存在"));
        
        subscription.setStatus("CANCELLED");
        subscription.setCancelReason(cancelReason);
        
        return subscriptionRepository.save(subscription);
    }

    /**
     * 续费订阅
     */
    @Transactional
    public Subscription renewSubscription(Long subscriptionId) {
        log.info("续费订阅，订阅ID: {}", subscriptionId);
        
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("订阅不存在"));
        
        SubscriptionService service = subscriptionServiceRepository.findById(subscription.getServiceId())
                .orElseThrow(() -> new RuntimeException("服务不存在"));
        
        subscription.setEndTime(subscription.getEndTime().plusDays(service.getDuration()));
        subscription.setStatus("ACTIVE");
        subscription.setPaymentStatus("PENDING");
        
        return subscriptionRepository.save(subscription);
    }

    /**
     * 获取订阅
     */
    public Subscription getSubscription(Long subscriptionId) {
        return subscriptionRepository.findById(subscriptionId).orElse(null);
    }

    /**
     * 获取用户的订阅列表
     */
    public List<Subscription> getUserSubscriptions(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }

    /**
     * 检查订阅是否有效
     */
    public boolean isSubscriptionValid(Long userId, Long serviceId) {
        Subscription subscription = subscriptionRepository.findByUserIdAndServiceId(userId, serviceId)
                .orElse(null);
        
        if (subscription == null) {
            return false;
        }
        
        return "ACTIVE".equals(subscription.getStatus()) && 
               subscription.getEndTime().isAfter(LocalDateTime.now());
    }

    /**
     * 生成服务代码
     */
    private String generateServiceCode() {
        String timestamp = LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "SS" + timestamp + uuid;
    }

    /**
     * 生成订阅编号
     */
    private String generateSubscriptionNo() {
        String timestamp = LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "SUB" + timestamp + uuid;
    }
}
