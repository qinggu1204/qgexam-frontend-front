import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// ant design vue
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [AntDesignVueResolver()]
        })
    ],
    resolve: {
        // 配置路径别名
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            }
        },
    },


})
