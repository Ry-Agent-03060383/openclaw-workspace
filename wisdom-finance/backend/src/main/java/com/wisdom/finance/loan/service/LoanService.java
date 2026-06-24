package com.wisdom.finance.loan.service;

import com.wisdom.finance.loan.dto.LoanApplicationCreateDTO;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanApplicationRepository repo;

    @Transactional
    public LoanApplication apply(User user, LoanApplicationCreateDTO dto) {
        LoanApplication app = new LoanApplication();
        app.setUser(user);
        app.setApplicationNo("LA" + System.currentTimeMillis());
        app.setProductId(dto.getProductId());
        app.setCompanyId(dto.getCompanyId());
        app.setCompanyName(dto.getCompanyName());
        app.setCreditCode(dto.getCreditCode());
        app.setLoanAmount(dto.getLoanAmount());
        app.setLoanTermMonths(dto.getLoanTermMonths());
        app.setLoanPurpose(dto.getLoanPurpose());
        app.setRepaymentMethod(dto.getRepaymentMethod());
        app.setInterestRate(0.045);
        app.setStatus(LoanApplication.ApplicationStatus.PENDING);
        return repo.save(app);
    }

    public List<LoanApplication> listByUser(User user) {
        return repo.findByUserId(user.getId());
    }

    public List<LoanApplication> listAll() {
        return repo.findAllByOrderByCreatedAtDesc();
    }

    public List<LoanApplication> listPending() {
        return repo.findByStatus(LoanApplication.ApplicationStatus.PENDING);
    }

    @Transactional
    public LoanApplication approve(Long applicationId, Long reviewerId) {
        LoanApplication app = repo.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("申请不存在"));
        app.setStatus(LoanApplication.ApplicationStatus.APPROVED);
        app.setReviewerId(reviewerId);
        return repo.save(app);
    }

    @Transactional
    public LoanApplication reject(Long applicationId, Long reviewerId, String reason) {
        LoanApplication app = repo.findById(applicationId)
                .orElseThrow(() -> new IllegalArgumentException("申请不存在"));
        app.setStatus(LoanApplication.ApplicationStatus.REJECTED);
        app.setReviewerId(reviewerId);
        app.setReviewComment(reason);
        return repo.save(app);
    }
}
