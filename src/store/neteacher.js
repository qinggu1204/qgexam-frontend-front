/**
 * 教务教师store
 */
import {defineStore} from "pinia";
import {getPaperList, previewPaper} from "@/api/neteacher.js";

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
        }
    }
})