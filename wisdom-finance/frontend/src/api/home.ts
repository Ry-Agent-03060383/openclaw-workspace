import request from './request'

/** 首页统计数据项 */
export interface HomeStatItem {
  label: string
  value: number
  suffix: string
}

/** 首页动态项 */
export interface HomeActivityItem {
  tag: string
  text: string
}

/** 首页统计数据 */
export interface HomeStats {
  stats: HomeStatItem[]
  activities: HomeActivityItem[]
}

/** 获取首页公开统计数据 */
export function getHomeStats() {
  return request.get<HomeStats>('/home/stats')
}
