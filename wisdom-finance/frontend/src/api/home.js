import request from './request';
/** 获取首页公开统计数据 */
export function getHomeStats() {
    return request.get('/home/stats');
}
