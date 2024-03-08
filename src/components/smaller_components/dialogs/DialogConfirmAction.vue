<template>
    <v-card class="p-4">
        <v-card-title class="mb-3">
            <h3 class="font-blue text-center" style="text-wrap: balance;">{{message}}</h3>
       </v-card-title>

       <v-card-subtitle>
            <v-row no-gutters>
                <pswd-field :pswd="pswdConfirm" @update:pswd="e => pswdConfirm = e" /> 
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
import PswdField from '@/components/smaller_components/text-fields/PswdField.vue'
export default {
    name: 'dialog-confirm-action',
    components: {PswdField},
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