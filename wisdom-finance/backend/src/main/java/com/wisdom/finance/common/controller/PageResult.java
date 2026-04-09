package com.wisdom.finance.common.controller;

import lombok.Data;
import java.util.List;

/**
 * 分页结果
 */
@Data
public class PageResult<T> {
    
    private Long total;
    private Integer pageNum;
    private Integer pageSize;
    private Integer pages;
    private List<T> records;
    
    public PageResult() {}
    
    public PageResult(List<T> records, Long total, Integer pageNum, Integer pageSize) {
        this.records = records;
        this.total = total;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.pages = (int) ((total + pageSize - 1) / pageSize);
    }
}