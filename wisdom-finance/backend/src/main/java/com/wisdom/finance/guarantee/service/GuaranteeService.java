package com.wisdom.finance.guarantee.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.guarantee.entity.Guarantee;
import com.wisdom.finance.guarantee.entity.GuaranteeApplication;
import com.wisdom.finance.guarantee.mapper.GuaranteeApplicationRepository;
import com.wisdom.finance.guarantee.mapper.GuaranteeRepository;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

/**
 * 担保服务 - 担保业务流程
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class GuaranteeService {

    private final GuaranteeApplicationRepository guaranteeApplicationRepository;
    private final GuaranteeRepository guaranteeRepository;
    private final LoanApplicationRepository loanApplicationRepository;
    private final ObjectMapper objectMapper;

    /**
     * 创建担保申请
     */
    @Transactional
    public GuaranteeApplication createGuaranteeApplication(GuaranteeApplication application) {
        log.info("创建担保申请，申请人: {}", application.getApplicantName());
        
        application.setAppNo(generateAppNo());
        application.setStatus("DRAFT");
        
        return guaranteeApplicationRepository.save(application);
    }

    /**
     * 提交担保申请
     */
    @Transactional
    public GuaranteeApplication submitGuaranteeApplication(Long applicationId) {
        log.info("提交担保申请，申请ID: {}", applicationId);
        
        GuaranteeApplication application = guaranteeApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("担保申请不存在"));
        
        if (!"DRAFT".equals(application.getStatus())) {
            throw new RuntimeException("只有草稿状态的申请可以提交");
        }
        
        application.setStatus("SUBMITTED");
        application.setSubmitTime(LocalDateTime.now());
        
        return guaranteeApplicationRepository.save(application);
    }

    /**
     * 审核担保申请
     */
    @Transactional
    public GuaranteeApplication reviewGuaranteeApplication(Long applicationId, String status, 
                                                        String comment, Long reviewerId) {
        log.info("审核担保申请，申请ID: {}, 状态: {}", applicationId, status);
        
        GuaranteeApplication application = guaranteeApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("担保申请不存在"));
        
        if (!"SUBMITTED".equals(application.getStatus()) && !"APPROVING".equals(application.getStatus())) {
            throw new RuntimeException("只有已提交或审核中的申请可以审核");
        }
        
        application.setStatus(status);
        application.setReviewComment(comment);
        application.setReviewerId(reviewerId);
        application.setReviewTime(LocalDateTime.now());
        
        if ("REJECTED".equals(status)) {
            application.setRejectionReason(comment);
        }
        
        GuaranteeApplication saved = guaranteeApplicationRepository.save(application);
        
        // 如果审核通过，创建担保记录
        if ("APPROVED".equals(status)) {
            createGuaranteeFromApplication(saved);
        }
        
        return saved;
    }

    /**
     * 从担保申请创建担保记录
     */
    @Transactional
    public Guarantee createGuaranteeFromApplication(GuaranteeApplication application) {
        log.info("从担保申请创建担保记录，申请编号: {}", application.getAppNo());
        
        LoanApplication loanApp = loanApplicationRepository.findById(application.getLoanApplicationId())
                .orElseThrow(() -> new RuntimeException("贷款申请不存在"));
        
        Guarantee guarantee = new Guarantee();
        guarantee.setGuaranteeNo(generateGuaranteeNo());
        guarantee.setApplicationId(application.getLoanApplicationId());
        guarantee.setGuarantorType("企业"); // 默认企业担保
        guarantee.setGuarantorId(application.getApplicantId());
        guarantee.setGuarantorName(application.getApplicantName());
        guarantee.setGuaranteeAmount(application.getRequestAmount());
        guarantee.setGuaranteeRatio(BigDecimal.valueOf(100)); // 100%担保
        guarantee.setGuaranteeType(application.getGuaranteeType());
        guarantee.setStartDate(LocalDate.now());
        guarantee.setEndDate(LocalDate.now().plusMonths(loanApp.getLoanTermMonths()));
        guarantee.setStatus("ACTIVE");
        guarantee.setRiskLevel(loanApp.getRiskLevel());
        
        return guaranteeRepository.save(guarantee);
    }

    /**
     * 获取担保申请详情
     */
    public GuaranteeApplication getGuaranteeApplication(Long applicationId) {
        return guaranteeApplicationRepository.findById(applicationId).orElse(null);
    }

    /**
     * 获取担保详情
     */
    public Guarantee getGuarantee(Long guaranteeId) {
        return guaranteeRepository.findById(guaranteeId).orElse(null);
    }

    /**
     * 获取贷款申请的担保列表
     */
    public List<Guarantee> getGuaranteesByLoanApplication(Long loanApplicationId) {
        return guaranteeRepository.findByApplicationId(loanApplicationId);
    }

    /**
     * 释放担保
     */
    @Transactional
    public Guarantee releaseGuarantee(Long guaranteeId) {
        log.info("释放担保，担保ID: {}", guaranteeId);
        
        Guarantee guarantee = guaranteeRepository.findById(guaranteeId)
                .orElseThrow(() -> new RuntimeException("担保不存在"));
        
        if (!"ACTIVE".equals(guarantee.getStatus())) {
            throw new RuntimeException("只有激活状态的担保可以释放");
        }
        
        guarantee.setStatus("RELEASED");
        
        return guaranteeRepository.save(guarantee);
    }

    /**
     * 生成担保申请编号
     */
    private String generateAppNo() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "GA" + timestamp + uuid;
    }

    /**
     * 生成担保编号
     */
    private String generateGuaranteeNo() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "GU" + timestamp + uuid;
    }
}
