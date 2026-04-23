package com.wisdom.finance.credit.mapper;

import com.wisdom.finance.credit.entity.CreditScoreModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 信用评分模型Repository
 */
@Repository
public interface CreditScoreModelRepository extends JpaRepository<CreditScoreModel, Long> {
    
    /**
     * 根据模型代码查询
     */
    Optional<CreditScoreModel> findByModelCode(String modelCode);
    
    /**
     * 根据状态查询模型
     */
    List<CreditScoreModel> findByStatus(String status);
    
    /**
     * 根据模型类型查询
     */
    List<CreditScoreModel> findByModelType(String modelType);
}
