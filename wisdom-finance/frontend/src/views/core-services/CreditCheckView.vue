<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ── SEO ╱ 页面元信息 ──
onMounted(() => {
  document.title = '信用体检 — 焦作市智慧金融服务平台'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', '多维数据融合，企业信用一键体检。焦作市智慧金融服务平台提供企业信用评分、5维评分体系、信用体检报告等一站式信用服务。')
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

function goLogin() {
  router.push('/login')
}

// ── Donut 图表数据 ──
interface DonutSegment {
  label: string
  value: number
  color: string
  icon: string
}

const donutData: DonutSegment[] = [
  { label: '优秀 (80-100)', value: 20, color: '#67C23A', icon: '🏆' },
  { label: '良好 (60-79)', value: 40, color: '#409EFF', icon: '👍' },
  { label: '一般 (40-59)', value: 30, color: '#E6A23C', icon: '⚠️' },
  { label: '较差 (0-39)', value: 10, color: '#F56C6C', icon: '🔻' },
]

// SVG donut: accumulate angles
const donutRadius = 90
const donutStroke = 28
const donutCx = 120
const donutCy = 120
const donutCircumference = 2 * Math.PI * donutRadius

interface DonutArc {
  offset: number
  length: number
  color: string
}

const donutArcs = computed<DonutArc[]>(() => {
  let currentOffset = 0
  return donutData.map(seg => {
    const length = (seg.value / 100) * donutCircumference
    const arc: DonutArc = { offset: currentOffset, length, color: seg.color }
    currentOffset += length
    return arc
  })
})

// ── 5维评分体系 ──
interface DimensionItem {
  name: string
  percentage: number
  color: string
  icon: string
  desc: string
}

const dimensions: DimensionItem[] = [
  { name: '基础信息', percentage: 20, color: '#67C23A', icon: '📋', desc: '企业工商登记、股东结构、经营资质等基础数据' },
  { name: '信贷历史', percentage: 25, color: '#409EFF', icon: '🏦', desc: '历史借贷记录、还款履约情况、授信额度使用' },
  { name: '财务状况', percentage: 35, color: '#E6A23C', icon: '📊', desc: '资产负债率、现金流、营收增长、盈利指标' },
  { name: '法律合规', percentage: 12, color: '#909399', icon: '⚖️', desc: '涉诉记录、行政处罚、经营异常、合规审查' },
  { name: '行业前景', percentage: 8, color: '#B37FEB', icon: '🚀', desc: '行业景气度、政策导向、市场竞争格局' },
]

// ── 操作流程 ──
interface StepItem {
  icon: string
  title: string
  desc: string
}

const steps: StepItem[] = [
  { icon: '🔑', title: '企业授权', desc: '企业在线签署数据授权协议，合规采集信用数据' },
  { icon: '📡', title: '数据采集', desc: '对接工商、税务、司法、银行等多源异构数据' },
  { icon: '🧠', title: '智能分析', desc: 'AI模型多维度交叉验证，生成企业信用画像' },
  { icon: '📄', title: '体检报告', desc: '输出可视化信用报告，含评分、风险提示与建议' },
]

// ── 优势卡片 ──
interface FeatureItem {
  icon: string
  title: string
  desc: string
}

const features: FeatureItem[] = [
  { icon: '🔗', title: '多源数据融合', desc: '整合政务数据、金融数据、公开数据等20+数据源，全方位画像企业信用' },
  { icon: '🤖', title: 'AI智能评估', desc: '基于深度学习模型的信用评分引擎，秒级输出精准评级结果' },
  { icon: '📱', title: '全流程线上化', desc: '从授权、采集到报告输出全程线上操作，企业足不出户完成体检' },
  { icon: '🔒', title: '数据安全合规', desc: '通过国密算法加密传输存储，严格遵循数据安全法和个人信息保护法' },
]
</script>

<template>
  <div class="credit-check-page">
    <!-- ═══ Navbar ═══ -->
    <nav class="navbar" :class="{ 'navbar-scrolled': scrolled }">
      <div class="navbar-inner section-container">
        <div class="navbar-brand">
          <span class="brand-icon">✦</span>
          <span class="brand-text">智慧金融 · 信用体检</span>
        </div>
        <div class="navbar-links">
          <a href="#score-model">评分模型</a>
          <a href="#dimensions">评分体系</a>
          <a href="#process">操作流程</a>
          <a href="#features">核心优势</a>
        </div>
        <el-button type="success" round @click="goLogin" class="navbar-cta">立即体检</el-button>
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
          <span class="hero-badge">🔍 企业信用服务</span>
          <h1 class="hero-title">信用体检</h1>
          <p class="hero-subtitle">多维数据融合，企业信用一键体检</p>
          <p class="hero-desc">
            基于政府授权数据与AI智能模型，为中小企业提供专业、精准、高效的<br class="hide-mobile">
            企业信用评分与风险诊断服务，助力融资更便捷
          </p>
          <div class="hero-actions">
            <el-button type="primary" round size="large" @click="goLogin" class="hero-btn-primary">
              立即体检
            </el-button>
            <el-button round size="large" plain @click="router.push('/')" class="hero-btn-ghost">
              了解更多
            </el-button>
          </div>
        </div>
        <div class="hero-visual animate-on-scroll">
          <div class="hero-card-stack">
            <div class="hero-card card-1">📋 工商数据</div>
            <div class="hero-card card-2">🏦 信贷记录</div>
            <div class="hero-card card-3">📊 财务分析</div>
            <div class="hero-card card-4">⚖️ 司法合规</div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,120 720,0 1440,60 L1440,120 L0,120 Z" fill="#f5f7fa" />
        </svg>
      </div>
    </section>

    <!-- ═══ Section 1: 信用评分模型 ═══ -->
    <section id="score-model" class="section score-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">评分模型</span>
          <h2 class="section-title">企业信用评分模型</h2>
          <p class="section-desc">基于多维度数据的综合评估，精准反映企业信用状况</p>
        </div>

        <div class="score-content">
          <div class="chart-area animate-on-scroll">
            <div class="donut-wrapper">
              <svg width="240" height="240" viewBox="0 0 240 240">
                <!-- Background circle -->
                <circle :cx="donutCx" :cy="donutCy" :r="donutRadius" fill="none"
                  stroke="#f0f2f5" :stroke-width="donutStroke" />
                <!-- Segments -->
                <circle v-for="(arc, i) in donutArcs" :key="i"
                  :cx="donutCx" :cy="donutCy" :r="donutRadius" fill="none"
                  :stroke="arc.color" :stroke-width="donutStroke"
                  stroke-linecap="round"
                  :stroke-dasharray="`${arc.length} ${donutCircumference - arc.length}`"
                  :stroke-dashoffset="-arc.offset"
                  transform="rotate(-90 120 120)"
                  class="donut-segment"
                  :style="{ animationDelay: `${i * 0.15}s` }" />
                <!-- Center text -->
                <text x="120" y="112" text-anchor="middle" class="donut-center-value">信用</text>
                <text x="120" y="132" text-anchor="middle" class="donut-center-label">评分</text>
              </svg>
            </div>
          </div>

          <div class="legend-area animate-on-scroll">
            <div class="legend-title">企业信用分布</div>
            <div class="legend-items">
              <div v-for="(item, i) in donutData" :key="i" class="legend-item">
                <span class="legend-dot" :style="{ background: item.color }" />
                <span class="legend-icon">{{ item.icon }}</span>
                <span class="legend-label">{{ item.label }}</span>
                <span class="legend-value" :style="{ color: item.color }">{{ item.value }}%</span>
              </div>
            </div>
            <div class="legend-note">
              <p>数据基于平台已授信企业样本统计，评分区间0-100分</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: 5维评分体系 ═══ -->
    <section id="dimensions" class="section dims-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">评分体系</span>
          <h2 class="section-title">5维评分体系</h2>
          <p class="section-desc">从多维度全面评估企业信用状况，科学衡量企业信用价值</p>
        </div>

        <div class="dims-grid">
          <div v-for="(dim, i) in dimensions" :key="i"
            class="dim-card animate-on-scroll" :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="dim-radial">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="48" fill="none" stroke="#f0f2f5" stroke-width="8" />
                <circle cx="60" cy="60" r="48" fill="none"
                  :stroke="dim.color" stroke-width="8" stroke-linecap="round"
                  :stroke-dasharray="`${(dim.percentage / 100) * 2 * Math.PI * 48} ${2 * Math.PI * 48}`"
                  transform="rotate(-90 60 60)"
                  class="dim-progress"
                  :style="{ animationDelay: `${i * 0.15 + 0.3}s` }" />
                <text x="60" y="56" text-anchor="middle" class="dim-pct-value"
                  :style="{ fill: dim.color }">{{ dim.percentage }}%</text>
                <text x="60" y="72" text-anchor="middle" class="dim-pct-label">权重</text>
              </svg>
            </div>
            <div class="dim-info">
              <span class="dim-icon">{{ dim.icon }}</span>
              <h3 class="dim-name">{{ dim.name }}</h3>
              <p class="dim-desc">{{ dim.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 3: 操作流程 ═══ -->
    <section id="process" class="section process-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">操作流程</span>
          <h2 class="section-title">信用体检流程</h2>
          <p class="section-desc">简单四步，完成企业信用健康体检</p>
        </div>

        <div class="process-steps">
          <div v-for="(step, i) in steps" :key="i" class="step-item animate-on-scroll"
            :style="{ animationDelay: `${i * 0.12}s` }">
            <div class="step-connector" v-if="i < steps.length - 1">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M5 20 L35 20" stroke="#67C23A" stroke-width="2" stroke-dasharray="6 4"
                  fill="none" class="step-arrow-line" />
                <polygon points="33,16 38,20 33,24" fill="#67C23A" class="step-arrow-head" />
              </svg>
            </div>
            <div class="step-card">
              <div class="step-number" :style="{ background: `rgba(103,194,58,${1 - i * 0.15})` }">
                {{ i + 1 }}
              </div>
              <div class="step-icon">{{ step.icon }}</div>
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 4: 核心优势 ═══ -->
    <section id="features" class="section features-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">核心优势</span>
          <h2 class="section-title">为什么选择我们</h2>
          <p class="section-desc">政府主导平台，数据驱动，安全可信</p>
        </div>

        <div class="features-grid">
          <div v-for="(feat, i) in features" :key="i" class="feature-card animate-on-scroll"
            :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="feature-icon-wrapper" :style="{ background: `rgba(103,194,58,${0.1 + i * 0.02})` }">
              <span class="feature-icon">{{ feat.icon }}</span>
            </div>
            <h3 class="feature-title">{{ feat.title }}</h3>
            <p class="feature-desc">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section">
      <div class="cta-bg" />
      <div class="section-container cta-content animate-on-scroll">
        <h2 class="cta-title">立即开启企业信用体检</h2>
        <p class="cta-desc">登录平台，一键获取专业企业信用评估报告，开启融资便捷通道</p>
        <el-button type="primary" round size="large" @click="goLogin" class="cta-btn">
          立即体检
          <el-icon style="margin-left:6px"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></el-icon>
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
          <a href="#score-model">评分模型</a>
          <a href="#dimensions">评分体系</a>
          <a href="#process">操作流程</a>
          <a href="#features">核心优势</a>
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
.credit-check-page {
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
  background: rgba(103,194,58,.1); color: #67C23A;
  font-size: 13px; font-weight: 600; margin-bottom: 10px;
}
.section-title {
  font-size: clamp(28px,5vw,38px); font-weight: 700; margin: 0 0 10px; color: #1a1a2e;
}
.section-desc { font-size: 15px; color: #909399; margin: 0; }

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
  font-size: 22px; color: #67C23A;
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
.navbar-links a:hover { color: #67C23A; }
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
  background: linear-gradient(135deg, #67C23A 0%, #85CE61 40%, #A8D86C 70%, #C5E87D 100%);
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
  --el-button-text-color: #67C23A !important;
  --el-button-hover-bg-color: #f0f9eb !important;
  --el-button-hover-border-color: #f0f9eb !important;
  font-weight: 600;
}
.hero-btn-ghost {
  --el-button-text-color: #fff !important;
  --el-button-border-color: rgba(255,255,255,.5) !important;
  --el-button-hover-bg-color: rgba(255,255,255,.1) !important;
  font-weight: 500;
}

.hero-visual { flex: 1; display: flex; justify-content: center; }
.hero-card-stack {
  position: relative; width: 260px; height: 300px;
}
.hero-card {
  position: absolute; padding: 16px 24px; border-radius: 14px;
  background: rgba(255,255,255,.95); backdrop-filter: blur(8px);
  font-size: 15px; font-weight: 600; color: #1a1a2e;
  box-shadow: 0 8px 32px rgba(0,0,0,.1);
  animation: cardFloat 5s ease-in-out infinite;
}
.card-1 { top: 10px; left: 0; animation-delay: 0s; }
.card-2 { top: 80px; right: 0; animation-delay: -1.25s; }
.card-3 { top: 150px; left: 20px; animation-delay: -2.5s; }
.card-4 { top: 220px; right: 10px; animation-delay: -3.75s; }
@keyframes cardFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.hero-wave {
  position: absolute; bottom: -2px; left: 0; right: 0; z-index: 1;
  line-height: 0;
}
.hero-wave svg { width: 100%; height: 80px; display: block; }

@media (max-width:768px) {
  .hero { min-height: auto; padding: 100px 0 40px; }
  .hero-content { flex-direction: column; gap: 40px; }
  .hero-visual { display: none; }
  .hide-mobile { display: none; }
}

/* ═══ Section base ═══ */
.section { padding: 80px 0; }
.score-section { background: #fff; }
.dims-section { background: linear-gradient(180deg, #f5f7fa 0%, #fff 40%); }
.process-section { background: #fff; }
.features-section { background: linear-gradient(180deg, #f5f7fa 0%, #fff 40%); }

@media (max-width:768px) {
  .section { padding: 48px 0; }
}

/* ═══ Score / Donut ═══ */
.score-content {
  display: flex; align-items: center; justify-content: center; gap: 60px;
  flex-wrap: wrap;
}
.chart-area { flex-shrink: 0; }
.donut-wrapper { position: relative; }
.donut-segment {
  animation: dashIn 1.2s ease-out forwards;
  opacity: 0;
}
@keyframes dashIn {
  0% { opacity: 0; stroke-dashoffset: var(--offset-start, 0); }
  100% { opacity: 1; }
}
.donut-center-value {
  font-size: 22px; font-weight: 800; fill: #1a1a2e;
}
.donut-center-label {
  font-size: 13px; fill: #909399; font-weight: 500;
}
.legend-area { min-width: 280px; }
.legend-title {
  font-size: 16px; font-weight: 600; color: #1a1a2e; margin-bottom: 20px;
}
.legend-items { display: flex; flex-direction: column; gap: 14px; }
.legend-item {
  display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  border-radius: 10px; background: #fafafa; transition: all .2s; cursor: default;
}
.legend-item:hover { background: #f0f9eb; transform: translateX(4px); }
.legend-dot {
  width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0;
}
.legend-icon { font-size: 16px; }
.legend-label { flex: 1; font-size: 14px; color: #606266; font-weight: 500; }
.legend-value { font-size: 15px; font-weight: 700; }
.legend-note { margin-top: 16px; }
.legend-note p { font-size: 12px; color: #c0c4cc; margin: 0; }

/* ═══ 5维评分体系 ═══ */
.dims-grid {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px;
}
.dim-card {
  background: #fff; border-radius: 16px; padding: 28px 20px;
  text-align: center; box-shadow: 0 2px 16px rgba(0,0,0,.05);
  transition: all .35s cubic-bezier(.22,1,.36,1);
  border: 1px solid #f0f0f0;
}
.dim-card:hover {
  transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,.08);
  border-color: rgba(103,194,58,.2);
}
.dim-radial { display: flex; justify-content: center; margin-bottom: 16px; }
.dim-progress {
  animation: dimDash 1.2s ease-out forwards;
  opacity: 0;
}
@keyframes dimDash {
  0% { opacity: 0; stroke-dashoffset: 301; }
  100% { opacity: 1; }
}
.dim-pct-value { font-size: 18px; font-weight: 800; }
.dim-pct-label { font-size: 11px; fill: #909399; font-weight: 500; }
.dim-info { text-align: center; }
.dim-icon { font-size: 28px; display: block; margin-bottom: 8px; }
.dim-name { font-size: 16px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; }
.dim-desc { font-size: 13px; color: #909399; line-height: 1.6; margin: 0; }

@media (max-width:1024px) {
  .dims-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width:640px) {
  .dims-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .dim-card { padding: 20px 14px; }
}

/* ═══ Steps ═══ */
.process-steps {
  display: flex; align-items: flex-start; justify-content: center; gap: 16px;
  flex-wrap: wrap;
}
.step-item {
  display: flex; align-items: center; gap: 0;
  position: relative;
}
.step-card {
  text-align: center; padding: 32px 24px 24px; border-radius: 16px;
  background: #fafafa; width: 200px;
  transition: all .35s cubic-bezier(.22,1,.36,1);
  border: 1px solid transparent;
}
.step-card:hover {
  background: #f0f9eb; border-color: rgba(103,194,58,.15);
  transform: translateY(-4px); box-shadow: 0 8px 30px rgba(103,194,58,.1);
}
.step-number {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 14px; font-weight: 700; margin: 0 auto 12px;
}
.step-icon { font-size: 36px; display: block; margin-bottom: 12px; }
.step-title { font-size: 16px; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; }
.step-desc { font-size: 13px; color: #909399; line-height: 1.6; margin: 0; }

.step-connector {
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.step-arrow-line { animation: dashMove 1.5s linear infinite; }
.step-arrow-head { animation: arrowPulse 1.5s ease-in-out infinite; }
@keyframes dashMove {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -20; }
}
@keyframes arrowPulse {
  0%, 100% { opacity: .5; }
  50% { opacity: 1; }
}

@media (max-width:1024px) {
  .process-steps { flex-direction: column; align-items: center; }
  .step-connector { transform: rotate(90deg); margin: 4px 0; }
}
@media (min-width:1025px) {
  .step-item:first-child .step-connector { display: flex; }
}

/* ═══ Features ═══ */
.features-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
}
.feature-card {
  background: #fff; border-radius: 16px; padding: 32px;
  border: 1px solid #f0f0f0; box-shadow: 0 2px 12px rgba(0,0,0,.03);
  transition: all .35s cubic-bezier(.22,1,.36,1);
}
.feature-card:hover {
  transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,.07);
  border-color: rgba(103,194,58,.2);
}
.feature-icon-wrapper {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px; font-size: 26px;
}
.feature-title { font-size: 18px; font-weight: 600; color: #1a1a2e; margin: 0 0 10px; }
.feature-desc { font-size: 14px; color: #909399; line-height: 1.7; margin: 0; }

@media (max-width:640px) {
  .features-grid { grid-template-columns: 1fr; }
}

/* ═══ CTA ═══ */
.cta-section {
  position: relative; padding: 80px 0; overflow: hidden;
}
.cta-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #67C23A 0%, #85CE61 50%, #A8D86C 100%);
  z-index: 0;
}
.cta-content {
  position: relative; z-index: 1; text-align: center; color: #fff;
}
.cta-title {
  font-size: clamp(28px,5vw,38px); font-weight: 700; margin: 0 0 12px;
}
.cta-desc {
  font-size: 16px; color: rgba(255,255,255,.85); margin: 0 0 32px;
}
.cta-btn {
  --el-button-bg-color: #fff !important;
  --el-button-border-color: #fff !important;
  --el-button-text-color: #67C23A !important;
  --el-button-hover-bg-color: #f0f9eb !important;
  --el-button-hover-border-color: #f0f9eb !important;
  font-weight: 600; font-size: 16px; padding: 14px 36px !important;
}

@media (max-width:768px) {
  .cta-section { padding: 48px 0; }
}

/* ═══ Footer ═══ */
.footer {
  background: #1a1a2e; padding: 40px 0 24px; color: rgba(255,255,255,.6);
}
.footer-inner { text-align: center; }
.footer-brand { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 20px; }
.footer-brand-icon { font-size: 20px; color: #67C23A; }
.footer-brand-text { font-size: 15px; font-weight: 600; color: rgba(255,255,255,.85); }
.footer-links { display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; margin-bottom: 20px; }
.footer-links a {
  color: rgba(255,255,255,.5); text-decoration: none; font-size: 13px; transition: color .2s;
}
.footer-links a:hover { color: #67C23A; }
.footer-copyright { font-size: 12px; color: rgba(255,255,255,.35); }
</style>
