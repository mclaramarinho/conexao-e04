<template>
    <v-text-field
        :variant=variant
        :placeholder=placeholder
        :type=type
        :color=color
        :prepend-inner-icon=prepend
        :clearable="clearable" :clear-icon=clear
        @input="emitTypeEvent"
    />
</template>

<script lang="ts">
export default {
    name: 'SearchBar',
    props: {
        placeholder:{
            type: String,
            default: "Pesquisar",
            required: false
        },
        type:{
            type: String,
            default: "text",
            required: false
        },
        variant: {
            type: String as () => "outlined" | "filled" | "plain" | "underlined" | "solo" | "solo-inverted" | "solo-filled" | undefined,
            default: "outlined",
            required: false
        },
        prepend:{
            type: String,
            default: "mdi-magnify",
            required: false
        },
        clear:{
            type: String,
            default: "mdi-close",
            required: false
        },
        color:{
            type: String,
            default: "var(--dark-blue)",
            required: false
        },
        clearable:{
            type: Boolean,
            default: true,
            required: false
        }
    }, 
    methods:{
        emitTypeEvent(e : HTMLInputElement){
            this.$emit('type', e.target?.value);
        }
    },
    emits: ['type']
}
</script>

<style scoped>
</style>