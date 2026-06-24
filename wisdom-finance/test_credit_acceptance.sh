#!/bin/bash
# 征信系统验收测试
set -e

TOKEN=$(cat /tmp/btok.txt | tr -d '\n')
echo "Token: ${TOKEN:0:20}..."
AUTH="Authorization: Bearer $TOKEN"

echo ""
echo "========================================"
echo " 智慧金服 · 征信系统验收测试"
echo "========================================"

echo ""
echo "📋 [1/4] 企业征信列表（8家）"
echo "──────────────────────────────"
curl -s http://localhost:8081/api/credit/companies -H "$AUTH" | python -c "
import sys,json
d=json.load(sys.stdin)['data']
for c in d:
    s=c['creditScore']
    if s>=80: ic='🟢'
    elif s>=60: ic='🟡'
    else: ic='🔴'
    print(f'  {ic} {c[\"companyName\"]:　<6} 评分:{s:>2}  行业:{c[\"industry\"]:　<6} 营收:{c[\"annualRevenue\"]:>5}万  员工:{c[\"employeeCount\"]}人')
"

echo ""
echo "📊 [2/4] 智信科技 维度评分分解"
echo "──────────────────────────────"
curl -s http://localhost:8081/api/credit/score/breakdown/1 -H "$AUTH" | python -c "
import sys,json
d=json.load(sys.stdin)['data']
print(f'  综合评分: {d[\"total\"]}分  信用等级: {d[\"creditLevel\"]}  风险等级: {d[\"riskLevel\"]}')
for k,v in d['dimensions'].items():
    bar='█'*int(v['score']//5)+'░'*int(20-v['score']//5)
    print(f'  {v[\"name\"]:　<6} {v[\"score\"]:>2}分 {bar} (权重{v[\"weight\"]})')
"

echo ""
echo "🏢 [3/4] 恒达地产 完整征信报告"
echo "──────────────────────────────"
curl -s http://localhost:8081/api/credit/company/5/full -H "$AUTH" | python -c "
import sys,json
d=json.load(sys.stdin)['data']
c=d['company']
s=d['scoreBreakdown']
print(f'  企业: {c[\"companyName\"]}')
print(f'  行业: {c[\"industry\"]}   注册资本: {c[\"registeredCapital\"]}万   员工: {c[\"employeeCount\"]}人')
print(f'  营收: {c[\"annualRevenue\"]}万   地址: {c[\"address\"]}')
print(f'  ────────────────────────────────')
print(f'  重算评分: {s[\"total\"]}分  等级: {s[\"creditLevel\"]}  风险: {s[\"riskLevel\"]}')
for k,v in s['dimensions'].items():
    bar='█'*int(v['score']//5)+'░'*int(20-v['score']//5)
    print(f'  {v[\"name\"]:　<6} {v[\"score\"]:>2}分 {bar}')
"

echo ""
echo "⚠️ [4/4] 高风险企业排行"
echo "──────────────────────────────"
curl -s -X POST http://localhost:8081/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"risk","password":"password"}' > /tmp/risk.json
RK=$(python -c "import json; print(json.load(open('/tmp/risk.json'))['data']['token'])")
curl -s http://localhost:8081/api/credit/top-risk -H "Authorization: Bearer $RK" | python -c "
import sys,json
d=json.load(sys.stdin)
items=d.get('data',d) if isinstance(d,dict) else d
for item in items:
    print(f'  🔴 {item[\"companyName\"]:　<6} 评分:{item[\"creditScore\"]}  等级:{item.get(\"creditLevel\",\"?\")}  风险:{item[\"riskLevel\"]}')
" 2>/dev/null || echo '  (暂无高风险企业数据)'

echo ""
echo "========================================"
echo " ✅ 验收测试完成"
echo "========================================"
