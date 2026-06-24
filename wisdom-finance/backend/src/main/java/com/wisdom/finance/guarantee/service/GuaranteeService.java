package com.wisdom.finance.guarantee.service;

import com.wisdom.finance.guarantee.entity.Guarantee;
import com.wisdom.finance.guarantee.entity.GuaranteeApplication;
import com.wisdom.finance.guarantee.mapper.GuaranteeApplicationRepository;
import com.wisdom.finance.guarantee.mapper.GuaranteeRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 担保服务 - 担保业务流程
 */
@Service
@RequiredArgsConstructor
public class GuaranteeService {

    private static final Logger log = LoggerFactory.getLogger(GuaranteeService.class);

    private final GuaranteeApplicationRepository guaranteeApplicationRepository;
    private final GuaranteeRepository guaranteeRepository;

    // ==================== 申请相关 ====================

    /**
     * 创建担保申请草稿 DRAFT
     */
    @Transactional
    public GuaranteeApplication createApplication(GuaranteeApplication dto) {
        log.info("创建担保申请，申请人: {}", dto.getApplicantName());
        dto.setId(null);
        dto.setAppNo("GA" + System.currentTimeMillis());
        dto.setStatus("DRAFT");
        return guaranteeApplicationRepository.save(dto);
    }

    /**
     * 提交申请 DRAFT → SUBMITTED
     */
    @Transactional
    public GuaranteeApplication submitApplication(Long id) {
        log.info("提交担保申请，申请ID: {}", id);
        GuaranteeApplication app = guaranteeApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保申请不存在"));
        if (!"DRAFT".equals(app.getStatus())) {
            throw new RuntimeException("只有草稿状态的申请可以提交");
        }
        app.setStatus("SUBMITTED");
        app.setSubmitTime(LocalDateTime.now());
        return guaranteeApplicationRepository.save(app);
    }

    /**
     * 审核申请 SUBMITTED → APPROVED / REJECTED
     * 审核通过时自动创建 Guarantee 记录（PENDING_SIGN 状态）
     */
    @Transactional
    public GuaranteeApplication reviewApplication(Long id, boolean approved, Long reviewerId, String comment) {
        log.info("审核担保申请，申请ID: {}, 通过: {}, 审核人: {}", id, approved, reviewerId);
        GuaranteeApplication app = guaranteeApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保申请不存在"));
        if (!"SUBMITTED".equals(app.getStatus())) {
            throw new RuntimeException("只有已提交的申请可以审核");
        }
        app.setReviewerId(reviewerId);
        app.setReviewComment(comment);
        app.setReviewTime(LocalDateTime.now());

        if (approved) {
            app.setStatus("APPROVED");
            guaranteeApplicationRepository.save(app);
            // 审核通过时自动创建担保记录
            createGuaranteeFromApplication(app);
        } else {
            app.setStatus("REJECTED");
            app.setRejectionReason(comment);
            guaranteeApplicationRepository.save(app);
        }
        return app;
    }

    /**
     * 从审核通过的申请创建担保记录（PENDING_SIGN 状态）
     */
    private Guarantee createGuaranteeFromApplication(GuaranteeApplication application) {
        log.info("从申请创建担保记录，申请ID: {}", application.getId());
        Guarantee g = new Guarantee();
        g.setGuaranteeNo("G" + System.currentTimeMillis());
        g.setApplicationId(application.getId());
        g.setLoanApplicationId(application.getLoanApplicationId());
        g.setGuarantorId(application.getApplicantId());
        g.setGuarantorName(application.getApplicantName());
        g.setGuaranteeAmount(application.getRequestAmount());
        g.setGuaranteeType(application.getGuaranteeType());
        g.setStatus("PENDING_SIGN");
        g.setCounterGuaranteeStatus("PENDING");
        g.setFeeStatus("UNPAID");
        return guaranteeRepository.save(g);
    }

    // ==================== 担保相关 ====================

    /**
     * 签约 PENDING_SIGN → ACTIVE，设置签约日期/开始日期/结束日期
     */
    @Transactional
    public Guarantee signGuarantee(Long id, String contractNo) {
        log.info("担保签约，担保ID: {}, 合同号: {}", id, contractNo);
        Guarantee g = guaranteeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保记录不存在"));
        if (!"PENDING_SIGN".equals(g.getStatus())) {
            throw new RuntimeException("只有待签约状态的担保可以签约");
        }
        g.setContractNo(contractNo);
        g.setSignedDate(LocalDate.now());
        g.setStartDate(LocalDate.now());
        g.setEndDate(LocalDate.now().plusYears(1));
        g.setStatus("ACTIVE");
        return guaranteeRepository.save(g);
    }

    /**
     * 登记反担保 PENDING → REGISTERED
     */
    @Transactional
    public Guarantee registerCounterGuarantee(Long id, String type, String desc, BigDecimal value) {
        log.info("登记反担保，担保ID: {}, 类型: {}", id, type);
        Guarantee g = guaranteeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保记录不存在"));
        if (!"PENDING".equals(g.getCounterGuaranteeStatus())) {
            throw new RuntimeException("反担保不处于待登记状态");
        }
        g.setCounterGuaranteeType(type);
        g.setCounterGuaranteeDesc(desc);
        g.setCounterGuaranteeValue(value);
        g.setCounterGuaranteeStatus("REGISTERED");
        return guaranteeRepository.save(g);
    }

    /**
     * 支付担保费 UNPAID → PAID
     */
    @Transactional
    public Guarantee payFee(Long id, BigDecimal amount) {
        log.info("支付担保费，担保ID: {}, 金额: {}", id, amount);
        Guarantee g = guaranteeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保记录不存在"));
        if (!"UNPAID".equals(g.getFeeStatus())) {
            throw new RuntimeException("担保费不处于未支付状态");
        }
        g.setFeePaid(amount);
        g.setFeeAmount(amount);
        g.setFeeStatus("PAID");
        return guaranteeRepository.save(g);
    }

    /**
     * 释放担保 ACTIVE → RELEASED，同时释放反担保 REGISTERED → RELEASED
     */
    @Transactional
    public Guarantee releaseGuarantee(Long id, String reason) {
        log.info("释放担保，担保ID: {}, 原因: {}", id, reason);
        Guarantee g = guaranteeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保记录不存在"));
        if (!"ACTIVE".equals(g.getStatus())) {
            throw new RuntimeException("只有激活状态的担保可以释放");
        }
        g.setStatus("RELEASED");
        g.setReleaseTime(LocalDateTime.now());
        g.setReleaseReason(reason);

        // 同步释放反担保
        if ("REGISTERED".equals(g.getCounterGuaranteeStatus())) {
            g.setCounterGuaranteeStatus("RELEASED");
        }
        return guaranteeRepository.save(g);
    }

    /**
     * 终止担保 ACTIVE → TERMINATED
     */
    @Transactional
    public Guarantee terminateGuarantee(Long id, String reason) {
        log.info("终止担保，担保ID: {}, 原因: {}", id, reason);
        Guarantee g = guaranteeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保记录不存在"));
        if (!"ACTIVE".equals(g.getStatus())) {
            throw new RuntimeException("只有激活状态的担保可以终止");
        }
        g.setStatus("TERMINATED");
        g.setRemark(reason);
        return guaranteeRepository.save(g);
    }

    /**
     * 计算担保费 amount * rate/100 * months/12
     */
    public BigDecimal calculateFee(BigDecimal amount, BigDecimal rate, Integer months) {
        if (amount == null || rate == null || months == null) {
            return BigDecimal.ZERO;
        }
        return amount.multiply(rate)
                .divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(months))
                .divide(BigDecimal.valueOf(12), 2, RoundingMode.HALF_UP);
    }

    // ==================== 查询 ====================

    /**
     * 按ID查询申请
     */
    public GuaranteeApplication getApplication(Long id) {
        return guaranteeApplicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保申请不存在"));
    }

    /**
     * 按ID查询担保
     */
    public Guarantee getGuarantee(Long id) {
        return guaranteeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("担保记录不存在"));
    }

    /**
     * 分页查询申请列表（按申请人ID、状态过滤）
     */
    public Page<GuaranteeApplication> listApplications(Long applicantId, String status, int page, int size) {
        Specification<GuaranteeApplication> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (applicantId != null) {
                predicates.add(cb.equal(root.get("applicantId"), applicantId));
            }
            if (status != null && !status.isEmpty()) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return guaranteeApplicationRepository.findAll(spec, pageRequest);
    }

    /**
     * 分页查询担保列表（按担保人ID、状态过滤）
     */
    @Transactional(readOnly = true)
    public Page<Guarantee> listGuarantees(Long guarantorId, String status, int page, int size) {
        Specification<Guarantee> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (guarantorId != null) {
                predicates.add(cb.equal(root.get("guarantorId"), guarantorId));
            }
            if (status != null && !status.isEmpty()) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return guaranteeRepository.findAll(spec, pageRequest);
    }

    /**
     * 按贷款申请ID查询担保
     */
    public List<Guarantee> findByLoanApplicationId(Long loanId) {
        return guaranteeRepository.findByLoanApplicationId(loanId);
    }
}
