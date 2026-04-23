package com.wisdom.finance.guarantee.mapper;

import com.wisdom.finance.guarantee.entity.GuaranteeApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 担保申请Repository
 */
@Repository
public interface GuaranteeApplicationRepository extends JpaRepository<GuaranteeApplication, Long> {
    
    /**
     * 根据申请编号查询
     */
    Optional<GuaranteeApplication> findByAppNo(String appNo);
    
    /**
     * 根据贷款申请ID查询
     */
    List<GuaranteeApplication> findByLoanApplicationId(Long loanApplicationId);
    
    /**
     * 根据申请人ID查询
     */
    List<GuaranteeApplication> findByApplicantId(Long applicantId);
    
    /**
     * 根据状态查询
     */
    List<GuaranteeApplication> findByStatus(String status);
}
