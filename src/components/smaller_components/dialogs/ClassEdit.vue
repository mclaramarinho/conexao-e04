<template>
    <v-card class="py-4">
        <v-card-title>
            <h3 class="text-center font-blue" style="text-wrap: balance;">Editar Disciplina</h3>
        </v-card-title>
        <v-card-text>
            <v-form ref="editClassForm" :disabled="!allowEditing">
                <v-row>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Disciplina" :model-value="classInfo.name" 
                                :rules="maxChars(20)" validate-on="input"
                                @input="(e : any) => classInfo.name = e.target.value" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Professor" :model-value="classInfo.teacher"
                                validate-on="input" :rules="maxChars(20)"
                                @input="(e : any) => classInfo.teacher = e.target.value" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Sala" :model-value="classInfo.classroom"
                                validate-on="input" :rules="maxChars(10, false)"
                                @input="(e : any) => classInfo.classroom = e.target.value" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Prova 1" type="datetime-local" 
                                :model-value="classInfo.exam_1_timestamp" 
                                @input="(e : any) => classInfo.exam_1_timestamp = e.target.value" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Prova 2" type="datetime-local"
                                :model-value="classInfo.exam_2_timestamp"
                                @input="(e : any) => classInfo.exam_2_timestamp = e.target.value" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Segunda Chamada" type="datetime-local"
                                :model-value="classInfo.re_take_exam_timestamp"
                                @input="(e : any) => classInfo.re_take_exam_timestamp = e.target.value" />
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Prova Final" type="datetime-local"
                                :model-value="classInfo.final_exam_timestamp" 
                                @input="(e : any) => classInfo.final_exam_timestamp = e.target.value" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea variant="outlined" label="Observações" :model-value="classInfo.observations"
                                :rules="maxChars(100, false)" validate-on="input"        
                                @input="(e : any) => classInfo.observations = e.target.value" />
                    </v-col>
                </v-row>
                <p class="text-danger font-12 text-center">{{ errorMsg }}</p>
            </v-form>
            
        </v-card-text>
        
        <v-card-actions v-if="allowEditing">
            <v-spacer></v-spacer>
            <v-btn color="var(--black)" size="large" class="font-12" variant="tonal" @click="$emit('cancel')">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="var(--green)" size="large" class="font-12" variant="tonal" @click="editClass">Salvar</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import type { IClass, IClassGetBody } from '@/interfaces/Https';
import { getClass, updateClass } from '@/https/classes';
import { maxChars } from '@/utils/validations';
export default {
    name: 'class-edit',
    props: {
        id: {
            type: String,
            required: true
        },
        allowEditing:{
            type: Boolean,
            required: false,
            default: true
        }
    },
    data(){
        return {
            classInfo: {} as IClassGetBody,
            maxChars: maxChars,
            errorMsg: "" as string,
            showError: false as Boolean
        }
    },
    watch:{
        classInfo (val){
            this.showError = false;
        }
    },
    created(){
        this.fetchClass()
    },
    methods:{
        fetchClass(){
            getClass(this.id).then(r => {
                const data = r.response;
                this.classInfo = data;
            }).catch(e => {
                console.error(e);
            });
        },
        async editClass(){
            this.showError = false;
            const isValid = await this.$refs.editClassForm.validate();
            if(!isValid.valid){
                this.errorMsg = "Por favor, preencha todos os campos corretamente.";
                this.showError = true;
                return;
            }

            const ci = this.classInfo;
            // Call the http update method to update the faq item
            const data = {
                id: this.id,
                name: ci.name,
                teacher: ci.teacher,
                classroom: ci.classroom,
                exam1Date: ci.exam_1_timestamp,
                exam2Date: ci.exam_2_timestamp,
                retakeExamDate: ci.re_take_exam_timestamp,
                finalExamDate: ci.final_exam_timestamp,
                observations: ci.observations || null,
                endTime: ci.end_time,
                days: ci.days,
                startTime: ci.start_time
            } as IClass;

            updateClass(data, this.id)
            .then(r => {
                this.$emit("done", r);
            })
            .catch(e => {
                console.error(e)
                this.errorMsg = "Erro ao atualizar a disciplina. Por favor, tente novamente.";
                this.showError = true;
            });
            
            
            
        }
    },
    emits: ['cancel', 'done']
}
</script>

<style>
.v-theme--light{
    --v-disabled-opacity: 0.95 !important;
}
</style>