<template>
    <v-card class="py-4">
        <v-card-title>
            <h3 class="text-center font-blue" style="text-wrap: balance;">Editar Contato</h3>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Nome" 
                                :model-value="name"
                                @input="e => name = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Telefone" 
                                :model-value="phone"
                                @input="e => phone = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Email" 
                                :model-value="email"
                                @input="e => email = e.target.value">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea variant="outlined" label="Quando contatar?" 
                                :model-value="when_to_contact" @input="e => when_to_contact = e.target.value" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="var(--black)" size="large" class="font-12" variant="tonal" @click="$emit('cancel')">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="var(--green)" size="large" class="font-12" variant="tonal" @click="editContact">Salvar</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { updateContact } from '@/https/contacts';
import type { IContact } from '@/https/contacts';
export default {
    name: 'contact-edit',
    props: {
        item: {
            type: Object,
            required: false
        }
    },
    data(){
        return {
            name: this.item?.name || "",
            phone: this.item?.phone_number || "",
            email: this.item?.email || "",
            when_to_contact: this.item?.when_to_contact || "",
        }
    },
    methods:{
        editContact(){
            const name = this.name;
            const phone = this.phone;
            const email = this.email;
            const when_to_contact = this.when_to_contact;
            if(!name || !phone || !email || !when_to_contact){
                // Show an error message
                return;
            }
            
            // Call the http update method to update the faq item
            const data = {} as IContact;
            data.name = name;
            data.phoneNumber = phone;
            data.email = email;
            data.whenToContact = when_to_contact;
            updateContact(this.item._id, data).then(r => this.$emit("done", r)).catch(e => console.error(e));
            
            // on success, show a success message
            // on failure, show an error message
        }
    },
    emits: ['cancel', 'done']
}
</script>