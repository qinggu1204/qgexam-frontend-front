/**
 * 用户接口
 */
import {request} from "@/utils/request.js";

const userApi = {
    Login: '/user/login', // 登录名密码登录
    LoginByCode: '/user/loginByCode', // 手机号验证码登录
    Logout: '/user/common/logout', // 退出登录
    UpdatePassword: '/user/updatePassword', // 修改密码
    GetSchoolList: '/user/getSchoolList', // 获取学校列表
    SendCode: '/user/sendCode', // 发送验证码
    StudentRegister: '/user/stu/register', // 学生注册
    TeacherRegister: '/user/tea/register', // 教师注册
    GetUserInfo: '/user/common/getUserInfo',// 获取用户个人信息
    ValidateCode: '/user/validateCode', // 校验验证码是否正确
}

export function login(parameter) {
    return request({
        url: userApi.Login,
        method: 'post',
        data: parameter
    })
}

export function loginByCode(parameter) {
    return request({
        url: userApi.LoginByCode,
        method: 'post',
        data: parameter
    })
}

export function logout() {
    return request({
        url: userApi.Logout,
        method: 'delete',
    })
}

export function updatePassword(parameter) {
    return request({
        url: userApi.UpdatePassword,
        method: 'put',
        data: parameter
    })
}

export function getSchoolList() {
    return request({
        url: userApi.GetSchoolList,
        method: 'get',
    })
}

export function sendCode() {
    return request({
        url: userApi.SendCode,
        method: 'get',
    })
}

export function studentRegister(parameter) {
    return request({
        url: userApi.StudentRegister,
        method: 'post',
        data: parameter
    })
}

export function getUserInfo() {
    return request({
        url: userApi.GetUserInfo,
        method: 'get',
    })
}

export function validateCode(parameter) {
    return request({
        url: userApi.ValidateCode,
        method: 'post',
        data: parameter
    })
}