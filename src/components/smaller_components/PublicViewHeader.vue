<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12">
                <h1 class="text-center font-blue">{{ title.toUpperCase() }}</h1>
            </v-col>
        </v-row>
    </v-container>
</template>



<script lang="ts">
export default {
    name: 'PublicViewHeader',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>