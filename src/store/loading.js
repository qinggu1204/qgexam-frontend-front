/**
 * 控制全局页面切换时的loading动画Store
 */
import {defineStore} from "pinia";

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: true,
    }),
    actions: {
        setLoading(flag){
            this.isLoading = flag;
        }
    },
    // persist: true
})