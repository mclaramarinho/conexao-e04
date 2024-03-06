<template>
    <v-container id="mobile_main_page" fluid class="p-0 d-md-none d-block position-relative overflow-hidden h-100">
        <v-row no-gutters class="p-0">
            <v-col cols="12">
                <NavBar />
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" v-if="currentDisplay !== 1">
                <v-container class="py-0">
                    <v-col cols="12">
                        <back-btn :path="'/'"/>                 
                    </v-col>
                </v-container>
                <slot name="header" />
            </v-col>
        </v-row>
        <v-row no-gutters class="w-100 mx-auto">
            <v-col cols="12" class="h-100">
                <slot name="section" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import NavBar from '@/components/smaller_components/NavBar.vue'
import BackBtn from '@/components/smaller_components/buttons/BackBtn.vue'
export default{

    name: 'public-mobile-view',
    components:{
        NavBar, BackBtn
    },
    props:{
        currentDisplay: {type: Number, required: true}
    }
}
</script>
