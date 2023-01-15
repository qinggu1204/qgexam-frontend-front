/**
 * 用户公用模块
 */

export default [

    // 登录
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/user/login/Login.vue'),
        meta: {
            title: '用户登录',
        },
    },
    // 注册
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/user/register/Register.vue'),
        meta: {
            title: '注册',
        }
    },
    // 修改密码
    {
        path: '/updatePassword',
        name: 'updatePassword',
        component: () => import('@/views/user/updatePassword/UpdatePassword.vue'),
        meta: {
            title: '修改密码',
        }
    },
]