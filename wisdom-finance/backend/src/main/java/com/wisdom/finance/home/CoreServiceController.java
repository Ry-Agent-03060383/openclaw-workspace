package com.wisdom.finance.home;

import com.wisdom.finance.common.controller.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 核心服务公开接口 — 无需登录
 */
@RestController
@RequestMapping("/api/core-services")
@RequiredArgsConstructor
public class CoreServiceController {

    private final CoreServiceService coreServiceService;

    @GetMapping
    public Result<CoreServiceDTO> getCoreServices() {
        return Result.success(coreServiceService.getCoreServices());
    }
}