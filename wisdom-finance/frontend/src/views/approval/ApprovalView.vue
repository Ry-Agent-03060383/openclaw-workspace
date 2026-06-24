<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../store/user'
import { getApprovalHistory, reviewApplication, triggerRules } from '../../api/approval'
import { ElMessage, ElMessageBox } from 'element-plus'
import { View, MagicStick } from '@element-plus/icons-vue'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.userType === 'ADMIN')
const isRisk = computed(() => userStore.userType === 'RISK_MANAGER')
const canManage = computed(() => isAdmin.value || isRisk.value)

const approvals = ref<any[]>([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(10)

const showDetailDialog = ref(false)
const detailData = ref<any>(null)

const searchKeyword = ref('')

const resultMap: Record<string, string> = {
  PASS: '通过',
  REJECT: '拒绝',
  REVIEWING: '审核中',
}
const resultType: Record<string, string> = {
  PASS: 'success',
  REJECT: 'danger',
  REVIEWING: 'warning',
}

onMounted(async () => { await loadData() })

async function loadData() {
  loading.value = true
  try {
    // 获取所有审批记录 - 如果后端没有统一列表，尝试从第一个可用的查询
    const res: any = await getApprovalHistory(0)
    if (res?.code === 200) {
      approvals.value = Array.isArray(res.data) ? res.data : (res.data?.records || [])
      total.value = approvals.value.length
    }
  } catch {
    approvals.value = []
    total.value = 0
  }
  loading.value = false
}

const filteredList = computed(() => {
  if (!searchKeyword.value) return approvals.value
  const kw = searchKeyword.value.toLowerCase()
  return approvals.value.filter((a: any) =>
    (a.applicationNo && a.applicationNo.toLowerCase().includes(kw)) ||
    (a.approverName && a.approverName.toLowerCase().includes(kw))
  )
})

const pagedList = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredList.value.slice(start, start + pageSize.value)
})

async function showDetail(row: any) {
  detailData.value = row
  showDetailDialog.value = true
}

async function handleReview(row: any, approved: boolean) {
  try {
    const comment = approved
      ? ''
      : (await ElMessageBox.prompt('请输入拒绝原因', '拒绝申请').catch(() => ({ value: null })))?.value || ''
    if (!approved && !comment) return
    const res: any = await reviewApplication(row.applicationId || row.id, { approved, comment })
    if (res?.code === 200) {
      ElMessage.success(approved ? '已通过' : '已拒绝')
      await loadData()
    } else {
      ElMessage.error(res?.message || '操作失败')
    }
  } catch { /* cancel */ }
}

async function handleTriggerRules(row: any) {
  try {
    const res: any = await triggerRules(row.applicationId || row.id)
    if (res?.code === 200) {
      ElMessage.success('规则引擎已触发')
      await loadData()
    } else {
      ElMessage.error(res?.message || '操作失败')
    }
  } catch { ElMessage.error('操作失败') }
}
</script>

<template>
  <el-card>
    <template #header>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>审批管理</span>
        <div>
          <el-input
            v-model="searchKeyword"
            placeholder="搜索申请ID/审批人..."
            clearable
            size="small"
            style="width:220px;margin-right:8px"
            @input="page=1"
          />
          <el-button size="small" @click="loadData">刷新</el-button>
        </div>
      </div>
    </template>

    <el-table :data="pagedList" v-loading="loading" stripe size="small">
      <el-table-column prop="applicationNo" label="申请ID" width="160" />
      <el-table-column prop="loanId" label="关联贷款" width="100" />
      <el-table-column prop="approverName" label="审批人" min-width="120" />
      <el-table-column label="审批结果" width="110">
        <template #default="{row}">
          <el-tag :type="resultType[row.result] || 'info'" size="small">{{ resultMap[row.result] || row.result || '-' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审批时间" width="110">
        <template #default="{row}">{{ row.reviewedAt ? row.reviewedAt.slice(0, 10) : '-' }}</template>
      </el-table-column>
      <el-table-column prop="comment" label="备注" show-overflow-tooltip min-width="160" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{row}">
          <el-button size="small" :icon="View" @click="showDetail(row)">详情</el-button>
          <el-button v-if="canManage && (!row.result || row.result==='REVIEWING')" size="small" type="success" @click="handleReview(row, true)">通过</el-button>
          <el-button v-if="canManage && (!row.result || row.result==='REVIEWING')" size="small" type="danger" @click="handleReview(row, false)">拒绝</el-button>
          <el-button v-if="canManage" size="small" type="warning" :icon="MagicStick" @click="handleTriggerRules(row)">审批规则</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content:center;margin-top:16px">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="pageSize"
        :total="filteredList.length"
        layout="prev, pager, next, total"
        small
      />
    </div>
    <p v-if="!filteredList.length && !loading" style="color:#999;text-align:center;padding:20px 0">暂无数据</p>
  </el-card>

  <!-- 详情弹窗 -->
  <el-dialog v-model="showDetailDialog" title="审批详情" width="550px">
    <el-descriptions v-if="detailData" :column="2" border>
      <el-descriptions-item label="申请ID">{{ detailData.applicationNo || detailData.id }}</el-descriptions-item>
      <el-descriptions-item label="关联贷款">{{ detailData.loanId }}</el-descriptions-item>
      <el-descriptions-item label="审批人">{{ detailData.approverName || '-' }}</el-descriptions-item>
      <el-descriptions-item label="审批结果">
        <el-tag :type="resultType[detailData.result] || 'info'" size="small">{{ resultMap[detailData.result] || detailData.result || '-' }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="审批时间">{{ detailData.reviewedAt || '-' }}</el-descriptions-item>
      <el-descriptions-item label="申请时间">{{ detailData.createdAt || '-' }}</el-descriptions-item>
      <el-descriptions-item label="备注" :span="2">{{ detailData.comment || '-' }}</el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>