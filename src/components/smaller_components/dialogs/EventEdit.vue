<template>
    <v-card class="pt-3" v-if="!enableDelete">
        <!-- TODO - create a global class for text-wrap: balance -->
        <v-card-title style="text-wrap: balance;">
            <h3 class="text-center font-blue bold">Detalhes do Evento</h3>
        </v-card-title>
        <v-card-actions v-if="allowEdit">
            <v-row no-gutters justify="space-around">
                <!-- TODO - create a new function for the @click event -->
                <v-btn  :text="enableEditing ? 'Cancelar' : 'Editar'" class="px-3"
                        @click="{enableEditing && fetchEvent(); enableEditing=!enableEditing; }" 
                        color="var(--dark-blue)" :variant="enableEditing ? 'outlined' : 'tonal'" 
                        :prepend-icon="enableEditing ? 'mdi-close' : 'mdi-pencil'" />

                <v-btn  text="Excluir" class="px-3"
                        @click="enableDelete = true"
                        color="var(--danger-red)" variant="tonal" prepend-icon="mdi-delete" />
            </v-row>
        </v-card-actions>
        <v-card-text>
            <v-card v-if="!enableEditing">
                <v-card-text class="font-12 font-blue">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-row no-gutters class="bold mb-3">Nome do Evento</v-row>
                            <v-row no-gutters>{{ localEvent.event_name }}</v-row>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-row no-gutters class="bold mb-3">Presença obrigatória?</v-row>
                            <v-row no-gutters>{{ localEvent.is_mandatory ? 'Sim' : 'Nao' }}</v-row>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-row no-gutters class="bold mb-3">Inicio</v-row>
                            <v-row no-gutters>{{ new Date(localEvent.start_timestamp).toLocaleString().replace(", ", " - ").slice(0, -3) }}</v-row>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-row no-gutters class="bold mb-3">Fim</v-row>
                            <v-row no-gutters>{{ new Date(localEvent.end_timestamp).toLocaleString().replace(", ", " - ").slice(0, -3) }}</v-row>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-row no-gutters class="bold mb-3">Organizador</v-row>
                            <v-row no-gutters>{{ localEvent.organizer }}</v-row>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-row no-gutters class="bold mb-3">Local</v-row>
                            <v-row no-gutters>{{ localEvent.event_location }}</v-row>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-row no-gutters class="bold mb-3">Descrição</v-row>
                            <v-row no-gutters>{{ localEvent.description }}</v-row>
                        </v-col>
                        <v-divider></v-divider>
                        <v-col cols="12">
                            <v-row no-gutters class="bold mb-3">Contato do evento</v-row>
                            <v-row no-gutters>{{ localEvent.event_contact_main }}</v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-form ref="form" v-if="enableEditing">
                <v-text-field :model-value="localEvent.event_name" label="Nome do Evento"
                                @update:model-value="e => localEvent.event_name = e" />
                
                <v-switch :model-value="localEvent.is_mandatory" label="Presença obrigatória?"
                            @change="(e : any) => {localEvent.is_mandatory = e.target.checked}"
                            color="var(--dark-blue)" />
                
                <v-text-field :model-value="localEvent.start_timestamp"
                                type="datetime-local" label="Início"
                                @update:model-value="e => localEvent.start_timestamp = e" />
                
                <v-text-field :model-value="localEvent.end_timestamp"
                                type="datetime-local" label="Fim"
                                @update:model-value="e => localEvent.end_timestamp = e" />
                
                <v-text-field :model-value="localEvent.event_location"
                                label="Local" 
                                @update:model-value="e => localEvent.event_location = e"/>

                <v-textarea no-resize :model-value="localEvent.description" 
                            label="Descrição do Evento"
                            @update:model-value="e => localEvent.description = e" />
                
                <v-text-field :model-value="localEvent.organizer"
                                label="Organizador"
                                @update:model-value="e => localEvent.organizer = e" />
                
                <v-text-field :model-value="localEvent.event_contact_main" 
                                label="Contato do organizador"
                                @update:model-value="e => localEvent.event_contact_main = e"/>
                
                <v-switch :model-value="contactType === 'email' ? true : false" 
                        prepend-icon="mdi-phone" append-icon="mdi-email" 
                        style="padding: 0; width: fit-content;"
                        color="var(--dark-blue)"
                        @change="(e : any) => contactType = e.target.checked ? 'email' : 'phone'" />

                <v-row no-gutters justify="end">
                    <v-btn text="Salvar"
                            append-icon="mdi-content-save-outline"
                            class="font-12" color="var(--green)"
                            variant="tonal" 
                            @click="editEvent"/>
                </v-row>
            </v-form>
            
        </v-card-text>
    </v-card>


    <v-card v-if="enableDelete" class="text-center">
        <v-card-title>
            <h4>Tem certeza que deseja deletar esse evento?</h4>
        </v-card-title>
        <v-card-actions>
            <v-row no-gutters justify="space-around">
                <v-btn @click="removeEvent" text="Remover" color="var(--danger-red)" variant="outlined"/>
                <v-btn @click="enableDelete=false" text="Voltar" color="var(--dark-blue)" variant="tonal" />
            </v-row>
            
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { getEvent, updateEvent, deleteEvent } from '@/https/events';
import type { IContactType, IEventGetBody, IEvent } from '@/interfaces/Https';
export default{
    name: 'event-edit',
    props:{
        event: {type: Object, required: true},
        allowEdit: {type: Boolean, required: false, default: true}
    },
    data(){
        return{
            localEvent:{} as IEventGetBody,
            contactType: "email" as IContactType,
            enableEditing: false,
            enableDelete: false,
        }
    },
    watch:{
    },
    created(){
        this.fetchEvent()
    },
    methods: {
        fetchEvent(){
            const id = this.event._id;
            getEvent(id).then(r => {
                this.localEvent = r.response;   
                this.localEvent.is_mandatory = JSON.parse(this.localEvent.is_mandatory);
                this.contactType = this.localEvent.event_contact_main.includes('@') 
                                    ? "email"
                                    : "phone";
            }).catch(e => {
                console.log(e)
                //show error message    
            })
        },
        editEvent(){
            const isValid = (this.$refs.form as any).validate();
            if(isValid){
                
                const data = {
                    isMandatory: this.localEvent.is_mandatory,
                    eventName: this.localEvent.event_name,
                    eventDescription: this.localEvent.description,
                    eventStart: this.localEvent.start_timestamp,
                    eventEnd: this.localEvent.end_timestamp,
                    organizer: this.localEvent.organizer,
                    contact: this.localEvent.event_contact_main,
                    location: this.localEvent.event_location,
                    contactType: this.contactType,
                } as IEvent;
                updateEvent(data, this.localEvent._id).then(r =>{ 
                    this.fetchEvent()
                    this.enableEditing = false;
                }).catch(e => {
                    console.log(e)
                    //TODO - show error message
                })
            }
        },
        removeEvent(){
            const id = this.localEvent._id;

            deleteEvent(id).then(r => {
                if(r.code === 204){
                    this.$emit('done');
                    //TODO - show success message
                }
            }).catch(e => {
                console.log(e)
                //TODO - error message
            }).finally(() =>  this.enableDelete = false)
        }
    },
    emits: ['done']
}
</script>

