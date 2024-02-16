
<template>
    <v-btn
        size="large" class="m-auto main-btn"
        :variant="(variant as NonNullable<'outlined' | 'text' | 'flat' | 'elevated' | 'tonal' | 'plain'> | undefined)"
        :text="text" :onmouseup="() => emitClickEvent()" />
</template>


<script lang="ts">
export default {
        name: 'ButtonOutline',
        props: {
            text: String,
            variant:{
                type: () => '' as NonNullable<'outlined' | 'text' | 'tonal' | 'contained' | 'fab' | 'icon' | 'tile'> | undefined,
                default: "outlined",
                required: false 
            },
            value:{
                type: String,
                default: undefined,
                required: false
            }
        },
        data(){
            return {
            }
        },
        beforeCreate(){
            
            
        },
        methods: {
            emitClickEvent(){
                const regex = / /g;
                const regex2 = /[\u0300-\u036f]/g;
                const value = this.value || this.text?.normalize("NFD").replace(regex, '-').replace(regex2, "").toLowerCase() || ""
                
                this.$emit('click', value);
            }
        },
        emits: ['click']
}
</script>

<style scoped>
.main-btn{
    width: 100%;
    height: 5rem;
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
        font-size: 1.2rem !important;
    }
}
.main-btn:hover{
    background-color: var(--dark-blue) !important;
    color: var(--white) !important;
}


</style>