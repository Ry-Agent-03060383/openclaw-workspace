package com.wisdom.finance.subscription.mapper;

import com.wisdom.finance.subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 订阅Repository
 */
@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    
    /**
     * 根据订阅编号查询
     */
    Optional<Subscription> findBySubscriptionNo(String subscriptionNo);
    
    /**
     * 根据用户ID查询
     */
    List<Subscription> findByUserId(Long userId);
    
    /**
     * 根据服务ID查询
     */
    List<Subscription> findByServiceId(Long serviceId);
    
    /**
     * 根据状态查询
     */
    List<Subscription> findByStatus(String status);
    
    /**
     * 根据支付状态查询
     */
    List<Subscription> findByPaymentStatus(String paymentStatus);
    
    /**
     * 根据用户ID和服务ID查询
     */
    Optional<Subscription> findByUserIdAndServiceId(Long userId, Long serviceId);
}
