package com.wisdom.finance.subscription.mapper;

import com.wisdom.finance.subscription.entity.SubscriptionService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 订阅服务Repository
 */
@Repository
public interface SubscriptionServiceRepository extends JpaRepository<SubscriptionService, Long> {
    
    /**
     * 根据服务代码查询
     */
    Optional<SubscriptionService> findByServiceCode(String serviceCode);
    
    /**
     * 根据服务类型查询
     */
    List<SubscriptionService> findByServiceType(String serviceType);
    
    /**
     * 根据目标角色查询
     */
    List<SubscriptionService> findByTargetRole(String targetRole);
    
    /**
     * 根据状态查询
     */
    List<SubscriptionService> findByStatus(String status);
    
    /**
     * 根据是否推荐查询
     */
    List<SubscriptionService> findByIsRecommended(Boolean isRecommended);
}
