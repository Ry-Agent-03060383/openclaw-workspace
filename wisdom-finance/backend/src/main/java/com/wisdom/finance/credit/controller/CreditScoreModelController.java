package com.wisdom.finance.credit.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.entity.CreditScoreModel;
import com.wisdom.finance.credit.service.CreditScoreModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 信用评分模型控制器 - 信用评分模型管理
 */
@RestController
@RequestMapping("/api/credit/model")
@RequiredArgsConstructor
public class CreditScoreModelController {

    private final CreditScoreModelService creditScoreModelService;

    /**
     * 创建信用评分模型
     */
    @PostMapping("/create")
    public Result<CreditScoreModel> createCreditScoreModel(@RequestBody CreditScoreModel model) {
        try {
            CreditScoreModel created = creditScoreModelService.createCreditScoreModel(model);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新信用评分模型
     */
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

    /**
     * 获取信用评分模型详情
     */
    @GetMapping("/{modelId}")
    public Result<CreditScoreModel> getCreditScoreModel(@PathVariable Long modelId) {
        CreditScoreModel model = creditScoreModelService.getCreditScoreModel(modelId);
        if (model == null) {
            return Result.error("信用评分模型不存在");
        }
        return Result.success(model);
    }

    /**
     * 获取激活的信用评分模型列表
     */
    @GetMapping("/active")
    public Result<List<CreditScoreModel>> getActiveCreditScoreModels() {
        List<CreditScoreModel> models = creditScoreModelService.getActiveCreditScoreModels();
        return Result.success(models);
    }

    /**
     * 使用模型计算信用评分
     */
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
}
