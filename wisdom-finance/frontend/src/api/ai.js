import request from './request';
export function aiChat(message) {
    return request.post('/ai/chat', { message });
}
export function searchPolicy(keyword) {
    return request.post('/ai/policy/search', { keyword });
}
export function loanConsult(amount, term) {
    return request.post('/ai/loan/consult', { amount, term });
}
export function analyzeEnterprise(enterpriseName) {
    return request.post('/ai/analyze/enterprise', { enterpriseName });
}
export function analyzeMarket() {
    return request.post('/ai/analyze/market');
}
