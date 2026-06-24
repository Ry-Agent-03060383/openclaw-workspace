import request from './request';
// ============ 第三方服务 ============
export function getServices() {
    return request.get('/thirdparty/services');
}
export function getServiceById(id) {
    return request.get(`/thirdparty/service/${id}`);
}
export function createService(data) {
    return request.post('/thirdparty/service', data);
}
export function updateService(id, data) {
    return request.put(`/thirdparty/service/${id}`, data);
}
export function getServiceOrders() {
    return request.get('/thirdparty/orders');
}
export function getOrderById(id) {
    return request.get(`/thirdparty/order/${id}`);
}
export function createOrder(data) {
    return request.post('/thirdparty/order', data);
}
export function payOrder(id) {
    return request.post(`/thirdparty/order/${id}/pay`);
}
export function completeOrder(id) {
    return request.post(`/thirdparty/order/${id}/complete`);
}
export function rateOrder(id, data) {
    return request.post(`/thirdparty/order/${id}/rate`, data);
}
