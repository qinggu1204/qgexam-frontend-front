/**
 * 路由权限管理工具函数
 */

// 全局前置路由守卫
import {useLoadingStore} from "@/store/loading.js";
import router from "@/router/index.js";
import {useUserStore} from "@/store/user.js";
import {storeToRefs} from "pinia";
import {message} from "ant-design-vue";
import 'ant-design-vue/es/message/style'

router.beforeEach((to, from, next) => {
    // 切换页面标题
    if (!to.meta.title) {
        document.title = import.meta.env.VITE_GLOB_APP_TITLE;
    }
    else if (document.title !== to.meta.title) {
        document.title = to.meta.title;
    }

    // 控制页面加载动画
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);

    // 检查页面是否需要登录才能访问
    if (to.meta && to.meta.requireAuth) {
        const userStore = useUserStore();
        const {token} = storeToRefs(userStore);
        if (!token.value) {
            message.warn('您还未登录，请先登录！');
            next('/login');
        }
    }
    
    next();
})

// 全局后置路由守卫
router.afterEach((to, from) => {
    setTimeout(() => {
        const loadingStore = useLoadingStore();
        loadingStore.setLoading(false);
    }, 1200)

})
