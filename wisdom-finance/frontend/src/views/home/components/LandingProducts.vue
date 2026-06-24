<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../store/user'

const router = useRouter()
const userStore = useUserStore()
const searchKeyword = ref('')

const hotProducts = [
  { bank: '工商银行', name: '小微快贷', rate: '3.85%', term: '1-12月', type: '信用', tag: '热门' },
  { bank: '农业银行', name: '纳税e贷', rate: '4.0%', term: '1-12月', type: '信用', tag: '热门' },
  { bank: '中国银行', name: '短期流资贷款', rate: '3.95%', term: '3-12月', type: '抵押', tag: '推荐' },
  { bank: '建设银行', name: '惠懂你', rate: '3.75%', term: '1-12月', type: '信用', tag: '热销' },
  { bank: '交通银行', name: '线上税融通', rate: '4.1%', term: '1-6月', type: '信用', tag: '' },
  { bank: '邮储银行', name: '极速贷', rate: '4.2%', term: '1-24月', type: '抵押', tag: '新品' },
]

const filteredProducts = ref([...hotProducts])

function handleSearch() {
  if (!searchKeyword.value.trim()) {
    filteredProducts.value = [...hotProducts]
    return
  }
  const kw = searchKeyword.value.trim().toLowerCase()
  filteredProducts.value = hotProducts.filter(
    p => p.name.toLowerCase().includes(kw) || p.bank.toLowerCase().includes(kw)
  )
}
</script>

<template>
  <section id="products" class="products-section" aria-label="金融产品">
    <div class="section-container animate-on-scroll">
      <div class="section-header">
        <span class="section-label">金融产品</span>
        <h2 class="section-title">精选<strong>融资产品</strong></h2>
        <p class="section-desc">汇聚全市银行优质信贷产品，智能匹配您的需求</p>
      </div>

      <!-- 产品搜索预览 -->
      <div class="product-search-bar" role="search" aria-label="金融产品搜索">
        <div class="product-search-inner">
          <span class="product-search-icon" aria-hidden="true">🔍</span>
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="按产品名称或银行搜索..."
            aria-label="输入产品名称或银行搜索"
            @input="handleSearch"
          />
          <el-button type="primary" round size="small" @click="handleSearch">搜索</el-button>
        </div>
        <div class="product-hot-tags">
          <span class="hot-label">热门：</span>
          <a
            v-for="t in ['小微快贷','纳税e贷','短期流资贷款','科技贷']"
            :key="t"
            class="hot-tag"
            href="#"
            @click.prevent="searchKeyword = t; handleSearch()"
            :aria-label="'搜索' + t"
          >{{ t }}</a>
        </div>
      </div>

      <div class="products-grid" role="list">
        <div
          v-for="(p, i) in filteredProducts"
          :key="i"
          class="product-card"
          role="listitem"
          :aria-label="p.bank + ' - ' + p.name"
          :style="{ '--delay': i * 0.06 + 's' }"
        >
          <div class="product-header">
            <span class="product-bank">{{ p.bank }}</span>
            <span v-if="p.tag" :class="['product-tag', p.tag]">{{ p.tag }}</span>
          </div>
          <h4 class="product-name">{{ p.name }}</h4>
          <div class="product-meta">
            <div class="meta-item">
              <span class="meta-label">参考利率</span>
              <span class="meta-value rate">{{ p.rate }}</span>
            </div>
            <div class="meta-divider" />
            <div class="meta-item">
              <span class="meta-label">贷款期限</span>
              <span class="meta-value">{{ p.term }}</span>
            </div>
            <div class="meta-divider" />
            <div class="meta-item">
              <span class="meta-label">担保方式</span>
              <span class="meta-value">{{ p.type }}</span>
            </div>
          </div>
          <el-button
            :type="i < 3 ? 'primary' : 'default'"
            round
            size="small"
            @click="userStore.isLoggedIn ? router.push('/dashboard/products/apply?name=' + p.name) : router.push('/login')"
          >
            {{ userStore.isLoggedIn ? '立即申请' : '登录申请' }}
          </el-button>
        </div>
      </div>

      <div class="products-cta">
        <span>更多金融产品，请登录平台查看</span>
        <el-button round @click="userStore.isLoggedIn ? router.push('/dashboard/products') : router.push('/login')">
          {{ userStore.isLoggedIn ? '查看全部产品 →' : '登录查看 →' }}
        </el-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section { padding: 90px 0; background: #f8f9fe; }

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

/* 搜索栏 */
.product-search-bar {
  max-width: 640px; margin: 0 auto 32px;
  background: #fff; border: 1px solid #ebeef5; border-radius: 16px;
  padding: 16px 20px; box-shadow: 0 2px 16px rgba(0,0,0,.04);
}
.product-search-inner { display: flex; align-items: center; gap: 8px; }
.product-search-icon { font-size: 16px; }
.product-search-inner input {
  flex: 1; background: transparent; border: none; outline: none;
  color: #303133; font-size: 14px; padding: 6px 0;
}
.product-search-inner input::placeholder { color: #c0c4cc; }
.product-hot-tags { display: flex; align-items: center; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.product-hot-tags .hot-label { font-size: 12px; color: #909399; }
.product-hot-tags .hot-tag {
  font-size: 12px; color: #606266; cursor: pointer; padding: 2px 10px;
  border-radius: 10px; border: 1px solid #ebeef5; transition: all .2s;
}
.product-hot-tags .hot-tag:hover { color: #667eea; border-color: #667eea; }

.products-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
.product-card {
  background: #fff; border-radius: 16px; padding: 28px; box-shadow: 0 2px 20px rgba(0,0,0,.04);
  transition: all .3s; animation: fadeUp .5s ease-out both; animation-delay: var(--delay);
}
.product-card:hover { transform: translateY(-3px); box-shadow: 0 8px 40px rgba(102,126,234,.08); }
@keyframes fadeUp { from{ opacity:0; transform:translateY(20px) } to{ opacity:1; transform:translateY(0) } }
.product-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.product-bank { font-size: 12px; color: #909399; }
.product-tag { padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
.product-tag.热门 { background: rgba(245,108,108,.1); color: #F56C6C; }
.product-tag.推荐 { background: rgba(64,158,255,.1); color: #409EFF; }
.product-tag.热销 { background: rgba(103,194,58,.1); color: #67C23A; }
.product-tag.新品 { background: rgba(230,162,60,.1); color: #E6A23C; }
.product-name { font-size: 18px; font-weight: 700; color: #1a1a2e; margin: 0 0 16px; }
.product-meta { display: flex; align-items: center; gap: 0; margin-bottom: 20px; padding: 12px 0; border-top: 1px solid #f0f2f5; border-bottom: 1px solid #f0f2f5; }
.meta-item { flex: 1; text-align: center; }
.meta-label { display: block; font-size: 11px; color: #909399; margin-bottom: 4px; }
.meta-value { font-size: 15px; font-weight: 700; color: #303133; }
.meta-value.rate { color: #F56C6C; }
.meta-divider { width: 1px; height: 28px; background: #ebeef5; }

.products-cta {
  text-align: center; margin-top: 32px; padding: 24px;
  background: #fff; border-radius: 16px; box-shadow: 0 2px 20px rgba(0,0,0,.04);
  display: flex; align-items: center; justify-content: center; gap: 16px;
}
.products-cta span { color: #909399; font-size: 14px; }

.animate-on-scroll { opacity: 0; transform: translateY(36px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.animate-on-scroll.animate-in { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll { opacity: 1; transform: none; transition: none; }
  .product-card { animation: none; opacity: 1; }
}

@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 768px) {
  .products-grid { grid-template-columns: 1fr; gap: 16px; }
  .product-card { padding: 20px; }
  .products-cta { flex-direction: column; gap: 10px; }
  .product-search-bar { padding: 12px 14px; }
}
</style>