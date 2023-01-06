import {defineStore} from "pinia";
import {
    getCourseList,
    getSchoolList,
    getUserInfo,
    login,
    loginByCode,
    logout,
    sendCode,
    studentRegister, teacherRegister, updatePassword, upload,
    validateCode
} from "@/api/user";

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
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        Login(params) {
            return new Promise((resolve, reject) => {
                login(params)
                    .then(res => {
                        if (res.code === 200) {
                            // 先清空之前的store，再赋值token
                            this.$reset();
                            this.token = res.data;
                        }
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },
        LoginByCode(params) {
            return new Promise((resolve, reject) => {
                loginByCode(params)
                    .then(res => {
                        if (res.code === 200) {
                            // 先清空之前的store，再赋值token
                            this.$reset();
                            this.token = res.data;
                        }
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
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
        SendCode(params) {
            return new Promise((resolve, reject) => {
                sendCode(params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        ValidateCode(params) {
            return new Promise((resolve, reject) => {
                validateCode(params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetSchoolList() {
            return new Promise((resolve, reject) => {
                getSchoolList()
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        StudentRegister(params){
            return new Promise((resolve, reject) => {
                studentRegister(params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        TeacherRegister(params) {
            return new Promise((resolve, reject) => {
                teacherRegister(params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        Upload(params) {
            return new Promise((resolve, reject) => {
                upload(params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        UpdatePassword(params) {
            return new Promise((resolve, reject) => {
                updatePassword(params)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GetCourseList(params) {
            return new Promise((resolve, reject) => {
                getCourseList(params)
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