/*
 * 应用初始化
 *
 * @Created: 2021-03-26 21:00:12
 * @Author: yesc (yes.ccx@gmail.com)
 */

import Vue from 'vue';
import '@/plugins/element';
import '@/plugins/normalize';
import '@/plugins/nprogress';
import ApiCollection from '@/utils/collection/api-collection';
import LinkCollection from '@/utils/collection/link-collection';
import Utils from '@/utils/common';
import Tip from '@/utils/tip';
import Request from '@/api/request';
import VueSocketIO from 'vue-socket.io';

// 初始化配置
Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
    debug: true,
    // 服务器端地址
    connection: 'localhost:9672/typing',
    options: {
        autoConnect: false,
        transports: ['websocket'],
        useConnectionNamespace: true,
        namespaceName: 'typing'
    }
}));

// NProgress.configure({ showSpinner: false });

// 初始化挂载
const _initMount = () => {
    // 封装的axios
    Vue.prototype.$request = Request;

    // api接口集合
    Vue.prototype.$api = ApiCollection;

    // router页面跳转集合
    Vue.prototype.$link = LinkCollection;

    // 公共的工具类集合
    Vue.prototype.$utils = Utils;

    // 公共的内容提示工具
    Vue.prototype.$tip = Tip;

    // Vue.prototype.$fullLoading = new Utils.FullLoading();
};

// // 初始化全局过滤器
// const _initGlobalFilters = () => {
//     Vue.filter('dateFormat', (val, format = '') => {
//         return Utils.DateFormat(val, format);
//     });
// };

const init = () => {
    // 初始化挂载
    _initMount();

    // 初始化全局过滤器
    // _initGlobalFilters();

    // 初始化用户会话期间的配置参数
    // Store.dispatch('global/initUseSessionConfig');
};
init();