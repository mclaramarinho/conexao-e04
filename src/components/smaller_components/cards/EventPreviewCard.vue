<template>
    <v-card variant="tonal" class="font-blue p-3">
        <v-card-title style="font-size: 2rem;">{{ formatted.name }}</v-card-title>
        <v-card-subtitle class="mb-5" style="font-size: 1.2rem;">{{ formatted.isMandatory }}</v-card-subtitle>
        <v-card-text>
            <v-row no-gutters style="font-size: 1.2rem;">
                <v-col cols="12" md="6">
                    <v-row class="mb-2 bold" no-gutters>Local:</v-row>
                    <v-row no-gutters>{{ formatted.location }}</v-row>
                </v-col>
                <v-col cols="12" md="6">
                    <v-row class="mb-2 bold" no-gutters>Organizador:</v-row>
                    <v-row no-gutters>{{ formatted.organizer }}</v-row>
                </v-col>
                <v-col cols="12" md="6" class="mt-5">
                    <v-row class="mb-2 bold" no-gutters>Início:</v-row>
                    <v-row no-gutters>{{ formatted.start }}</v-row>
                </v-col>
                <v-col cols="12" md="6" class="mt-5">
                    <v-row class="mb-2 bold" no-gutters>Fim:</v-row>
                    <v-row no-gutters>{{ formatted.end }}</v-row>
                </v-col>
                <v-col cols="12" class="mt-5">
                    <v-row no-gutters class="mb-2 bold">Contato:</v-row>
                    <v-row no-gutters class="">{{ formatted.contact }}</v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
export default {
    name: 'event-preview-card',
    props:{
        name: String,
        isMandatory: Boolean,
        start: String,
        end: String,
        location: String,
        organizer: String,
        contact: String,
        contactType: String
    },
    data(){
        return{
            formatted: {
                name: '',
                isMandatory: '',
                start: '',
                end: '',
                location: '',
                organizer: '',
                contact: ''
            }
        }
    },
    created(){
        this.updateData()
        
    },
    updated(){
        this.updateData()
    },
    methods:{
        updateData(){
            this.formatted.name = this.name ? this.formatName('eventName') : ''
            this.formatted.organizer = this.organizer ? this.formatName('organizer') : ''
            this.formatted.location = this.location ? this.formatName('location') : ''
            this.formatted.start = this.start ? this.formatDate(this.start) : ''  
            this.formatted.end = this.end ? this.formatDate(this.end) : ''
            this.formatted.contact = this.contact && this.contactType === 'phone' ? this.formatPhone(this.contact) : ''
            this.formatted.isMandatory = this.isMandatory ? 'Evento obrigatório' : 'Evento não obrigatório'
        },
        formatName(what : string){
            let newName = '' as string;
            if(what === 'eventName') newName = this.name || ""
            else if(what === 'organizer') newName = this.organizer || ""
            else if(what === 'location') newName = this.location || ""

            let newString = newName.split(' ')

            newString = newString.map((word: string) => {
                return word.charAt(0).toUpperCase() + word.slice(1)
            })

            return newString.join(' ')
        },
        formatDate(isodate : string){
            let newDate = new Date(isodate);
            return newDate.toLocaleString('pt-BR').replace(',', '').replace(' ', ' - ').slice(0, -3)
        },
        formatPhone(phone : string){
            return phone.replace(/(\d{2})(\d)(\d{4})(\d{4})/, '($1) $2 $3-$4')
        }
    }
}
</script>