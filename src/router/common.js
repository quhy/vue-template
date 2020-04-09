export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/error',
        name: 'error',
        component: () => import(/* webpackChunkName: "common" */ '../views/error/Error.vue'),
        meta: {
            title: '错误页',
            tabShow: false
        }
    },
    {
        path: '*',
        redirect: '/error'
    }
]
