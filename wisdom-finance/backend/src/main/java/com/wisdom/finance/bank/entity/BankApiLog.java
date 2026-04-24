package com.wisdom.finance.bank.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import com.wisdom.finance.user.entity.Bank;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;

/**
 * 银行API调用日志 - 银行接口交互记录
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_bank_api_log")
public class BankApiLog extends BaseEntity {
    
    @Column(name = "bank_id")
    private Long bankId; // 银行ID
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bank_id", insertable = false, updatable = false)
    private Bank bank;
    
    @Column(name = "api_type", length = 50)
    private String apiType; // API类型：贷款申请/信用查询/还款等
    
    @Column(name = "request_url", length = 200)
    private String requestUrl; // 请求URL
    
    @Column(name = "request_params", columnDefinition = "TEXT")
    private String requestParams; // 请求参数
    
    @Column(name = "response_data", columnDefinition = "TEXT")
    private String responseData; // 响应数据
    
    @Column(name = "status", length = 20)
    private String status; // 状态：SUCCESS/FAILED
    
    @Column(name = "error_message", length = 500)
    private String errorMessage; // 错误信息
    
    @Column(name = "response_time")
    private LocalDateTime responseTime; // 响应时间
    
    @Column(name = "processing_time")
    private Long processingTime; // 处理时间（毫秒）
    
    @Column(name = "related_id")
    private Long relatedId; // 关联业务ID
    
    @Column(name = "related_type", length = 50)
    private String relatedType; // 关联业务类型
    
    public Long getBankId() {
        return bankId;
    }
    
    public void setBankId(Long bankId) {
        this.bankId = bankId;
    }
    
    public Bank getBank() {
        return bank;
    }
    
    public void setBank(Bank bank) {
        this.bank = bank;
    }
    
    public String getApiType() {
        return apiType;
    }
    
    public void setApiType(String apiType) {
        this.apiType = apiType;
    }
    
    public String getRequestUrl() {
        return requestUrl;
    }
    
    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl;
    }
    
    public String getRequestParams() {
        return requestParams;
    }
    
    public void setRequestParams(String requestParams) {
        this.requestParams = requestParams;
    }
    
    public String getResponseData() {
        return responseData;
    }
    
    public void setResponseData(String responseData) {
        this.responseData = responseData;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getErrorMessage() {
        return errorMessage;
    }
    
    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
    
    public LocalDateTime getResponseTime() {
        return responseTime;
    }
    
    public void setResponseTime(LocalDateTime responseTime) {
        this.responseTime = responseTime;
    }
    
    public Long getProcessingTime() {
        return processingTime;
    }
    
    public void setProcessingTime(Long processingTime) {
        this.processingTime = processingTime;
    }
    
    public Long getRelatedId() {
        return relatedId;
    }
    
    public void setRelatedId(Long relatedId) {
        this.relatedId = relatedId;
    }
    
    public String getRelatedType() {
        return relatedType;
    }
    
    public void setRelatedType(String relatedType) {
        this.relatedType = relatedType;
    }
}
