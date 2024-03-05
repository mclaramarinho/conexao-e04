<template>
    <v-container fluid class="position-fixed top-50 start-50 translate-middle text-center">
        <h2 class="font-blue">Estamos carregando suas informações</h2>
        <v-progress-circular size="large" indeterminate color="var(--dark-blue)" />
    </v-container>
</template>

<script lang="ts">
import { useUserInfoStore } from '@/stores/userInfo';

export default {
    name: 'LoadingUserContent',
    created() {
        setTimeout(() => {
            if(useUserInfoStore().UID === "" || useUserInfoStore().UID === undefined || useUserInfoStore().UID === null){
                useUserInfoStore().update().then(() => {
                    this.chooseNext()
                }).catch(e => {
                    this.$router.push({path: '/admin/login' as string})
                });
            }else{
                this.chooseNext()
            }
        }, 1000);
    },
    methods:{
        chooseNext(){
            const qRedirect = this.$route.query.redirect || "";
            this.$router.push({name: qRedirect as string, params: {id: useUserInfoStore().UID as string}});
        }
    }
}
</script>