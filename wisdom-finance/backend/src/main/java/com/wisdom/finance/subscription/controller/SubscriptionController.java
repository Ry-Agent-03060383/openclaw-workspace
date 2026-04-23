package com.wisdom.finance.subscription.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.subscription.entity.Subscription;
import com.wisdom.finance.subscription.entity.SubscriptionService;
import com.wisdom.finance.subscription.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 订阅服务控制器 - 焦作市智慧金服平台的订阅服务
 */
@RestController
@RequestMapping("/api/subscription")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    /**
     * 创建订阅服务
     */
    @PostMapping("/service/create")
    public Result<SubscriptionService> createSubscriptionService(@RequestBody SubscriptionService service) {
        try {
            SubscriptionService created = subscriptionService.createSubscriptionService(service);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新订阅服务
     */
    @PutMapping("/service/{serviceId}")
    public Result<SubscriptionService> updateSubscriptionService(@PathVariable Long serviceId, @RequestBody SubscriptionService service) {
        try {
            SubscriptionService updated = subscriptionService.updateSubscriptionService(serviceId, service);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取订阅服务详情
     */
    @GetMapping("/service/{serviceId}")
    public Result<SubscriptionService> getSubscriptionService(@PathVariable Long serviceId) {
        SubscriptionService service = subscriptionService.getSubscriptionService(serviceId);
        if (service == null) {
            return Result.error("服务不存在");
        }
        return Result.success(service);
    }

    /**
     * 获取订阅服务列表
     */
    @GetMapping("/services")
    public Result<List<SubscriptionService>> getSubscriptionServices(@RequestParam(required = false) String serviceType,
                                                                 @RequestParam(required = false) String targetRole,
                                                                 @RequestParam(required = false) String status) {
        List<SubscriptionService> services = subscriptionService.getSubscriptionServices(serviceType, targetRole, status);
        return Result.success(services);
    }

    /**
     * 创建订阅
     */
    @PostMapping("/create")
    public Result<Subscription> createSubscription(@RequestBody Subscription subscription) {
        try {
            Subscription created = subscriptionService.createSubscription(subscription);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 支付订阅
     */
    @PostMapping("/{subscriptionId}/pay")
    public Result<Subscription> paySubscription(@PathVariable Long subscriptionId,
                                             @RequestParam String paymentMethod,
                                             @RequestParam String transactionId) {
        try {
            Subscription subscription = subscriptionService.paySubscription(subscriptionId, paymentMethod, transactionId);
            return Result.success(subscription);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 取消订阅
     */
    @PostMapping("/{subscriptionId}/cancel")
    public Result<Subscription> cancelSubscription(@PathVariable Long subscriptionId,
                                                @RequestParam String cancelReason) {
        try {
            Subscription subscription = subscriptionService.cancelSubscription(subscriptionId, cancelReason);
            return Result.success(subscription);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 续费订阅
     */
    @PostMapping("/{subscriptionId}/renew")
    public Result<Subscription> renewSubscription(@PathVariable Long subscriptionId) {
        try {
            Subscription subscription = subscriptionService.renewSubscription(subscriptionId);
            return Result.success(subscription);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取订阅详情
     */
    @GetMapping("/{subscriptionId}")
    public Result<Subscription> getSubscription(@PathVariable Long subscriptionId) {
        Subscription subscription = subscriptionService.getSubscription(subscriptionId);
        if (subscription == null) {
            return Result.error("订阅不存在");
        }
        return Result.success(subscription);
    }

    /**
     * 获取用户的订阅列表
     */
    @GetMapping("/user/{userId}")
    public Result<List<Subscription>> getUserSubscriptions(@PathVariable Long userId) {
        List<Subscription> subscriptions = subscriptionService.getUserSubscriptions(userId);
        return Result.success(subscriptions);
    }

    /**
     * 检查订阅是否有效
     */
    @GetMapping("/check")
    public Result<Boolean> checkSubscription(@RequestParam Long userId, @RequestParam Long serviceId) {
        boolean isValid = subscriptionService.isSubscriptionValid(userId, serviceId);
        return Result.success(isValid);
    }
}
