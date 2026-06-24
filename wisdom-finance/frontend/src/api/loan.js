import request from './request';
export function getMyLoans() {
    return request.get('/loan/my');
}
export function getAllLoans() {
    return request.get('/loan/list');
}
export function getPendingLoans() {
    return request.get('/loan/pending');
}
export function applyLoan(data) {
    return request.post('/loan/apply', data);
}
export function approveLoan(id) {
    return request.post(`/loan/${id}/approve`);
}
export function rejectLoan(id, reason) {
    return request.post(`/loan/${id}/reject?reason=${encodeURIComponent(reason)}`);
}
export function getBankProducts() {
    return request.get('/bank/products');
}
