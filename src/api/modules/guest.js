import request from '@/api/request';

// 用户账号登录
export const login = (params = {
    username: '', password: ''
}, config = {}) => request.post('/guest/login', params, config);

// 用户账号注册
export const register = (params = {
    username: '', password: '', email: ''
}, config = {}) => request.post('/guest/register', params, config);