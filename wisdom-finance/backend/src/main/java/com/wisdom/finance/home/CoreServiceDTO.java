package com.wisdom.finance.home;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * 核心服务板块数据聚合 DTO
 * <p>返回首页「核心服务」板块所需的全部结构化数据</p>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CoreServiceDTO {

    /** 6 大服务概览列表 */
    private List<ServiceItem> services;

    // ─── 银企对接 ───
    /** 推荐产品列表（前 6 个） */
    private List<BankProductBrief> recommendedProducts;
    /** 平台累计融资金额（亿元） */
    private BigDecimal totalFinancingAmount;
    /** 匹配成功率 */
    private Double matchSuccessRate;

    // ─── 信用体检 ───
    /** 企业信用评级分布 */
    private CreditDistribution creditDistribution;

    // ─── 风险防控 ───
    /** 风险概况 */
    private RiskOverview riskOverview;

    // ─── AI智能服务 ───
    /** AI 服务统计 */
    private AiServiceStats aiStats;

    // ─── 掌上金融 ───
    /** 移动端覆盖统计 */
    private MobileStats mobileStats;

    // ─── 数据安全 ───
    /** 安全保障数据 */
    private SecurityStats securityStats;

    // ════════════════════════════
    // 内部类型
    // ════════════════════════════

    /** 单个服务卡片 */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServiceItem {
        private String id;          // 唯一标识: bank-match / credit-check / risk / ai / mobile / security
        private String title;
        private String summary;
        private String icon;        // emoji
        private String color;       // CSS 主题色
        private String route;       // 前端路由
        private String badge;       // 角标文字（如 "新" / "热门"）
        private Integer order;      // 排序号
    }

    /** 银行产品摘要 */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BankProductBrief {
        private Long id;
        private String bankName;
        private String productName;
        private BigDecimal minAmount;
        private BigDecimal maxAmount;
        private String rateRange;       // 如 "3.45% - 4.15%"
        private Integer termMonths;
        private String guaranteeType;   // 担保方式
        private String features;        // 产品亮点，逗号分隔
        private Double matchScore;      // 通用匹配度 0-1
    }

    /** 信用评级分布 */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreditDistribution {
        private Integer totalEvaluated;
        private Integer excellent;      // >= 85
        private Integer good;           // 70-84
        private Integer fair;           // 60-69
        private Integer poor;           // < 60
    }

    /** 风险概况 */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RiskOverview {
        private Integer totalMonitored;     // 监控企业数
        private Integer activeWarnings;     // 活跃预警数
        private Double avgRiskScore;        // 平均风险分 0-100
        private String trendLabel;          // "同比下降15%"
    }

    /** AI 服务统计 */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AiServiceStats {
        private Integer totalSessions;      // 总对话数
        private Boolean online;             // 7x24 在线
        private String answerRate;          // 应答率
    }

    /** 移动端覆盖统计 */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MobileStats {
        private String wechatMiniApp;       // 小程序名称
        private String appName;             // APP 名称
        private Integer dailyUsers;         // 日活
        private String coverageRate;        // 覆盖率
    }

    /** 安全保障数据 */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SecurityStats {
        private String encryptionLevel;     // 加密等级
        private String certification;       // ISO/等保认证
        private Boolean passedAudit;        // 安全审计
        private Integer zeroIncidentDays;   // 无事故天数
    }
}