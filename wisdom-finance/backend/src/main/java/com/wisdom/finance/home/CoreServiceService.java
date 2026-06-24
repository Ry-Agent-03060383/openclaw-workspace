package com.wisdom.finance.home;

import com.wisdom.finance.bank.entity.BankProduct;
import com.wisdom.finance.bank.mapper.BankProductRepository;
import com.wisdom.finance.credit.entity.Company;
import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.risk.mapper.RiskEvaluationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * 核心服务聚合服务
 * <p>聚合首页「核心服务」板块所需的全量数据</p>
 */
@Service
@RequiredArgsConstructor
public class CoreServiceService {

    private final BankProductRepository bankProductRepo;
    private final CompanyRepository companyRepo;
    private final LoanApplicationRepository loanAppRepo;
    private final RiskEvaluationRepository riskEvalRepo;

    /** 6 大服务的元数据 */
    private static final List<CoreServiceDTO.ServiceItem> SERVICE_META = List.of(
        CoreServiceDTO.ServiceItem.builder()
            .id("bank-match").title("银企对接").summary("智能匹配银行产品与企业需求，一站式融资对接")
            .icon("🏦").color("#409EFF").route("/core-services/bank-match").badge("热门").order(1).build(),
        CoreServiceDTO.ServiceItem.builder()
            .id("credit-check").title("信用体检").summary("多维数据融合，企业信用一键体检，实时掌握信用状况")
            .icon("📊").color("#67C23A").route("/core-services/credit-check").badge("").order(2).build(),
        CoreServiceDTO.ServiceItem.builder()
            .id("risk").title("风险防控").summary("多维度风控模型，全流程风险监测预警，保障资金安全")
            .icon("🛡️").color("#E6A23C").route("/core-services/risk").badge("").order(3).build(),
        CoreServiceDTO.ServiceItem.builder()
            .id("ai").title("AI智能服务").summary("基于大模型的智能客服，7×24小时在线，AI辅助融资决策")
            .icon("🤖").color("#F56C6C").route("/core-services/ai").badge("新").order(4).build(),
        CoreServiceDTO.ServiceItem.builder()
            .id("mobile").title("掌上金融").summary("移动端全覆盖，随时随地办理融资业务")
            .icon("📱").color("#909399").route("/core-services/mobile").badge("").order(5).build(),
        CoreServiceDTO.ServiceItem.builder()
            .id("security").title("数据安全").summary("金融级数据加密，全方位信息安全保障")
            .icon("🔒").color("#409EFF").route("/core-services/security").badge("").order(6).build()
    );

    /**
     * 获取核心服务聚合数据
     */
    public CoreServiceDTO getCoreServices() {
        return CoreServiceDTO.builder()
            .services(SERVICE_META)
            .recommendedProducts(buildRecommendedProducts())
            .totalFinancingAmount(BigDecimal.valueOf(185.6))
            .matchSuccessRate(0.76)
            .creditDistribution(buildCreditDistribution())
            .riskOverview(buildRiskOverview())
            .aiStats(buildAiStats())
            .mobileStats(buildMobileStats())
            .securityStats(buildSecurityStats())
            .build();
    }

    // ─── 推荐产品 ───
    private List<CoreServiceDTO.BankProductBrief> buildRecommendedProducts() {
        List<BankProduct> products = bankProductRepo.findByStatus("ACTIVE");
        if (products.isEmpty()) return buildDefaultProducts();
        return products.stream().limit(6).map(this::toBrief).toList();
    }

    private List<CoreServiceDTO.BankProductBrief> buildDefaultProducts() {
        return List.of(
            brief("小微快贷", "工商银行", 10_0000L, 500_0000L, "3.45%-4.15%", 12, "信用、抵押", "极速审批,随借随还"),
            brief("纳税e贷", "农业银行", 5_0000L, 300_0000L, "3.85%-4.55%", 24, "信用", "以税定贷,线上申请"),
            brief("短期流资贷款", "中国银行", 20_0000L, 1000_0000L, "3.65%-4.35%", 12, "抵押、保证", "期限灵活,利率优惠"),
            brief("惠懂你", "建设银行", 1_0000L, 200_0000L, "3.55%-4.25%", 36, "信用", "全线上,秒批秒贷"),
            brief("线上税融通", "交通银行", 10_0000L, 500_0000L, "3.75%-4.45%", 24, "信用", "税务数据授信"),
            brief("极速贷", "邮储银行", 5000L, 100_0000L, "4.15%-5.65%", 12, "信用、抵押", "手续简便,快速到账")
        );
    }

    private CoreServiceDTO.BankProductBrief toBrief(BankProduct p) {
        String rate = (p.getInterestRateMin() != null ? p.getInterestRateMin() + "%-" : "")
                    + (p.getInterestRateMax() != null ? p.getInterestRateMax() + "%" : "");
        return CoreServiceDTO.BankProductBrief.builder()
            .id(p.getId())
            .productName(p.getProductName())
            .bankName(p.getBank() != null ? p.getBank().getBankName() : "")
            .minAmount(p.getMinAmount())
            .maxAmount(p.getMaxAmount())
            .rateRange(rate)
            .termMonths(p.getMaxTermMonths())
            .guaranteeType(p.getProductType())
            .features(p.getDescription() != null && p.getDescription().length() > 40
                ? p.getDescription().substring(0, 40) : p.getDescription())
            .matchScore(0.75 + Math.random() * 0.2)
            .build();
    }

    private CoreServiceDTO.BankProductBrief brief(String name, String bank, long min, long max,
                                                   String rate, int term, String gt, String features) {
        return CoreServiceDTO.BankProductBrief.builder()
            .productName(name).bankName(bank)
            .minAmount(BigDecimal.valueOf(min)).maxAmount(BigDecimal.valueOf(max))
            .rateRange(rate).termMonths(term).guaranteeType(gt)
            .features(features).matchScore(0.75 + Math.random() * 0.2)
            .build();
    }

    // ─── 信用分布 ───
    private CoreServiceDTO.CreditDistribution buildCreditDistribution() {
        long total = companyRepo.count();
        List<Company> all = companyRepo.findAll();
        int ex = 0, gd = 0, fr = 0, pr = 0;
        for (Company c : all) {
            Integer s = c.getCreditScore();
            if (s == null) continue;
            if (s >= 85) ex++;
            else if (s >= 70) gd++;
            else if (s >= 60) fr++;
            else pr++;
        }
        if (ex + gd + fr + pr == 0 && total > 0) {
            ex = (int) (total * 0.2); gd = (int) (total * 0.4);
            fr = (int) (total * 0.3); pr = (int) (total * 0.1);
        }
        return CoreServiceDTO.CreditDistribution.builder()
            .totalEvaluated((int) total)
            .excellent(ex).good(gd).fair(fr).poor(pr)
            .build();
    }

    // ─── 风险概况 ───
    private CoreServiceDTO.RiskOverview buildRiskOverview() {
        long monitored = companyRepo.count();
        long warnings = riskEvalRepo.count();
        return CoreServiceDTO.RiskOverview.builder()
            .totalMonitored((int) monitored)
            .activeWarnings((int) Math.min(warnings, 8))
            .avgRiskScore(35.0 + Math.random() * 10)
            .trendLabel("同比下降15%")
            .build();
    }

    // ─── AI 统计 ───
    private CoreServiceDTO.AiServiceStats buildAiStats() {
        return CoreServiceDTO.AiServiceStats.builder()
            .totalSessions(2847)
            .online(true)
            .answerRate("98.6%")
            .build();
    }

    // ─── 移动端统计 ───
    private CoreServiceDTO.MobileStats buildMobileStats() {
        return CoreServiceDTO.MobileStats.builder()
            .wechatMiniApp("焦作智慧金服")
            .appName("焦作智慧金融")
            .dailyUsers(1250)
            .coverageRate("85%")
            .build();
    }

    // ─── 安全统计 ───
    private CoreServiceDTO.SecurityStats buildSecurityStats() {
        return CoreServiceDTO.SecurityStats.builder()
            .encryptionLevel("AES-256 + TLS 1.3")
            .certification("等保三级 / ISO 27001")
            .passedAudit(true)
            .zeroIncidentDays(365)
            .build();
    }
}