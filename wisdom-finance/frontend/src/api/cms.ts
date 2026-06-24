/**
 * CMS内容管理API
 */
import request from './request'

export interface CmsMetaItem {
  key: string
  value: string
}

export interface CmsRelatedItem {
  label: string
  link: string
}

export interface CmsContentItem {
  id?: number
  category: string
  type: string
  title: string
  subtitle: string
  icon: string
  summary: string
  body: string[]
  meta: CmsMetaItem[]
  related: CmsRelatedItem[]
  sortOrder: number
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface CmsRequest {
  category: string
  type: string
  title: string
  subtitle: string
  icon: string
  summary: string
  body: string[]
  meta: CmsMetaItem[]
  related: CmsRelatedItem[]
  sortOrder: number
  status: string
}

// ═══ 公开接口 ═══

/** 按分类获取已发布内容 */
export function getCmsByCategory(category: string) {
  return request.get<CmsContentItem[]>(`/cms/public/category/${category}`)
}

/** 按类型标识获取单个内容 */
export function getCmsByType(type: string) {
  return request.get<CmsContentItem>(`/cms/public/type/${type}`)
}

/** 获取全部已发布内容 */
export function getAllCmsPublic() {
  return request.get<CmsContentItem[]>('/cms/public/all')
}

// ═══ 管理端接口 ═══

/** 获取全部内容（含草稿） */
export function getCmsList() {
  return request.get<CmsContentItem[]>('/cms/admin/list')
}

/** 按分类获取（含草稿） */
export function getCmsListByCategory(category: string) {
  return request.get<CmsContentItem[]>(`/cms/admin/list/${category}`)
}

/** 按ID获取 */
export function getCmsById(id: number) {
  return request.get<CmsContentItem>(`/cms/admin/${id}`)
}

/** 按类型标识获取 */
export function getCmsByTypeAdmin(type: string) {
  return request.get<CmsContentItem>(`/cms/admin/type/${type}`)
}

/** 创建 */
export function createCms(data: CmsRequest) {
  return request.post<CmsContentItem>('/cms/admin', data)
}

/** 更新 */
export function updateCms(id: number, data: CmsRequest) {
  return request.put<CmsContentItem>(`/cms/admin/${id}`, data)
}

/** 删除 */
export function deleteCms(id: number) {
  return request.delete<void>(`/cms/admin/${id}`)
}

/** 分类选项 */
export const CATEGORY_OPTIONS = [
  { label: '平台服务', value: 'PLATFORM' },
  { label: '政策指南', value: 'POLICY' },
  { label: '关于我们', value: 'ABOUT' }
]

export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = { PLATFORM: '平台服务', POLICY: '政策指南', ABOUT: '关于我们' }
  return map[category] || category
}
