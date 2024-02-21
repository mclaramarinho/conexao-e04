<template>
    <v-form>
        <v-row no-gutters>
            <v-col cols="12" class="d-md-none"></v-col>
            <v-col cols="12" md="6">
                <v-row no-gutters>
                    <v-col cols="12" lg="8" class="mb-lg-5 mb-0">
                        <v-text-field
                            type="text" hide-details variant="outlined"
                            label="Nome" :model-value="event.eventName"
                            @input="(e : HTMLInputElement) => event.eventName = e.target?.value" />
                    </v-col>
                    <v-col cols="12" lg="4" class="mt-0">
                        <v-checkbox
                            base-color="var(--dark-blue)" hide-details
                            label="É obrigatório?" :center-affix="false"
                            :model-value="event.isMandatory"
                            @change="(e : HTMLInputElement) => event.isMandatory = e.target?.checked" />
                    </v-col>
                    <v-col cols="12">
                        <v-textarea label="Descrição" variant="outlined"
                            :model-value="event.eventDescription" 
                            @change="(e : HTMLInputElement) => event.eventDescription = e.target?.value"/>
                    </v-col>
                </v-row>
                <v-row no-gutters class="column-gap-5">
                    <v-text-field
                        variant="outlined" type="datetime-local"
                        label="Início" :model-value="event.eventStart"
                        @input="(e : HTMLInputElement) => event.eventStart = e.target?.value" />
                    <v-text-field
                        variant="outlined" type="datetime-local"
                        label="Fim" :model-value="event.eventStart"
                        @input="(e : HTMLInputElement) => event.eventStart = e.target?.value" />
                </v-row>
                <v-row no-gutters class="column-gap-5">
                    <v-col cols="12">
                        <v-text-field
                            variant="outlined" type="text"
                            label="Organizador" :model-value="event.eventDescription"
                            @input="(e : HTMLInputElement) => event.eventDescription = e.target?.value" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            validate-on="input" variant="outlined"
                            :model-value="event.contact" @input="(e : HTMLInputElement) => event.contact = e.target?.value"
                            :label="event.contactType ? 'Email' : 'Telefone'" :type="event.contactType ? 'email' : 'tel'" />
                    </v-col>
                    <v-col cols="12">
                        <label class="font-12" for="contact-type">Tipo de contato</label>
                        <v-switch
                            hide-details id="contact-type"
                            class="w-fit font-12" color="var(--dark-blue)"
                            prepend-icon="mdi-phone" append-icon="mdi-email"
                            :model-value="event.contactType"
                            @change="e => event.contactType = e.target.checked" />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="5" class="d-md-block d-none mx-auto">
                <v-row no-gutters>
                    <v-col cols="12">
                        <h3 class="mb-5">Preview</h3>
                    </v-col>
                    <v-col cols="12">
                        <event-preview-card />
                    </v-col>
                </v-row>
                
                <v-row no-gutters class="mt-5">
                    <text-btn text="Salvar" variant="outlined" @click="e => console.log(event)" />
                </v-row>
            </v-col>
            
        </v-row>
    </v-form>
</template>

<script lang="ts">
import EventPreviewCard from '@/components/smaller_components/cards/EventPreviewCard.vue';
import TextBtn from '@/components/smaller_components/buttons/TextBtn.vue';
export default {
    name: 'new-event-form',
    components: {
        EventPreviewCard, TextBtn
    },
    data(){
        return{
            event:{
                eventName: "" as string,
                isMandatory: false as boolean,
                eventDescription: "" as string,
                eventStart: "" as string,
                eventEnd: "" as string,
                organizer: "" as string,
                contact: "" as string,
                contactType: "phone" as "phone" | "email"
            }
        }
    },
    created(){
    },
    methods:{
        
    }
}
</script>