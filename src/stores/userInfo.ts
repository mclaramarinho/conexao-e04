import { isLoggedIn } from "@/firebase/authorization";
import { admin_get_all, admin_get_one } from "@/https/admin";
import type { User } from "firebase/auth";
import { defineStore } from "pinia";
import { el } from "vuetify/locale";

export const useUserInfoStore = defineStore({
    id: "userInfo",
    state: () => ({
        UID: '' as String || null,
        name: '' as String || null,
        email: '' as String || null,
        displayName: '' as String || null,
        role: '' as String || null,
    }),
    actions: {
        async update() : Promise<void>{
            isLoggedIn().then((user) => {
                if(user){
                    const u = user as User;
                    this.UID = u.uid;
                    this.name = u.displayName as string;
                    this.email = u.email as string;
                    this.displayName = u.displayName as string;
                    admin_get_one().then((res) => {
                        this.role = res.role as string;
                    }).catch(e => {
                        console.log(e);
                        throw new Error(e.message);
                    })
                }
            }).catch(e => {
                
                this.UID = '';
                this.name = '';
                this.email = '';
                this.displayName = '';
                this.role = '';
                throw e;
            })
        }
    }
})