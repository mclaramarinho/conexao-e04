<template>
    <!-- TODO - Check if custom-expanded-row-element is still necessary -->
    <multiuse-data-table :headers="headers" :table-items="tabelaitems"
            item-value="email" refresh-button :loading="loading"
            @update="refreshContacts" 
            expandable expandable-item-key="when_to_contact" custom-expanded-row-element
            show-expandable-item-actions :expandable-item-actions="tableActions"
            @delete="e => handleDeleteDialog(e)" @edit="(e) => handleEditDialog(e)">

        <template v-slot:expandedRowEl="{cols, item}">
                <tr>
                    <td :colspan="cols.length">
                        <v-table class="font-12 font-blue">
                            <thead>
                                <tr>
                                    <th>Quando contatar?</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ item.when_to_contact }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </td>
                </tr>
        </template>
    </multiuse-data-table>

    <v-dialog v-model="dialogDelete" max-width="500px">
        <dialog-delete-item @delete-item-confirm="delContact" @close-delete="dialogDelete = false" />
    </v-dialog>
    <v-dialog v-model="dialogEdit" max-width="500px">
        <!-- TODO - Create a function to handle @done event -->
        <contact-edit :item="selectedItem" @cancel="dialogEdit = false" @done="e => {dialogEdit = false; refreshContacts()}" />
    </v-dialog>
</template>

<script lang="ts">
import MultiuseDataTable from '@/components/MultiuseDataTable.vue'
import { deleteContact, getContacts } from '@/https/contacts';
import DialogDeleteItem from '@/components/smaller_components/dialogs/DialogDeleteItem.vue';
import ContactEdit from '@/components/smaller_components/dialogs/ContactEdit.vue';
export default {
    name: 'contact-view',
    components: {
        MultiuseDataTable, DialogDeleteItem, ContactEdit
    },
    data(){
        return{
            loading: false as boolean,
            dialogEdit: false as boolean,
            dialogDelete: false as boolean,
            useContactsList: [] as any,
            // TODO - Set the type of selectedItem
            selectedItem: {} as Object,
            tabelaitems: [],
            headers: [
                {
                    title: 'Nome',
                    key: 'name',
                    align: 'left',
                    sortable: true
                },
                {
                    title: 'Email',
                    key: 'email',
                    align: 'left',
                    sortable: true
                },
                {
                    title: 'Telefone',
                    key: 'phone_number',
                    align: 'left',
                    sortable: false
                },
                {
                    title: '',
                    key: 'actions',
                    align: 'center',
                    sortable: false
                }
            ],
            tableActions:[
                {name: 'Excluir', color: 'var(--danger-red)', eventName: 'delete', prependIcon:'mdi-delete'},
                {name: 'Editar', color: 'var(--dark-blue)', eventName: 'edit', prependIcon:'mdi-pencil'}
            ]
        }
    },
    created(){
        this.refreshContacts()
    },
    methods:{ 
        handleDeleteDialog(item : Object){
            this.dialogDelete = true
            this.selectedItem = item
        },
        handleEditDialog(item : Object){
            this.dialogEdit = true
            this.selectedItem = item
        },
        async refreshContacts(){
            this.loading = true;
            await getContacts().then(r => this.tabelaitems = r.response)
            this.loading = false;
        },
        async delContact(){
            await deleteContact(this.selectedItem._id)
            
            this.dialogDelete = false;
            this.refreshContacts()
        },
    }
}
</script>
