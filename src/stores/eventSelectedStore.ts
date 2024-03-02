import { defineStore } from "pinia";

export const useEventSelectedStore = defineStore("event-selected",{
    state: () => ({
        selectedEvent: null as null || Object
    }),
    actions:{
        setSelectedEvent(event : any){
            this.selectedEvent = Object.assign({}, event);
        },
        getSelectedEvent(){
            return this.selectedEvent
        }
    }
})