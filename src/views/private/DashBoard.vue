<template>
    <v-container class="h-100 font-blue">
        <v-row no-gutters class="h-100">
            <v-col cols="12">
                <h1 class="">{{ title as string }}</h1>
            </v-col>
            <v-col cols="12">
                <v-tabs v-if="tabs?.length >= 1" >
                    <v-tab v-for="item in tabs" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-tabs v-else>
                    <v-tab>{{ title as string }}</v-tab>
                </v-tabs>
            </v-col>
            <v-col cols="12">
                <v-row no-gutters class="mb-4">
                    <h3 class="">Novo evento</h3>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" sm="6" md="4">
                        <v-form>
                            <v-text-field type="text" label="Nome" variant="outlined"></v-text-field>
                            <v-textarea label="Descrição" variant="outlined"></v-textarea>
                            <v-row no-gutters class="" justify="space-between">
                                <v-text-field type="datetime-local" label="Início"></v-text-field>
                                <v-text-field type="datetime-local" label="Fim"></v-text-field>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
export default {
    name: 'dash-board',
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