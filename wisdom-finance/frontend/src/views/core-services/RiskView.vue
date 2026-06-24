<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Check, CircleCheckFilled } from '@element-plus/icons-vue'

const router = useRouter()

// ── 风险全景统计数据 ──
const stats = ref([
  { label: '监控企业数', value: '12,846', unit: '家', icon: '🏢', color: '#E6A23C' },
  { label: '活跃预警数', value: '186', unit: '条', icon: '🔔', color: '#F56C6C' },
  { label: '平均风险分', value: '68.5', unit: '分', icon: '📊', color: '#409EFF' },
  { label: '风险趋势', value: '↓ 12.3%', unit: '', icon: '📉', color: '#67C23A', trend: 'down' },
])

// ── 风控体系层级 ──
const riskLayers = ref([
  {
    title: '数据采集',
    subtitle: '多维数据汇聚，构建风控数据底座',
    icon: '📡',
    details: [
      '工商注册信息实时同步',
      '司法诉讼数据全量采集',
      '税务申报数据对接',
      '舆情信息多源汇聚',
      '银行流水数据授权接入',
    ],
  },
  {
    title: '模型分析',
    subtitle: 'AI智能分析，精准评估风险水平',
    icon: '🧠',
    details: [
      '5维度信用评分模型',
      '机器学习风险预测',
      '行业风险基准对比',
      '企业关联关系图谱',
      '财务报表智能分析',
    ],
  },
  {
    title: '预警监控',
    subtitle: '7×24小时实时监控，异常即时预警',
    icon: '🚨',
    details: [
      '经营异常自动检测',
      '司法诉讼实时告警',
      '税务异常及时推送',
      '舆情负面信息监控',
      '信贷违约预警通知',
    ],
  },
  {
    title: '决策支持',
    subtitle: '数据驱动决策，风控建议一键生成',
    icon: '💡',
    details: [
      '风险报告自动生成',
      '授信额度智能建议',
      '贷后管理风险提示',
      '批量评估批量处理',
      '风险可视化大屏展示',
    ],
  },
])

// ── 预警规则 ──
const rules = ref([
  {
    title: '经营异常',
    icon: '⚠️',
    color: '#E6A23C',
    desc: '企业变更频繁、地址异常、连续亏损等经营风险监控与自动预警',
    tags: ['地址异常', '法人变更', '亏损预警', '停业风险'],
  },
  {
    title: '司法诉讼',
    icon: '⚖️',
    color: '#F56C6C',
    desc: '被执行人、失信名单、开庭公告、裁判文书等司法风险实时监控',
    tags: ['被执行人', '失信名单', '诉讼', '仲裁'],
  },
  {
    title: '税务异常',
    icon: '📋',
    color: '#909399',
    desc: '税务欠缴、纳税信用降级、税务稽查等涉税风险动态监测',
    tags: ['欠税', '纳税降级', '稽查', '非正常户'],
  },
  {
    title: '舆情监控',
    icon: '📰',
    color: '#409EFF',
    desc: '新闻媒体、社交平台、行业论坛等多渠道负面舆情智能抓取',
    tags: ['负面新闻', '口碑监测', '行业曝光', '投诉'],
  },
  {
    title: '信贷异常',
    icon: '🏦',
    color: '#67C23A',
    desc: '贷款逾期、多头借贷、担保代偿等信贷风险全周期预警监控',
    tags: ['逾期', '多头借贷', '担保代偿', '征信不良'],
  },
])

// ── 核心优势 ──
const advantages = ref([
  { title: '多维数据融合', desc: '整合工商、司法、税务、舆情、信贷等30+数据源，全面刻画企业风险画像' },
  { title: 'AI智能评估', desc: '基于机器学习模型，从5大维度200+指标精准评估企业信用风险' },
  { title: '实时预警监控', desc: '7×24小时不间断监控，风险事件秒级感知，第一时间推送预警通知' },
  { title: '全流程风控', desc: '从贷前调查、贷中审批到贷后监控，覆盖信贷业务全生命周期风控' },
])

function handleCTA() {
  router.push('/dashboard/risk')
}
function scrollToSection(id: string) {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="risk-prevention">
    <!-- ═══ Hero ═══ -->
    <section class="hero-section">
      <div class="hero-bg" />
      <div class="hero-content">
        <div class="hero-badge">核心服务</div>
        <h1 class="hero-title">风险防控</h1>
        <p class="hero-subtitle">多维度风控模型，全流程风险监测预警</p>
        <p class="hero-desc">
          依托大数据与人工智能技术，构建覆盖企业全生命周期的智能风控体系，
          为金融机构提供精准、高效、全面的风险管理服务
        </p>
        <div class="hero-actions">
          <el-button type="danger" size="large" class="hero-btn-primary" @click="handleCTA">
            立即体验
          </el-button>
          <el-button size="large" class="hero-btn-outline" @click="scrollToSection('overview')">
            了解更多
          </el-button>
        </div>
      </div>
    </section>

    <!-- ═══ 风险全景 ═══ -->
    <section ref="overview" id="overview" class="section animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">风险全景</span>
          <h2 class="section-title">全维度风险<strong>实时掌控</strong></h2>
          <p class="section-desc">多维度风险指标监控，企业风险状况一目了然</p>
        </div>
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-icon" :style="{ background: stat.color + '15', color: stat.color }">
              {{ stat.icon }}
            </div>
            <div class="stat-info">
              <span class="stat-value" :style="{ color: stat.color }">{{ stat.value }}</span>
              <span v-if="stat.unit" class="stat-unit">{{ stat.unit }}</span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 风控体系 ═══ -->
    <section class="section section-alt animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">风控体系</span>
          <h2 class="section-title">四层风控<strong>体系架构</strong></h2>
          <p class="section-desc">从数据采集到决策支持，打造闭环风控能力</p>
        </div>
        <div class="layers-flow">
          <div v-for="(layer, idx) in riskLayers" :key="layer.title" class="layer-card">
            <div class="layer-step">
              <span class="step-number">{{ idx + 1 }}</span>
              <div v-if="idx < riskLayers.length - 1" class="step-line" />
            </div>
            <div class="layer-body">
              <div class="layer-header">
                <span class="layer-icon">{{ layer.icon }}</span>
                <div>
                  <h3 class="layer-title">{{ layer.title }}</h3>
                  <p class="layer-subtitle">{{ layer.subtitle }}</p>
                </div>
              </div>
              <ul class="layer-details">
                <li v-for="detail in layer.details" :key="detail" class="layer-detail-item">
                  <el-icon class="check-icon"><Check /></el-icon>
                  {{ detail }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 预警规则 ═══ -->
    <section class="section animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">预警规则</span>
          <h2 class="section-title">五大风险<strong>预警体系</strong></h2>
          <p class="section-desc">覆盖企业主要风险领域的智能预警规则引擎</p>
        </div>
        <div class="rules-grid">
          <div v-for="rule in rules" :key="rule.title" class="rule-card">
            <div class="rule-header" :style="{ background: rule.color + '12' }">
              <span class="rule-icon">{{ rule.icon }}</span>
              <h3 class="rule-title" :style="{ color: rule.color }">{{ rule.title }}</h3>
            </div>
            <p class="rule-desc">{{ rule.desc }}</p>
            <div class="rule-tags">
              <el-tag v-for="tag in rule.tags" :key="tag" size="small" :color="rule.color + '18'" :style="{ color: rule.color, borderColor: rule.color + '30' }">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 优势 ═══ -->
    <section class="section section-alt animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">核心优势</span>
          <h2 class="section-title">为什么选择<strong>我们的风控</strong></h2>
          <p class="section-desc">技术驱动、数据赋能，打造业界领先的风险管理能力</p>
        </div>
        <div class="advantages-grid">
          <div v-for="adv in advantages" :key="adv.title" class="advantage-card">
            <div class="adv-check">
              <el-icon :size="20" color="#E6A23C"><CircleCheckFilled /></el-icon>
            </div>
            <div class="adv-body">
              <h3 class="adv-title">{{ adv.title }}</h3>
              <p class="adv-desc">{{ adv.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section animate-on-scroll">
      <div class="cta-bg" />
      <div class="section-container cta-content">
        <h2 class="cta-title">开启智能风控之旅</h2>
        <p class="cta-desc">立即接入智慧金融服务平台，让风险管理更智能、更高效、更全面</p>
        <el-button type="danger" size="large" class="cta-btn" @click="handleCTA">
          立即体验风险防控服务
        </el-button>
      </div>
    </section>

    <!-- ═══ Footer ═══ -->
    <footer class="footer">
      <div class="section-container footer-content">
        <div class="footer-brand">
          <h3>焦作市智慧金融服务平台</h3>
          <p>政府主导 · 数据驱动 · 银企对接 · 信用赋能</p>
        </div>
        <div class="footer-links">
          <div class="footer-col">
            <h4>核心服务</h4>
            <a>信用评分</a>
            <a>风险防控</a>
            <a>融资对接</a>
          </div>
          <div class="footer-col">
            <h4>支持</h4>
            <a>帮助中心</a>
            <a>API文档</a>
            <a>联系我们</a>
          </div>
          <div class="footer-col">
            <h4>法律</h4>
            <a>服务协议</a>
            <a>隐私政策</a>
            <a>数据安全</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 焦作市智慧金融服务平台 All Rights Reserved</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ═══ 全局 & 基础 ═══ */
.risk-prevention {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  color: #1a1a2e;
  overflow-x: hidden;
}
.section {
  padding: 80px 0;
}
.section-alt {
  background: #f8f9fc;
}
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.section-header {
  text-align: center;
  margin-bottom: 52px;
}
.section-label {
  display: inline-block;
  padding: 4px 16px;
  border-radius: 20px;
  background: rgba(230, 162, 60, 0.1);
  color: #E6A23C;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
}
.section-title {
  font-size: clamp(28px, 4.5vw, 36px);
  font-weight: 700;
  margin: 0 0 10px;
  color: #1a1a2e;
}
.section-title strong {
  background: linear-gradient(135deg, #E6A23C, #d4880f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.section-desc {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* ═══ 滚动入场动画 ═══ */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll { opacity: 1; transform: none; transition: none; }
}

/* ═══ Hero ═══ */
.hero-section {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #E6A23C 0%, #d4880f 40%, #b3770c 100%);
  z-index: 0;
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 50%);
}
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 60px 24px;
  max-width: 720px;
}
.hero-badge {
  display: inline-block;
  padding: 4px 18px;
  border-radius: 20px;
  background: rgba(255,255,255,0.18);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  backdrop-filter: blur(4px);
}
.hero-title {
  font-size: clamp(40px, 7vw, 56px);
  font-weight: 800;
  color: #fff;
  margin: 0 0 12px;
  letter-spacing: 4px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.15);
}
.hero-subtitle {
  font-size: clamp(18px, 2.5vw, 22px);
  color: rgba(255,255,255,0.9);
  margin: 0 0 16px;
  font-weight: 500;
}
.hero-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.75);
  line-height: 1.7;
  margin: 0 auto 32px;
  max-width: 560px;
}
.hero-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}
.hero-btn-primary {
  background: #fff !important;
  color: #E6A23C !important;
  border: none !important;
  font-weight: 600;
  padding: 12px 32px;
  font-size: 15px;
  border-radius: 8px;
  transition: all 0.3s;
}
.hero-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.18);
}
.hero-btn-outline {
  background: transparent !important;
  color: #fff !important;
  border: 2px solid rgba(255,255,255,0.5) !important;
  font-weight: 500;
  padding: 12px 32px;
  font-size: 15px;
  border-radius: 8px;
  transition: all 0.3s;
}
.hero-btn-outline:hover {
  border-color: #fff !important;
  background: rgba(255,255,255,0.1) !important;
}

/* ═══ 风险全景 — 统计卡片 ═══ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  border: 1px solid #f0f0f0;
}
.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
  border-color: rgba(230, 162, 60, 0.2);
}
.stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin: 0 auto 14px;
}
.stat-info {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: 6px;
}
.stat-value {
  font-size: 32px;
  font-weight: 800;
  line-height: 1;
}
.stat-unit {
  font-size: 14px;
  color: #909399;
  font-weight: 500;
}
.stat-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

/* ═══ 风控体系 — 层级流程 ═══ */
.layers-flow {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 800px;
  margin: 0 auto;
}
.layer-card {
  display: flex;
  gap: 20px;
  position: relative;
}
.layer-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 44px;
  flex-shrink: 0;
  padding-top: 4px;
}
.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #E6A23C, #d4880f);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(230, 162, 60, 0.35);
}
.step-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, #E6A23C, rgba(230, 162, 60, 0.15));
  min-height: 30px;
}
.layer-body {
  flex: 1;
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}
.layer-body:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border-color: rgba(230, 162, 60, 0.15);
}
.layer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.layer-icon {
  font-size: 32px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(230, 162, 60, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}
.layer-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 4px;
  color: #303133;
}
.layer-subtitle {
  font-size: 13px;
  color: #909399;
  margin: 0;
}
.layer-details {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
}
.layer-detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}
.check-icon {
  color: #E6A23C;
  flex-shrink: 0;
  font-size: 14px;
}

/* ═══ 预警规则 ═══ */
.rules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.rule-card {
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.rule-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.1);
}
.rule-header {
  padding: 20px 20px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.rule-icon {
  font-size: 26px;
}
.rule-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}
.rule-desc {
  font-size: 13px;
  color: #606266;
  line-height: 1.6;
  margin: 0;
  padding: 0 20px 14px;
}
.rule-tags {
  padding: 0 20px 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.rule-tags .el-tag {
  border-radius: 4px;
  font-weight: 500;
}

/* ═══ 优势 ═══ */
.advantages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.advantage-card {
  display: flex;
  gap: 16px;
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.advantage-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
  border-color: rgba(230, 162, 60, 0.2);
}
.adv-check {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(230, 162, 60, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}
.adv-body {
  flex: 1;
}
.adv-title {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 8px;
  color: #303133;
}
.adv-desc {
  font-size: 14px;
  color: #606266;
  line-height: 1.7;
  margin: 0;
}

/* ═══ CTA ═══ */
.cta-section {
  position: relative;
  padding: 80px 0;
  overflow: hidden;
}
.cta-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #E6A23C 0%, #d4880f 50%, #b3770c 100%);
  z-index: 0;
}
.cta-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0%, transparent 50%);
}
.cta-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 24px;
}
.cta-title {
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  color: #fff;
  margin: 0 0 12px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.cta-desc {
  font-size: 15px;
  color: rgba(255,255,255,0.8);
  margin: 0 auto 28px;
  max-width: 520px;
  line-height: 1.6;
}
.cta-btn {
  background: #fff !important;
  color: #E6A23C !important;
  border: none !important;
  font-weight: 600;
  padding: 14px 40px;
  font-size: 16px;
  border-radius: 10px;
  transition: all 0.3s;
}
.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,0,0,0.18);
}

/* ═══ Footer ═══ */
.footer {
  background: #1a1a2e;
  padding: 48px 0 0;
  color: #a0a4b8;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}
.footer-brand h3 {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
}
.footer-brand p {
  font-size: 13px;
  margin: 0;
  max-width: 280px;
  line-height: 1.6;
}
.footer-links {
  display: flex;
  gap: 48px;
  flex-wrap: wrap;
}
.footer-col h4 {
  font-size: 14px;
  font-weight: 600;
  color: #d0d4e6;
  margin: 0 0 12px;
}
.footer-col a {
  display: block;
  font-size: 13px;
  color: #7a7f9a;
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.2s;
}
.footer-col a:hover {
  color: #E6A23C;
}
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.06);
  margin-top: 40px;
  padding: 16px 24px;
  text-align: center;
}
.footer-bottom p {
  font-size: 12px;
  margin: 0;
  color: #5a5f7a;
}

/* ═══ 响应式 ═══ */
@media (max-width: 1024px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .rules-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .section { padding: 52px 0; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  .rules-grid { grid-template-columns: 1fr; }
  .advantages-grid { grid-template-columns: 1fr; }
  .layer-details { grid-template-columns: 1fr; }
  .footer-content { flex-direction: column; }
  .footer-links { gap: 24px; }
  .hero-section { min-height: 400px; }
}
@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .stat-card { padding: 18px 14px; }
  .stat-value { font-size: 24px; }
}
</style>