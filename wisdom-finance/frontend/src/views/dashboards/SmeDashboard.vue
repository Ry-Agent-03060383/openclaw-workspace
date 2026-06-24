<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { getMyLoans } from '../../api/loan'
import { getDashboardStats } from '../../api/dashboard'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const stats = ref([
  { label: '进行中贷款', value: '-', color: '#409EFF' },
  { label: '信用评分', value: '-', color: '#67C23A' },
  { label: '历史贷款', value: '-', color: '#E6A23C' },
  { label: '可申请额度', value: '-', color: '#F56C6C' }
])
const recentLoans = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [dashRes, loanRes]: any = await Promise.all([
      getDashboardStats().catch(() => ({ code: 500 })),
      getMyLoans().catch(() => ({ code: 500, data: [] }))
    ])
    if (dashRes.code === 200 && dashRes.data?.stats) stats.value = dashRes.data.stats
    if (loanRes.code === 200) recentLoans.value = loanRes.data || []
  } catch { /* ignore */ }
  loading.value = false
})

const statusTag = (s: string) => ({
  SUBMITTED: 'warning', PENDING: 'info', APPROVING: 'warning',
  APPROVED: 'success', REJECTED: 'danger', NEEDS_MANUAL: 'warning'
}[s] || 'info')

const statusLabel = (s: string) => ({
  SUBMITTED: '已提交', PENDING: '待审核', APPROVING: '审批中',
  APPROVED: '已通过', REJECTED: '已拒绝', NEEDS_MANUAL: '待人工'
}[s] || s)
</script>
<template>
  <div>
    <el-card style="margin-bottom:16px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none">
      <h2 style="margin:0">企业服务控制台</h2>
      <p style="margin:8px 0 0;opacity:.85">{{ userStore.realName || userStore.username }} · 中小微企业</p>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(s, i) in stats" :key="i">
        <el-card shadow="hover" style="margin-bottom:16px;cursor:pointer" @click="router.push(i===1?'/dashboard/credit':'/dashboard/loan')">
          <div style="display:flex;align-items:center;gap:12px">
            <el-avatar shape="square" size="medium" :style="'background:'+s.color">{{ s.label[0] }}</el-avatar>
            <div><div style="font-size:22px;font-weight:bold">{{ s.value }}</div><div style="color:#999;font-size:13px">{{ s.label }}</div></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card><template #header>我的贷款</template>
          <el-table :data="recentLoans" v-loading="loading" stripe size="small" empty-text="暂无贷款记录，立即申请">
            <el-table-column label="编号" prop="applicationNo" width="160" />
            <el-table-column label="金额" width="120"><template #default="{row}">{{ row.loanAmount?.toLocaleString() || '-' }}</template></el-table-column>
            <el-table-column label="状态" width="110">
              <template #default="{row}"><el-tag :type="statusTag(row.status)" size="small">{{ statusLabel(row.status) }}</el-tag></template>
            </el-table-column>
            <el-table-column label="时间" width="170"><template #default="{row}">{{ row.createdAt?.substring(0,10) || '-' }}</template></el-table-column>
          </el-table>
          <div style="text-align:center;margin-top:12px">
            <el-button type="primary" @click="router.push('/dashboard/loan')">申请新贷款</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card><template #header>快速服务</template>
          <el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/loan')">融资申请</el-button>
          <el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/credit')">信用报告</el-button>
          <el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/monitoring')">贷后监控</el-button>
          <el-button style="width:100%" @click="router.push('/dashboard/ai-chat')">政策咨询</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
