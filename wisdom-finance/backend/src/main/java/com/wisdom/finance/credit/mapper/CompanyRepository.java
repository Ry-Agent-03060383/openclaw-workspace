package com.wisdom.finance.credit.mapper;

import com.wisdom.finance.credit.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
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
    
    /**
     * 根据企业名称模糊查询
     */
    @Query("SELECT c FROM Company c WHERE c.companyName LIKE %:name% AND c.deleted = false")
    List<Company> findByCompanyNameContaining(@Param("name") String name);
    
    /**
     * 根据风险等级查询
     */
    List<Company> findByRiskLevel(String riskLevel);
    
    /**
     * 根据行业查询
     */
    List<Company> findByIndustry(String industry);
}