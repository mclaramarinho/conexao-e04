<template>
    <v-container id="ic_container" class="h-100">
        <v-row no-gutters class="">
            <v-col cols="10" sm="6" class="mx-auto">
                <search-bar id="contact_search_bar" @type="(v) => filterContacts(v)" />
            </v-col>
        </v-row>
        <v-row no-gutters id="contact_list_container" class="">
            <v-col cols="12" id="contact_list" sm="9" md="10" class="mx-auto">
                <contact-card v-for="c in filteredResult" :key="c.name" :name="c.name" :phone="c.phone" :email="c.email" />
            </v-col>
        </v-row>
        <!-- <v-row v-if="showScrollTopBtn" no-gutters class="ic_scrolltop_btn_row d-none d-md-block">
            <v-col cols="2" class="mx-auto text-center ic_scrolltop_btn_col">
                <v-btn theme="light" variant="flat"  icon="mdi-chevron-up" :onmouseup="()=>scrollToTop()"></v-btn>
            </v-col>
        </v-row> -->
    </v-container>

</template>

<script lang="ts">
import SearchBar from './smaller_components/SearchBar.vue';
import ContactCard from './smaller_components/ContactCard.vue';
import { contacts } from '@/stores/temp/contacts';
export default {
    name: 'ImportantContacts',
    components: {
        SearchBar, ContactCard
    },
    data() {
        return {
            filteredResult: [] as Array<{name: string, phone: string, email: string}>,
            showScrollTopBtn: false
        }
    },
    mounted(){
        this.filteredResult = contacts
    },
    methods:{
        // scrollToTop(){
        //     const el = document.getElementById("scrollable_col")
            
        //     if(el){
        //         el.style.scrollBehavior = "smooth"
        //         el.scrollTo(0, (el.scrollHeight * -1))
        //     }
        // },
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