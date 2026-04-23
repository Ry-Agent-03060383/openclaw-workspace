package com.wisdom.finance.admin.mapper;

import com.wisdom.finance.admin.entity.AdminOperationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 运营操作日志Repository
 */
@Repository
public interface AdminOperationLogRepository extends JpaRepository<AdminOperationLog, Long> {
    
    /**
     * 根据操作人ID查询日志
     */
    List<AdminOperationLog> findByOperatorId(Long operatorId);
    
    /**
     * 根据操作类型查询日志
     */
    List<AdminOperationLog> findByOperationType(String operationType);
    
    /**
     * 根据操作对象类型查询日志
     */
    List<AdminOperationLog> findByTargetType(String targetType);
    
    /**
     * 根据状态查询日志
     */
    List<AdminOperationLog> findByStatus(String status);
}
