<template>
    <v-container class="h-100 font-blue">
        <v-row no-gutters class="h-100" align-content="start">
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
                    <v-tabs v-else>
                        <v-tab>{{ title as string }}</v-tab>
                    </v-tabs>
                </v-col>
            </v-col>
          
            <v-col cols="12">
                <v-container fluid>
                    <v-row no-gutters>
                            <v-window v-model="currentTab">
                                <v-window-item value="Criar" v-if="title === 'Eventos'">
                                    <new-event-form  />
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
export default {
    name: 'dash-board',
    components: {
        NewEventForm
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

    created(){
        console.log(this.title);
        
    },
    methods:{
        
    }
}
</script>

<style scoped>
</style>