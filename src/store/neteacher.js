/**
 * 教务教师store
 */
import {defineStore} from "pinia";
import {
    arrangeInvigilation,
    createExam,
    createPaper, distributeJudgeTask,
    getChapterBySubject, getInvigilationInfo,
    getPaperList,
    getSubjectList,
    previewPaper,
    getTeacherInfo,
    updateTeacherInfo
} from "@/api/neteacher.js";

export const useNeteacherStore = defineStore('neteacher', {
    actions: {
        GetPaperList(params) {
            return new Promise((resolve, reject) => {
                getPaperList(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        PreviewPaper(path) {
            return new Promise((resolve, reject) => {
                previewPaper(path)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        CreateExam(params) {
            return new Promise((resolve, reject) => {
                createExam(params)
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
        CreatePaper(params) {
            return new Promise((resolve, reject) => {
                createPaper(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetChapterBySubject(path) {
            return new Promise((resolve, reject) => {
                getChapterBySubject(path)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        ArrangeInvigilation(params) {
            return new Promise((resolve, reject) => {
                arrangeInvigilation(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetInvigilationInfo(path, params) {
            return new Promise((resolve, reject) => {
                getInvigilationInfo(path, params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        DistributeJudgeTask(params) {
            return new Promise((resolve, reject) => {
                distributeJudgeTask(params)
                    .then(res => {
                        if (res) resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
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