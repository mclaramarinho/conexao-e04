<template>
    <v-text-field
        :rules="pswdValidation" @change="(e:any) => $emit('update:pswd', e.target.value)"
        :model-value="pswd" validate-on="input"
        label="Senha" variant="outlined" 
        :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="() => show = !show"
        class="mb-5" :type="show ? 'text' : 'password'" />
</template>

<script lang="ts">
import { password as pswdValidation } from '../../../utils/validations'

export default {
    name: 'pswd-field',
    props: {
        pswd: {
            type: String as () => string | null,
            required: true
        }
    },
    data() {
        return {
            pswdValidation: pswdValidation,
            show: false as Boolean
        }
    },
    emits: ['update:pswd'],
}
</script>