<template>
    <v-container fluid class="h-100 d-block w-100 p-0 overflow-hidden">
        <NavBar />
        <v-container class="p-5 position-absolute top-50 start-50 translate-middle">
            <AdminCreateStepOne v-if="currentStep===1 && !loadingNextPage" @procceed="e=>{handleStepChange()}" />
            <v-progress-circular size="large" class="position-fixed top-50 start-50 translate-middle"
                        indeterminate color="var(--dark-blue)" v-if="loadingNextPage"></v-progress-circular>
            <AdminCreateStepTwo v-if="currentStep===2" @procceed="e=>{handleStepChange()}" />
        </v-container>

        
    </v-container>
</template>


<script lang="ts">
import NavBar from '@/components/smaller_components/NavBar.vue';
import AdminCreateStepOne from '@/components/AdminCreateStepOne.vue';
import AdminCreateStepTwo from '@/components/AdminCreateStepTwo.vue';
export default {
    name: 'AdminLogin',
    components: { NavBar,  AdminCreateStepOne, AdminCreateStepTwo},
    data() {
        return {
            form: false as boolean,
            loading: false as boolean,
            error: false as boolean,
            currentStep: 1 as number,
            loadingNextPage: false as boolean
        }
    },
    methods: {
        handleStepChange(){
            this.loadingNextPage = true
            this.currentStep+=1
            setTimeout(() => {
                this.loadingNextPage = false
            }, 2000);
        }
    }
}
</script>