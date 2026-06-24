<script setup lang="ts">
const partnerNames = [
  '工商银行','农业银行','中国银行','建设银行','交通银行',
  '邮储银行','中原银行','焦作中旅银行','人保财险','国寿财险',
  '电e金服','信用焦作','河南省农信社','郑州银行',
]
const partners = [...partnerNames, ...partnerNames]
</script>

<template>
  <section id="partners" class="partners-section" aria-label="合作机构">
    <div class="section-container animate-on-scroll">
      <div class="section-header">
        <span class="section-label">合作机构</span>
        <h2 class="section-title">信赖<strong>我们的机构</strong></h2>
        <p class="section-desc">覆盖银行、保险、担保等全类别金融机构</p>
      </div>

      <div class="partners-carousel" role="list" aria-label="合作伙伴列表，自动滚动">
        <div class="partners-track">
          <div
            v-for="(p, i) in partners"
            :key="i"
            class="partner-card"
            role="listitem"
            :aria-label="p"
          >
            <div class="partner-icon" aria-hidden="true">{{ p.slice(0, 1) }}</div>
            <div class="partner-name">{{ p }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-section { padding: 90px 0; background: #f8f9fe; overflow: hidden; }

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

.partners-carousel {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right,transparent 0%,#000 5%,#000 95%,transparent 100%);
  mask-image: linear-gradient(to right,transparent 0%,#000 5%,#000 95%,transparent 100%);
}
.partners-track { display: flex; gap: 16px; animation: scrollPartners 35s linear infinite; width: max-content; }
.partners-track:hover { animation-play-state: paused; }
@keyframes scrollPartners {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.partner-card {
  flex-shrink: 0; padding: 20px 28px; border-radius: 14px; border: 1px solid #ebeef5;
  background: #fff; text-align: center; transition: all .3s; cursor: default; min-width: 130px;
}
.partner-card:hover { border-color: #667eea; box-shadow: 0 4px 20px rgba(102,126,234,.1); transform: translateY(-3px); }
.partner-icon {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg,#667eea,#764ba2); color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 700; margin: 0 auto 8px;
}
.partner-name { font-size: 13px; font-weight: 600; color: #303133; }

.animate-on-scroll { opacity: 0; transform: translateY(36px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.animate-on-scroll.animate-in { opacity: 1; transform: translateY(0); }

@media (prefers-reduced-motion: reduce) {
  .partners-track { animation: none; }
  .animate-on-scroll { opacity: 1; transform: none; transition: none; }
}
</style>