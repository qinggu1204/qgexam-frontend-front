import {defineStore} from "pinia";
import "@/api/api.js";
import {login} from "@/api/api.js";

// 定义用户store
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: '123', // 用户令牌
        }
    },

    actions: {
        Login() {
            return new Promise((resolve, reject) => {
                login().then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    persist: true
})