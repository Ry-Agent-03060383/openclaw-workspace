package com.wisdom.finance.loan.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 贷款产品实体 - M3 贷款产品管理
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_loan_product")
public class LoanProduct extends BaseEntity {
    
    @Column(name = "product_name", nullable = false, length = 100)
    private String productName;
    
    @Column(name = "product_code", unique = true, length = 50)
    private String productCode;
    
    @Column(name = "product_type", length = 20)
    private String productType; // 流动资金贷款/固定资产贷款/信用贷款等
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "min_amount", precision = 18, scale = 2)
    private BigDecimal minAmount; // 最小贷款金额
    
    @Column(name = "max_amount", precision = 18, scale = 2)
    private BigDecimal maxAmount; // 最大贷款金额
    
    @Column(name = "min_term_months")
    private Integer minTermMonths; // 最小期限（月）
    
    @Column(name = "max_term_months")
    private Integer maxTermMonths; // 最大期限（月）
    
    @Column(name = "interest_rate_min", precision = 8, scale = 4)
    private BigDecimal interestRateMin; // 最小利率
    
    @Column(name = "interest_rate_max", precision = 8, scale = 4)
    private BigDecimal interestRateMax; // 最大利率
    
    @Column(name = "eligible_industry", length = 500)
    private String eligibleIndustry; // 准入行业（逗号分隔）
    
    @Column(name = "min_credit_score")
    private Integer minCreditScore; // 最低信用分要求
    
    @Column(name = "min_company_age")
    private Integer minCompanyAge; // 最低企业年限
    
    @Column(name = "required_materials", columnDefinition = "TEXT")
    private String requiredMaterials; // 所需材料 JSON
    
    @Column(name = "status", length = 20)
    private String status; // 上架状态: DRAFT/ACTIVE/INACTIVE
    
    @Column(name = "sort_order")
    private Integer sortOrder = 0;
}