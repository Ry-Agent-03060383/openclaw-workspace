package com.wisdom.finance.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class DashboardDTO {
    private List<StatsItem> stats;
    private List<RecentLoan> recentLoans;
    private List<RecentActivity> recentActivities;

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class StatsItem {
        private String label;
        private Object value;
        private String suffix;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class RecentLoan {
        private Long id;
        private String companyName;
        private String amount;
        private String status;
        private String statusLabel;
    }

    @Data @Builder @NoArgsConstructor @AllArgsConstructor
    public static class RecentActivity {
        private String tag;
        private String text;
    }
}
