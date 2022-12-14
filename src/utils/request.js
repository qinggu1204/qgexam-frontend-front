import axios from 'axios'
import {notification} from "ant-design-vue";
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/notification/style/css'
import {useUserStore} from "@/store/index.js";
import {showMessage} from "@/utils/status.js";

const request = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/2033038-0-default',
    timeout: 100000
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
    if (token) {
        config.headers['token'] = token
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    if (response.data.code != 200) {
        notification.error({
            message: response.data.msg,
            description: showMessage(response.data.code),
        })
        return ;
    }
    return response.data
}, errorHandler)

export default request;

export {
    request
}
