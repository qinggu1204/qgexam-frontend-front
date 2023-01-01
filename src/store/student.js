/**
 * 学生store
 * 加入课程接口没有封装到学生store actions中
 */
import {defineStore} from "pinia";
import {getExamList, getStudentInfo, updateStudentInfo} from "@/api/student.js";

export const useStudentStore = defineStore('student', {
    actions: {
        GetExamList(courseId, parameter) {
            return new Promise((resolve, reject) => {
                getExamList(courseId, parameter)
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
        }
    },
    persist: true,
})