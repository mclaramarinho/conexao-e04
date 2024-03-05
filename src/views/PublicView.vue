<template>
<!-- TODO - Create a separate component for the mobile view -->
    <v-container id="mobile_main_page" fluid class="p-0 d-md-none d-block position-relative overflow-hidden h-100">
        <v-row no-gutters class="p-0">
            <v-col cols="12">
                <NavBar />
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" v-if="currentDisplay !== 1">
                <v-container class="py-0">
                    <v-col cols="12">
                        <back-btn :path="'/'"/>                 
                    </v-col>
                </v-container>
                <!-- TODO - Use a computed variable for the title -->
                <PublicViewHeader :title="currentDisplay === 2 ? 'Calendário' : currentDisplay === 3 ? 'Horário de Aulas' : currentDisplay === 4 ? 'Contatos Importantes' : currentDisplay === 5 ? 'FAQ' : ''" /> 
            </v-col>
        </v-row>
        <v-row no-gutters class="w-100 mx-auto">
            <v-col cols="12" class="h-100">
                <MainMenu v-if="currentDisplay===1" />
                <ClassSchedule v-if="currentDisplay===3" />
                <ImportantContacts v-if="currentDisplay===4" />
                <FaqSection v-if="currentDisplay===5" />
                <ActivitiesCalendar v-if="currentDisplay===2" />
            </v-col>
        </v-row>
    </v-container>

<!-- TODO - Create a separate component for the desktop view -->
    <v-container id="main-page" fluid class="p-0 d-none d-md-block overflow-hidden h-100">
        <v-row no-gutters class="p-0 h-100">
            <v-col cols="12" sm="4" lg="6" class="bg-blue main-page-side">
                <v-row class="position-absolute top-50 start-50 translate-middle m-auto">
                    <img src="../assets/images/unit-logo.webp" alt="" />
                </v-row>
            </v-col>

            <v-col sm="8" lg="6" class="position-relative">
                <!-- TODO - create a class to style -->
                <v-container style="height: 100vh;">
                    <v-row no-gutters
                        :class="currentDisplay === 2 ? 'h-90 w-90' : 'h-75'"
                        class=" position-absolute top-50 start-50 translate-middle w-75 align-content-baseline">
                        <!-- TODO - create a class to style -->
                        <v-col cols="12" style="height: fit-content;">
                            <v-row no-gutters>
                                <v-col cols="12" v-if="currentDisplay !== 1">
                                    <back-btn :path="'/'"/>                 
                                </v-col>
                            </v-row>
                            <!-- TODO - Use a computed variable for the title -->
                            <PublicViewHeader v-if="currentDisplay !== 1"
                                    :title="currentDisplay === 2 ? 'Calendário' : currentDisplay === 3 ? 'Horário de Aulas' : currentDisplay === 4 ? 'Contatos Importantes' : currentDisplay === 5 ? 'FAQ' : ''" /> 
                        </v-col>
                        <v-col cols="12" id="scrollable_col" :class="currentDisplay === 2 ? 'h-100' : 'h-75'" class="overflow-y-auto">
                            <MainMenu v-if="currentDisplay===1" />
                            <ClassSchedule v-if="currentDisplay===3" />
                            <ImportantContacts v-if="currentDisplay===4" />
                            <FaqSection v-if="currentDisplay===5" />
                            <ActivitiesCalendar v-if="currentDisplay===2" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import NavBar from '../components/smaller_components/NavBar.vue'
import MainMenu from '../components/MainMenu.vue'
import ClassSchedule from '../components/ClassSchedule.vue'
import BackBtn from '../components/smaller_components/buttons/BackBtn.vue'
import PublicViewHeader from '@/components/smaller_components/PublicViewHeader.vue'
import ImportantContacts from '@/components/ImportantContacts.vue'
import FaqSection from '@/components/FaqSection.vue'
import ActivitiesCalendar from '@/components/ActivitiesCalendar.vue'

export default {
    name: 'PublicView',
    components: {
        NavBar, MainMenu, ClassSchedule, BackBtn, PublicViewHeader, ImportantContacts, FaqSection, ActivitiesCalendar
    },
    data(){
        return{
            currentDisplay: 1,
        }
    },
    watch:{
        $route(to, from){
            this.checkPath()
        },
    },
    created(){
        this.checkPath()
    },
    methods: {
        checkPath(){
            switch (this.$route.path) {
                    case ('/' || ''):
                        this.currentDisplay = 1
                        break;
                    case ('/calendario'):
                        this.currentDisplay = 2
                        break;
                    case ('/horario-de-aulas'):
                        this.currentDisplay = 3
                        break;
                    case ('/contatos-importantes'):
                        this.currentDisplay = 4
                        break;
                    case ('/faq'):
                        this.currentDisplay = 5
                        break
                }
        }
    }
}
</script>


<style scoped>
#mobile_main_page{
    display: flex;
    padding: 0;
    width: 100vw;
    /* height: 100vh; */
    /* margin: 0 !important; */
}
.col_100{
    height: 100vh !important;
}
#main-page{
    display: flex;
    padding: 0;
    width: 100vw;
    height: 100vh;
    /* margin: 0 !important; */
}

.main-page-side{
    position: relative;
    height: 100vh;
    width: 50vw;
}
.max-w-100{
    min-width: 90% !important;
    max-width: 100vw !important;
}
</style>