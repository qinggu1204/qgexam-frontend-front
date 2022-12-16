import {defineStore} from "pinia";
import {login} from "@/api/api.js";

/**
 * 用户store
 */
export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: undefined,
        }
    },

    actions: {
        Login() {
            return new Promise((resolve, reject) => {
                login()
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    },
    persist: true,
})