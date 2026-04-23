package com.wisdom.finance.guarantee.mapper;

import com.wisdom.finance.guarantee.entity.Guarantee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 担保Repository
 */
@Repository
public interface GuaranteeRepository extends JpaRepository<Guarantee, Long> {
    
    /**
     * 根据担保编号查询
     */
    Optional<Guarantee> findByGuaranteeNo(String guaranteeNo);
    
    /**
     * 根据贷款申请ID查询
     */
    List<Guarantee> findByApplicationId(Long applicationId);
    
    /**
     * 根据担保人ID查询
     */
    List<Guarantee> findByGuarantorId(Long guarantorId);
    
    /**
     * 根据状态查询
     */
    List<Guarantee> findByStatus(String status);
}
