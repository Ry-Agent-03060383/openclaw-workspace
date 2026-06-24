<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Check } from '@element-plus/icons-vue'

const router = useRouter()

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

// ── SEO ╱ 页面元信息 ──
onMounted(() => {
  document.title = '数据安全 — 焦作市智慧金融服务平台'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', '金融级数据加密，全方位信息安全保障。焦作市智慧金融服务平台提供等保三级认证、ISO27001认证、AES-256+TLS1.3加密、数据脱敏、访问控制等全方位数据安全服务。')
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

// ── Section 1: 安全资质 ──
interface CertItem {
  icon: string
  title: string
  desc: string
}

const certifications: CertItem[] = [
  {
    icon: '🛡️',
    title: '等保三级认证',
    desc: '通过国家信息安全等级保护三级认证，严格遵循《信息安全等级保护管理办法》要求，覆盖物理安全、网络安全、主机安全、应用安全、数据安全五大维度，确保平台安全防护能力达到国家标准。',
  },
  {
    icon: '📜',
    title: 'ISO 27001',
    desc: '通过ISO 27001信息安全管理体系认证，建立覆盖组织管理、资产管理、密码控制、物理安全、通信安全、访问控制等14个领域的全方位信息安全管理体系，与国际标准接轨。',
  },
  {
    icon: '🔐',
    title: '金融级加密',
    desc: '采用AES-256对称加密算法与TLS 1.3传输层安全协议，对数据进行端到端加密保护。密钥采用硬件安全模块(HSM)管理，具备完整的密钥生命周期管理和安全审计能力。',
  },
]

// ── Section 2: 安全保障体系 ──
interface SecurityLayer {
  title: string
  icon: string
  details: string[]
}

const securityLayers: SecurityLayer[] = [
  {
    title: '物理安全',
    icon: '🏢',
    details: [
      '数据中心A级机房标准建设',
      '7×24小时安保与视频监控',
      '生物识别+IC卡双重门禁',
      '温湿度智能监控与消防系统',
      '双路供电与UPS不间断电源',
    ],
  },
  {
    title: '网络安全',
    icon: '🌐',
    details: [
      '下一代防火墙(NGFW)防护',
      '入侵检测与防御系统(IDS/IPS)',
      'DDoS流量清洗与防护',
      'Web应用防火墙(WAF)',
      '全网流量审计与异常检测',
    ],
  },
  {
    title: '数据安全',
    icon: '🗄️',
    details: [
      'AES-256静态数据加密存储',
      'TLS 1.3传输加密保护',
      '数据库审计与敏感数据发现',
      '数据备份与异地容灾恢复',
      '数据分级分类与生命周期管理',
    ],
  },
  {
    title: '应用安全',
    icon: '💻',
    details: [
      '全链路代码安全审计',
      'OWASP Top 10漏洞防护',
      '接口鉴权与API安全网关',
      '统一身份认证与权限管理',
      '应用安全监控与应急响应',
    ],
  },
]

// ── Section 3: 安全记录 ──
const securityStats = ref([
  { label: '安全运行', value: '365', unit: '天', icon: '📅', color: '#67C23A' },
  { label: '安全事件', value: '零', unit: '事故', icon: '✅', color: '#409EFF' },
  { label: '安全审计', value: '通过', unit: '审计', icon: '📋', color: '#E6A23C' },
])

// ── Section 4: 隐私保护 ──
interface PrivacyItem {
  icon: string
  title: string
  desc: string
}

const privacyItems: PrivacyItem[] = [
  { icon: '🔍', title: '数据脱敏', desc: '对敏感个人信息（姓名、手机号、身份证号等）进行动态脱敏处理，确保在不影响业务分析的前提下，有效防止敏感数据泄露' },
  { icon: '🔑', title: '访问控制', desc: '基于角色的细粒度访问控制(RBAC)，按需分配最小权限，严格审批数据访问请求，实现数据访问全过程可追溯' },
  { icon: '📝', title: '审计日志', desc: '完整记录所有数据操作行为，包括访问、修改、导出等，审计日志不可篡改，满足合规审计与事后追溯要求' },
  { icon: '📡', title: '加密传输', desc: '全链路传输层加密，端到端数据保护，确保数据在传输过程中不被窃听、篡改或伪造，支持国密算法' },
]

// ── Section 5: 合规认证 ──
const complianceBadges = [
  { name: 'ISO 27001', icon: '🌐' },
  { name: '等保三级', icon: '🛡️' },
  { name: '银监会', icon: '🏦' },
  { name: '网信办', icon: '📱' },
  { name: '公安联网', icon: '👮' },
  { name: 'SSL', icon: '🔒' },
]
</script>

<template>
  <div class="security-page">
    <!-- ═══ Navbar ═══ -->
    <nav class="navbar" :class="{ 'navbar-scrolled': scrolled }">
      <div class="navbar-inner section-container">
        <div class="navbar-brand">
          <span class="brand-icon">✦</span>
          <span class="brand-text">智慧金融 · 数据安全</span>
        </div>
        <div class="navbar-links">
          <a href="#certifications">安全资质</a>
          <a href="#system">安全保障</a>
          <a href="#records">安全记录</a>
          <a href="#privacy">隐私保护</a>
          <a href="#compliance">合规认证</a>
        </div>
        <el-button type="primary" round @click="goLogin" class="navbar-cta">立即接入</el-button>
      </div>
    </nav>

    <!-- ═══ Hero ═══ -->
    <section class="hero-section">
      <div class="hero-bg" />
      <div class="hero-content">
        <div class="hero-badge">核心服务</div>
        <h1 class="hero-title">数据安全</h1>
        <p class="hero-subtitle">金融级数据加密，全方位信息安全保障</p>
        <p class="hero-desc">
          依托金融级安全架构与多重加密技术，构建覆盖物理、网络、数据、应用<br class="hide-mobile">
          四大层面的全方位信息安全防护体系，保障每一位用户的数据安全
        </p>
        <div class="hero-actions">
          <el-button type="primary" size="large" class="hero-btn-primary" @click="goLogin">
            立即接入
          </el-button>
          <el-button size="large" class="hero-btn-outline" @click="scrollTo('certifications')">
            了解更多
          </el-button>
        </div>
      </div>
    </section>

    <!-- ═══ Section 1: 安全资质 ═══ -->
    <section ref="certifications" id="certifications" class="section animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">安全资质</span>
          <h2 class="section-title">权威认证<strong>安全可信</strong></h2>
          <p class="section-desc">获得多项国家级安全认证与资质，为平台安全运营提供权威保障</p>
        </div>
        <div class="certs-grid">
          <div v-for="(cert, i) in certifications" :key="cert.title" class="cert-card animate-on-scroll"
            :style="{ animationDelay: `${i * 0.12}s` }">
            <div class="cert-shield">
              <span class="cert-icon">{{ cert.icon }}</span>
            </div>
            <h3 class="cert-title">{{ cert.title }}</h3>
            <p class="cert-desc">{{ cert.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: 安全保障体系 ═══ -->
    <section id="system" class="section section-alt animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">安全保障体系</span>
          <h2 class="section-title">四层安全<strong>纵深防御</strong></h2>
          <p class="section-desc">从物理到应用，构建多层纵深安全防护体系，全方位保障平台信息安全</p>
        </div>
        <div class="layers-flow">
          <div v-for="(layer, idx) in securityLayers" :key="layer.title" class="layer-card animate-on-scroll"
            :style="{ animationDelay: `${idx * 0.1}s` }">
            <div class="layer-step">
              <span class="step-number">{{ idx + 1 }}</span>
              <div v-if="idx < securityLayers.length - 1" class="step-line" />
            </div>
            <div class="layer-body">
              <div class="layer-header">
                <span class="layer-icon">{{ layer.icon }}</span>
                <div>
                  <h3 class="layer-title">{{ layer.title }}</h3>
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

    <!-- ═══ Section 3: 安全记录 ═══ -->
    <section id="records" class="section animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">安全记录</span>
          <h2 class="section-title">持续安全<strong>运行记录</strong></h2>
          <p class="section-desc">平台安全运营数据透明可查，用事实构筑信任</p>
        </div>
        <div class="stats-grid">
          <div v-for="stat in securityStats" :key="stat.label" class="stat-card animate-on-scroll">
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

    <!-- ═══ Section 4: 隐私保护 ═══ -->
    <section id="privacy" class="section section-alt animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">隐私保护</span>
          <h2 class="section-title">用户隐私<strong>全面保护</strong></h2>
          <p class="section-desc">严格遵循《个人信息保护法》，全方位保护用户隐私数据安全</p>
        </div>
        <div class="privacy-grid">
          <div v-for="(item, i) in privacyItems" :key="item.title" class="privacy-card animate-on-scroll"
            :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="privacy-icon-wrapper">
              <span class="privacy-icon">{{ item.icon }}</span>
            </div>
            <h3 class="privacy-title">{{ item.title }}</h3>
            <p class="privacy-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 5: 合规认证 ═══ -->
    <section id="compliance" class="section animate-on-scroll">
      <div class="section-container">
        <div class="section-header">
          <span class="section-label">合规认证</span>
          <h2 class="section-title">合规资质<strong>一应俱全</strong></h2>
          <p class="section-desc">全牌照合规运营，各类安全认证与监管资质齐备</p>
        </div>
        <div class="badges-row">
          <div v-for="badge in complianceBadges" :key="badge.name" class="badge-item animate-on-scroll">
            <div class="badge-icon-wrapper">
              <span class="badge-icon">{{ badge.icon }}</span>
            </div>
            <span class="badge-name">{{ badge.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section animate-on-scroll">
      <div class="cta-bg" />
      <div class="section-container cta-content">
        <h2 class="cta-title">守护数据安全，从接入开始</h2>
        <p class="cta-desc">立即接入智慧金融服务平台，享受金融级安全保障</p>
        <el-button type="primary" size="large" class="cta-btn" @click="goLogin">
          立即接入安全平台
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
            <a>数据安全</a>
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
.security-page {
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
  background: rgba(64, 158, 255, 0.1);
  color: #409EFF;
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
  background: linear-gradient(135deg, #409EFF, #2d7dd2);
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
  font-size: 22px; color: #409EFF;
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
.navbar-links a:hover { color: #409EFF; }
.navbar-cta { font-weight: 500; }
@media (max-width:768px) {
  .navbar-links { display: none; }
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
  background: linear-gradient(135deg, #409EFF 0%, #2d7dd2 40%, #1a5fa8 100%);
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
  color: #409EFF !important;
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

/* ═══ Section 1: 安全资质 — 证书卡片 ═══ */
.certs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.cert-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px 28px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #f0f0f0;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.cert-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
  border-color: rgba(64, 158, 255, 0.2);
}
.cert-shield {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409EFF, #2d7dd2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.3);
}
.cert-icon {
  font-size: 32px;
}
.cert-title {
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 12px;
}
.cert-desc {
  font-size: 14px;
  color: #606266;
  line-height: 1.7;
  margin: 0;
}

/* ═══ Section 2: 安全保障体系 — 层级流程 ═══ */
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
  background: linear-gradient(135deg, #409EFF, #2d7dd2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  flex-shrink: 0;
  z-index: 1;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.35);
}
.step-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, #409EFF, rgba(64, 158, 255, 0.15));
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
  border-color: rgba(64, 158, 255, 0.15);
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
  background: rgba(64, 158, 255, 0.1);
  border-radius: 12px;
  flex-shrink: 0;
}
.layer-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #303133;
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
  color: #409EFF;
  flex-shrink: 0;
  font-size: 14px;
}

/* ═══ Section 3: 安全记录 — 统计卡片 ═══ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  border: 1px solid #f0f0f0;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
  border-color: rgba(64, 158, 255, 0.2);
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

/* ═══ Section 4: 隐私保护 — 卡片网格 ═══ */
.privacy-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.privacy-card {
  background: #fff;
  border-radius: 14px;
  padding: 28px 20px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.privacy-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
  border-color: rgba(64, 158, 255, 0.2);
}
.privacy-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(64, 158, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.privacy-icon {
  font-size: 28px;
}
.privacy-title {
  font-size: 17px;
  font-weight: 700;
  color: #303133;
  margin: 0 0 10px;
}
.privacy-desc {
  font-size: 13px;
  color: #606266;
  line-height: 1.7;
  margin: 0;
}

/* ═══ Section 5: 合规认证 — 徽章行 ═══ */
.badges-row {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 14px;
  padding: 24px 32px;
  min-width: 120px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.badge-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.08);
  border-color: rgba(64, 158, 255, 0.2);
}
.badge-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #409EFF, #2d7dd2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.25);
}
.badge-icon {
  font-size: 22px;
}
.badge-name {
  font-size: 14px;
  font-weight: 600;
  color: #303133;
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
  background: linear-gradient(135deg, #409EFF 0%, #2d7dd2 50%, #1a5fa8 100%);
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
  color: #409EFF !important;
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
  color: #409EFF;
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
  .certs-grid { grid-template-columns: repeat(2, 1fr); }
  .privacy-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .section { padding: 52px 0; }
  .certs-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: 1fr; gap: 14px; }
  .privacy-grid { grid-template-columns: 1fr; }
  .badges-row { gap: 14px; }
  .badge-item { min-width: 100px; padding: 18px 20px; }
  .layer-details { grid-template-columns: 1fr; }
  .footer-content { flex-direction: column; }
  .footer-links { gap: 24px; }
  .hero-section { min-height: 400px; }
}
@media (max-width: 480px) {
  .badge-item { min-width: 80px; padding: 14px 12px; }
  .stat-card { padding: 18px 14px; }
  .stat-value { font-size: 24px; }
}
</style>