package com.wisdom.credit.mapper;

import com.wisdom.credit.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 企业信息Repository
 */
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    
    /**
     * 根据统一社会信用代码查询
     */
    Optional<Company> findByCreditCode(String creditCode);
}