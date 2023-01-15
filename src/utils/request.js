import axios from 'axios'
import {notification} from "ant-design-vue";
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/notification/style/css'
import {useUserStore} from "@/store/user.js";
import {showMessage} from "@/utils/status.js";

const request = axios.create({
    baseURL: import.meta.env.VITE_API_DOMAIN,
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
})

const errorHandler = (error) => {
    if (error.response) {
        const data = error.response.data
        if (error.response.status != 200) {
            notification.error({
                message: showMessage(data.code),
            })
        }
    }
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
    const token = useUserStore().token;
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (config.method == 'get') {
        config.data = true;
    }
    if (token) {
        config.headers['token'] = token
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    if (response.data.code != 200) {
        console.log(response);
       /* notification.error({
            message: response.data.msg,
            description: showMessage(response.data.code),
        })*/
    }
    return response.data
}, errorHandler)

export default request;

export {
    request
}
