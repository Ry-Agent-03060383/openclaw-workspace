<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { getHomeStats, type HomeStats } from '../../../api/home'

const loading = ref(true)
const stats = ref([
  { label: '注册认证企业', value: 0, suffix: '户', icon: '🏢' },
  { label: '融资需求数量', value: 0, suffix: '笔', icon: '📋' },
  { label: '累计需求金额', value: 0, suffix: '万元', icon: '💰' },
  { label: '累计放款金额', value: 0, suffix: '万元', icon: '✅' },
])
const activityFeed = ref<{ tag: string; text: string }[]>([])

function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10)
    if (!target) return
    let current = 0
    const start = performance.now()
    function step(now: number) {
      const elapsed = now - start
      if (elapsed >= 1500) { el.textContent = target.toLocaleString(); return }
      current = Math.floor((elapsed / 1500) * target)
      el.textContent = Math.min(current, target).toLocaleString()
      requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
}

async function loadStats() {
  try {
    const res = await getHomeStats()
    if (res.code === 200 && res.data) {
      const data = res.data as HomeStats
      if (data.stats?.length) {
        stats.value = data.stats.map((s, i) => ({
          ...stats.value[i], label: s.label || stats.value[i].label,
          value: Number(s.value) || 0, suffix: s.suffix || '',
        }))
      }
      if (data.activities?.length) activityFeed.value = data.activities
    }
  } catch { /* 降级 */ }
  finally { loading.value = false; nextTick(animateCounters) }
}

onMounted(loadStats)
</script>

<template>
  <section id="data-stats" class="stats-section" aria-label="平台数据统计">
    <div class="section-container animate-on-scroll">
      <div class="section-header">
        <span class="section-label">平台数据</span>
        <h2 class="section-title">服务成果<strong>动态展示</strong></h2>
        <p class="section-desc">截至2026年6月，平台累计服务成果一览</p>
      </div>

      <div v-if="loading" class="stats-grid">
        <div v-for="i in 4" :key="i" class="stat-card skeleton">
          <div class="skeleton-circle" /><div class="skeleton-block h-10 w-28 mx-auto" /><div class="skeleton-block h-4 w-20 mx-auto mt-2" />
        </div>
      </div>
      <div v-else class="stats-grid">
        <div v-for="s in stats" :key="s.label" class="stat-card" role="figure" :aria-label="s.label + ': ' + s.value + s.suffix">
          <div class="stat-icon" aria-hidden="true">{{ s.icon }}</div>
          <div class="stat-number-wrap">
            <span class="stat-number" :data-target="s.value" role="meter" :aria-valuenow="s.value" aria-valuemin="0">{{ s.value.toLocaleString() }}</span>
            <span class="stat-suffix">{{ s.suffix }}</span>
          </div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>

      <div class="ticker-wrap">
        <span class="ticker-icon" aria-hidden="true">📢</span>
        <div class="ticker-track">
          <div class="ticker-content">
            <span v-for="(act, i) in (activityFeed.length ? activityFeed : [
              {tag:'成功',text:'某企业成功获得贷款500万元'},{tag:'发布',text:'某金融机构发布新产品'},
              {tag:'完成',text:'某企业完成信用体检'},{tag:'新增',text:'新增注册企业3家'},
              {tag:'提交',text:'某企业提交融资申请'},
            ])" :key="i" class="ticker-item">
              <span :class="['ticker-tag', act.tag]">{{ act.tag }}</span>
              {{ act.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section { padding: 90px 0; background: #f8f9fe; }
.stats-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
.stat-card { background: #fff; border-radius: 16px; padding: 32px 20px; text-align: center; box-shadow: 0 2px 20px rgba(0,0,0,.04); transition: all .3s; }
.stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(102,126,234,.1); }
.stat-icon { font-size: 36px; margin-bottom: 12px; }
.stat-number-wrap { margin-bottom: 6px; }
.stat-number { font-size: 38px; font-weight: 800; color: #1a1a2e; line-height: 1; }
.stat-suffix { font-size: 18px; font-weight: 600; color: #667eea; margin-left: 2px; }
.stat-label { color: #909399; font-size: 14px; }
.ticker-wrap { margin-top: 32px; display: flex; align-items: center; gap: 10px; padding: 12px 20px; background: #fff; border-radius: 12px; box-shadow: 0 1px 10px rgba(0,0,0,.04); }
.ticker-icon { font-size: 18px; flex-shrink: 0; }
.ticker-track { overflow: hidden; flex: 1; }
.ticker-content { display: flex; gap: 32px; animation: tickerScroll 30s linear infinite; width: max-content; }
.ticker-content:hover { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .ticker-content { animation: none; } }
@keyframes tickerScroll { 0%{ transform:translateX(0) } 100%{ transform:translateX(-50%) } }
.ticker-item { white-space: nowrap; font-size: 13px; color: #606266; display: flex; align-items: center; gap: 6px; }
.ticker-tag { padding: 1px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.ticker-tag.成功 { background: rgba(103,194,58,.1); color: #67C23A; }
.ticker-tag.发布 { background: rgba(64,158,255,.1); color: #409EFF; }
.ticker-tag.完成 { background: rgba(144,147,153,.1); color: #909399; }
.ticker-tag.新增 { background: rgba(230,162,60,.1); color: #E6A23C; }
.ticker-tag.提交 { background: rgba(245,108,108,.1); color: #F56C6C; }
.skeleton-circle { width:48px; height:48px; border-radius:50%; background:linear-gradient(90deg,#f0f2f5 25%,#e8eaed 50%,#f0f2f5 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; margin:0 auto 12px; }
.skeleton-block { background:linear-gradient(90deg,#f0f2f5 25%,#e8eaed 50%,#f0f2f5 75%); background-size:200% 100%; animation:shimmer 1.5s infinite; border-radius:6px; }
.h-10 { height:40px; } .h-4 { height:16px; } .w-28 { width:112px; } .w-20 { width:80px; } .mx-auto { margin:0 auto; } .mt-2 { margin-top:8px; }
@keyframes shimmer { 0%{ background-position:200% 0 } 100%{ background-position:-200% 0 } }
.section-container { max-width:1200px; margin:0 auto; padding:0 24px; }
.section-header { text-align:center; margin-bottom:48px; }
.section-label { display:inline-block; padding:4px 16px; border-radius:20px; background:rgba(102,126,234,.1); color:#667eea; font-size:13px; font-weight:600; margin-bottom:10px; }
.section-title { font-size:clamp(28px,5vw,38px); font-weight:700; margin:0 0 10px; color:#1a1a2e; }
.section-title strong { background:linear-gradient(135deg,#667eea,#764ba2); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.section-desc { font-size:15px; color:#909399; margin:0; }
.animate-on-scroll { opacity:0; transform:translateY(36px); transition:opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.animate-on-scroll.animate-in { opacity:1; transform:translateY(0); }
@media (prefers-reduced-motion: reduce) { .animate-on-scroll { opacity:1; transform:none; transition:none; } }
@media (max-width:768px) {
  .stats-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
  .stat-card { padding:24px 12px; }
  .stat-icon { font-size:28px; }
  .stat-number { font-size:30px; }
}
</style>
