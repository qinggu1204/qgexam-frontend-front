import {createRouter, createWebHistory} from "vue-router";
import user from "@/router/modules/user.js";
import result from "@/router/modules/result.js";

// 批量引入modules
// const modules = import.meta.glob('./modules/*.js',{eager: true});

// 原始路由
const routes = [...user, ...result];

/*Object.keys(modules).forEach(key => {
    routes.push(...modules[key].default);
})*/

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    scrollBehavior: () => ({
        left: 0, top: 0,
        behavior: 'smooth',
    })
})

export default router;