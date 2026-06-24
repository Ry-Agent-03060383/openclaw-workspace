import request from './request';
// ============ 订阅服务 ============
export function getServices() {
    return request.get('/subscription/services');
}
export function getServiceById(id) {
    return request.get(`/subscription/service/${id}`);
}
export function createService(data) {
    return request.post('/subscription/service', data);
}
export function updateService(id, data) {
    return request.put(`/subscription/service/${id}`, data);
}
export function getUserSubscriptions() {
    return request.get('/subscription/user/list');
}
export function createSubscription(serviceId, data) {
    return request.post('/subscription/subscribe', data, { params: { serviceId } });
}
export function paySubscription(id) {
    return request.post(`/subscription/${id}/pay`);
}
export function cancelSubscription(id) {
    return request.post(`/subscription/${id}/cancel`);
}
export function renewSubscription(id) {
    return request.post(`/subscription/${id}/renew`);
}
