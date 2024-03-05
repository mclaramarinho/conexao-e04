<template>
   
    <v-container class="font-blue position-relative h-100" style="">
        <v-row no-gutters class="" align-content="start">
            <v-col cols="12" class="mb-2">
                <v-col cols="12">
                    <h1 class="">{{ title as string }}</h1>
                </v-col>
                <v-col cols="12">
                    <v-tabs v-if="tabs?.length >= 1" v-model="currentTab">
                        <v-tab
                            :value="item" v-for="item in tabs" :key="item"
                        >
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                    <v-tabs v-else v-model="currentTab">
                        <v-tab :key="((currentTab as unknown) as number)" :value="title">{{ title as string }}</v-tab>
                    </v-tabs> 
                </v-col>
            </v-col>
          
            <v-col cols="12">
                <v-container fluid>
                    <v-row no-gutters class="">

                            <v-window v-model="currentTab" class="w-100">
                               
                                <v-window-item value="Criar">
                                    <new-event-form v-if="title==='Eventos'" />
                                    <new-contact-form v-if="title==='Contatos'" />
                                    <new-class-form v-if="title==='Disciplinas'" />
                                </v-window-item>

                                <v-window-item value="Perfil">
                                    <v-row no-gutters>
                                        <v-col cols="12" md="8" lg="6" class="mx-auto">
                                            <admin-profile />
                                        </v-col>
                                    </v-row>
                                </v-window-item>

                                <v-window-item value="Convite">
                                    <v-row no-gutters>
                                        <v-col cols="12" md="8" lg="6" class="mx-auto">
                                            <invite-settings />
                                        </v-col>
                                    </v-row>
                                </v-window-item>

                                <v-window-item value="Users">
                                    <users-view />
                                </v-window-item>
                                
                                <v-window-item :value="title">
                                    <contact-view v-if="title==='Contatos'" />
                                    <faq-view v-if="title==='FAQ'" />
                                    <classes-view v-if="title==='Disciplinas'" />
                                    <events-view v-if="title==='Eventos'"></events-view>
                                </v-window-item>
                            </v-window>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import NewEventForm from './NewEventForm.vue';
import NewContactForm from './NewContactForm.vue';
import NewClassForm from './NewClassForm.vue';
import FaqView from '@/views/private/FaqView.vue';
import ContactView from '@/views/private/ContactView.vue';
import ClassesView from './ClassesView.vue';
import EventsView from './EventsView.vue';
import AdminProfile from './AdminProfile.vue';
import InviteSettings from './InviteSettings.vue';
import UsersView from './UsersView.vue';

export default {
    name: 'dash-board',
    components: {
        NewEventForm, NewContactForm, NewClassForm, FaqView, ContactView, ClassesView, EventsView, AdminProfile, InviteSettings, UsersView
    },
    data(){
        return {
            currentTab: null
        }
    },
    props: {
        title: String,
        tabs: {type: Array<string>, default: [] as Array<string>}
    },
}
</script>