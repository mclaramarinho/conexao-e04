<template>
    
    <v-table density="comfortable" class="position-relative mx-auto w-90 text-center font-blue" hover>
        <tbody>
            <tr>
                <th colspan="1" id="day_col" scope="col" class="text-center bold">DIA</th>
                <th colspan="2" id="start_col" scope="col" class="text-center bold">INÍCIO</th>
                <th colspan="2" id="end_col" scope="col" class="text-center bold">FIM</th>
                <th colspan="5" id="class_col" scope="col" class="text-center bold">DISCIPLINA</th>
                <th colspan="1" id="room_col" scope="col" class="text-center bold">SALA</th>
                <th colspan="1" id="empty_col" scope="col" class="text-center bold d-none d-md-block"></th>
            </tr>
            <tr v-for="(weekday) in weekdays" :key="weekday">
                <td colspan="1" class="p-0">
                    <v-container class="p-0">
                        <v-row no-gutters>
                            <v-col cols="12" class="bold">
                                {{ weekday.toUpperCase() }}
                            </v-col>
                        </v-row>
                    </v-container>
                </td>
                <class-schedule-cells :day="weekday" :classes="returnClassArray(weekday)" :colspan="2" info="start" id="monday_row"/>
                <class-schedule-cells :day="weekday" :classes="returnClassArray(weekday)" :colspan="2" info="end" id="tuesday_row"/>
                <class-schedule-cells :day="weekday" :classes="returnClassArray(weekday)" :colspan="5" info="name" id="wednesday_row"/>
                <class-schedule-cells :day="weekday" :classes="returnClassArray(weekday)" :colspan="1" info="room" id="thursday_row"/>
                <class-schedule-cells class="d-none d-md-block" :day="weekday" :classes="returnClassArray(weekday)" :colspan="1" info="icon" id="friday_row"/>
            </tr>
        </tbody>
    </v-table>
</template>

<script lang="ts">
import classSchedule from '@/stores/temp/classSchedule';
import timeTable from '@/stores/temp/timeTable';
import weekdays from '@/stores/temp/weekDays';
import ClassScheduleCells from '../components/smaller_components/ClassScheduleCells.vue'
export default {
    name: 'ClassSchedule',
    components: {
        ClassScheduleCells
    },
    data() {
        return {
            weekdays: weekdays,
            times: timeTable,
            currentWeekday: '',
            classSchedule: classSchedule,
            monday:[] as Array<any>, tuesday:[] as Array<any>, wednesday:[] as Array<any>,
            thursday:[] as Array<any>, friday:[] as Array<any>
        }
    },
    created(){
        classSchedule.map(item => {
            item.day === 'Seg' && this.monday.push(item)
            item.day === 'Ter' && this.tuesday.push(item)
            item.day === 'Qua' && this.wednesday.push(item)
            item.day === 'Qui' && this.thursday.push(item)
            item.day === 'Sex' && this.friday.push(item)
        })
    },
    methods: {
        returnClassArray(day:string){
            let arrayToReturn = []
            switch (day) {
                case 'Seg':
                    arrayToReturn = this.monday
                    break;
                case 'Ter':
                    arrayToReturn = this.tuesday
                    break;
                case 'Qua':
                    arrayToReturn = this.wednesday
                    break;
                case 'Qui':
                    arrayToReturn = this.thursday
                    break;
            }
            
            if (arrayToReturn.length > 1) {
                arrayToReturn = this.orderClasses(arrayToReturn)
            }
            let correctArray = [] as Array<any>
            arrayToReturn.map(item => {
                correctArray.push({
                    start: item.start,
                    end: item.end,
                    name: item.name,
                    classroom: item.classroom
                })
            })
            return correctArray
        },
        timeToISOString(time: string){
            const notISO = new Date(`2000-10-12T${time}`);
            const ISO = notISO.toISOString()
            return ISO
        },
        orderClasses (classes : Array<any>){
            return classes.sort((a, b) => {
                const aStart = this.timeToISOString(a.start)
                const bStart = this.timeToISOString(b.start)
                if (aStart < bStart) {
                    return -1;
                }
                if (aStart > bStart) {
                    return 1;
                }
                return 0;
            })

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
.bold-red{
    font-weight: bold !important;
    color: var(--danger-red) !important;
}
</style>