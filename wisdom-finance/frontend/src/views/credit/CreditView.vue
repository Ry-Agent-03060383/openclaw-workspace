<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getAllCompanies, searchCompanies, getCompanyByCreditCode,
  getCompanyFullInfo, getScoreBreakdown,
  batchEvaluate, generateReport
} from '../../api/credit'
import { ElMessage } from 'element-plus'
import { Search, Refresh, Document, DataAnalysis, TrendCharts } from '@element-plus/icons-vue'

const searchMode = ref<'name' | 'code'>('name')
const searchKeyword = ref('')
const companies = ref<any[]>([])
const selectedCompany = ref<any>(null)
const companyFullInfo = ref<any>(null)
const scoreBreakdown = ref<any>(null)
const loading = ref(false)
const evaluating = ref(false)
const generating = ref(false)
const showDetailDialog = ref(false)
const activeTab = ref('overview')
const breakdownDialog = ref(false)

const creditLevelMap: Record<string, string> = { AAA: '极好', AA: '优秀', A: '良好', BBB: '中等', BB: '关注', B: '预警', C: '高危' }
const creditLevelType: Record<string, string> = { AAA: 'success', AA: '', A: 'primary', BBB: 'warning', BB: 'warning', B: 'danger', C: 'danger' }
const riskLevelMap: Record<string, string> = { LOW: '低风险', MEDIUM: '中等风险', HIGH: '高风险' }
const riskLevelType: Record<string, string> = { LOW: 'success', MEDIUM: 'warning', HIGH: 'danger' }

onMounted(async () => {
  await loadCompanies()
})

async function loadCompanies() {
  loading.value = true
  try {
    const res = await getAllCompanies()
    companies.value = res?.data || []
  } catch { companies.value = [] }
  finally { loading.value = false }
}

async function doSearch() {
  if (!searchKeyword.value.trim()) return await loadCompanies()
  loading.value = true
  try {
    if (searchMode.value === 'code') {
      const res = await getCompanyByCreditCode(searchKeyword.value.trim())
      companies.value = res?.data ? [res.data] : []
    } else {
      const res = await searchCompanies(searchKeyword.value.trim())
      companies.value = res?.data || []
    }
  } catch { companies.value = [] }
  finally { loading.value = false }
}

async function viewCompanyDetail(company: any) {
  selectedCompany.value = company
  showDetailDialog.value = true
  activeTab.value = 'overview'
  companyFullInfo.value = null
  scoreBreakdown.value = null
  try {
    const infoRes = await getCompanyFullInfo(company.id)
    companyFullInfo.value = infoRes?.data || null
  } catch { companyFullInfo.value = null }
}

async function viewScoreBreakdown(companyId: number) {
  breakdownDialog.value = true
  try {
    const res = await getScoreBreakdown(companyId)
    scoreBreakdown.value = res?.data || null
  } catch { scoreBreakdown.value = null }
}

async function handleGenerateReport(companyId: number) {
  try {
    generating.value = true
    await generateReport(companyId, 'STANDARD', 'USER')
    ElMessage.success('征信报告生成成功')
  } catch (e: any) { ElMessage.error(e.message || '生成失败') }
}

async function handleBatchEvaluate() {
  evaluating.value = true
  try {
    const ids = companies.value.map((c: any) => c.id)
    if (!ids.length) { ElMessage.warning('无企业数据'); return }
    await batchEvaluate(ids)
    ElMessage.success(`已完成 ${ids.length} 家企业的批量评分`)
  } catch (e: any) { ElMessage.error(e.message || '批量评估失败') }
  finally { evaluating.value = false }
}

function getRiskColor(score: number): string {
  if (score >= 80) return '#67C23A'
  if (score >= 60) return '#E6A23C'
  return '#F56C6C'
}
</script>

<template>
  <div class="credit-view">
    <div class="page-header">
      <h2>征信评级系统</h2>
      <div class="header-actions">
        <el-button :icon="Refresh" @click="loadCompanies" :loading="loading">刷新</el-button>
        <el-button :icon="DataAnalysis" @click="handleBatchEvaluate" :loading="evaluating" type="success" plain>
          批量评分
        </el-button>
      </div>
    </div>

    <!-- 搜索栏 -->
    <el-card class="search-card">
      <div class="search-bar">
        <el-radio-group v-model="searchMode">
          <el-radio-button value="name">企业名称</el-radio-button>
          <el-radio-button value="code">信用代码</el-radio-button>
        </el-radio-group>
        <el-input v-model="searchKeyword" :placeholder="searchMode === 'name' ? '输入企业名称搜索' : '输入统一社会信用代码'"
          clearable style="width:320px" @keyup.enter="doSearch" />
        <el-button type="primary" :icon="Search" @click="doSearch">查询</el-button>
      </div>
    </el-card>

    <!-- 企业列表 -->
    <el-card class="company-list">
      <template #header>
        <div class="card-header">
          <span>企业信用列表</span>
          <el-tag v-if="companies.length" type="info">{{ companies.length }} 家企业</el-tag>
        </div>
      </template>

      <el-table :data="companies" v-loading="loading" stripe style="width:100%">
        <el-table-column prop="companyName" label="企业名称" min-width="160" />
        <el-table-column prop="legalPerson" label="法定代表人" width="120" />
        <el-table-column prop="industry" label="行业" width="140" />
        <el-table-column label="信用评分" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="row.creditScore >= 80 ? 'success' : row.creditScore >= 60 ? 'warning' : 'danger'" effect="dark">
              {{ row.creditScore ?? '—' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="信用等级" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="creditLevelType[row.creditLevel as string] || 'info'" effect="plain">
              {{ row.creditLevel || '—' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="风险等级" width="110" align="center">
          <template #default="{ row }">
            <el-tag :type="riskLevelType[row.riskLevel as string] || 'info'" effect="dark">
              {{ riskLevelMap[row.riskLevel as string] || row.riskLevel || '—' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="成立日期" width="110">
          <template #default="{ row }">{{ row.establishmentDate }}</template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button size="small" :icon="Document" @click="viewCompanyDetail(row)">详情</el-button>
            <el-button size="small" :icon="TrendCharts" @click="viewScoreBreakdown(row.id)">评分</el-button>
            <el-button size="small" type="primary" @click="handleGenerateReport(row.id)">报告</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 企业详情对话框 -->
    <el-dialog v-model="showDetailDialog" :title="selectedCompany?.companyName" width="800px" destroy-on-close>
      <el-tabs v-model="activeTab" v-if="companyFullInfo">
        <!-- 概览页 -->
        <el-tab-pane label="评分概览" name="overview">
          <div class="score-overview">
            <div class="main-score">
              <div class="score-circle" :style="{ borderColor: getRiskColor(companyFullInfo.creditScore || 0) }">
                <span class="score-value">{{ companyFullInfo.creditScore || '—' }}</span>
                <span class="score-label">综合评分</span>
              </div>
              <div class="score-detail">
                <div class="detail-item">
                  <label>信用等级</label>
                  <el-tag :type="creditLevelType[companyFullInfo.creditLevel as string] || 'info'" size="large">
                    {{ companyFullInfo.creditLevel }} · {{ creditLevelMap[companyFullInfo.creditLevel as string] || '' }}
                  </el-tag>
                </div>
                <div class="detail-item">
                  <label>风险等级</label>
                  <el-tag :type="riskLevelType[companyFullInfo.riskLevel as string] || 'info'" size="large">
                    {{ riskLevelMap[companyFullInfo.riskLevel as string] || companyFullInfo.riskLevel }}
                  </el-tag>
                </div>
              </div>
            </div>

            <!-- 评分雷达图 --->
            <div class="radar-section" v-if="companyFullInfo.scoreBreakdown?.dimensions">
              <h4>5维度评分分解</h4>
              <div class="dimension-grid">
                <div v-for="(dim, key) in companyFullInfo.scoreBreakdown.dimensions" :key="key" class="dim-item">
                  <div class="dim-header">
                    <span class="dim-name">{{ dim.name }}</span>
                    <span class="dim-score" :style="{ color: getRiskColor(dim.score) }">{{ dim.score }}</span>
                  </div>
                  <el-progress :percentage="dim.score" :color="getRiskColor(dim.score)" :stroke-width="12" />
                  <div class="dim-info">
                    <span>权重: {{ dim.weight }}</span>
                    <span class="dim-desc">{{ dim.description }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 企业信息 -->
        <el-tab-pane label="企业信息" name="info" v-if="companyFullInfo?.company">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="企业名称">{{ companyFullInfo.company.companyName }}</el-descriptions-item>
            <el-descriptions-item label="信用代码">{{ companyFullInfo.company.creditCode }}</el-descriptions-item>
            <el-descriptions-item label="法定代表人">{{ companyFullInfo.company.legalPerson }}</el-descriptions-item>
            <el-descriptions-item label="注册资本">{{ companyFullInfo.company.registeredCapital }}万元</el-descriptions-item>
            <el-descriptions-item label="成立日期">{{ companyFullInfo.company.establishmentDate }}</el-descriptions-item>
            <el-descriptions-item label="经营状态">{{ companyFullInfo.company.businessStatus }}</el-descriptions-item>
            <el-descriptions-item label="所属行业">{{ companyFullInfo.company.industry }}</el-descriptions-item>
            <el-descriptions-item label="员工人数">{{ companyFullInfo.company.employeeCount || '未知' }}人</el-descriptions-item>
            <el-descriptions-item label="年营收">{{ companyFullInfo.company.annualRevenue }}万元</el-descriptions-item>
            <el-descriptions-item label="数据来源">{{ companyFullInfo.company.dataSource || '工商登记' }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <!-- 征信报告 -->
        <el-tab-pane label="征信报告" name="reports">
          <div class="report-actions">
            <el-button type="primary" @click="handleGenerateReport(selectedCompany?.id)" :loading="generating">
              生成新版征信报告
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div v-else class="loading-hint">
        <el-skeleton :rows="5" animated />
      </div>
    </el-dialog>

    <!-- 评分明细对话框 -->
    <el-dialog v-model="breakdownDialog" title="5维度评分明细" width="650px" destroy-on-close>
      <div v-if="scoreBreakdown" class="breakdown-content">
        <div class="breakdown-header">
          <div class="total-score" :style="{ color: getRiskColor(scoreBreakdown.total) }">
            <span class="big-score">{{ scoreBreakdown.total }}</span>
            <span class="level-tag">
              <el-tag :type="creditLevelType[scoreBreakdown.creditLevel as string] || 'info'" size="large">
                {{ scoreBreakdown.creditLevel }}
              </el-tag>
              <el-tag :type="riskLevelType[scoreBreakdown.riskLevel as string] || 'info'" size="large" style="margin-left:8px">
                {{ riskLevelMap[scoreBreakdown.riskLevel as string] }}
              </el-tag>
            </span>
          </div>
        </div>
        <el-divider />
        <div class="dimension-list" v-if="scoreBreakdown.dimensions">
          <div v-for="(dim, key) in scoreBreakdown.dimensions" :key="key" class="dimension-row">
            <div class="dim-left">
              <span class="dim-name">{{ dim.name }}</span>
              <span class="dim-weight">{{ dim.weight }}</span>
            </div>
            <div class="dim-bar">
              <el-progress :percentage="dim.score" :color="getRiskColor(dim.score)" :stroke-width="18"
                :text-inside="true">
                <span>{{ dim.score }}分</span>
              </el-progress>
            </div>
            <div class="dim-desc-text">{{ dim.description }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.credit-view { padding: 20px; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-header h2 { margin: 0; }
.header-actions { display: flex; gap: 8px; }
.search-card { margin-bottom: 16px; }
.search-bar { display: flex; align-items: center; gap: 12px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.score-overview { padding: 10px 0; }
.main-score { display: flex; gap: 40px; align-items: center; margin-bottom: 30px; }
.score-circle {
  width: 120px; height: 120px; border-radius: 50%; border: 6px solid #67C23A;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: #f0f9eb; flex-shrink: 0;
}
.score-value { font-size: 36px; font-weight: bold; color: #303133; }
.score-label { font-size: 12px; color: #909399; margin-top: 2px; }
.score-detail { display: flex; flex-direction: column; gap: 16px; }
.detail-item { display: flex; align-items: center; gap: 12px; }
.detail-item label { min-width: 60px; font-size: 14px; color: #606266; }
.radar-section { margin-top: 10px; }
.radar-section h4 { margin-bottom: 16px; color: #303133; }
.dimension-grid { display: flex; flex-direction: column; gap: 16px; }
.dim-item { padding: 12px; background: #fafafa; border-radius: 8px; }
.dim-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.dim-name { font-weight: 600; font-size: 14px; }
.dim-score { font-size: 18px; font-weight: bold; }
.dim-info { display: flex; justify-content: space-between; margin-top: 4px; font-size: 12px; color: #909399; }
.dim-desc { max-width: 400px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.loading-hint { padding: 40px; }
.report-actions { padding: 20px 0; }
.breakdown-content { padding: 10px 0; }
.breakdown-header { text-align: center; padding: 20px 0; }
.total-score { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.big-score { font-size: 48px; font-weight: bold; }
.level-tag { display: flex; gap: 4px; }
.dimension-list { display: flex; flex-direction: column; gap: 20px; }
.dimension-row { display: flex; flex-direction: column; gap: 4px; }
.dim-left { display: flex; justify-content: space-between; align-items: center; }
.dim-weight { font-size: 12px; color: #909399; }
.dim-bar { width: 100%; }
.dim-desc-text { font-size: 12px; color: #909399; margin-top: 2px; }
</style>
