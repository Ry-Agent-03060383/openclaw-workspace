package com.wisdom.finance.bank.mapper;

import com.wisdom.finance.bank.entity.BankProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 银行产品Repository
 */
@Repository
public interface BankProductRepository extends JpaRepository<BankProduct, Long> {
    
    /**
     * 根据产品代码查询
     */
    Optional<BankProduct> findByProductCode(String productCode);
    
    /**
     * 根据银行ID查询产品
     */
    List<BankProduct> findByBankId(Long bankId);
    
    /**
     * 根据状态查询
     */
    List<BankProduct> findByStatus(String status);
    
    /**
     * 根据产品类型查询
     */
    List<BankProduct> findByProductType(String productType);
}
