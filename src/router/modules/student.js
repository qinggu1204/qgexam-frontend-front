/**
 * 学生路由
 */

export default [
    // 学生主页
    {
        path: '/',
        name: 'dashboard',
        component: import('@/views/dashboard/StudentDashboard.vue'),
        redirect: {name: 'examList'},
        meta: {
            title: '个人主页',
            requireAuth: true,
        },
        children: [
            // 试卷列表
            {
                path: '',
                name: 'examList',
                component: import('@/views/student/examList/ExamList.vue'),
                meta: {
                    title: '个人主页',
                }
            },
            // 学生个人信息，需要和教师的个人信息区分开
            {
                path: 'userinfo',
                name: 'userinfo',
                component: import('@/views/student/userinfo/StudentInfo.vue'),
                meta: {
                    title: '个人信息',
                }
            }
        ]
    },
    // 试卷详情
    {
        path: '/exam/:examinationId',
        name: 'exam',
        component: import('@/views/student/examDetail/ExamDetail.vue'),
        props: true,
        meta: {
            title: '考试详情',
            requireAuth: true,
        },
    },
    
]