/*
 * 路由入口（初始化）
 *
 * @Created: 2021-03-26 23:03:12
 * @Author: yesc (yes.ccx@gmail.com)
 */

import Vue from 'vue';
import Router from 'vue-router';
import RouterGuard from '@/router/kernel/router-guard';
import RouterCollector from '@/router/kernel/router-collector';

Vue.use(Router);

// 初始化路由实例
const RouterInstance = new Router({ mode: 'hash' });

// 路由收集
RouterCollector(RouterInstance);

// 路由守卫
RouterGuard(RouterInstance);

export default RouterInstance;