import request from './request'

export function getEvaluations() {
  return request.get('/risk/evaluations')
}

export function getEvaluationsByCompany(companyId: number) {
  return request.get(`/risk/evaluations/company/${companyId}`)
}

export function getEvaluationsByApplication(applicationId: number) {
  return request.get(`/risk/evaluations/application/${applicationId}`)
}

export function evaluateCompany(companyId: number) {
  return request.post('/risk/evaluate/company', { companyId })
}

export function evaluateApplication(applicationId: number) {
  return request.post('/risk/evaluate/application', { applicationId })
}

export function getRiskReport(evaluationId: number) {
  return request.get(`/risk/report/${evaluationId}`)
}

export function getRiskReportByNo(evaluationNo: string) {
  return request.get(`/risk/report/no/${evaluationNo}`)
}
