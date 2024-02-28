<template>
    <v-data-table
        :headers="(headers as any)" :items="tableItems" :item-value="itemValue"
        :class="classes" style="font-weight: 500;" :items-per-page="itemsPerPageOptions[1]" :items-per-page-options="itemsPerPageOptions"
        :show-expand="expandable" :expand-on-click="expandable" :show-current-page="showPage" >
        
        <template v-slot:item.actions>
            <slot name="actions" />
        </template>

        <template v-if="expandable" v-slot:expanded-row="{item}">
            <v-container>
                <v-card class="mx-auto" variant="flat">
                    <v-card-text class="font-12 font-blue">
                        <v-row no-gutters>
                                <p>{{ getExpandableItemValue(item) }}</p>
                        </v-row>
                    </v-card-text>
                    <v-card-actions v-if="expandable && showExpandableItemActions">
                        <v-btn v-for="(action, index) in expandableItemActions" :key="action+'-'+index"
                            :color="action.color" :prepend-icon="action.prependIcon" @click="$emit(action.eventName, item)">
                            {{ action.name }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </template>

    <template v-slot:top>
      <v-toolbar>
            
            <v-dialog v-if="addNewButton" v-model="dialogAdd" max-width="500px">
                <template v-slot:activator>
                    <v-btn color="var(--dark-blue)" v-model="dialogAdd" @click="dialogAdd = true" dark class="">{{ addNewButtonText }}</v-btn>
                </template>
                <slot name="addDialog" />
            </v-dialog>
            <v-spacer></v-spacer>
            <v-btn color="var(--dark-blue)" icon="mdi-refresh" @click="e => $emit('update')" />
      </v-toolbar>
      
    </template>
    
    <template v-slot:no-data v-if="showNoDataSlot">
        <h5 :color="noDataSlotOptions.color">{{ noDataSlotOptions.text }}</h5>
    </template>
  </v-data-table> 
</template>

<script lang="ts">
export default {
    name: 'multiuse-data-table',
    components: {
    },
    props: {
        headers: {type: Array<{title: string, key: string, align: string, sortable: boolean}>, required: true},

        tableItems: {type: Array<Object>, required: true},

        itemValue: {type: String, required: false},

        classes:{type: String, default: 'font-12 font-blue', required: false},

        addNewButton:{type: Boolean, default: false, required: false},

        refreshButton: {type: Boolean, default: true, required: false},

        addNewButtonText: {type: String, default: 'Criar Nova', required: false},

        expandable: {type: Boolean, default: false, required: false},

        expandableItemKey:{type: String, default: null, required: false},

        showExpandableItemActions:{type: Boolean, default: false, required: false},
        
        expandableItemActions:{
            type: Array<{name: string, color: string, eventName: string, prependIcon: string}>,
            default: [],
            required: false
        },

        showPage:{type: Boolean, default: true, required: false},
        showNoDataSlot:{type: Boolean, default: true, required: false},
        noDataSlotOptions:{
            type: Object as () => {text: string, color: string},
            default: () => ({text: 'Nada para mostrar', color: 'var(--faded-dark-blue)'}),
            required: false
        }
    },
    data(){
        return{
            itemsPerPageOptions: [] as number[],
            dialogAdd: false as boolean
        }
    },
    beforeCreate(){
        console.log(this.tableItems);
    },
    created(){
        console.log(this.tableItems);
        
        this.getItemsPerPageOptions()
    },
    methods:{
        getExpandableItemValue(item : Object){
            const itemsKeys = Object.keys(item);
            if(itemsKeys.includes(this.expandableItemKey)){
                return item[(this.expandableItemKey as string)] as any;

            }else if(this.expandableItemKey === null){
                return ''
            }
            else{
                return 'error in expandableItemKey prop - please check the key name'
            }
        },
        getItemsPerPageOptions() : void{
            if(this.tableItems?.length === 0){
                return;
            }
            let array = [1];
            
            if(this.tableItems.length === 1 || this.tableItems.length < 4){
                if(this.tableItems.length > 1) array.push(Math.floor(this.tableItems.length));
                this.itemsPerPageOptions = array;
            }else if(this.tableItems.length <= 8){
                array.push(Math.floor(this.tableItems.length/2))
            }else{
                array.push(Math.floor(this.tableItems.length/4))
                array.push(Math.floor(this.tableItems.length/2))
            }
            array.push(this.tableItems.length)

            this.itemsPerPageOptions = array; 
        }
    },
}
</script>