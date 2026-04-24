package com.wisdom.finance.loan.dto;

import lombok.Data;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 贷款申请创建DTO
 */
@Data
public class LoanApplicationCreateDTO {
    
    @NotNull(message = "产品ID不能为空")
    private Long productId;                  // 贷款产品ID
    
    @NotNull(message = "企业ID不能为空")
    private Long companyId;                  // 企业ID
    
    @NotBlank(message = "企业名称不能为空")
    private String companyName;              // 企业名称
    
    @NotBlank(message = "统一社会信用代码不能为空")
    private String creditCode;               // 统一社会信用代码
    
    @NotNull(message = "申请金额不能为空")
    @DecimalMin(value = "0.01", message = "申请金额必须大于0")
    private BigDecimal loanAmount;           // 申请金额
    
    @NotNull(message = "申请期限不能为空")
    @Min(value = 1, message = "申请期限最小为1个月")
    @Max(value = 360, message = "申请期限最大为360个月")
    private Integer loanTermMonths;          // 申请期限（月）
    
    @NotBlank(message = "贷款用途不能为空")
    private String loanPurpose;              // 贷款用途
    
    @NotBlank(message = "还款方式不能为空")
    private String repaymentMethod;          // 还款方式
    
    private Integer creditScore;             // 信用评分（系统返回）
    private Integer riskScore;               // 风险评分（系统返回）
    private String riskLevel;                // 风险等级（系统返回）
    
    private List<String> materials;          // 申请材料列表
    
    public Long getProductId() {
        return productId;
    }
    
    public void setProductId(Long productId) {
        this.productId = productId;
    }
    
    public Long getCompanyId() {
        return companyId;
    }
    
    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }
    
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public String getCreditCode() {
        return creditCode;
    }
    
    public void setCreditCode(String creditCode) {
        this.creditCode = creditCode;
    }
    
    public BigDecimal getLoanAmount() {
        return loanAmount;
    }
    
    public void setLoanAmount(BigDecimal loanAmount) {
        this.loanAmount = loanAmount;
    }
    
    public Integer getLoanTermMonths() {
        return loanTermMonths;
    }
    
    public void setLoanTermMonths(Integer loanTermMonths) {
        this.loanTermMonths = loanTermMonths;
    }
    
    public String getLoanPurpose() {
        return loanPurpose;
    }
    
    public void setLoanPurpose(String loanPurpose) {
        this.loanPurpose = loanPurpose;
    }
    
    public String getRepaymentMethod() {
        return repaymentMethod;
    }
    
    public void setRepaymentMethod(String repaymentMethod) {
        this.repaymentMethod = repaymentMethod;
    }
    
    public Integer getCreditScore() {
        return creditScore;
    }
    
    public void setCreditScore(Integer creditScore) {
        this.creditScore = creditScore;
    }
    
    public Integer getRiskScore() {
        return riskScore;
    }
    
    public void setRiskScore(Integer riskScore) {
        this.riskScore = riskScore;
    }
    
    public String getRiskLevel() {
        return riskLevel;
    }
    
    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }
    
    public List<String> getMaterials() {
        return materials;
    }
    
    public void setMaterials(List<String> materials) {
        this.materials = materials;
    }
}