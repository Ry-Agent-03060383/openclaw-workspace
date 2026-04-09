package com.wisdom.finance.risk.mapper;

import com.wisdom.finance.risk.entity.RiskEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 风险评估Repository - M6 风险评估模块
 */
@Repository
public interface RiskEvaluationRepository extends JpaRepository<RiskEvaluation, Long> {
    
    /**
     * 根据评估编号查询
     */
    RiskEvaluation findByEvaluationNo(String evaluationNo);
    
    /**
     * 根据企业ID查询评估记录
     */
    List<RiskEvaluation> findByCompanyId(Long companyId);
    
    /**
     * 根据贷款申请ID查询评估记录
     */
    List<RiskEvaluation> findByApplicationId(Long applicationId);
    
    /**
     * 查询企业的最新评估记录
     */
    RiskEvaluation findTopByCompanyIdOrderByEvaluateTimeDesc(Long companyId);
    
    /**
     * 查询申请的最新评估记录
     */
    RiskEvaluation findTopByApplicationIdOrderByEvaluateTimeDesc(Long applicationId);
}