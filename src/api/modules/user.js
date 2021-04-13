import request from '@/api/request';

// 用户信息
export const info = (config = {}) => request.get('/user/info', config);