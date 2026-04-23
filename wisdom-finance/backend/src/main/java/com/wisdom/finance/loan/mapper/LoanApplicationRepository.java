package com.wisdom.finance.loan.mapper;

import com.wisdom.finance.loan.entity.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 贷款申请Repository
 */
@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    
    /**
     * 根据申请单号查询
     */
    Optional<LoanApplication> findByApplicationNo(String applicationNo);
    
    /**
     * 根据企业ID查询申请记录
     */
    List<LoanApplication> findByCompanyId(Long companyId);
    
    /**
     * 根据用户ID查询申请记录
     */
    List<LoanApplication> findByUserId(Long userId);
}