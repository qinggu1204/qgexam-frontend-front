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
            resolvers: [AntDesignVueResolver({
                importStyle: "less",
            })]
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
                modifyVars: {
                    'primary-color': '#5eaf7d', // 全局主色
                    'link-color': '#5eaf7d',  // 链接色
                    'border-radius-base': '8px', // 组件/浮层圆角
                    'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
                    'btn-font-weight': '550',
                    'btn-shadow': '0 2px 0 rgba(0, 0, 0, 0.015)',
                    'btn-primary-shadow': '0 2px 0 rgba(0, 0, 0, 0.045)',
                    'btn-text-shadow': '0 -1px 0 rgba(0, 0, 0, 0.12)',
                    'btn-link-hover-bg': 'transparent',
                    'btn-text-hover-bg': 'rgba(0, 0, 0, 0.25)',
                    'btn-padding-horizontal-base': '18px',
                    'btn-padding-horizontal-sm': '10px',
                },
                javascriptEnabled: true,
            }
        },
    },
    server: {
        port: 5173, // 端口 
        proxy: {
            '/api': {
                target: 'http://localhost:8080/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },

})
