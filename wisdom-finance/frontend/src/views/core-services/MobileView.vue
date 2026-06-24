<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ── SEO ╱ 页面元信息 ──
onMounted(() => {
  document.title = '掌上金融 — 焦作市智慧金融服务平台'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', '移动端全覆盖，随时随地办理融资业务。焦作市智慧金融服务平台提供微信小程序、手机APP、微信公众号等移动端服务。')
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

// ── 多端覆盖 ──
interface PlatformItem {
  icon: string
  title: string
  desc: string
  qrLabel: string
}

const platforms: PlatformItem[] = [
  { icon: '💬', title: '微信小程序', desc: '焦作智慧金服', qrLabel: '扫码打开小程序' },
  { icon: '📱', title: '手机APP', desc: '焦作智慧金融', qrLabel: '扫码下载APP' },
  { icon: '🔔', title: '微信公众号', desc: '焦作智慧金服', qrLabel: '扫码关注公众号' },
]

// ── 移动端功能 ──
interface FeatureItem {
  icon: string
  title: string
  desc: string
}

const features: FeatureItem[] = [
  { icon: '📝', title: '贷款申请', desc: '在线提交融资申请，智能匹配金融产品' },
  { icon: '📈', title: '进度查询', desc: '实时查看业务办理进度，审批状态一目了然' },
  { icon: '🔍', title: '信用查询', desc: '企业信用信息一键查询，信用报告随时下载' },
  { icon: '💳', title: '还款管理', desc: '便捷还款操作，还款计划清晰可查' },
  { icon: '👩‍💼', title: '在线客服', desc: '智能客服+人工服务，7×24小时在线解答' },
  { icon: '📰', title: '政策公告', desc: '最新金融政策、平台公告实时推送' },
]

// ── 使用统计 ──
interface StatItem {
  value: string
  label: string
  icon: string
}

const stats: StatItem[] = [
  { value: '1,250', label: '日活跃用户（人）', icon: '👥' },
  { value: '85%', label: '企业覆盖率', icon: '🎯' },
  { value: '96%', label: '用户好评率', icon: '⭐' },
]

// ── 下载方式 ──
interface DownloadItem {
  platform: string
  icon: string
  desc: string
}

const downloads: DownloadItem[] = [
  { platform: 'iOS', icon: '🍎', desc: 'App Store 搜索"焦作智慧金融"下载' },
  { platform: 'Android', icon: '🤖', desc: '各大应用商店搜索"焦作智慧金融"下载' },
]
</script>

<template>
  <div class="mobile-page">
    <!-- ═══ Navbar ═══ -->
    <nav class="navbar" :class="{ 'navbar-scrolled': scrolled }">
      <div class="navbar-inner section-container">
        <div class="navbar-brand">
          <span class="brand-icon">📱</span>
          <span class="brand-text">智慧金融 · 掌上金融</span>
        </div>
        <div class="navbar-links">
          <a href="#platforms">多端覆盖</a>
          <a href="#features">移动端功能</a>
          <a href="#stats">使用统计</a>
          <a href="#download">下载方式</a>
        </div>
        <el-button type="primary" round @click="goLogin" class="navbar-cta">立即体验</el-button>
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
          <span class="hero-badge">📱 移动金融服务</span>
          <h1 class="hero-title">掌上金融</h1>
          <p class="hero-subtitle">移动端全覆盖，随时随地办理融资业务</p>
          <p class="hero-desc">
            微信小程序、手机APP、微信公众号多端同步<br class="hide-mobile">
            让融资服务触手可及，企业金融一手掌握
          </p>
          <div class="hero-actions">
            <el-button type="primary" round size="large" @click="goLogin" class="hero-btn-primary">
              立即体验
            </el-button>
            <el-button round size="large" plain @click="router.push('/')" class="hero-btn-ghost">
              了解更多
            </el-button>
          </div>
        </div>
        <div class="hero-visual animate-on-scroll">
          <div class="hero-phone-wrapper">
            <div class="hero-phone">
              <div class="hero-phone-notch" />
              <div class="hero-phone-screen">
                <div class="hero-phone-header">焦作智慧金融</div>
                <div class="hero-phone-icon">📱</div>
                <div class="hero-phone-title">掌上金融</div>
                <div class="hero-phone-features">
                  <span class="hero-phone-feat">贷款申请</span>
                  <span class="hero-phone-feat">进度查询</span>
                  <span class="hero-phone-feat">信用查询</span>
                </div>
              </div>
              <div class="hero-phone-home-btn" />
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

    <!-- ═══ Section 1: 多端覆盖 ═══ -->
    <section id="platforms" class="section platform-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">多端覆盖</span>
          <h2 class="section-title">全平台移动服务</h2>
          <p class="section-desc">三大移动端入口，满足不同用户使用习惯</p>
        </div>

        <div class="platform-grid">
          <div v-for="(item, i) in platforms" :key="i"
            class="platform-card animate-on-scroll" :style="{ animationDelay: `${i * 0.12}s` }">
            <div class="platform-phone-wrapper">
              <div class="platform-phone">
                <div class="platform-phone-notch" />
                <div class="platform-phone-screen">
                  <div class="platform-phone-icon">{{ item.icon }}</div>
                  <div class="platform-phone-name">{{ item.title }}</div>
                  <div class="platform-phone-desc">{{ item.desc }}</div>
                  <div class="platform-phone-qr">
                    <div class="qr-placeholder">
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <rect x="0" y="0" width="32" height="32" fill="#909399" rx="3" />
                        <rect x="48" y="0" width="32" height="32" fill="#909399" rx="3" />
                        <rect x="0" y="48" width="32" height="32" fill="#909399" rx="3" />
                        <rect x="24" y="24" width="8" height="8" fill="#909399" rx="1" />
                        <rect x="48" y="48" width="16" height="16" fill="#909399" rx="2" />
                        <rect x="68" y="48" width="12" height="12" fill="#909399" rx="2" />
                        <rect x="48" y="68" width="12" height="12" fill="#909399" rx="2" />
                      </svg>
                    </div>
                  </div>
                  <div class="platform-phone-qr-label">{{ item.qrLabel }}</div>
                </div>
              </div>
            </div>
            <h3 class="platform-title">{{ item.title }}</h3>
            <p class="platform-desc">{{ item.desc }} — {{ item.qrLabel }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 2: 移动端功能 ═══ -->
    <section id="features" class="section features-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">移动端功能</span>
          <h2 class="section-title">全方位金融服务</h2>
          <p class="section-desc">六大核心功能，覆盖企业融资全流程</p>
        </div>

        <div class="features-grid">
          <div v-for="(feat, i) in features" :key="i" class="feature-card animate-on-scroll"
            :style="{ animationDelay: `${i * 0.08}s` }">
            <div class="feature-icon-wrapper">
              <span class="feature-icon">{{ feat.icon }}</span>
            </div>
            <h3 class="feature-title">{{ feat.title }}</h3>
            <p class="feature-desc">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 3: 使用统计 ═══ -->
    <section id="stats" class="section stats-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">使用统计</span>
          <h2 class="section-title">平台运营数据</h2>
          <p class="section-desc">真实数据见证平台价值</p>
        </div>

        <div class="stats-grid">
          <div v-for="(stat, i) in stats" :key="i" class="stat-card animate-on-scroll"
            :style="{ animationDelay: `${i * 0.12}s` }">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Section 4: 下载方式 ═══ -->
    <section id="download" class="section download-section">
      <div class="section-container">
        <div class="section-header animate-on-scroll">
          <span class="section-label">下载方式</span>
          <h2 class="section-title">立即下载体验</h2>
          <p class="section-desc">扫描二维码或在应用商店搜索下载</p>
        </div>

        <div class="download-grid">
          <div v-for="(item, i) in downloads" :key="i" class="download-card animate-on-scroll"
            :style="{ animationDelay: `${i * 0.12}s` }">
            <div class="download-platform-icon">{{ item.icon }}</div>
            <div class="download-qr">
              <div class="qr-placeholder qr-large">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <rect x="0" y="0" width="48" height="48" fill="#909399" rx="4" />
                  <rect x="72" y="0" width="48" height="48" fill="#909399" rx="4" />
                  <rect x="0" y="72" width="48" height="48" fill="#909399" rx="4" />
                  <rect x="36" y="36" width="12" height="12" fill="#909399" rx="2" />
                  <rect x="72" y="72" width="24" height="24" fill="#909399" rx="3" />
                  <rect x="102" y="72" width="18" height="18" fill="#909399" rx="3" />
                  <rect x="72" y="102" width="18" height="18" fill="#909399" rx="3" />
                  <rect x="60" y="60" width="8" height="8" fill="#909399" rx="1" />
                  <rect x="56" y="0" width="8" height="8" fill="#909399" rx="1" />
                  <rect x="0" y="56" width="8" height="8" fill="#909399" rx="1" />
                </svg>
              </div>
            </div>
            <div class="download-info">
              <h3 class="download-platform">{{ item.platform }}</h3>
              <p class="download-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section">
      <div class="cta-bg" />
      <div class="section-container cta-content animate-on-scroll">
        <h2 class="cta-title">开启移动金融服务</h2>
        <p class="cta-desc">下载焦作智慧金融APP，随时随地办理融资业务</p>
        <el-button type="primary" round size="large" @click="goLogin" class="cta-btn">
          立即体验
          <el-icon style="margin-left:6px">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </el-icon>
        </el-button>
      </div>
    </section>

    <!-- ═══ Footer ═══ -->
    <footer class="footer">
      <div class="footer-inner section-container">
        <div class="footer-brand">
          <span class="footer-brand-icon">📱</span>
          <span class="footer-brand-text">焦作市智慧金融服务平台</span>
        </div>
        <div class="footer-links">
          <a href="/">首页</a>
          <a href="#platforms">多端覆盖</a>
          <a href="#features">移动端功能</a>
          <a href="#stats">使用统计</a>
          <a href="#download">下载方式</a>
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
.mobile-page {
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
  background: rgba(144,147,153,.12); color: #909399;
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
  font-size: 22px;
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
.navbar-links a:hover { color: #909399; }
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
  background: linear-gradient(135deg, #909399 0%, #A0A3A8 40%, #B0B3B8 70%, #C0C3C8 100%);
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
  --el-button-text-color: #909399 !important;
  --el-button-hover-bg-color: #f0f2f5 !important;
  --el-button-hover-border-color: #f0f2f5 !important;
  font-weight: 600;
}
.hero-btn-ghost {
  --el-button-text-color: #fff !important;
  --el-button-border-color: rgba(255,255,255,.5) !important;
  --el-button-hover-bg-color: rgba(255,255,255,.1) !important;
  font-weight: 500;
}

.hero-visual { flex: 1; display: flex; justify-content: center; }

/* ═══ Hero Phone Mockup ═══ */
.hero-phone-wrapper {
  display: flex; align-items: center; justify-content: center;
}
.hero-phone {
  width: 220px; height: 440px;
  background: #fff; border-radius: 32px;
  padding: 12px; box-shadow: 0 20px 60px rgba(0,0,0,.15);
  position: relative; border: 3px solid #e0e0e0;
}
.hero-phone-notch {
  width: 100px; height: 22px;
  background: #1a1a1a; border-radius: 0 0 12px 12px;
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  z-index: 2;
}
.hero-phone-screen {
  width: 100%; height: 100%;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8eaed 100%);
  border-radius: 24px; overflow: hidden;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 30px 16px; gap: 10px;
  position: relative;
}
.hero-phone-header {
  position: absolute; top: 16px; left: 0; right: 0;
  text-align: center; font-size: 12px; font-weight: 600;
  color: #909399;
}
.hero-phone-icon {
  font-size: 48px;
}
.hero-phone-title {
  font-size: 18px; font-weight: 700; color: #1a1a2e;
}
.hero-phone-features {
  display: flex; flex-direction: column; gap: 6px; margin-top: 10px;
}
.hero-phone-feat {
  padding: 4px 12px; border-radius: 12px;
  background: rgba(144,147,153,.1);
  color: #909399; font-size: 11px; font-weight: 500;
  text-align: center;
}
.hero-phone-home-btn {
  width: 36px; height: 36px;
  border: 2px solid #ddd; border-radius: 50%;
  position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);
}
@media (max-width: 768px) {
  .hero-phone { width: 180px; height: 360px; }
  .hero-content { flex-direction: column; text-align: center; }
  .hero-actions { justify-content: center; }
}

.hero-wave {
  position: absolute; bottom: -1px; left: 0; right: 0; z-index: 1;
  line-height: 0;
}
.hero-wave svg { width: 100%; height: auto; display: block; }

/* ═══ Section 1: 多端覆盖 ═══ */
.platform-section {
  padding: 80px 0; background: #fff;
}
.platform-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
}
.platform-card {
  text-align: center; padding: 24px 16px;
  border-radius: 16px; transition: all .3s;
}
.platform-card:hover {
  background: #f5f7fa;
  transform: translateY(-4px);
}
.platform-phone-wrapper {
  display: flex; justify-content: center; margin-bottom: 20px;
}
.platform-phone {
  width: 180px; height: 340px;
  background: #fff; border-radius: 24px;
  padding: 10px; box-shadow: 0 8px 30px rgba(0,0,0,.1);
  position: relative; border: 2px solid #e8e8e8;
  transition: box-shadow .3s;
}
.platform-card:hover .platform-phone {
  box-shadow: 0 12px 40px rgba(144,147,153,.2);
}
.platform-phone-notch {
  width: 80px; height: 18px;
  background: #1a1a1a; border-radius: 0 0 10px 10px;
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  z-index: 2;
}
.platform-phone-screen {
  width: 100%; height: 100%;
  background: linear-gradient(180deg, #f5f7fa 0%, #ebeef2 100%);
  border-radius: 18px; overflow: hidden;
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 24px 12px; gap: 8px;
}
.platform-phone-icon { font-size: 36px; }
.platform-phone-name {
  font-size: 14px; font-weight: 700; color: #1a1a2e;
}
.platform-phone-desc {
  font-size: 11px; color: #909399; font-weight: 500;
}
.platform-phone-qr { margin: 6px 0; }
.platform-phone-qr-label {
  font-size: 10px; color: #c0c4cc; margin-top: 4px;
}
.qr-placeholder {
  display: flex; align-items: center; justify-content: center;
  background: #fff; border-radius: 6px;
  padding: 6px; box-shadow: 0 2px 8px rgba(0,0,0,.06);
}
.platform-title {
  font-size: 18px; font-weight: 600; margin: 0 0 6px; color: #1a1a2e;
}
.platform-desc {
  font-size: 13px; color: #909399; margin: 0;
}
@media (max-width: 768px) {
  .platform-grid { grid-template-columns: 1fr; max-width: 320px; margin: 0 auto; }
}

/* ═══ Section 2: 移动端功能 ═══ */
.features-section {
  padding: 80px 0; background: #f5f7fa;
}
.features-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
}
.feature-card {
  background: #fff; border-radius: 16px;
  padding: 32px 24px; text-align: center;
  transition: all .3s; cursor: default;
  box-shadow: 0 2px 12px rgba(0,0,0,.04);
}
.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 30px rgba(144,147,153,.12);
}
.feature-icon-wrapper {
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(144,147,153,.1);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px; font-size: 28px;
  transition: all .3s;
}
.feature-card:hover .feature-icon-wrapper {
  background: rgba(144,147,153,.2);
  transform: scale(1.1);
}
.feature-title {
  font-size: 17px; font-weight: 600; margin: 0 0 8px; color: #1a1a2e;
}
.feature-desc {
  font-size: 13px; color: #909399; margin: 0; line-height: 1.6;
}
@media (max-width: 768px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .features-grid { grid-template-columns: 1fr; }
}

/* ═══ Section 3: 使用统计 ═══ */
.stats-section {
  padding: 80px 0; background: #fff;
}
.stats-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
  max-width: 900px; margin: 0 auto;
}
.stat-card {
  text-align: center; padding: 40px 24px;
  border-radius: 16px; background: #f5f7fa;
  transition: all .3s; cursor: default;
}
.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(144,147,153,.12);
}
.stat-icon { font-size: 36px; margin-bottom: 12px; }
.stat-value {
  font-size: clamp(32px,5vw,48px); font-weight: 800;
  color: #909399; line-height: 1.2; margin-bottom: 6px;
}
.stat-label {
  font-size: 14px; color: #606266; font-weight: 500;
}
@media (max-width: 768px) {
  .stats-grid { grid-template-columns: 1fr; max-width: 320px; }
}

/* ═══ Section 4: 下载方式 ═══ */
.download-section {
  padding: 80px 0; background: #f5f7fa;
}
.download-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;
  max-width: 700px; margin: 0 auto;
}
.download-card {
  background: #fff; border-radius: 20px;
  padding: 40px 32px; text-align: center;
  transition: all .3s; cursor: default;
  box-shadow: 0 2px 12px rgba(0,0,0,.04);
}
.download-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(144,147,153,.15);
}
.download-platform-icon {
  font-size: 48px; margin-bottom: 16px;
}
.download-qr {
  display: flex; justify-content: center; margin-bottom: 16px;
}
.qr-large svg { display: block; }
.download-info { }
.download-platform {
  font-size: 20px; font-weight: 700; margin: 0 0 8px; color: #1a1a2e;
}
.download-desc {
  font-size: 13px; color: #909399; margin: 0; line-height: 1.5;
}
@media (max-width: 480px) {
  .download-grid { grid-template-columns: 1fr; }
}

/* ═══ CTA ═══ */
.cta-section {
  position: relative; padding: 80px 0; overflow: hidden;
}
.cta-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, #909399 0%, #A0A3A8 50%, #B0B3B8 100%);
  z-index: 0;
}
.cta-content {
  position: relative; z-index: 1; text-align: center;
}
.cta-title {
  font-size: clamp(26px,4vw,36px); font-weight: 700;
  color: #fff; margin: 0 0 10px;
}
.cta-desc {
  font-size: 15px; color: rgba(255,255,255,.85);
  margin: 0 0 28px;
}
.cta-btn {
  --el-button-bg-color: #fff !important;
  --el-button-border-color: #fff !important;
  --el-button-text-color: #909399 !important;
  --el-button-hover-bg-color: #f0f2f5 !important;
  --el-button-hover-border-color: #f0f2f5 !important;
  font-weight: 600; font-size: 16px; padding: 14px 36px;
}

/* ═══ Footer ═══ */
.footer {
  background: #2c2c30; padding: 40px 0 24px;
}
.footer-inner {
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.footer-brand {
  display: flex; align-items: center; gap: 8px;
}
.footer-brand-icon { font-size: 20px; }
.footer-brand-text {
  font-size: 15px; font-weight: 600; color: #e0e0e0;
}
.footer-links {
  display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;
}
.footer-links a {
  text-decoration: none; color: #a0a3a8; font-size: 13px;
  transition: color .2s; cursor: pointer;
}
.footer-links a:hover { color: #d0d3d8; }
.footer-copyright {
  font-size: 12px; color: #707378; margin-top: 8px;
}
</style>
