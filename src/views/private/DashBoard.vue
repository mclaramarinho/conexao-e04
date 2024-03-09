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
                                    <new-event-form v-if="title==='Eventos'" 
                                            @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                    <new-contact-form v-if="title==='Contatos'"
                                            @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                    <new-class-form v-if="title==='Disciplinas'"
                                            @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                </v-window-item>

                                <v-window-item value="Perfil">
                                    <v-row no-gutters>
                                        <v-col cols="12" md="8" lg="6" class="mx-auto">
                                            <admin-profile @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                        </v-col>
                                    </v-row>
                                </v-window-item>

                                <v-window-item value="Convite">
                                    <v-row no-gutters>
                                        <v-col cols="12" md="8" lg="6" class="mx-auto">
                                            <invite-settings @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                        </v-col>
                                    </v-row>
                                </v-window-item>

                                <v-window-item value="Users">
                                    <users-view @success="e => setSnack('success', e)" @error="e => setSnack('error', e)" />
                                </v-window-item>
                                
                                <v-window-item :value="title">
                                    <contact-view v-if="title==='Contatos'"
                                            @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                    <faq-view v-if="title==='FAQ'"
                                            @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                    <classes-view v-if="title==='Disciplinas'" 
                                            @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                    <events-view v-if="title==='Eventos'"
                                            @error="e => setSnack('error', e)" @success="e => setSnack('success', e)" />
                                </v-window-item>
                            </v-window>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <error-success-s-b :open="snack.open" :type="snack.type" :msg="snack.msg" @close="snack.open = false" />
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
import ErrorSuccessSB from '@/components/smaller_components/snackbars/ErrorSuccessSB.vue';
import type { ISnackbarSettings } from '@/interfaces/extra';
import type { SnackbarType } from '@/interfaces/types';

export default {
    name: 'dash-board',
    components: {
        NewEventForm, NewContactForm, NewClassForm, FaqView, ContactView, ClassesView, EventsView, AdminProfile, InviteSettings, UsersView, ErrorSuccessSB
    },
    data(){
        return {
            currentTab: null,
            snack:{
                open: false,
                type: 'error',
                msg: ''
            } as ISnackbarSettings,
        }
    },
    props: {
        title: String,
        tabs: {type: Array<string>, default: [] as Array<string>},
    },
    methods:{
        setSnack(type: SnackbarType, msg: string){
            this.snack = {
                open: true,
                type: type,
                msg: msg
            }
        }
    }
}
</script>