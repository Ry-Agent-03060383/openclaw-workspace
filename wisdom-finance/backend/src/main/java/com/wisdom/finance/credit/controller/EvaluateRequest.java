package com.wisdom.finance.credit.controller;

import java.util.List;

/**
 * 批量评分评估请求体
 */
public class EvaluateRequest {
    private List<Number> companyIds;

    public List<Number> getCompanyIds() {
        return companyIds;
    }

    public void setCompanyIds(List<Number> companyIds) {
        this.companyIds = companyIds;
    }
}
