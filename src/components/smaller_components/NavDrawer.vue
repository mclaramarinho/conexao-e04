<template>
    
    <v-navigation-drawer  
        :location="$vuetify.display.smAndDown ? 'top' : 'start'"
        :expand-on-hover="!$vuetify.display.smAndDown"
        :rail="!$vuetify.display.smAndDown"
        :class="$vuetify.display.smAndDown && 'mt-5'"
        :style="$vuetify.display.smAndDown && (showDrawer ? {transform:'translateY(0%)'} : {transform:'translateY(-90%)'})"
        permanent>
        
        <template v-slot:append v-if="$vuetify.display.smAndDown">
            <div class="text-center py-2">
                <v-icon 
                    :icon="showDrawer ? 'mdi-chevron-double-up' : 'mdi-chevron-double-down'"
                    color="var(--dark-blue)"
                    :onmouseup="(e : any) => showDrawer = !showDrawer"
                    class="btn" size="30" />
            </div>
        </template>

        <v-list>
            <v-list-item
                prepend-icon="mdi-home" variant="text"
                :title="(name || 'carregando')" :subtitle="(email || '') + ' - ' + (role || '')" />
            <v-divider />
        </v-list>
        <v-list @click:select="e => selection=(e.id as string)"> 
            <v-list-item v-for="item in navItems" :key="item.prependIcon"
                :title="item.title" :value="item.value" :prepend-icon="item.prependIcon"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">

export default {
    name: 'NavDrawer',
    props: {
        email: String, 
        name: String,
        role: String
    },
    watch:{
        selection(nv, ov){
            if(nv !== ov) this.navigateEvent(nv);
            else return;
        }
    },
    data() {
        return {
            showDrawer: false as boolean,
            selection: "" as string,
            navItems: [
                {
                    title: "Eventos",
                    value: "eventos",
                    prependIcon: "mdi-calendar"
                },
                {
                    title: "Contatos",
                    value: "contatos",
                    prependIcon: "mdi-card-account-mail"
                },
                {
                    title: "Disciplinas",
                    value: "disciplinas",
                    prependIcon: "mdi-school"
                },
                {
                    title: "FAQ",
                    value: "faq",
                    prependIcon: "mdi-frequently-asked-questions"
                },
                {
                    title: "Configurações",
                    value: "configuracoes",
                    prependIcon: "mdi-cog"
                },
            ]
        }
    },
    methods:{
        isMobile(){
            if(this.$vuetify.display.xs) return true
            return false
        },
        navigateEvent(value: string){
            
            const fullBase = this.$route.path.split('/');
            
            if(fullBase.length > 4) fullBase.pop();

            const base = fullBase.join('/');
            
            this.$router.push({path: base+'/'+value});
            
    },
}
}
</script>