import request from './request'

// ============ 审批管理 ============

export function getApprovalHistory(applicationId: number) {
  return request.get(`/approval/${applicationId}/history`)
}

export function reviewApplication(applicationId: number, data: any) {
  return request.post(`/approval/${applicationId}/review`, data)
}

export function triggerRules(applicationId: number) {
  return request.post(`/approval/${applicationId}/rules`)
}