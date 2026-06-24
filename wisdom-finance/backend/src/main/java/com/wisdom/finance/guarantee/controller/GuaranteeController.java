package com.wisdom.finance.guarantee.controller;

import com.wisdom.finance.common.controller.Result;
import com.wisdom.finance.guarantee.entity.Guarantee;
import com.wisdom.finance.guarantee.entity.GuaranteeApplication;
import com.wisdom.finance.guarantee.service.GuaranteeService;
import com.wisdom.finance.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 担保控制器 - 担保业务流程
 */
@RestController
@RequestMapping("/api/guarantee")
@RequiredArgsConstructor
public class GuaranteeController {

    private final GuaranteeService guaranteeService;

    /**
     * 获取当前登录用户ID
     */
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User user) {
            return user.getId();
        }
        return null;
    }

    // ==================== 申请相关 ====================

    /**
     * GET /api/guarantee/application/list?applicantId=&status=&page=0&size=10
     */
    @GetMapping("/application/list")
    public Result<Page<GuaranteeApplication>> listApplications(
            @RequestParam(required = false) Long applicantId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<GuaranteeApplication> result = guaranteeService.listApplications(applicantId, status, page, size);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * GET /api/guarantee/application/{id}
     */
    @GetMapping("/application/{id}")
    public Result<GuaranteeApplication> getApplication(@PathVariable Long id) {
        try {
            GuaranteeApplication result = guaranteeService.getApplication(id);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * POST /api/guarantee/application
     */
    @PostMapping("/application")
    public Result<GuaranteeApplication> createApplication(@RequestBody GuaranteeApplication dto) {
        try {
            GuaranteeApplication result = guaranteeService.createApplication(dto);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * POST /api/guarantee/application/{id}/submit
     */
    @PostMapping("/application/{id}/submit")
    public Result<GuaranteeApplication> submitApplication(@PathVariable Long id) {
        try {
            GuaranteeApplication result = guaranteeService.submitApplication(id);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * POST /api/guarantee/application/{id}/review?approved=true&comment=xxx
     * 审核人从 SecurityContext 获取
     */
    @PostMapping("/application/{id}/review")
    public Result<GuaranteeApplication> reviewApplication(
            @PathVariable Long id,
            @RequestParam boolean approved,
            @RequestParam(defaultValue = "") String comment) {
        try {
            Long reviewerId = getCurrentUserId();
            GuaranteeApplication result = guaranteeService.reviewApplication(id, approved, reviewerId, comment);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    // ═══════════════════════════════════════════
    //  JSON序列化辅助 - 避免Hibernate代理序列化问题
    // ═══════════════════════════════════════════

    /** 将 Guarantee 实体转为普通 Map */
    private Map<String, Object> toGuaranteeMap(Guarantee g) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", g.getId());
        m.put("guaranteeNo", g.getGuaranteeNo());
        m.put("applicationId", g.getApplicationId());
        m.put("loanApplicationId", g.getLoanApplicationId());
        m.put("guarantorType", g.getGuarantorType());
        m.put("guarantorId", g.getGuarantorId());
        m.put("guarantorName", g.getGuarantorName());
        m.put("guaranteeAmount", g.getGuaranteeAmount());
        m.put("guaranteeRatio", g.getGuaranteeRatio());
        m.put("guaranteeType", g.getGuaranteeType());
        m.put("collateralDesc", g.getCollateralDesc());
        m.put("collateralValue", g.getCollateralValue());
        m.put("counterGuaranteeType", g.getCounterGuaranteeType());
        m.put("counterGuaranteeDesc", g.getCounterGuaranteeDesc());
        m.put("counterGuaranteeValue", g.getCounterGuaranteeValue());
        m.put("counterGuaranteeStatus", g.getCounterGuaranteeStatus());
        m.put("feeRate", g.getFeeRate());
        m.put("feeAmount", g.getFeeAmount());
        m.put("feePaid", g.getFeePaid());
        m.put("feeStatus", g.getFeeStatus());
        m.put("contractNo", g.getContractNo());
        m.put("contractFileUrl", g.getContractFileUrl());
        m.put("signedDate", g.getSignedDate());
        m.put("startDate", g.getStartDate());
        m.put("endDate", g.getEndDate());
        m.put("status", g.getStatus());
        m.put("riskLevel", g.getRiskLevel());
        m.put("remark", g.getRemark());
        m.put("releaseTime", g.getReleaseTime());
        m.put("releaseReason", g.getReleaseReason());
        m.put("createdAt", g.getCreatedAt());
        m.put("updatedAt", g.getUpdatedAt());
        return m;
    }

    /** 将 Page<Guarantee> 转为前端友好的响应结构 */
    private Map<String, Object> toGuaranteePageResponse(Page<Guarantee> page) {
        Map<String, Object> resp = new LinkedHashMap<>();
        resp.put("content", page.getContent().stream().map(this::toGuaranteeMap).collect(Collectors.toList()));
        resp.put("totalElements", page.getTotalElements());
        resp.put("totalPages", page.getTotalPages());
        resp.put("number", page.getNumber());
        resp.put("size", page.getSize());
        return resp;
    }

    // ==================== 担保相关 ====================

    /**
     * GET /api/guarantee/list?guarantorId=&status=&page=0&size=10
     */
    @GetMapping("/list")
    public Result<Map<String, Object>> listGuarantees(
            @RequestParam(required = false) Long guarantorId,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Guarantee> result = guaranteeService.listGuarantees(guarantorId, status, page, size);
            Map<String, Object> resp = new LinkedHashMap<>();
            List<Map<String, Object>> content = new ArrayList<>();
            for (Guarantee g : result.getContent()) {
                content.add(toGuaranteeMap(g));
            }
            resp.put("content", content);
            resp.put("totalElements", result.getTotalElements());
            resp.put("totalPages", result.getTotalPages());
            resp.put("number", result.getNumber());
            resp.put("size", result.getSize());
            return Result.success(resp);
        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            e.printStackTrace(new PrintWriter(sw));
            return Result.error("EX:" + e.getClass().getSimpleName() + ": " + sw.toString().substring(0, Math.min(sw.toString().length(), 300)));
        }
    }

    /**
     * GET /api/guarantee/{id}
     */
    @GetMapping("/{id}")
    public Result<Map<String, Object>> getGuarantee(@PathVariable Long id) {
        try {
            Guarantee result = guaranteeService.getGuarantee(id);
            return Result.success(toGuaranteeMap(result));
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * POST /api/guarantee/{id}/sign?contractNo=xxx
     */
    @PostMapping("/{id}/sign")
    public Result<Map<String, Object>> signGuarantee(@PathVariable Long id, @RequestParam String contractNo) {
        try {
            Guarantee result = guaranteeService.signGuarantee(id, contractNo);
            return Result.success(toGuaranteeMap(result));
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * POST /api/guarantee/{id}/counter
     * @RequestBody 含 type/desc/value
     */
    @PostMapping("/{id}/counter")
    public Result<Map<String, Object>> registerCounterGuarantee(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        try {
            String type = body.get("counterGuaranteeType") != null ? body.get("counterGuaranteeType").toString() : null;
            String desc = body.get("counterGuaranteeDesc") != null ? body.get("counterGuaranteeDesc").toString() : null;
            BigDecimal value = body.get("counterGuaranteeValue") != null ? new BigDecimal(body.get("counterGuaranteeValue").toString()) : null;
            Guarantee result = guaranteeService.registerCounterGuarantee(id, type, desc, value);
            return Result.success(toGuaranteeMap(result));
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * POST /api/guarantee/{id}/pay-fee?amount=xxx
     */
    @PostMapping("/{id}/pay-fee")
    public Result<Map<String, Object>> payFee(@PathVariable Long id, @RequestParam BigDecimal amount) {
        try {
            Guarantee result = guaranteeService.payFee(id, amount);
            return Result.success(toGuaranteeMap(result));
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * POST /api/guarantee/{id}/release?reason=xxx
     */
    @PostMapping("/{id}/release")
    public Result<Map<String, Object>> releaseGuarantee(@PathVariable Long id, @RequestParam String reason) {
        try {
            Guarantee result = guaranteeService.releaseGuarantee(id, reason);
            return Result.success(toGuaranteeMap(result));
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * POST /api/guarantee/{id}/terminate?reason=xxx
     */
    @PostMapping("/{id}/terminate")
    public Result<Map<String, Object>> terminateGuarantee(@PathVariable Long id, @RequestParam String reason) {
        try {
            Guarantee result = guaranteeService.terminateGuarantee(id, reason);
            return Result.success(toGuaranteeMap(result));
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * GET /api/guarantee/calculate-fee?amount=xxx&rate=xxx&months=xxx
     */
    @GetMapping("/calculate-fee")
    public Result<BigDecimal> calculateFee(
            @RequestParam BigDecimal amount,
            @RequestParam BigDecimal rate,
            @RequestParam Integer months) {
        try {
            BigDecimal result = guaranteeService.calculateFee(amount, rate, months);
            return Result.success(result);
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * GET /api/guarantee/by-loan/{loanId}
     */
    @GetMapping("/by-loan/{loanId}")
    public Result<List<Map<String, Object>>> findByLoan(@PathVariable Long loanId) {
        try {
            List<Guarantee> result = guaranteeService.findByLoanApplicationId(loanId);
            return Result.success(result.stream().map(this::toGuaranteeMap).collect(Collectors.toList()));
        } catch (RuntimeException e) {
            return Result.error(e.getMessage());
        }
    }
}
