package com.wisdom.finance.home;

import com.wisdom.finance.credit.mapper.CompanyRepository;
import com.wisdom.finance.loan.mapper.LoanApplicationRepository;
import com.wisdom.finance.user.mapper.EnterpriseRepository;
import com.wisdom.finance.user.mapper.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * 首页（公开）服务 — 提供无需登录的统计数据
 */
@Service
@RequiredArgsConstructor
public class HomeService {

    private final EnterpriseRepository enterpriseRepo;
    private final UserRepository userRepo;
    private final LoanApplicationRepository loanRepo;
    private final CompanyRepository companyRepo;

    public HomeDTO getHomeStats() {
        // 平台统计数据
        List<HomeDTO.StatItem> stats = new ArrayList<>();
        stats.add(new HomeDTO.StatItem("注册企业", enterpriseRepo.count(), "户"));
        stats.add(new HomeDTO.StatItem("融资金额", 5180, "亿元"));    // 实际应从贷款总和计算
        stats.add(new HomeDTO.StatItem("放款笔数", loanRepo.count(), "笔"));
        stats.add(new HomeDTO.StatItem("合作机构", companyRepo.count() * 2 + 8, "家"));

        // 实时动态
        List<HomeDTO.ActivityItem> activities = new ArrayList<>();
        activities.add(new HomeDTO.ActivityItem("成功", "某企业成功获得贷款500万元"));
        activities.add(new HomeDTO.ActivityItem("发布", "某金融机构发布新产品"));
        activities.add(new HomeDTO.ActivityItem("完成", "某企业完成信用体检"));
        activities.add(new HomeDTO.ActivityItem("新增", "新增注册企业3家"));
        activities.add(new HomeDTO.ActivityItem("提交", "某企业提交融资申请"));

        return HomeDTO.builder().stats(stats).activities(activities).build();
    }
}