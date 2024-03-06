<template>
    <circular-loader v-if="!render" />

    <v-container fluid v-if="render">
        <v-row>
            <v-col cols="12">
                <v-expansion-panels variant="popout">
                    <v-expansion-panel class="responsive_font mt-5" v-for="(item, i) in faq" :key="i"
                        :title="item.question"
                        :text="item.answer"
                    />
                </v-expansion-panels>
                
            </v-col>
        </v-row>
    </v-container>

</template>

<script lang="ts">
import { getAllFAQs } from '@/https/faqs';
import type { IFaqGetBody } from '@/interfaces/Https';
import CircularLoader from '@/components/smaller_components/loaders/CircularLoader.vue';
export default {
    name: 'FaqSection',
    components:{
        CircularLoader
    },
    data() {
        return {
            faq: [] as Array<IFaqGetBody>,
            render: false
        }
    },
    async created(){
        await this.fetchFaq();
    },
    methods:{
        async fetchFaq(){
            this.render = false;
            try{
                const res = await getAllFAQs();
                if(res.code === 200){
                    this.faq = res.response;
                }else{
                    throw new Error('Failed to fetch FAQs');
                }
            }catch(err){
                console.error(err);
                //TODO - show error message
                this.faq = [];
            }
            this.render = true;
        }
    }
}
</script>
