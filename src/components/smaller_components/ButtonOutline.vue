
<template>
    <button :class="'m-auto main-btn'" :value="setBtnValue()" @click="(e)  => emitClickEvent(e)">{{ text }}</button>
</template>


<script lang="ts">
export default {
        name: 'ButtonOutline',
        props: {
            text: String,
        },
        data(){
            return {
            }
        },
        methods: {
            setBtnValue(){
                const regex = / /g;
                const regex2 = /[\u0300-\u036f]/g;
                return (this.text?.normalize("NFD").replace(regex, '-').replace(regex2, "").toLowerCase());
            },
            emitClickEvent(e : any){
                this.$emit('click', e.target.value);
            }
        },
        emits: ['click']
}
</script>

<style scoped>
.main-btn{
    border-style: solid !important;
    padding: 2vh 10vh;
    border-radius: 0.5rem;
    box-shadow: none !important;
    width: 100%;
    border-width:0.5 !important;
    cursor: pointer;

    background-color: var(--white) !important;
    border-color: var(--dark-blue) !important;
    color: var(--dark-blue) !important;

    font-weight: 600;

}

@media (max-width: 768px){
    .main-btn{
        font-size: 1.1rem !important;
    }
}
@media (min-width: 768px){
    .main-btn{
        font-size: 1.5rem !important;
    }
}
.main-btn:hover{
    background-color: var(--dark-blue) !important;
    color: var(--white) !important;
}


</style>