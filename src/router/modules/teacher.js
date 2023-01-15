/**
 * 教师路由
 */

export default [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/TeacherDashboard.vue'),
        redirect: {name: 'courseList'},
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
            // 教师课程列表
            {
                path: '',
                name: 'courseList',
                component: () => import('@/views/teacher/course/CourseList.vue'),
                meta: {
                    title: '个人主页',
                    requireAuth: true,
                }
            },
            // 阅卷任务列表
            {
                path: 'task',
                name: 'taskList',
                component: () => import('@/views/teacher/task/TaskList.vue'),
                meta: {
                    title: '阅卷任务',
                    requireAuth: true,
                }
            },
            // 监考列表（假）
            {
                path: 'monitor',
                name: 'monitorList',
                component: () => import('@/views/teacher/monitor/Monitor.vue'),
                meta: {
                    title: '监考列表',
                    requireAuth: true,
                }
            }
        ]
    },
    // 课程详情
    {
        path: '/course/:courseId',
        name: 'course',
        component: () => import('@/views/teacher/course/CourseDetail.vue'),
        props: true,
        meta: {
            title: '课程详情',
            requireAuth: true,
        }
    },
    // 答卷列表
    {
        path: '/task/:examinationId',
        name: 'task',
        component: () => import('@/views/teacher/task/TaskDetail.vue'),
        props: true,
        meta: {
            title: '答卷列表',
            requireAuth: true,
        }
    },
    // 阅卷页面
    {
        path: '/mark/:answerPaperId',
        name: 'mark',
        component: () => import('@/views/teacher/mark/Mark.vue'),
        props: true,
        meta: {
            title: '阅卷',
            requireAuth: true,
        }
    }
]