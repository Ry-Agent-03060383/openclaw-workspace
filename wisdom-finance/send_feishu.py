import json, urllib.request, os

# Try multiple paths for the secret file
paths = [
    "/c/Users/46532/AppData/Local/hermes/feishu_secret.tmp",
    "/tmp/feishu_secret.txt",
    os.path.join(os.path.dirname(__file__) or ".", "feishu_secret.txt"),
    "C:\\Users\\46532\\AppData\\Local\\hermes\\feishu_secret.tmp",
]

APP_SECRET = None
for p in paths:
    if os.path.exists(p):
        with open(p) as f:
            APP_SECRET = f.read().strip()
        print(f"Read secret from {p}")
        break

if not APP_SECRET:
    print("ERROR: Cannot find secret file")
    exit(1)

APP_ID = "cli_aab3b1a929385ccc"
CHAT_ID = "oc_ebfc027104809df98dd48934f5bd375e"

# Get token
req = urllib.request.Request(
    'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    data=json.dumps({"app_id": APP_ID, "app_secret": APP_SECRET}).encode(),
    headers={'Content-Type': 'application/json; charset=utf-8'}
)
resp = json.loads(urllib.request.urlopen(req).read())
token = resp.get('tenant_access_token', '')
print(f"✅ Token: {token[:10]}...")

# Send message to group
print("\n📤 发送消息到「智慧金服UI设计讨论组」...")

# Try post message (rich text)
post_content = json.dumps({
    "zh_cn": {
        "title": "🎨 智慧金服UI设计讨论组",
        "content": [[
            {"tag": "text", "text": "🎉 欢迎加入UI设计讨论组！\n\n"},
            {"tag": "text", "text": "专家团队已就位：\n"},
            {"tag": "text", "text": "🎨 Ry-UI-001 - 首席UI架构师\n"},
            {"tag": "text", "text": "🎨 Ry-UI-002 - 交互设计专家\n"},
            {"tag": "text", "text": "🎨 Ry-UI-003 - 视觉设计专家\n"},
            {"tag": "text", "text": "🎨 Ry-UI-004 - 前端实现专家\n\n"},
            {"tag": "text", "text": "请Ry-BOSS 布置智慧金服平台首页功能设计任务！"}
        ]]
    }
}, ensure_ascii=False)

req2 = urllib.request.Request(
    f'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    data=json.dumps({
        "receive_id": CHAT_ID,
        "msg_type": "post",
        "content": post_content
    }).encode(),
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json; charset=utf-8'
    },
    method='POST'
)
try:
    resp2 = json.loads(urllib.request.urlopen(req2).read())
    code = resp2.get('code', -1)
    if code == 0:
        print(f"  ✅ 富文本消息发送成功! id={resp2['data']['message_id']}")
    else:
        print(f"  ⚠️ 富文本消息发送失败: code={code}")
except urllib.error.HTTPError as e:
    print(f"  ⚠️ 富文本错误 {e.code}")

# Fallback: text message
print("\n📤 发送文字消息（备用）...")
text_content = json.dumps({
    "text": "🎉 智慧金服UI设计讨论组已创建！\n\n专家团队已就位：\n🎨 Ry-UI-001 - 首席UI架构师\n🎨 Ry-UI-002 - 交互设计专家\n🎨 Ry-UI-003 - 视觉设计专家\n🎨 Ry-UI-004 - 前端实现专家\n\n请@Ry-BOSS 布置首页功能设计任务！"
}, ensure_ascii=False)

req3 = urllib.request.Request(
    f'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    data=json.dumps({
        "receive_id": CHAT_ID,
        "msg_type": "text",
        "content": text_content
    }).encode(),
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json; charset=utf-8'
    },
    method='POST'
)
try:
    resp3 = json.loads(urllib.request.urlopen(req3).read())
    code = resp3.get('code', -1)
    if code == 0:
        print(f"  ✅ 文字消息发送成功!")
    else:
        print(f"  ❌ 失败: code={code}, msg={resp3.get('msg','')}")
        print(json.dumps(resp3, indent=2, ensure_ascii=False)[:400])
except urllib.error.HTTPError as e:
    err = e.read().decode()
    print(f"  ❌ HTTP错误 {e.code}: {err[:400]}")

print("\n🎉 完成!")