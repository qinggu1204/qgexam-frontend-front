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
        url: '/tea/marking/getTaskList',
        method: 'get',
        params: parameter
    })
}

export function getAnswerPaperList(path, parameter) {
    return request({
        url: `/tea/marking/getAnswerPaperList/${path}`,
        method: 'get',
        params: parameter
    })
}

export function getAnswerPaper(path) {
    return request({
        url: `/tea/getAnswerPaper/${path}`,
        method: 'get',
    })
}

export function marking(path, parameter) {
    return request({
        url: `/tea/marking/${path}`,
        method: 'put',
        data: parameter
    })
}

export function getSubjectList() {
    return request({
        url: '/tea/getSubjectList',
        method: 'get',
    })
}

export function getExamList(parameter) {
    return request({
        url: '/alltea/getExamList',
        method: 'get',
        params: parameter
    })
}

export function getScoreList(parameter) {
    return request({
        url: '/alltea/getScoreList',
        method: 'get',
        params: parameter
    })
}


