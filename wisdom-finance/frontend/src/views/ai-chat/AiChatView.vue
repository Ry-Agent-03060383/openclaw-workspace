<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useUserStore } from '../../store/user'
import { ChatDotSquare, Promotion } from '@element-plus/icons-vue'
import { aiChat } from '../../api/ai'

const userStore = useUserStore()
const messages = ref<{ role: string; content: string; time: string }[]>([])
const inputText = ref('')
const loading = ref(false)

const quickQuestions = computed(() => {
  const common = [
    { label: '贷款申请流程', text: '贷款申请流程是什么？' },
    { label: '征信查询', text: '如何查询企业征信报告？' },
    { label: '利率说明', text: '目前贷款利率是多少？' },
    { label: '所需材料', text: '申请贷款需要什么材料？' },
    { label: '还款方式', text: '有哪些还款方式？' },
    { label: '贷款期限', text: '贷款期限最长多久？' },
  ]
  if (userStore.userType === 'FARMER') {
    common.push({ label: '惠农政策', text: '有哪些惠农贷款政策？' })
  }
  if (userStore.userType === 'SME') {
    common.push({ label: '科技补贴', text: '科技型企业有哪些补贴政策？' })
  }
  if (userStore.userType === 'THIRD_PARTY') {
    common.push({ label: '服务商入驻', text: '如何入驻成为服务商？' })
  }
  return common
})

const chatContainer = ref<HTMLElement | null>(null)

const welcomeMessages = [
  { role: 'bot', content: '您好！我是焦作市智慧金融服务平台的AI智能客服。', time: new Date().toLocaleTimeString() },
  { role: 'bot', content: '我可以为您提供贷款政策咨询、业务流程指引、金融产品介绍等服务。', time: new Date().toLocaleTimeString() },
  { role: 'bot', content: '请问有什么可以帮助您的？您可以直接输入问题，或点击下方快捷问题。', time: new Date().toLocaleTimeString() },
]

const qaMap: Record<string, (role: string) => string> = {
  '贷款申请流程是什么？': (role) => {
    if (role === 'SME' || role === 'FARMER') {
      return '贷款申请流程如下：\n\n1️⃣ 登录平台后进入"贷款申请"页面\n2️⃣ 点击"申请贷款"按钮\n3️⃣ 填写企业/个人信息、贷款金额和用途\n4️⃣ 选择贷款产品和还款方式\n5️⃣ 提交申请后等待金融机构审核\n6️⃣ 审核通过后签署合同并放款\n\n整个流程线上化操作，通常3-5个工作日完成审核。'
    }
    if (role === 'FINANCIAL_INSTITUTION') {
      return '贷款审核流程如下：\n\n1️⃣ 登录平台后进入"贷款审核"页面\n2️⃣ 查看待审核的贷款申请列表\n3️⃣ 点击"通过"或"驳回"进行处理\n4️⃣ 如驳回需填写驳回原因\n5️⃣ 审核通过后贷款状态更新为"已通过"\n\n系统会自动进行风险评估辅助决策。'
    }
    return '贷款申请流程：\n1. 企业/个人在平台提交贷款申请\n2. 金融机构在线审核\n3. 审核通过后签订合同\n4. 银行放款\n\n完整的流程指引请咨询平台客服。'
  },
  '如何查询企业征信报告？': () => '企业征信查询流程：\n\n1️⃣ 登录平台后进入"征信评级"页面\n2️⃣ 在搜索框中输入企业名称或统一社会信用代码\n3️⃣ 点击"查询"按钮即可查看企业信息\n4️⃣ 选择目标企业后可查看信用评分和风险等级\n5️⃣ 点击"生成报告"可生成正式信用报告\n\n信用报告包含企业基本信息、信用评分、风险分析等多个维度。',
  '目前贷款利率是多少？': () => '目前平台上的贷款利率因产品和类型而异：\n\n🏦 企业经营贷款：年利率 3.5% - 6.5%\n💻 科技企业专项贷：年利率 2.5% - 4.5%\n👤 个人经营贷款：年利率 4.0% - 8.0%\n🌾 农户专项贷款：年利率 2.0% - 4.0%\n\n实际利率根据企业资质、信用评分和贷款期限综合确定。信用越好，利率越低！',
  '申请贷款需要什么材料？': (role) => {
    if (role === 'SME' || role === 'FINANCIAL_INSTITUTION') {
      return '企业申请贷款需要准备的材料：\n\n📋 基础材料：\n• 营业执照（副本）\n• 法定代表人身份证\n• 企业征信授权书\n\n💰 财务材料：\n• 近两年财务报表\n• 近6个月银行流水\n• 纳税证明\n\n🏪 经营材料：\n• 经营场所证明\n• 主要业务合同\n• 贷款用途说明'
    }
    if (role === 'FARMER') {
      return '农户申请贷款需要准备的材料：\n\n📋 基础材料：\n• 身份证（正反面）\n• 户口本\n• 土地承包合同或经营权证\n\n🌾 经营材料：\n• 种植/养殖证明\n• 近一年收入证明\n• 贷款用途说明\n\n具体材料以所选贷款产品要求为准。'
    }
    return '申请贷款的基本材料包括：身份证明、经营证明、收入证明、贷款用途说明等。具体材料清单因贷款产品和企业类型而异。'
  },
  '有哪些还款方式？': () => '平台支持以下还款方式：\n\n💰 等额本息：每月还款金额固定，包含本金和利息\n• 适合收入稳定的借款人\n\n💰 等额本金：每月偿还相同本金，利息逐月递减\n• 适合预期未来收入增长的借款人\n\n💰 先息后本：每月只还利息，到期一次性还本\n• 适合短期资金周转\n\n请根据自身经营情况和现金流状况选择合适的还款方式。',
  '贷款期限最长多久？': () => '平台贷款期限根据产品类型有所不同：\n\n📊 企业经营贷款：6-36个月\n📊 科技企业专项贷：12-60个月\n📊 个人经营贷款：3-24个月\n📊 农户专项贷款：3-24个月\n📊 农业产业链贷款：6-36个月\n\n具体期限以所选贷款产品为准，建议根据资金用途和还款能力合理选择。',
  '有哪些惠农贷款政策？': () => '🌾 惠农贷款政策：\n\n1️⃣ 农户专项贷款\n• 额度：1万-30万元\n• 利率：2.0%起（政府贴息）\n• 期限：3-24个月\n• 特点：无抵押、手续简便\n\n2️⃣ 农业产业链贷款\n• 额度：20万-300万元\n• 利率：3.0%起\n• 期限：6-36个月\n• 特点：支持农业全产业链\n\n3️⃣ 政府贴息政策\n• 符合条件的农户可享受50%贴息\n• 具体请咨询当地农业农村部门',
  '科技型企业有哪些补贴政策？': () => '💡 科技型企业扶持政策：\n\n1️⃣ 科技企业专项贷\n• 额度：50万-1000万元\n• 利率：2.5%起（政府贴息）\n• 特点：高新技术企业优先\n\n2️⃣ 研发费用加计扣除\n• 科技型中小企业研发费用可享受75%加计扣除\n\n3️⃣ 科技创新券\n• 用于购买检验检测、知识产权等服务\n\n4️⃣ 科技项目补助\n• 国家级/省级科技项目可获专项资金支持',
  '如何入驻成为服务商？': () => '服务商入驻流程：\n\n1️⃣ 登录平台后联系平台运营团队\n2️⃣ 提交服务商资质材料\n3️⃣ 平台审核通过后签订合作协议\n4️⃣ 配置服务产品和定价\n5️⃣ 正式上线提供服务\n\n如有入驻意向，请联系平台运营人员获取详细信息。',
}

function getResponse(input: string): string {
  const normalized = input.trim().toLowerCase()

  if (normalized.includes('贷款') && normalized.includes('流程')) {
    return qaMap['贷款申请流程是什么？'](userStore.userType)
  }
  if (normalized.includes('征信') || normalized.includes('报告')) {
    return qaMap['如何查询企业征信报告？'](userStore.userType)
  }
  if (normalized.includes('利率') || normalized.includes('利息')) {
    return qaMap['目前贷款利率是多少？'](userStore.userType)
  }
  if (normalized.includes('材料') || normalized.includes('准备')) {
    return qaMap['申请贷款需要什么材料？'](userStore.userType)
  }
  if (normalized.includes('还款') && (normalized.includes('方式') || normalized.includes('方法'))) {
    return qaMap['有哪些还款方式？'](userStore.userType)
  }
  if (normalized.includes('期限') || normalized.includes('最长')) {
    return qaMap['贷款期限最长多久？'](userStore.userType)
  }
  if (normalized.includes('惠农') || normalized.includes('农户')) {
    return qaMap['有哪些惠农贷款政策？'](userStore.userType)
  }
  if (normalized.includes('科技') || normalized.includes('补贴') || normalized.includes('高新')) {
    return qaMap['科技型企业有哪些补贴政策？'](userStore.userType)
  }
  if (normalized.includes('入驻') || normalized.includes('服务商') || normalized.includes('合作')) {
    return qaMap['如何入驻成为服务商？'](userStore.userType)
  }

  const keywords = [
    { keys: ['你好', '您好', 'hi', 'hello', '在吗'], reply: '您好！很高兴为您服务。请问有什么可以帮助您的？' },
    { keys: ['额度', '能贷'], reply: '贷款额度因产品和资质而异，企业经营贷款最高500万元，科技专项贷最高1000万元。您可以在"贷款申请"页面查看具体产品的额度范围。' },
    { keys: ['审核', '多久', '时间'], reply: '贷款审核通常需要3-5个工作日。审核通过后，放款一般在1-3个工作日内到账。' },
    { keys: ['风控', '风险'], reply: '平台采用多维度风险评估模型，从基础资质（30%）、信用记录（35%）、财务状况（25%）、行业风险（10%）四个维度进行综合评估。您可以在"风险处置"页面查看详细的风险评估报告。' },
    { keys: ['注册', '开户'], reply: '平台注册流程：1. 点击登录页的"注册"按钮 2. 填写用户名、密码等基本信息 3. 选择用户类型 4. 提交后等待审核 5. 审核通过后即可登录使用。' },
  ]

  for (const { keys, reply } of keywords) {
    if (keys.some(k => normalized.includes(k))) {
      return reply
    }
  }

  return '非常抱歉，我没有理解您的问题。建议您尝试点击下方的快捷问题，或者换个方式描述您的问题。如需人工服务，请联系平台客服热线。'
}

onMounted(() => {
  messages.value = [...welcomeMessages]
})

async function sendMessage(text?: string) {
  const content = (text || inputText.value).trim()
  if (!content || loading.value) return

  inputText.value = ''
  messages.value.push({ role: 'user', content, time: new Date().toLocaleTimeString() })
  await scrollToBottom()
  loading.value = true

  let reply = ''
  try {
    const res: any = await aiChat(content)
    if (res.code === 200) {
      reply = res.data.reply
    }
  } catch { /* fall through to client-side */ }

  if (!reply) {
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 900))
    reply = getResponse(content)
  }

  messages.value.push({ role: 'bot', content: reply, time: new Date().toLocaleTimeString() })
  loading.value = false
  await scrollToBottom()
}

async function scrollToBottom() {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div class="ai-chat-view">
    <el-card shadow="never" class="chat-card">
      <template #header>
        <div class="chat-header">
          <span><el-icon style="vertical-align:middle;margin-right:6px"><ChatDotSquare /></el-icon>AI智能客服</span>
          <span style="font-size:12px;color:#999">{{ userStore.roleName }}</span>
        </div>
      </template>

      <div ref="chatContainer" class="chat-messages">
        <div v-for="(msg, i) in messages" :key="i" :class="['msg-row', msg.role]">
          <div class="msg-avatar">{{ msg.role === 'bot' ? 'AI' : '我' }}</div>
          <div class="msg-content">
            <div class="msg-bubble"><pre style="white-space:pre-wrap;margin:0;font-family:inherit">{{ msg.content }}</pre></div>
            <div class="msg-time">{{ msg.time }}</div>
          </div>
        </div>
        <div v-if="loading" class="msg-row bot">
          <div class="msg-avatar">AI</div>
          <div class="msg-content">
            <div class="msg-bubble typing"><span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>
          </div>
        </div>
      </div>

      <div class="quick-questions" v-if="messages.length <= 4">
        <span class="q-hint">快捷问题：</span>
        <el-button v-for="q in quickQuestions" :key="q.label" size="small" plain @click="sendMessage(q.text)">{{ q.label }}</el-button>
      </div>

      <div class="chat-input">
        <el-input
          v-model="inputText"
          type="textarea"
          :rows="2"
          placeholder="请输入您的问题，按 Enter 发送"
          :disabled="loading"
          @keydown="handleKeydown"
        />
        <el-button type="primary" :icon="Promotion" :loading="loading" @click="sendMessage()" style="margin-left:12px;align-self:flex-end">发送</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.ai-chat-view { max-width: 800px; margin: 0 auto; }
.chat-card { display: flex; flex-direction: column; }
.chat-header { display: flex; justify-content: space-between; align-items: center; }
.chat-messages { height: 420px; overflow-y: auto; padding: 8px 4px; border-bottom: 1px solid #ebeef5; }
.msg-row { display: flex; gap: 10px; margin-bottom: 16px; }
.msg-row.user { flex-direction: row-reverse; }
.msg-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; }
.msg-row.bot .msg-avatar { background: #ecf5ff; color: #409eff; }
.msg-row.user .msg-avatar { background: #f0f9eb; color: #67c23a; }
.msg-content { max-width: 75%; }
.msg-bubble { padding: 10px 14px; border-radius: 8px; line-height: 1.7; font-size: 14px; }
.msg-row.bot .msg-bubble { background: #f5f7fa; color: #333; border-top-left-radius: 2px; }
.msg-row.user .msg-bubble { background: #409eff; color: #fff; border-top-right-radius: 2px; }
.msg-time { font-size: 11px; color: #c0c4cc; margin-top: 4px; }
.msg-row.user .msg-time { text-align: right; }
.quick-questions { padding: 10px 4px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; border-bottom: 1px solid #ebeef5; }
.q-hint { font-size: 12px; color: #999; margin-right: 4px; }
.chat-input { display: flex; padding: 12px 0; }
.typing .dot { animation: blink 1.4s infinite; font-size: 24px; line-height: 1; }
.typing .dot:nth-child(2) { animation-delay: 0.2s; }
.typing .dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }
</style>
