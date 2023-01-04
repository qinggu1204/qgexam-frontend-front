/**
 * 学生store
 * 加入课程接口没有封装到学生store actions中
 */
import {defineStore} from "pinia";
import {
    getExamList,
    getScore,
    getScoreDetail,
    getStudentInfo,
    joinExam, saveOrSubmit,
    updateStudentInfo
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
        GetScore(path) {
            return new Promise((resolve, reject) => {
                getScore(path)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetScoreDetail(params){
            return new Promise((resolve, reject) => {
                getScoreDetail(params)
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
    },
    persist: true,
})