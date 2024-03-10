<template>
    <!-- TODO - Improve UX -->
    <circular-loader v-if="!render" />
    
    <calendar-component v-if="render"
                    :events="events"
                    :view-modes="viewMode"
                    :default-view="defaultView"
                    :allow-edit="allowEdit"
                    :multiple-calendars="multipleCalendars"
                    :calendars="calendars"
                    :event-calendar-logic="calendarLogic"
                    @refresh="fetchEvents"
                    @doneEditing="$emit('success', 'Evento alterado com sucesso!')"
                    @errorEditing="$emit('error', 'Encontramos um erro ao alterar o evento.')"
                    @errorDeleting="$emit('error', 'Não conseguimos excluir esse evento.')" />
    
</template>

<script lang="ts">
import { getAllEvents } from '@/https/events';
import CalendarComponent from '@/components/CalendarComponent.vue';
import type { IEventGetBody } from '@/interfaces/Https';
import { calendars as cal, eventCalendarLogic as logic } from '@/stores/calendars';
import CircularLoader from '@/components/smaller_components/loaders/CircularLoader.vue';
export default {
    name: "events-view",
    components: {
        CalendarComponent, CircularLoader, 
    },
    data() {
        return {
            render: false,
            events: [] as Array<IEventGetBody>,
            viewMode: [] as Array<'month-grid' | 'month-agenda' | 'week' | 'day'>,
            allowEdit: true,
            defaultView: 'month-grid' as 'month-grid' | 'month-agenda' | 'week' | 'day',
            multipleCalendars: true,
            calendars: cal,
            calendarLogic: logic,
        }
    },
    async created() {
        await this.fetchEvents()
    },
    methods: {
        async fetchEvents() {
            this.viewMode = this.$vuetify.display.smAndDown ? ['month-agenda'] : ['month-grid'];
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
                this.$emit('error', 'Não conseguimos buscar os eventos...')
                this.events = [];
            }
            this.render=true;
        },
    },
    emits: ['error', 'success']
}
</script>
