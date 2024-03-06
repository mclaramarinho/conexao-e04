<template>
    <circular-loader v-if="!render" />
    <v-table v-if="render" >
        <thead>
            <tr >
                <th class="text-center">DIA</th>
                <th class="text-center">INICIO</th>
                <th class="text-center">FIM</th>
                <th class="text-center">DISCIPLINA</th>
                <th class="text-center">SALA</th>
            </tr>
        </thead>

        <tbody>
            <tr class="text-center" v-for="(day, i) in weekdays" :key="i">
                <div v-if="day.classes.length > 1">
                    <br v-for="(j) in day.classes.length" :key="j">
                        {{ day.abbr.toUpperCase() }}
                    <br v-for="(j) in day.classes.length" :key="j">
                </div>
                <div v-else>
                    <br>
                    {{ day.abbr.toUpperCase() }}
                    <br>
                </div>
                <!-- START -->
                <td>
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index">
                        <tr>{{ getTime(c.start) }}</tr>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>
                <!-- END -->
                <td>
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index">
                        <tr>{{ getTime(c.end) }}</tr>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>
                <!-- CLASS NAME -->
                <td>
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index">
                        <tr>{{ c.name }}</tr>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>
                <!-- ROOM -->
                <td>
                    <br v-if="day.classes.length > 1">
                    <div v-for="(c, index) in day.classes" :key="index" class="justify-content-center text-center">
                        <tr>{{ c.room }}</tr>
                        <br v-if="day.classes.length > 1">
                    </div>
                </td>
            </tr>

        </tbody>
    </v-table>
</template>

<script lang="ts">
import type { IClassGetBody } from '@/interfaces/Https';
import { getAllClasses } from '@/https/classes';
import CircularLoader from './smaller_components/loaders/CircularLoader.vue';
export default {
    name: 'ClassSchedule',
    components: {
        CircularLoader
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
                    classes: [] as Array<Object>
                }
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

                        days.map((d, index) => {
                            const en = d === 'Segunda-Feira' ? 'monday' : d === 'Terça-Feira' ? 'tuesday' : d === 'Quarta-Feira' ? 'wednesday' : d === 'Quinta-Feira' ? 'thursday' : d === 'Sexta-Feira' ? 'friday' : 'saturday';
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
                // TODO - show error message
                this.classes = [];
            }
            this.render = true;
        },
        getTime(isoDate : string){
            const date = new Date(isoDate);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
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