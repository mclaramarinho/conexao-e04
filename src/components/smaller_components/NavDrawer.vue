<template>
    
    <v-navigation-drawer  
        :location="isMobile() ? 'bottom' : 'start'"
        :expand-on-hover="!isMobile()"
        :rail="!isMobile()"
        mobile-breakpoint="xs" 
        :touchless="!isMobile()"
        id="nav-drawer"
        :absolute="false"
        :style="isMobile() && (showDrawer ? {transform:'translateY(0%)'} : {transform:'translateY(80%)'})"
        permanent>
        <template v-slot:prepend v-if="isMobile()">
            <div class="text-center py-3">
                <v-icon 
                    :icon="showDrawer ? 'mdi-chevron-double-down' : 'mdi-chevron-double-up'"
                    color="var(--dark-blue)"
                    :onmouseup="e => showDrawer = !showDrawer"
                    class="d-md-none btn" size="30" />
            </div>
        </template>
        <v-list>
            <v-list-item
                prepend-icon="mdi-home" variant="text"
                :title="name"
                @click="e=>navigateEvent('')"
                :subtitle="email + ' - ' + role" />
            <v-divider />
        </v-list>
        <v-list>
            <v-list-item
                prepend-icon="mdi-calendar"
                value="eventos"
                @click="e=>navigateEvent(e.target?.textContent)"
                title="Eventos"/>
            <v-list-item
                prepend-icon="mdi-card-account-mail"
                value="contatos"
                @click="e=>navigateEvent(e.target?.textContent)"
                title="Contatos"/>
            <v-list-item
                prepend-icon="mdi-school"
                value="disciplinas"
                @click="e=>navigateEvent(e.target?.textContent)"
                title="Disciplinas"/>
            <v-list-item
                prepend-icon="mdi-frequently-asked-questions"
                @click="e=>navigateEvent(e.target?.textContent)"
                value="faq"
                title="FAQ"/>
            <v-list-item
                prepend-icon="mdi-cog"
                value="configuracoes"
                @click="e=>navigateEvent(e.target?.textContent)"
                title="Configurações"
                />
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { useNavigationHistory } from '@/stores/useNavigationHistory';
import { useUserInfoStore } from '@/stores/userInfo';

export default {
    name: 'NavDrawer',
    props: {
        email: String, 
        name: String,
        role: String
    },
    data() {
        return {
            showDrawer: false as boolean
        }
    },
    methods:{
        isMobile(){
            if(this.$vuetify.display.xs) return true
            return false
        },
        navigateEvent(value: string){

            const fullBase = this.$route.path.split('/');
            
            if(fullBase.length > 4) fullBase.pop();

            const base = fullBase.join('/');
            
            const normalizedValue = value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            
            this.$router.push({path: base+'/'+normalizedValue});
            
    },
}
}
</script>