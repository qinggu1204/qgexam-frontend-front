/**
 * 路由权限管理工具函数
 */

// 全局前置路由守卫
import {useLoadingStore} from "@/store/loading.js";
import router from "@/router/index.js";
import teacher from '@/router/modules/teacher.js'
import {useUserStore} from "@/store/user.js";
import {message} from "ant-design-vue";
import 'ant-design-vue/es/message/style'
import student from "@/router/modules/student.js";
import {useRoleStore} from "@/store/role.js";
import {useResultStore} from "@/store/result.js";
import neteacher from "@/router/modules/neteacher.js";

const whiteList = ['/login', '/register', '/updatePassword', '/result'];

/**
 * 生成动态路由
 * @param role 角色权限数组
 */
function generateRoutes(role) {
    if (role.includes('neteacher') || role.includes('admin')) {
        neteacher.forEach(item => {
            router.addRoute(item);
        })
    }
    else if (role.includes('teacher')) {
        teacher.forEach(item => {
            router.addRoute(item);
        })
    }
    else if (role.includes('student')) {
        student.forEach(item => {
            router.addRoute(item);
        })
    }
 }

router.beforeEach(async (to, from) => {
    // 切换页面标题
    if (!to.meta.title) {
        document.title = import.meta.env.VITE_GLOB_APP_TITLE;
    }
    else if (document.title !== to.meta.title) {
        document.title = to.meta.title;
    }

    // 控制页面加载动画
    /*const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);*/
    
    
    // 需要鉴权的页面
    const userStore = useUserStore();
    const roleStore = useRoleStore();
    if (!userStore.token && to.meta && to.meta.requireAuth) {
        message.warn('您还未登录，请先登录！');
        return await router.push({name: 'login'});
    }

    // 动态生成路由
    if (roleStore.isEmpty() && !whiteList.includes(to.path)) {
        await userStore.GetUserInfo();
        generateRoutes(roleStore.role);
        return await router.push({...to, replace: true});
    }
    
    if (!to.matched || !to.matched.length) {
        const resultStore = useResultStore();
        resultStore.setResult(
            '404',
            '404',
            '很抱歉，您访问的页面不存在或暂无权限访问...',
            '返回主页',
            'dashboard'
        )
        return await router.push({name: 'result'});
    }
})

// 全局后置路由守卫
router.afterEach((to, from) => {
    /*setTimeout(() => {
        const loadingStore = useLoadingStore();
        loadingStore.setLoading(false);
    }, 1200)*/

    /*const loadingStore = useLoadingStore();
    loadingStore.setLoading(false);*/
})
