<template>
    <v-container fluid class="h-100 p-0">
        
        <v-row no-gutters class="h-100 w-100 m-0">
            <v-col cols="12" sm="1">
                <nav-drawer 
                    :email="(admin.email as string)" :name="(admin.name as string)" :role="(admin.role as string)" />
            </v-col>
            <v-col cols="12" sm="11" class="h-100">
                <v-container class="h-100">
                    <v-row no-gutters class="h-100">
                        <dash-board :title="sectionTitle" :tabs="tabs" />
                    </v-row>
                </v-container>
            </v-col>
                
        </v-row>
    </v-container>
</template>

<script lang="ts">
import type { IUser } from "@/interfaces/IUser";
import {admin_get_one} from "../../https/admin"
import NavDrawer from "@/components/smaller_components/NavDrawer.vue";
import { useNavigationHistory } from "@/stores/useNavigationHistory";
import DashBoard from "./DashBoard.vue";
export default {
    name: 'AdminDashboard',
    components: {
    NavDrawer, DashBoard
},
    data() {
        return {
            admin: {} as IUser,
            currentView: 1 as number, // 1 to 5
            sectionTitle: "" as string,
            tabs: [] as Array<string>
        }
    },
    watch:{
        currentView(nv : number, ov : number){
            switch(nv){
                case 1:
                    this.sectionTitle = "Dashboard";
                    break;
                case 2:
                    this.sectionTitle = "Eventos";
                    this.tabs = ["Eventos", "Criar"]
                    break;
                case 3:
                    this.sectionTitle = "Contatos";
                    this.tabs = []
                    break;
                case 4:
                    this.sectionTitle = "Disciplinas";
                    break;
                case 5:
                    this.sectionTitle = "FAQ";
                    break;
                case 6:
                    this.sectionTitle = "Configurações";
                    break;
            }
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
        this.handleView()
    },
    updated() {
        this.handleView()
    },
    methods: {
        handleView(){
            const fullBase = this.$route.path.split('/');
            if(fullBase.length < 4){
                this.currentView = 1;
                return;
            };

            const location = fullBase.pop();

            if(location === 'eventos') this.currentView = 2;
            if(location === 'contatos') this.currentView = 3;
            if(location === 'disciplinas') this.currentView = 4;
            if(location === 'faq') this.currentView = 5;
            if(location === 'configuracoes') this.currentView = 6;
        },
    }
}
</script>