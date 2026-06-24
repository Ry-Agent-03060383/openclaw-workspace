import request from './request'

/** 核心服务聚合数据 DTO */
export interface CoreServiceDTO {
  services: ServiceItem[]
  recommendedProducts: BankProductBrief[]
  totalFinancingAmount: number
  matchSuccessRate: number
  creditDistribution: CreditDistribution
  riskOverview: RiskOverview
  aiStats: AiServiceStats
  mobileStats: MobileStats
  securityStats: SecurityStats
}

export interface ServiceItem {
  id: string
  title: string
  summary: string
  icon: string
  color: string
  route: string
  badge: string
  order: number
}

export interface BankProductBrief {
  id?: number
  bankName: string
  productName: string
  minAmount?: number
  maxAmount?: number
  rateRange: string
  termMonths?: number
  guaranteeType?: string
  features?: string
  matchScore: number
}

export interface CreditDistribution {
  totalEvaluated: number
  excellent: number
  good: number
  fair: number
  poor: number
}

export interface RiskOverview {
  totalMonitored: number
  activeWarnings: number
  avgRiskScore: number
  trendLabel: string
}

export interface AiServiceStats {
  totalSessions: number
  online: boolean
  answerRate: string
}

export interface MobileStats {
  wechatMiniApp: string
  appName: string
  dailyUsers: number
  coverageRate: string
}

export interface SecurityStats {
  encryptionLevel: string
  certification: string
  passedAudit: boolean
  zeroIncidentDays: number
}

/** 获取核心服务聚合数据（公开） */
export function fetchCoreServices(): Promise<CoreServiceDTO> {
  return request.get('/core-services').then((res: any) => res.data)
}
