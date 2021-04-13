import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 遍历store模块列表，导入store（支持多级目录）
let storeCollection = {};
const storeFiles = require.context('@/store/modules', true, /\.js$/);
storeFiles.keys().forEach(key => {
    // 默认取文件名做为模块名
    let moduleName = storeFiles(key).default.moduleName;
    if (!moduleName) {
        let matchName = key.match(/([\w|-]+?)\.js$/);
        moduleName = (Array.isArray(matchName) && matchName[1]) ? matchName[1] : false;
    }

    if (moduleName) {
        storeCollection[moduleName] = storeFiles(key).default;
    }
});

export default new Vuex.Store({
    modules: storeCollection
});