import { PERMISSION__USER } from '@/constants/router/router-permission';

export default [
    {
        path: '/',
        name: 'typing',
        meta: {
            title: '工作台',
            ...PERMISSION__USER
        },
        component: () => import('@/views/home.vue')
    },
    {
        path: '/error',
        name: 'error',
        meta: {
            title: '404',
            header: false
        },
        component: () => import('@/views/common/404.vue')
    },
    {
        path: '*',
        redirect: { name: 'error' }
    }
];