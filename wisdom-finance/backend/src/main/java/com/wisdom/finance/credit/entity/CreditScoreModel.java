package com.wisdom.finance.credit.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

/**
 * 信用评分模型实体 - 信用评分模型配置
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_credit_score_model")
public class CreditScoreModel extends BaseEntity {
    
    @Column(name = "model_code", unique = true, length = 50, nullable = false)
    private String modelCode; // 模型代码
    
    @Column(name = "model_name", length = 100, nullable = false)
    private String modelName; // 模型名称
    
    @Column(name = "version", length = 20)
    private String version; // 模型版本
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description; // 模型描述
    
    @Column(name = "model_type", length = 50)
    private String modelType; // 模型类型：规则型/机器学习型
    
    @Column(name = "status", length = 20)
    private String status; // 状态：ACTIVE/INACTIVE
    
    @Column(name = "score_range_min")
    private Integer scoreRangeMin; // 评分范围最小值
    
    @Column(name = "score_range_max")
    private Integer scoreRangeMax; // 评分范围最大值
    
    @Column(name = "default_score")
    private Integer defaultScore; // 默认评分
    
    @Column(name = "weight_config", columnDefinition = "TEXT")
    private String weightConfig; // 权重配置 JSON
    
    @Column(name = "rule_config", columnDefinition = "TEXT")
    private String ruleConfig; // 规则配置 JSON
    
    @Column(name = "evaluation_metrics", columnDefinition = "TEXT")
    private String evaluationMetrics; // 评估指标 JSON
    
    @Column(name = "last_training_date")
    private java.time.LocalDate lastTrainingDate; // 最后训练日期
    
    @Column(name = "accuracy", precision = 8, scale = 4)
    private BigDecimal accuracy; // 模型准确率
    
    @Column(name = "created_by", length = 50)
    private String createdBy; // 创建人
    
    @Column(name = "updated_by", length = 50)
    private String updatedBy; // 更新人
    
    public String getModelCode() {
        return modelCode;
    }
    
    public void setModelCode(String modelCode) {
        this.modelCode = modelCode;
    }
    
    public String getModelName() {
        return modelName;
    }
    
    public void setModelName(String modelName) {
        this.modelName = modelName;
    }
    
    public String getVersion() {
        return version;
    }
    
    public void setVersion(String version) {
        this.version = version;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getModelType() {
        return modelType;
    }
    
    public void setModelType(String modelType) {
        this.modelType = modelType;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public Integer getScoreRangeMin() {
        return scoreRangeMin;
    }
    
    public void setScoreRangeMin(Integer scoreRangeMin) {
        this.scoreRangeMin = scoreRangeMin;
    }
    
    public Integer getScoreRangeMax() {
        return scoreRangeMax;
    }
    
    public void setScoreRangeMax(Integer scoreRangeMax) {
        this.scoreRangeMax = scoreRangeMax;
    }
    
    public Integer getDefaultScore() {
        return defaultScore;
    }
    
    public void setDefaultScore(Integer defaultScore) {
        this.defaultScore = defaultScore;
    }
    
    public String getWeightConfig() {
        return weightConfig;
    }
    
    public void setWeightConfig(String weightConfig) {
        this.weightConfig = weightConfig;
    }
    
    public String getRuleConfig() {
        return ruleConfig;
    }
    
    public void setRuleConfig(String ruleConfig) {
        this.ruleConfig = ruleConfig;
    }
    
    public String getEvaluationMetrics() {
        return evaluationMetrics;
    }
    
    public void setEvaluationMetrics(String evaluationMetrics) {
        this.evaluationMetrics = evaluationMetrics;
    }
    
    public java.time.LocalDate getLastTrainingDate() {
        return lastTrainingDate;
    }
    
    public void setLastTrainingDate(java.time.LocalDate lastTrainingDate) {
        this.lastTrainingDate = lastTrainingDate;
    }
    
    public BigDecimal getAccuracy() {
        return accuracy;
    }
    
    public void setAccuracy(BigDecimal accuracy) {
        this.accuracy = accuracy;
    }
    
    public String getCreatedBy() {
        return createdBy;
    }
    
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    
    public String getUpdatedBy() {
        return updatedBy;
    }
    
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
}
