/*
 * typing-pvp-information
 *
 * @Created: 2020-09-05 19:03:18
 * @Author: yesc (yes.ccx@gmail.com)
 */

const state = {
    pvpId: 0,
    startTime: 0,
    endTime: 0,
    currentTime: 0
};

const getters = {
    pvpInformation(state) {
        return {
            pvpId: state.pvpId,
            startTime: state.startTime,
            endTime: state.endTime,
            currentTime: state.currentTime
        };
    }
};

const mutations = {
    // 设置pvpId
    setPvpId(state, pvpId) {
        state.pvpId = pvpId;
    },
    // 设置开始时间
    setStartTime(state, startTime) {
        state.startTime = startTime;
    },
    // 设置结束时间
    setEndTime(state, endTime) {
        state.endTime = endTime;
    },
    // 设置当前时间
    setCurrentTime(state, currentTime) {
        state.currentTime = currentTime;
    }
};

const actions = {
    // 初始化信息
    initInformation({ commit }, { pvpId, startTime = 0, endTime = 0 }) {
        commit('setPvpId', pvpId);
        commit('setStartTime', startTime);
        commit('setEndTime', endTime);

        setInterval(() => {
            commit('setCurrentTime', Date.now());
        }, 500);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'typingPvpInformation',
    namespaced: true
};