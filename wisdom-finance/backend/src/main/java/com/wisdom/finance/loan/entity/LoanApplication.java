package com.wisdom.finance.loan.entity;

import com.wisdom.finance.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_loan_application")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class LoanApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "application_no", unique = true, length = 50)
    private String applicationNo;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "company_id")
    private Long companyId;

    @Column(name = "company_name", length = 200)
    private String companyName;

    @Column(name = "credit_code", length = 50)
    private String creditCode;

    @Column(name = "loan_amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal loanAmount;

    @Column(name = "interest_rate", nullable = false)
    private Double interestRate;

    @Column(name = "loan_term_months", nullable = false)
    private Integer loanTermMonths;

    @Column(name = "loan_purpose", length = 500)
    private String loanPurpose;

    @Column(name = "repayment_method", length = 50)
    private String repaymentMethod;

    @Column(name = "status", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    @Column(name = "credit_score")
    private Integer creditScore;

    @Column(name = "risk_score")
    private Integer riskScore;

    @Column(name = "risk_level", length = 10)
    private String riskLevel;

    @Column(name = "approved_amount", precision = 15, scale = 2)
    private BigDecimal approvedAmount;

    @Column(name = "review_time")
    private LocalDateTime reviewTime;

    @Column(name = "reviewer_id")
    private Long reviewerId;

    @Column(name = "review_comment", length = 1000)
    private String reviewComment;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum ApplicationStatus {
        DRAFT,
        SUBMITTED,
        PENDING,
        APPROVING,
        APPROVED,
        REJECTED,
        NEEDS_MANUAL
    }
}
