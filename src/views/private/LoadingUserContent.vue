<template>
    <v-container fluid class="position-fixed top-50 start-50 translate-middle text-center">
        <h2 class="font-blue">Estamos carregando suas informações</h2>
        <v-progress-circular size="large" indeterminate color="var(--dark-blue)" />
    </v-container>
</template>

<script lang="ts">
import { useUserInfoStore } from '@/stores/userInfo';
import { setLogLevel } from 'firebase/app';

export default {
    name: 'LoadingUserContent',
    data(){
        return {
            allowedPaths: [
                "/admin/login",
                "/admin/create",
                '/admin/dashboard',
                '/admin/dashboard/events',
                '/admin/dashboard/classes',
                'admin/dashboard/contacts',
                'admin/dashboard/faq',
                'admin/dashboard/settings',
            ]
        }
    },

    created() {
        
        setTimeout(() => {
            console.log("got here");
            
            if(useUserInfoStore().UID === "" || useUserInfoStore().UID === undefined || useUserInfoStore().UID === null){
                useUserInfoStore().update().then(() => {
                    this.chooseNext()
                }).catch(e => {
                    this.$router.push({path: '/admin/login' as string})
                });
            }else{
                this.chooseNext()
            }
            
        }, 2000);
    },
    methods:{
        chooseNext(){
            const prev = this.$router.options.history.state.back || "";
            const forward = this.$router.options.history.state.forward || "";

            const qRedirect = this.$route.query.redirect || "";

            
            if((prev === "/admin/login" || prev === "/admin/create")){
                console.log(1);
                
                this.$router.push({name: qRedirect as string, params: {id: useUserInfoStore().UID as string}});
            }else if(prev === '/admin/retrieving-user-information'){
                console.log(2);
                this.$router.push({path: forward as string, params: {id: useUserInfoStore().UID as string}});
                
            }else{
                console.log(3);

                this.$router.push({name: qRedirect as string, params: {id: useUserInfoStore().UID as string}});
            }
        }
    }
}
</script>