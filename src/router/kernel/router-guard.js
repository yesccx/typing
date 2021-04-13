/*
 * 路由守卫
 *
 * @Created: 2021-03-26 23:03:12
 * @Author: yesc (yes.ccx@gmail.com)
 */
import Store from '@/store';
import { SetDocummentTitle } from '@/utils/common';
import NProgress from 'nprogress';
import * as RequestQueue from '@/api/queue';
import { PERMISSION__GUEST, PERMISSION__USER } from '@/constants/router/router-permission';

export default function (RouterInstance) {
    // 定义路由守卫-前置
    RouterInstance.beforeEach(async (to, from, next) => {
        RequestQueue.closeAll('路由变更，请求中断');

        if (to && from && to.name !== from.name) {
            NProgress.start();
            Store.commit('common/setPageLoading', true);
        }

        // 自动设置页面标题
        if (to.meta && to.meta.title) {
            SetDocummentTitle(to.meta.title);
        }

        // 初始化用户信息，基于该信息鉴权
        let userInfo = await Store.dispatch('userSession/init');
        if (to.meta.auth === PERMISSION__USER.auth && (!userInfo || userInfo.id <= 0)) {
            NProgress.done();
            Store.commit('common/setPageLoading', false);
            next({ name: 'guest-login', query: { r: to.fullPath } });
        } else if (to.meta.auth === PERMISSION__GUEST.auth && userInfo.id > 0) {
            NProgress.done();
            Store.commit('common/setPageLoading', false);
            next('/');
        } else {
            next();
        }
        next();
    });

    // 定义路由守卫-后置
    RouterInstance.afterEach(() => {
        Store.commit('common/setPageError', false);
        NProgress.done();
        Store.commit('common/setPageLoading', false);
    });
}