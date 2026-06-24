import request from './request'

export function aiChat(message: string) {
  return request.post('/ai/chat', { message })
}

export function searchPolicy(keyword: string) {
  return request.post('/ai/policy/search', { keyword })
}

export function loanConsult(amount: string, term: string) {
  return request.post('/ai/loan/consult', { amount, term })
}

export function analyzeEnterprise(enterpriseName: string) {
  return request.post('/ai/analyze/enterprise', { enterpriseName })
}

export function analyzeMarket() {
  return request.post('/ai/analyze/market')
}
