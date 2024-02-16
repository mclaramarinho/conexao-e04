<template>
    <v-btn 
        :size="size"
        :text="text"
        variant="text"
        :color="color"
        :class="'mx-auto w-fit' + classes"
        @click="() => $emit('clicked', value)" />
</template>

<script lang="ts">
export default {
    name: 'text-btn',
    props: {
        text: {
            type: String,
            required: true
        },
        size:{
            type: String,
            default: "large",
            required: false
        },
        color:{
            type: String,
            default: "var(--dark-blue)",
            required: false
        },
        classes:{
            type: String,
            default: "",
            required: false
        },
        value:{
            type: String,
            default: "def",
            required: false
        }
    }
}
</script>
