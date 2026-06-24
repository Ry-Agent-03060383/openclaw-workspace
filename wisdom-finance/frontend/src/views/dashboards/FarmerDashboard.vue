<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { getDashboardStats } from '../../api/dashboard'
import { getMyLoans } from '../../api/loan'
import { Coin, ChatDotSquare } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const stats = ref<any[]>([])
const recentLoans = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [dashRes, loanRes]: any = await Promise.all([getDashboardStats(), getMyLoans()])
    if (dashRes.code === 200) stats.value = dashRes.data.stats || []
    if (loanRes.code === 200) recentLoans.value = loanRes.data || []
  } catch { /* ignore */ }
  loading.value = false
})
</script>

<template>
  <div>
    <el-card style="margin-bottom:16px;background:linear-gradient(135deg,#43e97b,#38f9d7);color:#fff;border:none">
      <h2 style="margin:0">农户服务控制台</h2>
      <p style="margin:8px 0 0;opacity:.85">{{ userStore.realName || userStore.username }} · 农户</p>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" style="cursor:pointer" @click="router.push('/dashboard/loan')">
          <div style="display:flex;align-items:center;gap:16px">
            <el-avatar shape="square" size="large" :icon="Coin" style="background:#409EFF" />
            <div><div style="font-size:24px;font-weight:bold">{{ stats[0]?.value || '-' }}</div><div style="color:#999;font-size:14px">{{ stats[0]?.label || '我的贷款' }}</div></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover" style="cursor:pointer" @click="router.push('/dashboard/ai-chat')">
          <div style="display:flex;align-items:center;gap:16px">
            <el-avatar shape="square" size="large" :icon="ChatDotSquare" style="background:#E6A23C" />
            <div><div style="font-size:24px;font-weight:bold">AI</div><div style="color:#999;font-size:14px">政策咨询</div></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card style="margin-top:20px"><template #header>我的贷款</template>
      <el-table :data="recentLoans" v-loading="loading" stripe size="small">
        <el-table-column label="金额"><template #default="{row}">{{ row.amount }}</template></el-table-column>
        <el-table-column label="状态"><template #default="{row}"><el-tag :type="row.status==='APPROVED'?'success':row.status==='REJECTED'?'danger':'warning'" size="small">{{ row.statusLabel }}</el-tag></template></el-table-column>
      </el-table>
      <p v-if="!recentLoans.length && !loading" style="color:#999;text-align:center;padding:20px 0">暂无贷款</p>
    </el-card>
    <el-card style="margin-top:16px"><template #header>惠农政策</template><p style="color:#999">暂无最新政策</p></el-card>
  </div>
</template>
