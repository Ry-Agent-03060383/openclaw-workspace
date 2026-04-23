package com.wisdom.finance.admin.mapper;

import com.wisdom.finance.admin.entity.SystemConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 系统配置Repository
 */
@Repository
public interface SystemConfigRepository extends JpaRepository<SystemConfig, Long> {
    
    /**
     * 根据配置键查询
     */
    Optional<SystemConfig> findByConfigKey(String configKey);
    
    /**
     * 根据配置类型查询
     */
    List<SystemConfig> findByConfigType(String configType);
    
    /**
     * 根据状态查询
     */
    List<SystemConfig> findByStatus(String status);
}
