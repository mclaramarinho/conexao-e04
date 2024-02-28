<template>
  <multiuse-data-table :headers="headers" :table-items="faqs" item-value="question"
              :add-new-button="true" 
              expandable expandable-item-key="answer"
              show-expandable-item-actions :expandable-item-actions="tableActions"
              @edit="e => editItem(e)" @delete="e => deleteItem(e)"
  >
    <template v-slot:addDialog>
        <faq-add-edit variant="add" />
    </template>
  </multiuse-data-table>

  <v-dialog v-model="dialogEdit" max-width="500px">
    <faq-add-edit variant="edit" :item="selectedItem" @cancel="dialogEdit = false" />
  </v-dialog>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <dialog-delete-item />
  </v-dialog>
</template>

<script lang="ts">
import DialogDeleteItem from '@/components/smaller_components/dialogs/DialogDeleteItem.vue';
import FaqAddEdit from '@/components/smaller_components/dialogs/FaqAddEdit.vue'
import MultiuseDataTable from '@/components/MultiuseDataTable.vue'
export default {
    name: 'faq-view',
    components: {
        FaqAddEdit, MultiuseDataTable, DialogDeleteItem
    },
  data: () => ({
    dialogAdd: false,
    dialogDelete: false,
    dialogEdit: false,
    selectedItem: {} as {id: string, question: string, answer: string},
    headers: [
      {
        title: 'Pergunta',
        align: 'start',
        sortable: true,
        key: 'question'
      },
    ],
    faqs: [
        {
            id: "123423",
            question: "What is the capital of France?",
            answer: "Paris"
        },
        {
            id: "123423",
            question: "Who is the president of the United States?",
            answer: "Joe Biden"
        },
        {
            id: "123423",
            question: "What is the capital of Peru?",
            answer: "Lima"
        },
        {
            id: "123423",
            question: "Who is the president of Brazil?",
            answer: "Jair Bolsonaro. Unfortunately."
        },
        {
            id: "123423",
            question: "What is the capital of Argentina?",
            answer: "Buenos Aires"
        },
        {
            id: "123423",
            question: "Who is the president of Argentina?",
            answer: "Alberto Fernández"
        },
        {
            id: "123423",
            question: "What is the capital of Chile?",
            answer: "Santiago"
        },
        {
            id: "123423",
            question: "Who is the president of Chile?",
            answer: "Sebastián Piñera"
        },
        {
            id: "123423",
            question: "What is the capital of Colombia?",
            answer: "Bogotá"
        },
        {
            id: "123423",
            question: "Who is the president of Colombia?",
            answer: "Iván Duque Márquez"
        },
        {
            id: "123423",
            question: "What is the capital of Venezuela?",
            answer: "Caracas"
        },
        {
            id: "123423",
            question: "Who is the president of Venezuela?",
            answer: "Nicolás Maduro"
        },
        {
            id: "123423",
            question: "What is the capital of Ecuador?",
            answer: "Quito"
        },
        {
            id: "123423",
            question: "Who is the president of Ecuador?",
            answer: "Lenín Moreno"
        },
        {
            id: "123423",
            question: "What is the capital of Bolivia?",
            answer: "Sucre"
        },
        {
            id: "123423",
            question: "Who is the president of Bolivia?",
            answer: "Luis Arce"
        },
        {
            id: "123423",
            question: "What is the capital of Paraguay?",
            answer: "Asunción"
        },
        {
            id: "123423",
            question: "Who is the president of Paraguay?",
            answer: "Mario Abdo Benítez"
        },
        {
            id: "123423",
            question: "What is the capital of Uruguay?",
            answer: "Montevideo"
        },
        {
            id: "123423",
            question: "Who is the president of Uruguay?",
            answer: "Luis Lacalle Pou"
        }
    ] as {id: string, question: string, answer: string}[],
    tableActions:[
      {name: 'Excluir', color: 'var(--danger-red)', eventName: 'delete', prependIcon:'mdi-delete'},
      {name: 'Editar', color: 'var(--dark-blue)', eventName: 'edit', prependIcon:'mdi-pencil'}
    ]
  }),
  created() {
  },

  methods: {
    editItem(item) {
        console.log(item);
        this.selectedItem = Object.assign({}, item)
        this.dialogEdit = true;
    },

    deleteItem(item) {       
        this.selectedItem = Object.assign({}, item)
        this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.closeDelete()
    },

    closeDelete() {
        
        this.dialogDelete = false
    },

    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem)
    //   } else {
    //     this.desserts.push(this.editedItem)
    //   }
    //   this.close()
    // }
  }
}
</script>

