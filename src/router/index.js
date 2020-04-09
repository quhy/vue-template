import Vue from 'vue';
import Router from 'vue-router';
import sign from './sign';
import common from "./common";
import app from "./app";

// 使用路由插件
Vue.use(Router);

// 路由列表
const routes = [
    ...common,  // 通用
    ...sign,    // 登录，注册
    ...app  // App
];

export default new Router({
    routes
})
