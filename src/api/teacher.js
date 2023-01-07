/**
 * 教师模块接口
 */

import {request} from "@/utils/request.js";

export function getTeacherInfo() {
    return request({
        url: '/tea/getTeacherInfo',
        method: 'get',
    })
}

export function updateTeacherInfo(parameter) {
    return request({
        url: '/tea/updateTeacherInfo',
        method: 'put',
        data: parameter
    })
}

export function getStudentList(parameter) {
    return request({
        url: '/tea/createCourse',
        method: 'post',
        params: parameter
    })
}

export function createCourse(parameter) {
    return request({
        url: '/tea/createCourse',
        method: 'post',
        data: parameter
    })
}

export function getTaskList(parameter) {
    return request({
        url: '/tea/getTaskList',
        method: 'get',
        params: parameter
    })
}

export function getAnswerPaperList(path, parameter) {
    return request({
        url: `/tea/getAnswerPaperList/${path}`,
        method: 'get',
        params: parameter
    })
}

export function getAnswerPaper(path, parameter) {
    return request({
        url: `/tea/getAnswerPaper/${path}`,
        method: 'get',
        params: parameter
    })
}

export function marking(path, parameter) {
    return request({
        url: `/tea/marking/${path}`,
        method: 'put',
        data: parameter
    })
}



