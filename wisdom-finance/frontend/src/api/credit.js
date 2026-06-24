import request from './request';
// ============ 企业查询 ============
export function getAllCompanies() {
    return request.get('/credit/companies');
}
export function searchCompanies(name) {
    return request.get('/credit/company/search', { params: { name } });
}
export function getCompanyById(id) {
    return request.get(`/credit/company/${id}`);
}
export function getCompanyByCreditCode(code) {
    return request.get(`/credit/company/code/${code}`);
}
export function recalculateScore(companyId) {
    return request.post(`/credit/company/${companyId}/recalculate`);
}
// ============ 征信报告 ============
export function generateReport(companyId, reportType, generatedBy) {
    return request.post('/credit/report/generate', null, { params: { companyId, reportType, generatedBy } });
}
export function getCompanyReports(companyId) {
    return request.get(`/credit/report/company/${companyId}`);
}
export function getReportById(reportId) {
    return request.get(`/credit/report/${reportId}`);
}
// ============ 新增强版评分接口 ============
/** 获取企业完整信息+5维度评分明细 */
export function getCompanyFullInfo(companyId) {
    return request.get(`/credit/company/${companyId}/full`);
}
/** 获取评分明细（5维度分解） */
export function getScoreBreakdown(companyId) {
    return request.get(`/credit/score/breakdown/${companyId}`);
}
/** 获取多因子评分（含维度分解） */
export function getMultiFactorScore(companyId) {
    return request.get(`/credit/score/multi-factor/${companyId}`);
}
/** 批量评分评估 */
export function batchEvaluate(companyIds) {
    return request.post('/credit/score/evaluate', { companyIds });
}
// ============ 评分模型管理 ============
export function getActiveModels() {
    return request.get('/credit/model/active');
}
export function getAllModels() {
    return request.get('/credit/model/list');
}
export function getModelById(modelId) {
    return request.get(`/credit/model/${modelId}`);
}
export function getModelMetrics(modelId) {
    return request.get(`/credit/model/${modelId}/metrics`);
}
export function evaluateModel(modelId) {
    return request.post(`/credit/model/${modelId}/evaluate`);
}
export function simulateScore(modelId, companyId) {
    return request.post(`/credit/model/${modelId}/simulate`, { companyId });
}
export function compareModels(model1, model2) {
    return request.get('/credit/model/compare', { params: { model1, model2 } });
}
export function getWeightConfig(modelId) {
    return request.get(`/credit/model/${modelId}/weight`);
}
export function updateWeightConfig(modelId, weightConfig) {
    return request.put(`/credit/model/${modelId}/weight`, { weightConfig });
}
// ============ 特征评估 ============
export function evaluateFeature(featureName) {
    return request.post('/credit/model/feature/evaluate', { featureName });
}
