/**
 * 教务教师路由
 */

export default [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/NeteacherDashboard.vue'),
        redirect: {name: 'paperList'},
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
            },
            // 试卷列表
            {
                path: '',
                name: 'paperList',
                component: () => import('@/views/neteacher/paper/PaperList.vue'),
                meta: {
                    title: '个人主页',
                    requireAuth: true,
                }
            },
        ]
    },
    // 预览试卷
    {
        path: '/paper/:examinationPaperId',
        name: 'paper',
        component: () => import('@/views/neteacher/paper/PaperDetail.vue'),
        props: true,
        meta: {
            title: '预览试卷',
            requireAuth: true,
        }
    },
    // 发布考试
    {
        path: '/createExam/:examinationPaperId',
        name: 'createExam',
        component: () => import('@/views/neteacher/paper/CreateExam.vue'),
        props: true,
        meta: {
            title: '创建考试',
            requireAuth: true,
        }
    }
]