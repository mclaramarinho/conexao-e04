<template>
    <v-row no-gutters>
        <v-col cols="12" md="6" class="">
            <v-form validate-on="submit" ref="form">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-row no-gutters>
                            <v-col cols="12" class="mb-lg-5 mt-2 mb-0">
                                <v-text-field
                                    type="text" variant="outlined" hide-details="auto" autocomplete="on"
                                    label="Nome" :model-value="contact.name"
                                    :rules="maxChars(30)" validate-on="input"
                                    @input="(e : HTMLInputElement) => contact.name = e.target?.value" />
                            </v-col>
                            <v-col cols="12" class="mb-5">
                                <v-textarea label="Quando contatar?" variant="outlined" 
                                    :model-value="contact.whenToContact" counter
                                    :rules="maxChars(100)" validate-on="input"
                                    @change="(e : HTMLInputElement) => contact.whenToContact = e.target?.value"/>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="column-gap-5">
                            <v-col cols="12" class="mb-5">
                                <v-text-field variant="outlined" hide-details="auto" type="tel"
                                    validate-on="input" :rules="telephone"
                                    label="Telefone" :model-value="contact.phoneNumber"
                                    @input="(e : HTMLInputElement) => contact.phoneNumber = e.target?.value" />
                            </v-col>
                            <v-col cols="12" class="mb-5">
                                <v-text-field variant="outlined" hide-details="auto" type="email"
                                    validate-on="input" :rules="email"
                                    label="Email" :model-value="contact.email"
                                    @input="(e : HTMLInputElement) => contact.email = e.target?.value" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="mt-5 text-end justify-content-end">
                            <text-btn  text="Salvar" variant="outlined" :center="false" @click="e => handleContactCreation()" />
                            <v-col cols="12" class="mt-5">
                                <p class="font-red font-12" v-if="showError">{{ errorMessage }}</p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import TextBtn from '@/components/smaller_components/buttons/TextBtn.vue';
import {maxChars, telephone, email, notEmpty} from '@/utils/validations'
import type { IContact } from '@/https/contacts';
import { createContact } from '@/https/contacts';
import {useContactsList} from '@/stores/useContactsList';
export default {
    name: 'new-contact-form',
    components: {
        TextBtn
    },
    directives: {},
    data(){
     return{
            contact:{
                name: '' as string,
                phoneNumber: '' as string,
                email: '' as string,
                whenToContact: '' as string,
            } as IContact,
            maxChars: maxChars,
            telephone: telephone,
            email: email,
            notEmpty: notEmpty,
            errorMessage: null as null | string,
            showError: false as boolean
        }
    },
    mounted(){
    },
    methods:{
        async handleContactCreation(){
            const validation = await this.$refs.form?.validate();
            console.log(this.contact);
            
            
            if(validation.valid){
                this.showError = false;
                createContact(this.contact).then(r => {
                    if(r.code === 201){
                        this.$refs.form?.reset();
                    }
                })
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