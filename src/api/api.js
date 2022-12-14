import {request} from "@/utils/request.js";

const userApi = {
    Login: '/login',
}

export function login(params) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: params
    })
}