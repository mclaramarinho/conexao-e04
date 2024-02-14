<template>
    <v-app-bar color="var(--dark-blue)" position-sticky>
        <template v-slot:prepend>
            <img src="../../assets/images/unit-logo.webp" alt="">
        </template>
    </v-app-bar>
</template>

<script lang="ts">
    export default {
        name: 'NavBar'
    }
</script>

<style scoped>
    .v-app-bar {
        position: sticky !important;
    }
</style>