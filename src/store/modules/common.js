/*
 * 全局状态
 *
 * @Created: 2020-09-01 22:28:43
 * @Author: yesc (yes.ccx@gmail.com)
 */

import DataStore, { KEYS as STORE_KEYS } from '@/utils/datastore';

const state = {
    pageLoading: false, // 根级页面loading状态
    pageError: false, // 根级页面错误状态
    userSessionConfig: {} // 用户会话期间的配置参数
};

const getters = {};

const mutations = {
    // 设置根级页面错误状态
    setPageError(state, pageError = false) {
        state.pageError = pageError;
    },
    // 设置用户会话期间的配置参数
    setUserSessionConfig(state, config) {
        state.userSessionConfig = config;
    },
    // 设置根级页面loading状态
    setPageLoading(state, status) {
        state.pageLoading = status;
    }
};

const actions = {
    // 初始化用户会话期间的配置参数
    initUseSessionConfig({ commit }) {
        commit('setUserSessionConfig', DataStore.get(STORE_KEYS.USER_SESSION_CONFIG, {}));
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'common',
    namespaced: true
};