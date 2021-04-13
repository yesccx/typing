import router from '@/router';

const routeLink = (name, query = {}, options = {}) => {
    const type = options.is_replace ? 'replace' : 'push';
    return router[type]({ name, query });
};

// 前往用户登录页
export const RouterLinkGuestLogin = (query = {}, options = {}) => {
    routeLink('guest-login', query, options);
};

// 前往用户注册页
export const RouterLinkGuestRegister = (query = {}, options = {}) => {
    routeLink('guest-register', query, options);
};

// 前往首页
export const RouterLinkHome = (query = {}, options = {}) => {
    routeLink('/', query, options);
};