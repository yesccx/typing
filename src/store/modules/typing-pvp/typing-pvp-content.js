/*
 * typing-pvp-content
 *
 * @Created: 2020-09-05 19:03:18
 * @Author: yesc (yes.ccx@gmail.com)
 */

const state = {
    contentId: 0,
    content: ''
};

const getters = {
    pvpContent(state) {
        return {
            contentId: state.contentId,
            content: state.content
        };
    }
};

const mutations = {
    // 设置内容
    setContent(state, content) {
        state.content = content;
    },
    // 设置内容id
    setContentId(state, contentId) {
        state.contentId = contentId;
    }
};

const actions = {
    // 初始化内容
    initContent({ commit }, { contentId, content }) {
        commit('setContentId', contentId);
        commit('setContent', content);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    moduleName: 'typingPvpContent',
    namespaced: true
};