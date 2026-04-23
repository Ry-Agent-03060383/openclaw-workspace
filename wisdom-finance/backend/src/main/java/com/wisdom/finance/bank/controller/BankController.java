package com.wisdom.finance.bank.controller;

import com.wisdom.finance.bank.entity.BankApiLog;
import com.wisdom.finance.bank.entity.BankProduct;
import com.wisdom.finance.bank.service.BankService;
import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.user.entity.Bank;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 银行控制器 - 银行业务流程
 */
@RestController
@RequestMapping("/api/bank")
@RequiredArgsConstructor
public class BankController {

    private final BankService bankService;

    /**
     * 创建银行
     */
    @PostMapping("/banks")
    public Result<Bank> createBank(@RequestBody Bank bank) {
        try {
            Bank created = bankService.createBank(bank);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新银行信息
     */
    @PutMapping("/banks/{bankId}")
    public Result<Bank> updateBank(@PathVariable Long bankId, @RequestBody Bank bank) {
        try {
            Bank updated = bankService.updateBank(bankId, bank);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取银行列表
     */
    @GetMapping("/banks")
    public Result<List<Bank>> getBanks() {
        List<Bank> banks = bankService.getBanks();
        return Result.success(banks);
    }

    /**
     * 获取银行详情
     */
    @GetMapping("/banks/{bankId}")
    public Result<Bank> getBank(@PathVariable Long bankId) {
        Bank bank = bankService.getBank(bankId);
        if (bank == null) {
            return Result.error("银行不存在");
        }
        return Result.success(bank);
    }

    /**
     * 创建银行产品
     */
    @PostMapping("/products")
    public Result<BankProduct> createBankProduct(@RequestBody BankProduct product) {
        try {
            BankProduct created = bankService.createBankProduct(product);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取银行产品列表
     */
    @GetMapping("/products")
    public Result<List<BankProduct>> getBankProducts() {
        List<BankProduct> products = bankService.getBankProducts();
        return Result.success(products);
    }

    /**
     * 根据银行获取产品
     */
    @GetMapping("/banks/{bankId}/products")
    public Result<List<BankProduct>> getBankProductsByBank(@PathVariable Long bankId) {
        List<BankProduct> products = bankService.getBankProductsByBank(bankId);
        return Result.success(products);
    }

    /**
     * 调用银行API
     */
    @PostMapping("/api/call")
    public Result<Object> callBankApi(@RequestParam Long bankId,
                                    @RequestParam String apiType,
                                    @RequestParam String endpoint,
                                    @RequestBody Map<String, Object> params,
                                    @RequestParam(required = false) Long relatedId,
                                    @RequestParam(required = false) String relatedType) {
        try {
            Object response = bankService.callBankApi(bankId, apiType, endpoint, params, 
                                                  Object.class, relatedId, relatedType);
            return Result.success(response);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取API调用日志
     */
    @GetMapping("/api/logs")
    public Result<List<BankApiLog>> getApiLogs(@RequestParam(required = false) Long bankId,
                                             @RequestParam(required = false) String status,
                                             @RequestParam(required = false) String apiType) {
        List<BankApiLog> logs = bankService.getApiLogs(bankId, status, apiType);
        return Result.success(logs);
    }
}
