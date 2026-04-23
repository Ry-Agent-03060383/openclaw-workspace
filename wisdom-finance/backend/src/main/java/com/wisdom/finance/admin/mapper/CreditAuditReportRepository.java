package com.wisdom.finance.admin.mapper;

import com.wisdom.finance.admin.entity.CreditAuditReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * 征信业务审计报告Repository
 */
@Repository
public interface CreditAuditReportRepository extends JpaRepository<CreditAuditReport, Long> {
    
    /**
     * 根据报告编号查询
     */
    Optional<CreditAuditReport> findByReportNo(String reportNo);
    
    /**
     * 根据审计日期查询
     */
    List<CreditAuditReport> findByAuditDate(LocalDate auditDate);
    
    /**
     * 根据报告类型查询
     */
    List<CreditAuditReport> findByReportType(String reportType);
    
    /**
     * 根据状态查询
     */
    List<CreditAuditReport> findByStatus(String status);
    
    /**
     * 根据审计期间查询
     */
    List<CreditAuditReport> findByAuditPeriodStartBetween(LocalDate start, LocalDate end);
}
