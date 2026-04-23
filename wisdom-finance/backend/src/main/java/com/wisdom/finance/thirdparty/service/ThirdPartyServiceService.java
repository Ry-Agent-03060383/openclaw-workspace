package com.wisdom.finance.thirdparty.service;

import com.wisdom.finance.thirdparty.entity.ServiceOrder;
import com.wisdom.finance.thirdparty.entity.ThirdPartyService;
import com.wisdom.finance.thirdparty.mapper.ServiceOrderRepository;
import com.wisdom.finance.thirdparty.mapper.ThirdPartyServiceRepository;
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
 * 第三方服务 - 财税法等第三方服务商的业务流程
 */
@Service
@RequiredArgsConstructor
public class ThirdPartyServiceService {
    
    private static final Logger log = LoggerFactory.getLogger(ThirdPartyServiceService.class);

    private final ThirdPartyServiceRepository thirdPartyServiceRepository;
    private final ServiceOrderRepository serviceOrderRepository;

    /**
     * 创建第三方服务
     */
    @Transactional
    public ThirdPartyService createService(ThirdPartyService service) {
        log.info("创建第三方服务: {}", service.getServiceName());
        
        service.setServiceCode(generateServiceCode());
        service.setStatus("ACTIVE");
        service.setRating(5);
        service.setReviewCount(0);
        service.setIsRecommended(false);
        
        return thirdPartyServiceRepository.save(service);
    }

    /**
     * 更新第三方服务
     */
    @Transactional
    public ThirdPartyService updateService(Long serviceId, ThirdPartyService service) {
        log.info("更新第三方服务，服务ID: {}", serviceId);
        
        ThirdPartyService existing = thirdPartyServiceRepository.findById(serviceId)
                .orElseThrow(() -> new RuntimeException("服务不存在"));
        
        if (service.getServiceName() != null) existing.setServiceName(service.getServiceName());
        if (service.getServiceType() != null) existing.setServiceType(service.getServiceType());
        if (service.getServiceProvider() != null) existing.setServiceProvider(service.getServiceProvider());
        if (service.getProviderId() != null) existing.setProviderId(service.getProviderId());
        if (service.getDescription() != null) existing.setDescription(service.getDescription());
        if (service.getPrice() != null) existing.setPrice(service.getPrice());
        if (service.getPriceUnit() != null) existing.setPriceUnit(service.getPriceUnit());
        if (service.getDuration() != null) existing.setDuration(service.getDuration());
        if (service.getStatus() != null) existing.setStatus(service.getStatus());
        if (service.getTags() != null) existing.setTags(service.getTags());
        if (service.getMinOrderAmount() != null) existing.setMinOrderAmount(service.getMinOrderAmount());
        if (service.getMaxOrderAmount() != null) existing.setMaxOrderAmount(service.getMaxOrderAmount());
        if (service.getDeliveryTime() != null) existing.setDeliveryTime(service.getDeliveryTime());
        if (service.getSupportContract() != null) existing.setSupportContract(service.getSupportContract());
        if (service.getContactPerson() != null) existing.setContactPerson(service.getContactPerson());
        if (service.getContactPhone() != null) existing.setContactPhone(service.getContactPhone());
        if (service.getRemark() != null) existing.setRemark(service.getRemark());
        
        return thirdPartyServiceRepository.save(existing);
    }

    /**
     * 获取第三方服务
     */
    public ThirdPartyService getService(Long serviceId) {
        return thirdPartyServiceRepository.findById(serviceId).orElse(null);
    }

    /**
     * 获取服务列表
     */
    public List<ThirdPartyService> getServices(String serviceType, String status) {
        if (serviceType != null) {
            return thirdPartyServiceRepository.findByServiceType(serviceType);
        } else if (status != null) {
            return thirdPartyServiceRepository.findByStatus(status);
        } else {
            return thirdPartyServiceRepository.findAll();
        }
    }

    /**
     * 创建服务订单
     */
    @Transactional
    public ServiceOrder createServiceOrder(ServiceOrder order) {
        log.info("创建服务订单");
        
        ThirdPartyService service = thirdPartyServiceRepository.findById(order.getServiceId())
                .orElseThrow(() -> new RuntimeException("服务不存在"));
        
        order.setOrderNo(generateOrderNo());
        order.setOrderAmount(order.getOrderAmount() != null ? order.getOrderAmount() : service.getPrice());
        order.setPaymentStatus("PENDING");
        order.setOrderStatus("PENDING");
        
        return serviceOrderRepository.save(order);
    }

    /**
     * 支付服务订单
     */
    @Transactional
    public ServiceOrder payServiceOrder(Long orderId, String paymentMethod, String transactionId) {
        log.info("支付服务订单，订单ID: {}", orderId);
        
        ServiceOrder order = serviceOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("订单不存在"));
        
        order.setPaymentStatus("PAID");
        order.setOrderStatus("IN_PROGRESS");
        order.setPaymentTime(LocalDateTime.now());
        order.setPaymentMethod(paymentMethod);
        order.setTransactionId(transactionId);
        order.setServiceStartTime(LocalDateTime.now());
        
        return serviceOrderRepository.save(order);
    }

    /**
     * 完成服务订单
     */
    @Transactional
    public ServiceOrder completeServiceOrder(Long orderId, String deliverables) {
        log.info("完成服务订单，订单ID: {}", orderId);
        
        ServiceOrder order = serviceOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("订单不存在"));
        
        order.setOrderStatus("COMPLETED");
        order.setServiceEndTime(LocalDateTime.now());
        order.setDeliverables(deliverables);
        
        return serviceOrderRepository.save(order);
    }

    /**
     * 评价服务订单
     */
    @Transactional
    public ServiceOrder rateServiceOrder(Long orderId, Integer rating, String review) {
        log.info("评价服务订单，订单ID: {}", orderId);
        
        ServiceOrder order = serviceOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("订单不存在"));
        
        order.setRating(rating);
        order.setReview(review);
        
        // 更新服务的评分和评价数量
        ThirdPartyService service = thirdPartyServiceRepository.findById(order.getServiceId())
                .orElse(null);
        if (service != null) {
            int newReviewCount = service.getReviewCount() + 1;
            int newRating = (service.getRating() * service.getReviewCount() + rating) / newReviewCount;
            service.setReviewCount(newReviewCount);
            service.setRating(newRating);
            thirdPartyServiceRepository.save(service);
        }
        
        return serviceOrderRepository.save(order);
    }

    /**
     * 获取服务订单
     */
    public ServiceOrder getServiceOrder(Long orderId) {
        return serviceOrderRepository.findById(orderId).orElse(null);
    }

    /**
     * 获取订单列表
     */
    public List<ServiceOrder> getServiceOrders(Long userId, Long providerId, String orderStatus) {
        if (userId != null) {
            return serviceOrderRepository.findByUserId(userId);
        } else if (providerId != null) {
            return serviceOrderRepository.findByProviderId(providerId);
        } else if (orderStatus != null) {
            return serviceOrderRepository.findByOrderStatus(orderStatus);
        } else {
            return serviceOrderRepository.findAll();
        }
    }

    /**
     * 生成服务代码
     */
    private String generateServiceCode() {
        String timestamp = LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "TPS" + timestamp + uuid;
    }

    /**
     * 生成订单编号
     */
    private String generateOrderNo() {
        String timestamp = LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "SO" + timestamp + uuid;
    }
}
