<template>
    <v-card class="py-4">
        <v-card-title>
            <h3 class="text-center font-blue" style="text-wrap: balance;">Editar Contato</h3>
        </v-card-title>
        <v-card-text>
            <v-form ref="contactEditForm">
                <v-row>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Nome" :model-value="name"
                                :rules="rules.maxChars(30)" validate-on="input"
                                @input="(e : any) => name = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Telefone" :model-value="phone"
                                validate-on="input" :rules="rules.telephone"
                                @input="(e : any) => phone = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Email" :model-value="email"
                                validate-on="input" :rules="rules.email"
                                @input="(e : any) => email = e.target.value">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea variant="outlined" label="Quando contatar?" 
                                :model-value="when_to_contact"  counter
                                :rules="rules.maxChars(100)" validate-on="input"
                                @input="(e : any) => when_to_contact = e.target.value" />
                    </v-col>
                </v-row>
            </v-form>
            <v-row no-gutters class="text-danger">
                <p v-if="showErrorMessage" class="mx-auto">{{ errorMessage }}</p>
            </v-row>
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
import {maxChars, telephone, email, notEmpty} from '@/utils/validations'
import type { IContact, IContactGetBody } from '@/interfaces/Https';
export default {
    name: 'contact-edit',
    props: {
        item: {
            type: Object as () => IContactGetBody,
            required: false
        }
    },
    data(){
        return {
            name: this.item?.name || "",
            phone: this.item?.phone_number || "",
            email: this.item?.email || "",
            when_to_contact: this.item?.when_to_contact || "",
            rules:{
                maxChars: maxChars,
                telephone: telephone,
                email: email,
                notEmpty: notEmpty,
            },
            errorMessage: '' as string,
            showErrorMessage: false as boolean
        }
    },
    methods:{
        async editContact(){
            const validateForm = await this.$refs.contactEditForm.validate();
            if(!validateForm.valid){
                this.errorMessage = 'Preencha todos os campos corretamente';
                this.showErrorMessage = true;
                return;
            }
      
            // Call the http update method to update the faq item
            const data = {
                name: this.name,
                phoneNumber: this.phone,
                email: this.email,
                whenToContact: this.when_to_contact
            } as IContact;

            updateContact(this.item?._id as string, data).then(r => {
                this.$emit("done", r);
            }).catch(e => {
                console.error(e);
                this.$emit('error', 'Erro ao atualizar contato.');
            });
        }
    },
    emits: ['cancel', 'done', 'error']
}
</script>