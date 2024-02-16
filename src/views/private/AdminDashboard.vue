<template>
    <v-container fluid class="h-100">
        <v-navigation-drawer>
            <v-list-item title=""></v-list-item>
        </v-navigation-drawer>
    </v-container>
</template>

<script lang="ts">
import {admin_get_all, admin_get_one} from "../../https/admin"
export default {
    name: 'AdminDashboard',
    created() {
        admin_get_one().then(r => console.log(r)).catch(e => console.log(e))
    }
}
</script>