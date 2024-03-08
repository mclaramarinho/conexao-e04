<template>
    <multiuse-data-table :headers="headers" :table-items="classes"
        expandable :expandable-item-actions="tableActions" show-expandable-item-actions
        :loading="loadingTable"
        @edit="e => handleEditDialog(e)" @delete="e => handleDeleteDialog(e)"
        @update="() => fetchClasses()">
        <template #expandedRowEl="{cols, item}">
                <tr>
                    <td :colspan="cols.length">
                        <v-table class="font-blue font-12 w-100">
                            <thead>
                                <tr>
                                    <th>Prova 1</th>
                                    <th>Prova 2</th>
                                    <th>Segunda Chamada</th>
                                    <th>Prova Final</th>
                                    <th>Observações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ item.exam1Date }}</td>
                                    <td>{{ item.exam2Date }}</td>
                                    <td>{{ item.retakeExamDate }}</td>
                                    <td>{{ item.finalExamDate }}</td>
                                    <td>{{ item.observations }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                    </td>
                </tr>

        </template>
        <template #schedule="{ item }">
            <tr v-for="(sched, index) in item.schedule" :key="index">
                <td>{{ sched }}</td>
            </tr>
        </template>
    </multiuse-data-table>
    <v-dialog v-model="showDeleteDialog" max-width="500px">
        <dialog-delete-item @delete-item-confirm="deleteItem" @close-delete="showDeleteDialog = false" />
    </v-dialog>
    <v-dialog v-model="showEditDialog" max-width="500px">
        <class-edit :id="(selectedItem.id as string)" @cancel="showEditDialog = false" @done="doneEditing" />
    </v-dialog>
</template>

<script lang="ts">
import { getAllClasses, deleteClass } from '@/https/classes';
import type {IClassFormatted, IClassGetBody} from '@/interfaces/Https';
import MultiuseDataTable from '@/components/MultiuseDataTable.vue';
import DialogDeleteItem from '@/components/smaller_components/dialogs/DialogDeleteItem.vue';
import ClassEdit from '@/components/smaller_components/dialogs/ClassEdit.vue';
import { isoToDateTimeFormat, isoToTimeFormat } from '@/utils/dates';
export default {
    name: 'classes-view',
    components: {
        MultiuseDataTable, DialogDeleteItem, ClassEdit, 
    },
    data(){
        return {
            
            classes: [] as Array<IClassFormatted>,
            loadingTable: false,
            showDeleteDialog: false,
            showEditDialog: false,
            selectedItem: {} as IClassFormatted,
            headers:[
                {
                    title: 'Disciplina',
                    key: 'name',
                    align: 'start',
                    sortable: true
                },
                {
                    title: 'Professor',
                    key: 'teacher',
                    align: 'start',
                    sortable: true
                },
                {
                    title: 'Horário',
                    key: 'schedule',
                    align: 'start',
                    sortable: true
                },
                {
                    title: 'Sala',
                    key: 'classroom',
                    align: 'start',
                    sortable: true
                }
            ],
            tableActions:[
                {name: 'Excluir', color: 'var(--danger-red)', eventName: 'delete', prependIcon:'mdi-delete'},
                {name: 'Editar', color: 'var(--dark-blue)', eventName: 'edit', prependIcon:'mdi-pencil'}
            ],
        }
    },
    created(){
        this.fetchClasses();
    },
    methods:{
        async doneEditing(){
            this.showEditDialog = false;
            this.$emit('success',  'A disciplina foi atualizada!');
            await this.fetchClasses();
        },
        async fetchClasses(){
            this.loadingTable = true;
            const response = await getAllClasses();

            if(response.code === 200){
                const localClasses = response.response as Array<IClassGetBody | null>;

                this.classes = localClasses.map(item => {
                    const schedule = item?.days.map((day : string, index : number) => {
                        const fStart = isoToTimeFormat(item.start_time[index]);
                        const fEnd = isoToTimeFormat(item.end_time[index]);

                        return `${day}: ${fStart} - ${fEnd}`
                    })

                    const fExam1Date = item && isoToDateTimeFormat(item.exam_1_timestamp);
                    const fExam2Date = item && isoToDateTimeFormat(item.exam_2_timestamp);
                    const fRetakeExamDate = item && isoToDateTimeFormat(item.re_take_exam_timestamp);
                    const fFinalExam = item && isoToDateTimeFormat(item.final_exam_timestamp);

                    return {
                        id: item?._id,
                        name: item?.name,
                        teacher: item?.teacher,
                        schedule: schedule,
                        classroom: item?.classroom,
                        exam1Date: fExam1Date,
                        exam2Date: fExam2Date,
                        retakeExamDate: fRetakeExamDate,
                        finalExamDate: fFinalExam,
                        observations: item?.observations,
                        days: [],
                        startTime: '',
                        endTime: ''
                    } as IClassFormatted;
                })
                
            }else{
                this.classes = [];
            }
            this.loadingTable = false;
        },
        handleEditDialog(item : IClassFormatted){
            this.selectedItem = item;
            this.showEditDialog = true;
        },
        handleDeleteDialog(item : IClassFormatted){
            this.showDeleteDialog = true;
            this.selectedItem = item;
        },
        async deleteItem(){
            const res = await deleteClass(this.selectedItem.id);
            this.showDeleteDialog = false;
            if(res.code === 204){
                this.$emit('success', 'A disciplina foi excluida!');
                await this.fetchClasses();
            }else{
                this.$emit('error', 'Ocorreu um erro!');
            }
        }, 
    },
    emits: ['error', 'success']
}
</script>