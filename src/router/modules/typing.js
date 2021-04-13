import { PERMISSION__USER } from '@/constants/router/router-permission';

export default [
    {
        path: '/typing/pvp',
        name: 'typing-pvp',
        meta: {
            title: '用户登录',
            ...PERMISSION__USER
        },
        component: () => import('@/views/typing/typing-pvp')
    },
    {
        path: '/typing/home',
        name: 'typing-home',
        meta: {
            title: '用户登录',
            ...PERMISSION__USER
        },
        component: () => import('@/views/typing/typing-home')
    }
];