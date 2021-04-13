import { PERMISSION__GUEST } from '@/constants/router/router-permission';

export default [
    {
        path: '/guest/login',
        alias: '/login',
        name: 'guest-login',
        meta: {
            title: '用户登录',
            ...PERMISSION__GUEST
        },
        component: () => import('@/views/guest/guest-login')
    },
    {
        path: '/guest/register',
        name: 'guest-register',
        meta: {
            title: '用户注册',
            ...PERMISSION__GUEST
        },
        component: () => import('@/views/guest/guest-register')
    }
];