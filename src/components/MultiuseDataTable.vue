<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-data-table
        loading-text="Carregando..." :loading="loading"
        :headers="(headers as any)" :items="tableItems" :item-value="itemValue"
        :class="classes"
        :items-per-page="itemsPerPageOptions[1]" 
        :items-per-page-options="itemsPerPageOptions"
        :show-expand="expandable" :expand-on-click="expandable"
        :show-current-page="showPage" @update:expanded="e => {e.length > 1 && (e as Array<string>).shift()}">
        

        <template v-slot:[`item.${customSlotKey}`]="{ item }">
            <slot :name="customSlotKey" :item="item" />
        </template>
        
        <template v-slot:item.actions>
            <slot name="actions" />
        </template>

        <template v-if="expandable" v-slot:expanded-row="{columns, item, isExpanded}">
            <v-container v-if="!customExpandedRowElement">
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
            <slot v-else name="expandedRowEl" :item="item" :cols="columns" :ie="isExpanded" />
            <tr v-if="customExpandedRowElement && showExpandableItemActions">
                <td :colspan="columns.length">
                    <v-card variant="flat">
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn v-for="(action, index) in expandableItemActions" :key="action+'-'+index"
                                :color="action.color" :prepend-icon="action.prependIcon" @click="$emit(action.eventName, item)">
                                {{ action.name }}
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </td>
            </tr>
        </template>

    <template v-slot:top>
      <v-toolbar>
            <slot name="addDialog" />
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

        customSlotKey: {type: String, required: false},
        
        loading: {type: Boolean, default: false, required: false},

        customExpandedRowElement: {type: Boolean, default: false, required: false},

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
            dialogAdd: false as boolean,
            colorRow: false as boolean
        }
    },
    beforeCreate(){
    },
    created(){
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