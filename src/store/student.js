/**
 * 学生store
 * 加入课程接口没有封装到学生store actions中
 */
import {defineStore} from "pinia";
import {
    getExamList,
    getExamScoreDetail,
    getStudentInfo,
    joinExam,
    saveOrSubmit,
    updateStudentInfo,
    getExamInfo,
    getCourseScore,
    screenCutting,
    getErrorQuestionList,
    addErrorQuestion,
    getScreenCuttingNumber, save
} from "@/api/student.js";

export const useStudentStore = defineStore('student', {
    actions: {
        GetExamList(parameter) {
            return new Promise((resolve, reject) => {
                getExamList(parameter)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetStudentInfo(){
            return new Promise((resolve, reject) => {
                getStudentInfo()
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        UpdateStudentInfo(params){
            return new Promise((resolve, reject) => {
                updateStudentInfo(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetCourseScore(params) {
            return new Promise((resolve, reject) => {
                getCourseScore(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetExamScoreDetail(params){
            return new Promise((resolve, reject) => {
                getExamScoreDetail(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        JoinExam(params) {
            return new Promise((resolve, reject) => {
                joinExam(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        Save(params) {
            return new Promise((resolve, reject) => {
                save(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        SaveOrSubmit(params) {
            return new Promise((resolve, reject) => {
                saveOrSubmit(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetExamInfo(params) {
            return new Promise((resolve, reject) => {
                getExamInfo(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        ScreenCutting(params) {
            return new Promise((resolve, reject) => {
                screenCutting(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetErrorQuestionList(params) {
            return new Promise((resolve, reject) => {
                getErrorQuestionList(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        AddErrorQuestion(params) {
            return new Promise((resolve, reject) => {
                addErrorQuestion(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetScreenCuttingNumber(params) {
            return new Promise((resolve, reject) => {
                getScreenCuttingNumber(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },
    persist: true,
})