import {defineStore} from "pinia";
import {getUserInfo, login, logout} from "@/api/user";

/**
 * 用户store
 */
export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        id: undefined, // userId, type: int
        username: '', // userName
        avatar: 'https://img1.imgtp.com/2022/12/17/pO3TGJOg.png', // headImg url
        role: [], // roleList
    }),

    actions: {
        GetUserInfo() {
            return new Promise((resolve, reject) => {
                getUserInfo()
                    .then(res => {
                        if (res) {
                            // 将结果存入store中
                            const data = res.data;
                            this.id = data.userId, this.username = data.userName;
                            this.avatar = data.headImg, this.role = data.roleList;
                        }
                        resolve();
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
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
        },
        Logout() {
            return new Promise((resolve, reject) => {
                logout()
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

    },
    persist: true,
})