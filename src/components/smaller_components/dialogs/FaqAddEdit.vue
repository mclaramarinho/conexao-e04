<template>
    <v-card class="py-4">
        <v-card-title>
            <h3 class="text-center font-blue" style="text-wrap: balance;">{{ title }}</h3>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Pergunta" :model-value="question" @input="e => question = e.target.value"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea variant="outlined" label="Resposta" :model-value="answer" @input="e => answer = e.target.value"></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="var(--black)" size="large" class="font-12" variant="tonal" @click="$emit('cancel')">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="var(--green)" size="large" class="font-12" variant="tonal" @click="saveFAQ">Salvar</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { createFAQ, updateFAQ, type IFaq } from '@/https/faqs';
export default {
    name: 'faq-add-edit',
    props: {
        variant: String as () => "edit" | "add",
        item: {
            type: Object as () => {id: string, question: string, answer: string },
            required: false
        }
    },
    data(){
        return {
            title: this.variant === "edit" ? "Editar FAQ" : "Adicionar FAQ",
            dialog: false,
            question: this.item?.question || "",
            answer: this.item?.answer || ""
        }
    },
    methods:{
        saveFAQ(){
            // If edit, create a new item with the create method
            this.variant === 'edit' && this.editFAQ();

            // If create, update the item with the update method
            this.variant === 'add' && this.createNewFAQ();
        },

        createNewFAQ(){

            if(!this.question || !this.answer){
                //error message
                return;
            }
            const data = {
                question: this.question,
                answer: this.answer
            } as IFaq;

            createFAQ(data).then(r => {
                // on success, show a success message
                this.$emit("done", r)
            }).catch(e => {
                // on failure, show an error message
                console.log(e)
            })
            
           
        },

        editFAQ(){
            // Call the http update method to update the faq item
            if(!this.question || !this.answer){
                //error message
                return;
            }
            const data = {
                question: this.question,
                answer: this.answer
            } as IFaq;

            updateFAQ(data, this.item?._id as string)
            .then(r =>{
                // on success, show a success message
                this.$emit("done", r)
            })
            .catch(e => {
                // on failure, show an error message
                console.log(e)
            })
            
            
        }
    },
    emits: ['cancel', 'done']
}
</script>