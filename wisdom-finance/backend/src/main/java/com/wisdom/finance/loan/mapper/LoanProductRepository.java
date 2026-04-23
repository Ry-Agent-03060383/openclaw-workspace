package com.wisdom.finance.loan.mapper;

import com.wisdom.finance.loan.entity.LoanProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 贷款产品Repository
 */
@Repository
public interface LoanProductRepository extends JpaRepository<LoanProduct, Long> {
    
    /**
     * 根据产品编码查询
     */
    Optional<LoanProduct> findByProductCode(String productCode);
    
    /**
     * 根据状态查询
     */
    List<LoanProduct> findByStatus(String status);
    
    /**
     * 根据产品类型查询
     */
    List<LoanProduct> findByProductType(String productType);
}
