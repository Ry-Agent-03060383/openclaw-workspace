package com.wisdom.finance.dashboard;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public Result<DashboardDTO> getStats(@AuthenticationPrincipal User user) {
        return Result.success(dashboardService.getDashboard(user));
    }
}
