<template>
    <v-card class="p-4">
        <v-card-title class="mb-3">
            <!-- TODO - create a global class for text-wrap: balance -->
            <h3 class="font-blue text-center" style="text-wrap: balance;">Tem certeza que deseja excluir {{what}}?</h3>
       </v-card-title>

       <v-card-subtitle>
            <slot name="extra" />
       </v-card-subtitle>
        
        <v-card-actions class="mt-5">
            <v-spacer></v-spacer>
            <v-btn color="var(--dark-blue)" size="large" class="font-12" variant="tonal" @click="$emit('closeDelete')">Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="var(--danger-red)" size="large" class="font-12" variant="tonal" @click="$emit('deleteItemConfirm')">Sim</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
export default {
    name: 'dialog-delete-item',
    props: {
        what: {type: String, default: 'esse item', required: false}
    },
    emits: ['closeDelete', 'deleteItemConfirm']
}
</script>