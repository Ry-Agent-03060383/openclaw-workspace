package com.wisdom.finance.bank.mapper;

import com.wisdom.finance.bank.entity.BankApiLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 银行API日志Repository
 */
@Repository
public interface BankApiLogRepository extends JpaRepository<BankApiLog, Long> {
    
    /**
     * 根据银行ID查询日志
     */
    List<BankApiLog> findByBankId(Long bankId);
    
    /**
     * 根据状态查询日志
     */
    List<BankApiLog> findByStatus(String status);
    
    /**
     * 根据API类型查询日志
     */
    List<BankApiLog> findByApiType(String apiType);
    
    /**
     * 根据关联业务ID和类型查询日志
     */
    List<BankApiLog> findByRelatedIdAndRelatedType(Long relatedId, String relatedType);
}
