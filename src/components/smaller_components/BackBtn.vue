<template>
    <button class="btn btn-sm back_btn " :onmouseup="()=>navigate()">
        <v-icon size="large" icon="mdi-chevron-left"/>
        <span class="">VOLTAR</span>
    </button>      
</template>

<script lang="ts">
export default {
    name: 'BackBtn',
    props: {
        path: {
            type: String,
            required: true
        }
    },
    methods: {
        navigate(){
            this.$router.push(this.path)
        }
    }
}
</script>

<style scoped>
.back_btn{
    color: var(--dark-blue) !important;
}
@media (max-width: 768px){
    .back_btn{
        font-size: 1.1rem !important;
    }
}
@media (min-width: 768px){
    .back_btn{
        font-size: 1.5rem !important;
    }
}
.back_btn:hover{
    color: var(--faded-dark-blue) !important;
}
</style>