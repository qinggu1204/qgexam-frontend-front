/**
 * 教师路由
 */

export default [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/TeacherDashboard.vue'),
        // redirect: {name: 'examList'},
        meta: {
            title: '个人主页',
            requireAuth: true,
        },
        children: [
            // 教师个人信息
            {
                path: 'userinfo',
                name: 'userinfo',
                component: () => import('@/views/teacher/userinfo/TeacherInfo.vue'),
                meta: {
                    title: '个人信息',
                    requireAuth: true,
                }
            }
        ]
    },
]