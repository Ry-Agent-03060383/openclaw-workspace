import request from './request';
export function getNotifications(userId, page = 0) {
    return request.get(`/notification/list?userId=${userId}&page=${page}`);
}
export function getUnreadCount(userId) {
    return request.get(`/notification/unread-count?userId=${userId}`);
}
export function markAsRead(id) {
    return request.put(`/notification/${id}/read`);
}
export function markAllAsRead(userId) {
    return request.put(`/notification/read/all?userId=${userId}`);
}
export function deleteNotification(id) {
    return request.delete(`/notification/${id}`);
}
export function sendNotification(data) {
    return request.post('/notification/send', data);
}
