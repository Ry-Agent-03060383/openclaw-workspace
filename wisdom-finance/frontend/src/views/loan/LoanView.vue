<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../store/user'
import { getMyLoans, getAllLoans, getPendingLoans, applyLoan, approveLoan, rejectLoan } from '../../api/loan'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, CircleCheck } from '@element-plus/icons-vue'

const userStore = useUserStore()
const isSME = computed(() => userStore.userType === 'SME' || userStore.userType === 'FARMER')
const isBank = computed(() => userStore.userType === 'FINANCIAL_INSTITUTION')
const isAdmin = computed(() => userStore.userType === 'ADMIN')
const isRisk = computed(() => userStore.userType === 'RISK_MANAGER')

const loans = ref<any[]>([])
const loading = ref(true)
const showApplyDialog = ref(false)
const products = [
  { id: 1, name: '企业经营贷款', desc: 'AI智能评估，快速审批，无需抵押' },
  { id: 2, name: '科技企业专项贷', desc: '政府贴息，额度高，放款快' },
  { id: 3, name: '个人经营贷款', desc: '无需抵押，线上申请，快速审批' },
  { id: 4, name: '农户专项贷款', desc: '专项扶持，手续简便，利率优惠' },
  { id: 5, name: '农业产业链贷款', desc: '支持农业发展，绿色通道' },
]
const applyForm = ref({
  productId: 1,
  companyName: '',
  creditCode: '',
  loanAmount: 0,
  loanTermMonths: 12,
  loanPurpose: '',
  companyId: 1,
  repaymentMethod: '等额本息',
})

const statusMap: Record<string, string> = {
  DRAFT: '草稿', SUBMITTED: '已提交', PENDING: '待审核',
  APPROVING: '审批中', APPROVED: '已通过', REJECTED: '已驳回', NEEDS_MANUAL: '需人工',
}
const statusType: Record<string, string> = {
  DRAFT: 'info', SUBMITTED: 'primary', PENDING: 'warning',
  APPROVING: 'warning', APPROVED: 'success', REJECTED: 'danger', NEEDS_MANUAL: 'danger',
}

onMounted(async () => { await loadData() })

async function loadData() {
  loading.value = true
  try {
    let res: any
    if (isBank.value) res = await getPendingLoans()
    else if (isAdmin.value || isRisk.value) res = await getAllLoans()
    else res = await getMyLoans()
    if (res?.code === 200) loans.value = res.data || []
  } catch { /* ignore */ }
  loading.value = false
}

async function handleApply() {
  try {
    const res: any = await applyLoan(applyForm.value)
    if (res?.code === 200) {
      ElMessage.success('申请已提交')
      showApplyDialog.value = false
      applyForm.value = { productId: 1, companyName: '', creditCode: '', loanAmount: 0, loanTermMonths: 12, loanPurpose: '', companyId: 1, repaymentMethod: '等额本息' }
      await loadData()
    } else {
      ElMessage.error(res?.message || '提交失败')
    }
  } catch { ElMessage.error('提交失败') }
}

async function handleApprove(id: number) {
  try {
    const res: any = await approveLoan(id)
    if (res?.code === 200) {
      ElMessage.success('已批准')
      await loadData()
    }
  } catch { ElMessage.error('操作失败') }
}

async function handleReject(id: number) {
  try {
    const { value } = await ElMessageBox.prompt('请输入驳回原因', '驳回申请')
    if (value) {
      const res: any = await rejectLoan(id, value)
      if (res?.code === 200) {
        ElMessage.success('已驳回')
        await loadData()
      }
    }
  } catch { /* cancel */ }
}
</script>

<template>
  <el-card>
    <template #header>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span>{{ isBank ? '贷款审核' : isAdmin ? '贷款管理' : '我的贷款' }}</span>
        <div>
          <el-button size="small" @click="loadData">刷新</el-button>
          <el-button v-if="isSME" type="primary" size="small" :icon="Plus" @click="showApplyDialog = true">申请贷款</el-button>
        </div>
      </div>
    </template>

    <el-table :data="loans" v-loading="loading" stripe size="small">
      <el-table-column prop="applicationNo" label="申请编号" width="160" />
      <el-table-column prop="companyName" label="企业/姓名" min-width="140" />
      <el-table-column label="金额" width="120"><template #default="{row}">¥{{ row.loanAmount }}</template></el-table-column>
      <el-table-column prop="loanTermMonths" label="期限" width="60"><template #default="{row}">{{ row.loanTermMonths }}月</template></el-table-column>
      <el-table-column prop="loanPurpose" label="用途" show-overflow-tooltip min-width="140" />
      <el-table-column prop="repaymentMethod" label="还款方式" width="100" />
      <el-table-column label="状态" width="100">
        <template #default="{row}">
          <el-tag :type="statusType[row.status] || 'info'" size="small">{{ statusMap[row.status] || row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="isBank" label="操作" width="160" fixed="right">
        <template #default="{row}">
          <el-button v-if="row.status==='PENDING'" type="success" size="small" :icon="CircleCheck" @click="handleApprove(row.id)">通过</el-button>
          <el-button v-if="row.status==='PENDING'" type="danger" size="small" @click="handleReject(row.id)">驳回</el-button>
          <el-tag v-else size="small" disable-transitions>已处理</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <p v-if="!loans.length && !loading" style="color:#999;text-align:center;padding:20px 0">暂无数据</p>
  </el-card>

  <el-dialog v-model="showApplyDialog" title="申请贷款" width="500px">
    <el-form :model="applyForm" label-width="100px">
      <el-form-item label="贷款产品" required>
        <el-select v-model="applyForm.productId" style="width:100%">
          <el-option v-for="p in products" :key="p.id" :label="p.name" :value="p.id">
            <span>{{ p.name }}</span>
            <span style="float:right;color:#999;font-size:12px">{{ p.desc }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业名称" required>
        <el-input v-model="applyForm.companyName" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="信用代码" required>
        <el-input v-model="applyForm.creditCode" placeholder="统一社会信用代码" />
      </el-form-item>
      <el-form-item label="贷款金额" required>
        <el-input-number v-model="applyForm.loanAmount" :min="10000" :step="50000" style="width:100%" />
      </el-form-item>
      <el-form-item label="贷款期限">
        <el-select v-model="applyForm.loanTermMonths" style="width:100%">
          <el-option label="6个月" :value="6" />
          <el-option label="12个月" :value="12" />
          <el-option label="24个月" :value="24" />
          <el-option label="36个月" :value="36" />
        </el-select>
      </el-form-item>
      <el-form-item label="还款方式">
        <el-select v-model="applyForm.repaymentMethod" style="width:100%">
          <el-option label="等额本息" value="等额本息" />
          <el-option label="等额本金" value="等额本金" />
          <el-option label="先息后本" value="先息后本" />
        </el-select>
      </el-form-item>
      <el-form-item label="贷款用途" required>
        <el-input v-model="applyForm.loanPurpose" type="textarea" :rows="2" placeholder="请说明贷款用途" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showApplyDialog = false">取消</el-button>
      <el-button type="primary" @click="handleApply">提交申请</el-button>
    </template>
  </el-dialog>
</template>
