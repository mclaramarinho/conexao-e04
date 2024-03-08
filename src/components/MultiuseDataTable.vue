<template>
    <v-data-table
        loading-text="Carregando..." :loading="loading"
        :headers="(headers as any)" :items="tableItems" :item-value="itemValue"
        :class="classes"
        :items-per-page="tableItems.length === 1 ? 1 : tableItems.length <= 4 ? Math.floor(tableItems.length/2) 
                                    : tableItems.length <= 8 || tableItems.length > 8 ? Math.floor(tableItems.length/4) 
                                    : 0"    
        :items-per-page-options="tableItems.length > 0 && tableItems.length === 1 ? [1] 
                                    : tableItems.length <= 4 ? [1, tableItems.length]
                                    : tableItems.length <= 8 ? [1, Math.floor(tableItems.length/4), Math.floor(tableItems.length/2), tableItems.length]
                                    : []"
                                    
        :show-expand="expandable" :expand-on-click="expandable"
        :show-current-page="showPage" @update:expanded="e => updateExpandedEvent(e)">

        <template v-for="(slot, i) in slotKeys" :key="i" v-slot:[`item.${slot}`]="{ item }">
            <slot :name="slot" :item="item" />
        </template>

        <template v-if="expandable" v-slot:expanded-row="{columns, item, isExpanded}">
            <v-container v-if="!slotKeys.includes('expandedRowEl')">
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

            <tr v-if="slotKeys.includes('expandedRowEl') && showExpandableItemActions">
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
      <!-- TODO - Create a slot to add a custom header -->
      
    </template>
    
    <!-- TODO - Create a slot for a custom element -->
    <template v-slot:no-data v-if="showNoDataSlot">
        <h5 :color="noDataSlotOptions.color">{{ noDataSlotOptions.text }}</h5>
    </template>
  </v-data-table> 
</template>

<script lang="ts">
import type { IDataTableHeaders, IExpandableItemActions, INoDataSlotOptions } from '@/interfaces/multiUseDataTable';

export default {
    name: 'multiuse-data-table',
    components: {
    },
    props: {
        headers: {type: Array<IDataTableHeaders>, required: true},
        
        tableItems: {type: Array<Object>, required: true},

        itemValue: {type: String, required: false},

        classes:{type: String, default: 'font-12 font-blue', required: false},

        addNewButton:{type: Boolean, default: false, required: false},

        loading: {type: Boolean, default: false, required: false},

        refreshButton: {type: Boolean, default: true, required: false},

        addNewButtonText: {type: String, default: 'Criar Nova', required: false},

        expandable: {type: Boolean, default: false, required: false},

        expandableItemKey:{type: String, default: null, required: false},

        showExpandableItemActions:{type: Boolean, default: false, required: false},
        
        expandableItemActions:{
            type: Array<IExpandableItemActions>,
            default: [],
            required: false
        },

        showPage:{type: Boolean, default: true, required: false},

        showNoDataSlot:{type: Boolean, default: true, required: false},

        noDataSlotOptions:{
            type: {} as () => INoDataSlotOptions,
            default: {text: 'Nada para mostrar', color: 'var(--faded-dark-blue)'},
            required: false
        }
    },
    data(){
        return{
            dialogAdd: false as boolean,
            colorRow: false as boolean,
            slotKeys: [] as string[],
            updateExpandedEvent: (e : Array<string>) => e.length > 1 && e.shift(),
        }
    },
    async created(){
        const slots = Object.assign({}, this.$slots);
        this.slotKeys = Object.keys(slots);
    },
    beforeMount(){
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
    },
}
</script>