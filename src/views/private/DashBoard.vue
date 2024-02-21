<template>
    <v-container class="h-100 font-blue">
        <v-row no-gutters class="h-100" align-content="start">
            <v-col cols="12" class="mb-5">
                <v-col cols="12">
                    <h1 class="">{{ title as string }}</h1>
                </v-col>
                <v-col cols="12">
                    <v-tabs v-if="tabs?.length >= 1" >
                        <v-tab @click="e => console.log(e.target.value)" :value="item" v-for="item in tabs" :key="item">{{ item }}</v-tab>
                    </v-tabs>
                    <v-tabs v-else>
                        <v-tab>{{ title as string }}</v-tab>
                    </v-tabs>
                </v-col>
            </v-col>
          
            <v-col cols="12">
                <v-container fluid>
                    <v-row no-gutters class="mb-4">
                        <h3 class="">Novo evento</h3>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <new-event-form :title="title" />
                        </v-col>
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