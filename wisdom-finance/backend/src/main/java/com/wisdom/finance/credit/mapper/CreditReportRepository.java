package com.wisdom.finance.credit.mapper;

import com.wisdom.finance.credit.entity.CreditReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 信用报告Repository
 */
@Repository
public interface CreditReportRepository extends JpaRepository<CreditReport, Long> {
    
    /**
     * 根据报告编号查询
     */
    Optional<CreditReport> findByReportNo(String reportNo);
    
    /**
     * 根据企业ID查询报告
     */
    List<CreditReport> findByCompanyId(Long companyId);
    
    /**
     * 根据企业信用代码查询报告
     */
    List<CreditReport> findByCreditCode(String creditCode);
    
    /**
     * 根据状态查询报告
     */
    List<CreditReport> findByStatus(String status);
    
    /**
     * 根据报告类型查询
     */
    List<CreditReport> findByReportType(String reportType);
}
