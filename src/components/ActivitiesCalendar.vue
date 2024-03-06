<template>
 <calendar-component v-if="render"
                      :allow-edit="allowEdit"
                     :multiple-calendars="multipleCalendars" 
                     :calendars="calendars"
                     :events="events"
                     :event-calendar-logic="eventCalendarLogic" />
  </template>

<script lang="ts">
import CalendarComponent from '@/components/CalendarComponent.vue'
import type { IEventGetBody } from '@/interfaces/Https'
import { getAllEvents } from '@/https/events'

export default {
components:{
  CalendarComponent
},
  data: () => ({
    allowEdit: false,
    multipleCalendars: true,
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
    eventCalendarLogic: (event : IEventGetBody) => JSON.parse(event.is_mandatory) ? 'mandatoryEvents' : 'optionalEvents',
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
