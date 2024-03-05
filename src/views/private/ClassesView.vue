<template>
    <!-- TODO - Check if custom-epanded-row-element is still needed -->
    <multiuse-data-table :headers="headers" :table-items="classes"
        expandable custom-expanded-row-element
        :expandable-item-actions="tableActions" show-expandable-item-actions
        :loading="loadingTable"
        @edit="e => handleEditDialog(e)" @delete="e => handleDeleteDialog(e)"
        @update="() => fetchClasses()">
        <template v-slot:expandedRowEl="{cols, item}">
                <!-- TODO - Create a separate component for this table -->
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
        <!-- TODO - Create a function to handle @done event -->
        <class-edit :id="(selectedItem.id as string)" @cancel="showEditDialog = false" @done="e => {showEditDialog = false; fetchClasses()}" />
    </v-dialog>
</template>


<script lang="ts">
import { getAllClasses, deleteClass } from '@/https/classes';
import type { IHTTPResponse } from '@/https/setup';
import type IClassesView from '@/interfaces/IClassesView';
import MultiuseDataTable from '@/components/MultiuseDataTable.vue';
import DialogDeleteItem from '@/components/smaller_components/dialogs/DialogDeleteItem.vue';
import ClassEdit from '@/components/smaller_components/dialogs/ClassEdit.vue';
export default {
    name: 'classes-view',
    components: {
        MultiuseDataTable, DialogDeleteItem, ClassEdit
    },
    data(){
        return {
            classes: [] as Array<IClassesView>,
            loadingTable: false,
            showDeleteDialog: false,
            showEditDialog: false,
            // TODO - Set selectedItem type
            selectedItem: {},
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
            ]
        }
    },
    created(){
        this.fetchClasses();

    },
    methods:{
        async fetchClasses(){
            this.loadingTable = true;

            const response: IHTTPResponse = await getAllClasses();

            this.loadingTable = false;

            if(response.code === 200){
                const localClasses = response.response;

                this.classes = localClasses.map(item => {
                    const schedule = item.days.map((day : string, index : number) => {
                        const startTime = new Date(item.start_time[index]);
                        const fStart = startTime.getHours().toString().padStart(2, '0') + ':' + startTime.getMinutes().toString().padStart(2, '0');
                        const endTime = new Date(item.end_time[index]);
                        const fEnd = endTime.getHours().toString().padStart(2, '0') + ':' + endTime.getMinutes().toString().padStart(2, '0');

                        return `${day}: ${fStart} - ${fEnd}`
                    })
                    // TODO - Crete a function to handle the date formatting in a date utils file
                    const exam1Date = new Date(item.exam_1_timestamp);
                    const fExam1Date = exam1Date.getDate().toString().padStart(2, '0') + '/' + (exam1Date.getMonth() + 1).toString().padStart(2, '0') + '/' + exam1Date.getFullYear() + ' - ' + exam1Date.getHours().toString().padStart(2, '0') + ':' + exam1Date.getMinutes().toString().padStart(2, '0');
                    const exam2Date = new Date(item.exam_2_timestamp);
                    const fExam2Date = exam2Date.getDate().toString().padStart(2, '0') + '/' + (exam2Date.getMonth() + 1).toString().padStart(2, '0') + '/' + exam2Date.getFullYear() + ' - ' + exam2Date.getHours().toString().padStart(2, '0') + ':' + exam2Date.getMinutes().toString().padStart(2, '0');
                    const retakeExamDate = new Date(item.re_take_exam_timestamp);
                    const fRetakeExamDate = retakeExamDate.getDate().toString().padStart(2, '0') + '/' + (retakeExamDate.getMonth() + 1).toString().padStart(2, '0') + '/' + retakeExamDate.getFullYear() + ' - ' + retakeExamDate.getHours().toString().padStart(2, '0') + ':' + retakeExamDate.getMinutes().toString().padStart(2, '0');
                    const finalExam = new Date(item.final_exam_timestamp);
                    const fFinalExam = finalExam.getDate().toString().padStart(2, '0') + '/' + (finalExam.getMonth() + 1).toString().padStart(2, '0') + '/' + finalExam.getFullYear() + ' - ' + finalExam.getHours().toString().padStart(2, '0') + ':' + finalExam.getMinutes().toString().padStart(2, '0');

                    return {
                        id: item._id,
                        name: item.name,
                        teacher: item.teacher,
                        schedule: schedule,
                        classroom: item.classroom,
                        exam1Date: fExam1Date,
                        exam2Date: fExam2Date,
                        retakeExamDate: fRetakeExamDate,
                        finalExamDate: fFinalExam,
                        observations: item.observations
                    } as IClassesView;
                })
            }else{
                console.log(response);
            }
        },
        // TODO - Set item type
        handleEditDialog(item){
            this.selectedItem = item;
            this.showEditDialog = true;
        },
        // TODO - Set item type
        handleDeleteDialog(item){
            this.showDeleteDialog = true;
            this.selectedItem = item;
        },
        async deleteItem(){
            const res = await deleteClass(this.selectedItem.id);
            if(res.code === 204){
                this.fetchClasses();
                this.showDeleteDialog = false;
                // TODO - Show success message
            }else{
                // TODO - Show error message
            }
        }
    }
}

</script>