<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getReportById } from '../../api/credit'
import { ElMessage } from 'element-plus'
import { ArrowLeft, Download } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const report = ref<any>(null)
const loading = ref(true)
const activeTab = ref('basic')

function parseJson(str: string): any {
  if (!str || str === '{}') return null
  try { return JSON.parse(str) } catch { return null }
}

const creditLevelMap: Record<string, string> = {
  AAA: '极好', AA: '优秀', A: '良好', BBB: '中等',
  BB: '关注', B: '预警', C: '高危', NR: '未评级'
}
const creditLevelType: Record<string, string> = {
  AAA: 'success', AA: '', A: 'primary', BBB: 'warning',
  BB: 'warning', B: 'danger', C: 'danger', NR: 'info'
}
const riskLevelMap: Record<string, string> = { LOW: '低风险', MEDIUM: '中等风险', HIGH: '高风险' }
const riskLevelType: Record<string, string> = { LOW: 'success', MEDIUM: 'warning', HIGH: 'danger' }

const basicInfo = computed(() => parseJson(report.value?.basicInfo))
const creditHistory = computed(() => parseJson(report.value?.creditHistory))
const financialInfo = computed(() => parseJson(report.value?.financialInfo))
const legalInfo = computed(() => parseJson(report.value?.legalInfo))
const industryInfo = computed(() => parseJson(report.value?.industryInfo))
const riskAnalysis = computed(() => parseJson(report.value?.riskAnalysis))
const suggestions = computed(() => parseJson(report.value?.suggestions))

function getRiskColor(score: number): string {
  if (score >= 80) return '#67C23A'; if (score >= 60) return '#E6A23C'; return '#F56C6C'
}

function printReport() { window.print() }

onMounted(async () => {
  try {
    const id = route.params.id as string
    const res = await getReportById(Number(id))
    report.value = res?.data || null
    if (!report.value) ElMessage.error('报告不存在')
  } catch { ElMessage.error('加载报告失败') }
  finally { loading.value = false }
})
</script>

<template>
  <div class="report-detail">
    <div class="page-header">
      <el-button :icon="ArrowLeft" @click="router.back()">返回</el-button>
      <h2>企业征信报告</h2>
      <el-button :icon="Download" @click="printReport" type="primary">打印/导出</el-button>
    </div>

    <el-skeleton :rows="10" animated v-if="loading" />

    <div v-else-if="report">
      <el-card class="report-header">
        <div class="header-content">
          <div class="report-meta">
            <span class="meta-item">报告编号: <strong>{{ report.reportNo }}</strong></span>
            <span class="meta-item">生成日期: <strong>{{ report.reportDate }}</strong></span>
            <span class="meta-item">有效期至: <strong>{{ report.validUntil }}</strong></span>
            <span class="meta-item">报告类型:
              <el-tag size="small">{{ { BASIC: '基础版', STANDARD: '标准版', FULL: '详细版' }[report.reportType as string] || report.reportType }}</el-tag>
            </span>
          </div>
          <div class="report-summary">
            <div class="summary-score" :style="{ borderColor: getRiskColor(report.creditScore || 0) }">
              <div class="score-value">{{ report.creditScore }}</div>
              <div class="score-label">综合评分</div>
            </div>
            <div class="summary-levels">
              <div class="level-item">
                <label>信用等级</label>
                <el-tag :type="creditLevelType[report.creditLevel as string] || 'info'" size="large">{{ report.creditLevel }}</el-tag>
                <span class="level-desc">{{ creditLevelMap[report.creditLevel as string] || '' }}</span>
              </div>
              <div class="level-item">
                <label>风险等级</label>
                <el-tag :type="riskLevelType[report.riskLevel as string] || 'info'" size="large">
                  {{ riskLevelMap[report.riskLevel as string] || report.riskLevel }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-tabs v-model="activeTab" class="report-tabs">
        <el-tab-pane label="基本信息" name="basic">
          <el-card v-if="basicInfo">
            <el-descriptions :column="2" border>
              <el-descriptions-item v-for="(val, key) in (basicInfo as any)" :key="key"
                :label="({ companyName:'企业名称', creditCode:'信用代码', legalPerson:'法定代表人', registeredCapital:'注册资本', establishmentDate:'成立日期', businessStatus:'经营状态', industry:'所属行业', address:'地址', employeeCount:'员工人数', annualRevenue:'年营收', establishmentYears:'成立年限', tags:'企业标签' } as any)[key] || key">
                <template v-if="key === 'tags' && Array.isArray(val)">
                  <el-tag v-for="tag in val" :key="tag" size="small" style="margin-right:4px">{{ tag }}</el-tag>
                </template>
                <template v-else>{{ val }}</template>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="财务分析" name="finance">
          <el-card v-if="financialInfo">
            <div class="finance-section" v-for="(section, key) in (financialInfo as any)" :key="key">
              <h4>{{ { solvency:'偿债能力', profitability:'盈利能力', operation:'营运能力', cashFlow:'现金流分析', overallFinancialHealth:'综合健康度', overallAssessment:'综合评估' }[key] || key }}</h4>
              <el-descriptions :column="2" border v-if="typeof section === 'object' && !Array.isArray(section)">
                <el-descriptions-item v-for="(v, k) in (section as any)" :key="k" :label="({
                  assetLiabilityRatio:'资产负债率', currentRatio:'流动比率', quickRatio:'速动比率',
                  roe:'净资产收益率(ROE)', roa:'总资产报酬率(ROA)', netProfitRate:'销售利润率',
                  revenueGrowthRate:'营收增长率', accountsReceivableTurnover:'应收账款周转率',
                  inventoryTurnover:'存货周转率', operatingCashFlow:'经营活动现金流', cashFlowCoverage:'现金流覆盖率',
                  assetLiabilityRatioEvaluation:'评价', currentRatioEvaluation:'评价',
                  quickRatioEvaluation:'评价', roeEvaluation:'评价', cashFlowEvaluation:'评价'
                } as any)[k] || k">
                  <template v-if="String(k).includes('Evaluation') || String(k).includes('Assessment')">
                    <el-tag>{{ v }}</el-tag>
                  </template>
                  <template v-else>{{ v }}</template>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="信用历史" name="credit">
          <el-card v-if="creditHistory">
            <el-descriptions :column="2" border>
              <el-descriptions-item v-for="(val, key) in (creditHistory as any)" :key="key"
                :label="({ creditScore:'信用评分', creditLevel:'信用等级', riskLevel:'风险等级', repaymentWillingness:'还款意愿', historicalSummary:'历史概要' })[key] || key">
                {{ typeof val === 'object' ? JSON.stringify(val) : val }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="风险分析" name="risk">
          <el-card v-if="riskAnalysis">
            <div class="risk-header">
              <span class="risk-title">综合风险评分</span>
              <el-tag :type="riskLevelType[(riskAnalysis as any).compositeRiskLevel] || 'info'" size="large">
                {{ (riskAnalysis as any).compositeRiskScore }}分 · {{ riskLevelMap[(riskAnalysis as any).compositeRiskLevel] || (riskAnalysis as any).compositeRiskLevel }}
              </el-tag>
            </div>
            <el-divider />
            <h4>5维度风险雷达</h4>
            <div class="risk-dimensions" v-if="(riskAnalysis as any).radarData">
              <div v-for="(score, dim) in (riskAnalysis as any).radarData" :key="dim as string" class="risk-dim-item">
                <div class="dim-label">{{ { credit:'信用风险', operation:'经营风险', finance:'财务风险', legal:'法律风险', market:'市场风险' }[dim as string] || dim }}</div>
                <el-progress :percentage="score as number" :color="getRiskColor(score as number)" :text-inside="true" :stroke-width="14">
                  <span>{{ score }}分</span>
                </el-progress>
              </div>
            </div>
            <el-divider />
            <h4>关键风险点</h4>
            <div v-if="(riskAnalysis as any).topRiskFactors" class="top-risks">
              <el-alert v-for="(risk, idx) in (riskAnalysis as any).topRiskFactors" :key="idx"
                :title="(risk as any).name + ': ' + (risk as any).level"
                :description="(risk as any).description"
                :type="(risk as any).level === '高' ? 'error' : (risk as any).level === '中高' ? 'warning' : 'success'"
                show-icon :closable="false" style="margin-bottom:8px" />
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="授信建议" name="suggestions">
          <el-card v-if="suggestions">
            <el-descriptions :column="1" border>
              <el-descriptions-item v-for="(val, key) in (suggestions as any)" :key="key"
                :label="({ financingSuggestions:'融资建议', creditStrategy:'授信策略', recommendedAmountRange:'建议授信额度', recommendedRateRange:'建议利率区间', recommendedGuarantee:'建议担保方式', operationSuggestions:'运营建议', complianceSuggestions:'合规建议' })[key] || key">
                {{ val }}
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="法律合规" name="legal">
          <el-card v-if="legalInfo">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="涉诉记录">{{ (legalInfo as any).lawsuitCount }}次</el-descriptions-item>
              <el-descriptions-item label="行政处罚">{{ (legalInfo as any).administrativePenalties }}次</el-descriptions-item>
              <el-descriptions-item label="失信被执行人">
                <el-tag :type="(legalInfo as any).dishonestPerson ? 'danger' : 'success'">{{ (legalInfo as any).dishonestPerson ? '是' : '否' }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="知识产权">{{ (legalInfo as any).intellectualPropertyCount || 0 }}项</el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="行业分析" name="industry">
          <el-card v-if="industryInfo">
            <el-descriptions :column="2" border>
              <el-descriptions-item label="所属行业">{{ (industryInfo as any).industry }}</el-descriptions-item>
              <el-descriptions-item label="市场地位">{{ (industryInfo as any).marketPosition }}</el-descriptions-item>
              <el-descriptions-item v-if="(industryInfo as any).industryOutlook" label="发展阶段">
                {{ (industryInfo as any).industryOutlook.developmentStage }}
              </el-descriptions-item>
              <el-descriptions-item label="政策导向">
                <el-tag :type="((industryInfo as any).industryOutlook?.policyOrientation === '重点支持' || (industryInfo as any).industryOutlook?.policyOrientation === '大力支持') ? 'success' : 'info'">
                  {{ (industryInfo as any).industryOutlook?.policyOrientation }}
                </el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
        </el-tab-pane>
      </el-tabs>

      <el-card class="data-sources">
        <template #header><span>数据来源声明</span></template>
        <p>{{ report.dataSources || '工商登记、税务、司法、行业数据、征信系统' }}</p>
        <p style="font-size:12px;color:#909399">本报告仅限授权金融机构使用，有效期至 {{ report.validUntil }}，过期请重新生成。</p>
      </el-card>
    </div>

    <div v-else class="empty-state">
      <el-empty description="未找到征信报告" />
    </div>
  </div>
</template>

<style scoped>
.report-detail { padding: 20px; max-width: 1000px; margin: 0 auto; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-header h2 { margin: 0; font-size: 18px; }
.report-header { margin-bottom: 16px; }
.header-content { display: flex; flex-direction: column; gap: 16px; }
.report-meta { display: flex; gap: 24px; flex-wrap: wrap; font-size: 13px; color: #606266; }
.meta-item strong { color: #303133; }
.report-summary { display: flex; gap: 40px; align-items: center; }
.summary-score { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #67C23A; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f0f9eb; flex-shrink: 0; }
.summary-score .score-value { font-size: 32px; font-weight: bold; color: #303133; }
.summary-score .score-label { font-size: 11px; color: #909399; }
.summary-levels { display: flex; gap: 20px; }
.level-item { display: flex; flex-direction: column; gap: 4px; }
.level-item label { font-size: 12px; color: #909399; }
.level-desc { font-size: 12px; color: #606266; }
.report-tabs { margin-bottom: 16px; }
.finance-section { margin-bottom: 20px; }
.finance-section h4 { margin-bottom: 8px; color: #303133; font-size: 14px; }
.risk-header { display: flex; justify-content: space-between; align-items: center; }
.risk-title { font-size: 16px; font-weight: 600; }
.risk-dimensions { display: flex; flex-direction: column; gap: 12px; }
.risk-dim-item { display: flex; flex-direction: column; gap: 4px; }
.dim-label { font-size: 13px; font-weight: 500; color: #303133; }
.top-risks { margin-top: 8px; }
.data-sources { margin-top: 16px; }
.data-sources p { margin: 4px 0; font-size: 13px; color: #606266; }
.empty-state { padding: 60px; }
</style>