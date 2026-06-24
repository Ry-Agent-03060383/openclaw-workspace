<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../store/user'

const router = useRouter()
const userStore = useUserStore()
const bannerIndex = ref(0)
const searchKeyword = ref('')

const emit = defineEmits<{ scrollTo: [id: string] }>()

const banners = [
  { title: '焦作市中小企业融资服务平台', subtitle: '政府主导 · 数据驱动 · 银企对接 · 信用赋能', desc: '运用互联网、大数据、云计算和人工智能等新技术，全面融合各方资源，一站式解决中小企业融资难题', color: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' },
  { title: '金融产品超市', subtitle: '汇聚全市金融机构优质产品', desc: '在线比较、智能匹配，找到最适合您的融资方案，让融资像网购一样便捷', color: 'linear-gradient(135deg, #0a1628, #1a3a5c, #0d2137)' },
  { title: 'AI智能融资助手', subtitle: '7×24小时智能服务', desc: '基于大模型技术的智能客服，为您提供融资咨询、政策解读、产品推荐等一站式服务', color: 'linear-gradient(135deg, #1a0a2e, #302b63, #0f0c29)' },
]

let bannerTimer: number | undefined
import { onMounted, onUnmounted } from 'vue'
onMounted(() => {
  bannerTimer = window.setInterval(() => {
    bannerIndex.value = (bannerIndex.value + 1) % banners.length
  }, 5000)
})
onUnmounted(() => { if (bannerTimer) clearInterval(bannerTimer) })
</script>

<template>
  <section id="hero" class="hero-section" aria-label="平台品牌宣传区">
    <div class="hero-slider" :style="{ background: banners[bannerIndex].color }">
      <div class="grid-overlay" />
      <div class="hero-orb hero-orb-1" />
      <div class="hero-orb hero-orb-2" />
      <div class="hero-orb hero-orb-3" />
    </div>

    <div class="hero-content">
      <div class="banner-dots" role="tablist" aria-label="Banner切换">
        <span v-for="(_, i) in banners" :key="i"
              :class="{ active: i === bannerIndex }"
              :aria-selected="i === bannerIndex"
              :aria-label="'切换到第' + (i+1) + '张Banner'"
              role="tab"
              @click="bannerIndex = i" />
      </div>

      <transition name="banner-fade" mode="out-in">
        <div :key="bannerIndex" class="banner-text">
          <div class="hero-badge">{{ banners[bannerIndex].subtitle }}</div>
          <h1 class="hero-title">{{ banners[bannerIndex].title }}</h1>
          <p class="hero-desc">{{ banners[bannerIndex].desc }}</p>
        </div>
      </transition>

      <div class="hero-actions">
        <el-button type="primary" size="large" round
                   @click="userStore.isLoggedIn ? router.push('/dashboard') : router.push('/login')">
          {{ userStore.isLoggedIn ? '进入操控台' : '立即体验' }}
        </el-button>
        <el-button size="large" round @click="emit('scrollTo', 'products')">查看金融产品</el-button>
      </div>

      <!-- 产品智能搜索预览 (不强制登录) -->
      <div class="search-bar" role="search" aria-label="金融产品搜索">
        <div class="search-inner">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input v-model="searchKeyword" type="text"
                 placeholder="搜索金融产品，如 小微快贷、纳税e贷..."
                 aria-label="输入产品名称搜索" />
          <el-button type="primary" round
                     @click="userStore.isLoggedIn ? router.push('/dashboard') : router.push('/login?search=' + searchKeyword)">
            搜索
          </el-button>
        </div>
        <div class="hot-tags">
          <span class="hot-label">热门搜索：</span>
          <a v-for="t in ['小微快贷','纳税e贷','短期流资贷款','科技贷']" :key="t"
             class="hot-tag" href="#" @click.prevent="searchKeyword = t"
             aria-label="搜索{{ t }}">{{ t }}</a>
        </div>
        <!-- 搜索预览 -->
        <div v-if="searchKeyword" class="search-preview" role="listbox" aria-label="搜索结果预览">
          <div class="preview-item" v-for="p in (searchKeyword ? [{name:'小微快贷', bank:'工商银行', rate:'3.85%'}] : [])" :key="p.name">
            <span class="preview-name">{{ p.name }}</span>
            <span class="preview-bank">{{ p.bank }}</span>
            <span class="preview-rate">{{ p.rate }}</span>
          </div>
          <div class="preview-login-hint">
            <span>登录后查看完整产品信息</span>
            <el-button size="small" round type="primary" @click="router.push('/login')">立即登录</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator" @click="emit('scrollTo', 'data-stats')"
         role="button" aria-label="向下滚动查看平台数据">
      <span>向下滚动查看平台数据</span>
      <div class="scroll-arrow" aria-hidden="true">↓</div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.hero-slider { position: absolute; inset: 0; transition: background 1s ease; }
.grid-overlay {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
                    linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
  background-size: 60px 60px;
}
.hero-orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .35; animation: orbFloat 8s ease-in-out infinite; }
.hero-orb-1 { width: 500px; height: 500px; background: #667eea; top: -150px; left: -150px; }
.hero-orb-2 { width: 400px; height: 400px; background: #f093fb; bottom: -100px; right: -100px; animation-delay: -3s; }
.hero-orb-3 { width: 350px; height: 350px; background: #4facfe; top: 50%; left: 50%; transform: translate(-50%,-50%); animation-delay: -6s; }
@keyframes orbFloat { 0%,100%{ transform:translate(0,0) scale(1) } 33%{ transform:translate(30px,-30px) scale(1.1) } 66%{ transform:translate(-20px,20px) scale(.95) } }
.hero-content { position: relative; z-index: 2; text-align: center; max-width: 800px; padding: 0 24px; width: 100%; }
.banner-dots { display: flex; gap: 8px; justify-content: center; margin-bottom: 28px; }
.banner-dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.25); cursor: pointer; transition: all .3s; }
.banner-dots span.active { width: 28px; border-radius: 4px; background: rgba(255,255,255,.7); }
.banner-fade-enter-active, .banner-fade-leave-active { transition: all .5s ease; }
.banner-fade-enter-from { opacity: 0; transform: translateY(16px); }
.banner-fade-leave-to { opacity: 0; transform: translateY(-16px); }
.hero-badge {
  display: inline-block; padding: 6px 20px; border-radius: 20px;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
  color: rgba(255,255,255,.7); font-size: 13px; margin-bottom: 20px; letter-spacing: 1px;
}
.hero-title { font-size: clamp(36px,7vw,60px); font-weight: 800; line-height: 1.15; color: #fff; margin: 0 0 16px; }
.hero-desc { font-size: 15px; line-height: 1.8; color: rgba(255,255,255,.5); margin: 0 0 28px; }
.hero-actions { display: flex; gap: 12px; justify-content: center; margin-bottom: 32px; }
.search-bar {
  max-width: 640px; margin: 0 auto;
  background: rgba(255,255,255,.1); backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.15); border-radius: 16px;
  padding: 20px 24px; position: relative;
}
.search-inner { display: flex; align-items: center; gap: 8px; }
.search-icon { font-size: 18px; }
.search-inner input {
  flex: 1; background: transparent; border: none; outline: none;
  color: #fff; font-size: 14px; padding: 8px 0;
}
.search-inner input::placeholder { color: rgba(255,255,255,.35); }
.hot-tags { display: flex; align-items: center; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
.hot-label { font-size: 12px; color: rgba(255,255,255,.35); }
.hot-tag { font-size: 12px; color: rgba(255,255,255,.5); cursor: pointer; padding: 2px 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,.15); transition: all .2s; }
.hot-tag:hover { color: #fff; border-color: rgba(255,255,255,.4); }
.search-preview {
  position: absolute; top: calc(100% + 8px); left: 0; right: 0;
  background: rgba(30,30,60,.95); backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,.1); border-radius: 12px;
  padding: 12px; z-index: 10; text-align: left;
}
.preview-item { display: flex; gap: 12px; padding: 8px 12px; border-radius: 8px; transition: background .15s; }
.preview-item:hover { background: rgba(255,255,255,.05); }
.preview-name { color: #fff; font-weight: 600; font-size: 14px; }
.preview-bank { color: rgba(255,255,255,.4); font-size: 12px; }
.preview-rate { margin-left: auto; color: #F56C6C; font-weight: 600; font-size: 13px; }
.preview-login-hint {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px; margin-top: 4px; border-top: 1px solid rgba(255,255,255,.06);
  font-size: 12px; color: rgba(255,255,255,.4);
}
.scroll-indicator {
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  color: rgba(255,255,255,.35); font-size: 12px; cursor: pointer; animation: bounce 2s infinite;
}
.scroll-arrow { font-size: 16px; animation: arrowBounce 1.5s infinite; }
@keyframes bounce { 0%,100%{ transform:translateX(-50%) translateY(0) } 50%{ transform:translateX(-50%) translateY(6px) } }
@keyframes arrowBounce { 0%,100%{ transform:translateY(0) } 50%{ transform:translateY(4px) } }
@media (max-width:768px) {
  .hero-actions { flex-direction: column; align-items: center; }
  .search-bar { padding: 14px 16px; }
  .search-inner input { font-size: 13px; }
}
</style>
