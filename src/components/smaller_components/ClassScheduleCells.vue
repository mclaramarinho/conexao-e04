<template>

<td :colspan="colspan" class="p-0">
    <v-container class="p-0">
        <v-row no-gutters :id="id" class="d-inline">
            <v-col cols="12" class="py-3" v-if="classes?.length === 0">
                <v-row no-gutters class="justify-content-center">-</v-row>
            </v-col>
            <v-col cols="12"
                :class="'py-3 ' + getClasses(day as string, item, index)"
                v-for="(item, index) in classes" :key="(item?.name as string)"
                align-self="center">
                <v-row no-gutters class="justify-content-center" v-if=" info === 'start'">{{item.start}}</v-row>
                <v-row no-gutters class="justify-content-center" v-if=" info === 'end'">{{item.end}}</v-row>
                <v-row no-gutters class="justify-content-center" v-if=" info === 'name'">{{item.name}}</v-row>
                <v-row no-gutters class="justify-content-center" v-if=" info === 'room'">{{item.classroom}}</v-row>
                <v-icon v-if="info==='icon'" icon="mdi-information"></v-icon>
            </v-col>
        </v-row>
    </v-container>
</td>
</template>


<script lang="ts">
import type IClasses from '../../interfaces/IClasses'
export default {
    name: 'ClassScheduleCells',
    props: {
        day: String,
        classes: Array<IClasses>,
        colspan: Number,
        info: String,
        id: {
            type: String,
            default: '',
            required: false
        }
    },
    data() {
        return {
            currentDay: this.day,
            currentClasses: this.classes
        }
    },
    methods: {
        getClasses(weekday: string, item: IClasses, index: number){
            let classes = ""
            if(this.classes && this.classes.length > 1 && index !== (this.classes.length - 1)){
                classes += "border-bottom"
            }
            const dayIndex = weekday === 'Seg' ? 1 : weekday === 'Ter' ? 2 : weekday === 'Qua' ? 3 : weekday === 'Qui' ? 4 : 5
            const today = new Date()
            const day = today.getDay()
            const isoTime = today.toISOString()
            const classStart = this.timeToISOString(item.start as string)
            const classEnd = this.timeToISOString(item.end as string)

            if (day === dayIndex && classStart < isoTime && classEnd > isoTime) {
                classes += "bold-red"
            }
            return classes
        },
        timeToISOString(time: string){
            const notISO = new Date(`2000-10-12T${time}`);
            const ISO = notISO.toISOString()
            return ISO
        },
    }
}
</script>