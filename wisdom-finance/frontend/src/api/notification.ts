import request from './request'

export function getNotifications(userId: number, page = 0) {
  return request.get(`/notification/list?userId=${userId}&page=${page}`)
}

export function getUnreadCount(userId: number) {
  return request.get(`/notification/unread-count?userId=${userId}`)
}

export function markAsRead(id: number) {
  return request.put(`/notification/${id}/read`)
}

export function markAllAsRead(userId: number) {
  return request.put(`/notification/read/all?userId=${userId}`)
}

export function deleteNotification(id: number) {
  return request.delete(`/notification/${id}`)
}

export function sendNotification(data: any) {
  return request.post('/notification/send', data)
}
