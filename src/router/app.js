import panel from "./app/panel";
export default [
    {
        path: '/app',
        name: 'app',
        component: () => import('../layout/AppLayout.vue'),
        redirect: '/app/panel',
        children: [
            ...panel,   // 首页
        ]
    }
]
