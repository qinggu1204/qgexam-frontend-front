/**
 * 路由权限管理工具函数
 */

// 全局前置路由守卫
import {useLoadingStore} from "@/store/loading.js";
import router from "@/router/index.js";

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
    next()
})

// 全局后置路由守卫
router.afterEach((to, from) => {
    setTimeout(() => {
        const loadingStore = useLoadingStore();
        loadingStore.setLoading(false);
    }, 1200)
})
