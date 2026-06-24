<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

// ── SEO ╱ 页面元信息 ──
onMounted(() => {
  document.title = 'AI智能服务 — 焦作市智慧金融服务平台'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', '基于大模型的智能客服，7×24小时在线，AI辅助融资决策。政策问答、产品推荐、企业分析、行情洞察、方案定制、文档审核一站式智能服务。')
})

// ── 滚动入场观察 ──
const observed = ref<Set<Element>>(new Set())
function observeEntries(entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in')
      observed.value.delete(entry.target)
    }
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(observeEntries, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' })
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el)
    observed.value.add(el)
  })
})

// ── 滚动阴影 ──
const scrolled = ref(false)
function handleScroll() {
  scrolled.value = window.scrollY > 60
}
onMounted(() => window.addEventListener('scroll', handleScroll))

// ── 聊天消息 ──
interface ChatMessage {
  role: 'bot' | 'user'
  content: string
  time: string
  avatar: string
}

const chatMessages = ref<ChatMessage[]>([
  {
    role: 'bot',
    content: '您好！我是智慧金融AI助手，很高兴为您服务。我可以帮您解答贷款政策、推荐金融产品、分析企业资质、查询市场行情等。请问有什么可以帮助您的？',
    time: '09:32:15',
    avatar: '🤖',
  },
  {
    role: 'user',
    content: '我想申请贷款需要什么材料？',
    time: '09:32:28',
    avatar: '👤',
  },
  {
    role: 'bot',
    content: '您好！申请贷款通常需要准备以下材料：\n\n📋 **基础材料**：营业执照副本、法定代表人身份证、企业章程\n💰 **财务材料**：近6个月银行流水、近2年度财务报表及纳税证明\n🏢 **经营材料**：经营场所租赁合同或产权证明、主要业务合同\n📑 **贷款用途**：资金使用计划说明、项目可行性报告（大额贷款）\n\n具体所需材料可能因贷款类型和金融机构要求略有差异，建议您提交意向申请后，专属客户经理会为您提供详细的材料清单。',
    time: '09:32:35',
    avatar: '🤖',
  },
])

const chatInput = ref('')

// ── 智能服务矩阵 ──
interface ServiceItem {
  icon: string
  title: string
  desc: string
  color: string
}

const serviceMatrix: ServiceItem[] = [
  { icon: '📋', title: '政策问答', desc: '智能解读最新金融政策、贷款补贴、税收优惠等政策信息，帮助企业把握政策红利', color: '#F56C6C' },
  { icon: '🏦', title: '产品推荐', desc: '根据企业资质和需求，AI智能匹配最优贷款产品和金融服务方案', color: '#409EFF' },
  { icon: '📊', title: '企业分析', desc: '多维度企业数据分析，生成经营画像与信用评估报告，辅助融资决策', color: '#67C23A' },
  { icon: '📈', title: '行情洞察', desc: '实时跟踪利率走势、行业景气指数、区域金融环境，提供市场洞察', color: '#E6A23C' },
  { icon: '🎯', title: '方案定制', desc: '结合企业特点和融资目标，量身定制个性化的综合金融服务方案', color: '#B37FEB' },
  { icon: '🔍', title: '文档审核', desc: 'AI辅助审查贷款申请材料，智能识别缺失、异常及风险项并给出建议', color: '#909399' },
]

// ── 服务统计 ──
interface StatItem {
  icon: string
  value: string
  label: string
  trend: string
  color: string
}

const serviceStats: StatItem[] = [
  { icon: '💬', value: '2,847', label: '服务对话数', trend: '累计对话', color: '#F56C6C' },
  { icon: '🕐', value: '7×24', label: '在线服务时长', trend: '全年无休', color: '#409EFF' },
  { icon: '⭐', value: '98.6%', label: '用户满意度', trend: '好评率', color: '#67C23A' },
]

// ── 贷款计算器 ──
const loanAmount = ref(50)
const loanTerm = ref(12)
const annualRate = 4.35

const monthlyPayment = computed(() => {
  const P = loanAmount.value * 10000
  const n = loanTerm.value
  const r = annualRate / 100 / 12
  if (r === 0) return P / n
  return Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
})

const totalInterest = computed(() => {
  return Math.round(monthlyPayment.value * loanTerm.value - loanAmount.value * 10000)
})

const totalPayment = computed(() => {
  return Math.round(monthlyPayment.value * loanTerm.value)
})

const loanTermOptions = [
  { value: 3, label: '3个月' },
  { value: 6, label: '6个月' },
  { value: 12, label: '12个月' },
  { value: 24, label: '24个月' },
  { value: 36, label: '36个月' },
  { value: 60, label: '60个月' },
]

// ── 导航 ──
function goAiChat() {
  router.push('/dashboard/ai-chat')
}
</script>

<template>
  <div class="ai-service-page">
    <!-- ═══ Navbar ═══ -->
    <nav class="navbar" :class="{ 'navbar-scrolled': scrolled }">
      <div class="navbar-inner section-container">
        <div class="navbar-brand">
          <span class="brand-icon">✦</span>
          <span class="brand-text">智慧金融 · AI智能服务</span>
        </div>
        <div class="navbar-links">
          <a href="#chat-preview">AI对话</a>
          <a href="#service-matrix">服务矩阵</a>
          <a href="#service-stats">服务统计</a>
          <a href="#loan-calc">贷款计算器</a>
        </div>
        <el-button type="danger" round @click="goAiChat" class="navbar-cta">开始AI咨询</el-button>
      </div>
    </nav>

    <!-- ═══ Hero ═══ -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-particles">
          <span v-for="i in 12" :key="i" class="particle" :style="{ '--i': i }" />
        </div>
      </div>
      <div class="hero-content section-container">
        <div class="hero-text animate-on-scroll">
          <span class="hero-badge">🤖 AI智能服务</span>
          <h1 class="hero-title">AI智能服务</h1>
          <p class="hero-subtitle">基于大模型的智能客服，7×24小时在线，AI辅助融资决策</p>
          <p class="hero-desc">
            融合大语言模型与金融领域知识库，为您提供智能问答、产品推荐、<br class="hide-mobile">
            企业分析等一站式智慧金融服务，让融资更高效、更便捷
          </p>
          <div class="hero-actions">
            <el-button type="primary" round size="large" @click="goAiChat" class="hero-btn-primary">
              开始AI咨询
            </el-button>
            <el-button round size="large" plain @click="scrollTo('chat-preview')" class="hero-btn-ghost">
              了解更多
            </el-button>
          </div>
        </div>
        <div class="hero-visual animate-on-scroll">
          <div class="hero-ai-card">
            <div class="hero-ai-orb">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
                <circle cx="100" cy="100" r="30" fill="rgba(255,255,255,0.1)" />
                <text x="100" y="106" text-anchor="middle" fill="#fff" font-size="36">🤖</text>
              </svg>
            </div>
            <div class="hero-ai-tags">
              <span class="ai-tag">智能问答</span>
              <span class="ai-tag">产品推荐</span>
              <span class="ai-tag">企业分析</span>
              <span class="ai-tag">行情洞察</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,120 720,0 1440,60 L1440,120 L0,120 Z" fill="#f5f7fa" />
        </svg>
      </div>
    </section>

    <!-- ═══ Section 1: AI客服对话预览 ═══ -->
    <section ref="chatPreview" id="chat-preview" class="section chat-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">AI对话</span>
          <h2 class="section-title">AI客服对话预览</h2>
          <p class="section-desc">体验智慧金融AI助手的智能对话服务</p>
        </div>

        <div class="chat-preview-card animate-on-scroll">
          <div class="chat-header">
            <div class="chat-header-info">
              <span class="chat-header-avatar">🤖</span>
              <div>
                <div class="chat-header-name">智慧金融AI助手</div>
                <div class="chat-header-status">在线 · 实时响应</div>
              </div>
            </div>
            <div class="chat-header-actions">
              <el-tag size="small" type="danger" effect="plain">7×24小时</el-tag>
            </div>
          </div>
          <div class="chat-body">
            <div v-for="(msg, i) in chatMessages" :key="i" class="chat-message" :class="msg.role">
              <div class="msg-avatar">{{ msg.avatar }}</div>
              <div class="msg-content-wrapper">
                <div class="msg-content" v-html="msg.content.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')" />
                <div class="msg-time">{{ msg.time }}</div>
              </div>
            </div>
          </div>
          <div class="chat-footer">
            <el-input
              v-model="chatInput"
              placeholder="请输入您的问题..."
              disabled
              class="chat-input"
              size="large"
            >
              <template #prefix>
                <span class="chat-input-icon">💬</span>
              </template>
            </el-input>
            <el-button type="danger" disabled class="chat-send-btn" :icon="null">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: 智能服务矩阵 ═══ -->
    <section id="service-matrix" class="section matrix-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">服务矩阵</span>
          <h2 class="section-title">智能服务矩阵</h2>
          <p class="section-desc">六大核心AI能力，全方位赋能企业融资</p>
        </div>

        <div class="matrix-grid">
          <div v-for="(svc, i) in serviceMatrix" :key="svc.title"
            class="matrix-card animate-on-scroll"
            :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="matrix-card-icon" :style="{ background: svc.color + '15' }">
              <span class="matrix-icon">{{ svc.icon }}</span>
            </div>
            <h3 class="matrix-card-title">{{ svc.title }}</h3>
            <p class="matrix-card-desc">{{ svc.desc }}</p>
            <div class="matrix-card-bar" :style="{ background: svc.color }" />
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 3: 服务统计 ═══ -->
    <section id="service-stats" class="section stats-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">服务统计</span>
          <h2 class="section-title">AI服务运营数据</h2>
          <p class="section-desc">持续优化的AI服务，用数据见证价值</p>
        </div>

        <div class="stats-grid">
          <div v-for="(stat, i) in serviceStats" :key="stat.label"
            class="stat-card animate-on-scroll"
            :style="{ animationDelay: `${i * 0.12}s` }">
            <div class="stat-card-inner">
              <div class="stat-icon-circle" :style="{ background: stat.color + '12', color: stat.color }">
                {{ stat.icon }}
              </div>
              <div class="stat-value" :style="{ color: stat.color }">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-trend">{{ stat.trend }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 4: 贷款计算器 ═══ -->
    <section id="loan-calc" class="section calc-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">贷款计算器</span>
          <h2 class="section-title">智能贷款计算器</h2>
          <p class="section-desc">快速估算贷款月供与利息，辅助融资决策（仅供参考）</p>
        </div>

        <div class="calc-card animate-on-scroll">
          <div class="calc-form">
            <div class="calc-field">
              <label class="calc-label">
                贷款金额
                <strong>{{ loanAmount }}万元</strong>
              </label>
              <el-slider
                v-model="loanAmount"
                :min="1"
                :max="1000"
                :step="1"
                show-input
                input-size="small"
                class="calc-slider"
              />
            </div>
            <div class="calc-field">
              <label class="calc-label">贷款期限</label>
              <div class="calc-term-options">
                <el-radio-group v-model="loanTerm">
                  <el-radio-button v-for="opt in loanTermOptions" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <div class="calc-field">
              <label class="calc-label">
                年利率
                <strong class="calc-rate">{{ annualRate }}%</strong>
                <span class="calc-rate-note">（基准利率）</span>
              </label>
            </div>
          </div>
          <div class="calc-result">
            <div class="calc-result-header">预估还款明细</div>
            <div class="calc-result-grid">
              <div class="calc-result-item">
                <div class="calc-result-value highlight">{{ monthlyPayment.toLocaleString() }}</div>
                <div class="calc-result-label">月供（元）</div>
              </div>
              <div class="calc-result-item">
                <div class="calc-result-value">{{ totalInterest.toLocaleString() }}</div>
                <div class="calc-result-label">总利息（元）</div>
              </div>
              <div class="calc-result-item">
                <div class="calc-result-value">{{ totalPayment.toLocaleString() }}</div>
                <div class="calc-result-label">还款总额（元）</div>
              </div>
              <div class="calc-result-item">
                <div class="calc-result-value">{{ loanTerm }}</div>
                <div class="calc-result-label">还款期数（月）</div>
              </div>
            </div>
            <div class="calc-disclaimer">* 计算结果仅供参考，实际利率以金融机构审批为准</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section">
      <div class="cta-bg" />
      <div class="section-container cta-content animate-on-scroll">
        <h2 class="cta-title">开启AI智能融资咨询</h2>
        <p class="cta-desc">7×24小时AI智能客服在线，随时为您解答融资难题，推荐最优方案</p>
        <el-button type="primary" round size="large" @click="goAiChat" class="cta-btn">
          开始AI咨询
          <svg width="18" height="18" viewBox="0 0 24 24" style="margin-left:6px">
            <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </el-button>
      </div>
    </section>

    <!-- ═══ Footer ═══ -->
    <footer class="footer">
      <div class="footer-inner section-container">
        <div class="footer-brand">
          <span class="footer-brand-icon">✦</span>
          <span class="footer-brand-text">焦作市智慧金融服务平台</span>
        </div>
        <div class="footer-links">
          <a href="/">首页</a>
          <a href="#chat-preview">AI对话</a>
          <a href="#service-matrix">服务矩阵</a>
          <a href="#service-stats">服务统计</a>
          <a href="#loan-calc">贷款计算器</a>
        </div>
        <div class="footer-copyright">
          © 2026 焦作市智慧金融服务平台 版权所有 | 豫ICP备xxxxxxxx号
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ═══ Base ═══ */
.ai-service-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  color: #1a1a2e; overflow-x: hidden;
  background: #f5f7fa;
}

.section-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* ═══ Animations ═══ */
.animate-on-scroll {
  opacity: 0; transform: translateY(30px);
  transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
}
.animate-on-scroll.animate-in { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll { opacity: 1; transform: none; transition: none; }
}

/* ═══ Section header ═══ */
.section-header { text-align: center; margin-bottom: 48px; }
.section-label {
  display: inline-block; padding: 4px 16px; border-radius: 20px;
  background: rgba(245,108,108,.1); color: #F56C6C;
  font-size: 13px; font-weight: 600; letter-spacing: 1px; margin-bottom: 10px;
}
.section-title {
  font-size: clamp(28px,5vw,38px); font-weight: 700; margin: 0 0 10px; color: #1a1a2e;
}
.section-desc { font-size: 15px; color: #909399; margin: 0; }
.section { padding: 80px 0; }

/* ═══ Navbar ═══ */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 14px 0; transition: all .3s;
  background: transparent;
}
.navbar-scrolled {
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 12px rgba(0,0,0,.06);
  padding: 8px 0;
}
.navbar-inner {
  display: flex; align-items: center; justify-content: space-between;
}
.navbar-brand {
  display: flex; align-items: center; gap: 8px;
}
.brand-icon {
  font-size: 22px; color: #F56C6C;
}
.brand-text {
  font-size: 17px; font-weight: 600; color: #1a1a2e;
}
.navbar-links {
  display: flex; gap: 28px;
}
.navbar-links a {
  text-decoration: none; color: #606266; font-size: 14px; font-weight: 500;
  transition: color .2s; cursor: pointer;
}
.navbar-links a:hover { color: #F56C6C; }
.navbar-cta { font-weight: 500; }
@media (max-width:768px) {
  .navbar-links { display: none; }
}

/* ═══ Hero ═══ */
.hero {
  position: relative; min-height: 100vh; padding: 100px 0 60px;
  display: flex; align-items: center; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #F56C6C 0%, #f78989 40%, #f9a0a0 70%, #fcbcbc 100%);
  z-index: 0;
}
.hero-particles {
  position: absolute; inset: 0; overflow: hidden;
}
.particle {
  position: absolute; width: 8px; height: 8px; border-radius: 50%;
  background: rgba(255,255,255,.2); animation: particleFloat 8s ease-in-out infinite;
  top: calc(10% + 80% * var(--i) / 12);
  left: calc(5% + 90% * (var(--i) * 7 % 100) / 100);
}
@keyframes particleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: .2; }
  50% { transform: translateY(-40px) scale(1.3); opacity: .5; }
}
.hero-content {
  position: relative; z-index: 1; display: flex; align-items: center;
  gap: 60px; width: 100%;
}
.hero-text { flex: 1; }
.hero-badge {
  display: inline-block; padding: 4px 14px; border-radius: 20px;
  background: rgba(255,255,255,.2); color: #fff;
  font-size: 13px; font-weight: 600; margin-bottom: 16px; backdrop-filter: blur(4px);
}
.hero-title {
  font-size: clamp(42px,8vw,64px); font-weight: 800; margin: 0 0 8px;
  color: #fff; line-height: 1.1;
}
.hero-subtitle {
  font-size: clamp(18px,3vw,24px); font-weight: 500; margin: 0 0 20px;
  color: rgba(255,255,255,.9);
}
.hero-desc {
  font-size: 15px; line-height: 1.7; color: rgba(255,255,255,.8);
  margin: 0 0 32px;
}
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
.hero-btn-primary {
  --el-button-bg-color: #fff !important;
  --el-button-border-color: #fff !important;
  --el-button-text-color: #F56C6C !important;
  --el-button-hover-bg-color: #fef0f0 !important;
  --el-button-hover-border-color: #fef0f0 !important;
  font-weight: 600;
}
.hero-btn-ghost {
  --el-button-text-color: #fff !important;
  --el-button-border-color: rgba(255,255,255,.5) !important;
  --el-button-hover-bg-color: rgba(255,255,255,.1) !important;
  font-weight: 500;
}

.hero-visual { flex: 1; display: flex; justify-content: center; }
.hero-ai-card {
  text-align: center;
}
.hero-ai-orb {
  margin-bottom: 20px;
}
.hero-ai-tags {
  display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;
}
.ai-tag {
  padding: 6px 16px; border-radius: 20px;
  background: rgba(255,255,255,.12); color: #fff;
  font-size: 13px; font-weight: 500;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,.15);
}
@media (max-width: 900px) {
  .hero-content { flex-direction: column; text-align: center; }
  .hero-actions { justify-content: center; }
  .hero-visual { margin-top: 20px; }
}

.hero-wave {
  position: absolute; bottom: -1px; left: 0; right: 0; z-index: 1;
  line-height: 0;
}
.hero-wave svg { width: 100%; height: auto; display: block; }

/* ═══ Section: Chat Preview ═══ */
.chat-section {
  background: #fff;
}
.chat-preview-card {
  max-width: 680px; margin: 0 auto;
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 2px 20px rgba(0,0,0,.06);
  border: 1px solid #f0f0f0;
  background: #fafafa;
}
.chat-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; background: #fff;
  border-bottom: 1px solid #f0f0f0;
}
.chat-header-info {
  display: flex; align-items: center; gap: 10px;
}
.chat-header-avatar {
  font-size: 28px;
}
.chat-header-name {
  font-size: 14px; font-weight: 600; color: #1a1a2e;
}
.chat-header-status {
  font-size: 12px; color: #67C23A;
}
.chat-body {
  padding: 20px; min-height: 280px;
  display: flex; flex-direction: column; gap: 16px;
}
.chat-message {
  display: flex; gap: 10px; max-width: 85%;
}
.chat-message.user {
  align-self: flex-end; flex-direction: row-reverse;
}
.msg-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; flex-shrink: 0;
  background: #f0f2f5;
}
.chat-message.user .msg-avatar {
  background: rgba(245,108,108,.1);
}
.msg-content-wrapper {
  display: flex; flex-direction: column; gap: 4px;
}
.msg-content {
  padding: 12px 16px; border-radius: 12px;
  font-size: 14px; line-height: 1.6; color: #1a1a2e;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.04);
}
.chat-message.user .msg-content {
  background: #F56C6C; color: #fff;
}
.chat-message.user .msg-content :deep(strong) {
  color: rgba(255,255,255,.95);
}
.msg-time {
  font-size: 11px; color: #c0c4cc; padding: 0 4px;
}
.chat-footer {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 20px; background: #fff;
  border-top: 1px solid #f0f0f0;
}
.chat-input { flex: 1; }
.chat-input :deep(.el-input__wrapper) {
  border-radius: 24px;
  background: #f5f7fa;
}
.chat-input-icon {
  font-size: 16px;
}
.chat-send-btn {
  width: 42px; height: 42px; border-radius: 50% !important;
  padding: 0 !important;
  display: flex; align-items: center; justify-content: center;
}
.chat-send-btn svg { display: block; }

/* ═══ Section: Matrix ═══ */
.matrix-section {
  background: #fff;
}
.matrix-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 900px) {
  .matrix-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .matrix-grid { grid-template-columns: 1fr; }
}
.matrix-card {
  background: #fafafa; border-radius: 16px; padding: 32px 24px 24px;
  text-align: center; position: relative; overflow: hidden;
  transition: all .35s cubic-bezier(.22,1,.36,1);
  border: 1px solid #f0f0f0;
}
.matrix-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,0,0,.08);
}
.matrix-card-icon {
  width: 56px; height: 56px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
.matrix-icon { font-size: 28px; }
.matrix-card-title {
  font-size: 18px; font-weight: 600; margin: 0 0 10px; color: #1a1a2e;
}
.matrix-card-desc {
  font-size: 13px; line-height: 1.6; color: #909399; margin: 0;
}
.matrix-card-bar {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 3px; transform: scaleX(0); transform-origin: left;
  transition: transform .5s cubic-bezier(.22,1,.36,1);
}
.matrix-card:hover .matrix-card-bar {
  transform: scaleX(1);
}

/* ═══ Section: Stats ═══ */
.stats-section {
  background: #fff;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; }
}
.stat-card {
  background: #fafafa;
  border-radius: 16px; padding: 36px 24px;
  text-align: center; overflow: hidden;
  transition: all .35s cubic-bezier(.22,1,.36,1);
  border: 1px solid #f0f0f0;
}
.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,0,0,.08);
}
.stat-icon-circle {
  width: 60px; height: 60px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px; font-size: 28px;
}
.stat-value {
  font-size: 36px; font-weight: 800; line-height: 1;
  margin-bottom: 6px;
}
.stat-label {
  font-size: 15px; color: #606266; font-weight: 500; margin-bottom: 6px;
}
.stat-trend {
  font-size: 13px; color: #c0c4cc;
}

/* ═══ Section: Loan Calculator ═══ */
.calc-section {
  background: #f5f7fa;
}
.calc-card {
  display: flex; gap: 32px;
  max-width: 840px; margin: 0 auto;
  background: #fff; border-radius: 20px; padding: 36px;
  box-shadow: 0 2px 20px rgba(0,0,0,.06);
  border: 1px solid #f0f0f0;
}
@media (max-width: 768px) {
  .calc-card { flex-direction: column; padding: 24px; }
}
.calc-form { flex: 1; }
.calc-field { margin-bottom: 28px; }
.calc-label {
  display: flex; align-items: baseline; gap: 6px;
  font-size: 14px; font-weight: 500; color: #606266;
  margin-bottom: 12px;
}
.calc-label strong { color: #1a1a2e; font-size: 16px; }
.calc-rate { color: #F56C6C !important; }
.calc-rate-note { font-size: 12px; color: #c0c4cc; font-weight: 400; }
.calc-slider { width: 100%; }
.calc-slider :deep(.el-slider__runway) { height: 6px; }
.calc-slider :deep(.el-slider__bar) { background: #F56C6C; height: 6px; }
.calc-slider :deep(.el-slider__button) {
  width: 20px; height: 20px; border-color: #F56C6C;
}
.calc-slider :deep(.el-input__wrapper) { border-radius: 8px; }
.calc-term-options {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.calc-term-options :deep(.el-radio-button__inner) {
  border-radius: 8px !important; border: 1px solid #e4e7ed !important;
  padding: 8px 18px; font-size: 13px; border-left: 1px solid #e4e7ed !important;
}
.calc-term-options :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: #F56C6C; color: #fff; border-color: #F56C6C !important;
  box-shadow: none !important;
}
.calc-result {
  width: 260px; flex-shrink: 0;
  background: linear-gradient(135deg, #F56C6C, #f78989);
  border-radius: 16px; padding: 28px 24px;
  color: #fff;
}
@media (max-width: 768px) {
  .calc-result { width: 100%; }
}
.calc-result-header {
  font-size: 15px; font-weight: 600; margin-bottom: 20px;
  opacity: .9;
}
.calc-result-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}
.calc-result-item {
  text-align: center;
}
.calc-result-value {
  font-size: 22px; font-weight: 700; margin-bottom: 4px;
}
.calc-result-value.highlight {
  font-size: 26px;
}
.calc-result-label {
  font-size: 12px; opacity: .8;
}
.calc-disclaimer {
  margin-top: 20px; font-size: 11px; opacity: .6;
  text-align: center;
}

/* ═══ CTA ═══ */
.cta-section {
  position: relative; padding: 80px 0; overflow: hidden;
}
.cta-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #F56C6C 0%, #d65858 100%);
  z-index: 0;
}
.cta-content {
  position: relative; z-index: 1; text-align: center; color: #fff;
}
.cta-title {
  font-size: clamp(28px,5vw,40px); font-weight: 700; margin: 0 0 14px;
}
.cta-desc {
  font-size: 16px; opacity: .85; margin: 0 0 32px;
}
.cta-btn {
  --el-button-bg-color: #fff !important;
  --el-button-border-color: #fff !important;
  --el-button-text-color: #F56C6C !important;
  --el-button-hover-bg-color: #fef0f0 !important;
  --el-button-hover-border-color: #fef0f0 !important;
  font-weight: 600; font-size: 16px; padding: 14px 40px;
  transition: all .3s;
}
.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,.15);
}

/* ═══ Footer ═══ */
.footer {
  background: #1a1a2e; color: rgba(255,255,255,.7); padding: 40px 0 24px;
}
.footer-inner {
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.footer-brand {
  display: flex; align-items: center; gap: 8px;
}
.footer-brand-icon { font-size: 20px; color: #F56C6C; }
.footer-brand-text { font-size: 15px; font-weight: 600; color: #fff; }
.footer-links {
  display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;
}
.footer-links a {
  text-decoration: none; color: rgba(255,255,255,.6); font-size: 13px;
  transition: color .2s; cursor: pointer;
}
.footer-links a:hover { color: #F56C6C; }
.footer-copyright {
  font-size: 12px; color: rgba(255,255,255,.4);
  text-align: center;
}
</style>