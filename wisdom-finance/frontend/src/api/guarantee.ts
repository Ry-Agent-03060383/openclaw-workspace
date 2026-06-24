import request from './request'

// ============ 担保申请 (Application) ============

export interface ApplicationQuery {
  applicantId?: string
  status?: string
  page?: number
  size?: number
}

export interface ApplicationCreate {
  loanApplicationId: number
  applicantName: string
  guaranteeType: string
  requestAmount: number
  purpose: string
}

export function getApplicationList(params: ApplicationQuery = { page: 0, size: 10 }) {
  return request.get('/guarantee/application/list', { params })
}

export function getApplicationById(id: number) {
  return request.get(`/guarantee/application/${id}`)
}

export function createApplication(data: ApplicationCreate) {
  return request.post('/guarantee/application', data)
}

export function submitApplication(id: number) {
  return request.post(`/guarantee/application/${id}/submit`)
}

export function reviewApplication(id: number, approved: boolean, comment: string) {
  return request.post(`/guarantee/application/${id}/review`, null, { params: { approved, comment } })
}

// ============ 担保 (Guarantee) ============

export interface GuaranteeQuery {
  guarantorId?: string
  status?: string
  page?: number
  size?: number
}

export function getGuaranteeList(params: GuaranteeQuery = { page: 0, size: 10 }) {
  return request.get('/guarantee/list', { params })
}

export function getGuaranteeById(id: number) {
  return request.get(`/guarantee/${id}`)
}

export function signGuarantee(id: number, contractNo: string) {
  return request.post(`/guarantee/${id}/sign`, null, { params: { contractNo } })
}

export function registerCounterGuarantee(id: number, data: { counterGuaranteeType: string; counterGuaranteeDesc: string; counterGuaranteeValue: number }) {
  return request.post(`/guarantee/${id}/counter`, data)
}

export function payGuaranteeFee(id: number, amount: number) {
  return request.post(`/guarantee/${id}/pay-fee`, null, { params: { amount } })
}

export function releaseGuarantee(id: number, reason: string) {
  return request.post(`/guarantee/${id}/release`, null, { params: { reason } })
}

export function terminateGuarantee(id: number, reason: string) {
  return request.post(`/guarantee/${id}/terminate`, null, { params: { reason } })
}

// ============ 其他 ============

export function calculateFee(amount: number, rate: number, months: number) {
  return request.get('/guarantee/calculate-fee', { params: { amount, rate, months } })
}

export function getGuaranteeByLoan(loanId: number) {
  return request.get(`/guarantee/by-loan/${loanId}`)
}
