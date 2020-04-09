export default [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "sign" */ '../views/login/Login.vue'),
        meta: {
            title: '登录',
            tabShow: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "sign" */ '../views/register/Register.vue'),
        meta: {
            title: '注册',
            tabShow: false
        }
    }
]
