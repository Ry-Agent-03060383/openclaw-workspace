<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '../../store/user'
import {
  getApplicationList, getApplicationById, createApplication, submitApplication, reviewApplication,
  getGuaranteeList, getGuaranteeById, signGuarantee, registerCounterGuarantee,
  payGuaranteeFee, releaseGuarantee, calculateFee,
} from '../../api/guarantee'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, View, Edit, CircleCheck, Remove, Upload, Coin } from '@element-plus/icons-vue'

const userStore = useUserStore()
const isAdmin = computed(() => userStore.userType === 'ADMIN')
const isBank = computed(() => userStore.userType === 'FINANCIAL_INSTITUTION')
const isGuarantee = computed(() => userStore.userType === 'GUARANTEE_INSTITUTION')

const activeTab = ref('application')

// ═══ 担保申请 ═══
const apps = ref<any[]>([])
const appsLoading = ref(false)
const appsTotal = ref(0)
const appsPage = ref(0)
const appsSize = ref(10)
const appQuery = ref({ appNo: '', applicantName: '', status: '' })

const showAppCreateDialog = ref(false)
const showAppDetailDialog = ref(false)
const appDetail = ref<any>(null)
const appForm = ref({
  loanApplicationId: 0, applicantName: '', guaranteeType: '保证担保',
  requestAmount: 0, purpose: ''
})

// ═══ 担保列表 ═══
const guarantees = ref<any[]>([])
const gLoading = ref(false)
const gTotal = ref(0)
const gPage = ref(0)
const gSize = ref(10)
const gQuery = ref({ guaranteeNo: '', guarantorName: '', status: '' })

const showGDetailDialog = ref(false)
const gDetail = ref<any>(null)
const showSignDialog = ref(false)
const signContractNo = ref('')
const signTargetId = ref(0)
const showCounterDialog = ref(false)
const counterForm = ref({ counterGuaranteeType: '抵押', counterGuaranteeDesc: '', counterGuaranteeValue: 0 })
const counterTargetId = ref(0)
const showFeeDialog = ref(false)
const feeAmount = ref(0)
const feeTargetId = ref(0)
const feeCalcResult = ref(0)
const showReleaseDialog = ref(false)
const releaseReason = ref('')
const releaseTargetId = ref(0)

// ═══ 状态映射 ═══
const appStatusMap: Record<string, string> = {
  DRAFT: '草稿', SUBMITTED: '待审核', APPROVED: '已通过', REJECTED: '已拒绝'
}
const appStatusType: Record<string, string> = {
  DRAFT: 'info', SUBMITTED: 'warning', APPROVED: 'success', REJECTED: 'danger'
}
const gStatusMap: Record<string, string> = {
  PENDING_SIGN: '待签约', ACTIVE: '已生效', EXPIRED: '已到期', RELEASED: '已解除', TERMINATED: '已终止'
}
const gStatusType: Record<string, string> = {
  PENDING_SIGN: 'warning', ACTIVE: 'success', EXPIRED: 'info', RELEASED: 'default', TERMINATED: 'danger'
}
const cgStatusMap: Record<string, string> = { PENDING: '待登记', REGISTERED: '已登记', RELEASED: '已解除' }
const cgStatusType: Record<string, string> = { PENDING: 'info', REGISTERED: 'success', RELEASED: 'default' }
const feeStatusMap: Record<string, string> = { UNPAID: '未支付', PAID: '已支付', REFUNDED: '已退款' }
const feeStatusType: Record<string, string> = { UNPAID: 'danger', PAID: 'success', REFUNDED: 'info' }
const gtypeOptions = ['保证担保', '抵押担保', '质押担保', '信用担保', '联合担保']
const cgtypeOptions = ['抵押', '质押', '保证']

onMounted(async () => { await loadApps() })

// ═══ 担保申请 ═══
async function loadApps() {
  appsLoading.value = true
  try {
    const params: any = { page: appsPage.value, size: appsSize.value }
    if (appQuery.value.status) params.status = appQuery.value.status
    if (isGuarantee.value) params.applicantId = String(userStore.userId || '')
    const res: any = await getApplicationList(params)
    if (res?.code === 200) {
      const d = res.data
      apps.value = d.content || []
      appsTotal.value = d.totalElements || 0
    } else { apps.value = []; appsTotal.value = 0 }
  } catch { apps.value = []; appsTotal.value = 0 }
  finally { appsLoading.value = false }
}

async function handleCreateApp() {
  try {
    const res: any = await createApplication(appForm.value)
    if (res?.code === 200) {
      ElMessage.success('创建成功')
      showAppCreateDialog.value = false
      appForm.value = { loanApplicationId: 0, applicantName: '', guaranteeType: '保证担保', requestAmount: 0, purpose: '' }
      await loadApps()
    } else { ElMessage.error(res?.message || '创建失败') }
  } catch { ElMessage.error('创建失败') }
}

async function handleSubmitApp(id: number) {
  try {
    const res: any = await submitApplication(id)
    if (res?.code === 200) { ElMessage.success('已提交'); await loadApps() }
    else { ElMessage.error(res?.message || '提交失败') }
  } catch { ElMessage.error('提交失败') }
}

async function handleReviewApp(row: any, approved: boolean) {
  try {
    const { value } = await ElMessageBox.prompt(
      approved ? '请输入审核意见' : '请输入拒绝原因', approved ? '审核通过' : '拒绝'
    )
    if (value !== null) {
      const res: any = await reviewApplication(row.id, approved, value)
      if (res?.code === 200) {
        ElMessage.success(approved ? '审核通过' : '已拒绝')
        await loadApps()
      } else { ElMessage.error(res?.message || '操作失败') }
    }
  } catch { /* cancel */ }
}

async function showAppDetail(row: any) {
  try {
    const res: any = await getApplicationById(row.id)
    appDetail.value = res?.code === 200 ? res.data : row
  } catch { appDetail.value = row }
  showAppDetailDialog.value = true
}

// ═══ 担保列表 ═══
async function loadGuarantees() {
  gLoading.value = true
  try {
    const params: any = { page: gPage.value, size: gSize.value }
    if (gQuery.value.status) params.status = gQuery.value.status
    if (isGuarantee.value) params.guarantorId = String(userStore.userId || '')
    const res: any = await getGuaranteeList(params)
    if (res?.code === 200) {
      const d = res.data
      guarantees.value = d.content || []
      gTotal.value = d.totalElements || 0
    } else { guarantees.value = []; gTotal.value = 0 }
  } catch { guarantees.value = []; gTotal.value = 0 }
  finally { gLoading.value = false }
}

async function handleSign(g: any) {
  signTargetId.value = g.id
  signContractNo.value = ''
  showSignDialog.value = true
}
async function confirmSign() {
  if (!signContractNo.value.trim()) { ElMessage.warning('请输入合同编号'); return }
  try {
    const res: any = await signGuarantee(signTargetId.value, signContractNo.value.trim())
    if (res?.code === 200) { ElMessage.success('签约成功'); showSignDialog.value = false; await loadGuarantees() }
    else { ElMessage.error(res?.message || '签约失败') }
  } catch { ElMessage.error('签约失败') }
}

async function handleCounter(g: any) {
  counterTargetId.value = g.id
  counterForm.value = { counterGuaranteeType: '抵押', counterGuaranteeDesc: '', counterGuaranteeValue: 0 }
  showCounterDialog.value = true
}
async function confirmCounter() {
  try {
    const res: any = await registerCounterGuarantee(counterTargetId.value, counterForm.value)
    if (res?.code === 200) { ElMessage.success('反担保已登记'); showCounterDialog.value = false; await loadGuarantees() }
    else { ElMessage.error(res?.message || '登记失败') }
  } catch { ElMessage.error('登记失败') }
}

async function handleFee(g: any) {
  feeTargetId.value = g.id
  feeAmount.value = g.feeAmount || 0
  // 计算费用
  try {
    const res: any = await calculateFee(g.guaranteeAmount || 0, g.feeRate || 1.5, 12)
    feeCalcResult.value = res?.data || res || 0
    if (!feeAmount.value) feeAmount.value = feeCalcResult.value
  } catch { feeCalcResult.value = 0 }
  showFeeDialog.value = true
}
async function confirmFee() {
  if (!feeAmount.value || feeAmount.value <= 0) { ElMessage.warning('请输入有效金额'); return }
  try {
    const res: any = await payGuaranteeFee(feeTargetId.value, feeAmount.value)
    if (res?.code === 200) { ElMessage.success('担保费已支付'); showFeeDialog.value = false; await loadGuarantees() }
    else { ElMessage.error(res?.message || '支付失败') }
  } catch { ElMessage.error('支付失败') }
}

async function handleRelease(g: any) {
  releaseTargetId.value = g.id
  releaseReason.value = ''
  showReleaseDialog.value = true
}
async function confirmRelease() {
  try {
    const res: any = await releaseGuarantee(releaseTargetId.value, releaseReason.value)
    if (res?.code === 200) { ElMessage.success('担保已释放'); showReleaseDialog.value = false; await loadGuarantees() }
    else { ElMessage.error(res?.message || '释放失败') }
  } catch { ElMessage.error('释放失败') }
}

async function showGDetail(row: any) {
  try {
    const res: any = await getGuaranteeById(row.id)
    gDetail.value = res?.code === 200 ? res.data : row
  } catch { gDetail.value = row }
  showGDetailDialog.value = true
}

function onTabChange(tab: string) {
  if (tab === 'guarantee' && guarantees.value.length === 0) loadGuarantees()
}
</script>

<template>
  <div class="guarantee-view">
    <div class="page-header">
      <h2>担保管理</h2>
    </div>
    <el-tabs v-model="activeTab" @tab-change="onTabChange">
      <!-- ═══ Tab1: 担保申请 ═══ -->
      <el-tab-pane label="担保申请" name="application">
        <el-card class="search-card">
          <div class="search-bar">
            <el-input v-model="appQuery.appNo" placeholder="申请编号" clearable style="width:160px" />
            <el-input v-model="appQuery.applicantName" placeholder="申请人" clearable style="width:150px" />
            <el-select v-model="appQuery.status" placeholder="状态" clearable style="width:130px">
              <el-option label="草稿" value="DRAFT" />
              <el-option label="待审核" value="SUBMITTED" />
              <el-option label="已通过" value="APPROVED" />
              <el-option label="已拒绝" value="REJECTED" />
            </el-select>
            <el-button type="primary" @click="loadApps">查询</el-button>
            <el-button v-if="!isGuarantee" type="success" :icon="Plus" @click="showAppCreateDialog = true">新建申请</el-button>
          </div>
        </el-card>
        <el-card>
          <el-table :data="apps" v-loading="appsLoading" stripe size="small">
            <el-table-column prop="appNo" label="申请编号" width="170" />
            <el-table-column prop="applicantName" label="申请人" width="120" />
            <el-table-column prop="loanApplicationId" label="关联贷款" width="90" />
            <el-table-column label="担保金额" width="130">
              <template #default="{row}">¥{{ row.requestAmount?.toLocaleString() || 0 }}</template>
            </el-table-column>
            <el-table-column prop="guaranteeType" label="担保类型" width="110" />
            <el-table-column label="状态" width="100">
              <template #default="{row}">
                <el-tag :type="appStatusType[row.status] || 'info'" size="small">{{ appStatusMap[row.status] || row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="submitTime" label="提交时间" width="110">
              <template #default="{row}">{{ row.submitTime ? row.submitTime.slice(0,10) : '-' }}</template>
            </el-table-column>
            <el-table-column label="操作" width="220" fixed="right">
              <template #default="{row}">
                <el-button size="small" :icon="View" @click="showAppDetail(row)">详情</el-button>
                <el-button v-if="row.status==='DRAFT'" size="small" type="primary" :icon="Upload" @click="handleSubmitApp(row.id)">提交</el-button>
                <el-button v-if="row.status==='SUBMITTED' && (isAdmin || isBank)" size="small" type="success" :icon="CircleCheck" @click="handleReviewApp(row, true)">通过</el-button>
                <el-button v-if="row.status==='SUBMITTED' && (isAdmin || isBank)" size="small" type="danger" :icon="Remove" @click="handleReviewApp(row, false)">拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-wrap">
            <el-pagination v-model:current-page="appsPage" v-model:page-size="appsSize" :total="appsTotal"
              layout="total, prev, pager, next" @current-change="loadApps" small />
          </div>
        </el-card>
      </el-tab-pane>

      <!-- ═══ Tab2: 担保列表 ═══ -->
      <el-tab-pane label="担保列表" name="guarantee">
        <el-card class="search-card">
          <div class="search-bar">
            <el-input v-model="gQuery.guaranteeNo" placeholder="担保编号" clearable style="width:160px" />
            <el-input v-model="gQuery.guarantorName" placeholder="担保人" clearable style="width:150px" />
            <el-select v-model="gQuery.status" placeholder="状态" clearable style="width:130px">
              <el-option label="待签约" value="PENDING_SIGN" />
              <el-option label="已生效" value="ACTIVE" />
              <el-option label="已解除" value="RELEASED" />
              <el-option label="已终止" value="TERMINATED" />
            </el-select>
            <el-button type="primary" @click="loadGuarantees">查询</el-button>
          </div>
        </el-card>
        <el-card>
          <el-table :data="guarantees" v-loading="gLoading" stripe size="small">
            <el-table-column prop="guaranteeNo" label="担保编号" width="160" />
            <el-table-column prop="guarantorName" label="担保人" width="120" />
            <el-table-column prop="loanApplicationId" label="关联贷款" width="80" />
            <el-table-column label="担保金额" width="120">
              <template #default="{row}">¥{{ row.guaranteeAmount?.toLocaleString() || 0 }}</template>
            </el-table-column>
            <el-table-column prop="guaranteeRatio" label="比例" width="80">
              <template #default="{row}">{{ row.guaranteeRatio ? (row.guaranteeRatio*100).toFixed(1)+'%' : '-' }}</template>
            </el-table-column>
            <el-table-column prop="guaranteeType" label="类型" width="90" />
            <el-table-column label="反担保" width="100">
              <template #default="{row}">
                <el-tag :type="cgStatusType[row.counterGuaranteeStatus] || 'info'" size="small">
                  {{ cgStatusMap[row.counterGuaranteeStatus] || '-' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="担保费" width="100">
              <template #default="{row}">
                <el-tag :type="feeStatusType[row.feeStatus] || 'info'" size="small">
                  {{ feeStatusMap[row.feeStatus] || '-' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="contractNo" label="合同" width="120" />
            <el-table-column label="状态" width="90">
              <template #default="{row}">
                <el-tag :type="gStatusType[row.status] || 'info'" size="small">{{ gStatusMap[row.status] || row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="有效期" width="180">
              <template #default="{row}">{{ row.startDate || '-' }} ~ {{ row.endDate || '-' }}</template>
            </el-table-column>
            <el-table-column label="操作" width="280" fixed="right">
              <template #default="{row}">
                <el-button size="small" :icon="View" @click="showGDetail(row)">详情</el-button>
                <el-button v-if="row.status==='PENDING_SIGN' && isGuarantee" size="small" type="warning" :icon="Edit" @click="handleSign(row)">签约</el-button>
                <el-button v-if="row.status==='ACTIVE' && isGuarantee" size="small" type="primary" :icon="Coin" @click="handleCounter(row)">反担保</el-button>
                <el-button v-if="row.status==='ACTIVE' && isGuarantee" size="small" type="success" :icon="CircleCheck" @click="handleFee(row)">收费</el-button>
                <el-button v-if="row.status==='ACTIVE' && isGuarantee" size="small" type="info" :icon="Remove" @click="handleRelease(row)">释放</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-wrap">
            <el-pagination v-model:current-page="gPage" v-model:page-size="gSize" :total="gTotal"
              layout="total, prev, pager, next" @current-change="loadGuarantees" small />
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- 新建申请弹窗 -->
    <el-dialog v-model="showAppCreateDialog" title="新建担保申请" width="520px">
      <el-form :model="appForm" label-width="120px">
        <el-form-item label="关联贷款ID" required>
          <el-input-number v-model="appForm.loanApplicationId" :min="1" style="width:100%" />
        </el-form-item>
        <el-form-item label="申请人名称" required>
          <el-input v-model="appForm.applicantName" placeholder="担保申请人名称" />
        </el-form-item>
        <el-form-item label="担保类型" required>
          <el-select v-model="appForm.guaranteeType" style="width:100%">
            <el-option v-for="t in gtypeOptions" :key="t" :label="t" :value="t" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请金额(元)" required>
          <el-input-number v-model="appForm.requestAmount" :min="0" :step="10000" style="width:100%" />
        </el-form-item>
        <el-form-item label="担保用途">
          <el-input v-model="appForm.purpose" type="textarea" :rows="3" placeholder="担保资金用途" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAppCreateDialog = false">取消</el-button>
        <el-button type="primary" @click="handleCreateApp">提交</el-button>
      </template>
    </el-dialog>

    <!-- 申请详情弹窗 -->
    <el-dialog v-model="showAppDetailDialog" title="担保申请详情" width="600px">
      <el-descriptions v-if="appDetail" :column="2" border>
        <el-descriptions-item label="申请编号">{{ appDetail.appNo }}</el-descriptions-item>
        <el-descriptions-item label="关联贷款">{{ appDetail.loanApplicationId }}</el-descriptions-item>
        <el-descriptions-item label="申请人">{{ appDetail.applicantName }}</el-descriptions-item>
        <el-descriptions-item label="担保类型">{{ appDetail.guaranteeType }}</el-descriptions-item>
        <el-descriptions-item label="申请金额">¥{{ appDetail.requestAmount?.toLocaleString() }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="appStatusType[appDetail.status] || 'info'">{{ appStatusMap[appDetail.status] || appDetail.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="用途" :span="2">{{ appDetail.purpose || '-' }}</el-descriptions-item>
        <el-descriptions-item label="提交时间">{{ appDetail.submitTime || '-' }}</el-descriptions-item>
        <el-descriptions-item label="审核时间">{{ appDetail.reviewTime || '-' }}</el-descriptions-item>
        <el-descriptions-item label="审核意见" :span="2">{{ appDetail.reviewComment || '-' }}</el-descriptions-item>
        <el-descriptions-item label="拒绝原因" :span="2">{{ appDetail.rejectionReason || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 签约弹窗 -->
    <el-dialog v-model="showSignDialog" title="担保签约" width="450px">
      <el-form label-width="120px">
        <el-form-item label="合同编号" required>
          <el-input v-model="signContractNo" placeholder="输入担保合同编号" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showSignDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmSign">确认签约</el-button>
      </template>
    </el-dialog>

    <!-- 反担保登记弹窗 -->
    <el-dialog v-model="showCounterDialog" title="登记反担保" width="450px">
      <el-form :model="counterForm" label-width="120px">
        <el-form-item label="反担保类型" required>
          <el-select v-model="counterForm.counterGuaranteeType" style="width:100%">
            <el-option v-for="t in cgtypeOptions" :key="t" :label="t" :value="t" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" required>
          <el-input v-model="counterForm.counterGuaranteeDesc" type="textarea" :rows="3" placeholder="反担保资产描述" />
        </el-form-item>
        <el-form-item label="价值(元)" required>
          <el-input-number v-model="counterForm.counterGuaranteeValue" :min="0" :step="10000" style="width:100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCounterDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmCounter">确认登记</el-button>
      </template>
    </el-dialog>

    <!-- 担保费弹窗 -->
    <el-dialog v-model="showFeeDialog" title="支付担保费" width="450px">
      <p v-if="feeCalcResult > 0" style="color:#909399;margin-bottom:12px">参考费用：¥{{ feeCalcResult?.toLocaleString?.() || feeCalcResult }}</p>
      <el-form label-width="120px">
        <el-form-item label="支付金额(元)" required>
          <el-input-number v-model="feeAmount" :min="0" :step="1000" style="width:100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showFeeDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmFee">确认支付</el-button>
      </template>
    </el-dialog>

    <!-- 释放弹窗 -->
    <el-dialog v-model="showReleaseDialog" title="释放担保" width="450px">
      <el-form label-width="120px">
        <el-form-item label="释放原因">
          <el-input v-model="releaseReason" type="textarea" :rows="3" placeholder="输入释放原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showReleaseDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmRelease">确认释放</el-button>
      </template>
    </el-dialog>

    <!-- 担保详情弹窗 -->
    <el-dialog v-model="showGDetailDialog" title="担保详情" width="700px">
      <el-descriptions v-if="gDetail" :column="2" border size="small">
        <el-descriptions-item label="担保编号">{{ gDetail.guaranteeNo }}</el-descriptions-item>
        <el-descriptions-item label="关联贷款">{{ gDetail.loanApplicationId }}</el-descriptions-item>
        <el-descriptions-item label="担保人">{{ gDetail.guarantorName }}</el-descriptions-item>
        <el-descriptions-item label="担保类型">{{ gDetail.guaranteeType }}</el-descriptions-item>
        <el-descriptions-item label="担保金额">¥{{ gDetail.guaranteeAmount?.toLocaleString() }}</el-descriptions-item>
        <el-descriptions-item label="担保比例">{{ gDetail.guaranteeRatio ? (gDetail.guaranteeRatio*100).toFixed(1)+'%' : '-' }}</el-descriptions-item>
        <el-descriptions-item label="合同编号">{{ gDetail.contractNo || '-' }}</el-descriptions-item>
        <el-descriptions-item label="签约日期">{{ gDetail.signedDate || '-' }}</el-descriptions-item>
        <el-descriptions-item label="有效期">{{ gDetail.startDate || '-' }} ~ {{ gDetail.endDate || '-' }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="gStatusType[gDetail.status] || 'info'">{{ gStatusMap[gDetail.status] || gDetail.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="反担保类型">{{ gDetail.counterGuaranteeType || '-' }}</el-descriptions-item>
        <el-descriptions-item label="反担保价值">¥{{ gDetail.counterGuaranteeValue?.toLocaleString() || '-' }}</el-descriptions-item>
        <el-descriptions-item label="反担保状态">
          <el-tag :type="cgStatusType[gDetail.counterGuaranteeStatus] || 'info'" size="small">
            {{ cgStatusMap[gDetail.counterGuaranteeStatus] || '-' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="担保费率">{{ gDetail.feeRate ? gDetail.feeRate+'%' : '-' }}</el-descriptions-item>
        <el-descriptions-item label="担保费状态">
          <el-tag :type="feeStatusType[gDetail.feeStatus] || 'info'" size="small">
            {{ feeStatusMap[gDetail.feeStatus] || '-' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="担保费金额">¥{{ gDetail.feeAmount?.toLocaleString() || 0 }}</el-descriptions-item>
        <el-descriptions-item label="已付金额">¥{{ gDetail.feePaid?.toLocaleString() || 0 }}</el-descriptions-item>
        <el-descriptions-item label="风险等级">{{ gDetail.riskLevel || '-' }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ gDetail.remark || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<style scoped>
.guarantee-view { padding: 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-header h2 { margin: 0; }
.search-card { margin-bottom: 16px; }
.search-bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.pagination-wrap { display: flex; justify-content: center; margin-top: 16px; }
</style>
