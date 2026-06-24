import request from './request';
export function getApplicationList(params = { page: 0, size: 10 }) {
    return request.get('/guarantee/application/list', { params });
}
export function getApplicationById(id) {
    return request.get(`/guarantee/application/${id}`);
}
export function createApplication(data) {
    return request.post('/guarantee/application', data);
}
export function submitApplication(id) {
    return request.post(`/guarantee/application/${id}/submit`);
}
export function reviewApplication(id, approved, comment) {
    return request.post(`/guarantee/application/${id}/review`, null, { params: { approved, comment } });
}
export function getGuaranteeList(params = { page: 0, size: 10 }) {
    return request.get('/guarantee/list', { params });
}
export function getGuaranteeById(id) {
    return request.get(`/guarantee/${id}`);
}
export function signGuarantee(id, contractNo) {
    return request.post(`/guarantee/${id}/sign`, null, { params: { contractNo } });
}
export function registerCounterGuarantee(id, data) {
    return request.post(`/guarantee/${id}/counter`, data);
}
export function payGuaranteeFee(id, amount) {
    return request.post(`/guarantee/${id}/pay-fee`, null, { params: { amount } });
}
export function releaseGuarantee(id, reason) {
    return request.post(`/guarantee/${id}/release`, null, { params: { reason } });
}
export function terminateGuarantee(id, reason) {
    return request.post(`/guarantee/${id}/terminate`, null, { params: { reason } });
}
// ============ 其他 ============
export function calculateFee(amount, rate, months) {
    return request.get('/guarantee/calculate-fee', { params: { amount, rate, months } });
}
export function getGuaranteeByLoan(loanId) {
    return request.get(`/guarantee/by-loan/${loanId}`);
}
