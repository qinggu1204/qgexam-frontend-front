/**
 * 教务教师接口
 */
import {request} from "@/utils/request.js";

export function createPaper(parameter) {
    return request({
        url: '/netea/createPaper',
        method: 'post',
        data: parameter
    })
}

export function getSubjectList() {
    return request({
        url: '/netea/getSubjectList',
        method: 'get',
    })
}

export function getChapterBySubject(path) {
    return request({
        url: `/netea/getChapterBySubject/${path}`,
        method: 'get',
    })
}

export function getPaperList(parameter) {
    return request({
        url: '/netea/getPaperList',
        method: 'get',
        params: parameter
    })
}

export function createExam() {
    return request({
        url: '/netea/createExam',
        method: 'get',
    })
}

export function arrangeInvigilation() {
    return request({
        url: '/netea/arrangeInvigilation',
        method: 'get',
    })
}

export function getInvigilationInfo(path, parameter) {
    return request({
        url: `/netea/getInvigilationInfo/${path}`,
        method: 'get',
        params: parameter
    })
}

export function previewPaper(path) {
    return request({
        url: `/netea/previewPaper/${path}`,
        method: 'get',
    })
}

export function distributeJudgeTask(parameter) {
    return request({
        url: '/netea/distributeJudgeTask',
        method: 'post',
        data: parameter
    })
}

