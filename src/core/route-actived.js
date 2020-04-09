import router from "../router";
import Cookies from 'js-cookie'
import {Message} from 'element-ui';

// 启用路由拦截
router.beforeEach((to, from, next) => {
    //没有此路由则报错
    // if (to.path === '/error') {
    //     Message.warning('没有此路由');
    //     next(from.path);
    //     return;
    // }
    // //路由发生变化修改页面title
    // if (to.meta.title) {
    //     document.title = to.meta.title;
    // }
    // //Cookies没有token跳转登录
    // let user = JSON.parse(localStorage.getItem('user'));
    // if (to.meta.requiresAuth === true) {
    //     if (Cookies.get('token') && user) {
    //         next();
    //     } else {
    //         Message.warning('请先登录');
    //         next('/login');
    //     }
    // } else {
        next();
    // }
});



