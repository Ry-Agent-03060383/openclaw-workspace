import request from './request'

export function getMyLoans() {
  return request.get('/loan/my')
}

export function getAllLoans() {
  return request.get('/loan/list')
}

export function getPendingLoans() {
  return request.get('/loan/pending')
}

export function applyLoan(data: any) {
  return request.post('/loan/apply', data)
}

export function approveLoan(id: number) {
  return request.post(`/loan/${id}/approve`)
}

export function rejectLoan(id: number, reason: string) {
  return request.post(`/loan/${id}/reject?reason=${encodeURIComponent(reason)}`)
}

export function getBankProducts() {
  return request.get('/bank/products')
}
