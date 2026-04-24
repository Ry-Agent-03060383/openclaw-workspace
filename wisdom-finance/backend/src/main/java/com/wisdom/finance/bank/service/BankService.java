package com.wisdom.finance.bank.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.bank.entity.BankApiLog;
import com.wisdom.finance.bank.entity.BankProduct;
import com.wisdom.finance.bank.mapper.BankApiLogRepository;
import com.wisdom.finance.bank.mapper.BankProductRepository;
import com.wisdom.finance.user.entity.Bank;
import com.wisdom.finance.user.mapper.BankRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * 银行服务 - 银行业务流程
 */
@Service
@RequiredArgsConstructor
public class BankService {

    private static final Logger logger = LoggerFactory.getLogger(BankService.class);

    private final BankRepository bankRepository;
    private final BankProductRepository bankProductRepository;
    private final BankApiLogRepository bankApiLogRepository;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    /**
     * 创建银行
     */
    @Transactional
    public Bank createBank(Bank bank) {
        logger.info("创建银行: {}", bank.getBankName());
        bank.setStatus("ACTIVE");
        return bankRepository.save(bank);
    }

    /**
     * 更新银行信息
     */
    @Transactional
    public Bank updateBank(Long bankId, Bank bank) {
        logger.info("更新银行信息，银行ID: {}", bankId);
        Bank existing = bankRepository.findById(bankId)
                .orElseThrow(() -> new RuntimeException("银行不存在"));
        
        if (bank.getBankName() != null) existing.setBankName(bank.getBankName());
        if (bank.getShortName() != null) existing.setShortName(bank.getShortName());
        if (bank.getContactPerson() != null) existing.setContactPerson(bank.getContactPerson());
        if (bank.getContactPhone() != null) existing.setContactPhone(bank.getContactPhone());
        if (bank.getContactEmail() != null) existing.setContactEmail(bank.getContactEmail());
        if (bank.getAddress() != null) existing.setAddress(bank.getAddress());
        if (bank.getStatus() != null) existing.setStatus(bank.getStatus());
        if (bank.getApiUrl() != null) existing.setApiUrl(bank.getApiUrl());
        if (bank.getApiKey() != null) existing.setApiKey(bank.getApiKey());
        if (bank.getRemark() != null) existing.setRemark(bank.getRemark());
        
        return bankRepository.save(existing);
    }

    /**
     * 获取银行列表
     */
    public List<Bank> getBanks() {
        return bankRepository.findAll();
    }

    /**
     * 获取银行详情
     */
    public Bank getBank(Long bankId) {
        return bankRepository.findById(bankId).orElse(null);
    }

    /**
     * 创建银行产品
     */
    @Transactional
    public BankProduct createBankProduct(BankProduct product) {
        logger.info("创建银行产品: {}", product.getProductName());
        product.setStatus("ACTIVE");
        return bankProductRepository.save(product);
    }

    /**
     * 获取银行产品列表
     */
    public List<BankProduct> getBankProducts() {
        return bankProductRepository.findByStatus("ACTIVE");
    }

    /**
     * 根据银行获取产品
     */
    public List<BankProduct> getBankProductsByBank(Long bankId) {
        return bankProductRepository.findByBankId(bankId);
    }

    /**
     * 调用银行API
     */
    @Transactional
    public <T> T callBankApi(Long bankId, String apiType, String endpoint, Map<String, Object> params, 
                           Class<T> responseClass, Long relatedId, String relatedType) {
        logger.info("调用银行API，银行ID: {}, API类型: {}", bankId, apiType);
        
        Bank bank = bankRepository.findById(bankId)
                .orElseThrow(() -> new RuntimeException("银行不存在"));
        
        BankApiLog apiLog = new BankApiLog();
        apiLog.setBankId(bankId);
        apiLog.setApiType(apiType);
        apiLog.setRequestUrl(bank.getApiUrl() + endpoint);
        apiLog.setRequestParams(convertToJson(params));
        apiLog.setStatus("PROCESSING");
        apiLog.setRelatedId(relatedId);
        apiLog.setRelatedType(relatedType);
        
        BankApiLog savedLog = bankApiLogRepository.save(apiLog);
        
        long startTime = System.currentTimeMillis();
        T response = null;
        
        try {
            // 实际项目中这里会调用真实的银行API
            // 这里模拟API调用
            logger.info("模拟调用银行API: {}", savedLog.getRequestUrl());
            
            // 模拟响应
            response = createMockResponse(responseClass);
            
            savedLog.setStatus("SUCCESS");
            savedLog.setResponseData(convertToJson(response));
            savedLog.setResponseTime(LocalDateTime.now());
            savedLog.setProcessingTime(System.currentTimeMillis() - startTime);
            
        } catch (Exception e) {
            logger.error("银行API调用失败", e);
            savedLog.setStatus("FAILED");
            savedLog.setErrorMessage(e.getMessage());
            savedLog.setResponseTime(LocalDateTime.now());
            savedLog.setProcessingTime(System.currentTimeMillis() - startTime);
            throw new RuntimeException("银行API调用失败: " + e.getMessage());
        } finally {
            bankApiLogRepository.save(savedLog);
        }
        
        return response;
    }

    /**
     * 获取API调用日志
     */
    public List<BankApiLog> getApiLogs(Long bankId, String status, String apiType) {
        if (bankId != null) {
            return bankApiLogRepository.findByBankId(bankId);
        } else if (status != null) {
            return bankApiLogRepository.findByStatus(status);
        } else if (apiType != null) {
            return bankApiLogRepository.findByApiType(apiType);
        } else {
            return bankApiLogRepository.findAll();
        }
    }

    /**
     * 转换为JSON
     */
    private String convertToJson(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            logger.warn("JSON转换失败", e);
            return "{}";
        }
    }

    /**
     * 创建模拟响应
     */
    private <T> T createMockResponse(Class<T> responseClass) {
        try {
            if (responseClass == String.class) {
                return (T) "{\"code\": \"0000\", \"message\": \"success\", \"data\": {}}";
            }
            return responseClass.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            logger.warn("创建模拟响应失败", e);
            return null;
        }
    }
}
