package com.wisdom.finance.credit.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.entity.CreditScoreModel;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.credit.mapper.CreditScoreModelRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 信用评分模型服务 - 信用评分模型管理和评分计算 (增强版 v2.0)
 */
@Service
@RequiredArgsConstructor
public class CreditScoreModelService {

    private static final Logger log = LoggerFactory.getLogger(CreditScoreModelService.class);
    private final CreditScoreModelRepository creditScoreModelRepository;
    private final CompanyRepository companyRepository;
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
     * 获取所有信用评分模型
     */
    public List<CreditScoreModel> getAllModels() {
        return creditScoreModelRepository.findAll();
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
     * 模型测评：计算KS值、AUC、准确率、精确率、召回率、F1-Score、PSI
     */
    public Map<String, Object> evaluateModel(Long modelId, List<Company> testData) {
        log.info("开始模型测评，模型ID: {}, 测试数据量: {}", modelId, testData.size());

        CreditScoreModel model = creditScoreModelRepository.findById(modelId)
                .orElseThrow(() -> new RuntimeException("模型不存在"));

        // 1. 使用模型对测试数据进行评分
        List<ScorePrediction> predictions = new ArrayList<>();
        for (Company company : testData) {
            Integer predictedScore = calculateRuleBasedScore(company, model);
            // 模拟实际标签 — 使用企业现有评分或计算一个基准值
            int actualLabel = (company.getCreditScore() != null ? company.getCreditScore() : predictedScore) >= 50 ? 1 : 0;
            int predictedLabel = predictedScore >= 50 ? 1 : 0;
            predictions.add(new ScorePrediction(predictedScore, actualLabel, predictedLabel));
        }

        // 2. 计算混淆矩阵
        long tp = predictions.stream().filter(p -> p.actualLabel == 1 && p.predictedLabel == 1).count();
        long tn = predictions.stream().filter(p -> p.actualLabel == 0 && p.predictedLabel == 0).count();
        long fp = predictions.stream().filter(p -> p.actualLabel == 0 && p.predictedLabel == 1).count();
        long fn = predictions.stream().filter(p -> p.actualLabel == 1 && p.predictedLabel == 0).count();

        // 3. 计算各项指标
        Map<String, Object> metrics = new LinkedHashMap<>();

        // 准确率 Accuracy
        double accuracy = (double) (tp + tn) / Math.max(1, tp + tn + fp + fn);
        metrics.put("accuracy", BigDecimal.valueOf(accuracy).setScale(4, RoundingMode.HALF_UP).doubleValue());

        // 精确率 Precision
        double precision = (double) tp / Math.max(1, tp + fp);
        metrics.put("precision", BigDecimal.valueOf(precision).setScale(4, RoundingMode.HALF_UP).doubleValue());

        // 召回率 Recall
        double recall = (double) tp / Math.max(1, tp + fn);
        metrics.put("recall", BigDecimal.valueOf(recall).setScale(4, RoundingMode.HALF_UP).doubleValue());

        // F1-Score
        double f1 = 2 * precision * recall / Math.max(0.0001, precision + recall);
        metrics.put("f1Score", BigDecimal.valueOf(f1).setScale(4, RoundingMode.HALF_UP).doubleValue());

        // KS值 (Kolmogorov-Smirnov) — 简化为正负样本评分分布差异
        double ks = calculateKS(predictions);
        metrics.put("ks", BigDecimal.valueOf(ks).setScale(4, RoundingMode.HALF_UP).doubleValue());

        // AUC (Area Under ROC Curve) — 简化为Wilcoxon统计量
        double auc = calculateAUC(predictions);
        metrics.put("auc", BigDecimal.valueOf(auc).setScale(4, RoundingMode.HALF_UP).doubleValue());

        // PSI (Population Stability Index)
        double psi = calculatePSI(predictions);
        metrics.put("psi", BigDecimal.valueOf(psi).setScale(4, RoundingMode.HALF_UP).doubleValue());

        // 混淆矩阵
        Map<String, Object> confusionMatrix = new LinkedHashMap<>();
        confusionMatrix.put("tp", tp);
        confusionMatrix.put("tn", tn);
        confusionMatrix.put("fp", fp);
        confusionMatrix.put("fn", fn);
        metrics.put("confusionMatrix", confusionMatrix);

        // 总样本数
        metrics.put("totalSamples", predictions.size());
        metrics.put("positiveSamples", predictions.stream().filter(p -> p.actualLabel == 1).count());
        metrics.put("negativeSamples", predictions.stream().filter(p -> p.actualLabel == 0).count());

        // 将评估指标保存到模型
        try {
            String metricsJson = objectMapper.writeValueAsString(metrics);
            model.setEvaluationMetrics(metricsJson);
            model.setLastTrainingDate(LocalDate.now());
            model.setAccuracy(BigDecimal.valueOf(accuracy).setScale(4, RoundingMode.HALF_UP));
            creditScoreModelRepository.save(model);
        } catch (Exception e) {
            log.warn("保存评估指标失败", e);
        }

        log.info("模型测评完成: accuracy={}, precision={}, recall={}, f1={}, ks={}, auc={}, psi={}",
                accuracy, precision, recall, f1, ks, auc, psi);

        return metrics;
    }

    /**
     * 获取模型评估指标详情
     */
    public Map<String, Object> getModelMetrics(Long modelId) {
        CreditScoreModel model = creditScoreModelRepository.findById(modelId)
                .orElseThrow(() -> new RuntimeException("模型不存在"));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("modelId", model.getId());
        result.put("modelName", model.getModelName());
        result.put("modelCode", model.getModelCode());
        result.put("version", model.getVersion());
        result.put("modelType", model.getModelType());
        result.put("accuracy", model.getAccuracy());
        result.put("lastTrainingDate", model.getLastTrainingDate());

        if (model.getEvaluationMetrics() != null) {
            try {
                Map<String, Object> metrics = objectMapper.readValue(model.getEvaluationMetrics(),
                        new TypeReference<Map<String, Object>>() {});
                result.put("metrics", metrics);
            } catch (Exception e) {
                log.warn("解析评估指标失败", e);
                result.put("metrics", model.getEvaluationMetrics());
            }
        } else {
            result.put("metrics", Collections.emptyMap());
        }

        return result;
    }

    /**
     * 使用指定模型模拟评分
     */
    public Map<String, Object> simulateScore(Long modelId, Company company) {
        log.info("模拟评分，模型ID: {}, 企业: {}", modelId, company.getCompanyName());

        CreditScoreModel model = creditScoreModelRepository.findById(modelId)
                .orElseThrow(() -> new RuntimeException("模型不存在"));

        // 执行评分
        Integer score = calculateRuleBasedScore(company, model);
        Map<String, Double> weights = getWeightsFromConfig(model.getWeightConfig());

        // 各维度详细评分
        Map<String, Object> detail = new LinkedHashMap<>();
        detail.put("modelId", modelId);
        detail.put("modelName", model.getModelName());
        detail.put("modelCode", model.getModelCode());
        detail.put("companyName", company.getCompanyName());
        detail.put("companyId", company.getId());
        detail.put("totalScore", score);
        detail.put("creditLevel", calculateCreditLevel(score));
        detail.put("riskLevel", calculateRiskLevel(score));

        // 维度分解
        Map<String, Object> dimensionScores = new LinkedHashMap<>();
        dimensionScores.put("basic", calculateBasicScore(company));
        dimensionScores.put("credit", calculateCreditScore(company));
        dimensionScores.put("financial", calculateFinancialScore(company));
        dimensionScores.put("industry", calculateIndustryScore(company));
        detail.put("dimensionScores", dimensionScores);
        detail.put("weights", weights);

        // 评分范围
        detail.put("scoreRangeMin", model.getScoreRangeMin());
        detail.put("scoreRangeMax", model.getScoreRangeMax());

        return detail;
    }

    /**
     * 对比两个模型的性能
     */
    public Map<String, Object> compareModels(Long modelId1, Long modelId2) {
        log.info("对比模型: {} vs {}", modelId1, modelId2);

        CreditScoreModel model1 = creditScoreModelRepository.findById(modelId1)
                .orElseThrow(() -> new RuntimeException("模型1不存在"));
        CreditScoreModel model2 = creditScoreModelRepository.findById(modelId2)
                .orElseThrow(() -> new RuntimeException("模型2不存在"));

        Map<String, Object> result = new LinkedHashMap<>();

        // 模型基本信息
        Map<String, Object> model1Info = new LinkedHashMap<>();
        model1Info.put("modelId", model1.getId());
        model1Info.put("modelName", model1.getModelName());
        model1Info.put("modelCode", model1.getModelCode());
        model1Info.put("version", model1.getVersion());
        model1Info.put("modelType", model1.getModelType());
        model1Info.put("accuracy", model1.getAccuracy());
        model1Info.put("lastTrainingDate", model1.getLastTrainingDate());
        model1Info.put("status", model1.getStatus());
        result.put("model1", model1Info);

        Map<String, Object> model2Info = new LinkedHashMap<>();
        model2Info.put("modelId", model2.getId());
        model2Info.put("modelName", model2.getModelName());
        model2Info.put("modelCode", model2.getModelCode());
        model2Info.put("version", model2.getVersion());
        model2Info.put("modelType", model2.getModelType());
        model2Info.put("accuracy", model2.getAccuracy());
        model2Info.put("lastTrainingDate", model2.getLastTrainingDate());
        model2Info.put("status", model2.getStatus());
        result.put("model2", model2Info);

        // 对比评估指标
        Map<String, Object> comparison = new LinkedHashMap<>();
        comparison.put("accuracyDiff", compareMetric(getMetricValue(model1, "accuracy"), getMetricValue(model2, "accuracy")));
        comparison.put("precisionDiff", compareMetric(getMetricValue(model1, "precision"), getMetricValue(model2, "precision")));
        comparison.put("recallDiff", compareMetric(getMetricValue(model1, "recall"), getMetricValue(model2, "recall")));
        comparison.put("f1ScoreDiff", compareMetric(getMetricValue(model1, "f1Score"), getMetricValue(model2, "f1Score")));
        comparison.put("ksDiff", compareMetric(getMetricValue(model1, "ks"), getMetricValue(model2, "ks")));
        comparison.put("aucDiff", compareMetric(getMetricValue(model1, "auc"), getMetricValue(model2, "auc")));
        result.put("comparison", comparison);

        // 推荐意见
        Double m1Accuracy = getMetricValue(model1, "accuracy");
        Double m2Accuracy = getMetricValue(model2, "accuracy");
        if (m1Accuracy != null && m2Accuracy != null) {
            result.put("recommendation", m1Accuracy >= m2Accuracy
                    ? "推荐使用模型1：" + model1.getModelName()
                    : "推荐使用模型2：" + model2.getModelName());
        } else {
            result.put("recommendation", "无法确定推荐，请手动评估");
        }

        return result;
    }

    /**
     * 获取权重配置
     */
    public Map<String, Object> getWeightConfig(Long modelId) {
        CreditScoreModel model = creditScoreModelRepository.findById(modelId)
                .orElseThrow(() -> new RuntimeException("模型不存在"));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("modelId", model.getId());
        result.put("modelName", model.getModelName());
        result.put("modelCode", model.getModelCode());

        Map<String, Double> weights = getWeightsFromConfig(model.getWeightConfig());
        result.put("weights", weights);

        // 校验权重是否归一化
        double totalWeight = weights.values().stream().mapToDouble(Double::doubleValue).sum();
        result.put("totalWeight", BigDecimal.valueOf(totalWeight).setScale(4, RoundingMode.HALF_UP));
        result.put("normalized", Math.abs(totalWeight - 1.0) < 0.001);

        // 原始配置
        result.put("rawConfig", model.getWeightConfig());

        return result;
    }

    /**
     * 更新权重配置
     */
    @Transactional
    public Map<String, Object> updateWeightConfig(Long modelId, String weightConfig) {
        log.info("更新权重配置，模型ID: {}", modelId);

        CreditScoreModel model = creditScoreModelRepository.findById(modelId)
                .orElseThrow(() -> new RuntimeException("模型不存在"));

        // 校验权重配置格式
        try {
            Map<String, Object> config = objectMapper.readValue(weightConfig, Map.class);
            // 确保权重和为1
            double sum = 0;
            for (Map.Entry<String, Object> entry : config.entrySet()) {
                if (entry.getValue() instanceof Number) {
                    sum += ((Number) entry.getValue()).doubleValue();
                }
            }
            if (Math.abs(sum - 1.0) > 0.001) {
                log.warn("权重配置未归一化，总和={}", sum);
            }
        } catch (Exception e) {
            throw new RuntimeException("权重配置格式无效：" + e.getMessage());
        }

        model.setWeightConfig(weightConfig);
        model.setUpdatedBy("SYSTEM");
        creditScoreModelRepository.save(model);

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("modelId", model.getId());
        result.put("modelName", model.getModelName());
        result.put("weightConfig", weightConfig);
        result.put("message", "权重配置更新成功");

        Map<String, Double> weights = getWeightsFromConfig(weightConfig);
        result.put("weights", weights);

        return result;
    }

    /**
     * 计算单个特征的IV值、WoE、单调性
     */
    public Map<String, Object> evaluateFeature(String featureName, List<Company> companies) {
        log.info("评估特征: {}, 数据量: {}", featureName, companies.size());

        if (companies == null || companies.isEmpty()) {
            throw new RuntimeException("测试数据不能为空");
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("featureName", featureName);
        result.put("totalSamples", companies.size());

        // 根据特征名获取特征值
        List<Object> featureValues = extractFeatureValues(featureName, companies);
        result.put("nonNullSamples", featureValues.size());

        // WoE (Weight of Evidence) — 分箱计算
        List<Map<String, Object>> bins = calculateWoEBins(featureValues, companies, featureName);
        result.put("bins", bins);

        // IV (Information Value)
        double iv = bins.stream()
                .mapToDouble(b -> (Double) b.getOrDefault("iv", 0.0))
                .sum();
        result.put("iv", BigDecimal.valueOf(iv).setScale(4, RoundingMode.HALF_UP).doubleValue());
        result.put("ivLevel", evaluateIVLevel(iv));

        // 单调性判断
        boolean monotonic = checkMonotonicity(bins);
        result.put("monotonic", monotonic);
        result.put("monotonicDescription", monotonic ? "特征与目标呈单调关系" : "特征不具备严格单调性");

        return result;
    }

    // ==================== 公共评分方法 ====================

    /**
     * 公开的多因子评分计算（5维度）
     */
    public Map<String, Object> calculateCreditScoreWithDimensions(Company company) {
        int baseScore = calculateBasicScore(company);
        int creditScore = calculateCreditScore(company);
        int financialScore = calculateFinancialScore(company);
        int legalScore = 10; // 法律合规 — 默认模拟值
        int industryScore = calculateIndustryScore(company);

        // 使用默认权重
        int total = (int) Math.round(baseScore * 0.20 + creditScore * 0.25
                + financialScore * 0.35 + legalScore * 0.12 + industryScore * 0.08);
        total = Math.min(100, Math.max(0, total));

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("totalScore", total);
        result.put("creditLevel", calculateCreditLevel(total));
        result.put("riskLevel", calculateRiskLevel(total));

        Map<String, Object> dimensions = new LinkedHashMap<>();
        dimensions.put("basic", baseScore);
        dimensions.put("credit", creditScore);
        dimensions.put("financial", financialScore);
        dimensions.put("legal", legalScore);
        dimensions.put("industry", industryScore);
        result.put("dimensions", dimensions);

        return result;
    }

    // ==================== 内部评分方法 ====================

    /**
     * 基于规则的评分计算
     */
    private Integer calculateRuleBasedScore(Company company, CreditScoreModel model) {
        int score = model.getDefaultScore();

        // 从模型配置中获取权重
        Map<String, Double> weights = getWeightsFromConfig(model.getWeightConfig());

        // 基础资质评分 (权重配置)
        int basicScore = calculateBasicScore(company);
        score += (int) (basicScore * weights.getOrDefault("basic", 0.3));

        // 信用记录评分 (权重配置)
        int creditScore = calculateCreditScore(company);
        score += (int) (creditScore * weights.getOrDefault("credit", 0.35));

        // 财务状况评分 (权重配置)
        int financialScore = calculateFinancialScore(company);
        score += (int) (financialScore * weights.getOrDefault("financial", 0.25));

        // 行业风险评分 (权重配置)
        int industryScore = calculateIndustryScore(company);
        score += (int) (industryScore * weights.getOrDefault("industry", 0.1));

        // 确保评分在模型定义的范围内
        return Math.min(Math.max(score, model.getScoreRangeMin()), model.getScoreRangeMax());
    }

    /**
     * 基于机器学习的评分计算（模拟实现）
     */
    private Integer calculateMachineLearningScore(Company company, CreditScoreModel model) {
        log.info("使用机器学习模型计算评分");

        int baseScore = 50;

        if (company.getCreditScore() != null) {
            baseScore = company.getCreditScore();
        } else {
            if (company.getEstablishmentDate() != null) {
                int years = Period.between(company.getEstablishmentDate(), LocalDate.now()).getYears();
                baseScore += years * 2;
            }
            if (company.getRegisteredCapital() != null
                    && company.getRegisteredCapital().compareTo(BigDecimal.valueOf(1000)) >= 0) {
                baseScore += 10;
            }
            if ("存续".equals(company.getBusinessStatus())) {
                baseScore += 15;
            }
        }

        return Math.min(Math.max(baseScore, model.getScoreRangeMin()), model.getScoreRangeMax());
    }

    /**
     * 计算基础资质评分 (0-100)
     */
    int calculateBasicScore(Company company) { // package-private for test access
        int score = 0;

        if (company.getEstablishmentDate() != null) {
            int years = Period.between(company.getEstablishmentDate(), LocalDate.now()).getYears();
            if (years >= 10) score += 30;
            else if (years >= 5) score += 25;
            else if (years >= 3) score += 20;
            else if (years >= 1) score += 10;
        }

        if (company.getRegisteredCapital() != null) {
            if (company.getRegisteredCapital().compareTo(BigDecimal.valueOf(1000)) >= 0) score += 25;
            else if (company.getRegisteredCapital().compareTo(BigDecimal.valueOf(500)) >= 0) score += 20;
            else if (company.getRegisteredCapital().compareTo(BigDecimal.valueOf(100)) >= 0) score += 15;
            else score += 10;
        }

        if ("存续".equals(company.getBusinessStatus())) score += 25;
        else if ("在业".equals(company.getBusinessStatus())) score += 20;
        else if ("开业".equals(company.getBusinessStatus())) score += 15;

        if (company.getEmployeeCount() != null) {
            if (company.getEmployeeCount() >= 500) score += 20;
            else if (company.getEmployeeCount() >= 100) score += 15;
            else if (company.getEmployeeCount() >= 50) score += 10;
            else score += 5;
        }

        return Math.min(score, 100);
    }

    /**
     * 计算信用记录评分 (0-100)
     */
    int calculateCreditScore(Company company) { // package-private for test access
        int score = 70;

        if (company.getCreditScore() != null) {
            score = company.getCreditScore();
        }

        if (company.getRiskLevel() != null) {
            switch (company.getRiskLevel()) {
                case "AAA": score += 10; break;
                case "AA": score += 8; break;
                case "A": score += 5; break;
                case "BBB": score += 2; break;
                case "BB": score -= 5; break;
                case "B": score -= 10; break;
                case "C": score -= 20; break;
            }
        }

        return Math.min(Math.max(score, 0), 100);
    }

    /**
     * 计算财务状况评分 (0-100)
     */
    int calculateFinancialScore(Company company) { // package-private for test access
        int score = 50;

        if (company.getAnnualRevenue() != null) {
            if (company.getAnnualRevenue().compareTo(BigDecimal.valueOf(10000)) >= 0) score += 30;
            else if (company.getAnnualRevenue().compareTo(BigDecimal.valueOf(5000)) >= 0) score += 25;
            else if (company.getAnnualRevenue().compareTo(BigDecimal.valueOf(1000)) >= 0) score += 20;
            else if (company.getAnnualRevenue().compareTo(BigDecimal.valueOf(500)) >= 0) score += 15;
            else if (company.getAnnualRevenue().compareTo(BigDecimal.valueOf(100)) >= 0) score += 10;
        }

        return Math.min(score, 100);
    }

    /**
     * 计算行业风险评分 (0-100)
     */
    int calculateIndustryScore(Company company) { // package-private for test access
        int score = 70;

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

    // ==================== 辅助方法 ====================

    /**
     * 从配置中获取权重
     */
    public Map<String, Double> getWeightsFromConfig(String weightConfig) {
        Map<String, Double> weights = new LinkedHashMap<>();
        weights.put("basic", 0.20);
        weights.put("credit", 0.25);
        weights.put("financial", 0.35);
        weights.put("industry", 0.10);
        weights.put("legal", 0.10);

        if (weightConfig != null) {
            try {
                Map<String, Object> config = objectMapper.readValue(weightConfig,
                        new TypeReference<Map<String, Object>>() {});
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

    /**
     * 计算KS值
     */
    private double calculateKS(List<ScorePrediction> predictions) {
        List<Integer> positiveScores = predictions.stream()
                .filter(p -> p.actualLabel == 1)
                .map(p -> p.predictedScore)
                .sorted()
                .collect(Collectors.toList());
        List<Integer> negativeScores = predictions.stream()
                .filter(p -> p.actualLabel == 0)
                .map(p -> p.predictedScore)
                .sorted()
                .collect(Collectors.toList());

        if (positiveScores.isEmpty() || negativeScores.isEmpty()) {
            return 0.0;
        }

        // 简化KS：计算正负样本均值差距
        double posMean = positiveScores.stream().mapToInt(Integer::intValue).average().orElse(0);
        double negMean = negativeScores.stream().mapToInt(Integer::intValue).average().orElse(0);

        // 归一化到0-1
        return Math.abs(posMean - negMean) / 100.0;
    }

    /**
     * 计算AUC值（简化Wilcoxon）
     */
    private double calculateAUC(List<ScorePrediction> predictions) {
        List<ScorePrediction> sorted = predictions.stream()
                .sorted((a, b) -> Integer.compare(b.predictedScore, a.predictedScore))
                .collect(Collectors.toList());

        long positiveCount = predictions.stream().filter(p -> p.actualLabel == 1).count();
        long negativeCount = predictions.stream().filter(p -> p.actualLabel == 0).count();

        if (positiveCount == 0 || negativeCount == 0) {
            return 0.5;
        }

        // Wilcoxon-Mann-Whitney统计量
        long rankSum = 0;
        for (int i = 0; i < sorted.size(); i++) {
            if (sorted.get(i).actualLabel == 1) {
                rankSum += (i + 1);
            }
        }

        double auc = (double) (rankSum - (positiveCount * (positiveCount + 1) / 2.0))
                / (positiveCount * negativeCount);

        return Math.min(1.0, Math.max(0.0, auc));
    }

    /**
     * 计算PSI (Population Stability Index)
     */
    private double calculatePSI(List<ScorePrediction> predictions) {
        if (predictions.isEmpty()) return 0.0;

        // 分成10个评分区间
        int binCount = 10;
        double[] actualDistribution = new double[binCount];
        double[] expectedDistribution = new double[binCount];
        Arrays.fill(expectedDistribution, 1.0 / binCount); // 均匀期望分布

        for (ScorePrediction p : predictions) {
            int bin = Math.min(binCount - 1, p.predictedScore / (100 / binCount));
            actualDistribution[bin]++;
        }

        // 归一化
        for (int i = 0; i < binCount; i++) {
            actualDistribution[i] /= predictions.size();
        }

        // PSI = Σ(Act_i - Exp_i) * ln(Act_i / Exp_i)
        double psi = 0.0;
        for (int i = 0; i < binCount; i++) {
            double act = Math.max(actualDistribution[i], 0.0001);
            double exp = Math.max(expectedDistribution[i], 0.0001);
            psi += (act - exp) * Math.log(act / exp);
        }

        return psi;
    }

    /**
     * 从评估指标JSON中提取数值
     */
    private Double getMetricValue(CreditScoreModel model, String metricName) {
        if (model.getEvaluationMetrics() == null) return null;
        try {
            Map<String, Object> metrics = objectMapper.readValue(model.getEvaluationMetrics(),
                    new TypeReference<Map<String, Object>>() {});
            Object value = metrics.get(metricName);
            if (value instanceof Number) {
                return ((Number) value).doubleValue();
            }
        } catch (Exception e) {
            log.warn("获取指标值失败: {}", metricName, e);
        }
        return null;
    }

    /**
     * 比较两个指标值
     */
    private Map<String, Object> compareMetric(Double v1, Double v2) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("model1Value", v1);
        result.put("model2Value", v2);
        if (v1 != null && v2 != null) {
            result.put("diff", BigDecimal.valueOf(v1 - v2).setScale(4, RoundingMode.HALF_UP).doubleValue());
            result.put("better", v1 > v2 ? "model1" : (v2 > v1 ? "model2" : "equal"));
        }
        return result;
    }

    /**
     * 提取特征值
     */
    private List<Object> extractFeatureValues(String featureName, List<Company> companies) {
        List<Object> values = new ArrayList<>();
        for (Company c : companies) {
            Object value = null;
            switch (featureName) {
                case "registeredCapital": value = c.getRegisteredCapital(); break;
                case "annualRevenue": value = c.getAnnualRevenue(); break;
                case "employeeCount": value = c.getEmployeeCount(); break;
                case "establishmentYears":
                    if (c.getEstablishmentDate() != null) {
                        value = (long) Period.between(c.getEstablishmentDate(), LocalDate.now()).getYears();
                    }
                    break;
                case "creditScore": value = c.getCreditScore(); break;
                case "industry":
                case "businessStatus":
                    try {
                        value = (String) Company.class.getMethod("get" + Character.toUpperCase(featureName.charAt(0))
                                + featureName.substring(1)).invoke(c);
                    } catch (Exception e) {
                        log.warn("提取特征值失败: {}", featureName, e);
                    }
                    break;
                default:
                    log.warn("不支持的特征: {}", featureName);
            }
            if (value != null) {
                values.add(value);
            }
        }
        return values;
    }

    /**
     * 计算WoE分箱
     */
    private List<Map<String, Object>> calculateWoEBins(List<Object> values, List<Company> companies, String featureName) {
        List<Map<String, Object>> bins = new ArrayList<>();

        if (values.isEmpty()) return bins;

        // 判断特征类型
        boolean isNumeric = values.get(0) instanceof Number;

        if (isNumeric) {
            // 数值型：等频分箱
            List<Double> sortedValues = values.stream()
                    .map(v -> ((Number) v).doubleValue())
                    .sorted()
                    .collect(Collectors.toList());

            int binCount = Math.min(5, sortedValues.size() / 2);
            if (binCount < 1) binCount = 1;

            int binSize = sortedValues.size() / binCount;
            for (int i = 0; i < binCount; i++) {
                int startIdx = i * binSize;
                int endIdx = (i == binCount - 1) ? sortedValues.size() : (i + 1) * binSize;
                double binMin = sortedValues.get(startIdx);
                double binMax = sortedValues.get(Math.min(endIdx - 1, sortedValues.size() - 1));

                List<Company> binCompanies = new ArrayList<>();
                for (Company c : companies) {
                    Object val = extractFeatureValueForCompany(featureName, c);
                    if (val instanceof Number) {
                        double dval = ((Number) val).doubleValue();
                        if (dval >= binMin && dval <= binMax) {
                            binCompanies.add(c);
                        }
                    }
                }
                bins.add(buildWoEBin(i, binMin + "-" + binMax, binCompanies, companies.size()));
            }
        } else {
            // 类别型：按值分箱
            Map<String, List<Company>> groups = new LinkedHashMap<>();
            for (int i = 0; i < values.size(); i++) {
                String key = String.valueOf(values.get(i));
                groups.computeIfAbsent(key, k -> new ArrayList<>()).add(companies.get(i));
            }

            int idx = 0;
            for (Map.Entry<String, List<Company>> entry : groups.entrySet()) {
                bins.add(buildWoEBin(idx++, entry.getKey(), entry.getValue(), companies.size()));
            }
        }

        return bins;
    }

    private Object extractFeatureValueForCompany(String featureName, Company c) {
        switch (featureName) {
            case "registeredCapital": return c.getRegisteredCapital();
            case "annualRevenue": return c.getAnnualRevenue();
            case "employeeCount": return c.getEmployeeCount();
            case "establishmentYears":
                return c.getEstablishmentDate() != null
                        ? (long) Period.between(c.getEstablishmentDate(), LocalDate.now()).getYears() : 0;
            case "creditScore": return c.getCreditScore();
            case "businessStatus": return c.getBusinessStatus();
            case "industry": return c.getIndustry();
            default: return null;
        }
    }

    private Map<String, Object> buildWoEBin(int index, String binLabel, List<Company> binCompanies, int totalCount) {
        Map<String, Object> bin = new LinkedHashMap<>();
        bin.put("binIndex", index);
        bin.put("binLabel", binLabel);
        bin.put("count", binCompanies.size());
        bin.put("percentage", BigDecimal.valueOf((double) binCompanies.size() / totalCount * 100)
                .setScale(2, RoundingMode.HALF_UP).doubleValue() + "%");

        // 计算好坏样本
        long good = binCompanies.stream().filter(c -> c.getCreditScore() != null && c.getCreditScore() >= 50).count();
        long bad = binCompanies.size() - good;

        bin.put("goodCount", good);
        bin.put("badCount", bad);

        double goodRate = (double) good / Math.max(1, binCompanies.size());
        double badRate = (double) bad / Math.max(1, binCompanies.size());
        bin.put("goodRate", BigDecimal.valueOf(goodRate * 100).setScale(2, RoundingMode.HALF_UP).doubleValue() + "%");
        bin.put("badRate", BigDecimal.valueOf(badRate * 100).setScale(2, RoundingMode.HALF_UP).doubleValue() + "%");

        // WoE = ln(Good_i/Good_total / Bad_i/Bad_total)
        long totalGood = binCompanies.stream()
                .filter(c -> c.getCreditScore() != null && c.getCreditScore() >= 50).count();
        long totalBad = Math.max(1, binCompanies.size() - totalGood);

        double distGood = Math.max(0.0001, (double) good / Math.max(1, totalGood));
        double distBad = Math.max(0.0001, (double) bad / Math.max(1, totalBad));
        double woe = Math.log(distGood / distBad);
        bin.put("woe", BigDecimal.valueOf(woe).setScale(4, RoundingMode.HALF_UP).doubleValue());

        // IV = (DistGood - DistBad) * WoE
        double iv = (distGood - distBad) * woe;
        bin.put("iv", BigDecimal.valueOf(iv).setScale(4, RoundingMode.HALF_UP).doubleValue());

        return bin;
    }

    /**
     * 判断单调性
     */
    private boolean checkMonotonicity(List<Map<String, Object>> bins) {
        if (bins.size() < 3) return true;

        List<Double> woeValues = bins.stream()
                .map(b -> (Double) b.getOrDefault("woe", 0.0))
                .collect(Collectors.toList());

        // 检查单调递增或递减
        boolean increasing = true;
        boolean decreasing = true;
        for (int i = 1; i < woeValues.size(); i++) {
            if (woeValues.get(i) < woeValues.get(i - 1)) increasing = false;
            if (woeValues.get(i) > woeValues.get(i - 1)) decreasing = false;
        }

        return increasing || decreasing;
    }

    /**
     * IV值评估等级
     */
    private String evaluateIVLevel(double iv) {
        if (iv < 0.02) return "无预测能力";
        if (iv < 0.1) return "弱预测能力";
        if (iv < 0.3) return "中等预测能力";
        if (iv < 0.5) return "强预测能力";
        return "极强预测能力（需验证过拟合）";
    }

    /**
     * 计算信用等级
     */
    public String calculateCreditLevel(Integer score) {
        if (score == null) return "NR";
        if (score >= 90) return "AAA";
        if (score >= 80) return "AA";
        if (score >= 70) return "A";
        if (score >= 60) return "BBB";
        if (score >= 50) return "BB";
        if (score >= 40) return "B";
        return "C";
    }

    /**
     * 计算风险等级
     */
    public String calculateRiskLevel(Integer score) {
        if (score == null) return "MEDIUM";
        if (score >= 80) return "LOW";
        if (score >= 60) return "MEDIUM";
        return "HIGH";
    }

    /**
     * 内部类：评分预测结果
     */
    static class ScorePrediction {
        int predictedScore;
        int actualLabel;
        int predictedLabel;

        ScorePrediction(int predictedScore, int actualLabel, int predictedLabel) {
            this.predictedScore = predictedScore;
            this.actualLabel = actualLabel;
            this.predictedLabel = predictedLabel;
        }
    }
}
