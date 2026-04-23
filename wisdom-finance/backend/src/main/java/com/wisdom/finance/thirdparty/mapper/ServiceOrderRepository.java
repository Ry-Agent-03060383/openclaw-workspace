package com.wisdom.finance.thirdparty.mapper;

import com.wisdom.finance.thirdparty.entity.ServiceOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 服务订单Repository
 */
@Repository
public interface ServiceOrderRepository extends JpaRepository<ServiceOrder, Long> {
    
    /**
     * 根据订单编号查询
     */
    Optional<ServiceOrder> findByOrderNo(String orderNo);
    
    /**
     * 根据用户ID查询
     */
    List<ServiceOrder> findByUserId(Long userId);
    
    /**
     * 根据服务ID查询
     */
    List<ServiceOrder> findByServiceId(Long serviceId);
    
    /**
     * 根据提供商ID查询
     */
    List<ServiceOrder> findByProviderId(Long providerId);
    
    /**
     * 根据订单状态查询
     */
    List<ServiceOrder> findByOrderStatus(String orderStatus);
    
    /**
     * 根据支付状态查询
     */
    List<ServiceOrder> findByPaymentStatus(String paymentStatus);
}
