import { PERMISSION__USER } from '@/constants/router/router-permission';

export default [
    {
        path: '/rooms',
        name: 'rooms',
        meta: {
            title: '房间列表',
            ...PERMISSION__USER
        },
        component: () => import('@/views/rooms')
    }
];