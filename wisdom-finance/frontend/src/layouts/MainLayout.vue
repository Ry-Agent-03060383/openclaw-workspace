<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import {
  House, User, Coin, Document, WarningFilled,
  Monitor, ChatDotSquare, Bell,
  TakeawayBox, EditPen, Tickets, Connection,
  Collection
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const roleMenus: Record<string, { path: string; label: string; icon: any }[]> = {
  ADMIN: [
    { path: '/dashboard', label: '操控台', icon: House },
    { path: '/dashboard/user', label: '用户管理', icon: User },
    { path: '/dashboard/cms', label: '内容管理', icon: Collection },
    { path: '/dashboard/notification', label: '通知中心', icon: Bell },
    { path: '/dashboard/loan', label: '贷款管理', icon: Coin },
    { path: '/dashboard/credit', label: '征信评级', icon: Document },
    { path: '/dashboard/guarantee', label: '担保管理', icon: TakeawayBox },
    { path: '/dashboard/approval', label: '审批管理', icon: EditPen },
    { path: '/dashboard/risk', label: '风险处置', icon: WarningFilled },
    { path: '/dashboard/monitoring', label: '贷后监控', icon: Monitor },
    { path: '/dashboard/subscription', label: '订阅服务', icon: Tickets },
    { path: '/dashboard/thirdparty', label: '第三方服务', icon: Connection },
    { path: '/dashboard/ai-chat', label: 'AI客服', icon: ChatDotSquare },
  ],
  SME: [
    { path: '/dashboard', label: '操控台', icon: House },
    { path: '/dashboard/notification', label: '通知中心', icon: Bell },
    { path: '/dashboard/loan', label: '贷款申请', icon: Coin },
    { path: '/dashboard/credit', label: '征信评级', icon: Document },
    { path: '/dashboard/ai-chat', label: 'AI客服', icon: ChatDotSquare },
  ],
  FINANCIAL_INSTITUTION: [
    { path: '/dashboard', label: '操控台', icon: House },
    { path: '/dashboard/notification', label: '通知中心', icon: Bell },
    { path: '/dashboard/loan', label: '贷款审核', icon: Coin },
    { path: '/dashboard/credit', label: '企业征信', icon: Document },
    { path: '/dashboard/guarantee', label: '担保管理', icon: TakeawayBox },
    { path: '/dashboard/monitoring', label: '贷后监控', icon: Monitor },
  ],
  FARMER: [
    { path: '/dashboard', label: '操控台', icon: House },
    { path: '/dashboard/notification', label: '通知中心', icon: Bell },
    { path: '/dashboard/loan', label: '贷款申请', icon: Coin },
    { path: '/dashboard/credit', label: '征信评级', icon: Document },
    { path: '/dashboard/ai-chat', label: '政策咨询', icon: ChatDotSquare },
  ],
  GOVERNMENT: [
    { path: '/dashboard', label: '操控台', icon: House },
    { path: '/dashboard/notification', label: '通知中心', icon: Bell },
    { path: '/dashboard/loan', label: '贷款数据', icon: Coin },
    { path: '/dashboard/credit', label: '区域征信', icon: Document },
    { path: '/dashboard/monitoring', label: '区域监控', icon: Monitor },
  ],
  RISK_MANAGER: [
    { path: '/dashboard', label: '操控台', icon: House },
    { path: '/dashboard/notification', label: '通知中心', icon: Bell },
    { path: '/dashboard/loan', label: '贷款审核', icon: Coin },
    { path: '/dashboard/credit', label: '企业征信', icon: Document },
    { path: '/dashboard/approval', label: '审批管理', icon: EditPen },
    { path: '/dashboard/risk', label: '风险处置', icon: WarningFilled },
  ],
  GUARANTEE_INSTITUTION: [
    { path: '/dashboard', label: '操控台', icon: House },
    { path: '/dashboard/notification', label: '通知中心', icon: Bell },
    { path: '/dashboard/loan', label: '贷款查询', icon: Coin },
    { path: '/dashboard/credit', label: '征信查询', icon: Document },
    { path: '/dashboard/guarantee', label: '担保管理', icon: TakeawayBox },
    { path: '/dashboard/monitoring', label: '贷后监控', icon: Monitor },
    { path: '/dashboard/ai-chat', label: 'AI客服', icon: ChatDotSquare },
  ],
  THIRD_PARTY: [
    { path: '/dashboard', label: '操控台', icon: House },
    { path: '/dashboard/notification', label: '通知中心', icon: Bell },
    { path: '/dashboard/loan', label: '服务订单', icon: Coin },
    { path: '/dashboard/credit', label: '征信查询', icon: Document },
    { path: '/dashboard/ai-chat', label: '客服', icon: ChatDotSquare },
  ],
}

const menuItems = computed(() => roleMenus[userStore.userType] || roleMenus.ADMIN)

function handleLogout() {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <el-container style="min-height:100vh" >
    <el-aside width="220px" style="background: #304156">
      <div style="height: 60px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,.1)">
        智慧金服平台
      </div>
      <el-menu
        :default-active="router.currentRoute.value.path"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
        style="border-right: none"
      >
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="display: flex; align-items: center; justify-content: flex-end; border-bottom: 1px solid #e6e6e6; background: #fff">
        <el-dropdown @command="handleLogout">
          <span style="cursor: pointer">
            <el-tag size="small" type="warning" style="margin-right:8px">{{ userStore.roleName }}</el-tag>{{ userStore.username }} <el-icon><User /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main style="background: #f0f2f5">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
