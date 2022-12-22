import {createApp} from 'vue'
import App from './App.vue'
// 自定义主题
import './global.less'
// pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// vue-router
import router from "@/router/index.js";
// 路由守卫
import '@/utils/permission'
// Ant Design Vue Config Provider
import { ConfigProvider } from 'ant-design-vue';


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);
app.config.warnHandler = () => null;
app.use(pinia);
app.use(router);
app.use(ConfigProvider);
app.mount('#app');

