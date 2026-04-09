package com.wisdom.credit.service;

import com.wisdom.credit.entity.Company;
import com.wisdom.credit.mapper.CompanyMapper;
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
    
    private final CompanyMapper companyMapper;
    
    /**
     * 按统一社会信用代码精确查询
     */
    public Company findByCreditCode(String creditCode) {
        return companyMapper.findByCreditCode(creditCode);
    }
    
    /**
     * 按企业名称模糊搜索
     */
    public List<Company> searchByName(String companyName, int limit) {
        return companyMapper.searchByName(companyName, limit);
    }
    
    /**
     * 多维度筛选查询
     */
    public List<Company> searchByConditions(String regionCode, String industry, 
                                            BigDecimal minCapital, BigDecimal maxCapital) {
        return companyMapper.searchByConditions(regionCode, industry, minCapital, maxCapital);
    }
    
    /**
     * 创建企业信息（模拟工商数据接入）
     */
    @Transactional
    public Company createCompany(Company company) {
        // 计算企业年龄
        if (company.getEstablishmentDate() != null) {
            int age = Period.between(company.getEstablishmentDate(), LocalDate.now()).getYears();
            company.setEstablishmentDate(LocalDate.now().minusYears(age));
        }
        // 计算信用评分和风险等级
        calculateCreditRisk(company);
        companyMapper.insert(company);
        return company;
    }
    
    /**
     * 计算信用评分和风险等级 - M6 风险评估
     */
    public void calculateCreditRisk(Company company) {
        int score = 0;
        
        // 基础资质评分 (30分)
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
        
        // 经营状况 (10分)
        score += 10;
        
        // 行业风险 (10分)
        if (company.getIndustry() != null) {
            if (company.getIndustry().contains("科技") || company.getIndustry().contains("金融")) {
                score += 10;
            } else if (company.getIndustry().contains("制造")) {
                score += 8;
            } else {
                score += 5;
            }
        }
        
        // 营收加分 (20分)
        if (company.getAnnualRevenue() != null) {
            if (company.getAnnualRevenue().compareTo(new BigDecimal("1亿")) >= 0) score += 20;
            else if (company.getAnnualRevenue().compareTo(new BigDecimal("5000万")) >= 0) score += 15;
            else if (company.getAnnualRevenue().compareTo(new BigDecimal("1000万")) >= 0) score += 10;
        }
        
        // 信用评分 0-100
        company.setCreditScore(Math.min(score, 100));
        
        // 风险等级
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