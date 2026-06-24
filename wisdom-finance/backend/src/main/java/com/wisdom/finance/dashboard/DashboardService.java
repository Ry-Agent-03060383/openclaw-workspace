package com.wisdom.finance.dashboard;

import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.credit.mapper.CreditReportRepository;
import com.wisdom.finance.loan.entity.LoanApplication;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.risk.mapper.RiskEvaluationRepository;
import com.wisdom.finance.thirdparty.mapper.ServiceOrderRepository;
import com.wisdom.finance.thirdparty.mapper.ThirdPartyServiceRepository;
import com.wisdom.finance.user.entity.User;
import com.wisdom.finance.user.mapper.EnterpriseRepository;
import com.wisdom.finance.user.mapper.FarmerRepository;
import com.wisdom.finance.user.mapper.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepo;
    private final EnterpriseRepository enterpriseRepo;
    private final FarmerRepository farmerRepo;
    private final LoanApplicationRepository loanRepo;
    private final CompanyRepository companyRepo;
    private final CreditReportRepository creditReportRepo;
    private final RiskEvaluationRepository riskEvalRepo;
    private final ThirdPartyServiceRepository thirdPartyServiceRepo;
    private final ServiceOrderRepository serviceOrderRepo;

    public DashboardDTO getDashboard(User user) {
        List<DashboardDTO.StatsItem> stats = new ArrayList<>();
        List<DashboardDTO.RecentLoan> recentLoans = new ArrayList<>();
        List<DashboardDTO.RecentActivity> activities = new ArrayList<>();

        switch (user.getUserType()) {
            case ADMIN -> {
                stats.add(new DashboardDTO.StatsItem("注册用户", userRepo.count(), ""));
                stats.add(new DashboardDTO.StatsItem("企业用户", enterpriseRepo.count(), ""));
                stats.add(new DashboardDTO.StatsItem("农户用户", farmerRepo.count(), ""));
                stats.add(new DashboardDTO.StatsItem("贷款申请", loanRepo.count(), ""));
                stats.add(new DashboardDTO.StatsItem("征信报告", creditReportRepo.count(), ""));
                stats.add(new DashboardDTO.StatsItem("风险评估", riskEvalRepo.count(), ""));
            }
            case SME -> {
                Long uid = user.getId();
                List<LoanApplication> myLoans = loanRepo.findByUserId(uid);
                long pending = myLoans.stream().filter(l -> l.getStatus() == LoanApplication.ApplicationStatus.PENDING).count();
                stats.add(new DashboardDTO.StatsItem("我的贷款", myLoans.size(), ""));
                stats.add(new DashboardDTO.StatsItem("待审核", pending, ""));
                stats.add(new DashboardDTO.StatsItem("征信报告", creditReportRepo.count(), ""));
                recentLoans = myLoans.stream().map(l -> DashboardDTO.RecentLoan.builder()
                    .id(l.getId()).companyName(l.getCompanyName()).amount("¥" + l.getLoanAmount())
                    .status(l.getStatus().name()).statusLabel(statusLabel(l.getStatus())).build())
                    .collect(Collectors.toList());
            }
            case FINANCIAL_INSTITUTION -> {
                long pending = loanRepo.countByStatus(LoanApplication.ApplicationStatus.PENDING);
                long approved = loanRepo.countByStatus(LoanApplication.ApplicationStatus.APPROVED);
                stats.add(new DashboardDTO.StatsItem("待审核申请", pending, ""));
                stats.add(new DashboardDTO.StatsItem("已通过", approved, ""));
                stats.add(new DashboardDTO.StatsItem("合作企业", companyRepo.count(), "家"));
                stats.add(new DashboardDTO.StatsItem("预警提醒", 0, ""));
                recentLoans = loanRepo.findTop5ByOrderByCreatedAtDesc().stream()
                    .map(l -> DashboardDTO.RecentLoan.builder().id(l.getId())
                        .companyName(l.getCompanyName()).amount("¥" + l.getLoanAmount())
                        .status(l.getStatus().name()).statusLabel(statusLabel(l.getStatus())).build())
                    .collect(Collectors.toList());
            }
            case FARMER -> {
                List<LoanApplication> myLoans = loanRepo.findByUserId(user.getId());
                long pending = myLoans.stream().filter(l -> l.getStatus() == LoanApplication.ApplicationStatus.PENDING).count();
                stats.add(new DashboardDTO.StatsItem("我的贷款", myLoans.size(), ""));
                stats.add(new DashboardDTO.StatsItem("待审核", pending, ""));
                stats.add(new DashboardDTO.StatsItem("征信报告", creditReportRepo.count(), ""));
                recentLoans = myLoans.stream().map(l -> DashboardDTO.RecentLoan.builder()
                    .id(l.getId()).companyName(l.getCompanyName()).amount("¥" + l.getLoanAmount())
                    .status(l.getStatus().name()).statusLabel(statusLabel(l.getStatus())).build())
                    .collect(Collectors.toList());
            }
            case GOVERNMENT -> {
                stats.add(new DashboardDTO.StatsItem("注册企业", enterpriseRepo.count(), "家"));
                stats.add(new DashboardDTO.StatsItem("注册农户", farmerRepo.count(), "户"));
                stats.add(new DashboardDTO.StatsItem("贷款总额", loanRepo.count(), "笔"));
                stats.add(new DashboardDTO.StatsItem("风险企业", riskEvalRepo.countByRiskLevel("高"), "家"));
            }
            case RISK_MANAGER -> {
                stats.add(new DashboardDTO.StatsItem("待评估企业", companyRepo.count(), "家"));
                stats.add(new DashboardDTO.StatsItem("待审核申请", loanRepo.countByStatus(LoanApplication.ApplicationStatus.PENDING), ""));
                stats.add(new DashboardDTO.StatsItem("高风险预警", riskEvalRepo.countByRiskLevel("高"), ""));
                stats.add(new DashboardDTO.StatsItem("评分模型", 3, "个"));
            }
            case THIRD_PARTY -> {
                long serviceCount = thirdPartyServiceRepo.count();
                long orderCount = serviceOrderRepo.count();
                stats.add(new DashboardDTO.StatsItem("我的服务", serviceCount, ""));
                stats.add(new DashboardDTO.StatsItem("服务订单", orderCount, ""));
                stats.add(new DashboardDTO.StatsItem("待评价", 0, ""));
            }
        }

        return DashboardDTO.builder().stats(stats).recentLoans(recentLoans).recentActivities(activities).build();
    }

    private String statusLabel(LoanApplication.ApplicationStatus s) {
        return switch (s) {
            case DRAFT -> "草稿";
            case SUBMITTED -> "已提交";
            case PENDING -> "待审核";
            case APPROVING -> "审批中";
            case APPROVED -> "已通过";
            case REJECTED -> "已驳回";
            case NEEDS_MANUAL -> "需人工";
        };
    }
}
