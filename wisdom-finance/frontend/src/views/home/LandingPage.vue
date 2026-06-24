<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../store/user'
import LandingNavbar from './components/LandingNavbar.vue'
import LandingHero from './components/LandingHero.vue'
import LandingStats from './components/LandingStats.vue'
import LandingFeatures from './components/LandingFeatures.vue'
import LandingProducts from './components/LandingProducts.vue'
import LandingDataViz from './components/LandingDataViz.vue'
import LandingPartners from './components/LandingPartners.vue'
import LandingFooter from './components/LandingFooter.vue'

const router = useRouter()
const userStore = useUserStore()

// ── SEO ╱ 页面元信息 ──
onMounted(() => {
  document.title = '焦作市智慧金融服务平台 — 中小企业融资一站式服务'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', '焦作市智慧金融服务平台，政府主导、数据驱动、银企对接、信用赋能，一站式解决中小企业融资难题。汇聚全市金融机构优质产品，AI智能融资助手7×24小时在线服务。')
})

// ── 滚动导航 & 入场动画 ──
const scrolled = ref(false)
const activeSection = ref('hero')
let observer: IntersectionObserver | null = null
let scrollTimer: number | undefined

function setupObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer?.observe(el))
}

function handleScroll() {
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = window.setTimeout(() => {
    scrolled.value = window.scrollY > 60
    const ids = ['hero','data-stats','features','products','data-viz','partners']
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) activeSection.value = id
    }
  }, 10)
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  nextTick(setupObserver)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimer) clearTimeout(scrollTimer)
  observer?.disconnect()
})
</script>

<template>
  <div class="landing-page">
    <LandingNavbar :scrolled="scrolled" :active-section="activeSection" @scroll-to="scrollTo" />

    <!-- ═══ Hero ═══ -->
    <LandingHero @scroll-to="scrollTo" />

    <!-- ═══ Stats ═══ -->
    <LandingStats />

    <!-- ═══ Features ═══ -->
    <LandingFeatures />

    <!-- ═══ Products ═══ -->
    <LandingProducts />

    <!-- ═══ Data Viz ═══ -->
    <LandingDataViz />

    <!-- ═══ Partners ═══ -->
    <LandingPartners />

    <!-- ═══ Footer ═══ -->
    <LandingFooter />

    <!-- ═══ AI 悬浮按钮 ═══ -->
    <div class="ai-float" @click="router.push(userStore.isLoggedIn ? '/dashboard/ai-chat' : '/login')"
         role="button" aria-label="打开AI智能客服" tabindex="0">
      <div class="ai-float-ring" aria-hidden="true" />
      <span class="ai-float-icon" aria-hidden="true">🤖</span>
      <span class="ai-float-label">AI客服</span>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
  color: #1a1a2e; overflow-x: hidden;
}

/* ═══ 滚动入场动画 ═══ */
.animate-on-scroll {
  opacity: 0; transform: translateY(36px);
  transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
}
.animate-on-scroll.animate-in { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll { opacity: 1; transform: none; transition: none; }
}

/* ═══ 通用 section 样式（供子组件共享） ═══ */
.section-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.section-header { text-align: center; margin-bottom: 48px; }
.section-label {
  display: inline-block; padding: 4px 16px; border-radius: 20px;
  background: rgba(102,126,234,.1); color: #667eea;
  font-size: 13px; font-weight: 600; margin-bottom: 10px;
}
.section-title {
  font-size: clamp(28px,5vw,38px); font-weight: 700; margin: 0 0 10px; color: #1a1a2e;
}
.section-title strong {
  background: linear-gradient(135deg,#667eea,#764ba2);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.section-desc { font-size: 15px; color: #909399; margin: 0; }

/* ═══ AI 悬浮按钮 ═══ */
.ai-float {
  position: fixed; bottom: 32px; right: 32px; z-index: 999;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  cursor: pointer; animation: floatIn .6s ease-out 1s both;
}
.ai-float-ring {
  position: absolute; width: 56px; height: 56px; border-radius: 50%;
  border: 2px solid rgba(102,126,234,.25);
  animation: floatPulse 2.5s ease-out infinite;
}
.ai-float-icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: linear-gradient(135deg,#667eea,#764ba2);
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; box-shadow: 0 4px 20px rgba(102,126,234,.4);
  transition: all .3s; position: relative;
}
.ai-float:hover .ai-float-icon { transform: scale(1.1); box-shadow: 0 6px 28px rgba(102,126,234,.55); }
.ai-float-label { font-size: 11px; color: #667eea; font-weight: 500; }
@keyframes floatPulse { 0%{ transform:scale(1); opacity:.5 } 100%{ transform:scale(1.5); opacity:0 } }
@keyframes floatIn { from{ opacity:0; transform:translateY(20px) scale(.8) } to{ opacity:1; transform:translateY(0) scale(1) } }
@media (max-width:768px) {
  .ai-float { bottom:20px; right:20px; }
  .ai-float-icon { width:48px; height:48px; font-size:22px; }
  .ai-float-ring { width:48px; height:48px; }
}
</style>
