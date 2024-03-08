<template>

<v-snackbar :model-value="open" :timeout="timeout" :color="customColor" location="bottom right" 
            max-width="500px" :timer="customColor" variant="tonal"
            @update:model-value="$emit('close')">
    {{ msg }}
    <template #actions>
       <v-btn icon="mdi-close" @click="$emit('close')"></v-btn>
    </template>
</v-snackbar>

</template>

<script lang="ts">
import type { SnackbarType } from '@/interfaces/types';
export default{
    name: 'error-success-sb',
    props:{
        msg:{
            type: String,
            required: false,
            default: 'Sucesso!'
        },
        type: {
            type: String as () => SnackbarType,
            required: true,
        },
        timeout:{
            type: Number,
            required: false,
            default: 3000
        },
        showCloseButton:{
            type: Boolean,
            required: false,
            default: true
        },
        open:{
            type: Boolean,
            required: true
        },
        color:{
            type: String,
            required: false,
        }
    },
    computed:{
        customColor(){
            let c = '';
            if(this.color){
                c = this.color;
            }else{
                if(this.type === 'success'){
                    c = 'var(--green)';
                }else{
                    c = 'var(--danger-red)'
                }
            }
            return c
        }
    },
    emits:['close'],
}
</script>

<style>
.v-snackbar__content{
    font-size: 12px !important;
}
</style>