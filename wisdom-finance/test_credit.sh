#!/bin/bash
# 征信系统测试脚本

API_BASE="http://localhost:8081"
echo "========================================"
echo " 智慧金服 - 征信系统功能测试"
echo "========================================"

# 1. 登录获取Token
echo ""
echo "[1/6] 登录银行用户..."
LOGIN_RESP=$(curl -s -X POST "$API_BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"bank","password":"password"}')
TOKEN=$(echo "$LOGIN_RESP" | python -c "import sys,json; print(json.load(sys.stdin)['data']['token'])" 2>/dev/null)
if [ -z "$TOKEN" ]; then
  echo "  ❌ 登录失败"
  echo "$LOGIN_RESP"
  exit 1
fi
echo "  ✅ 登录成功 | Token: ${TOKEN:0:20}..."

AUTH="Authorization: Bearer $TOKEN"

# 2. 查询所有企业
echo ""
echo "[2/6] 获取企业征信列表..."
COMPANIES=$(curl -s "$API_BASE/api/credit/companies" -H "$AUTH")
echo "$COMPANIES" | python -c "
import sys, json
data = json.load(sys.stdin)
items = data.get('data', data)
if isinstance(items, list):
    print(f'  共 {len(items)} 家企业')
    icons = {'LOW':'🟢','MEDIUM':'🟡','HIGH':'🔴'}
    for c in items:
        rl = c.get('riskLevel','?')
        print(f'  {icons.get(rl,\"⚪\")} {c[\"companyName\"]} | 评分:{c.get(\"creditScore\",\"?\")} | 风险:{rl} | 行业:{c.get(\"industry\",\"?\")}')
else:
    print(f'  返回数据格式: {json.dumps(data, ensure_ascii=False)[:200]}')
" 2>/dev/null || echo "  ⚠️ 解析失败: $COMPANIES"

# 3. 智信科技评分分解
echo ""
echo "[3/6] 智信科技 5维度评分分解..."
BD=$(curl -s "$API_BASE/api/credit/score/breakdown/1" -H "$AUTH")
echo "$BD" | python -c "
import sys, json
data = json.load(sys.stdin)
d = data.get('data', data)
print(f'  综合评分: {d.get(\"total\",\"?\")}')
print(f'  信用等级: {d.get(\"creditLevel\",\"?\")}')
print(f'  风险等级: {d.get(\"riskLevel\",\"?\")}')
dims = d.get('dimensions', d.get('breakdown', {}))
for k, v in dims.items():
    if isinstance(v, dict):
        print(f'  📌 {v.get(\"name\",k)}: {v.get(\"score\",\"?\")}分 (权重{v.get(\"weight\",\"?\")})')
        if v.get('description'):
            print(f'     {v[\"description\"]}')
" 2>/dev/null

# 4. 恒达地产完整征信
echo ""
echo "[4/6] 恒达地产(房地产) 完整征信报告..."
FULL=$(curl -s "$API_BASE/api/credit/company/5/full" -H "$AUTH")
echo "$FULL" | python -c "
import sys, json
data = json.load(sys.stdin)
d = data.get('data', data)
print(f'  企业: {d.get(\"companyName\",\"?\")}')
print(f'  评分: {d.get(\"creditScore\",\"?\")} | 等级: {d.get(\"creditLevel\",\"?\")} | 风险: {d.get(\"riskLevel\",\"?\")}')
dims = d.get('dimensions', {})
if dims:
    for k, v in dims.items():
        if isinstance(v, dict):
            print(f'  {v.get(\"name\",k)}: {v.get(\"score\",\"?\")}分')
" 2>/dev/null

# 5. 批量评分评估
echo ""
echo "[5/6] 批量评分评估 (8家企业)..."
BATCH=$(curl -s -X POST "$API_BASE/api/credit/batch-evaluate" \
  -H "$AUTH" -H "Content-Type: application/json" \
  -d '[1,2,3,4,5,6,7,8]')
echo "$BATCH" | python -c "
import sys, json
data = json.load(sys.stdin)
items = data if isinstance(data, list) else data.get('data', [])
icons = {'LOW':'🟢','MEDIUM':'🟡','HIGH':'🔴'}
for item in items:
    rl = item.get('riskLevel','?')
    print(f'  {icons.get(rl,\"⚪\")} {item.get(\"companyName\",\"?\"):　<6} | 评分:{item.get(\"score\",\"?\")} | 等级:{item.get(\"creditLevel\",\"?\")} | 风险:{rl}')
" 2>/dev/null

# 6. 高风险企业 (风控经理视角)
echo ""
echo "[6/6] 高风险企业榜单..."
RISK_LOGIN=$(curl -s -X POST "$API_BASE/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"risk","password":"password"}')
RISK_TOKEN=$(echo "$RISK_LOGIN" | python -c "import sys,json; print(json.load(sys.stdin)['data']['token'])" 2>/dev/null)
TOP=$(curl -s "$API_BASE/api/credit/top-risk" -H "Authorization: Bearer $RISK_TOKEN")
echo "$TOP" | python -c "
import sys, json
data = json.load(sys.stdin)
items = data if isinstance(data, list) else data.get('data', [])
for item in items:
    print(f'  🔴 {item.get(\"companyName\",\"?\")} | 评分:{item.get(\"creditScore\",item.get(\"score\",\"?\"))} | 风险:{item.get(\"riskLevel\",\"?\")}')
" 2>/dev/null

echo ""
echo "========================================"
echo " ✅ 征信系统测试完成"
echo "========================================"
