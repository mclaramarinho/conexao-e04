<template>
    <v-container fluid class="h-100 d-block w-100 p-0 overflow-hidden">
        <NavBar />
        <v-container class="p-5 position-absolute top-50 start-50 translate-middle">
            <v-row no-gutters>
                <v-col cols="12">
                    <h1 class="font-blue text-center">LOGIN</h1>
                    <h4 class="font-faded-blue text-center opacity-50">Você é admin?</h4>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3" class="mt-5 mx-auto">
                    <v-form v-model="form">
                        <v-row no-gutters class="">
                            <email-field @update:email="(e) => email = e" :email="email" />
                        </v-row>
                        <v-row no-gutters class="">
                            <pswd-field  @update:pswd="(e) => pswd = e" :pswd="pswd" />
                        </v-row>
                        <v-row no-gutters>
                            <p v-if="errorLogin" class="font-red mx-auto font-12">Ops... Tivemos algum erro inesperado.</p>
                            <v-btn
                                size="large" text="ENTRAR"
                                color="var(--dark-blue)" variant="outlined"
                                class="mx-auto w-50 responsive_font"
                                type="submit" block :loading="loading" :disabled="!form" 
                                @click="(e : any) => handleLogin(e)"
                            />
                        </v-row>
                        
                    </v-form>
                    <v-row no-gutters>
                        
                            <v-btn
                                size="large" text="Esqueceu a senha?"
                                color="var(--dark-blue)" variant="text"
                                class="mx-auto w-fit"/>
                        </v-row>
                </v-col>
            </v-row>
        </v-container>

        <v-row no-gutters class="p-0 d-bloc">
            <v-col cols="12" class="position-absolute bottom-0 start-50 translate-middle-x text-center">
                <text-btn text="Tenho um código ultra secreto!" value="/admin/create" @clicked="e=> $router.push(e)" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import NavBar from '@/components/smaller_components/NavBar.vue';
import { password as pswdValidation, email as emailValidation } from '../utils/validations'
import EmailField from '@/components/smaller_components/text-fields/EmailField.vue'
import PswdField from '@/components/smaller_components/text-fields/PswdField.vue';
import TextBtn from '@/components/smaller_components/buttons/TextBtn.vue';
import { isLoggedIn, login } from '@/firebase/authorization';
import { useNavigationHistory } from '@/stores/useNavigationHistory';
import type { User } from 'firebase/auth';
import { useUserInfoStore } from '@/stores/userInfo';
export default {
    name: 'AdminLogin',
    components: { NavBar, EmailField, PswdField, TextBtn },
    data() {
        return {
            form: false as boolean,
            email: null as string | null,
            pswd: null as string | null,
            emailValid: false as boolean,
            pswdValid: false as boolean,
            emailValidation: emailValidation,
            pswdValidation: pswdValidation,
            loading: false as boolean,
            errorLogin: false as boolean
        };
    },
    watch:{
        email(v: string, ov: string) {
            this.errorLogin = false
        },
        pswd(v: string, ov: string) {
            this.errorLogin = false
        }
    },
    methods: {
        handleLogin(e : any){
            e.preventDefault();
            console.log(this.email);
            
            login(this.email as string, this.pswd as string).then((res) => {
                useUserInfoStore().update().then(r => {
                    this.$router.push({name: 'admin-events', params: {id: useUserInfoStore().UID as string}});
                }).catch(r => {
                    throw new Error(r);
                })
            }).catch((err) => {
                this.errorLogin = true;
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>