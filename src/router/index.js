import {createRouter, createWebHashHistory} from "vue-router";
import user from "@/router/modules/user.js";
import basic from "@/router/modules/basic.js";
import result from "@/router/modules/result.js";
import {useLoadingStore} from "@/store/loading.js";

const routes = [
    ...result,
    ...basic,
    ...user,
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routes,
    scrollBehavior: () => ({
        left: 0, top: 0,
        behavior: 'smooth',
    })
})

// 全局前置路由守卫
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
    }, 1500)
})

export default router;