<template>

    <v-row no-gutters>
        <v-col cols="12">
            <h1 class="font-blue text-center">CRIAR CONTA</h1>
            <h4 class="font-faded-blue text-center opacity-50">Você precisa ter permissão de um admin</h4>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" class="mt-5 mx-auto">
            <v-form v-model="form">
                <v-row no-gutters class="w-fit mx-auto">
                    <v-col :cols="otpValid ? 11 : 12" class="mx-auto">
                        <v-otp-input
                            :loading="otpLoading"
                            :model-value="otp"
                            type="text" autofocus
                            
                            :length="6" length-type="fixed"
                            @finish="val => handleUpdate(val)"
                            @update:model-value="val => otp = val"
                            />
                    </v-col>
                    <v-col v-if="otpValid" cols="1" class="text-center">
                        <v-icon size="large" class="top-50 translate-middle-y font-25rem" color="var(--green)" icon="mdi-check" />
                    </v-col>
                </v-row>
            </v-form>
            <v-row no-gutters>
                <v-btn
                    size="large" text="Desisti! Quero voltar..."
                    color="var(--dark-blue)" variant="text"
                    @click="(e : HTMLInputElement) => $router.push('/admin/login')"
                    class="mx-auto w-fit"/>
            </v-row>
        </v-col>
    </v-row>

</template>

<script lang="ts">
import { register, isLoggedIn } from '@/firebase/authorization';
import { admin_create } from '@/https/admin';
import { validateCode } from '@/https/code';
import { useAccountCreationStore } from '@/stores/accountCreation';
import { useUserInfoStore } from '@/stores/userInfo';
import { notEmpty } from '@/utils/validations'
import type { User } from 'firebase/auth';

export default{
    name: 'AdminLoginStepTwo',
        components: {  },
        data() {
            return {
                notEmpty: notEmpty,
                form: false as boolean,
                loading: false as boolean,
                error: false as boolean,
                errorMsg: '' as string,
                otpLoading: false as boolean,
                otpValid: false as boolean,
                otp: '' as string,
            }
        },
        watch:{
            otp(val: string){
                this.otp = this.otp.toUpperCase()
                
                if(val.length === 6){
                    this.otpLoading = true
                    setTimeout(() => {
                        this.otpLoading = false
                    }, 2000)
                }
            }
        },
        methods: {
            handleCreation(){
                this.loading = true
                setTimeout(() => {
                    this.loading = false
                    this.$emit('procceed', 2)
                }, 2000)
            },
            async handleUpdate(val: string){
                this.handleCreation()
                const user_store = useAccountCreationStore()

                //store otp 
                user_store.setOtp(val)
                const otp_validation = null;
                try{
                    //validate otp
                    const otp_validation = await validateCode();
                    
                    if(otp_validation.code===403) throw Error("O código não é válido"); //error message
                    if(otp_validation.code===400 || otp_validation.code === 422) throw Error("Ocorreu um erro interno na requisição"); //error message
                    
                    //set user pinia data
                    user_store.setRole(otp_validation.response.role);

                    //get user data to register
                    const {email, password, name} = user_store.getAll();
                    let canCreateDb = false;
                    console.log("name: "+name);
                    

                    //create firebase account
                    const firebase_create  = await register(email, password, name)
                    if(!firebase_create){
                        throw Error("Não foi possível criar a conta no Firebase");
                    }else{
                        canCreateDb = true;
                    }

                    if(canCreateDb){
                        //create user in db
                        const user = await isLoggedIn() as User | boolean
                        
                        if(!user) return
                        user_store.setFirebase_uid((user as User).uid);
                        user_store.setCreation_date_timestamp((user as User).metadata.creationTime as string)

                        const created = await admin_create(user_store.getData());
                        
                        if(created.code !== 201) throw Error("Não foi possível criar sua conta no banco de dados."); // error message

                        useUserInfoStore().update().then(r => {
                            this.$router.push({name: 'admin-events', params: {id: useUserInfoStore().UID as string}});
                        }).catch(r => {
                            throw new Error(r);
                        })
                    }
                }catch(e : any){
                    console.log(otp_validation)
                    console.log("error: " + e)
                    console.log(e.message)
                    this.error = true;
                    
                    if(e.message.includes('Não') || e.message.includes('inesperado')){
                        this.errorMsg = e.message;
                    }else{
                        this.errorMsg = "Ops... Tivemos algum erro inesperado.";
                        return;
                    }
                }
            }
        }
    }
</script>

<style>
.font-25rem{
    font-size: 2.5rem !important;
}
</style>