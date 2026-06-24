package com.wisdom.finance.loan.mapper;

import com.wisdom.finance.loan.entity.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByUserId(Long userId);
    List<LoanApplication> findByCompanyId(Long companyId);
    long countByStatus(LoanApplication.ApplicationStatus status);
    List<LoanApplication> findTop5ByOrderByCreatedAtDesc();
    List<LoanApplication> findByStatus(LoanApplication.ApplicationStatus status);
    List<LoanApplication> findAllByOrderByCreatedAtDesc();
}
