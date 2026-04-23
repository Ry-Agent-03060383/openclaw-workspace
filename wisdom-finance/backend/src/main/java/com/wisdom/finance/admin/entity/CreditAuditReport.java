package com.wisdom.finance.admin.entity;

import com.wisdom.finance.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 征信业务审计报告 - 平台运营方征信业务审计
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_credit_audit_report")
public class CreditAuditReport extends BaseEntity {
    
    @Column(name = "report_no", unique = true, length = 32, nullable = false)
    private String reportNo; // 报告编号
    
    @Column(name = "audit_date", nullable = false)
    private LocalDate auditDate; // 审计日期
    
    @Column(name = "audit_period_start")
    private LocalDate auditPeriodStart; // 审计期间开始
    
    @Column(name = "audit_period_end")
    private LocalDate auditPeriodEnd; // 审计期间结束
    
    @Column(name = "report_type", length = 50)
    private String reportType; // 报告类型：月度/季度/年度
    
    @Column(name = "credit_query_count")
    private Integer creditQueryCount; // 征信查询次数
    
    @Column(name = "credit_report_count")
    private Integer creditReportCount; // 信用报告生成数量
    
    @Column(name = "score_calculation_count")
    private Integer scoreCalculationCount; // 评分计算次数
    
    @Column(name = "average_credit_score")
    private Integer averageCreditScore; // 平均信用评分
    
    @Column(name = "high_risk_count")
    private Integer highRiskCount; // 高风险数量
    
    @Column(name = "medium_risk_count")
    private Integer mediumRiskCount; // 中风险数量
    
    @Column(name = "low_risk_count")
    private Integer lowRiskCount; // 低风险数量
    
    @Column(name = "abnormal_operations")
    private Integer abnormalOperations; // 异常操作次数
    
    @Column(name = "compliance_issues")
    private Integer complianceIssues; // 合规问题数量
    
    @Column(name = "data_quality_score")
    private Integer dataQualityScore; // 数据质量评分
    
    @Column(name = "system_performance", precision = 8, scale = 2)
    private BigDecimal systemPerformance; // 系统性能
    
    @Column(name = "data_sources", length = 500)
    private String dataSources; // 数据来源
    
    @Column(name = "audit_findings", columnDefinition = "TEXT")
    private String auditFindings; // 审计发现
    
    @Column(name = "recommendations", columnDefinition = "TEXT")
    private String recommendations; // 改进建议
    
    @Column(name = "status", length = 20)
    private String status; // 状态：DRAFT/COMPLETED/APPROVED
    
    @Column(name = "auditor", length = 50)
    private String auditor; // 审计员
    
    @Column(name = "approval_by", length = 50)
    private String approvalBy; // 审批人
    
    @Column(name = "approval_date")
    private LocalDateTime approvalDate; // 审批日期
    
    @Column(name = "remark", length = 500)
    private String remark; // 备注
}
