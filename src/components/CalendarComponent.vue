<template>
    <schedule-x-calendar v-if="render" :calendar-app="app as CalendarApp" />

    <v-dialog v-model="openDialog" max-width="500px">
        <event-edit :event="eventSelected" :allow-edit="allowEdit" />
    </v-dialog>
</template>

<script lang="ts">
import {ScheduleXCalendar} from '@schedule-x/vue'
import {CalendarApp} from '@schedule-x/calendar'
import {createCalendar, viewMonthGrid, viewMonthAgenda, viewWeek, viewDay} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import type { IEventGetBody } from '@/interfaces/Https';
import EventEdit from '@/components/smaller_components/dialogs/EventEdit.vue';
import type {View} from '@schedule-x/shared'
export default{
    name: 'calendar-component',
    components:{
        ScheduleXCalendar, EventEdit
    },
    props:{
        events:{
            type: Array<IEventGetBody>,
            required: true
        },
        viewModes: {
            type:  Array<'month-grid' | 'month-agenda' | 'week' | 'day'>,
            required: false,
            default: ['month-grid']
        },
        allowEdit:{
            type: Boolean,
            required: false,
            default: false
        },
        defaultView:{
            type: String as () => 'month-grid' | 'month-agenda' | 'week' | 'day',
            required: false,
            default: 'month-grid'
        },
        multipleCalendars:{
            type: Boolean,
            required: false,
            default: false
        },
        calendars:{
            type: Object as () => Record<string, {
                colorName: string; 
                lightColors?: { main: string; container: string; onContainer: string; } | undefined;
                darkColors?: { main: string; container: string; onContainer: string; } | undefined; 
            }>,
            required: false,
        },
        eventCalendarLogic:{
            type: Function,
            required: false,
            default: (event : IEventGetBody) => {}
        },
        firstDayOfWeek:{
            type: Number,
            required: false,
            default: 1
        },
        onEventClick:{
            type: Function,
            required: false,
        },
        onClickDate: {
            type: Function,
            required: false,
        },
        onClickDateTime: {
            type: Function,
            required: false,
        },
        onEventUpdate: {
            type: Function,
            required: false,
        },
        onRangeUpdate: {
            type: Function,
            required: false,
        },
    },
    computed:{
        calendarsPropError(){
            if(this.multipleCalendars && !this.calendars){
                throw new Error('If multipleCalendars is true, you must provide a calendars prop')
            }
            return this.calendars
        },
        eventCalendarLogicError(){
            if(this.multipleCalendars && !this.eventCalendarLogic){
                throw new Error('If multipleCalendars is true, you must provide a eventCalendarLogic prop')
            }
            return this.eventCalendarLogic
        },
    },
    data(){
        return {
            app: {} as CalendarApp,
            render: false,
            eventSelected: {} as IEventGetBody,
            openDialog: false as boolean
        }
    },
    async mounted(){
        console.log(this.eventCalendarLogic);
        
        await this.setCalendarApp()
    },
    methods:{
        setEventSelected(id : string){
            const event = this.events.find(ev => ev._id === id);
            if(event){
                this.eventSelected = event;
                this.openDialog = true;
            }
        },
        async setCalendarApp(){
            return new Promise((resolve, reject) => {
                this.render = false;
                const fEvents = this.events.map(e => {
                    return {
                        title: e.event_name,
                        start: e.start_timestamp,
                        end: e.end_timestamp,
                        id: e._id,
                        description: e.description,
                        location: e.event_location,
                        calendarId: this.eventCalendarLogic(e)
                    }
                })
                const v = [] as Array<View>;
                this.viewModes.includes('month-grid') && v.push(viewMonthGrid);
                this.viewModes.includes('month-agenda') && v.push(viewMonthAgenda);
                this.viewModes.includes('week') && v.push(viewWeek);
                this.viewModes.includes('day') && v.push(viewDay);

                const a = createCalendar({
                    datePicker: {
                        selectedDate: new Date().toISOString().split('T')[0]
                    },
                    firstDayOfWeek: this.firstDayOfWeek,

                    events: fEvents,
                    
                    views: v as [View, ...View[]],
                    defaultView: this.defaultView,
                    
                    calendars: this.calendars,

                    callbacks: {
                        onEventClick: (e) => this.onEventClick ? this.onEventClick(e) : this.setEventSelected(e.id as string),
                        onClickDate: (d) => this.onClickDate && this.onClickDate(d),
                        onClickDateTime: (dt) => this.onClickDateTime && this.onClickDateTime(dt),
                        onEventUpdate: (eu) => this.onEventUpdate && this.onEventUpdate(eu),
                        onRangeUpdate: (ru) => this.onRangeUpdate && this.onRangeUpdate(ru),
                    }
                }) as CalendarApp;
                this.app = a;
                this.render = true;
                resolve(null)
            });
        }
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