/**
 * 基础路由模块
 */

export default [

    // 主页
    {
        path: '/',
        name: 'dashboard',
        component: import('@/views/dashboard/DashBoard.vue'),
        meta: {
            title: '个人主页',
        }
    }
]