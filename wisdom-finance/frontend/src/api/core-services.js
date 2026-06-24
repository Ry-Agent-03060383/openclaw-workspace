import request from './request';
/** 获取核心服务聚合数据（公开） */
export function fetchCoreServices() {
    return request.get('/core-services').then((res) => res.data);
}
