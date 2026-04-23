package com.wisdom.finance.thirdparty.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.thirdparty.entity.ServiceOrder;
import com.wisdom.finance.thirdparty.entity.ThirdPartyService;
import com.wisdom.finance.thirdparty.service.ThirdPartyServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 第三方服务控制器 - 财税法等第三方服务商的业务流程
 */
@RestController
@RequestMapping("/api/thirdparty")
@RequiredArgsConstructor
public class ThirdPartyServiceController {

    private final ThirdPartyServiceService thirdPartyServiceService;

    /**
     * 创建第三方服务
     */
    @PostMapping("/service/create")
    public Result<ThirdPartyService> createService(@RequestBody ThirdPartyService service) {
        try {
            ThirdPartyService created = thirdPartyServiceService.createService(service);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 更新第三方服务
     */
    @PutMapping("/service/{serviceId}")
    public Result<ThirdPartyService> updateService(@PathVariable Long serviceId, @RequestBody ThirdPartyService service) {
        try {
            ThirdPartyService updated = thirdPartyServiceService.updateService(serviceId, service);
            return Result.success(updated);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取第三方服务详情
     */
    @GetMapping("/service/{serviceId}")
    public Result<ThirdPartyService> getService(@PathVariable Long serviceId) {
        ThirdPartyService service = thirdPartyServiceService.getService(serviceId);
        if (service == null) {
            return Result.error("服务不存在");
        }
        return Result.success(service);
    }

    /**
     * 获取服务列表
     */
    @GetMapping("/services")
    public Result<List<ThirdPartyService>> getServices(@RequestParam(required = false) String serviceType,
                                                   @RequestParam(required = false) String status) {
        List<ThirdPartyService> services = thirdPartyServiceService.getServices(serviceType, status);
        return Result.success(services);
    }

    /**
     * 创建服务订单
     */
    @PostMapping("/order/create")
    public Result<ServiceOrder> createServiceOrder(@RequestBody ServiceOrder order) {
        try {
            ServiceOrder created = thirdPartyServiceService.createServiceOrder(order);
            return Result.success(created);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 支付服务订单
     */
    @PostMapping("/order/{orderId}/pay")
    public Result<ServiceOrder> payServiceOrder(@PathVariable Long orderId,
                                             @RequestParam String paymentMethod,
                                             @RequestParam String transactionId) {
        try {
            ServiceOrder order = thirdPartyServiceService.payServiceOrder(orderId, paymentMethod, transactionId);
            return Result.success(order);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 完成服务订单
     */
    @PostMapping("/order/{orderId}/complete")
    public Result<ServiceOrder> completeServiceOrder(@PathVariable Long orderId,
                                                  @RequestParam String deliverables) {
        try {
            ServiceOrder order = thirdPartyServiceService.completeServiceOrder(orderId, deliverables);
            return Result.success(order);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 评价服务订单
     */
    @PostMapping("/order/{orderId}/rate")
    public Result<ServiceOrder> rateServiceOrder(@PathVariable Long orderId,
                                              @RequestParam Integer rating,
                                              @RequestParam String review) {
        try {
            ServiceOrder order = thirdPartyServiceService.rateServiceOrder(orderId, rating, review);
            return Result.success(order);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取服务订单详情
     */
    @GetMapping("/order/{orderId}")
    public Result<ServiceOrder> getServiceOrder(@PathVariable Long orderId) {
        ServiceOrder order = thirdPartyServiceService.getServiceOrder(orderId);
        if (order == null) {
            return Result.error("订单不存在");
        }
        return Result.success(order);
    }

    /**
     * 获取订单列表
     */
    @GetMapping("/orders")
    public Result<List<ServiceOrder>> getServiceOrders(@RequestParam(required = false) Long userId,
                                                   @RequestParam(required = false) Long providerId,
                                                   @RequestParam(required = false) String orderStatus) {
        List<ServiceOrder> orders = thirdPartyServiceService.getServiceOrders(userId, providerId, orderStatus);
        return Result.success(orders);
    }
}
