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
            // 考试列表
            {
                path: 'exam',
                name: 'examList',
                component: () => import('@/views/neteacher/exam/ExamList.vue'),
                meta: {
                    title: '考试列表',
                    requireAuth: true,
                }
            },
            // 课程列表
            {
                path: 'course',
                name: 'courseList',
                component: () => import('@/views/neteacher/course/CourseList.vue'),
                meta: {
                    title: '课程列表',
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
    },
    // 课程详情
    {
        path: '/course/:courseId',
        name: 'course',
        component: () => import('@/views/neteacher/course/CourseDetail.vue'),
        props: true,
        meta: {
            title: '课程详情',
            requireAuth: true,
        }
    },
    // 创建试卷
    {
        path: '/createPaper',
        name: 'createPaper',
        component: () => import('@/views/neteacher/paper/CreatePaper.vue'),
        meta: {
            title: '创建试卷',
            requireAuth: true,
        }
    },
    // 排考详情
    {
        path: '/arrange/:examinationId',
        name: 'arrange',
        component: () => import('@/views/neteacher/exam/InvigilationInfo.vue'),
        props: true,
        meta: {
            title: '排考详情',
            requireAuth: true,
        }
    },
]