<template>
    <PublicMobileView :currentDisplay="currentDisplay">
        <template v-slot:header>
            <PublicViewHeader :title="header" /> 
        </template>
        <template v-slot:section>
            <MainMenu v-if="currentDisplay===1" />
            <ClassSchedule v-if="currentDisplay===3" />
            <ImportantContacts v-if="currentDisplay===4" />
            <FaqSection v-if="currentDisplay===5" />
            <ActivitiesCalendar v-if="currentDisplay===2" />
        </template>
    </PublicMobileView>

    <PublicDesktopView :current-display="currentDisplay">
        <template v-slot:header>
            <PublicViewHeader :title="header" /> 
        </template>
        <template v-slot:section>
            <MainMenu v-if="currentDisplay===1" />
            <ClassSchedule v-if="currentDisplay===3" />
            <ImportantContacts v-if="currentDisplay===4" />
            <FaqSection v-if="currentDisplay===5" />
            <ActivitiesCalendar v-if="currentDisplay===2" />
        </template>
    </PublicDesktopView>
</template>

<script lang="ts">
import MainMenu from '../components/MainMenu.vue'
import ClassSchedule from '../components/ClassSchedule.vue'
import PublicViewHeader from '@/components/smaller_components/PublicViewHeader.vue'
import ImportantContacts from '@/components/ImportantContacts.vue'
import FaqSection from '@/components/FaqSection.vue'
import ActivitiesCalendar from '@/components/ActivitiesCalendar.vue'
import PublicMobileView from './PublicMobileView.vue'
import PublicDesktopView from './PublicDesktopView.vue'

export default {
    name: 'PublicView',
    components: {
        MainMenu, ClassSchedule, PublicViewHeader, ImportantContacts, FaqSection, ActivitiesCalendar, PublicMobileView, PublicDesktopView
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
    computed:{
        header(){
            return this.currentDisplay === 2 ? 'Calendário' 
                    : this.currentDisplay === 3 ? 'Horário de Aulas' 
                    : this.currentDisplay === 4 ? 'Contatos Importantes' 
                    : this.currentDisplay === 5 ? 'FAQ' 
                    : '';
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


<style>
#mobile_main_page{
    display: flex;
    padding: 0;
    width: 100vw;
}
.col_100{
    height: 100vh !important;
}
#main-page{
    display: flex;
    padding: 0;
    width: 100vw;
    height: 100vh;
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