/*
 * 用户登录会话
 *
 * @Created: 2021-04-12 15:22:56
 * @Author: yesc (yes.ccx@gmail.com)
 */

import DataStore, { KEYS as STORE_KEYS } from '@/utils/datastore';
import ApiCollection from '@/utils/collection/api-collection';

const state = {
    id: 0,
    nickname: '',
    reg_time: '',
    headimg: {
        remote_url: ''
    },
    inited: false,
    session: {
        token: '',
        exp: 0
    }
};

const getters = {
    userInfo: state => ({
        id: state.id,
        nickname: state.nickname,
        headimg_url: state.headimg.remote_url
    }),
    token: state => state.session.token
};

const mutations = {
    // 设置用户会话信息(token)
    setSession(state, { token = '', exp = 0 }) {
        state.session.token = token;
        state.session.exp = exp;

        // 缓存token
        DataStore.put(STORE_KEYS.USER_SESSION, { token, exp });
    },
    // 设置用户信息
    setUserinfo(state, { id = 0, nickname = '', headimg = {} }) {
        state.id = id;
        state.nickname = nickname;
        state.headimg = headimg;
    },
    // 更新用户昵称
    updateNickname(state, nickname) {
        state.nickname = nickname;
    },
    // 设置初始化状态
    setInited(state, { status = true }) {
        state.inited = status;
    }
};

const actions = {
    // 初始化用户会话信息
    async init({ commit, dispatch, state, getters }) {
        if (state.inited) {
            return getters.userInfo;
        }

        // 从缓存中读取token
        const storeSession = DataStore.get(STORE_KEYS.USER_SESSION, false);
        if (storeSession && storeSession.token) {
            commit('setSession', storeSession);
        }

        // 获取用户信息
        const userInfo = await dispatch('initUserInfo');
        if (userInfo) {
            commit('setUserinfo', userInfo);
            commit('setInited', { status: true });
        }
        return userInfo;
    },
    // 初始化用户信息
    async initUserInfo() {
        let userInfo = false;
        await ApiCollection.user.info({ ignoreAuth: true, reportError: true }).then(({ data }) => {
            data.id = data.id || 0;
            userInfo = data;
        }).catch(() => { });
        return userInfo;
    },
    // 退出登录
    async logout({ commit }) {
        let res = false;
        await ApiCollection.v1.UserLogout().then(() => {
            commit('setSession', {});
            commit('setInited', { status: false });
            res = true;
        });
        return res;
    },
    // 清除会话
    clearSession({ commit }) {
        commit('setSession', {});
        commit('setInited', { status: false });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'userSession',
    namespaced: true
};