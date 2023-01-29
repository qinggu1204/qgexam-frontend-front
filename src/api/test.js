/**
 * 用户公共接口
 */
import {request} from "@/utils/request.js";

const userApi = {
    addFace: '/stu/addFace', // 添加
}

export function addFace(parameter) {
    return request({
        url: userApi.addFace,
        method: 'put',
        data: parameter
    })
}
