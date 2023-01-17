/**
 * 学生路由
 */

export default [
    // 学生主页
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/StudentDashboard.vue'),
        redirect: {name: 'examList'},
        meta: {
            title: '个人主页',
            requireAuth: true,
        },
        children: [
            // 考试列表
            {
                path: '',
                name: 'examList',
                component: () => import('@/views/student/exam/examList/ExamList.vue'),
                meta: {
                    title: '个人主页',
                    requireAuth: true,
                }
            },
            // 学生个人信息，需要和教师的个人信息区分开
            {
                path: 'userinfo',
                name: 'userinfo',
                component:  () => import('@/views/student/userinfo/StudentInfo.vue'),
                meta: {
                    title: '个人信息',
                    requireAuth: true,
                }
            },
            // 课程列表
            {
                path: 'course',
                name: 'courseList',
                component: () => import('@/views/student/course/courseList/CourseList.vue'),
                meta: {
                    title: '课程',
                    requireAuth: true,
                }
            },
        ]
    },
    // 试卷详情
    {
        path: '/exam/:examinationId',
        name: 'exam',
        component: () => import('@/views/student/exam/examDetail/ExamDetail.vue'),
        props: true,
        meta: {
            title: '考试详情',
            requireAuth: true,
        },
    },
    // 课程详情
    {
        path: '/course/:courseId',
        name: 'course',
        component: () => import('@/views/student/course/courseDetail/CourseDetail.vue'),
        props: true,
        meta: {
            title: '课程详情',
            requireAuth: true,
        }
    },
    // 错题集
    {
        path: '/errorSet/:courseId',
        name: 'errorSet',
        component: () => import('@/views/student/course/errorSet/ErrorSet.vue'),
        props: true,
        meta: {
            title: '错题集',
            requireAuth: true,
        }
    },
    // 人脸录入
    {
        path: '/faceRegistration',
        name: 'faceRegistration',
        component: () => import('@/views/face/FaceRegistration.vue'),
        meta: {
            title: '人脸录入',
            requireAuth: true,
        }
    },
    // 人脸比对
    {
        path: '/faceSearch',
        name: 'faceSearch',
        component: () => import('@/views/face/FaceSearch.vue'),
        meta: {
            title: '人脸比对',
            requireAuth: true,
        }
    }
]