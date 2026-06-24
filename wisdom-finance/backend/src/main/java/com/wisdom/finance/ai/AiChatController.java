package com.wisdom.finance.ai;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import com.wisdom.finance.common.controller.Result;
import lombok.RequiredArgsConstructor;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiChatController {

    private final RestTemplate restTemplate;

    @Value("${ai.openai.api-key:}")
    private String apiKey;

    @Value("${ai.openai.model:gpt-4}")
    private String model;

    @PostMapping("/chat")
    public Result<Map<String, Object>> chat(@RequestBody Map<String, String> body) {
        String message = body.getOrDefault("message", "");
        if (message.isBlank()) {
            return Result.error(400, "消息不能为空");
        }

        Map<String, Object> data = new LinkedHashMap<>();
        data.put("reply", generateReply(message));
        data.put("sessionId", "session-" + UUID.randomUUID().toString().substring(0, 8));
        data.put("timestamp", System.currentTimeMillis());
        return Result.success(data);
    }

    @GetMapping("/chat/sessions")
    public Result<List<Map<String, String>>> listSessions() {
        return Result.success(List.of(
                Map.of("id", "session-demo", "title", "贷款咨询", "time", "2026-06-17 10:00")
        ));
    }

    @GetMapping("/chat/history/{sessionId}")
    public Result<List<Map<String, String>>> getHistory(@PathVariable String sessionId) {
        return Result.success(List.of(
                Map.of("role", "bot", "content", "您好！我是AI智能客服，请问有什么可以帮您？")
        ));
    }

    @PostMapping("/policy/search")
    public Result<List<Map<String, String>>> searchPolicy(@RequestBody Map<String, String> body) {
        String keyword = body.getOrDefault("keyword", "");
        List<Map<String, String>> results = new ArrayList<>();
        if (keyword.contains("贴息") || keyword.contains("补贴")) {
            results.add(Map.of("title", "小微企业贷款贴息政策", "summary", "对符合条件的小微企业给予最高50%的贷款贴息"));
            results.add(Map.of("title", "科技型企业研发补贴", "summary", "科技型中小企业可享受研发费用75%加计扣除"));
        }
        if (keyword.contains("惠农") || keyword.contains("农业")) {
            results.add(Map.of("title", "惠农贷款贴息政策", "summary", "符合条件的农户可享受50%的贷款贴息"));
        }
        return Result.success(results);
    }

    @PostMapping("/loan/consult")
    public Result<Map<String, Object>> consult(@RequestBody Map<String, String> body) {
        String amount = body.getOrDefault("amount", "100");
        String term = body.getOrDefault("term", "12");
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("estimatedRate", "3.5% - 6.5%");
        result.put("monthlyPayment", "约 ¥" + String.format("%.2f", Double.parseDouble(amount) * 10000 / Double.parseDouble(term) * 1.035 / 12));
        result.put("totalInterest", "约 ¥" + String.format("%.2f", Double.parseDouble(amount) * 10000 * 0.045));
        result.put("recommendedProducts", List.of("企业经营贷款", "科技企业专项贷"));
        return Result.success(result);
    }

    @PostMapping("/analyze/enterprise")
    public Result<Map<String, Object>> analyzeEnterprise(@RequestBody Map<String, String> body) {
        String name = body.getOrDefault("enterpriseName", "");
        Map<String, Object> analysis = new LinkedHashMap<>();
        analysis.put("enterpriseName", name);
        analysis.put("creditScore", 85);
        analysis.put("riskLevel", "低");
        analysis.put("analysis", "该企业经营状况良好，信用记录优秀，偿债能力强，建议优先推荐低利率产品。");
        return Result.success(analysis);
    }

    @PostMapping("/analyze/market")
    public Result<Map<String, Object>> analyzeMarket() {
        Map<String, Object> market = new LinkedHashMap<>();
        market.put("avgRate", "4.2%");
        market.put("totalLoans", 156);
        market.put("totalAmount", "¥1.2亿");
        market.put("trend", "stable");
        return Result.success(market);
    }

    private String generateReply(String message) {
        String msg = message.trim().toLowerCase();
        if (msg.contains("贷款") && msg.contains("流程")) {
            return "贷款申请流程：\n1. 登录平台进入贷款申请页面\n2. 填写企业/个人信息和贷款金额\n3. 选择贷款产品和还款方式\n4. 提交后等待金融机构审核\n5. 审核通过后签约放款";
        }
        if (msg.contains("利率") || msg.contains("利息")) {
            return "目前平台贷款利率因产品而异：企业经营贷款3.5%-6.5%，科技企业专项贷2.5%-4.5%，农户专项贷款2.0%-4.0%。具体利率根据企业资质确定。";
        }
        if (msg.contains("征信")) {
            return "企业征信查询：进入\"征信评级\"页面，输入企业名称或信用代码即可查询信用评分和风险等级。";
        }
        if (msg.contains("材料")) {
            return "企业贷款基本材料：营业执照、法人身份证、近两年财务报表、近6个月银行流水、贷款用途说明。";
        }
        if (msg.contains("还款")) {
            return "支持等额本息、等额本金和先息后本三种还款方式，可根据自身情况选择。";
        }
        return "您好！我是智慧金服AI客服。您可以咨询贷款申请流程、利率说明、征信查询、所需材料等问题。";
    }
}
