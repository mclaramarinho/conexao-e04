<template>

    <v-row no-gutters>
        <v-col cols="12">
            <h1 class="font-blue text-center">CRIAR CONTA</h1>
            <h4 class="font-faded-blue text-center opacity-50">Então você quer ser admin...</h4>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="mt-5 mx-auto">
            <v-form v-model="form">
                <v-row no-gutters>
                    <v-text-field
                        variant="outlined" class="mb-5"
                        :rules="notEmpty" validate-on="input"
                        type="text"
                        label="Seu nome"
                        v-model="name" @change="e => name=e.target.value" />
                </v-row>
                <v-row no-gutters class="">
                    <email-field @update:email="(e) => email = e" :email="email" />
                </v-row>
                <v-row no-gutters class="">
                    <pswd-field  @update:pswd="(e) => pswd = e" :pswd="pswd" />
                </v-row>
                <v-row no-gutters>
                    <!-- <p v-if="error" class="font-red mx-auto font-12">Ops... Tivemos algum erro inesperado.</p> -->
                    <v-btn
                        size="large" text="CONTINUAR"
                        color="var(--dark-blue)" variant="outlined"
                        class="mx-auto w-50 responsive_font"
                        type="submit" block :loading="loading" :disabled="!form" 
                        @click="(e : any) => handleData(e)"
                    />
                </v-row>
                
            </v-form>
            <v-row no-gutters>
            
                <v-btn
                    size="large" text="Desisti! Quero voltar..."
                    color="var(--dark-blue)" variant="text"
                    @click="e => $router.push('/admin/login')"
                    class="mx-auto w-fit"/>
            </v-row>
        </v-col>
    </v-row>

</template>

<script lang="ts">
import { notEmpty } from '@/utils/validations'
import EmailField from '@/components/smaller_components/text-fields/EmailField.vue'
import PswdField from '@/components/smaller_components/text-fields/PswdField.vue';
import {useAccountCreationStore} from '@/stores/accountCreation';

export default{
    name: 'AdminLoginStepOne',
        components: { EmailField, PswdField },
        data() {
            return {
                email: null as string | null,
                name: null as string | null,
                pswd: null as string | null,
                notEmpty: notEmpty,
                form: false as boolean,
                loading: false as boolean,
                error: false as boolean,
            }
        },
        methods: {
            async handleData(e: any){
                e.preventDefault();
                this.loading = true;
                this.error = false;
                    try{
                        console.log("alright");
                        
                        useAccountCreationStore().constructor(this.email as string, this.pswd as string, this.name as string)
                        console.log("alright 2");
                        this.$emit("procceed", 2)

                    }catch(e){
                        
                        this.error = true;
                    }
                this.loading = false;
            }
        }
    }
</script>
