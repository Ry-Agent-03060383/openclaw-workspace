<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/user'
import { getDashboardStats } from '../../api/dashboard'
import { getPendingLoans } from '../../api/loan'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const stats = ref([
  { label: '待审批申请', value: 0, color: '#E6A23C', icon: 'el-icon-document' },
  { label: '已放款金额', value: '0 元', color: '#67C23A', icon: 'el-icon-money' },
  { label: '在贷产品', value: 0, color: '#409EFF', icon: 'el-icon-goods' },
  { label: '本月新申请', value: 0, color: '#F56C6C', icon: 'el-icon-trend' }
])
const pendingLoans = ref<any[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const [dashRes, loanRes]: any = await Promise.all([
      getDashboardStats().catch(() => ({ code: 500 })),
      getPendingLoans().catch(() => ({ code: 500, data: [] }))
    ])
    if (dashRes.code === 200 && dashRes.data?.stats) {
      stats.value = dashRes.data.stats
    }
    if (loanRes.code === 200) pendingLoans.value = loanRes.data || []
  } catch { /* ignore */ }
  loading.value = false
})
</script>
<template>
  <div>
    <el-card style="margin-bottom:16px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none">
      <h2 style="margin:0">银行服务控制台</h2>
      <p style="margin:8px 0 0;opacity:.85">{{ userStore.realName || userStore.username }} · 金融机构</p>
    </el-card>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(s, i) in stats" :key="i">
        <el-card shadow="hover" style="margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:12px">
            <el-avatar shape="square" size="medium" style="background:s.value?.color || '#409EFF'">{{ s.label[0] }}</el-avatar>
            <div><div style="font-size:22px;font-weight:bold">{{ s.value }}</div><div style="color:#999;font-size:13px">{{ s.label }}</div></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card><template #header>待审批申请</template>
          <el-table :data="pendingLoans" v-loading="loading" stripe size="small" empty-text="暂无待审批申请">
            <el-table-column label="申请编号" prop="applicationNo" width="160" />
            <el-table-column label="企业" prop="companyName" />
            <el-table-column label="金额" width="120">
              <template #default="{row}">{{ row.loanAmount?.toLocaleString() || '-' }}</template>
            </el-table-column>
            <el-table-column label="操作" width="180">
              <template #default>
                <el-button size="small" type="primary" @click="router.push('/dashboard/loan')">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card><template #header>快捷操作</template>
          <el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/loan')">产品匹配</el-button>
          <el-button style="width:100%;margin-bottom:8px" @click="router.push('/dashboard/credit')">征信查询</el-button>
          <el-button style="width:100%" @click="router.push('/dashboard/ai-chat')">智能客服</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
