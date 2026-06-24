<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getEvaluations, evaluateCompany, evaluateApplication, getRiskReport } from '../../api/risk'
import { getAllCompanies } from '../../api/credit'
import { getAllLoans } from '../../api/loan'
import { ElMessage } from 'element-plus'
import { Refresh, Plus, Document } from '@element-plus/icons-vue'

const evaluations = ref<any[]>([])
const companies = ref<any[]>([])
const loans = ref<any[]>([])
const loading = ref(false)
const evaluating = ref(false)
const showReportDialog = ref(false)
const reportDetail = ref<any>(null)
const reportTab = ref('dimensions')

const riskLevelMap: Record<string, string> = {
  AAA: '极低', AA: '很低', A: '较低', BBB: '中等', BB: '较高', B: '很高', C: '极高',
}
const riskLevelType: Record<string, string> = {
  AAA: 'success', AA: '', A: 'primary', BBB: 'warning', BB: 'warning', B: 'danger', C: 'danger',
}
const evaluationTypeMap: Record<string, string> = { COMPANY: '企业评估', APPLICATION: '贷款申请评估' }

onMounted(async () => { await loadData() })

async function loadData() {
  loading.value = true
  try {
    const [evRes, coRes, loRes] = await Promise.all([
      getEvaluations(),
      getAllCompanies(),
      getAllLoans(),
    ])
    if (evRes?.code === 200) evaluations.value = evRes.data || []
    if (coRes?.code === 200) companies.value = coRes.data || []
    if (loRes?.code === 200) loans.value = loRes.data || []
  } catch { /* ignore */ }
  loading.value = false
}

async function handleEvaluateCompany() {
  if (!companies.value.length) { ElMessage.warning('暂无企业数据'); return }
  evaluating.value = true
  try {
    const res: any = await evaluateCompany(companies.value[0].id)
    if (res?.code === 200) {
      ElMessage.success(`评估完成: ${res.data.riskLevel}`)
      await loadData()
    } else {
      ElMessage.error(res?.message || '评估失败')
    }
  } catch { ElMessage.error('评估失败') }
  evaluating.value = false
}

async function handleEvaluateApplication() {
  const pending = loans.value.filter((l: any) => l.status === 'PENDING' || l.status === 'SUBMITTED')
  if (!pending.length) { ElMessage.warning('暂无待审核贷款申请'); return }
  evaluating.value = true
  try {
    const res: any = await evaluateApplication(pending[0].id)
    if (res?.code === 200) {
      ElMessage.success(`评估完成: ${res.data.riskLevel}`)
      await loadData()
    } else {
      ElMessage.error(res?.message || '评估失败')
    }
  } catch { ElMessage.error('评估失败') }
  evaluating.value = false
}

async function viewReport(evaluation: any) {
  try {
    const res: any = await getRiskReport(evaluation.id)
    if (res?.code === 200) {
      reportDetail.value = res.data
      showReportDialog.value = true
    }
  } catch { ElMessage.error('获取报告失败') }
}

function getScoreColor(score: number) {
  if (score >= 80) return '#67c23a'
  if (score >= 60) return '#409eff'
  if (score >= 40) return '#e6a23c'
  return '#f56c6c'
}

function formatTime(t: string) {
  if (!t) return '-'
  return t.substring(0, 19).replace('T', ' ')
}

function parseRiskReport(report: any) {
  if (!report?.riskReport) return null
  try { return JSON.parse(report.riskReport) } catch { return null }
}

const showEvalDialog = ref(false)
const evalTarget = ref<'company' | 'application'>('company')

function openEvalDialog(type: 'company' | 'application') {
  evalTarget.value = type
  showEvalDialog.value = true
}

async function confirmEvaluate() {
  showEvalDialog.value = false
  if (evalTarget.value === 'company') await handleEvaluateCompany()
  else await handleEvaluateApplication()
}
</script>

<template>
  <div class="risk-view">
    <el-card shadow="never">
      <template #header>
        <div class="header-bar">
          <span>风险评估</span>
          <div class="header-actions">
            <el-button size="small" :icon="Refresh" @click="loadData">刷新</el-button>
            <el-dropdown trigger="click" @command="openEvalDialog">
              <el-button type="primary" size="small" :icon="Plus" :loading="evaluating">发起评估</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="company">企业风险评估</el-dropdown-item>
                  <el-dropdown-item command="application">贷款申请风险评估</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>

      <el-table :data="evaluations" v-loading="loading" stripe size="small" default-expand-all>
        <el-table-column type="expand">
          <template #default="{row}">
            <div class="expand-row">
              <div class="dimension-cards">
                <div class="dimension-item">
                  <div class="dim-label">基础资质</div>
                  <el-progress type="circle" :percentage="row.basicQualificationScore || 0" :width="60" :stroke-width="6" :color="getScoreColor(row.basicQualificationScore)" />
                </div>
                <div class="dimension-item">
                  <div class="dim-label">信用记录</div>
                  <el-progress type="circle" :percentage="row.creditRecordScore || 0" :width="60" :stroke-width="6" :color="getScoreColor(row.creditRecordScore)" />
                </div>
                <div class="dimension-item">
                  <div class="dim-label">财务状况</div>
                  <el-progress type="circle" :percentage="row.financialStatusScore || 0" :width="60" :stroke-width="6" :color="getScoreColor(row.financialStatusScore)" />
                </div>
                <div class="dimension-item">
                  <div class="dim-label">行业风险</div>
                  <el-progress type="circle" :percentage="row.industryRiskScore || 0" :width="60" :stroke-width="6" :color="getScoreColor(row.industryRiskScore)" />
                </div>
              </div>
              <div class="suggestion-text" v-if="row.suggestion">{{ row.suggestion }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="evaluationNo" label="评估编号" width="180" />
        <el-table-column label="评估类型" width="110">
          <template #default="{row}">{{ evaluationTypeMap[row.evaluationType] || row.evaluationType }}</template>
        </el-table-column>
        <el-table-column prop="companyName" label="企业名称" min-width="140" show-overflow-tooltip />
        <el-table-column label="风险评分" width="100">
          <template #default="{row}">
            <span :style="{color:getScoreColor(row.riskScore),fontWeight:'bold',fontSize:'16px'}">{{ row.riskScore }}</span>
          </template>
        </el-table-column>
        <el-table-column label="风险等级" width="90">
          <template #default="{row}">
            <el-tag :type="riskLevelType[row.riskLevel] || 'info'" size="small">{{ row.riskLevel }} {{ riskLevelMap[row.riskLevel] || '' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="评估时间" width="150">
          <template #default="{row}">{{ formatTime(row.evaluateTime) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template #default="{row}">
            <el-button size="small" :icon="Document" circle @click="viewReport(row)" />
          </template>
        </el-table-column>
      </el-table>
      <p v-if="!evaluations.length && !loading" style="color:#999;text-align:center;padding:20px 0">暂无评估记录，点击"发起评估"开始</p>
    </el-card>

    <el-dialog v-model="showEvalDialog" :title="evalTarget === 'company' ? '企业风险评估' : '贷款申请风险评估'" width="400px">
      <p>{{ evalTarget === 'company' ? `将对 ${companies.length} 家企业进行风险评估` : `将对 ${loans.filter(l=>l.status==='PENDING'||l.status==='SUBMITTED').length} 笔待审核贷款申请进行风险评估` }}</p>
      <p style="color:#999;font-size:13px">系统将根据基础资质、信用记录、财务状况、行业风险四个维度综合评估，并生成风险报告。</p>
      <template #footer>
        <el-button @click="showEvalDialog = false">取消</el-button>
        <el-button type="primary" :loading="evaluating" @click="confirmEvaluate">确认评估</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showReportDialog" title="风险报告详情" width="750px" top="5vh">
      <div v-if="reportDetail" class="report-detail">
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="评估编号">{{ reportDetail.evaluationNo }}</el-descriptions-item>
          <el-descriptions-item label="评估类型">{{ evaluationTypeMap[reportDetail.evaluationType] }}</el-descriptions-item>
          <el-descriptions-item label="企业名称">{{ reportDetail.companyName }}</el-descriptions-item>
          <el-descriptions-item label="信用代码">{{ reportDetail.creditCode }}</el-descriptions-item>
          <el-descriptions-item label="风险评分">
            <span :style="{color:getScoreColor(reportDetail.riskScore),fontWeight:'bold',fontSize:'18px'}">{{ reportDetail.riskScore }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="风险等级">
            <el-tag :type="riskLevelType[reportDetail.riskLevel]">{{ reportDetail.riskLevel }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="评估时间">{{ formatTime(reportDetail.evaluateTime) }}</el-descriptions-item>
          <el-descriptions-item label="评估人">{{ reportDetail.evaluator || '-' }}</el-descriptions-item>
        </el-descriptions>

        <el-tabs v-model="reportTab" style="margin-top:16px">
          <el-tab-pane label="维度评分" name="dimensions">
            <div class="report-dimensions">
              <div v-for="d in [
                {label:'基础资质',score:reportDetail.basicQualificationScore,weight:'30%',desc:'成立年限/注册资本/经营状态'},
                {label:'信用记录',score:reportDetail.creditRecordScore,weight:'35%',desc:'信用评分/历史逾期/诉讼记录'},
                {label:'财务状况',score:reportDetail.financialStatusScore,weight:'25%',desc:'营收规模/资产负债/现金流'},
                {label:'行业风险',score:reportDetail.industryRiskScore,weight:'10%',desc:'行业周期/政策影响'},
              ]" :key="d.label" class="report-dim-row">
                <div class="dim-header">
                  <span class="dim-name">{{ d.label }}</span>
                  <span class="dim-weight">权重 {{ d.weight }}</span>
                  <span class="dim-score" :style="{color:getScoreColor(d.score)}">{{ d.score }}分</span>
                </div>
                <el-progress :percentage="d.score || 0" :stroke-width="14" :color="getScoreColor(d.score)" />
                <div class="dim-desc">{{ d.desc }}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="详细信息" name="details">
            <el-descriptions :column="2" border size="small">
              <el-descriptions-item label="成立年限">{{ reportDetail.establishmentYears ?? '-' }}年</el-descriptions-item>
              <el-descriptions-item label="注册资本">{{ reportDetail.registeredCapital ? '¥' + reportDetail.registeredCapital : '-' }}</el-descriptions-item>
              <el-descriptions-item label="经营状态">{{ reportDetail.businessStatus || '-' }}</el-descriptions-item>
              <el-descriptions-item label="信用评分">{{ reportDetail.creditScore ?? '-' }}</el-descriptions-item>
              <el-descriptions-item label="所属行业">{{ reportDetail.industry || '-' }}</el-descriptions-item>
              <el-descriptions-item label="年营收">{{ reportDetail.annualRevenue ? '¥' + reportDetail.annualRevenue : '-' }}</el-descriptions-item>
            </el-descriptions>
          </el-tab-pane>
          <el-tab-pane label="评估建议" name="suggestion">
            <div class="suggestion-box">{{ reportDetail.suggestion || '暂无建议' }}</div>
          </el-tab-pane>
          <el-tab-pane label="原始报告" name="raw">
            <pre class="raw-report">{{ parseRiskReport(reportDetail) ? JSON.stringify(parseRiskReport(reportDetail), null, 2) : reportDetail.riskReport || '无' }}</pre>
          </el-tab-pane>
        </el-tabs>
      </div>
      <template #footer>
        <el-button @click="showReportDialog = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.risk-view { max-width: 1200px; margin: 0 auto; }
.header-bar { display: flex; justify-content: space-between; align-items: center; }
.header-actions { display: flex; gap: 8px; }
.expand-row { padding: 12px 24px; }
.dimension-cards { display: flex; gap: 24px; justify-content: center; margin-bottom: 12px; }
.dimension-item { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.dim-label { font-size: 12px; color: #666; }
.suggestion-text { color: #333; font-size: 13px; line-height: 1.6; padding: 8px 12px; background: #f5f7fa; border-radius: 4px; }
.report-dimensions { max-width: 500px; }
.report-dim-row { margin-bottom: 16px; }
.dim-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font-size: 13px; }
.dim-name { flex: 1; font-weight: 500; }
.dim-weight { color: #999; font-size: 12px; }
.dim-score { font-weight: 600; min-width: 36px; text-align: right; }
.dim-desc { color: #bbb; font-size: 12px; margin-top: 2px; }
.suggestion-box { padding: 16px; background: #f0f9eb; border-radius: 6px; line-height: 1.8; color: #333; font-size: 14px; border-left: 4px solid #67c23a; }
.raw-report { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 6px; font-size: 12px; max-height: 400px; overflow: auto; white-space: pre-wrap; }
</style>
