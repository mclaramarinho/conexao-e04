<template>
  <multiuse-data-table :headers="headers" :table-items="faqs" item-value="question"
              expandable expandable-item-key="answer"
              show-expandable-item-actions :expandable-item-actions="tableActions"
              @update="fetchItems()" :loading="loading"
              @edit="e => editItem(e)" @delete="e => deleteItem(e)"
  >
    <template v-slot:addDialog>
        <v-dialog v-model="dialogAdd" max-width="500px">
            <template v-slot:activator>
                <v-btn color="var(--dark-blue)" v-model="dialogAdd" @click="dialogAdd = true" dark class="">Criar Nova</v-btn>
            </template>
            <faq-add-edit variant="add" @cancel="dialogAdd = false" @done="dialogAdd = false" />
        </v-dialog>
    </template>
  </multiuse-data-table>

  <v-dialog v-model="dialogEdit" max-width="500px">
    <faq-add-edit variant="edit" :item="selectedItem" @cancel="dialogEdit = false" @done="dialogEdit=false" />
  </v-dialog>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <dialog-delete-item />
  </v-dialog>
</template>

<script lang="ts">
import DialogDeleteItem from '@/components/smaller_components/dialogs/DialogDeleteItem.vue';
import FaqAddEdit from '@/components/smaller_components/dialogs/FaqAddEdit.vue'
import MultiuseDataTable from '@/components/MultiuseDataTable.vue'
import {getAllFAQs} from '@/https/faqs'

export default {
    name: 'faq-view',
    components: {
        FaqAddEdit, MultiuseDataTable, DialogDeleteItem
    },
  data: () => ({
    dialogAdd: false,
    dialogDelete: false,
    loading: false,
    dialogEdit: false,
    // TODO - Use an interface for selectedItem
    selectedItem: {} as {id: string, question: string, answer: string},
    headers: [
      {
        title: 'Pergunta',
        align: 'start',
        sortable: true,
        key: 'question'
      },
    ],
    faqs: [] as Array<Object>,
    tableActions:[
      {name: 'Excluir', color: 'var(--danger-red)', eventName: 'delete', prependIcon:'mdi-delete'},
      {name: 'Editar', color: 'var(--dark-blue)', eventName: 'edit', prependIcon:'mdi-pencil'}
    ]
  }),
  created() {
    this.fetchItems()
  },

  methods: {
    async fetchItems(){
        this.loading = true;
        const res = await getAllFAQs();
        if(res.code === 200){
            this.faqs = res.response;
        }else{
            // TODO - Show error message
        }
        this.loading = false;
    },
    // TODO - Set a type for item
    editItem(item) {
        this.selectedItem = item
        this.dialogEdit = true;
    },
    // TODO - Set a type for item
    deleteItem(item) {       
        this.selectedItem = item
        this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.closeDelete()
    },

    closeDelete() {
        this.dialogDelete = false
    },
  }
}
</script>

