/*
 * request接口集合
 *
 * @Created: 2021-04-12 09:55:12
 * @Author: yesc (yes.ccx@gmail.com)
 */

import _ from 'lodash';

const ApiCollection = {};
const apiFiles = require.context('@/api/modules', true, /\.js$/);

// apiCall 处理器
// PS: 可以修改该函数 做api request/repsonse hook
const apiCallHandler = (apiCall) => (param = {}, conf = {}) => {
    return apiCall(param, conf);
};

// 遍历api文件，收集apiCall
apiFiles && apiFiles.keys().forEach(key => {
    // 提取模块(api)文件信息
    const fileinfo = key.match(/^\.\/(.+)\.js$/);
    if (!fileinfo) {
        return true;
    }

    // 获取模块名
    const moduleName = _.camelCase(fileinfo[1]);

    // 收集当前模块下的接口
    ApiCollection[moduleName] = ApiCollection[moduleName] || {};
    const moduleApiCollection = {};
    _.forEach(apiFiles(key), function (apiCall, name) {
        if (!name) {
            return true;
        }

        const apiName = name.replace(/^axios/, '');
        moduleApiCollection[apiName] = apiCallHandler(apiCall);
    });
    ApiCollection[moduleName] = moduleApiCollection;
});

export default ApiCollection;