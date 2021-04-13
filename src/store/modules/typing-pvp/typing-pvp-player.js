/*
 * typing-pvp-player
 *
 * @Created: 2020-09-05 19:03:18
 * @Author: yesc (yes.ccx@gmail.com)
 */

import TypingPvpPlayerClass from '@/views/typing/utils/typing-pvp-player.class';
import Vue from 'vue';
import { Input } from '@/utils/common';
import _ from 'lodash';

const state = {
    playerCollection: {}
};

const getters = {
    currentPlayer(state) {
        const uid = Input('uid');
        return state.playerCollection[uid];
    }
};

const mutations = {
    // 添加参与者
    addPlayer(state, playerInfo) {
        const player = new TypingPvpPlayerClass(playerInfo);
        Vue.set(state.playerCollection, player.uid, player.toObject());
    },
    // 获取参与者
    getPlayer(state, uid) {
        return state.playerCollection[uid];
    },
    // 移除参与者
    removePlayer(state, uid) {
        Vue.delete(state.playerCollection, uid);
    },
    // 设置参与者pvp开始时间
    setPlayerPvpStartTime(state, { uid, time = 0 }) {
        state.playerCollection[uid].pvpStartTime = time || Date.now();
    },
    // 设置参与者pvp结束时间
    setPlayerPvpEndTime(state, { uid, time = 0 }) {
        state.playerCollection[uid].pvpEndTime = time || Date.now();
    },
    // 设置参与者pvp输入字数
    setPlayerPvpInputCount(state, { uid, count = 0 }) {
        state.playerCollection[uid].pvpInputCount = count;
    },
    // 设置参与者pvp错误索引集
    setPlayerPvpErrorIndexCollection(state, { uid, pvpErrorIndexCollection = [] }) {
        state.playerCollection[uid].pvpErrorIndexCollection = pvpErrorIndexCollection;
    }
};

const actions = {
    // 初始化参与者
    initPlayers({ commit }, players) {
        _.forEach(players, (player) => {
            commit('addPlayer', player);
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'typingPvpPlayer',
    namespaced: true
};