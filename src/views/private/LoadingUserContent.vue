<template>
    <v-container fluid class="position-fixed top-50 start-50 translate-middle text-center">
        <h2 class="font-blue">Estamos carregando suas informações</h2>
        <v-progress-circular size="large" indeterminate color="var(--dark-blue)" />
    </v-container>
</template>

<script lang="ts">
import {isLoggedIn} from '@/firebase/authorization';
import { useNavigationHistory } from '@/stores/useNavigationHistory';
import { useUserInfoStore } from '@/stores/userInfo';

export default {
    name: 'LoadingUserContent',

    created() {
        setTimeout(() => {
            isLoggedIn().then(async (r) => {
                if(r){
                    console.log("Usuário logado");
                    if(useUserInfoStore().UID === "" || useUserInfoStore().UID === undefined || useUserInfoStore().UID === null){
                        await useUserInfoStore().update();
                    }
                    this.chooseNext()
                }
            }).catch(err => {
                this.$router.push("/admin/login")
            })
        }, 2000);
    },
    methods:{
        chooseNext(){
            const prev = useNavigationHistory().previous;
            if((prev === "/admin/login" || prev === "/admin/create")){
                const next = `/admin/dashboard/${useUserInfoStore().UID}`

                this.$router.push(next);
            }else{
                this.$router.push(prev)
            }
        }
    }
}
</script>