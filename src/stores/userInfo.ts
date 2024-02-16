import { defineStore } from "pinia";

export const useUserInfoStore = defineStore({
    UID: null as  null | string,
    name: null as string | null,
    email: null as string | null,
    displayName: null as string | null,
    role: null as "owner" | "admin" | null,

    actions: {
        update(){
            
        }
    }
})