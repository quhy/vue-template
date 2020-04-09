export default [
    {
        path: 'panel',
        name: 'panel',
        component: () => import(/* webpackChunkName: "panel" */ '../../views/app/panel/Panel.vue'),
        meta: {
            title: '首页',
            tabShow: true,
            requiresAuth: true
        }
    }
]
