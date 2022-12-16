/**
 * 存储结果页页面显示的消息以及要跳转的路由name等
 */
import {defineStore} from "pinia";

export const useResultStore = defineStore('result', {
    state: () => ({
        type: '', // 结果类型
        title: '',
        subTitle: '',
        btnText: '', // 按钮文本
        routerName: '', // 跳转路由的name
    }),
    actions: {
        setResult(type, title, subTitle, btnText, routerName) {
            this.type = type, this.title = title, this.subTitle = subTitle;
            this.btnText = btnText, this.routerName = routerName;
        },
    },
    persist: true,
})