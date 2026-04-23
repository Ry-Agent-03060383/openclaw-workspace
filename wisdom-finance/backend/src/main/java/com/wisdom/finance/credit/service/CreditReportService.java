package com.wisdom.finance.credit.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.entity.CreditReport;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.credit.mapper.CreditReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 信用报告服务 - 企业信用报告生成和管理
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CreditReportService {

    private final CreditReportRepository creditReportRepository;
    private final CompanyRepository companyRepository;
    private final CreditQueryService creditQueryService;
    private final ObjectMapper objectMapper;

    /**
     * 生成企业信用报告
     */
    @Transactional
    public CreditReport generateCreditReport(Long companyId, String reportType, String generatedBy) {
        log.info("生成企业信用报告，企业ID: {}, 报告类型: {}", companyId, reportType);
        
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("企业不存在"));
        
        CreditReport report = new CreditReport();
        report.setReportNo(generateReportNo());
        report.setCompanyId(companyId);
        report.setCompanyName(company.getCompanyName());
        report.setCreditCode(company.getCreditCode());
        report.setReportType(reportType);
        report.setCreditScore(company.getCreditScore());
        report.setCreditLevel(calculateCreditLevel(company.getCreditScore()));
        report.setRiskLevel(company.getRiskLevel());
        report.setReportDate(LocalDate.now());
        report.setValidUntil(LocalDate.now().plusMonths(3));
        report.setDataSources("工商登记、税务、司法、行业数据");
        report.setStatus("GENERATED");
        report.setGeneratedBy(generatedBy);
        report.setGenerationTime(LocalDateTime.now());
        
        // 生成报告内容
        report.setBasicInfo(generateBasicInfo(company));
        report.setCreditHistory(generateCreditHistory(company));
        report.setFinancialInfo(generateFinancialInfo(company));
        report.setLegalInfo(generateLegalInfo(company));
        report.setIndustryInfo(generateIndustryInfo(company));
        report.setRiskAnalysis(generateRiskAnalysis(company));
        report.setSuggestions(generateSuggestions(company));
        
        return creditReportRepository.save(report);
    }

    /**
     * 获取信用报告
     */
    public CreditReport getCreditReport(Long reportId) {
        return creditReportRepository.findById(reportId).orElse(null);
    }

    /**
     * 根据报告编号获取报告
     */
    public CreditReport getCreditReportByNo(String reportNo) {
        return creditReportRepository.findByReportNo(reportNo).orElse(null);
    }

    /**
     * 获取企业的信用报告列表
     */
    public List<CreditReport> getCompanyCreditReports(Long companyId) {
        return creditReportRepository.findByCompanyId(companyId);
    }

    /**
     * 生成基本信息
     */
    private String generateBasicInfo(Company company) {
        Map<String, Object> basicInfo = new HashMap<>();
        basicInfo.put("companyName", company.getCompanyName());
        basicInfo.put("creditCode", company.getCreditCode());
        basicInfo.put("legalPerson", company.getLegalPerson());
        basicInfo.put("registeredCapital", company.getRegisteredCapital());
        basicInfo.put("establishmentDate", company.getEstablishmentDate());
        basicInfo.put("businessStatus", company.getBusinessStatus());
        basicInfo.put("industry", company.getIndustry());
        basicInfo.put("regionCode", company.getRegionCode());
        basicInfo.put("address", company.getAddress());
        basicInfo.put("businessScope", company.getBusinessScope());
        basicInfo.put("employeeCount", company.getEmployeeCount());
        return convertToJson(basicInfo);
    }

    /**
     * 生成信用历史
     */
    private String generateCreditHistory(Company company) {
        Map<String, Object> creditHistory = new HashMap<>();
        creditHistory.put("creditScore", company.getCreditScore());
        creditHistory.put("riskLevel", company.getRiskLevel());
        creditHistory.put("historicalOverdue", 0);
        creditHistory.put("lawsuitCount", 0);
        creditHistory.put("guaranteeCount", 0);
        creditHistory.put("loanCount", 0);
        return convertToJson(creditHistory);
    }

    /**
     * 生成财务信息
     */
    private String generateFinancialInfo(Company company) {
        Map<String, Object> financialInfo = new HashMap<>();
        financialInfo.put("annualRevenue", company.getAnnualRevenue());
        financialInfo.put("profit", company.getAnnualRevenue() != null ? 
                company.getAnnualRevenue().multiply(BigDecimal.valueOf(0.1)) : null);
        financialInfo.put("assetLiabilityRatio", BigDecimal.valueOf(50));
        financialInfo.put("cashFlow", company.getAnnualRevenue() != null ? 
                company.getAnnualRevenue().multiply(BigDecimal.valueOf(0.3)) : null);
        return convertToJson(financialInfo);
    }

    /**
     * 生成法律信息
     */
    private String generateLegalInfo(Company company) {
        Map<String, Object> legalInfo = new HashMap<>();
        legalInfo.put("lawsuitCount", 0);
        legalInfo.put("executiveCases", 0);
        legalInfo.put("administrativePenalties", 0);
        legalInfo.put("abnormalRecords", 0);
        legalInfo.put("intellectualProperty", 0);
        return convertToJson(legalInfo);
    }

    /**
     * 生成行业信息
     */
    private String generateIndustryInfo(Company company) {
        Map<String, Object> industryInfo = new HashMap<>();
        industryInfo.put("industry", company.getIndustry());
        industryInfo.put("industryRank", "中等");
        industryInfo.put("industryGrowth", "稳定");
        industryInfo.put("policySupport", "一般");
        industryInfo.put("competitivePosition", "中等");
        return convertToJson(industryInfo);
    }

    /**
     * 生成风险分析
     */
    private String generateRiskAnalysis(Company company) {
        Map<String, Object> riskAnalysis = new HashMap<>();
        riskAnalysis.put("overallRisk", company.getRiskLevel());
        riskAnalysis.put("creditRisk", "低");
        riskAnalysis.put("operationalRisk", "低");
        riskAnalysis.put("marketRisk", "中");
        riskAnalysis.put("legalRisk", "低");
        riskAnalysis.put("keyRiskFactors", "行业竞争加剧");
        return convertToJson(riskAnalysis);
    }

    /**
     * 生成建议
     */
    private String generateSuggestions(Company company) {
        Map<String, Object> suggestions = new HashMap<>();
        suggestions.put("financingSuggestions", "建议适度增加中长期贷款，优化资本结构");
        suggestions.put("riskControlSuggestions", "加强应收账款管理，提高现金流稳定性");
        suggestions.put("operationSuggestions", "加大研发投入，提升核心竞争力");
        suggestions.put("complianceSuggestions", "完善内部管理制度，加强合规建设");
        return convertToJson(suggestions);
    }

    /**
     * 计算信用等级
     */
    private String calculateCreditLevel(Integer creditScore) {
        if (creditScore >= 90) return "AAA";
        if (creditScore >= 80) return "AA";
        if (creditScore >= 70) return "A";
        if (creditScore >= 60) return "BBB";
        if (creditScore >= 50) return "BB";
        if (creditScore >= 40) return "B";
        return "C";
    }

    /**
     * 生成报告编号
     */
    private String generateReportNo() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "CR" + timestamp + uuid;
    }

    /**
     * 转换为JSON
     */
    private String convertToJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            log.warn("JSON转换失败", e);
            return "{}";
        }
    }
}
