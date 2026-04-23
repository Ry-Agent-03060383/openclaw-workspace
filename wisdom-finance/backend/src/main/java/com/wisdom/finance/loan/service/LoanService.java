package com.wisdom.finance.loan.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.credit.service.CreditQueryService;
import com.wisdom.finance.loan.dto.LoanApplicationCreateDTO;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.entity.LoanProduct;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.loan.mapper.LoanProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

/**
 * 贷款服务 - M4 贷款申请流程
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanApplicationRepository loanApplicationRepository;
    private final LoanProductRepository loanProductRepository;
    private final CompanyRepository companyRepository;
    private final CreditQueryService creditQueryService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 获取所有贷款产品
     */
    public List<LoanProduct> getAllProducts() {
        return loanProductRepository.findByStatus("ACTIVE");
    }

    /**
     * 根据ID获取产品
     */
    public LoanProduct getProductById(Long productId) {
        return loanProductRepository.findById(productId).orElse(null);
    }

    /**
     * 创建贷款产品
     */
    @Transactional
    public LoanProduct createProduct(LoanProduct product) {
        return loanProductRepository.save(product);
    }

    /**
     * 创建贷款申请
     */
    @Transactional
    public LoanApplication createApplication(LoanApplicationCreateDTO dto, Long userId) {
        log.info("创建贷款申请，用户ID: {}, 企业: {}", userId, dto.getCompanyName());

        Company company = companyRepository.findById(dto.getCompanyId())
                .orElseThrow(() -> new RuntimeException("企业不存在"));

        LoanProduct product = loanProductRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("贷款产品不存在"));

        LoanApplication application = new LoanApplication();
        application.setApplicationNo(generateApplicationNo());
        application.setUserId(userId);
        application.setProductId(dto.getProductId());
        application.setCompanyId(dto.getCompanyId());
        application.setCompanyName(dto.getCompanyName());
        application.setCreditCode(dto.getCreditCode());
        application.setLoanAmount(dto.getLoanAmount());
        application.setLoanTermMonths(dto.getLoanTermMonths());
        application.setInterestRate(product.getInterestRateMin());
        application.setLoanPurpose(dto.getLoanPurpose());
        application.setRepaymentMethod(dto.getRepaymentMethod());
        application.setStatus(LoanApplication.ApplicationStatus.DRAFT);

        if (dto.getMaterials() != null) {
            try {
                application.setMaterials(objectMapper.writeValueAsString(dto.getMaterials()));
            } catch (Exception e) {
                log.warn("材料JSON序列化失败", e);
            }
        }

        creditQueryService.calculateCreditRisk(company);
        application.setCreditScore(company.getCreditScore());
        application.setRiskLevel(company.getRiskLevel());

        return loanApplicationRepository.save(application);
    }

    /**
     * 提交贷款申请
     */
    @Transactional
    public LoanApplication submitApplication(Long applicationId) {
        log.info("提交贷款申请，申请ID: {}", applicationId);

        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("申请不存在"));

        if (application.getStatus() != LoanApplication.ApplicationStatus.DRAFT) {
            throw new RuntimeException("只有草稿状态的申请可以提交");
        }

        application.setStatus(LoanApplication.ApplicationStatus.SUBMITTED);
        application.setSubmitTime(LocalDateTime.now());

        return loanApplicationRepository.save(application);
    }

    /**
     * 根据ID获取申请
     */
    public LoanApplication getApplicationById(Long applicationId) {
        return loanApplicationRepository.findById(applicationId).orElse(null);
    }

    /**
     * 根据申请单号获取
     */
    public LoanApplication getApplicationByNo(String applicationNo) {
        return loanApplicationRepository.findByApplicationNo(applicationNo).orElse(null);
    }

    /**
     * 获取用户的申请列表
     */
    public List<LoanApplication> getUserApplications(Long userId) {
        return loanApplicationRepository.findByUserId(userId);
    }

    /**
     * 获取企业的申请列表
     */
    public List<LoanApplication> getCompanyApplications(Long companyId) {
        return loanApplicationRepository.findByCompanyId(companyId);
    }

    /**
     * 更新申请状态
     */
    @Transactional
    public LoanApplication updateStatus(Long applicationId, LoanApplication.ApplicationStatus status,
                                         String comment, Long reviewerId) {
        LoanApplication application = loanApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("申请不存在"));

        application.setStatus(status);
        application.setReviewComment(comment);
        application.setReviewerId(reviewerId);
        application.setReviewTime(LocalDateTime.now());

        return loanApplicationRepository.save(application);
    }

    /**
     * 生成申请单号
     */
    private String generateApplicationNo() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String uuid = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        return "LA" + timestamp + uuid;
    }
}
