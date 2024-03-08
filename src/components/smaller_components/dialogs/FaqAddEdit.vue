<template>
    <v-card class="py-4">
        <v-card-title>
            <h3 class="text-center font-blue text-wrap-balance">{{ title }}</h3>
        </v-card-title>
        <v-card-text>
            <v-form ref="faqAddEditForm">
                <v-row>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Pergunta"
                                :model-value="question" @input="(e : any) => question = e.target.value" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea variant="outlined" label="Resposta"
                                :model-value="answer" @input="(e : any) => answer = e.target.value" />
                    </v-col>
                </v-row>
            </v-form>
            <v-row v-if="showError" no-gutters class="text-danger">
                <p class="mx-auto">{{ errorMsg }}</p>
            </v-row>
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
import { createFAQ, updateFAQ } from '@/https/faqs';
import type { IFaq, IFaqGetBody } from '@/interfaces/Https';
export default {
    name: 'faq-add-edit',
    props: {
        variant: String as () => "edit" | "add",
        item: {
            type: Object as () => IFaqGetBody,
            required: false
        }
    },
    data(){
        return {
            title: this.variant === "edit" ? "Editar FAQ" : "Adicionar FAQ",
            dialog: false,
            question: this.item?.question || "",
            answer: this.item?.answer || "",
            showError: false as boolean,
            errorMsg: '' as string
        }
    },
    methods:{
        saveFAQ(){
            // If edit, create a new item with the create method
            this.variant === 'edit' && this.editFAQ();

            // If create, update the item with the update method
            this.variant === 'add' && this.createNewFAQ();
        },

        async createNewFAQ(){
            const validation = await this.$refs.faqAddEditForm.validate();
            
            if(!validation.valid){
                this.setError()
                return;
            }
            const data = {
                question: this.question,
                answer: this.answer
            } as IFaq;

            createFAQ(data).then(r => {
                this.$emit("done", r)
            }).catch(e => {
                this.$emit('error', 'Encontramos um erro ao cadastrar a pergunta.')
                console.log(e)
            })
            
           
        },

        editFAQ(){
            // Call the http update method to update the faq item
            if(!this.question || !this.answer){
                this.setError()
                return;
            }
            const data = {
                question: this.question,
                answer: this.answer
            } as IFaq;
            
            updateFAQ(data, this.item?._id as string)
            .then(r =>{
                if(r.code === 200){
                    this.$emit("done", r)
                }else{
                    throw new Error('not-updated/error')
                }
            })
            .catch(e => {
                this.$emit('error', 'Encontramos um erro ao atualizar o FAQ.')
                console.log(e)
            })
        },
        setError(){
            this.errorMsg = 'Preencha todas as informações corretamente';
            this.showError = true;
        }
    },
    emits: ['cancel', 'done', 'error']
}
</script>