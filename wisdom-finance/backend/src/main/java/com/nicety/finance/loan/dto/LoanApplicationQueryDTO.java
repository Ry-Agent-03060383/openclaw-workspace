package com.wisdom.finance.loan.dto;

import lombok.Data;

/**
 * 贷款申请查询DTO
 */
@Data
public class LoanApplicationQueryDTO {
    
    private Long userId;                     // 用户ID
    private Long companyId;                  // 企业ID
    private Long productId;                  // 产品ID
    private String applicationNo;            // 申请单号
    private String companyName;              // 企业名称（模糊查询）
    private String status;                   // 申请状态
    private String creditCode;               // 统一社会信用代码
    private Integer pageNum = 1;             // 页码
    private Integer pageSize = 10;           // 每页条数
}