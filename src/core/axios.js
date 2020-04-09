import axios from 'axios';
import Vue from 'vue';
import router from "../router";
import Cookies from 'js-cookie';
import {Message} from 'element-ui';
import {Notification} from 'element-ui';
import qs from 'qs';
// 请求拦截器
axios.interceptors.request.use(config => {
    console.log(config);
    if (config.url.indexOf('v3/geocode/geo') > -1) {
        config.baseURL = Vue.prototype.mapURL;
    } else {
        config.baseURL = Vue.prototype.baseURL;
        config.headers.Authorization = 'Bearer ' + Cookies.get('token');
    }
    if (config.method === 'get') {
        //如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
        config.paramsSerializer = params => qs.stringify(params, {arrayFormat: 'repeat'});
    }
    return config;
}, error => {
    return Promise.reject(error);
});
// 响应拦截器
axios.interceptors.response.use(response => {
    //cookies中存入token
    if (response.headers.token) {
        Cookies.set('token', response.headers.token);
    }
    return response;
}, error => {
    // 对响应错误做点什么
    if (error.response && error.response.status === 401) {
        Message.warning('需要权限');
        router.push('/login');
    } else {
        // 自定义
        if (error.response && error.response.status === 401 && error.response.data.message === 'used and cannot be deleted') {
            Message.warning('抱歉该数据已使用，不可删除');
        } else if (error.response.data.message === 'file does not exist') {
            console.log('123');
        } else if (error.response.data.message === 'incorrect username or password') {
            Message.warning('账号或密码错误');
        } else if (error.response.data.message.indexOf('Duplicate') !== -1) {
            Message.warning('该账号已存在，不可重复添加');
        } else if (error.response.data.message === 'Name already exists') {
            Message.warning('该公司已存在，不可重复添加');
        } else if (error.response.data.message === 'used and cannot be deleted') {
            Message.warning('该数据已被使用，不可删除');
        } else {
            Message.warning('网络异常，请稍后再试！');
        }

    }
    return Promise.reject(error);
});

export default axios;
