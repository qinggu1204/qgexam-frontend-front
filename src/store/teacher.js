/**
 * 教师store
 */
import {defineStore} from "pinia";
import {getTeacherInfo, updateTeacherInfo} from "@/api/teacher.js";

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
    }
})