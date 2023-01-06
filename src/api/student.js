/**
 * 学生模块接口
 */
import {request} from "@/utils/request.js";

const studentApi = {
    UpdateStudentInfo: '/stu/updateStudentInfo', // 修改学生个人信息
    GetStudentInfo: '/stu/getStudentInfo', // 获取学生个人信息
    JoinCourse: '/stu/joinCourse', // 学生加入课程
    SaveOrSubmit: '/stu/saveOrSubmit', // 发送验证码
    StudentRegister: '/user/stu/register', // 学生提交或保存作答情况
    GetCourseScore: '/stu/viewExamResults/getCourseScore', // 学生查看成绩
    GetExamScoreDetail: '/stu/viewExamResults/getExamScoreDetail',// 学生查看成绩明细
    JoinExam: `/stu/enterExam/joinExam`, // 学生开始考试查看试卷
    GetExamInfo: '/stu/enterExam/getExamInfo', //学生进入考试页面查询考试信息
    GetExamList: `/stu/enterExam/getExamList`, // 学生查看考试列表
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

export function getCourseScore(parameter) {
    return request({
        url: studentApi.GetCourseScore,
        method: 'get',
        params: parameter
    })
}

export function getExamScoreDetail(parameter) {
    return request({
        url: studentApi.GetExamScoreDetail,
        method: 'get',
        params: parameter
    })
}

export function getExamInfo(parameter) {
    return request({
        url: studentApi.GetExamInfo,
        method: 'get',
        params: parameter
    })
}