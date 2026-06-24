<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../store/user'

defineProps<{
  scrolled: boolean
  activeSection: string
}>()

const emit = defineEmits<{
  scrollTo: [id: string]
}>()

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <header :class="['landing-navbar', { scrolled }]">
    <div class="nav-inner">
      <div class="logo" @click="emit('scrollTo', 'hero')" role="button" tabindex="0" aria-label="回到首页">
        <span class="logo-icon">✦</span>
        <span class="logo-text">智慧金服平台</span>
      </div>

      <nav class="nav-links" aria-label="主导航">
        <a v-for="s in [
          {id:'hero',label:'首页'},{id:'data-stats',label:'平台数据'},
          {id:'features',label:'核心服务'},{id:'products',label:'金融产品'},
          {id:'data-viz',label:'数据看板'},{id:'partners',label:'合作机构'},
        ]" :key="s.id"
           :class="{active: activeSection === s.id}"
           :href="'#' + s.id"
           @click.prevent="emit('scrollTo', s.id)">
          {{ s.label }}
        </a>
      </nav>

      <div class="nav-actions">
        <template v-if="userStore.isLoggedIn">
          <el-badge :value="3" :hidden="false" class="nav-badge">
            <el-button :icon="''" circle size="small" class="notif-btn">
              <span role="img" aria-label="通知">🔔</span>
            </el-button>
          </el-badge>
          <el-avatar :size="32" :src="''" class="nav-avatar">
            {{ userStore.realName?.charAt(0) || 'U' }}
          </el-avatar>
          <el-button type="primary" size="default" round @click="router.push('/dashboard')">进入操控台</el-button>
        </template>
        <template v-else>
          <el-button size="default" round @click="router.push('/login')">登录</el-button>
          <el-button type="primary" size="default" round @click="router.push('/login')">注册</el-button>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.landing-navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 14px 0; transition: all .4s cubic-bezier(.22,1,.36,1);
}
.landing-navbar.scrolled { background: rgba(255,255,255,.88); backdrop-filter: blur(20px); padding: 6px 0; box-shadow: 0 1px 40px rgba(0,0,0,.06); }
.nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; }
.logo-icon { font-size: 24px; background: linear-gradient(135deg,#667eea,#764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.logo-text { font-size: 18px; font-weight: 700; background: linear-gradient(135deg,#667eea,#764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.scrolled .logo-text, .scrolled .logo-icon { -webkit-text-fill-color: #1a1a2e; background: none; color: #1a1a2e; }
.nav-links { display: flex; gap: 28px; }
.nav-links a { color: rgba(255,255,255,.8); cursor: pointer; font-size: 14px; font-weight: 500; transition: color .2s; text-decoration: none; }
.scrolled .nav-links a { color: #606266; }
.nav-links a:hover, .nav-links a.active { color: #fff; }
.scrolled .nav-links a:hover, .scrolled .nav-links a.active { color: #667eea; }
.nav-actions { display: flex; gap: 8px; align-items: center; }
.nav-badge { margin-right: 4px; }
.notif-btn { border: none; background: transparent; font-size: 18px; }
.nav-avatar { cursor: pointer; border: 2px solid transparent; transition: border-color .2s; background: linear-gradient(135deg,#667eea,#764ba2); color: #fff; font-weight: 600; }
.nav-avatar:hover { border-color: #667eea; }
</style>
