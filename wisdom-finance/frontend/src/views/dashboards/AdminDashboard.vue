<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { getDashboardStats } from '../../api/dashboard'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const stats = ref([
  { label: '用户总数', value: '-', color: '#409EFF' },
  { label: '贷款申请', value: '-', color: '#67C23A' },
  { label: '放款金额', value: '-', color: '#E6A23C' },
  { label: '注册企业', value: '-', color: '#F56C6C' },
  { label: '金融机构', value: '-', color: '#909399' },
  { label: '合作第三方', value: '-', color: '#B37FEB' }
])
const loading = ref(true)

onMounted(async () => {
  try {
    const res: any = await getDashboardStats().catch(() => ({ code: 500 }))
    if (res.code === 200 && res.data?.stats) stats.value = res.data.stats
  } catch { /* ignore */ }
  loading.value = false
})
</script>
<template>
  <div>
    <el-card style="margin-bottom:16px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none">
      <h2 style="margin:0">运营管理控制台</h2>
      <p style="margin:8px 0 0;opacity:.85">{{ userStore.realName || userStore.username }} · 系统管理员</p>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="8" v-for="(s, i) in stats" :key="i">
        <el-card shadow="hover" style="margin-bottom:16px;cursor:pointer" @click="i===0?router.push('/dashboard/user'):router.push('/dashboard/loan')">
          <div style="display:flex;align-items:center;gap:12px">
            <el-avatar shape="square" size="medium" :style="'background:'+s.color">{{ s.label[0] }}</el-avatar>
            <div><div style="font-size:22px;font-weight:bold">{{ s.value }}</div><div style="color:#999;font-size:13px">{{ s.label }}</div></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card><template #header>系统管理</template>
      <el-row :gutter="20">
        <el-col :span="6"><el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/user')">用户管理</el-button></el-col>
        <el-col :span="6"><el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/loan')">贷款管理</el-button></el-col>
        <el-col :span="6"><el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/credit')">征信管理</el-button></el-col>
        <el-col :span="6"><el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/risk')">风控管理</el-button></el-col>
        <el-col :span="6"><el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/monitoring')">贷后监控</el-button></el-col>
        <el-col :span="6"><el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/notification')">通知管理</el-button></el-col>
        <el-col :span="6"><el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/ai-chat')">AI客服</el-button></el-col>
      </el-row>
    </el-card>
  </div>
</template>
