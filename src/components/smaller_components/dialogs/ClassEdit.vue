<template>
    <v-card class="py-4">
        <v-card-title>
            <h3 class="text-center font-blue" style="text-wrap: balance;">Editar Disciplina</h3>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Disciplina" 
                                :model-value="name"
                                @input="e => name = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Professor" 
                                :model-value="teacher"
                                @input="e => teacher = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Sala" 
                                :model-value="classroom"
                                @input="e => classroom = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Prova 1" 
                                type="datetime-local"
                                :model-value="exam1Date"
                                @input="e => exam1Date = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Prova 2" 
                                type="datetime-local"
                                :model-value="exam2Date"
                                @input="e => exam2Date = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Segunda Chamada"
                                type="datetime-local"
                                :model-value="retakeExamDate"
                                @input="e => retakeExamDate = e.target.value">
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field variant="outlined" label="Prova Final" 
                                type="datetime-local"
                                :model-value="finalExamDate"
                                @input="e => finalExamDate = e.target.value">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-textarea variant="outlined" label="Observações" 
                                :model-value="observations" @input="e => observations = e.target.value" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="var(--black)" size="large" class="font-12" variant="tonal" @click="$emit('cancel')">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="var(--green)" size="large" class="font-12" variant="tonal" @click="editClass  ">Salvar</v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { updateContact } from '@/https/contacts';
import type { IContact } from '@/https/contacts';
import type { IClass } from '@/https/classes';
import type IClassesView from '@/interfaces/IClassesView';
import { getClass, updateClass } from '@/https/classes';
export default {
    name: 'class-edit',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data(){
        return {
            name: "",
            teacher: "",
            classroom: "",
            exam1Date: "",
            exam2Date: "",
            retakeExamDate: "",
            finalExamDate: "",
            observations: "",
            endTime: [],
            days: [],
            startTime: []
        }
    },
    created(){
        console.log(this.id);
        
        this.fetchClass()


    },
    methods:{
        fetchClass(){
            getClass(this.id).then(r => {
                const data = r.response;
                this.name = data.name;
                this.teacher = data.teacher;
                this.classroom = data.classroom;
                this.exam1Date = data.exam_1_timestamp;
                this.exam2Date = data.exam_2_timestamp;
                this.retakeExamDate = data.re_take_exam_timestamp;
                this.finalExamDate = data.final_exam_timestamp;
                this.observations = data.observations;
                this.days = data.days;
                this.startTime = data.start_time;
                this.endTime = data.end_time;

            }).catch(e => {
                console.error(e);
            });
        },
        editClass(){
            const name = this.name;
            const teacher = this.teacher;
            const classroom = this.classroom;
            const exam1Date = this.exam1Date;
            const exam2Date = this.exam2Date;
            const retakeExamDate = this.retakeExamDate;
            const finalExamDate = this.finalExamDate;
            const observations = this.observations;
            if(!name || !teacher || !classroom || !exam1Date || !exam2Date || !retakeExamDate || !finalExamDate){
                // Show an error message
                return;
            }
            
            // Call the http update method to update the faq item
            const data = {} as IClass;
            data.name = name;
            data.teacher = teacher;
            data.classroom = classroom;
            data.exam1Date = exam1Date;
            data.exam2Date = exam2Date;
            data.retakeExamDate = retakeExamDate;
            data.finalExamDate = finalExamDate;
            data.observations = observations || null;
            data.endTime = this.endTime;
            data.days = this.days;
            data.startTime = this.startTime;


            updateClass(data, this.id)
            .then(r => {this.$emit("done", r); console.log(r);})
            .catch(e => console.error(e));
            
            // on success, show a success message
            // on failure, show an error message
        }
    },
    emits: ['cancel', 'done']
}
</script>