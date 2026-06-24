package com.wisdom.finance.home;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 首页统计数据传输对象
 */
@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class HomeDTO {
    /** 平台统计数据 */
    private List<StatItem> stats;
    /** 实时动态 */
    private List<ActivityItem> activities;

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class StatItem {
        private String label;
        private long value;
        private String suffix;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class ActivityItem {
        private String tag;
        private String text;
    }
}