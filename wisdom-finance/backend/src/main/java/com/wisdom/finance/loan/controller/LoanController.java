package com.wisdom.finance.loan.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.loan.dto.LoanApplicationCreateDTO;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.service.LoanService;
import com.wisdom.finance.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loan")
@RequiredArgsConstructor
public class LoanController {
    private final LoanService loanService;

    @PostMapping("/apply")
    public Result<LoanApplication> apply(@AuthenticationPrincipal User user,
                                         @Valid @RequestBody LoanApplicationCreateDTO dto) {
        return Result.success(loanService.apply(user, dto));
    }

    @GetMapping("/my")
    public Result<List<LoanApplication>> listMy(@AuthenticationPrincipal User user) {
        return Result.success(loanService.listByUser(user));
    }

    @GetMapping("/list")
    public Result<List<LoanApplication>> listAll() {
        return Result.success(loanService.listAll());
    }

    @GetMapping("/pending")
    public Result<List<LoanApplication>> listPending() {
        return Result.success(loanService.listPending());
    }

    @PostMapping("/{id}/approve")
    public Result<LoanApplication> approve(@AuthenticationPrincipal User user,
                                           @PathVariable Long id) {
        return Result.success(loanService.approve(id, user.getId()));
    }

    @PostMapping("/{id}/reject")
    public Result<LoanApplication> reject(@AuthenticationPrincipal User user,
                                          @PathVariable Long id,
                                          @RequestParam String reason) {
        return Result.success(loanService.reject(id, user.getId(), reason));
    }
}
