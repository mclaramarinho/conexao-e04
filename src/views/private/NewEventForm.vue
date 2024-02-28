<template>
    <v-form validate-on="submit" ref="form">
        <v-row no-gutters>
            <v-col cols="12" class="d-block d-md-none mb-5">
                <h3 class="mb-5">Preview</h3>
                <event-preview-card :name="event.eventName" :is-mandatory="event.isMandatory" :start="event.eventStart" :end="event.eventEnd"
                                            :organizer="(event.organizer as string)" :contact="(event.contact as string)" :location="(event.location as string)"
                                            :contact-type="event.contactType"/>
            </v-col>
            <v-col cols="12" md="6">
                <v-row no-gutters>
                    <v-col cols="12" lg="8" class="mb-lg-5 mt-2 mb-0">
                        <v-text-field
                            type="text" variant="outlined" hide-details="auto" autocomplete="on"
                            label="Nome" :model-value="event.eventName"
                            :rules="maxChars(30)" validate-on="input"
                            @input="(e : HTMLInputElement) => event.eventName = e.target?.value" />
                    </v-col>
                    <v-col cols="12" lg="4" class="mt-0">
                        <v-checkbox
                            base-color="var(--dark-blue)" hide-details="auto"
                            label="É obrigatório?"  center-affix
                            :model-value="event.isMandatory"
                            @change="(e : HTMLInputElement) => event.isMandatory = e.target?.checked" />
                    </v-col>
                    <v-col cols="12" class="mb-5">
                        <v-textarea label="Descrição" variant="outlined" 
                            :model-value="event.eventDescription" counter
                            :rules="maxChars(100)" validate-on="input"
                            @change="(e : HTMLInputElement) => event.eventDescription = e.target?.value"/>
                    </v-col>
                </v-row>
                <v-row no-gutters class="column-gap-5 mb-5">
                    <v-text-field
                        variant="outlined" type="datetime-local" 
                        validate-on="input" :rules="notEmpty"
                        label="Início" :model-value="event.eventStart"
                        name="eventStart"
                        @input="(e : HTMLInputElement) => event.eventStart = e.target?.value" />
                    <v-text-field
                        variant="outlined" type="datetime-local"
                        validate-on="input" :rules="notEmpty"

                        label="Fim" :model-value="event.eventEnd"
                        name="eventEnd"
                        @input="(e : HTMLInputElement) => event.eventEnd = e.target?.value" />
                    <v-col cols="12">
                        <v-text-field variant="outlined" hide-details="auto"
                            type="text" validate-on="input" :rules="maxChars(30)" 
                            label="Local" :model-value="event.location"
                            @input="(e : HTMLInputElement) => event.location = e.target?.value" />
                    </v-col>
                </v-row>
                <v-row no-gutters class="column-gap-5">
                    <v-col cols="12" class="mb-5">
                        <v-text-field variant="outlined"
                            hide-details="auto"
                            validate-on="input" :rules="maxChars(20)"
                            label="Organizador" :model-value="event.organizer"
                            @input="(e : HTMLInputElement) => event.organizer = e.target?.value" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" 
                            validate-on="input" :rules="event.contactType === 'phone' ? telephone : email"
                            :model-value="event.contact" @input="(e : HTMLInputElement) => event.contact = e.target?.value"
                            :label="event.contactType === 'email' ? 'Email' : 'Telefone'" />
                    </v-col>
                    <v-col cols="12">
                        <label class="font-12" for="contact-type">Tipo de contato</label>
                        <v-switch
                            hide-details id="contact-type"
                            class="w-fit font-12" color="var(--dark-blue)"
                            prepend-icon="mdi-phone" append-icon="mdi-email"
                            :model-value="event.contactType === 'email' ? true : false"
                            @change="(e : HTMLInputElement) => event.contactType = e.target.checked ? 'email' : 'phone'" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="5" class="d-md-block d-none mx-auto">
                <v-row no-gutters>
                    <v-col cols="12">
                        <h3 class="mb-5">Preview</h3>
                    </v-col>
                    <v-col cols="12">
                        <event-preview-card :name="event.eventName" :is-mandatory="event.isMandatory" :start="event.eventStart" :end="event.eventEnd"
                                            :organizer="(event.organizer as string)" :contact="(event.contact as string)" :location="(event.location as string)"
                                            :contact-type="event.contactType"/>
                    </v-col>
                </v-row>
                
                <v-row no-gutters class="mt-5">
                    <v-col cols="12">
                        <p class="font-red text-center font-12" v-if="showError">{{ errorMessage }}</p>
                    </v-col>
                    
                    <text-btn text="Salvar" variant="outlined" @click="e => handleEventCreation()" />
                </v-row>
            </v-col>
            
        </v-row>
    </v-form>
</template>

<script lang="ts">
import EventPreviewCard from '@/components/smaller_components/cards/EventPreviewCard.vue';
import TextBtn from '@/components/smaller_components/buttons/TextBtn.vue';
import { createEvent } from '@/https/events'
import {maxChars, telephone, email, notEmpty} from '@/utils/validations'
import type {IEvent} from '@/https/events'
export default {
    name: 'new-event-form',
    components: {
        EventPreviewCard, TextBtn
    },
    directives: {},
    data(){
     return{
            event:{
                eventName: null as null | string,
                isMandatory: false as boolean,
                eventDescription: null as null | string,
                eventStart: null as null | string,
                eventEnd: null as null | string,
                organizer: null as null | string,
                contact: null as null | string,
                contactType: "phone" as "phone" | "email",
                location: null as null | string
            } as IEvent,
            maxChars: maxChars,
            telephone: telephone,
            email: email,
            notEmpty: notEmpty,
            errorMessage: null as null | string,
            showError: false as boolean
        }
    },
    mounted(){
        document.getElementsByName('eventEnd')[0].setAttribute('min', new Date().toISOString().split('T')[0] + 'T00:00');
        // document.getElementsByName('eventStart')[0].setAttribute('max', new Date().toISOString().split('T')[0] + 'T23:59');
        
    },
    methods:{
        async handleEventCreation(){
            const validation = await this.$refs.form?.validate();
            
            if(validation.valid){
                this.showError = false;
                createEvent(this.event).then(r => console.log(r)).catch(e => console.log(e));
            }else{
                this.errorMessage = "Preencha todos os campos corretamente";
                this.showError = true;
            }
        }
    }
}
</script>

<style scoped>
</style>