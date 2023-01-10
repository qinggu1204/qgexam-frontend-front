/**
 * 教师store
 */
import {defineStore} from "pinia";
import {
    createCourse, getAnswerPaper, getAnswerPaperList,
    getExamList,
    getScoreList,
    getSubjectList,
    getTaskList,
    getTeacherInfo, marking,
    updateTeacherInfo
} from "@/api/teacher.js";

export const useTeacherStore = defineStore('teacher', {
    actions: {
        GetTeacherInfo() {
            return new Promise((resolve, reject) => {
                getTeacherInfo()
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        UpdateTeacherInfo(params) {
            return new Promise((resolve, reject) => {
                updateTeacherInfo(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        CreateCourse(params) {
            return new Promise((resolve, reject) => {
                createCourse(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetSubjectList() {
            return new Promise((resolve, reject) => {
                getSubjectList()
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetExamList(params) {
            return new Promise((resolve, reject) => {
                getExamList(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetScoreList(params) {
            return new Promise((resolve, reject) => {
                getScoreList(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetTaskList(params) {
            return new Promise((resolve, reject) => {
                getTaskList(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetAnswerPaperList(path, params) {
            return new Promise((resolve, reject) => {
                getAnswerPaperList(path, params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }, 
        GetAnswerPaper(path) {
            return new Promise((resolve, reject) => {
                getAnswerPaper(path)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        Marking(path, params) {
            return new Promise((resolve, reject) => {
                marking(path, params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
})