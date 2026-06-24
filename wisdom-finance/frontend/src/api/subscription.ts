import request from './request'

// ============ 订阅服务 ============

export function getServices() {
  return request.get('/subscription/services')
}

export function getServiceById(id: number) {
  return request.get(`/subscription/service/${id}`)
}

export function createService(data: any) {
  return request.post('/subscription/service', data)
}

export function updateService(id: number, data: any) {
  return request.put(`/subscription/service/${id}`, data)
}

export function getUserSubscriptions() {
  return request.get('/subscription/user/list')
}

export function createSubscription(serviceId: number, data: any) {
  return request.post('/subscription/subscribe', data, { params: { serviceId } })
}

export function paySubscription(id: number) {
  return request.post(`/subscription/${id}/pay`)
}

export function cancelSubscription(id: number) {
  return request.post(`/subscription/${id}/cancel`)
}

export function renewSubscription(id: number) {
  return request.post(`/subscription/${id}/renew`)
}