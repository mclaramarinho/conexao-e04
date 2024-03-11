<template>
    <circular-loader v-if="!render" />
    <v-table v-if="render">
        <thead>
            <tr >
                <th class="text-center">DIA</th>
                
                <th class="text-center" v-if="$vuetify.display.mdAndUp">INICIO</th>
                <th class="text-center" v-if="$vuetify.display.mdAndUp">FIM</th>

                <th class="text-center" v-if="$vuetify.display.mdAndDown">HORÁRIO</th>

                <th class="text-center">DISCIPLINA</th>
                <th class="text-center" v-if="$vuetify.display.mdAndUp">SALA</th>
                <th class="text-center">
                    <v-icon>mdi-information</v-icon>
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(day, i) in weekdays" :key="i">

                <!-- WEEKDAY -->
                <div v-if="day.classes.length > 1" class='mx-auto h-100'>
                    <br v-for="(j) in day.classes.length" :key="j">
                       <p class="text-center">{{ day.abbr.toUpperCase() }}</p> 
                    <br v-for="(j) in day.classes.length" :key="j">
                </div>
                <div v-else class='mx-auto h-100'>
                    <br>
                    <p class="text-center">{{ day.abbr.toUpperCase() }}</p> 
                    <br>
                </div>
                
                
                <!-- START -->
                <td v-if="$vuetify.display.mdAndUp">
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index">
                        <p class="text-center">{{ c.start === null ? '-' : getTime(c.start) }}</p>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>
                <!-- END -->
                <td v-if="$vuetify.display.mdAndUp">
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index">
                        <p class="text-center">{{ c.end === null ? '-' : getTime(c.end) }}</p>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>


                <!-- TIME SCHEDULE -->
                <td v-if="$vuetify.display.mdAndDown">
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, i) in day.classes" :key="i">
                        <p class="text-center">{{ (c.start === null && c.end === null) ? '-' : (`${getTime(c.start)} - ${getTime(c.end)}`) }}</p>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>

                <!-- CLASS NAME -->
                <td>
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index">
                        <p class="text-center">{{ c.name }}</p>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>

                <!-- ROOM -->
                <td v-if="$vuetify.display.mdAndUp">
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index">
                        <p class="text-center">{{ c.room }}</p>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>
                <!-- MORE INFO -->
                <td>
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index">
                        <p class="text-center">
                            <v-btn icon="mdi-plus" size="xs" variant="text" color="var(--dark-blue)"
                                        @click="handleOpenDetails(c._id)"/>
                        </p>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>
            </tr>

        </tbody>
    </v-table>
    <v-dialog max-width="500px" :model-value="details.open" @update:model-value="details.open = false">
        <class-edit :id="details.classId" :allowEditing="false" />
    </v-dialog>
</template>

<script lang="ts">
import type { IClassGetBody } from '@/interfaces/Https';
import { getAllClasses } from '@/https/classes';
import CircularLoader from './smaller_components/loaders/CircularLoader.vue';
import ClassEdit from './smaller_components/dialogs/ClassEdit.vue';
export default {
    name: 'ClassSchedule',
    components: {
        CircularLoader, ClassEdit
    },
    data() {
        return {
            
            classes: [] as Array<IClassGetBody>,
            weekdays:{
                monday: {
                    name: 'Segunda-Feira',
                    abbr: 'Seg',
                    classes: [] as Array<Object>
                },
                tuesday: {
                    name: 'Terça-Feira',
                    abbr: 'Ter',
                    classes: [] as Array<Object>
                },
                wednesday: {
                    name: 'Quarta-Feira',
                    abbr: 'Qua',
                    classes: [] as Array<Object>
                },
                thursday: {
                    name: 'Quinta-Feira',
                    abbr: 'Qui',
                    classes: [] as Array<Object>
                },
                friday: {
                    name: 'Sexta-Feira',
                    abbr: 'Sex',
                    classes: [] as Array<Object>
                },
                saturday: {
                    name: 'Sábado',
                    abbr: 'Sáb',
                    classes: [] as Array<IClassGetBody>
                }
            },
            details:{
                open: false as boolean,
                classId: '' as string,
            },
            render: false
        }
    },
    async created(){
        await this.fetchClasses()
    },
    methods: {
        async fetchClasses(){
            this.render = false;
            try{
                const res = await getAllClasses();
                if(res.code === 200){
                    this.classes = res.response;
                    this.classes.map(c => {
                        const days = c.days;
                        if(days.length === 0){
                            this.weekdays['saturday'].classes.push({
                                _id: c._id,
                                name: c.name,
                                start: null,
                                end: null,
                                room: c.classroom,
                                teacher: c.teacher,
                                exam1: c.exam_1_timestamp,
                                exam2: c.exam_2_timestamp,
                                retake: c.re_take_exam_timestamp,
                                final: c.final_exam_timestamp
                            })
                        }
                        days.map((d, index) => {
                            let en = d === 'Segunda-Feira' ? 'monday' 
                                        : d === 'Terça-Feira' ? 'tuesday' 
                                        : d === 'Quarta-Feira' ? 'wednesday' 
                                        : d === 'Quinta-Feira' ? 'thursday' 
                                        : d === 'Sexta-Feira' ? 'friday' 
                                        : 'saturday';
                            this.weekdays[en].classes.push({
                                _id: c._id,
                                name: c.name,
                                start: c.start_time[index],
                                end: c.end_time[index],
                                room: c.classroom,
                                teacher: c.teacher,
                                exam1: c.exam_1_timestamp,
                                exam2: c.exam_2_timestamp,
                                retake: c.re_take_exam_timestamp,
                                final: c.final_exam_timestamp
                            })
                        })
                    })
                }else{
                    throw new Error('Error fetching classes');
                }
            }catch(err){
                console.error(err);
                this.classes = [];
            }
            this.render = true;
        },
        getTime(isoDate : string){
            const date = new Date(isoDate);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },
        handleOpenDetails(id : string){
            this.details.classId = id;
            this.details.open = true;
        }
    }
}
</script>

<style scoped>
@media (min-width: 768px){
    .v-table{
        font-size: 1.4rem !important;
    }
}
@media (max-width: 768px){
    .v-table{
        font-size: 1rem !important;
    }
}
.v-table{
    color: var(--dark-blue);
}
</style>