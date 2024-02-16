<template>
  <v-sheet max-height="100vh" position="relative" class="w-90 h-100 overflow-y-auto mx-auto">
    <v-calendar v-model:model-value="value" class="position-relative mx-auto" :weekdays="weekday" view-mode="month" hide-week-number></v-calendar>
  </v-sheet>
  </template>

<script lang="ts">
    import { useDate } from 'vuetify'
  
    export default {
      data: () => ({
        type: 'month' as 'month' | 'week' | 'day',
        types: ['month', 'week', 'day'],
        weekday: [0, 1, 2, 3, 4, 5, 6],
        weekdays: [
          { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
          { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
          { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
          { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
        ],
        value: [new Date()],
        events: [] as  Array<{ title: string, start: Date, end: Date, color: string, allDay: boolean }>,
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        titles: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      }),
      created(){
        this.getDayHeight()
      },
      mounted () {
        const adapter = useDate()
        this.getEvents({ start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date())) })
      },
      methods: {
        getEvents ({ start, end } : any) {
          const events = []
  
          const min = start
          const max = end
          const days = (max.getTime() - min.getTime()) / 86400000
          const eventCount = this.rnd(days, days + 20)
  
          for (let i = 0; i < eventCount; i++) {
            const allDay = this.rnd(0, 3) === 0
            const firstTimestamp = this.rnd(min.getTime(), max.getTime())
            const first = new Date(firstTimestamp - (firstTimestamp % 900000))
            const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
            const second = new Date(first.getTime() + secondTimestamp)
  
            events.push({
              title: this.titles[this.rnd(0, this.titles.length - 1)],
              start: first,
              end: second,
              color: this.colors[this.rnd(0, this.colors.length - 1)],
              allDay: !allDay,
            })
          }
  
          this.events = events
        },
        getEventColor (event : any) {
          return event.color
        },
        rnd (a : any, b : any) {
          return Math.floor((b - a + 1) * Math.random()) + a
        },
        getDayHeight(){
          // const parent = document.getElementById("scrollable_col")
          // const p_height = parent?.clientHeight
          // const day_cell = document.querySelectorAll(".v-calendar-month__days > .v-calendar-month__day")
          
          // day_cell.forEach((item) => {
          //   if(p_height){
          //     item.style.height = p_height/6
          //     console.log(item.style.height)
          //   }
            
          // })
          // 
          // const container = document.getElementsByClassName("v-calendar__container")[0]
          // container.
        }
      },
    }
  </script>

<style scoped>
.v-calendar-month__day{
  min-height: none !important;
  max-height: 20px !important;
}
</style>