<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAllLoans } from '../../api/loan'
import { getEvaluations } from '../../api/risk'
import { Refresh } from '@element-plus/icons-vue'

const loans = ref<any[]>([])
const evaluations = ref<any[]>([])
const loading = ref(true)

const statusMap: Record<string, string> = {
  DRAFT: '草稿', SUBMITTED: '已提交', PENDING: '待审核',
  APPROVING: '审批中', APPROVED: '已通过', REJECTED: '已驳回', NEEDS_MANUAL: '需人工',
}
const statusType: Record<string, string> = {
  DRAFT: 'info', SUBMITTED: 'primary', PENDING: 'warning',
  APPROVING: 'warning', APPROVED: 'success', REJECTED: 'danger', NEEDS_MANUAL: 'danger',
}
const riskLevelType: Record<string, string> = {
  AAA: 'success', AA: '', A: 'primary', BBB: 'warning', BB: 'warning', B: 'danger', C: 'danger',
}

onMounted(async () => { await loadData() })

async function loadData() {
  loading.value = true
  try {
    const [loRes, evRes] = await Promise.all([getAllLoans(), getEvaluations()])
    if (loRes?.code === 200) loans.value = loRes.data || []
    if (evRes?.code === 200) evaluations.value = evRes.data || []
  } catch { /* ignore */ }
  loading.value = false
}

const totalLoans = computed(() => loans.value.length)
const approvedLoans = computed(() => loans.value.filter((l: any) => l.status === 'APPROVED').length)
const rejectedLoans = computed(() => loans.value.filter((l: any) => l.status === 'REJECTED').length)
const pendingLoans = computed(() => loans.value.filter((l: any) => l.status === 'PENDING').length)
const highRiskEvals = computed(() => evaluations.value.filter((e: any) => e.riskLevel === 'C' || e.riskLevel === 'B' || e.riskLevel === 'BB').length)
const recentEvals = computed(() => [...evaluations.value].sort((a: any, b: any) => (b.evaluateTime || '').localeCompare(a.evaluateTime || '')).slice(0, 5))

const statCards = computed(() => [
  { label: '贷款总笔数', value: totalLoans.value, color: '#409eff' },
  { label: '已通过', value: approvedLoans.value, color: '#67c23a' },
  { label: '待审核', value: pendingLoans.value, color: '#e6a23c' },
  { label: '已拒绝', value: rejectedLoans.value, color: '#f56c6c' },
  { label: '高风险评估', value: highRiskEvals.value, color: '#f56c6c' },
])

function formatTime(t: string) {
  if (!t) return '-'
  return t.substring(0, 19).replace('T', ' ')
}

function getScoreColor(score: number) {
  if (score >= 80) return '#67c23a'
  if (score >= 60) return '#409eff'
  if (score >= 40) return '#e6a23c'
  return '#f56c6c'
}
</script>

<template>
  <div class="monitoring-view">
    <el-card shadow="never" style="margin-bottom:16px">
      <template #header>
        <div class="header-bar">
          <span>贷后监控</span>
          <el-button size="small" :icon="Refresh" @click="loadData">刷新</el-button>
        </div>
      </template>

      <div class="stat-grid">
        <div v-for="s in statCards" :key="s.label" class="stat-card" :style="{borderTopColor: s.color}">
          <div class="stat-value" :style="{color: s.color}">{{ s.value }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </el-card>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>贷款跟踪</template>
          <el-table :data="loans" v-loading="loading" stripe size="small" max-height="420">
            <el-table-column prop="applicationNo" label="编号" width="160" />
            <el-table-column prop="companyName" label="企业" min-width="120" show-overflow-tooltip />
            <el-table-column label="金额" width="110">
              <template #default="{row}">¥{{ row.loanAmount }}</template>
            </el-table-column>
            <el-table-column label="期限" width="60">
              <template #default="{row}">{{ row.loanTermMonths }}月</template>
            </el-table-column>
            <el-table-column label="状态" width="90">
              <template #default="{row}">
                <el-tag :type="statusType[row.status] || 'info'" size="small">{{ statusMap[row.status] || row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="reviewComment" label="备注" min-width="100" show-overflow-tooltip />
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never">
          <template #header>风险预警</template>
          <div v-if="recentEvals.length" class="alert-list" v-loading="loading">
            <div v-for="e in recentEvals" :key="e.id" class="alert-item">
              <div class="alert-header">
                <el-tag :type="riskLevelType[e.riskLevel] || 'info'" size="small" effect="dark">{{ e.riskLevel }}</el-tag>
                <span class="alert-score" :style="{color:getScoreColor(e.riskScore)}">{{ e.riskScore }}分</span>
              </div>
              <div class="alert-company">{{ e.companyName }}</div>
              <div class="alert-time">{{ formatTime(e.evaluateTime) }}</div>
            </div>
          </div>
          <div v-else-if="!loading" class="alert-empty">暂无风险预警</div>
        </el-card>

        <el-card shadow="never" style="margin-top:16px">
          <template #header>监控概览</template>
          <div class="overview-list">
            <div class="overview-item">
              <span class="ov-label">已贷出总额</span>
              <span class="ov-value">¥{{ loans.filter(l => l.status === 'APPROVED').reduce((s: number, l: any) => s + Number(l.loanAmount || 0), 0).toLocaleString() }}</span>
            </div>
            <div class="overview-item">
              <span class="ov-label">评估覆盖率</span>
              <span class="ov-value">{{ loans.length ? Math.round(evaluations.length / loans.length * 100) : 0 }}%</span>
            </div>
            <div class="overview-item">
              <span class="ov-label">通过率</span>
              <span class="ov-value">{{ loans.length ? Math.round(approvedLoans / loans.length * 100) : 0 }}%</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.monitoring-view { max-width: 1200px; margin: 0 auto; }
.header-bar { display: flex; justify-content: space-between; align-items: center; }
.stat-grid { display: flex; gap: 16px; flex-wrap: wrap; }
.stat-card { flex: 1; min-width: 120px; background: #fafafa; border-radius: 6px; padding: 16px; text-align: center; border-top: 3px solid; }
.stat-value { font-size: 28px; font-weight: 700; }
.stat-label { font-size: 13px; color: #999; margin-top: 4px; }
.alert-list { display: flex; flex-direction: column; gap: 8px; }
.alert-item { padding: 10px; border: 1px solid #ebeef5; border-radius: 6px; }
.alert-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.alert-score { font-weight: 700; font-size: 15px; }
.alert-company { font-size: 13px; color: #333; }
.alert-time { font-size: 12px; color: #999; margin-top: 2px; }
.alert-empty { padding: 20px 0; text-align: center; color: #999; }
.overview-list { display: flex; flex-direction: column; gap: 12px; }
.overview-item { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
.ov-label { font-size: 13px; color: #666; }
.ov-value { font-size: 14px; font-weight: 600; color: #333; }
</style>
