package com.wisdom.finance.credit.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.entity.CreditScoreModel;
import com.wisdom.finance.credit.service.CreditQueryService;
import com.wisdom.finance.credit.service.CreditScoreModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 信用评分模型控制器 - 信用评分模型管理 (增强版 v2.0)
 */
@RestController
@RequestMapping("/api/credit/model")
@RequiredArgsConstructor
public class CreditScoreModelController {

    private final CreditScoreModelService creditScoreModelService;
    private final CreditQueryService creditQueryService;

    // ============ CRUD 基础接口 ============

    @PostMapping("/create")
    public Result<CreditScoreModel> createCreditScoreModel(@RequestBody CreditScoreModel model) {
        try {
            CreditScoreModel created = creditScoreModelService.createCreditScoreModel(model);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @PutMapping("/{modelId}")
    public Result<CreditScoreModel> updateCreditScoreModel(@PathVariable Long modelId,
                                                       @RequestBody CreditScoreModel model) {
        try {
            CreditScoreModel updated = creditScoreModelService.updateCreditScoreModel(modelId, model);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    @GetMapping("/{modelId}")
    public Result<CreditScoreModel> getCreditScoreModel(@PathVariable Long modelId) {
        CreditScoreModel model = creditScoreModelService.getCreditScoreModel(modelId);
        if (model == null) {
            return Result.error("信用评分模型不存在");
        }
        return Result.success(model);
    }

    @GetMapping("/active")
    public Result<List<CreditScoreModel>> getActiveCreditScoreModels() {
        List<CreditScoreModel> models = creditScoreModelService.getActiveCreditScoreModels();
        return Result.success(models);
    }

    @GetMapping("/list")
    public Result<List<CreditScoreModel>> getAllModels() {
        List<CreditScoreModel> models = creditScoreModelService.getAllModels();
        return Result.success(models);
    }

    @PostMapping("/calculate-score")
    public Result<Integer> calculateCreditScore(@RequestBody Company company,
                                             @RequestParam Long modelId) {
        try {
            Integer score = creditScoreModelService.calculateCreditScore(company, modelId);
            return Result.success(score);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    // ============ 模型测评接口 ============

    /**
     * 模型测评：计算KS值、AUC、准确率等全部指标
     */
    @PostMapping("/{modelId}/evaluate")
    public Result<Map<String, Object>> evaluateModel(@PathVariable Long modelId) {
        try {
            List<Company> testData = creditQueryService.findAll();
            if (testData.isEmpty()) {
                return Result.error("无测试数据，请先创建企业数据");
            }
            Map<String, Object> metrics = creditScoreModelService.evaluateModel(modelId, testData);
            return Result.success(metrics);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取模型评估指标详情
     */
    @GetMapping("/{modelId}/metrics")
    public Result<Map<String, Object>> getModelMetrics(@PathVariable Long modelId) {
        try {
            Map<String, Object> metrics = creditScoreModelService.getModelMetrics(modelId);
            return Result.success(metrics);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 使用指定模型模拟评分
     */
    @PostMapping("/{modelId}/simulate")
    public Result<Map<String, Object>> simulateScore(@PathVariable Long modelId,
                                                      @RequestBody Map<String, Long> body) {
        try {
            Long companyId = body.get("companyId");
            if (companyId == null) {
                return Result.error("companyId不能为空");
            }
            Company company = creditQueryService.findById(companyId);
            if (company == null) {
                return Result.error("企业不存在");
            }
            Map<String, Object> result = creditScoreModelService.simulateScore(modelId, company);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 对比两个模型的性能
     */
    @GetMapping("/compare")
    public Result<Map<String, Object>> compareModels(@RequestParam Long model1,
                                                      @RequestParam Long model2) {
        try {
            Map<String, Object> result = creditScoreModelService.compareModels(model1, model2);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    // ============ 权重配置接口 ============

    /**
     * 获取权重配置
     */
    @GetMapping("/{modelId}/weight")
    public Result<Map<String, Object>> getWeightConfig(@PathVariable Long modelId) {
        try {
            Map<String, Object> config = creditScoreModelService.getWeightConfig(modelId);
            return Result.success(config);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新权重配置
     */
    @PutMapping("/{modelId}/weight")
    public Result<Map<String, Object>> updateWeightConfig(@PathVariable Long modelId,
                                                           @RequestBody Map<String, String> body) {
        try {
            String weightConfig = body.get("weightConfig");
            if (weightConfig == null) {
                return Result.error("weightConfig不能为空");
            }
            Map<String, Object> result = creditScoreModelService.updateWeightConfig(modelId, weightConfig);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    // ============ 特征评估接口 ============

    /**
     * 计算单个特征的IV值、WoE、单调性
     */
    @PostMapping("/feature/evaluate")
    public Result<Map<String, Object>> evaluateFeature(@RequestBody Map<String, String> body) {
        try {
            String featureName = body.get("featureName");
            if (featureName == null) {
                return Result.error("featureName不能为空");
            }
            List<Company> companies = creditQueryService.findAll();
            if (companies.isEmpty()) {
                return Result.error("无企业数据");
            }
            Map<String, Object> result = creditScoreModelService.evaluateFeature(featureName, companies);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }
}
