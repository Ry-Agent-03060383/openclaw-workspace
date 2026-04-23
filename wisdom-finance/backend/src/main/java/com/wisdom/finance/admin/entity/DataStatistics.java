package com.wisdom.finance.admin.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * 数据统计 - 平台运营方数据统计
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_data_statistics")
public class DataStatistics extends BaseEntity {
    
    @Column(name = "stat_date", nullable = false)
    private LocalDate statDate; // 统计日期
    
    @Column(name = "stat_type", length = 50, nullable = false)
    private String statType; // 统计类型：日/周/月/季度/年
    
    @Column(name = "user_count")
    private Integer userCount; // 用户数量
    
    @Column(name = "farmer_count")
    private Integer farmerCount; // 农户数量
    
    @Column(name = "enterprise_count")
    private Integer enterpriseCount; // 企业数量
    
    @Column(name = "loan_application_count")
    private Integer loanApplicationCount; // 贷款申请数量
    
    @Column(name = "approved_application_count")
    private Integer approvedApplicationCount; // 审批通过数量
    
    @Column(name = "rejected_application_count")
    private Integer rejectedApplicationCount; // 审批拒绝数量
    
    @Column(name = "total_loan_amount", precision = 18, scale = 2)
    private BigDecimal totalLoanAmount; // 总贷款金额
    
    @Column(name = "approved_loan_amount", precision = 18, scale = 2)
    private BigDecimal approvedLoanAmount; // 审批通过金额
    
    @Column(name = "average_loan_amount", precision = 18, scale = 2)
    private BigDecimal averageLoanAmount; // 平均贷款金额
    
    @Column(name = "default_rate", precision = 8, scale = 4)
    private BigDecimal defaultRate; // 违约率
    
    @Column(name = "approval_rate", precision = 8, scale = 4)
    private BigDecimal approvalRate; // 审批通过率
    
    @Column(name = "active_user_count")
    private Integer activeUserCount; // 活跃用户数量
    
    @Column(name = "system_income", precision = 18, scale = 2)
    private BigDecimal systemIncome; // 系统收入
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注
}
