<template>
  <v-row no-gutters class="position-relative h-100" align="center" v-if="!render">
    <v-progress-circular indeterminate class="mx-auto"></v-progress-circular>
  </v-row>
 <calendar-component v-if="render"
                      :allow-edit="allowEdit"
                     :multiple-calendars="multipleCalendars" 
                     :calendars="calendars"
                     :events="events"
                     :event-calendar-logic="eventCalendarLogic"
                     @refresh="fetchEvents" />
  </template>

<script lang="ts">
import CalendarComponent from '@/components/CalendarComponent.vue'
import type { IEventGetBody } from '@/interfaces/Https'
import { getAllEvents } from '@/https/events'
import { calendars as cal, eventCalendarLogic as logic } from '@/stores/calendars'

export default {
components:{
  CalendarComponent
},
  data: () => ({
    allowEdit: false,
    multipleCalendars: true,
    calendars: cal,
    eventCalendarLogic: logic,
    events: [] as Array<IEventGetBody>,
    render: false
  }),
  async created () {
    await this.fetchEvents()
  },
  methods: {
    async fetchEvents(){
      this.render = false;
        try{
          const res = await getAllEvents();
          if (res.code === 200) {
              this.events = res.response;
          }else{
            throw new Error('Error fetching events');
          }
        }catch(err){
          console.log(err);
          // TODO - show error message
          this.events = [];
        }
      this.render = true;
    }
  },
}
</script>
