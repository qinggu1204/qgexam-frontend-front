/**
 * 角色权限store
 */
import {defineStore, storeToRefs} from "pinia";
import {useUserStore} from "@/store/user.js";

export const useRoleStore = defineStore('role', {
    state: () => ({
        role: [],
    }),
    actions: {
        isEmpty() {
          return !this.role || !this.role.length;  
        },
        setRole(role) {
            this.role = role;
        }
    }
})