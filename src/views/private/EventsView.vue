<template>
    
    <v-container fluid v-if="$vuetify.display.mdAndUp">
        <v-row no-gutters justify="end">
            <v-btn icon="mdi-refresh" @click="fetchEvents" class="font-12" />
        </v-row>
    </v-container>
    <ScheduleXCalendar v-if="render" :calendar-app="(app as CalendarApp)">
    </ScheduleXCalendar>
    
    <v-dialog v-model="openDialog"  max-width="500px">
        <event-edit :event="eventSelectedStore" @done="renderCalendar" />
    </v-dialog>
</template>

<script lang="ts">
import { getAllEvents } from '@/https/events';
import {ScheduleXCalendar} from '@schedule-x/vue'
import {CalendarApp} from '@schedule-x/calendar'
import {createCalendar, viewMonthGrid, viewMonthAgenda, viewWeek} from '@schedule-x/calendar'
import { useEventSelectedStore } from '@/stores/eventSelectedStore';
import '@schedule-x/theme-default/dist/index.css'
import { storeToRefs } from 'pinia';
import EventEdit from '@/components/smaller_components/dialogs/EventEdit.vue';
export default {
    name: "events-view",
    components: {
        ScheduleXCalendar, EventEdit
    },
    data() {
        return {
            render: false,
            app: {} as CalendarApp,
            openDialog: false,
            eventSelectedStore: storeToRefs(useEventSelectedStore()).selectedEvent,
        }
    },
   
    async created() {
        await this.fetchEvents()
    },
    watch:{
        eventSelectedStore(nv){
            this.openDialog = true;
        }
    },
    methods: {
        renderCalendar(){
            this.fetchEvents().finally(() =>{
                this.openDialog = false;
            })
        },
        async fetchEvents() {
            this.render = false;
            const res = await getAllEvents();
            let events = [] as Array<any>;
            const view = this.$vuetify.display.mdAndUp ? viewMonthGrid : viewWeek;
            events = await new Promise((resolve) => {
                if (res.code === 200) {
                    const data = res.response;
                    events = data.map((item: any) => {
                        return {
                            title: item.event_name,
                            start: item.start_timestamp,
                            end: item.end_timestamp,
                            id: item._id,
                            description: item.description,
                            location: item.location,
                            calendarId: JSON.parse(item.is_mandatory) ? 'mandatoryEvents' : 'optionalEvents'
                        };
                    })
                    resolve(events)
                }
            })
            this.app = createCalendar({
                views: [view],
                datePicker: {
                    selectedDate: new Date().toISOString().split('T')[0]
                },
                calendars:{
                    mandatoryEvents: {
                        colorName: 'mandatory-events',
                        lightColors:{
                            main: '#7a163c',
                            container: '#7a163c',
                            onContainer: '#ffffff',
                        }
                    },
                    optionalEvents:{
                        colorName: 'optional-events',
                        lightColors:{
                            main: '#54BB48',
                            container: '#54BB48',
                            onContainer: '#ffffff',
                        }
                    },
                },
                firstDayOfWeek: 1,
                events: events,
                callbacks:{
                    onEventClick(e){
                        useEventSelectedStore().setSelectedEvent(e)
                    },
                }
            });
            this.render=true;
            
        },
    }
}
</script>

<style>
.sx-vue-calendar-wrapper{
  width: 100%;
  height: 65vh;
}
.sx__chevron-wrapper:hover{
    background-color: var(--faded-dark-blue);
    >i{
        border-color: white !important;  
    }
}
.sx__chevron {
    border-color: var(--dark-blue) !important;
}
.sx__calendar-header, .sx__month-grid-day__header-day-name, .sx__month-grid-day__header-date{
  color: var(--dark-blue);
}

.sx__month-grid-day__header-date.sx__is-today{
    background-color: var(--dark-blue) !important;
}
.sx__today-button{
  color: var(--dark-blue);
}
.sx__month-grid-event{
    cursor: pointer;
}
.sx__date-picker-wrapper{
    display: none;
}
.sx__view-selection-item{
    background-color: var(--faded-dark-blue);
    color: var(--dark-blue);
}
.sx__view-selection-item:hover{
    background-color: var(--dark-blue) !important;
    color: var(--white);
}
</style>