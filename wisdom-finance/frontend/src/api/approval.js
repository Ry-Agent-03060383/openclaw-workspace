import request from './request';
// ============ 审批管理 ============
export function getApprovalHistory(applicationId) {
    return request.get(`/approval/${applicationId}/history`);
}
export function reviewApplication(applicationId, data) {
    return request.post(`/approval/${applicationId}/review`, data);
}
export function triggerRules(applicationId) {
    return request.post(`/approval/${applicationId}/rules`);
}
