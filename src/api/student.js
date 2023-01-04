/**
 * 学生模块接口
 */
import {request} from "@/utils/request.js";

const studentApi = {
    UpdateStudentInfo: '/stu/updateStudentInfo', // 修改学生个人信息
    GetStudentInfo: '/stu/getStudentInfo', // 获取学生个人信息
    JoinCourse: '/stu/joinCourse', // 学生加入课程
    GetExamList: `/stu/getExamList`, // 学生查看考试列表
    JoinExam: `/stu/joinExam`, // 学生开始考试查看试卷 {examinationId}
    SaveOrSubmit: '/stu/saveOrSubmit', // 发送验证码
    StudentRegister: '/user/stu/register', // 学生提交或保存作答情况
    GetScore: `/stu/getScore`, // 学生查看成绩 {examinationId}
    GetScoreDetail: '/stu/getScoreDetail',// 学生查看成绩明细
}

export function updateStudentInfo(parameter) {
    return request({
        url: studentApi.UpdateStudentInfo,
        method: 'put',
        data: parameter
    })
}

export function getStudentInfo() {
    return request({
        url: studentApi.GetStudentInfo,
        method: 'get',
    })
}

export function joinCourse(parameter) {
    return request({
        url: studentApi.JoinCourse,
        method: 'post',
        data: parameter
    })
}

export function getExamList(parameter) {
    return request({
        url: studentApi.GetExamList,
        method: 'get',
        params: parameter
    })
}

export function joinExam(parameter) {
    return request({
        url: studentApi.JoinExam,
        method: 'get',
        params: parameter
    })
}

export function saveOrSubmit(parameter) {
    return request({
        url: studentApi.SaveOrSubmit,
        method: 'post',
        data: parameter
    })
}

export function getScore(path) {
    return request({
        url: studentApi.GetScore + '/' + path,
        method: 'get',
    })
}

export function getScoreDetail(parameter) {
    return request({
        url: studentApi.GetScoreDetail,
        method: 'get',
        params: parameter
    })
}