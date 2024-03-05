<template>
    <v-form validate-on="submit" ref="form">
        <v-row no-gutters justify="space-between">
            <v-col cols="12" md="6">
                <v-row no-gutters>
                    <v-col cols="12" class="mb-5 mt-2 mb-0">
                        <v-text-field
                            type="text" variant="outlined" hide-details="auto" autocomplete="on"
                            label="Disciplina" :model-value="classes.name"
                            :rules="maxChars(20)" validate-on="input"
                            @input="(e : any) => classes.name = e.target?.value" />
                    </v-col>
                    
                    <v-col cols="12" class="mb-5">
                        <v-text-field variant="outlined" hide-details="auto" type="text"
                            validate-on="input" :rules="maxChars(20)"
                            label="Professor" :model-value="classes.teacher"
                            @input="(e : any) => classes.teacher = e.target?.value" />
                    </v-col>
                    <v-col cols="12" class="mb-5">
                        <v-text-field variant="outlined" hide-details="auto" type="text"
                            validate-on="input" :rules="maxChars(10, false)"
                            label="Sala" :model-value="classes.classroom"
                            @input="(e : any) => classes.classroom = e.target?.value" />
                    </v-col>
                </v-row>
                <v-row no-gutters class="column-gap-5">
                    <v-col cols="12" class="mb-3">
                        <v-textarea label="Observações" variant="outlined" persistent-counter
                            :model-value="classes.observations" counter
                            :rules="maxChars(100, false)" validate-on="input"
                            @change="(e : any) => classes.observations = e.target?.value"/>
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between">
                    <v-col cols="12" lg="5">
                        <v-text-field variant="outlined" type="datetime-local"
                            :model-value="classes.exam1Date" label="Avaliação 1"
                            @change="(e : any) => classes.exam1Date = e.target.value" />
                        
                    </v-col>
                    <v-col cols="12" lg="5">
                        <v-text-field variant="outlined" type="datetime-local"
                            :model-value="classes.exam2Date" label="Avaliação 2"
                            @change="(e : any) => classes.exam2Date = e.target.value" />
                    </v-col>
                </v-row>
                <v-row no-gutters justify="space-between">
                    <v-col cols="12" lg="5">
                        <v-text-field variant="outlined" type="datetime-local"
                            :model-value="classes.retakeExamDate" label="Segunda chamada"
                            @change="(e : any) => classes.retakeExamDate = e.target.value" />
                        
                    </v-col>
                    <v-col cols="12" lg="5">
                        <v-text-field variant="outlined" type="datetime-local"
                            :model-value="classes.finalExamDate" label="Avaliação Final"
                            @change="(e : any) => classes.finalExamDate = e.target.value" />
                    </v-col>
                </v-row>
                
            </v-col>
            <v-col cols="12" md="5">
                <v-row no-gutters>
                    <h3>Horário de aula</h3>
                    <v-col cols="12">
                        <v-checkbox variant="outlined" hide-details
                            label="Disciplina EAD" :model-value="onlineClass"
                            @input="(e : any) => markAsOnline(e.target.checked)" />
                    </v-col>
                    <v-container fluid v-if="!onlineClass" class="p-0">
                        <v-row no-gutters justify="space-between" class="p-0 mb-3" v-for="i in classes.days.length" :key="'day'+i" :id="'day'+i">

                            <v-select variant="outlined" :items="weekdays" class="w-100 mb-5" hide-details="auto"
                                        item-title="title" item-value="value"
                                        :rules="notEmpty" validate-on="input"
                                        :model-value="classes.days[i-1] === '' ? null : classes.days[i-1]"
                                        :append-icon="chooseDeleteIcon()" @click:append="e => deleteDayItem(i)"
                                        label="Dia da semana" @update:model-value="(e : any) => classes.days[i-1] = weekdays[e-1].title"/> 
                            <v-col cols="12" md="5">
                                <v-text-field variant="outlined" type="time" 
                                        label="Início" :model-value="classes.startTime[i-1]"
                                        @input="(e : any) => classes.startTime[i-1] = e.target.value" />
                            </v-col>
                            <v-col cols="12" md="5">
                                <v-text-field variant="outlined" type="time" z
                                        label="Fim" :model-value="classes.endTime[i-1]"
                                        @input="(e : any) => {classes.endTime[i-1] = e.target.value; handleInput(e.target.value)}" />
                            </v-col>
                        </v-row>
                        <v-row no-gutters justify="end">
                            <v-btn icon="mdi-plus" :disabled="disableAddDayItem" @click="(e : any) => addDayItem()"></v-btn>
                        </v-row>
                    </v-container>
                    
                </v-row>
                <v-row no-gutters>
                    <text-btn  text="Salvar" variant="outlined" :center="false" @click="(e : any) => handleClassCreation()" />
                    <v-col cols="12" class="mt-5">
                        <p class="font-red font-12" v-if="showError">{{ errorMessage }}</p>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import TextBtn from '@/components/smaller_components/buttons/TextBtn.vue';
import {maxChars, telephone, email, notEmpty} from '@/utils/validations'
import { createClass, type IClass } from '@/https/classes';
export default {
    name: 'new-class-form',
    components: {
        TextBtn
    },
    data(){
     return{
            classes:{
                name: '' as string,
                days: [''] as string[],
                startTime: [''] as string[],
                endTime: [''] as string[],
                classroom: '' as string,
                teacher: '' as string,
                exam1Date: '' as string,
                exam2Date: '' as string,
                retakeExamDate: '' as string,
                finalExamDate: '' as string,
                observations: '' as string,
            } as IClass,
            maxChars: maxChars,
            telephone: telephone,
            email: email,
            notEmpty: notEmpty,
            errorMessage: null as null | string,
            showError: false as boolean,
            disableAddDayItem: true as boolean,
            onlineClass: false as boolean,
            weekdays: [
                {title: 'Segunda-Feira', value: 1},
                {title: 'Terça-Feira', value: 2},
                {title: 'Quarta-Feira', value: 3},
                {title: 'Quinta-Feira', value: 4},
                {title: 'Sexta-Feira', value: 5},
                {title: 'Sábado', value: 6},
            ]
        }
    },
    methods:{
        async handleClassCreation(){
            const validation = await (this.$refs.form as any)?.validate();
            
            if(validation.valid){
                this.showError = false;
                createClass(this.classes)
                .then(r => {
                    (this.$refs.form as any)?.reset()
                    // TODO - Show success message
                })
                .catch(e => {
                    // TODO - Show error message
                });
            }else{
                this.errorMessage = "Preencha todos os campos corretamente";
                this.showError = true;
            }
        },
        markAsOnline(value : boolean){
            this.onlineClass = value;
            if(value){
                if(this.classes.days.length === 1 && this.classes.days[0] === ''){
                    this.classes.days.pop();
                    this.classes.startTime.pop();
                    this.classes.endTime.pop();
                }
            }else{
                if(this.classes.days.length === 0){
                    // TODO - Create function to create slot
                    this.classes.days.push('');
                    this.classes.startTime.push('');
                    this.classes.endTime.push('');
                }
            }
        },
        chooseDeleteIcon(){
            if(this.classes.days.length > 1){
                return 'mdi-delete';
            }
            return '';
        },
        deleteDayItem(i : number){
            this.classes.days.splice((i-1), 1)
            this.classes.startTime.splice((i-1), 1)
            this.classes.endTime.splice((i-1), 1)
        },
        addDayItem(){
            const len = this.classes.days.length;
            const day = this.classes.days[len-1];
            const start = this.classes.startTime[len-1];
            const end = this.classes.endTime[len-1];
            
            const isUndefined = day === undefined || start === undefined || end === undefined;
            const isNull = day === null || start === null || end === null;
            const isEmpty = day === '' || start === '' || end === '';
            console.log(isUndefined, isNull, isEmpty);
            
            if(isUndefined || isNull || isEmpty){
                console.log(this.classes.days, this.classes.startTime, this.classes.endTime);
                
                return;
            }else{
                // TODO - Create function to create slot
                this.classes.days.push('');
                this.classes.startTime.push('');
                this.classes.endTime.push('');
                return;
            }
        },
        handleInput(value : string){
           if(value === undefined || value === null || value === ''){
               this.disableAddDayItem = true;
           }
           const len = this.classes.days.length;
           if(this.classes.days[len-1] !== '' && this.classes.startTime[len-1] !== '' && this.classes.endTime[len-1] !== ''){
               this.disableAddDayItem = false;
           }
        }
    }
}
</script>