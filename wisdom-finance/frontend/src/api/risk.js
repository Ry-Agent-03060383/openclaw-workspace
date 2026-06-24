import request from './request';
export function getEvaluations() {
    return request.get('/risk/evaluations');
}
export function getEvaluationsByCompany(companyId) {
    return request.get(`/risk/evaluations/company/${companyId}`);
}
export function getEvaluationsByApplication(applicationId) {
    return request.get(`/risk/evaluations/application/${applicationId}`);
}
export function evaluateCompany(companyId) {
    return request.post('/risk/evaluate/company', { companyId });
}
export function evaluateApplication(applicationId) {
    return request.post('/risk/evaluate/application', { applicationId });
}
export function getRiskReport(evaluationId) {
    return request.get(`/risk/report/${evaluationId}`);
}
export function getRiskReportByNo(evaluationNo) {
    return request.get(`/risk/report/no/${evaluationNo}`);
}
