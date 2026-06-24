<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Finished, OfficeBuilding, ArrowRight, Clock
} from '@element-plus/icons-vue'

const router = useRouter()

/* ── 匹配步骤 ── */
const matchSteps = [
  { title: '企业填写融资需求', desc: '在线提交企业基本信息、融资金额、用途及期限，系统智能分析企业画像' },
  { title: '多维度智能匹配', desc: '基于企业经营数据、信用评分、行业特征等上百个维度，精准匹配银行产品' },
  { title: '推荐最优产品组合', desc: '综合利率、额度、审批周期等因素，为企业推荐最优的金融产品组合方案' },
]

/* ── 推荐金融产品 ── */
const products = [
  { name: '科创e贷', bank: '中国银行', rate: '3.2% - 4.5%', maxAmount: '1000万', match: 96, color: '#409EFF' },
  { name: '税企贷', bank: '建设银行', rate: '3.5% - 4.8%', maxAmount: '500万', match: 92, color: '#67C23A' },
  { name: '政采贷', bank: '工商银行', rate: '3.0% - 4.2%', maxAmount: '2000万', match: 88, color: '#E6A23C' },
  { name: '供应链融', bank: '农业银行', rate: '3.8% - 5.0%', maxAmount: '800万', match: 85, color: '#F56C6C' },
  { name: '专精特新贷', bank: '交通银行', rate: '3.1% - 4.3%', maxAmount: '1500万', match: 90, color: '#909399' },
  { name: '普惠e贷', bank: '邮储银行', rate: '3.6% - 4.9%', maxAmount: '300万', match: 82, color: '#409EFF' },
]

/* ── 融资案例 ── */
const cases = [
  {
    company: '河南中轴集团',
    industry: '高端制造',
    amount: '800万',
    product: '科创e贷',
    time: '3个工作日',
    desc: '通过平台智能匹配，快速获取中国银行科创e贷800万授信，利率仅3.45%，较传统渠道降低1.2个百分点。',
  },
  {
    company: '焦作市云台数据科技',
    industry: '信息技术',
    amount: '300万',
    product: '税企贷',
    time: '2个工作日',
    desc: '凭借良好的纳税信用记录，匹配建设银行税企贷产品，无需抵押即获300万纯信用贷款。',
  },
  {
    company: '修武县绿丰农业合作社',
    industry: '现代农业',
    amount: '200万',
    product: '惠农贷',
    time: '5个工作日',
    desc: '农业合作社通过平台对接惠农专项贷款，享受政府贴息政策，综合融资成本仅2.8%。',
  },
]

/* ── 合作银行 ── */
const banks = [
  '中国银行', '建设银行', '工商银行', '农业银行',
  '交通银行', '邮储银行', '中原银行', '焦作中旅银行',
]

function goRegister() {
  router.push('/register')
}

/* ── 内联图标组件 ── */
</script>

<template>
  <div class="bank-match">
    <!-- ═══ Hero ═══ -->
    <section class="hero-section">
      <div class="hero-bg" />
      <div class="hero-content">
        <h1 class="hero-title">银企对接</h1>
        <p class="hero-subtitle">智能匹配银行产品与企业需求，一站式融资对接</p>
        <el-button type="primary" size="large" round class="hero-btn" @click="goRegister">
          立即开始匹配
        </el-button>
      </div>
    </section>

    <!-- ═══ 智能匹配引擎 ═══ -->
    <section class="section match-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-tag">智能匹配引擎</span>
          <h2 class="section-title">三步完成融资匹配</h2>
          <p class="section-desc">AI驱动的企业融资智能匹配系统，快速精准对接银行金融产品</p>
        </div>
        <div class="steps-grid">
          <div v-for="(step, idx) in matchSteps" :key="idx" class="step-card">
            <div class="step-number">{{ idx + 1 }}</div>
            <div class="step-icon">
              <svg v-if="idx === 0" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#409EFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <svg v-if="idx === 1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#409EFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
              </svg>
              <svg v-if="idx === 2" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#409EFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 010-5H6" /><path d="M18 9h1.5a2.5 2.5 0 000-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0012 0V2z" />
              </svg>
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-desc">{{ step.desc }}</p>
            <div v-if="idx < matchSteps.length - 1" class="step-arrow">
              <el-icon :size="24" color="#409EFF"><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 推荐金融产品 ═══ -->
    <section class="section product-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-tag">推荐金融产品</span>
          <h2 class="section-title">智能推荐产品</h2>
          <p class="section-desc">根据企业画像多维匹配，精准推荐最优银行金融产品</p>
        </div>
        <div class="product-grid">
          <div v-for="(prod, idx) in products" :key="idx" class="product-card">
            <div class="product-header" :style="{ borderLeftColor: prod.color }">
              <h3 class="product-name">{{ prod.name }}</h3>
              <span class="product-bank">{{ prod.bank }}</span>
            </div>
            <div class="product-body">
              <div class="product-meta">
                <div class="meta-item">
                  <span class="meta-label">参考利率</span>
                  <span class="meta-value" style="color:#409EFF">{{ prod.rate }}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">最高额度</span>
                  <span class="meta-value">{{ prod.maxAmount }}</span>
                </div>
              </div>
              <div class="match-row">
                <span class="match-label">匹配度</span>
                <div class="match-bar-wrap">
                  <el-progress
                    :percentage="prod.match"
                    :color="prod.color"
                    :stroke-width="10"
                    :text-inside="true"
                    :format="(p: number) => p + '%'"
                  />
                </div>
              </div>
            </div>
            <div class="product-footer">
              <el-button type="primary" round size="small" @click="goRegister">立即申请</el-button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 融资案例 ═══ -->
    <section class="section case-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-tag">融资案例</span>
          <h2 class="section-title">成功融资案例</h2>
          <p class="section-desc">看看其他企业如何通过平台快速获得融资</p>
        </div>
        <div class="case-grid">
          <div v-for="(c, idx) in cases" :key="idx" class="case-card">
            <div class="case-top">
              <div class="case-avatar">{{ c.company[0] }}</div>
              <div class="case-info">
                <h4 class="case-company">{{ c.company }}</h4>
                <span class="case-industry">{{ c.industry }}</span>
              </div>
            </div>
            <div class="case-amount-row">
              <div class="case-amount">{{ c.amount }}</div>
              <span class="case-amount-label">获得融资额度</span>
            </div>
            <div class="case-detail">
              <div class="case-detail-item">
                <el-icon :size="14" color="#409EFF"><Finished /></el-icon>
                <span>匹配产品：{{ c.product }}</span>
              </div>
              <div class="case-detail-item">
                <el-icon :size="14" color="#409EFF"><Clock /></el-icon>
                <span>放款时间：{{ c.time }}</span>
              </div>
            </div>
            <p class="case-desc">{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 合作银行 ═══ -->
    <section class="section bank-section">
      <div class="section-inner">
        <div class="section-header">
          <span class="section-tag">合作银行</span>
          <h2 class="section-title">合作金融机构</h2>
          <p class="section-desc">汇聚多家优质银行机构，为企业提供多样化融资选择</p>
        </div>
        <div class="bank-grid">
          <div v-for="(bank, idx) in banks" :key="idx" class="bank-card">
            <el-icon :size="32" color="#409EFF"><OfficeBuilding /></el-icon>
            <span class="bank-name">{{ bank }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section">
      <div class="cta-inner">
        <h2 class="cta-title">开启智能融资匹配</h2>
        <p class="cta-desc">立即注册，体验AI智能融资匹配服务</p>
        <el-button type="primary" size="large" round class="cta-btn" @click="goRegister">
          立即注册
        </el-button>
      </div>
    </section>

    <!-- ═══ Footer ═══ -->
    <footer class="site-footer">
      <p class="footer-text">© {{ new Date().getFullYear() }} 焦作市智慧金融服务平台 — 银企对接 · 智能融资 · 助力发展</p>
    </footer>
  </div>
</template>

<style scoped>
/* ══════════════════════════════════
   全局
   ══════════════════════════════════ */
.bank-match {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #303133;
  overflow-x: hidden;
}
.section-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.section-header {
  text-align: center;
  margin-bottom: 48px;
}
.section-tag {
  display: inline-block;
  padding: 4px 18px;
  border-radius: 20px;
  background: rgba(64, 158, 255, 0.08);
  color: #409EFF;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
}
.section-title {
  font-size: clamp(24px, 4vw, 34px);
  font-weight: 700;
  margin: 0 0 10px;
  color: #1a1a2e;
}
.section-desc {
  font-size: 15px;
  color: #909399;
  margin: 0;
}

/* ══════════════════════════════════
   Hero
   ══════════════════════════════════ */
.hero-section {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #409EFF 0%, #2d7fd3 40%, #1a6bbf 100%);
  z-index: 0;
}
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(255,255,255,0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.10) 0%, transparent 50%);
}
.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  padding: 0 24px;
}
.hero-title {
  font-size: clamp(36px, 6vw, 52px);
  font-weight: 800;
  margin: 0 0 16px;
  letter-spacing: 4px;
  text-shadow: 0 2px 12px rgba(0,0,0,0.15);
}
.hero-subtitle {
  font-size: clamp(16px, 2.5vw, 20px);
  margin: 0 0 36px;
  opacity: 0.92;
  font-weight: 400;
}
.hero-btn {
  padding: 14px 48px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  box-shadow: 0 4px 24px rgba(64, 158, 255, 0.5);
  border: none !important;
}

/* ══════════════════════════════════
   Section 通用
   ══════════════════════════════════ */
.section {
  padding: 80px 0;
}

/* ══════════════════════════════════
   智能匹配引擎
   ══════════════════════════════════ */
.match-section {
  background: #f8faff;
}
.steps-grid {
  display: flex;
  justify-content: center;
  gap: 32px;
  position: relative;
}
.step-card {
  flex: 1;
  max-width: 360px;
  background: #fff;
  border-radius: 16px;
  padding: 40px 28px;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(64, 158, 255, 0.08);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.step-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(64, 158, 255, 0.15);
}
.step-number {
  position: absolute;
  top: 16px;
  left: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409EFF, #2d7fd3);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}
.step-icon {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}
.step-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 12px;
  color: #1a1a2e;
}
.step-desc {
  font-size: 14px;
  color: #909399;
  line-height: 1.7;
  margin: 0;
}
.step-arrow {
  display: none;
}

/* ══════════════════════════════════
   推荐金融产品
   ══════════════════════════════════ */
.product-section {
  background: #fff;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.product-card {
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(64, 158, 255, 0.12);
  border-color: #d9ecff;
}
.product-header {
  padding: 20px 20px 0 20px;
  border-left: 4px solid #409EFF;
  padding-left: 20px;
  margin-bottom: 16px;
}
.product-name {
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 4px;
  color: #1a1a2e;
}
.product-bank {
  font-size: 13px;
  color: #909399;
}
.product-body {
  padding: 0 20px;
}
.product-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}
.meta-item {
  flex: 1;
}
.meta-label {
  display: block;
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}
.meta-value {
  font-size: 16px;
  font-weight: 700;
  color: #303133;
}
.match-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.match-label {
  font-size: 13px;
  color: #909399;
  white-space: nowrap;
}
.match-bar-wrap {
  flex: 1;
}
.product-footer {
  padding: 14px 20px;
  border-top: 1px solid #f0f2f5;
  text-align: center;
}

/* ══════════════════════════════════
   融资案例
   ══════════════════════════════════ */
.case-section {
  background: #f8faff;
}
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.case-card {
  background: #fff;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 4px 20px rgba(64, 158, 255, 0.06);
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.case-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(64, 158, 255, 0.12);
}
.case-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.case-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #409EFF, #2d7fd3);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
}
.case-info {
  flex: 1;
}
.case-company {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 2px;
  color: #1a1a2e;
}
.case-industry {
  font-size: 12px;
  color: #909399;
}
.case-amount-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 14px;
  padding: 14px 16px;
  background: #f0f9ff;
  border-radius: 10px;
}
.case-amount {
  font-size: 28px;
  font-weight: 800;
  color: #409EFF;
  line-height: 1;
}
.case-amount-label {
  font-size: 13px;
  color: #606266;
}
.case-detail {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}
.case-detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #606266;
}
.case-desc {
  font-size: 14px;
  color: #606266;
  line-height: 1.7;
  margin: 0;
}

/* ══════════════════════════════════
   合作银行
   ══════════════════════════════════ */
.bank-section {
  background: #fff;
}
.bank-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.bank-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 20px;
  background: #f8faff;
  border-radius: 12px;
  border: 1px solid #e8f0fe;
  transition: all 0.3s;
  cursor: default;
}
.bank-card:hover {
  background: #ecf5ff;
  border-color: #409EFF;
  transform: translateY(-2px);
}
.bank-name {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

/* ══════════════════════════════════
   CTA
   ══════════════════════════════════ */
.cta-section {
  padding: 80px 24px;
  background: linear-gradient(135deg, #409EFF 0%, #2d7fd3 50%, #1a6bbf 100%);
  text-align: center;
  color: #fff;
}
.cta-inner {
  max-width: 640px;
  margin: 0 auto;
}
.cta-title {
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 700;
  margin: 0 0 12px;
}
.cta-desc {
  font-size: 16px;
  opacity: 0.92;
  margin: 0 0 32px;
}
.cta-btn {
  padding: 14px 56px !important;
  font-size: 17px !important;
  font-weight: 600 !important;
  background: #fff !important;
  color: #409EFF !important;
  border: none !important;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}
.cta-btn:hover {
  background: #f0f8ff !important;
  transform: scale(1.04);
}

/* ══════════════════════════════════
   Footer
   ══════════════════════════════════ */
.site-footer {
  padding: 24px;
  background: #1a1a2e;
  text-align: center;
}
.footer-text {
  font-size: 13px;
  color: #909399;
  margin: 0;
}

/* ══════════════════════════════════
   Responsive
   ══════════════════════════════════ */
@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .case-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .section {
    padding: 56px 0;
  }
  .steps-grid {
    flex-direction: column;
    align-items: center;
  }
  .step-card {
    max-width: 100%;
  }
  .product-grid {
    grid-template-columns: 1fr;
  }
  .case-grid {
    grid-template-columns: 1fr;
  }
  .bank-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-title {
    letter-spacing: 2px;
  }
  .cta-section {
    padding: 56px 24px;
  }
}
</style>