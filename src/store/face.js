/**
 * 人脸识别验证store
 */
import {defineStore} from "pinia";

export const useFaceStore = defineStore('face', {
    state: () => ({
        flag: false, // 是否已经通过人脸校验
        examinationId: undefined, // 最近一次需要人脸验证的考试id
    }),
    actions: {
        setAuth(flag) {
            this.flag = flag;
        },
        isAuth() {
            return this.flag;
        },
    }
})