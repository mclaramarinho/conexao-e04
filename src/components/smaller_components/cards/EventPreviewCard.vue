<template>
    <v-card variant="tonal" class="font-blue p-3">
        <v-card-title style="font-size: 2rem;">Nome do evento</v-card-title>
        <v-card-subtitle class="mb-5" style="font-size: 1.2rem;">Obrigatório</v-card-subtitle>
        <v-card-text>
            <v-row no-gutters style="font-size: 1.2rem;">
                <v-col cols="6">
                    <v-row class="mb-2 bold" no-gutters>Local:</v-row>
                    <v-row no-gutters>Biblioteca</v-row>
                </v-col>
                <v-col cols="6">
                    <v-row class="mb-2 bold" no-gutters>Organizador:</v-row>
                    <v-row no-gutters>João da Silva</v-row>
                </v-col>
                <v-col cols="6" class="mt-5">
                    <v-row class="mb-2 bold" no-gutters>Início:</v-row>
                    <v-row no-gutters>10/12/2000 - 11:40</v-row>
                </v-col>
                <v-col cols="6" class="mt-5">
                    <v-row class="mb-2 bold" no-gutters>Fim:</v-row>
                    <v-row no-gutters>10/12/2000 - 11:50</v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
export default {
    name: 'event-preview-card',
    created(){
    },
    methods:{
        
    }
}
</script>