import {createRouter, createWebHashHistory} from "vue-router";
import {useLoadingStore} from "@/store/loading.js";

// 批量引入modules
const modules = import.meta.glob('./modules/*.js',{eager: true});
// 原始路由
const routes = [];

Object.keys(modules).forEach(key => {
    routes.push(...modules[key].default);
})

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routes,
    scrollBehavior: () => ({
        left: 0, top: 0,
        behavior: 'smooth',
    })
})


export default router;