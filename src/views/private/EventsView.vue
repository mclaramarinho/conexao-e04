<template>
    <!-- TODO - Create a separate component for the calendar -->
    <v-container fluid>
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
import {createCalendar, viewMonthGrid, viewMonthAgenda} from '@schedule-x/calendar'
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
        eventSelectedStore(){
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
            const view = this.$vuetify.display.mdAndUp ? viewMonthGrid : viewMonthAgenda;
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
                // TODO - create a separate object for these settings of the calendars
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
                    }
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
.sx__chevron {
    border-color: var(--dark-blue) !important;
}

.sx__chevron-wrapper:hover, .sx__chevron-wrapper:active{
    background-color: var(--faded-dark-blue);
    >i{
        border-color: white !important;  
    }
}

.sx__calendar-header, .sx__month-grid-day__header-day-name, .sx__month-grid-day__header-date,
.sx__today-button, .sx__view-selection-item, .sx__month-agenda-day, .sx__month-agenda-events__empty,
.sx__date-input-wrapper, .sx__date-input-label, .sx__date-input, .sx__date-picker__day:not(.sx__date-picker__day--selected),
.sx__date-picker__month-view-header__month-year{
    color: var(--dark-blue) !important;
}
.sx__month-agenda-events__empty{ font-weight: bold; }

.sx__month-agenda-day--active{ box-shadow:inset 0 0 0 2px var(--dark-blue); }

.sx__calendar-header{
    text-align: center;
    justify-content: space-between;
}

.sx__month-grid-day__header-date.sx__is-today, .sx__view-selection-item:hover, .sx__date-picker__day--selected{
    background-color: var(--dark-blue);
    color: white !important;
}
.sx__month-grid-event{ cursor: pointer; }

@media (min-width: 530px){
   .sx__date-picker-wrapper, .sx__calendar-header-content:nth-child(2), .sx__view-selection{
        display: none;
    } 
}

.sx__view-selection-item, .sx__date-picker__day--today{ background-color: var(--faded-dark-blue); }

.sx__view-selection-item:hover, .sx__date-picker__day--selected{ color: var(--white); }

.sx__view-selection{ display: none; }

</style>