package com.wisdom.finance.home;

import com.wisdom.finance.common.controller.Result;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 首页公开接口 — 无需登录
 */
@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;

    @GetMapping("/stats")
    public Result<HomeDTO> getHomeStats() {
        return Result.success(homeService.getHomeStats());
    }
}