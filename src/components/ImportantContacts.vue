<template>
    <circular-loader v-if="!render" />
    <v-container id="ic_container" class="h-100">
        <v-row no-gutters class="">
            <v-col cols="10" sm="6" class="mx-auto">
                <search-bar @type="(v) => filterContacts(v)" />
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col v-if="filteredResult.length > 0" cols="12" sm="9" md="10" class="mx-auto">
                <contact-card v-for="c in filteredResult" :key="c.name" :name="c.name" :phone="c.phone_number" :email="c.email" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import SearchBar from './smaller_components/text-fields/SearchBar.vue';
import ContactCard from './smaller_components/cards/ContactCard.vue';
import type { IContactGetBody } from '@/interfaces/Https';
import { getContacts } from '@/https/contacts';
import CircularLoader from './smaller_components/loaders/CircularLoader.vue';
export default {
    name: 'ImportantContacts',
    components: {
        SearchBar, ContactCard, CircularLoader
    },
    data() {
        return {
            contacts: [] as Array<IContactGetBody>,
            filteredResult: [] as Array<IContactGetBody>,
            showScrollTopBtn: false,
            render: false
        }
    },
    async created(){
        await this.fetchContacts()
    },
    methods:{
        filterContacts(v : string){
            this.filteredResult = this.contacts.filter(item => {
                const fName = item.name.toLowerCase();
                const fPhone = item.phone_number.toLowerCase();
                const fEmail = item.email.toLowerCase();
                const fValue = v.toLowerCase();
                if(fName.includes(fValue) || fPhone.includes(fValue) || fEmail.includes(fValue)){
                    return item;
                }
            })
        },
        async fetchContacts(){
            this.render = false;
            try{
                const res = await getContacts();
                if(res.code === 200){
                    this.contacts = res.response;
                }else{
                    throw new Error('Failed to fetch contacts');
                }
            }catch(err){
                console.error(err);
                //TODO - show error message
                this.contacts = [];
            }

            this.filteredResult = this.contacts;

            this.render = true;
        }
    }
}
</script>

<style scoped>
#ic_container{
    height: 100%;
}
</style>