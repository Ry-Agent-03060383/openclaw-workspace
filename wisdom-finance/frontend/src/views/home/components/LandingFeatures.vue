<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCoreServices, type ServiceItem } from '../../../api/core-services'

const router = useRouter()

const services = ref<ServiceItem[]>([
  { id: 'bank-match', title: '银企对接', summary: '智能匹配银行产品与企业需求，一站式融资对接', icon: '🏦', color: '#409EFF', route: '/core-services/bank-match', badge: '热门', order: 1 },
  { id: 'credit-check', title: '信用体检', summary: '多维数据融合，企业信用一键体检，实时掌握信用状况', icon: '📊', color: '#67C23A', route: '/core-services/credit-check', badge: '', order: 2 },
  { id: 'risk', title: '风险防控', summary: '多维度风控模型，全流程风险监测预警，保障资金安全', icon: '🛡️', color: '#E6A23C', route: '/core-services/risk', badge: '', order: 3 },
  { id: 'ai', title: 'AI智能服务', summary: '基于大模型的智能客服，7×24小时在线，AI辅助融资决策', icon: '🤖', color: '#F56C6C', route: '/core-services/ai', badge: '新', order: 4 },
  { id: 'mobile', title: '掌上金融', summary: '移动端全覆盖，随时随地办理融资业务', icon: '📱', color: '#909399', route: '/core-services/mobile', badge: '', order: 5 },
  { id: 'security', title: '数据安全', summary: '金融级数据加密，全方位信息安全保障', icon: '🔒', color: '#409EFF', route: '/core-services/security', badge: '', order: 6 },
])

const loading = ref(true)

onMounted(async () => {
  try {
    const data = await fetchCoreServices()
    if (data?.services?.length) {
      services.value = data.services
    }
  } catch {
    // fallback to static data
  } finally {
    loading.value = false
  }
})

function goTo(service: ServiceItem) {
  router.push(service.route)
}
</script>

<template>
  <section id="features" class="features-section" aria-label="核心服务">
    <div class="section-container animate-on-scroll">
      <div class="section-header">
        <span class="section-label">核心服务</span>
        <h2 class="section-title">全方位<strong>金融服务</strong></h2>
        <p class="section-desc">依托大数据与AI技术，为您提供一站式综合金融服务</p>
      </div>

      <div v-if="loading" class="features-skeleton">
        <div v-for="i in 6" :key="i" class="skeleton-card">
          <div class="sk-icon" />
          <div class="sk-lines">
            <div class="sk-line w-60" />
            <div class="sk-line w-90" />
          </div>
        </div>
      </div>

      <div v-else class="features-grid" role="list">
        <div
          v-for="s in services"
          :key="s.id"
          class="feature-card"
          role="listitem"
          :aria-label="s.title + '：' + s.summary"
          :style="{ '--accent': s.color, '--delay': (s.order || 0) * 0.08 + 's' }"
          @click="goTo(s)"
        >
          <div v-if="s.badge" class="feature-badge" :style="{ background: s.color }">{{ s.badge }}</div>
          <div class="feature-icon-wrap" :style="{ background: s.color + '15' }" aria-hidden="true">
            <span class="feature-icon">{{ s.icon }}</span>
          </div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.summary }}</p>
          <span class="feature-link" :style="{ color: s.color }">
            了解更多
            <span class="link-arrow" aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section { padding: 90px 0; background: #fff; }

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
.section-title strong { background: linear-gradient(135deg,#667eea,#764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.section-desc { font-size: 15px; color: #909399; margin: 0; }

/* ═══ Grid ═══ */
.features-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.feature-card {
  position: relative; padding: 36px 28px; border-radius: 16px; border: 1px solid #ebeef5;
  background: #fff; cursor: pointer;
  transition: all .35s cubic-bezier(.22,1,.36,1);
  animation: fadeUp .6s ease-out both; animation-delay: var(--delay);
}
.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 48px rgba(0,0,0,.07);
  border-color: var(--accent);
}
@keyframes fadeUp { from{ opacity:0; transform:translateY(20px) } to{ opacity:1; transform:translateY(0) } }

/* ═══ Badge ═══ */
.feature-badge {
  position: absolute; top: 12px; right: 12px; padding: 2px 10px;
  border-radius: 10px; color: #fff; font-size: 11px; font-weight: 600;
  line-height: 1.6;
}

/* ═══ Content ═══ */
.feature-icon-wrap { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; transition: transform .35s; }
.feature-card:hover .feature-icon-wrap { transform: scale(1.08); }
.feature-icon { font-size: 28px; }
.feature-card h3 { font-size: 18px; font-weight: 700; margin: 0 0 10px; color: #1a1a2e; }
.feature-card p { font-size: 14px; line-height: 1.6; color: #909399; margin: 0 0 16px; }
.feature-link {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 13px; font-weight: 500; text-decoration: none;
  transition: gap .3s;
}
.feature-card:hover .link-arrow { transform: translateX(4px); }
.link-arrow { display: inline-block; transition: transform .3s; }

/* ═══ Skeleton ═══ */
.features-skeleton { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.skeleton-card {
  padding: 36px 28px; border-radius: 16px; border: 1px solid #ebeef5;
  animation: pulse 1.5s ease-in-out infinite;
}
.sk-icon { width: 56px; height: 56px; border-radius: 14px; background: #f0f2f5; margin-bottom: 16px; }
.sk-lines { display: flex; flex-direction: column; gap: 10px; }
.sk-line { height: 14px; background: #f0f2f5; border-radius: 7px; }
.w-60 { width: 60%; }
.w-90 { width: 90%; }
@keyframes pulse { 0%,100%{ opacity:1 } 50%{ opacity:.5 } }

/* ═══ Animation ═══ */
.animate-on-scroll { opacity: 0; transform: translateY(36px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.animate-on-scroll.animate-in { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll { opacity: 1; transform: none; transition: none; }
  .feature-card { animation: none; opacity: 1; transform: none; }
  .feature-card:hover { transform: none; }
  .features-skeleton { animation: none; }
}

@media (max-width: 1024px) {
  .features-grid { grid-template-columns: repeat(2,1fr); }
  .features-skeleton { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 768px) {
  .features-grid { grid-template-columns: 1fr; gap: 16px; }
  .features-skeleton { grid-template-columns: 1fr; gap: 16px; }
  .feature-card { padding: 28px 20px; }
}
</style>