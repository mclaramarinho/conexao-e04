<template>
    <v-text-field
        :rules="emailValidation"
        @change="(e : any)=> $emit('update:email', e.target.value)"
        :model-value="email" validate-on="input"
        label="Email" class="mb-5" clearable clear-icon="mdi-close"
        variant="outlined" type="email"/>
</template>

<script lang="ts">
import { email as emailValidation } from '../../../utils/validations'

export default {
    name: 'email-field',
    props: {
        email: {
            type: String as () => string | null,
            required: true
        }
    },
    data() {
        return {
            emailValidation: emailValidation
        }
    },
    emits: ['update:email'],
}
</script>