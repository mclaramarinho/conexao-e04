<template>
    <v-container style="height: 100vh;" fluid class="p-0 overflow-y-auto">
        
        <v-row class="w-100 h-100 m-0 align-content-baseline">
            <v-col cols="12" md="1">
                <nav-drawer 
                    :email="(admin.email as string)" :name="(admin.name as string)" :role="(admin.role as string)" />
            </v-col>
            <v-col cols="12" md="11" class="h-100">
                <dash-board :title="sectionTitle" :tabs="tabs" />
            </v-col>
        </v-row> 
    </v-container>
</template>

<script lang="ts">
import type { IUser } from "@/interfaces/IUser";
import {admin_get_one} from "../../https/admin"
import NavDrawer from "@/components/smaller_components/NavDrawer.vue";
import DashBoard from "./DashBoard.vue";
import { useDashboardHistory } from "@/stores/useNavigationHistory";
export default {
    name: 'AdminDashboard',
    components: {
    NavDrawer, DashBoard
},
    data() {
        return {
            admin: {} as IUser,
            currentView: useDashboardHistory().previous || 1 as number, // 1 to 5
            // TODO - Refactor these 2 props below to be in an Array<Object> format
            sectionTitle: "" as string,
            tabs: [] as Array<string>
        }
    },
    watch:{
        currentView(nv : number){
            admin_get_one().then(r => this.admin = r.response).catch(e => this.admin = {} as IUser)
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
                    this.tabs = ["Contatos", "Criar"]
                    break;
                case 4:
                    this.sectionTitle = "Disciplinas";
                    this.tabs = ["Disciplinas", "Criar"]
                    break;
                case 5:
                    this.sectionTitle = "FAQ";
                    break;
                case 6:
                    this.sectionTitle = "Configurações";
                    this.tabs = ["Perfil", "Convite", 'Users']
                    break;
            }
        }
    },
    created() {
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