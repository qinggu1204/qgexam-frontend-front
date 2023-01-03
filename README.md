# 拉取
```git
git pull 
```

# Node.js版本推荐：
```>=16.17.0```

# 安装依赖
```npm
npm install
```

# 运行

```npm
npm run dev
```

# 运行需要修改的配置
`.env.development`中,后端测试时改为`VITE_API_DOMAIN=/api`
`vite.config.js`中，后端测试时取消proxy注释：
```js
    /*proxy: {
        '/api': {
            target: 'http://localhost:7777',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
        }
    }*/
```