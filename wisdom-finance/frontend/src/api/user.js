import request from './request';
export function getUsers() {
    return request.get('/user/list');
}
export function pageUsers(params) {
    return request.get('/user/page', { params });
}
export function getUser(id) {
    return request.get(`/user/${id}`);
}
export function createUser(data) {
    return request.post('/user/create', data);
}
export function updateUser(id, data) {
    return request.put(`/user/${id}`, data);
}
export function toggleUserStatus(id) {
    return request.put(`/user/${id}/status`);
}
export function deleteUser(id) {
    return request.delete(`/user/${id}`);
}
