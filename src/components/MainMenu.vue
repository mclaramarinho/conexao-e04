<template>
    <v-container class="position-absolute top-50 start-50 translate-middle w-fit">
        <v-row v-for="button in buttons" :key="button" no-gutters class="mb-3">
            <button-outline @click="(e : string)=>navigateSomewhere(e)" :text="button" v-if="button!=='Admin'" />
            <button-outline @click="(e : string)=>navigateSomewhere(e)" value="admin/login" variant="tonal" :text="button" v-if="button==='Admin'" />
        </v-row>
    </v-container>
</template>

<script lang="ts">
import ButtonOutline from '../components/smaller_components/buttons/ButtonOutline.vue'
    export default {
        name: 'MainMenu',
        components: {
            ButtonOutline
        },
        data(){
            return{
                buttons: [
                    "Horário de Aulas",
                    "Calendário",
                    "Contatos Importantes",
                    "FAQ",
                    "Admin"
                ]
            }
        },
        methods: {
            navigateSomewhere(value : String){
                this.$router.push('/' + value)
            }
        }
    }
</script>

<style scoped>


.v-container{
    padding: 0;
}

</style>