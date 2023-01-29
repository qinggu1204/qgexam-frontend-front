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
        }),
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
        // 后端测试时取消此段proxy注释
        proxy: {
            '/api': {
                target: 'http://localhost:88',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    optimizeDeps: {
        include: [
            'vue',
            'pinia',
            'axios',
            'vue-router',
            'ant-design-vue/es',
            'ant-design-vue/es/layout/style',
            'ant-design-vue/es/dropdown/style',
            'ant-design-vue/es/space/style',
            'ant-design-vue/es/table/style',
            'ant-design-vue/es/avatar/style',
            'ant-design-vue/es/descriptions/style',
            'ant-design-vue/es/image/style',
            'ant-design-vue/es/statistic/style',
            'ant-design-vue/es/affix/style',
            'ant-design-vue/es/radio/style',
            'ant-design-vue/es/select/style',
            'ant-design-vue/es/back-top/style',
            'ant-design-vue/es/popconfirm/style',
            'ant-design-vue/es/divider/style',
            'ant-design-vue/es/list/style',
            'ant-design-vue/es/card/style',
            'ant-design-vue/es/tag/style',
            'ant-design-vue/es/row/style',
            'ant-design-vue/es/input/style',
            'ant-design-vue/es/badge/style',
            'ant-design-vue/es/tooltip/style',
            'ant-design-vue/es/typography/style',
            'ant-design-vue/es/button/style',
            'ant-design-vue/es/menu/style',
            'ant-design-vue/es/spin/style',
            'ant-design-vue/es/checkbox/style',
            'ant-design-vue/es/anchor/style',
            'ant-design-vue/es/col/style',
            'ant-design-vue/es/form/style',
            'ant-design-vue/es/upload/style',
            'ant-design-vue/es/tabs/style',
            'ant-design-vue/es/steps/style',
            'ant-design-vue/es/date-picker/style',
        ]
    }
})
