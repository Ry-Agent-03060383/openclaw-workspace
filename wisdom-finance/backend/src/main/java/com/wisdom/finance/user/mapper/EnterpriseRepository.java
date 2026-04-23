package com.wisdom.finance.user.mapper;

import com.wisdom.finance.user.entity.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 企业Repository
 */
@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {
    
    /**
     * 根据用户ID查询
     */
    Optional<Enterprise> findByUserId(Long userId);
    
    /**
     * 根据统一社会信用代码查询
     */
    Optional<Enterprise> findByCreditCode(String creditCode);
    
    /**
     * 根据企业名称查询
     */
    List<Enterprise> findByEnterpriseNameContaining(String enterpriseName);
    
    /**
     * 根据行业查询
     */
    List<Enterprise> findByIndustry(String industry);
    
    /**
     * 根据经营状态查询
     */
    List<Enterprise> findByBusinessStatus(String businessStatus);
    
    /**
     * 根据状态查询
     */
    List<Enterprise> findByStatus(String status);
}
