/**
 * CMS内容管理API
 */
import request from './request';
// ═══ 公开接口 ═══
/** 按分类获取已发布内容 */
export function getCmsByCategory(category) {
    return request.get(`/cms/public/category/${category}`);
}
/** 按类型标识获取单个内容 */
export function getCmsByType(type) {
    return request.get(`/cms/public/type/${type}`);
}
/** 获取全部已发布内容 */
export function getAllCmsPublic() {
    return request.get('/cms/public/all');
}
// ═══ 管理端接口 ═══
/** 获取全部内容（含草稿） */
export function getCmsList() {
    return request.get('/cms/admin/list');
}
/** 按分类获取（含草稿） */
export function getCmsListByCategory(category) {
    return request.get(`/cms/admin/list/${category}`);
}
/** 按ID获取 */
export function getCmsById(id) {
    return request.get(`/cms/admin/${id}`);
}
/** 按类型标识获取 */
export function getCmsByTypeAdmin(type) {
    return request.get(`/cms/admin/type/${type}`);
}
/** 创建 */
export function createCms(data) {
    return request.post('/cms/admin', data);
}
/** 更新 */
export function updateCms(id, data) {
    return request.put(`/cms/admin/${id}`, data);
}
/** 删除 */
export function deleteCms(id) {
    return request.delete(`/cms/admin/${id}`);
}
/** 分类选项 */
export const CATEGORY_OPTIONS = [
    { label: '平台服务', value: 'PLATFORM' },
    { label: '政策指南', value: 'POLICY' },
    { label: '关于我们', value: 'ABOUT' }
];
export function getCategoryLabel(category) {
    const map = { PLATFORM: '平台服务', POLICY: '政策指南', ABOUT: '关于我们' };
    return map[category] || category;
}
