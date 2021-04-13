const state = {
    startTime: 0,
    currentTime: 0,
    status: 0,
    targetContent: '',
    currentContent: ''
};

let playTimerIndex = 0;

const getters = {
    // 每分钟字数（已完成字数 / 已过分钟数）
    playSpeed(state) {
        return state.status > 0 ? parseInt(state.currentContent.length / Math.max((state.currentTime - state.startTime) / 1000 / 60, 0.01)) : 0;
    },
    // 完成度 （已完成字数 / 总字数）
    playProgress(state) {
        return state.status > 0 ? Math.min(parseInt(state.currentContent.length / state.targetContent.length * 100), 100) : 0;
    },
    // 游戏进行中的信息
    playInfo(state, getters) {
        return {
            speed: getters.playSpeed,
            progress: getters.playProgress,
            targetNum: state.targetContent.length,
            currentNum: state.currentContent.length,
            status: state.status
        };
    },
    // 游戏进行时间
    playTime(state) {
        return Math.max(parseInt((state.currentTime - state.startTime) / 1000), 0);
    }
};

const mutations = {
    // 设置目标内容
    setTargetContent(state, content) {
        state.targetContent = content;
    },
    // 设置当前内容
    setCurrentContent(state, content) {
        state.currentContent = content;
    },
    // 设置当前时间
    setCurrentTime(state, time) {
        state.currentTime = time;
    },
    // 设置开始时间
    setStartTime(state, time) {
        state.startTime = time;
    },
    // 设置游戏状态
    setPlayStatus(state, status) {
        state.status = status;
    }
};

const actions = {
    // 初始化游戏
    initPlay({ commit, state }, { content }) {
        commit('setTargetContent', content);
    },
    // 开始游戏
    startPlay({ commit, state }) {
        if (state.status !== 0) {
            return false;
        }

        commit('setPlayStatus', 1);
        commit('setStartTime', Date.now());

        // 监测打字频率
        playTimerIndex = setInterval(() => {
            commit('setCurrentTime', Date.now());
        }, 1000);
    },
    // 暂停游戏
    pausePlay() {
        clearInterval(playTimerIndex);
    },
    // 结束游戏
    endPlay({ commit, state }) {
        if (state.status !== 1) {
            return false;
        }

        commit('setPlayStatus', 2);
        clearInterval(playTimerIndex);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'typingPlay',
    namespaced: true
};