<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { getDashboardStats } from '../../api/dashboard'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const stats = ref([
  { label: '监控贷款', value: '-', color: '#409EFF' },
  { label: '风险预警', value: '-', color: '#F56C6C' },
  { label: '异常企业', value: '-', color: '#E6A23C' },
  { label: '已处理预警', value: '-', color: '#67C23A' }
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
    <el-card style="margin-bottom:16px;background:linear-gradient(135deg,#f093fb,#f5576c);color:#fff;border:none">
      <h2 style="margin:0">风控管理控制台</h2>
      <p style="margin:8px 0 0;opacity:.85">{{ userStore.realName || userStore.username }} · 风控人员</p>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(s, i) in stats" :key="i">
        <el-card shadow="hover" style="margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:12px">
            <el-avatar shape="square" size="medium" :style="'background:'+s.color">{{ s.label[0] }}</el-avatar>
            <div><div style="font-size:22px;font-weight:bold">{{ s.value }}</div><div style="color:#999;font-size:13px">{{ s.label }}</div></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card><template #header>风险监控列表</template>
          <el-button style="width:100%" @click="router.push('/dashboard/risk')">查看完整风控报告</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card><template #header>贷后监控</template>
          <el-button style="width:100%" @click="router.push('/dashboard/monitoring')">查看贷后预警</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
