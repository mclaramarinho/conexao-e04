<template>

<v-container id="main-page" fluid class="p-0 d-none d-md-block overflow-hidden h-100">
        <v-row no-gutters class="p-0 h-100">
            <v-col cols="12" sm="4" lg="6" class="bg-blue main-page-side">
                <v-row class="position-absolute top-50 start-50 translate-middle m-auto">
                    <img src="../assets/images/unit-logo.webp" alt="" />
                </v-row>
            </v-col>

            <v-col sm="8" lg="6" class="position-relative">
                <v-container class="h-100">
                    <v-row no-gutters
                        :class="(currentDisplay === 2 || currentDisplay === 3) ? 'h-90 w-90' : 'h-75'"
                        class=" position-absolute top-50 start-50 translate-middle w-75 align-content-baseline">
                        <v-col cols="12" class="w-fit">
                            <v-row no-gutters>
                                <v-col cols="12" v-if="currentDisplay !== 1">
                                    <back-btn :path="'/'"/>                 
                                </v-col>
                            </v-row>
                            <slot name="header" v-if="currentDisplay !== 1" />
                        </v-col>

                        <v-col cols="12" id="scrollable_col" :class="(currentDisplay === 2 || currentDisplay === 3) ? 'h-100' : 'h-75'" class="overflow-y-auto">
                            <slot name="section" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>


</template>

<script lang="ts">
import BackBtn from '@/components/smaller_components/buttons/BackBtn.vue'
export default{
    name: 'public-desktop-view',
    components:{
        BackBtn
    },
    props:{
        currentDisplay: {type: Number, required: true}
    }
}

</script>
