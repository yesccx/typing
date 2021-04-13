/*
 * 路由收集
 *
 * @Created: 2021-03-26 23:03:12
 * @Author: yesc (yes.ccx@gmail.com)
 */

export default function (RouterInstance) {
    let routerCollection = [];
    const routerFiles = require.context('@/router/modules', false, /\.js$/);
    routerFiles.keys().forEach(filename => {
        routerCollection = routerCollection.concat(routerFiles(filename).default);
    });

    routerCollection.forEach(function (router) {
        RouterInstance.addRoute(router);
    });
}