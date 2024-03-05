<template>
    <v-card class="p-4">
        <v-card-title class="mb-3">
            <h3 class="font-blue text-center" style="text-wrap: balance;">{{message}}</h3>
       </v-card-title>

       <v-card-subtitle>
            <v-row no-gutters>
                <!-- TODO - Use the existing customized pswd field component -->
                <v-text-field type="password" :model-value="pswdConfirm"
                        variant="outlined" label="Confirme sua senha" 
                        @input="(e : any) => pswdConfirm = e.target.value"
                        class="w-75 mx-auto mt-3"></v-text-field>
            </v-row>
            <slot name="extra" />
       </v-card-subtitle>

        <v-card-actions class="mt-5 d-flex justify-content-between">
            <div v-for="(action, i) in actions" :key="i">
                <v-btn :color="action.color" size="large" class="font-12" variant="tonal" 
                        @click="action.returnPswd ? $emit(action.action, pswdConfirm) : $emit(action.action, null)">
                    {{ action.label }}
                </v-btn>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">

export default {
    name: 'dialog-confirm-action',
    props: {
        message: {type: String, default: 'Sua senha é necessária para confirmar essa ação.', required: false},
        actions: {
            type: Array<{
                action: string, label: string, color: string, returnPswd: boolean
            }>,
            required: false,
            default: [
                {action: 'cancel', label: 'Cancelar', color: 'var(--dark-blue)', returnPswd: false},
                {action: 'confirm', label: 'Continuar', color: 'var(--green)', returnPswd: true},
            ]
        }
    },
    data(){
        return {
            pswdConfirm: null as string | null,
        }
    },
}
</script>