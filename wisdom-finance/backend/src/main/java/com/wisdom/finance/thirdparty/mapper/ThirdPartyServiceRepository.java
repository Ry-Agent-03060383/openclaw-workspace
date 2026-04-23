package com.wisdom.finance.thirdparty.mapper;

import com.wisdom.finance.thirdparty.entity.ThirdPartyService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 第三方服务Repository
 */
@Repository
public interface ThirdPartyServiceRepository extends JpaRepository<ThirdPartyService, Long> {
    
    /**
     * 根据服务代码查询
     */
    Optional<ThirdPartyService> findByServiceCode(String serviceCode);
    
    /**
     * 根据服务类型查询
     */
    List<ThirdPartyService> findByServiceType(String serviceType);
    
    /**
     * 根据服务提供商查询
     */
    List<ThirdPartyService> findByServiceProvider(String serviceProvider);
    
    /**
     * 根据状态查询
     */
    List<ThirdPartyService> findByStatus(String status);
    
    /**
     * 根据是否推荐查询
     */
    List<ThirdPartyService> findByIsRecommended(Boolean isRecommended);
}
