<template>
    <v-container id="ic_container" class="h-100">
        <v-row no-gutters class="">
            <v-col cols="10" sm="6" class="mx-auto">
                <search-bar @type="(v) => filterContacts(v)" />
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" sm="9" md="10" class="mx-auto">
                <contact-card v-for="c in filteredResult" :key="c.name" :name="c.name" :phone="c.phone" :email="c.email" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import SearchBar from './smaller_components/text-fields/SearchBar.vue';
import ContactCard from './smaller_components/cards/ContactCard.vue';
import { contacts } from '@/stores/temp/contacts';
export default {
    name: 'ImportantContacts',
    components: {
        SearchBar, ContactCard
    },
    data() {
        return {
            // TODO - replace with actual data brought from the api 
            filteredResult: [] as Array<{name: string, phone: string, email: string}>,
            showScrollTopBtn: false
        }
    },
    mounted(){
        this.filteredResult = contacts
    },
    methods:{
        filterContacts(v : string){
            this.filteredResult = contacts.filter(item => item.name.toLowerCase().includes(v.toLowerCase()) || item.phone.includes(v) || item.email.toLowerCase().includes(v.toLowerCase()))
        }
    }
}
</script>

<style scoped>
#ic_container{
    height: 100%;
}
</style>