package com.wisdom.finance.bank.service;

import com.wisdom.finance.bank.entity.BankProduct;
import com.wisdom.finance.bank.mapper.BankProductRepository;
import com.wisdom.finance.common.controller.PageResult;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.user.entity.Enterprise;
import com.wisdom.finance.user.mapper.EnterpriseRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * 银企对接服务 - 智能产品匹配和需求发布
 */
@Service
@RequiredArgsConstructor
public class BankMatchService {

    private static final Logger logger = LoggerFactory.getLogger(BankMatchService.class);

    private final BankProductRepository bankProductRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final LoanApplicationRepository loanApplicationRepository;

    /**
     * 为企业匹配最佳金融产品
     */
    public List<ProductMatchResult> matchProductsForEnterprise(Long enterpriseId) {
        Enterprise enterprise = enterpriseRepository.findById(enterpriseId)
                .orElseThrow(() -> new RuntimeException("企业不存在"));

        List<BankProduct> allProducts = bankProductRepository.findByStatus("ACTIVE");
        
        List<ProductMatchResult> matches = new ArrayList<>();
        
        for (BankProduct product : allProducts) {
            double score = calculateMatchScore(product, enterprise);
            if (score >= 0.5) { // 匹配度超过50%才推荐
                matches.add(new ProductMatchResult(product, score));
            }
        }
        
        return matches.stream()
                .sorted(Comparator.comparingDouble(m -> -m.getMatchScore()))
                .collect(Collectors.toList());
    }

    /**
     * 计算产品匹配度分数
     */
    private double calculateMatchScore(BankProduct product, Enterprise enterprise) {
        double score = 0.0;
        int factors = 0;

        // 金额范围匹配
        if (isAmountMatch(product, enterprise)) {
            score += 0.3;
        }
        factors++;

        // 期限匹配
        if (isTermMatch(product, enterprise)) {
            score += 0.2;
        }
        factors++;

        // 信用分匹配
        if (isCreditMatch(product, enterprise)) {
            score += 0.3;
        }
        factors++;

        // 利率匹配
        if (isRateMatch(product, enterprise)) {
            score += 0.2;
        }
        factors++;

        return factors > 0 ? score / factors : 0;
    }

    private boolean isAmountMatch(BankProduct product, Enterprise enterprise) {
        BigDecimal registeredCapital = enterprise.getRegisteredCapital();
        if (registeredCapital == null) return true;

        BigDecimal minAmount = product.getMinAmount();
        BigDecimal maxAmount = product.getMaxAmount();

        if (minAmount != null && registeredCapital.compareTo(minAmount) < 0) {
            return false;
        }
        if (maxAmount != null && registeredCapital.compareTo(maxAmount) > 0) {
            return false;
        }
        return true;
    }

    private boolean isTermMatch(BankProduct product, Enterprise enterprise) {
        // 简化实现，实际应该基于企业的贷款期限需求
        return true;
    }

    private boolean isCreditMatch(BankProduct product, Enterprise enterprise) {
        Integer creditScore = enterprise.getCreditScore();
        Integer requiredScore = product.getRequiredCreditScore();

        if (requiredScore == null) return true;
        if (creditScore == null) return false;

        return creditScore >= requiredScore;
    }

    private boolean isRateMatch(BankProduct product, Enterprise enterprise) {
        // 简化实现，实际应该考虑企业的利率承受能力
        return true;
    }

    /**
     * 发布企业融资需求
     */
    @Transactional
    public FinancingDemand publishFinancingDemand(PublishDemandRequest request) {
        logger.info("发布融资需求，企业ID: {}", request.getEnterpriseId());
        
        // 验证企业是否存在
        Enterprise enterprise = enterpriseRepository.findById(request.getEnterpriseId())
                .orElseThrow(() -> new RuntimeException("企业不存在"));

        // 创建融资需求记录
        FinancingDemand demand = new FinancingDemand();
        demand.setEnterpriseId(request.getEnterpriseId());
        demand.setEnterpriseName(enterprise.getEnterpriseName());
        demand.setDemandAmount(request.getDemandAmount());
        demand.setDemandPurpose(request.getDemandPurpose());
        demand.setExpectedRate(request.getExpectedRate());
        demand.setTermMonths(request.getTermMonths());
        demand.setGuaranteeType(request.getGuaranteeType());
        demand.setStatus("PUBLISHED");
        
        // 自动匹配产品
        List<ProductMatchResult> matchedProducts = matchProductsForEnterprise(request.getEnterpriseId());
        demand.setMatchedProducts(convertMatchesToString(matchedProducts));
        
        return demand;
    }

    /**
     * 获取企业的融资需求和匹配产品
     */
    public List<FinancingDemand> getEnterpriseDemands(Long enterpriseId) {
        List<LoanApplication> applications = loanApplicationRepository.findByCompanyId(enterpriseId);
        List<FinancingDemand> demands = new ArrayList<>();
        
        for (LoanApplication app : applications) {
            FinancingDemand demand = new FinancingDemand();
            demand.setId(app.getId());
            demand.setEnterpriseId(enterpriseId);
            demand.setEnterpriseName(app.getCompanyName());
            demand.setDemandAmount(app.getLoanAmount());
            demand.setDemandPurpose(app.getLoanPurpose());
            demand.setTermMonths(app.getLoanTermMonths());
            demand.setStatus(app.getStatus().name());
            
            // 匹配产品
            Enterprise enterprise = enterpriseRepository.findById(enterpriseId).orElse(null);
            if (enterprise != null) {
                List<ProductMatchResult> matches = matchProductsForEnterprise(enterpriseId);
                demand.setMatchedProducts(convertMatchesToString(matches));
            }
            
            demands.add(demand);
        }
        
        return demands;
    }

    private String convertMatchesToString(List<ProductMatchResult> matches) {
        return matches.stream()
                .map(m -> m.getProduct().getProductName() + 
                         "(" + String.format("%.0f%%", m.getMatchScore() * 100) + ")")
                .collect(Collectors.joining(", "));
    }

    /**
     * 产品匹配结果
     */
    public static class ProductMatchResult {
        private final BankProduct product;
        private final double matchScore;

        public ProductMatchResult(BankProduct product, double matchScore) {
            this.product = product;
            this.matchScore = matchScore;
        }

        public BankProduct getProduct() {
            return product;
        }

        public double getMatchScore() {
            return matchScore;
        }
    }

    /**
     * 发布融资需求请求
     */
    public static class PublishDemandRequest {
        private Long enterpriseId;
        private BigDecimal demandAmount;
        private String demandPurpose;
        private BigDecimal expectedRate;
        private Integer termMonths;
        private String guaranteeType;

        public Long getEnterpriseId() { return enterpriseId; }
        public void setEnterpriseId(Long enterpriseId) { this.enterpriseId = enterpriseId; }
        
        public BigDecimal getDemandAmount() { return demandAmount; }
        public void setDemandAmount(BigDecimal demandAmount) { this.demandAmount = demandAmount; }
        
        public String getDemandPurpose() { return demandPurpose; }
        public void setDemandPurpose(String demandPurpose) { this.demandPurpose = demandPurpose; }
        
        public BigDecimal getExpectedRate() { return expectedRate; }
        public void setExpectedRate(BigDecimal expectedRate) { this.expectedRate = expectedRate; }
        
        public Integer getTermMonths() { return termMonths; }
        public void setTermMonths(Integer termMonths) { this.termMonths = termMonths; }
        
        public String getGuaranteeType() { return guaranteeType; }
        public void setGuaranteeType(String guaranteeType) { this.guaranteeType = guaranteeType; }
    }

    /**
     * 融资需求实体
     */
    public static class FinancingDemand {
        private Long id;
        private Long enterpriseId;
        private String enterpriseName;
        private BigDecimal demandAmount;
        private String demandPurpose;
        private BigDecimal expectedRate;
        private Integer termMonths;
        private String guaranteeType;
        private String status;
        private String matchedProducts;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        
        public Long getEnterpriseId() { return enterpriseId; }
        public void setEnterpriseId(Long enterpriseId) { this.enterpriseId = enterpriseId; }
        
        public String getEnterpriseName() { return enterpriseName; }
        public void setEnterpriseName(String enterpriseName) { this.enterpriseName = enterpriseName; }
        
        public BigDecimal getDemandAmount() { return demandAmount; }
        public void setDemandAmount(BigDecimal demandAmount) { this.demandAmount = demandAmount; }
        
        public String getDemandPurpose() { return demandPurpose; }
        public void setDemandPurpose(String demandPurpose) { this.demandPurpose = demandPurpose; }
        
        public BigDecimal getExpectedRate() { return expectedRate; }
        public void setExpectedRate(BigDecimal expectedRate) { this.expectedRate = expectedRate; }
        
        public Integer getTermMonths() { return termMonths; }
        public void setTermMonths(Integer termMonths) { this.termMonths = termMonths; }
        
        public String getGuaranteeType() { return guaranteeType; }
        public void setGuaranteeType(String guaranteeType) { this.guaranteeType = guaranteeType; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public String getMatchedProducts() { return matchedProducts; }
        public void setMatchedProducts(String matchedProducts) { this.matchedProducts = matchedProducts; }
    }
}
