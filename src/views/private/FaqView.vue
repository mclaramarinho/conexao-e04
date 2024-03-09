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
            <faq-add-edit variant="add" @cancel="dialogAdd = false"
              @done="e => doneEditing(e)" @error="e => $emit('error', e)" />
        </v-dialog>
    </template>
  </multiuse-data-table>

  <v-dialog v-model="dialogEdit" max-width="500px">
    <faq-add-edit variant="edit" :item="selectedItem"
        @cancel="dialogEdit = false" @done="e => doneEditing(e)"
        @error="e => $emit('error', e)" />
  </v-dialog>
  <v-dialog v-model="dialogDelete" max-width="500px" @update:model-value="dialogDelete=false">
    <dialog-delete-item @delete-item-confirm="deleteItemConfirm" @close-delete="dialogDelete = false" />
  </v-dialog>
</template>

<script lang="ts">
import DialogDeleteItem from '@/components/smaller_components/dialogs/DialogDeleteItem.vue';
import FaqAddEdit from '@/components/smaller_components/dialogs/FaqAddEdit.vue'
import MultiuseDataTable from '@/components/MultiuseDataTable.vue'
import {deleteFAQ, getAllFAQs} from '@/https/faqs'
import type { IFaqGetBody } from '@/interfaces/Https';
import type { IHTTPResponse } from '@/https/setup';

export default {
    name: 'faq-view',
    components: {
        FaqAddEdit, MultiuseDataTable, DialogDeleteItem, 
    },
  data: () => ({
    dialogAdd: false,
    dialogDelete: false,
    loading: false,
    dialogEdit: false,
    selectedItem: {} as IFaqGetBody,
    headers: [
      {
        title: 'Pergunta',
        align: 'start',
        sortable: true,
        key: 'question'
      },
    ],
    faqs: [] as Array<IFaqGetBody>,
    tableActions:[
      {name: 'Excluir', color: 'var(--danger-red)', eventName: 'delete', prependIcon:'mdi-delete'},
      {name: 'Editar', color: 'var(--dark-blue)', eventName: 'edit', prependIcon:'mdi-pencil'}
    ],
  }),
  created() {
    this.fetchItems();
  },

  methods: {
    async fetchItems(){
        this.loading = true;
        const res = await getAllFAQs();
        if(res.code === 200){
            this.faqs = res.response;
        }else{
          this.$emit('error', 'Ocorreu um erro ao procurar os FAQs.');
        }
        this.loading = false;
    },
    editItem(item : IFaqGetBody) {
        this.selectedItem = item;
        this.dialogEdit = true;
    },
    deleteItem(item : IFaqGetBody) {       
        this.selectedItem = item;
        this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.closeDelete();
      try{
        const delRes = await deleteFAQ(this.selectedItem._id);
        console.log(delRes)
        if(delRes.code===204){
          await this.fetchItems()
          this.$emit('success', 'Pergunta excluída com sucesso!');
        }else{
          throw new Error()
        }
      }catch(err){
        this.$emit('error', 'Encontramos um erro inesperado.')
      }
      
    },

    closeDelete() {
        this.dialogDelete = false;
    },
    async doneEditing(event : IHTTPResponse){
      if(event.data.method === 'POST'){
        this.dialogAdd = false;
        await this.fetchItems()
        this.$emit('success', 'Pergunta criada com sucesso!')
      }else if(event.data.method === 'PUT'){
        this.dialogEdit = false;
        await this.fetchItems()
        this.$emit('success', 'FAQ atualizado com sucesso!')
      }
    }
  }
}
</script>

