package com.wisdom.finance.credit.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.entity.CreditScoreModel;
import com.wisdom.finance.credit.mapper.CreditScoreModelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 信用评分模型服务 - 信用评分模型管理和评分计算
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CreditScoreModelService {

    private final CreditScoreModelRepository creditScoreModelRepository;
    private final ObjectMapper objectMapper;

    /**
     * 创建信用评分模型
     */
    @Transactional
    public CreditScoreModel createCreditScoreModel(CreditScoreModel model) {
        log.info("创建信用评分模型: {}", model.getModelName());
        model.setStatus("ACTIVE");
        model.setScoreRangeMin(0);
        model.setScoreRangeMax(100);
        model.setDefaultScore(50);
        model.setCreatedBy("SYSTEM");
        return creditScoreModelRepository.save(model);
    }

    /**
     * 更新信用评分模型
     */
    @Transactional
    public CreditScoreModel updateCreditScoreModel(Long modelId, CreditScoreModel model) {
        log.info("更新信用评分模型，模型ID: {}", modelId);
        CreditScoreModel existing = creditScoreModelRepository.findById(modelId)
                .orElseThrow(() -> new RuntimeException("模型不存在"));
        
        if (model.getModelName() != null) existing.setModelName(model.getModelName());
        if (model.getVersion() != null) existing.setVersion(model.getVersion());
        if (model.getDescription() != null) existing.setDescription(model.getDescription());
        if (model.getModelType() != null) existing.setModelType(model.getModelType());
        if (model.getStatus() != null) existing.setStatus(model.getStatus());
        if (model.getScoreRangeMin() != null) existing.setScoreRangeMin(model.getScoreRangeMin());
        if (model.getScoreRangeMax() != null) existing.setScoreRangeMax(model.getScoreRangeMax());
        if (model.getDefaultScore() != null) existing.setDefaultScore(model.getDefaultScore());
        if (model.getWeightConfig() != null) existing.setWeightConfig(model.getWeightConfig());
        if (model.getRuleConfig() != null) existing.setRuleConfig(model.getRuleConfig());
        if (model.getEvaluationMetrics() != null) existing.setEvaluationMetrics(model.getEvaluationMetrics());
        existing.setUpdatedBy("SYSTEM");
        
        return creditScoreModelRepository.save(existing);
    }

    /**
     * 获取信用评分模型
     */
    public CreditScoreModel getCreditScoreModel(Long modelId) {
        return creditScoreModelRepository.findById(modelId).orElse(null);
    }

    /**
     * 获取激活的信用评分模型
     */
    public List<CreditScoreModel> getActiveCreditScoreModels() {
        return creditScoreModelRepository.findByStatus("ACTIVE");
    }

    /**
     * 使用模型计算信用评分
     */
    public Integer calculateCreditScore(Company company, Long modelId) {
        log.info("使用模型计算信用评分，企业: {}, 模型ID: {}", company.getCompanyName(), modelId);
        
        CreditScoreModel model = creditScoreModelRepository.findById(modelId)
                .orElseThrow(() -> new RuntimeException("模型不存在"));
        
        if (!"ACTIVE".equals(model.getStatus())) {
            throw new RuntimeException("模型未激活");
        }
        
        // 根据模型类型执行不同的评分算法
        if ("RULE_BASED".equals(model.getModelType())) {
            return calculateRuleBasedScore(company, model);
        } else if ("MACHINE_LEARNING".equals(model.getModelType())) {
            return calculateMachineLearningScore(company, model);
        } else {
            throw new RuntimeException("不支持的模型类型");
        }
    }

    /**
     * 基于规则的评分计算
     */
    private Integer calculateRuleBasedScore(Company company, CreditScoreModel model) {
        int score = model.getDefaultScore();
        
        // 从模型配置中获取权重
        Map<String, Double> weights = getWeightsFromConfig(model.getWeightConfig());
        
        // 基础资质评分 (30%)
        int basicScore = calculateBasicScore(company);
        score += (int) (basicScore * weights.getOrDefault("basic", 0.3));
        
        // 信用记录评分 (35%)
        int creditScore = calculateCreditScore(company);
        score += (int) (creditScore * weights.getOrDefault("credit", 0.35));
        
        // 财务状况评分 (25%)
        int financialScore = calculateFinancialScore(company);
        score += (int) (financialScore * weights.getOrDefault("financial", 0.25));
        
        // 行业风险评分 (10%)
        int industryScore = calculateIndustryScore(company);
        score += (int) (industryScore * weights.getOrDefault("industry", 0.1));
        
        // 确保评分在模型定义的范围内
        return Math.min(Math.max(score, model.getScoreRangeMin()), model.getScoreRangeMax());
    }

    /**
     * 基于机器学习的评分计算（模拟实现）
     */
    private Integer calculateMachineLearningScore(Company company, CreditScoreModel model) {
        // 这里是模拟实现，实际项目中会调用真实的机器学习模型
        log.info("使用机器学习模型计算评分");
        
        // 基于企业信息生成一个合理的评分
        int baseScore = 50;
        
        if (company.getCreditScore() != null) {
            baseScore = company.getCreditScore();
        } else {
            // 根据企业信息计算基础评分
            if (company.getEstablishmentDate() != null) {
                int years = java.time.Period.between(company.getEstablishmentDate(), java.time.LocalDate.now()).getYears();
                baseScore += years * 2;
            }
            
            if (company.getRegisteredCapital() != null && company.getRegisteredCapital().compareTo(java.math.BigDecimal.valueOf(1000)) >= 0) {
                baseScore += 10;
            }
            
            if ("存续".equals(company.getBusinessStatus())) {
                baseScore += 15;
            }
        }
        
        return Math.min(Math.max(baseScore, model.getScoreRangeMin()), model.getScoreRangeMax());
    }

    /**
     * 计算基础资质评分
     */
    private int calculateBasicScore(Company company) {
        int score = 0;
        
        // 成立年限
        if (company.getEstablishmentDate() != null) {
            int years = java.time.Period.between(company.getEstablishmentDate(), java.time.LocalDate.now()).getYears();
            if (years >= 10) score += 30;
            else if (years >= 5) score += 25;
            else if (years >= 3) score += 20;
            else if (years >= 1) score += 10;
        }
        
        // 注册资本
        if (company.getRegisteredCapital() != null) {
            if (company.getRegisteredCapital().compareTo(java.math.BigDecimal.valueOf(1000)) >= 0) score += 25;
            else if (company.getRegisteredCapital().compareTo(java.math.BigDecimal.valueOf(500)) >= 0) score += 20;
            else if (company.getRegisteredCapital().compareTo(java.math.BigDecimal.valueOf(100)) >= 0) score += 15;
            else score += 10;
        }
        
        // 经营状态
        if ("存续".equals(company.getBusinessStatus())) score += 25;
        else if ("在业".equals(company.getBusinessStatus())) score += 20;
        else if ("开业".equals(company.getBusinessStatus())) score += 15;
        
        // 员工人数
        if (company.getEmployeeCount() != null) {
            if (company.getEmployeeCount() >= 500) score += 20;
            else if (company.getEmployeeCount() >= 100) score += 15;
            else if (company.getEmployeeCount() >= 50) score += 10;
            else score += 5;
        }
        
        return Math.min(score, 100);
    }

    /**
     * 计算信用记录评分
     */
    private int calculateCreditScore(Company company) {
        int score = 70; // 基础分
        
        // 信用评分
        if (company.getCreditScore() != null) {
            score = company.getCreditScore();
        }
        
        // 风险等级
        if (company.getRiskLevel() != null) {
            switch (company.getRiskLevel()) {
                case "AAA": score += 10;
                    break;
                case "AA": score += 8;
                    break;
                case "A": score += 5;
                    break;
                case "BBB": score += 2;
                    break;
                case "BB": score -= 5;
                    break;
                case "B": score -= 10;
                    break;
                case "C": score -= 20;
                    break;
            }
        }
        
        return Math.min(Math.max(score, 0), 100);
    }

    /**
     * 计算财务状况评分
     */
    private int calculateFinancialScore(Company company) {
        int score = 50; // 基础分
        
        // 年营收
        if (company.getAnnualRevenue() != null) {
            if (company.getAnnualRevenue().compareTo(java.math.BigDecimal.valueOf(10000)) >= 0) score += 30;
            else if (company.getAnnualRevenue().compareTo(java.math.BigDecimal.valueOf(5000)) >= 0) score += 25;
            else if (company.getAnnualRevenue().compareTo(java.math.BigDecimal.valueOf(1000)) >= 0) score += 20;
            else if (company.getAnnualRevenue().compareTo(java.math.BigDecimal.valueOf(500)) >= 0) score += 15;
            else if (company.getAnnualRevenue().compareTo(java.math.BigDecimal.valueOf(100)) >= 0) score += 10;
        }
        
        return Math.min(score, 100);
    }

    /**
     * 计算行业风险评分
     */
    private int calculateIndustryScore(Company company) {
        int score = 70; // 基础分
        
        // 行业风险评估
        if (company.getIndustry() != null) {
            String industry = company.getIndustry();
            if (industry.contains("科技") || industry.contains("新能源")) {
                score += 20;
            } else if (industry.contains("制造") || industry.contains("零售")) {
                score += 10;
            } else if (industry.contains("房地产") || industry.contains("金融")) {
                score -= 10;
            } else if (industry.contains("传统")) {
                score -= 5;
            }
        }
        
        return Math.min(Math.max(score, 0), 100);
    }

    /**
     * 从配置中获取权重
     */
    private Map<String, Double> getWeightsFromConfig(String weightConfig) {
        Map<String, Double> weights = new HashMap<>();
        weights.put("basic", 0.3);
        weights.put("credit", 0.35);
        weights.put("financial", 0.25);
        weights.put("industry", 0.1);
        
        if (weightConfig != null) {
            try {
                Map<String, Object> config = objectMapper.readValue(weightConfig, Map.class);
                for (Map.Entry<String, Object> entry : config.entrySet()) {
                    if (entry.getValue() instanceof Number) {
                        weights.put(entry.getKey(), ((Number) entry.getValue()).doubleValue());
                    }
                }
            } catch (Exception e) {
                log.warn("解析权重配置失败，使用默认权重", e);
            }
        }
        
        return weights;
    }
}
