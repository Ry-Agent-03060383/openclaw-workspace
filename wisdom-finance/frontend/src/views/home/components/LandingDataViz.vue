<script setup lang="ts">
import { ref, computed } from 'vue'

/* ── 担保方式占比 ── */
const guaranteeData = [
  { label: '抵押', pct: 42, color: '#667eea' },
  { label: '信用', pct: 28, color: '#67C23A' },
  { label: '保证', pct: 17, color: '#E6A23C' },
  { label: '质押', pct: 13, color: '#F56C6C' },
]

/** Compute SVG donut arc dash arrays */
function donutSegments() {
  const total = guaranteeData.reduce((s, g) => s + g.pct, 0)
  const r = 72
  const circ = 2 * Math.PI * r
  let offset = 0
  return guaranteeData.map(g => {
    const len = (g.pct / total) * circ
    const seg = { ...g, dasharray: `${len} ${circ - len}`, dashoffset: -offset, strokeWidth: 26 }
    offset += len
    return seg
  })
}

/* ── 行业融资占比（按百分比降序） ── */
const industryData = computed(() =>
  [
    { label: '制造业', pct: 35, icon: '🏭', color: '#667eea' },
    { label: '农业', pct: 25, icon: '🌾', color: '#67C23A' },
    { label: '科技', pct: 20, icon: '💻', color: '#E6A23C' },
    { label: '商贸', pct: 12, icon: '🏪', color: '#F56C6C' },
    { label: '其他', pct: 8, icon: '📋', color: '#909399' },
  ].sort((a, b) => b.pct - a.pct)
)

/* ── 县市区企业分布（降序+颜色分级） ── */
const regionColor = (val: number) => {
  if (val >= 1500) return '#667eea'
  if (val >= 1000) return '#67C23A'
  if (val >= 800) return '#E6A23C'
  return '#F56C6C'
}

const regionData = computed(() =>
  [
    { name: '沁阳市', val: 1680 }, { name: '孟州市', val: 1532 },
    { name: '山阳区', val: 1420 }, { name: '武陟县', val: 1350 },
    { name: '解放区', val: 1258 }, { name: '温县', val: 1120 },
    { name: '博爱县', val: 980 },  { name: '中站区', val: 892 },
    { name: '修武县', val: 876 },  { name: '马村区', val: 756 },
  ].sort((a, b) => b.val - a.val).map((r, i) => ({ ...r, rank: i + 1, barColor: regionColor(r.val) }))
)

/* ── 月度放款趋势 ── */
const selectedYear = ref(2026)

const trendData: Record<number, number[]> = {
  2024: [48, 52, 58, 55, 63, 60, 68, 72, 65, 70, 66, 73],
  2025: [55, 60, 65, 68, 72, 78, 82, 80, 74, 86, 82, 90],
  2026: [65, 78, 82, 70, 90, 85, 92, 88, 76, 95, 89, 99],
}

const trendValues = computed(() => trendData[selectedYear.value] || trendData[2026])
const trendMax = computed(() => Math.max(...trendValues.value))

/** Y-axis labels (5 steps) */
const yLabels = computed(() => {
  const max = trendMax.value
  return [0, 1, 2, 3, 4].map(i => Math.round((max / 4) * i))
})

/* ── 实时动态 ── */
const activityData = [
  { tag: '成功', text: '某企业成功获得贷款500万元', time: '2分钟前' },
  { tag: '发布', text: '某金融机构发布新产品', time: '8分钟前' },
  { tag: '完成', text: '某企业完成信用体检', time: '15分钟前' },
  { tag: '新增', text: '新增注册企业3家', time: '22分钟前' },
  { tag: '提交', text: '某企业提交融资申请', time: '35分钟前' },
  { tag: '成功', text: '某企业成功获得贷款300万元', time: '46分钟前' },
]

/* ── 年份切换 ── */
function yearBtnClass(y: number) {
  return { active: selectedYear.value === y }
}
</script>

<template>
  <section id="data-viz" class="viz-section" aria-label="数据可视化看板">
    <div class="section-container animate-on-scroll">
      <div class="section-header">
        <span class="section-label">数据看板</span>
        <h2 class="section-title">平台运行<strong>全景洞察</strong></h2>
        <p class="section-desc">多维度数据可视化，全面了解平台运营状况</p>
      </div>

      <!-- ═══ ROW 1：三列等宽 ═══ -->
      <div class="viz-grid viz-grid-3">
        <!-- ① 担保方式占比（环形图 SVG） -->
        <div class="viz-card card-donut" role="figure" aria-label="担保方式占比统计">
          <div class="card-accent" />
          <div class="viz-header">
            <span class="viz-icon">📊</span>
            <span>担保方式占比</span>
          </div>
          <div class="donut-wrap">
            <div class="donut-chart">
              <svg viewBox="0 0 200 200" class="donut-svg" aria-hidden="true">
                <circle cx="100" cy="100" r="72" fill="none" stroke="#edeff5" stroke-width="26" />
                <circle
                  v-for="(seg, i) in donutSegments()"
                  :key="i"
                  cx="100" cy="100" r="72"
                  fill="none"
                  :stroke="seg.color"
                  :stroke-width="seg.strokeWidth"
                  :stroke-dasharray="seg.dasharray"
                  :stroke-dashoffset="seg.dashoffset"
                  transform="rotate(-90 100 100)"
                  class="donut-arc"
                  :style="{ '--delay': i * 0.15 + 's' }"
                  :aria-label="seg.label + ' ' + seg.pct + '%'"
                />
              </svg>
              <div class="donut-center" aria-hidden="true">
                <span class="donut-total">100%</span>
                <span class="donut-sub">覆盖率</span>
              </div>
            </div>
            <div class="viz-legend" role="list" aria-label="图例">
              <span v-for="g in guaranteeData" :key="g.label" role="listitem" class="legend-item">
                <span class="legend-dot" :style="{ background: g.color }" aria-hidden="true" />
                <span class="legend-label">{{ g.label }}</span>
                <span class="legend-pct">{{ g.pct }}%</span>
              </span>
            </div>
          </div>
        </div>

        <!-- ② 行业融资占比（纵向柱状图） -->
        <div class="viz-card card-industry" role="figure" aria-label="行业融资占比">
          <div class="card-accent" />
          <div class="viz-header">
            <span class="viz-icon">🏗️</span>
            <span>行业融资占比</span>
          </div>
          <div class="industry-chart">
            <div
              v-for="(row, i) in industryData"
              :key="i"
              class="industry-row"
              :aria-label="row.label + ' ' + row.pct + '%'"
            >
              <span class="industry-icon">{{ row.icon }}</span>
              <span class="industry-label">{{ row.label }}</span>
              <div class="industry-track">
                <div
                  class="industry-fill"
                  :style="{ width: row.pct + '%', background: row.color, '--delay': i * 0.12 + 's' }"
                />
              </div>
              <span class="industry-pct">{{ row.pct }}%</span>
            </div>
          </div>
        </div>

        <!-- ③ 县市区企业分布（带排名柱状图） -->
        <div class="viz-card card-region" role="figure" aria-label="县市区企业分布">
          <div class="card-accent" />
          <div class="viz-header">
            <span class="viz-icon">🗺️</span>
            <span>县市区企业分布</span>
          </div>
          <div class="region-chart" role="list">
            <div
              v-for="r in regionData"
              :key="r.name"
              class="region-row"
              role="listitem"
              :aria-label="'第' + r.rank + '名 ' + r.name + '：' + r.val + '家'"
            >
              <span :class="['region-rank', r.rank <= 3 ? 'top-three' : '']">{{ r.rank }}</span>
              <span class="region-name">{{ r.name }}</span>
              <div class="region-track">
                <div
                  class="region-bar"
                  :style="{ width: (r.val / 1700 * 100) + '%', background: r.barColor, '--delay': r.rank * 0.06 + 's' }"
                />
              </div>
              <span class="region-val">{{ r.val }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ ROW 2：趋势图(2/3) + 实时动态(1/3) ═══ -->
      <div class="viz-grid viz-grid-2-1">
        <!-- ④ 月度放款趋势（全宽年份切换 + 柱状图 + 平均线） -->
        <div class="viz-card card-trend" role="figure" :aria-label="selectedYear + '年度放款趋势'">
          <div class="card-accent" />
          <div class="viz-header-row">
            <div class="viz-header">
              <span class="viz-icon">📈</span>
              <span>{{ selectedYear }}年度放款趋势</span>
              <span class="trend-unit">（亿元）</span>
            </div>
            <div class="year-selector" role="tablist" aria-label="选择年份">
              <button
                v-for="y in [2024, 2025, 2026]"
                :key="y"
                :class="yearBtnClass(y)"
                role="tab"
                :aria-selected="selectedYear === y"
                :aria-label="y + '年数据'"
                @click="selectedYear = y"
              >{{ y }}</button>
            </div>
          </div>
          <div class="trend-wrap">
            <!-- Y轴标签 -->
            <div class="trend-y-axis" aria-hidden="true">
              <span v-for="(v, i) in yLabels" :key="i" class="y-tick">{{ v }}</span>
            </div>
            <div class="trend-body">
              <!-- 平均参考线 -->
              <div class="trend-average" :style="{ bottom: (trendValues.reduce((a,b)=>a+b,0)/12 / trendMax * 100) + '%' }" aria-hidden="true">
                <span class="avg-label">均值</span>
              </div>
              <!-- 柱状图 -->
              <div class="trend-bars" role="list" aria-label="月度放款金额柱状图">
                <div
                  v-for="(b, i) in trendValues"
                  :key="i"
                  class="trend-bar-col"
                  role="listitem"
                  :aria-label="(i + 1) + '月：' + b + '亿元'"
                >
                  <div
                    class="trend-bar"
                    :style="{ height: (b / trendMax * 100) + '%', '--delay': i * 0.06 + 's' }"
                  >
                    <span class="trend-val">{{ b }}</span>
                  </div>
                  <span class="trend-label">{{ i + 1 }}月</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ⑤ 实时动态 -->
        <div class="viz-card card-activity" role="feed" aria-label="实时动态">
          <div class="card-accent" />
          <div class="viz-header">
            <span class="viz-icon">🔔</span>
            <span class="activity-header-inner">
              实时动态
              <span class="live-dot" aria-label="实时更新中" />
            </span>
          </div>
          <div class="activity-feed">
            <div
              v-for="(act, i) in activityData"
              :key="i"
              class="activity-item"
              :style="{ '--delay': i * 0.1 + 's' }"
              :aria-label="act.tag + '：' + act.text"
            >
              <span :class="['activity-badge', act.tag]">{{ act.tag }}</span>
              <div class="activity-body">
                <span class="activity-text">{{ act.text }}</span>
                <span class="activity-time">{{ act.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ═══ Section Base ═══ */
.viz-section { padding: 90px 0; background: linear-gradient(180deg, #f8f9fe 0%, #fff 60%); }
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

/* ═══ Grid Layout ═══ */
.viz-grid { display: grid; gap: 20px; margin-bottom: 20px; }
.viz-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
.viz-grid-2-1 { grid-template-columns: 2fr 1fr; }
.viz-grid:last-child { margin-bottom: 0; }

/* ═══ Card Base ═══ */
.viz-card {
  position: relative; background: #fff; border-radius: 16px; padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.04);
  transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s cubic-bezier(.22,1,.36,1);
  overflow: hidden;
}
.viz-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,.06), 0 12px 40px rgba(0,0,0,.08);
}
.card-accent {
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2, #67C23A);
  opacity: 0; transition: opacity .3s;
}
.viz-card:hover .card-accent { opacity: 1; }

/* ═══ Card Header ═══ */
.viz-header {
  display: flex; align-items: center; gap: 8px;
  font-size: 15px; font-weight: 600; color: #303133; margin-bottom: 18px;
}
.viz-icon { font-size: 18px; line-height: 1; }
.viz-header-row {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;
}
.viz-header-row .viz-header { margin-bottom: 0; }
.trend-unit { font-weight: 400; font-size: 12px; color: #909399; }

/* ═══ Animate-on-scroll (inherited from parent) ═══ */
/* ═══ Year Tabs ═══ */
.year-selector { display: flex; gap: 4px; flex-shrink: 0; }
.year-selector button {
  padding: 5px 14px; border: 1px solid #ebeef5; border-radius: 8px;
  background: #f8f9fe; font-size: 13px; font-weight: 500; color: #606266;
  cursor: pointer; transition: all .25s;
}
.year-selector button:hover { border-color: #667eea; color: #667eea; background: #f0f2ff; }
.year-selector button.active {
  background: linear-gradient(135deg,#667eea,#764ba2); border-color: transparent;
  color: #fff; box-shadow: 0 2px 10px rgba(102,126,234,.3);
}

/* ═══ Donut Chart ═══ */
.donut-wrap { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.donut-chart { position: relative; width: 150px; height: 150px; }
.donut-svg { width: 100%; height: 100%; }
.donut-arc { animation: donutIn .8s ease-out both; animation-delay: var(--delay); }
@keyframes donutIn { from { stroke-dasharray: 0 1000 } }
.donut-center {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  text-align: center;
}
.donut-total { display: block; font-size: 26px; font-weight: 800; color: #1a1a2e; line-height: 1.1; }
.donut-sub { display: block; font-size: 11px; color: #909399; font-weight: 400; }
.viz-legend { display: flex; flex-wrap: wrap; gap: 8px 16px; justify-content: center; width: 100%; }
.legend-item { display: flex; align-items: center; gap: 5px; font-size: 13px; color: #606266; }
.legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.legend-label { color: #303133; }
.legend-pct { font-weight: 700; color: #1a1a2e; margin-left: 2px; }

/* ═══ Industry Chart ═══ */
.industry-chart { display: flex; flex-direction: column; gap: 14px; }
.industry-row { display: flex; align-items: center; gap: 8px; }
.industry-icon { font-size: 18px; width: 24px; text-align: center; flex-shrink: 0; }
.industry-label { width: 44px; font-size: 13px; color: #303133; font-weight: 500; flex-shrink: 0; }
.industry-track { flex: 1; height: 22px; background: #f0f2f5; border-radius: 11px; overflow: hidden; }
.industry-fill {
  height: 100%; border-radius: 11px;
  animation: barIn 1s ease-out both; animation-delay: var(--delay);
}
@keyframes barIn { from { width: 0 !important } }
.industry-pct { width: 36px; font-size: 14px; font-weight: 700; color: #1a1a2e; text-align: right; }

/* ═══ Region Chart ═══ */
.region-chart { display: flex; flex-direction: column; gap: 7px; }
.region-row { display: flex; align-items: center; gap: 8px; }
.region-rank {
  width: 20px; height: 20px; border-radius: 6px;
  background: #f0f2f5; display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: #909399; flex-shrink: 0;
}
.region-rank.top-three { background: #667eea; color: #fff; }
.region-name { width: 56px; font-size: 13px; color: #303133; flex-shrink: 0; }
.region-track { flex: 1; height: 12px; background: #f0f2f5; border-radius: 6px; overflow: hidden; }
.region-bar {
  height: 100%; border-radius: 6px;
  animation: barIn 1s ease-out both; animation-delay: var(--delay);
}
.region-val { width: 44px; font-size: 12px; font-weight: 600; color: #606266; text-align: right; }

/* ═══ Trend Chart ═══ */
.trend-wrap { display: flex; gap: 8px; height: 220px; }
.trend-y-axis {
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 0 4px 24px 0; flex-shrink: 0;
}
.y-tick { font-size: 10px; color: #c0c4cc; line-height: 1; }
.trend-body { flex: 1; position: relative; }
.trend-average {
  position: absolute; left: 0; right: 0; z-index: 1;
  border-top: 1.5px dashed #667eea; opacity: .5;
  pointer-events: none;
}
.avg-label {
  position: absolute; left: -2px; top: -8px; font-size: 10px; color: #667eea; font-weight: 500;
  background: #fff; padding: 0 4px;
}
.trend-bars {
  display: flex; gap: 6px; height: 220px; align-items: flex-end;
  padding-bottom: 24px; position: relative;
}
.trend-bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; min-width: 0; }
.trend-bar {
  width: 100%; max-width: 36px;
  background: linear-gradient(to top, #667eea, #8b7ef0);
  border-radius: 4px 4px 0 0; position: relative;
  animation: barGrow .8s ease-out both; animation-delay: var(--delay);
  min-height: 3px; cursor: pointer;
  transition: filter .2s;
}
.trend-bar:hover { filter: brightness(1.15); }
@keyframes barGrow { from { height: 0 !important } }
.trend-val {
  position: absolute; top: -20px; left: 50%; transform: translateX(-50%);
  font-size: 11px; font-weight: 600; color: #667eea; white-space: nowrap;
  opacity: 0; transition: opacity .2s;
}
.trend-bar-col:hover .trend-val { opacity: 1; }
.trend-label { margin-top: 8px; font-size: 11px; color: #909399; flex-shrink: 0; }

/* ═══ Activity Feed ═══ */
.activity-header-inner { display: flex; align-items: center; gap: 6px; }
.live-dot {
  width: 7px; height: 7px; border-radius: 50%; background: #67C23A;
  animation: livePulse 1.8s ease-out infinite;
}
@keyframes livePulse { 0% { opacity: 1; } 50% { opacity: .3; } 100% { opacity: 1; } }
.activity-feed { display: flex; flex-direction: column; gap: 4px; }
.activity-item {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 8px 0; border-bottom: 1px solid #f5f6fa;
  animation: slideIn .4s ease-out both; animation-delay: var(--delay);
}
.activity-item:last-child { border-bottom: none; }
@keyframes slideIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: none; } }
.activity-badge {
  padding: 2px 7px; border-radius: 5px; font-size: 11px; font-weight: 600;
  flex-shrink: 0; margin-top: 1px;
}
.activity-badge.成功 { background: rgba(103,194,58,.12); color: #67C23A; }
.activity-badge.发布 { background: rgba(64,158,255,.12); color: #409EFF; }
.activity-badge.完成 { background: rgba(144,147,153,.12); color: #909399; }
.activity-badge.新增 { background: rgba(230,162,60,.12); color: #E6A23C; }
.activity-badge.提交 { background: rgba(245,108,108,.12); color: #F56C6C; }
.activity-body { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.activity-text { font-size: 13px; color: #606266; line-height: 1.4; }
.activity-time { font-size: 11px; color: #c0c4cc; }

/* ═══ Animation ═══ */
.animate-on-scroll {
  opacity: 0; transform: translateY(36px);
  transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1);
}
.animate-on-scroll.animate-in { opacity: 1; transform: translateY(0); }

/* ═══ Reduced Motion ═══ */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll { opacity: 1; transform: none; transition: none; }
  .donut-arc { animation: none; }
  .industry-fill { animation: none; }
  .region-bar { animation: none; }
  .trend-bar { animation: none; }
  .activity-item { animation: none; }
  .viz-card:hover { transform: none; }
  .live-dot { animation: none; }
}

/* ═══ Responsive ═══ */
@media (max-width: 1024px) {
  .viz-grid-3 { grid-template-columns: 1fr 1fr; }
  .viz-grid-2-1 { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .viz-grid-3 { grid-template-columns: 1fr; }
  .viz-header-row { flex-direction: column; align-items: flex-start; gap: 10px; }
  .trend-wrap { height: 180px; }
  .trend-bars { height: 180px; }
}
</style>