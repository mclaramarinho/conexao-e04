<template>
    <v-container fluid class="h-100 p-0">
        
        <v-row no-gutters class="h-100 w-100 m-0">
                <nav-drawer 
                    :email="(admin.email as string)" :name="(admin.name as string)" :role="(admin.role as string)" />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import type { IUser } from "@/interfaces/IUser";
import {admin_get_one} from "../../https/admin"
import NavDrawer from "@/components/smaller_components/NavDrawer.vue";
import { useUserInfoStore } from "@/stores/userInfo";
import { useNavigationHistory } from "@/stores/useNavigationHistory";
export default {
    name: 'AdminDashboard',
    components: {
        NavDrawer
    },
    data() {
        return {
            admin: {} as IUser
        }
    },
    beforeRouteUpdate(to, from, next) {
        useNavigationHistory().setPreviousRoute(this.$route.path);
        next()
    },
    beforeRouteLeave(to, from, next) {
        useNavigationHistory().setPreviousRoute(from.path);
        next()
    },
    created() {
        admin_get_one().then(r => this.admin = r).catch(e => this.admin = {} as IUser)
    }
}
</script>