package com.wisdom.finance.user.mapper;

import com.wisdom.finance.user.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 银行Repository
 */
@Repository
public interface BankRepository extends JpaRepository<Bank, Long> {
    
    /**
     * 根据银行代码查询
     */
    Optional<Bank> findByBankCode(String bankCode);
    
    /**
     * 根据银行名称查询
     */
    List<Bank> findByBankNameContaining(String bankName);
    
    /**
     * 根据状态查询
     */
    List<Bank> findByStatus(String status);
}
