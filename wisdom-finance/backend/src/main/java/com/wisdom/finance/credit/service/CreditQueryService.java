package com.wisdom.finance.credit.service;

import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;

/**
 * 企业信用查询服务 - 企业信用查询与多因子评分 (增强版 v2.0)
 */
@Service
@RequiredArgsConstructor
public class CreditQueryService {

    private static final Logger log = LoggerFactory.getLogger(CreditQueryService.class);

    private final CompanyRepository companyRepository;

    // ============ 查询接口 ============

    public Company findByCreditCode(String creditCode) {
        return companyRepository.findByCreditCode(creditCode).orElse(null);
    }

    public List<Company> searchByName(String companyName) {
        return companyRepository.findByCompanyNameContaining(companyName);
    }

    public Company findById(Long companyId) {
        return companyRepository.findById(companyId).orElse(null);
    }

    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    @Transactional
    public Company createCompany(Company company) {
        calculateCreditRisk(company);
        return companyRepository.save(company);
    }

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
        if (company.getAddress() != null) existing.setAddress(company.getAddress());
        if (company.getAnnualRevenue() != null) existing.setAnnualRevenue(company.getAnnualRevenue());
        if (company.getEmployeeCount() != null) existing.setEmployeeCount(company.getEmployeeCount());
        if (company.getBusinessScope() != null) existing.setBusinessScope(company.getBusinessScope());
        if (company.getDataSource() != null) existing.setDataSource(company.getDataSource());
        calculateCreditRisk(existing);
        return companyRepository.save(existing);
    }

    // ============ 多因子评分计算（增强版 v2.0） ============

    /**
     * 计算企业信用风险评分并更新实体
     */
    public void calculateCreditRisk(Company company) {
        int score = calculateCreditScore(company);
        company.setCreditScore(score);
        company.setRiskLevel(calculateRiskLevel(score));
    }

    /**
     * 公开的多因子评分计算
     */
    public int calculateCreditScore(Company company) {
        int baseScore = calculateBaseScore(company);        // 基础素质 (0-100)
        int creditScore = calculateCreditRecordScore(company); // 信用记录 (0-100)
        int financialScore = calculateFinancialScore(company); // 财务状况 (0-100)
        int legalScore = calculateLegalScore(company);        // 法律合规 (0-100)
        int industryScore = calculateIndustryScore(company);  // 行业市场 (0-100)

        // 5维度加权 = 20% + 25% + 35% + 12% + 8%
        int total = (int) Math.round(
                baseScore * 0.20 +
                creditScore * 0.25 +
                financialScore * 0.35 +
                legalScore * 0.12 +
                industryScore * 0.08
        );

        return Math.min(100, Math.max(0, total));
    }

    /**
     * 获取评分明细（5维度分解）
     */
    public Map<String, Object> getScoreBreakdown(Company company) {
        int total = calculateCreditScore(company);
        Map<String, Object> breakdown = new LinkedHashMap<>();
        breakdown.put("total", total);
        breakdown.put("creditLevel", calculateCreditLevel(total));
        breakdown.put("riskLevel", calculateRiskLevel(total));

        Map<String, Object> dimensions = new LinkedHashMap<>();
        dimensions.put("basic", Map.of(
                "score", calculateBaseScore(company),
                "weight", "20%",
                "maxScore", 100,
                "name", "基础素质",
                "description", "企业存续年限、注册资本、经营状态、员工规模"
        ));
        dimensions.put("credit", Map.of(
                "score", calculateCreditRecordScore(company),
                "weight", "25%",
                "maxScore", 100,
                "name", "信用记录",
                "description", "历史借贷记录、还款履约、担保情况"
        ));
        dimensions.put("financial", Map.of(
                "score", calculateFinancialScore(company),
                "weight", "35%",
                "maxScore", 100,
                "name", "财务状况",
                "description", "资产负债率、盈利能力、现金流"
        ));
        dimensions.put("legal", Map.of(
                "score", calculateLegalScore(company),
                "weight", "12%",
                "maxScore", 100,
                "name", "法律合规",
                "description", "涉诉记录、行政处罚、经营异常"
        ));
        dimensions.put("industry", Map.of(
                "score", calculateIndustryScore(company),
                "weight", "8%",
                "maxScore", 100,
                "name", "行业市场",
                "description", "行业政策导向、发展阶段、区域环境"
        ));
        breakdown.put("dimensions", dimensions);
        return breakdown;
    }

    /**
     * 批量评分评估
     */
    public List<Map<String, Object>> batchEvaluate(List<Long> companyIds) {
        List<Map<String, Object>> results = new ArrayList<>();
        for (Long id : companyIds) {
            Company company = companyRepository.findById(id).orElse(null);
            if (company == null) continue;
            Map<String, Object> item = new LinkedHashMap<>();
            item.put("companyId", company.getId());
            item.put("companyName", company.getCompanyName());
            item.put("score", calculateCreditScore(company));
            item.put("creditLevel", calculateCreditLevel(calculateCreditScore(company)));
            item.put("riskLevel", calculateRiskLevel(calculateCreditScore(company)));
            results.add(item);
        }
        return results;
    }

    // ============ 各维度评分方法 ============

    /**
     * 基础素质评分 (0-100)
     */
    private int calculateBaseScore(Company company) {
        int score = 0;
        // 存续年限 (0-30分)
        if (company.getEstablishmentDate() != null) {
            int years = Period.between(company.getEstablishmentDate(), LocalDate.now()).getYears();
            if (years >= 10) score += 30;
            else if (years >= 5) score += 25;
            else if (years >= 3) score += 20;
            else if (years >= 1) score += 10;
        }
        // 注册资本 (0-25分)
        if (company.getRegisteredCapital() != null) {
            if (company.getRegisteredCapital().compareTo(BigDecimal.valueOf(5000)) >= 0) score += 25;
            else if (company.getRegisteredCapital().compareTo(BigDecimal.valueOf(1000)) >= 0) score += 20;
            else if (company.getRegisteredCapital().compareTo(BigDecimal.valueOf(500)) >= 0) score += 15;
            else if (company.getRegisteredCapital().compareTo(BigDecimal.valueOf(100)) >= 0) score += 10;
        }
        // 经营状态 (0-25分)
        if ("存续".equals(company.getBusinessStatus()) || "在业".equals(company.getBusinessStatus())) score += 25;
        else if (company.getBusinessStatus() != null) score += 10;
        // 员工人数 (0-20分)
        if (company.getEmployeeCount() != null) {
            if (company.getEmployeeCount() >= 500) score += 20;
            else if (company.getEmployeeCount() >= 100) score += 15;
            else if (company.getEmployeeCount() >= 50) score += 10;
            else if (company.getEmployeeCount() >= 10) score += 5;
        }
        return Math.min(score, 100);
    }

    /**
     * 信用记录评分 (0-100)
     */
    private int calculateCreditRecordScore(Company company) {
        int score = 70; // 基础分
        if (company.getCreditScore() != null) {
            score = company.getCreditScore(); // 沿用已有信用分
        }
        // 根据风险等级调整
        if (company.getRiskLevel() != null) {
            switch (company.getRiskLevel()) {
                case "LOW": score += 10; break;
                case "MEDIUM": score -= 5; break;
                case "HIGH": score -= 15; break;
            }
        }
        return Math.min(100, Math.max(0, score));
    }

    /**
     * 财务状况评分 (0-100)
     */
    private int calculateFinancialScore(Company company) {
        if (company.getAnnualRevenue() == null) return 50;
        int score = 50;
        BigDecimal revenue = company.getAnnualRevenue();
        if (revenue.compareTo(BigDecimal.valueOf(10000)) >= 0) score += 30;
        else if (revenue.compareTo(BigDecimal.valueOf(5000)) >= 0) score += 25;
        else if (revenue.compareTo(BigDecimal.valueOf(1000)) >= 0) score += 20;
        else if (revenue.compareTo(BigDecimal.valueOf(500)) >= 0) score += 15;
        else if (revenue.compareTo(BigDecimal.valueOf(100)) >= 0) score += 10;
        return Math.min(score, 100);
    }

    /**
     * 法律合规评分 (0-100)
     */
    private int calculateLegalScore(Company company) {
        return 85; // 默认值（实际应查询司法数据）
    }

    /**
     * 行业市场评分 (0-100)
     */
    private int calculateIndustryScore(Company company) {
        int score = 70;
        if (company.getIndustry() != null) {
            String ind = company.getIndustry();
            if (ind.contains("科技") || ind.contains("软件") || ind.contains("新能源") || ind.contains("环保")) {
                score += 20;
            } else if (ind.contains("制造") || ind.contains("医药") || ind.contains("教育")) {
                score += 10;
            } else if (ind.contains("批发") || ind.contains("零售") || ind.contains("餐饮")) {
                score += 0;
            } else if (ind.contains("房地产") || ind.contains("矿产") || ind.contains("金融")) {
                score -= 10;
            }
        }
        return Math.min(100, Math.max(0, score));
    }

    // ============ 等级映射 ============

    private String calculateCreditLevel(Integer score) {
        if (score == null) return "NR";
        if (score >= 90) return "AAA";
        if (score >= 80) return "AA";
        if (score >= 70) return "A";
        if (score >= 60) return "BBB";
        if (score >= 50) return "BB";
        if (score >= 40) return "B";
        return "C";
    }

    private String calculateRiskLevel(Integer score) {
        if (score == null) return "MEDIUM";
        if (score >= 80) return "LOW";
        if (score >= 60) return "MEDIUM";
        return "HIGH";
    }
}