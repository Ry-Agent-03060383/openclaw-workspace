import request from './request'

export function getUsers() {
  return request.get('/user/list')
}

export function pageUsers(params: {
  keyword?: string
  userType?: string
  status?: string
  pageNum?: number
  pageSize?: number
}) {
  return request.get('/user/page', { params })
}

export function getUser(id: number) {
  return request.get(`/user/${id}`)
}

export function createUser(data: any) {
  return request.post('/user/create', data)
}

export function updateUser(id: number, data: any) {
  return request.put(`/user/${id}`, data)
}

export function toggleUserStatus(id: number) {
  return request.put(`/user/${id}/status`)
}

export function deleteUser(id: number) {
  return request.delete(`/user/${id}`)
}
