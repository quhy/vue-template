import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData: {},
        collapse: false    // 左侧导航菜单折叠
    },
    mutations: {
        setCollapse(state) {
            state.collapse = !state.collapse;
        },
        setUserData(state) {
            state.userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
        },
    },
    actions: {}
})
