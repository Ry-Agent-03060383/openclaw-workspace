<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const platformItems = [
  { label: '金融产品', id: 'financial-products' },
  { label: '信用体检', id: 'credit-check' },
  { label: '绿色金融', id: 'green-finance' },
  { label: '金融调解', id: 'mediation' }
]

const policyItems = [
  { label: '国家政策', id: 'national-policy' },
  { label: '河南省政策', id: 'provincial-policy' },
  { label: '焦作市政策', id: 'city-policy' },
  { label: '风险补偿', id: 'risk-compensation' }
]

const aboutItems = [
  { label: '公司简介', id: 'company-intro' },
  { label: '新闻中心', id: 'news' },
  { label: '服务案例', id: 'cases' },
  { label: '联系我们', id: 'contact-us' }
]

function goFooter(id: string) {
  router.push(`/footer/${id}`)
}
</script>

<template>
  <footer class="landing-footer" aria-label="页脚">
    <div class="section-container">
      <!-- 上：品牌 + 链接列 -->
      <div class="footer-main">
        <div class="footer-brand">
          <div class="footer-logo">✦ 智慧金服平台</div>
          <p class="brand-name">焦作市智慧金融服务有限公司</p>
          <p class="brand-addr">地址：河南省焦作市示范区中原路1365号</p>
          <p class="brand-phone">电话：0391-8379934</p>
          <div class="brand-extra">
            <span class="badge">政府主导</span>
            <span class="badge">数据驱动</span>
            <span class="badge">信用赋能</span>
          </div>
        </div>

        <div class="footer-links">
          <!-- 平台服务 -->
          <div class="footer-col">
            <h4>平台服务</h4>
            <a
              v-for="item in platformItems"
              :key="item.id"
              @click="goFooter(item.id)"
              @keydown.enter="goFooter(item.id)"
              tabindex="0"
              role="link"
              :aria-label="item.label"
            >{{ item.label }}</a>
          </div>
          <!-- 政策指南 -->
          <div class="footer-col">
            <h4>政策指南</h4>
            <a
              v-for="item in policyItems"
              :key="item.id"
              @click="goFooter(item.id)"
              @keydown.enter="goFooter(item.id)"
              tabindex="0"
              role="link"
              :aria-label="item.label"
            >{{ item.label }}</a>
          </div>
          <!-- 关于我们 -->
          <div class="footer-col">
            <h4>关于我们</h4>
            <a
              v-for="item in aboutItems"
              :key="item.id"
              @click="goFooter(item.id)"
              @keydown.enter="goFooter(item.id)"
              tabindex="0"
              role="link"
              :aria-label="item.label"
            >{{ item.label }}</a>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="footer-line" role="separator" aria-hidden="true" />

      <!-- 下：备案信息 + 友情链接 -->
      <div class="footer-bottom">
        <div class="bottom-left">
          <span>© 2026 焦作市智慧金融服务有限公司</span>
          <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" aria-label="豫ICP备案">豫ICP备19020090号-1</a>
          <a href="https://beian.mps.gov.cn" target="_blank" rel="noopener noreferrer" aria-label="豫公网安备案">豫公网安备41081102000285号</a>
        </div>
        <div class="bottom-right">
          <span class="friendly-label">友情链接：</span>
          <a href="https://www.jz.gov.cn" target="_blank" rel="noopener">焦作市人民政府</a>
          <a href="http://jrj.jz.gov.cn" target="_blank" rel="noopener">焦作市金融工作局</a>
          <a href="https://www.jzzwfw.gov.cn" target="_blank" rel="noopener">焦作政务服务网</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.landing-footer { background: #0a0a1a; padding: 60px 0 0; color: rgba(255,255,255,.5); }

.section-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* ═══ 上区：品牌 + 链接 ═══ */
.footer-main { display: grid; grid-template-columns: 1.5fr 2fr; gap: 60px; padding-bottom: 32px; }

/* ── 品牌 ── */
.footer-logo { font-size: 20px; font-weight: 700; margin-bottom: 14px; background: linear-gradient(135deg,#667eea,#764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.brand-name { font-size: 14px; font-weight: 600; color: rgba(255,255,255,.7); margin: 0 0 6px; }
.brand-addr,
.brand-phone { font-size: 13px; line-height: 1.8; margin: 2px 0; }
.brand-extra { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
.badge { display: inline-block; padding: 2px 10px; border-radius: 4px; font-size: 11px; font-weight: 600; color: #667eea; background: rgba(102,126,234,.12); border: 1px solid rgba(102,126,234,.2); }

/* ── 链接列 ── */
.footer-links { display: grid; grid-template-columns: repeat(3,1fr); gap: 40px; }
.footer-col h4 { color: #fff; font-size: 14px; font-weight: 600; margin: 0 0 14px; }
.footer-col a { display: block; font-size: 13px; color: rgba(255,255,255,.45); margin-bottom: 6px; cursor: pointer; transition: color .2s; text-decoration: none; }
.footer-col a:hover { color: #667eea; }

/* ═══ 分割线 ═══ */
.footer-line { height: 1px; background: rgba(255,255,255,.06); }

/* ═══ 下区 ═══ */
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; font-size: 12px; flex-wrap: wrap; gap: 12px; }
.bottom-left { display: flex; gap: 20px; flex-wrap: wrap; align-items: center; }
.bottom-left a,
.bottom-right a { color: rgba(255,255,255,.35); text-decoration: none; transition: color .2s; }
.bottom-left a:hover,
.bottom-right a:hover { color: #667eea; }
.friendly-label { color: rgba(255,255,255,.2); margin-right: 4px; }
.bottom-right { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }

@media (max-width: 768px) {
  .footer-main { grid-template-columns: 1fr; gap: 32px; }
  .footer-links { grid-template-columns: repeat(2,1fr); gap: 20px; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
  .bottom-left { gap: 12px; flex-direction: column; align-items: flex-start; }
}
</style>