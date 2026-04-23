package com.wisdom.finance.credit.service;

import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

/**
 * 企业信用查询服务 - M1 企业信用查询
 */
@Service
@RequiredArgsConstructor
public class CreditQueryService {
    
    private final CompanyRepository companyRepository;
    
    /**
     * 按统一社会信用代码精确查询
     */
    public Company findByCreditCode(String creditCode) {
        return companyRepository.findByCreditCode(creditCode).orElse(null);
    }
    
    /**
     * 按企业名称模糊搜索
     */
    public List<Company> searchByName(String companyName) {
        return companyRepository.findAll().stream()
                .filter(c -> c.getCompanyName() != null && c.getCompanyName().contains(companyName))
                .toList();
    }
    
    /**
     * 按ID查询企业
     */
    public Company findById(Long companyId) {
        return companyRepository.findById(companyId).orElse(null);
    }
    
    /**
     * 查询所有企业
     */
    public List<Company> findAll() {
        return companyRepository.findAll();
    }
    
    /**
     * 创建企业信息（模拟工商数据接入）
     */
    @Transactional
    public Company createCompany(Company company) {
        calculateCreditRisk(company);
        return companyRepository.save(company);
    }
    
    /**
     * 更新企业信息
     */
    @Transactional
    public Company updateCompany(Long companyId, Company company) {
        Company existing = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("企业不存在"));
        if (company.getCompanyName() != null) existing.setCompanyName(company.getCompanyName());
        if (company.getCreditCode() != null) existing.setCreditCode(company.getCreditCode());
        if (company.getLegalPerson() != null) existing.setLegalPerson(company.getLegalPerson());
        if (company.getRegisteredCapital() != null) existing.setRegisteredCapital(company.getRegisteredCapital());
        if (company.getEstablishmentDate() != null) existing.setEstablishmentDate(company.getEstablishmentDate());
        if (company.getBusinessStatus() != null) existing.setBusinessStatus(company.getBusinessStatus());
        if (company.getIndustry() != null) existing.setIndustry(company.getIndustry());
        if (company.getRegionCode() != null) existing.setRegionCode(company.getRegionCode());
        if (company.getAddress() != null) existing.setAddress(company.getAddress());
        if (company.getBusinessScope() != null) existing.setBusinessScope(company.getBusinessScope());
        if (company.getEmployeeCount() != null) existing.setEmployeeCount(company.getEmployeeCount());
        if (company.getAnnualRevenue() != null) existing.setAnnualRevenue(company.getAnnualRevenue());
        calculateCreditRisk(existing);
        return companyRepository.save(existing);
    }
    
    /**
     * 计算信用评分和风险等级 - M6 风险评估
     */
    public void calculateCreditRisk(Company company) {
        int score = 0;
        
        if (company.getEstablishmentDate() != null) {
            int years = Period.between(company.getEstablishmentDate(), LocalDate.now()).getYears();
            if (years >= 10) score += 30;
            else if (years >= 5) score += 25;
            else if (years >= 3) score += 20;
            else if (years >= 1) score += 10;
        }
        
        if (company.getRegisteredCapital() != null) {
            if (company.getRegisteredCapital().compareTo(new BigDecimal("1000")) >= 0) score += 20;
            else if (company.getRegisteredCapital().compareTo(new BigDecimal("500")) >= 0) score += 15;
            else if (company.getRegisteredCapital().compareTo(new BigDecimal("100")) >= 0) score += 10;
        }
        
        if ("存续".equals(company.getBusinessStatus())) score += 20;
        
        score += 10;
        
        if (company.getIndustry() != null) {
            if (company.getIndustry().contains("科技") || company.getIndustry().contains("金融")) {
                score += 10;
            } else if (company.getIndustry().contains("制造")) {
                score += 8;
            } else {
                score += 5;
            }
        }
        
        if (company.getAnnualRevenue() != null) {
            if (company.getAnnualRevenue().compareTo(new BigDecimal("10000")) >= 0) score += 20;
            else if (company.getAnnualRevenue().compareTo(new BigDecimal("5000")) >= 0) score += 15;
            else if (company.getAnnualRevenue().compareTo(new BigDecimal("1000")) >= 0) score += 10;
        }
        
        company.setCreditScore(Math.min(score, 100));
        company.setRiskLevel(calculateRiskLevel(score));
    }
    
    /**
     * 根据评分计算风险等级
     */
    private String calculateRiskLevel(int score) {
        if (score >= 90) return "AAA";
        if (score >= 80) return "AA";
        if (score >= 70) return "A";
        if (score >= 60) return "BBB";
        if (score >= 50) return "BB";
        if (score >= 40) return "B";
        return "C";
    }
}
