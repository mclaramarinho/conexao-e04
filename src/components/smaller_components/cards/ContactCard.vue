<template>
    <v-row no-gutters class="my-5">
        <v-card hover width="100%" class="mx-auto">
            <v-card-item>
                <v-card-title class="font-blue responsive_font">{{ name.toUpperCase() }}</v-card-title>
                <v-card-subtitle class="font-blue responsive_font">
                    {{ description }}
                </v-card-subtitle>
            </v-card-item>
            <v-card-text>
                <v-row no-gutters class="mb-3 font-blue responsive_font">
                    <v-col cols="3">Telefone</v-col>
                    <v-col cols="9">{{ phone }}</v-col>
                </v-row>
                <v-row no-gutters class="font-blue responsive_font">
                    <v-col cols="3">Email</v-col>
                    <v-col cols="9">{{ email }}</v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-row>
    

</template>

<script lang="ts">
export default {
    name: 'ContactCard',
    props: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        description:{
            type: String,
            default: "",
            required: false
        }
    },

}
</script>

<style scoped>

</style>