<template>
    <v-container fluid class="position-fixed top-50 start-50 translate-middle text-center">
        <h2 class="font-blue">Estamos carregando suas informações</h2>
        <v-progress-circular size="large" indeterminate color="var(--dark-blue)" />
    </v-container>
</template>

<script lang="ts">
import {isLoggedIn} from '@/firebase/authorization';
import type { User } from 'firebase/auth';

export default {
    name: 'LoadingUserContent',
    created() {
        setTimeout(() => {
            isLoggedIn().then((r : User | boolean) => {
                if(r){
                    this.$router.push(`/admin/dashboard/${(r as User).uid}`);
                }else{
                    this.$router.push('/admin/login');
                }
            })
        }, 5000);
    }
}
</script>