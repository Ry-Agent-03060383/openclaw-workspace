<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCmsByType, getCmsByCategory, getCategoryLabel, type CmsContentItem } from '../../api/cms'

const route = useRoute()
const router = useRouter()

const item = ref<CmsContentItem | null>(null)
const categoryItems = ref<CmsContentItem[]>([])
const loading = ref(true)
const error = ref('')

const categoryLabel = computed(() => {
  if (!item.value) return ''
  return getCategoryLabel(item.value.category)
})

async function loadContent() {
  loading.value = true
  error.value = ''
  const id = route.params.id as string
  try {
    const res = await getCmsByType(id)
    if (res?.data) {
      item.value = res.data
      // 同时加载同分类列表
      const catRes = await getCmsByCategory(res.data.category)
      categoryItems.value = catRes?.data || []
    } else {
      error.value = '内容不存在'
    }
  } catch {
    error.value = '加载失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

function goHome() {
  router.push('/')
}

onMounted(loadContent)
</script>

<template>
  <div class="footer-detail-page">
    <!-- ═══ 加载态 ═══ -->
    <div v-if="loading" class="loading-state">
      <div class="spinner" />
      <p>加载中...</p>
    </div>

    <!-- ═══ 错误态 ═══ -->
    <div v-else-if="error" class="error-state">
      <span class="error-icon">⚠️</span>
      <h2>{{ error }}</h2>
      <el-button @click="goHome">返回首页</el-button>
    </div>

    <!-- ═══ 内容 ═══ -->
    <template v-else-if="item">
      <!-- ═══ 顶部 Banner ═══ -->
      <section class="detail-hero" :style="{ backgroundImage: `linear-gradient(135deg, #0f0c29, #302b63, #24243e)` }">
        <div class="hero-content">
          <div class="hero-icon">{{ item.icon || '📄' }}</div>
          <h1>{{ item.title }}</h1>
          <p class="hero-subtitle">{{ item.subtitle }}</p>
          <div class="breadcrumb">
            <a @click="goHome">首页</a>
            <span class="sep">/</span>
            <a @click="goHome" class="no-style">{{ categoryLabel }}</a>
            <span class="sep">/</span>
            <span class="current">{{ item.title }}</span>
          </div>
        </div>
      </section>

      <!-- ═══ 主体区域 ═══ -->
      <section class="detail-body">
        <div class="body-container">
          <!-- 侧边栏导航 -->
          <aside class="body-sidebar">
            <h3>{{ categoryLabel }}</h3>
            <ul>
              <li
                v-for="ci in categoryItems"
                :key="ci.id"
                :class="{ active: ci.id === item.id }"
                @click="router.push(`/footer/${ci.type}`)"
              >
                <span class="sidebar-icon">{{ ci.icon }}</span>
                <span>{{ ci.title }}</span>
              </li>
            </ul>
            <div class="sidebar-back">
              <a @click="goHome">← 返回首页</a>
            </div>
          </aside>

          <!-- 正文区 -->
          <article class="body-main">
            <div class="summary-card">
              <p>{{ item.summary }}</p>
            </div>

            <div
              v-for="(section, i) in item.body"
              :key="i"
              class="body-section"
              v-html="section"
            />

            <!-- Meta 数据 -->
            <div v-if="item.meta?.length" class="meta-grid">
              <div v-for="(m, i) in item.meta" :key="i" class="meta-item">
                <span class="meta-value">{{ m.value }}</span>
                <span class="meta-key">{{ m.key }}</span>
              </div>
            </div>

            <!-- 相关链接 -->
            <div v-if="item.related?.length" class="related-links">
              <h3>相关服务</h3>
              <div class="related-grid">
                <a
                  v-for="r in item.related"
                  :key="r.label"
                  class="related-card"
                  @click="router.push(r.link)"
                >
                  <span class="related-arrow">→</span>
                  <span>{{ r.label }}</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </template>

    <!-- ═══ 底部 ═══ -->
    <footer class="detail-footer">
      <div class="footer-inner">
        <p>焦作市智慧金融服务有限公司 © 2026 版权所有</p>
        <p>
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener">豫ICP备19020090号-1</a>
          <span class="sep">|</span>
          <a href="https://beian.mps.gov.cn" target="_blank" rel="noopener">豫公网安备41081102000285号</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
:deep(h3) { font-size: 22px; font-weight: 700; margin: 40px 0 12px; color: #1a1a2e; }
:deep(h3:first-child) { margin-top: 0; }
:deep(p) { font-size: 15px; line-height: 1.9; color: #4a4a5a; margin: 0 0 16px; }
:deep(ul) { padding-left: 20px; margin: 0 0 20px; }
:deep(li) { font-size: 15px; line-height: 1.9; color: #4a4a5a; margin-bottom: 6px; }
:deep(strong) { color: #1a1a2e; }
:deep(table) { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
:deep(td) { padding: 10px 14px; border-bottom: 1px solid #eee; color: #4a4a5a; }
:deep(td:first-child) { font-weight: 600; color: #1a1a2e; white-space: nowrap; width: 140px; }

/* ═══ 加载/错误态 ═══ */
.loading-state, .error-state { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; background: #0a0a1a; color: #fff; }
.spinner { width: 40px; height: 40px; border: 3px solid rgba(255,255,255,.1); border-top-color: #667eea; border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.error-icon { font-size: 48px; }
.error-state h2 { font-size: 20px; color: rgba(255,255,255,.7); margin: 0; }

.detail-hero { min-height: 280px; display: flex; align-items: center; justify-content: center; text-align: center; padding: 80px 24px 60px; }
.hero-content { max-width: 720px; }
.hero-icon { font-size: 64px; margin-bottom: 12px; }
.hero-content h1 { font-size: clamp(32px,5vw,44px); font-weight: 800; color: #fff; margin: 0 0 8px; }
.hero-subtitle { font-size: 16px; color: rgba(255,255,255,.65); margin: 0 0 24px; }
.breadcrumb { font-size: 13px; color: rgba(255,255,255,.4); display: flex; gap: 8px; align-items: center; justify-content: center; }
.breadcrumb a { color: rgba(255,255,255,.5); cursor: pointer; transition: color .2s; }
.breadcrumb a:hover { color: #667eea; }
.no-style { cursor: pointer; }
.current { color: rgba(255,255,255,.7); }
.sep { color: rgba(255,255,255,.2); }

.detail-body { background: #f5f6fa; padding: 48px 24px; }
.body-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 220px 1fr; gap: 40px; }

.body-sidebar h3 { font-size: 15px; font-weight: 700; color: #1a1a2e; margin: 0 0 12px; padding-bottom: 10px; border-bottom: 2px solid #667eea; }
.body-sidebar ul { list-style: none; padding: 0; margin: 0; }
.body-sidebar li { display: flex; align-items: center; gap: 8px; padding: 10px 12px; cursor: pointer; border-radius: 8px; font-size: 14px; color: #4a4a5a; transition: all .2s; margin-bottom: 2px; }
.body-sidebar li:hover { background: rgba(102,126,234,.08); color: #667eea; }
.body-sidebar li.active { background: rgba(102,126,234,.12); color: #667eea; font-weight: 600; }
.sidebar-icon { font-size: 18px; }
.sidebar-back { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0e0e8; }
.sidebar-back a { font-size: 13px; color: #909399; cursor: pointer; transition: color .2s; }
.sidebar-back a:hover { color: #667eea; }

.body-main { min-height: 400px; }
.summary-card { background: linear-gradient(135deg,#f0f2ff,#fff); border: 1px solid #e8e8ff; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px; }
.summary-card p { font-size: 15px; color: #5a5a7a; line-height: 1.8; margin: 0; }
.body-section { background: #fff; border-radius: 12px; padding: 28px 32px; margin-bottom: 20px; box-shadow: 0 1px 4px rgba(0,0,0,.04); }

.meta-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin: 32px 0; }
.meta-item { background: linear-gradient(135deg,#667eea,#764ba2); border-radius: 12px; padding: 20px; text-align: center; }
.meta-value { display: block; font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 4px; }
.meta-key { font-size: 12px; color: rgba(255,255,255,.7); }
@media (max-width:768px) { .meta-grid { grid-template-columns: repeat(2,1fr); } }

.related-links { margin-top: 40px; }
.related-links h3 { font-size: 18px; margin-bottom: 16px; }
.related-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
.related-card { display: flex; align-items: center; gap: 8px; background: #fff; border-radius: 10px; padding: 14px 18px; cursor: pointer; transition: all .2s; border: 1px solid #eee; font-size: 14px; color: #4a4a5a; text-decoration: none; }
.related-card:hover { border-color: #667eea; color: #667eea; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102,126,234,.15); }
.related-arrow { color: #667eea; font-weight: 700; }

.detail-footer { background: #0a0a1a; padding: 24px; text-align: center; }
.footer-inner { max-width: 1200px; margin: 0 auto; }
.detail-footer p { font-size: 12px; color: rgba(255,255,255,.4); margin: 4px 0; }
.detail-footer a { color: rgba(255,255,255,.3); text-decoration: none; }
.detail-footer a:hover { color: #667eea; }
.detail-footer .sep { margin: 0 8px; color: rgba(255,255,255,.15); }

@media (max-width: 768px) {
  .body-container { grid-template-columns: 1fr; }
  .body-sidebar { display: none; }
  .body-section { padding: 20px; }
  .related-grid { grid-template-columns: 1fr; }
  .detail-hero { min-height: 200px; padding: 60px 20px 40px; }
}
</style>