<template>

    <!-- TODO - Create a separate component for this message -->
    <v-container fluid class="text-center" v-if="!showContent">
        <v-row no-gutters>
            <h3 class="mx-auto">Convidar</h3>
        </v-row>
        <v-row no-gutters>
            <h5 class="mx-auto">Aqui você pode convidar pessoas para serem administradores da turma</h5>
        </v-row>
        <v-row no-gutters class="w-75 mx-auto mt-5">
            <v-select :items="role" :model-value="roleSelected" @update:model-value="e => roleSelected = e" variant="outlined"></v-select>
        </v-row>
        <v-row no-gutters>
            <v-btn prepend-icon="mdi-refresh" text="Gerar código" variant="tonal" class="mx-auto" @click="getCode"></v-btn>
        </v-row>

        <v-row no-gutters class="mt-5">
            <multiuse-data-table :headers="allOtpHeaders" :tableItems="allOtpItems" @update="fetchUserCodes" :loading="loadingOtpTable">
                <template #delete="{item}">
                    <v-btn icon="mdi-delete" @click="delCode(item._id)" variant="text" />
                </template>
            </multiuse-data-table>
        </v-row>
    </v-container>

    <!-- TODO - Create a separate component for this message -->
    <v-container fluid v-if="otpCreated && showContent">
        <v-row no-gutters>
            <h2 class="mb-5">{{ otpCreated }}</h2>  
        </v-row>
        <v-row no-gutters>
            <h3 ref="i_header">Siga o passo a passo abaixo para criar sua conta</h3>
        </v-row>
        <v-row no-gutters class="mt-2">
            <v-list class="font-blue">
                <v-list-item>
                    <h5 ref="i_inst_1">1. Abra a página inicial e clique em <b>Admin</b>.</h5>
                </v-list-item>
                <v-list-item>
                    <h5 ref="i_inst_2">2. No canto inferior da página de login, clique em <b>Tenho um código ultrassecreto</b>.</h5>
                </v-list-item>
                <v-list-item>
                    <h5 ref="i_inst_3">3. Na página de criar conta, preencha todas as informações solicitadas.</h5>
                </v-list-item>
                <v-list-item>
                    <h5 ref="i_inst_4">4. Quando solicitado, insira o código a seguir: <b>{{ otpCreated }}</b></h5>
                </v-list-item>
                <v-list-item>
                    <h5 ref="i_inst_5">5. Se o código estiver correto, você será redirecionado para o painel do Admin.</h5>
                </v-list-item>
            </v-list>
        </v-row>
        <v-row no-gutters justify="space-between">
            <v-btn color="var(--dark-blue)" text="Gerar outro" @click="showContent=false" variant="tonal"></v-btn>
            <v-btn class="" @click="copyToCB" :color="copied ? 'var(--green)' : 'var(--dark-blue)'"
                    variant="tonal" text="Copiar" prepend-icon="mdi-clipboard-outline" />
        </v-row>
        
    </v-container>
</template>

<script lang="ts">
import { createNewCode, getValidCodes, deleteCode } from '@/https/code';
import MultiuseDataTable from '@/components/MultiuseDataTable.vue';
import type { IUserRole } from '@/interfaces/Https';
export default{
    name: "invite-settings",
    components: {
        MultiuseDataTable, 
    },
    data(){
        return {
            role: [
                {
                    title: 'Proprietário',
                    value: 'owner'
                },
                {
                    title: 'Administrador',
                    value: 'admin'
                }
            ],
            roleSelected: 'admin' as IUserRole,
            otpCreated: '' as string,
            copied: false as Boolean,
            showContent: false as Boolean,
            allOtpHeaders:[
                {
                    title: 'Código',
                    key: 'code',
                    align: 'center',
                    sortable: false
                },
                {
                    title: 'Permissão',
                    key: 'role',
                    align: 'center',
                    sortable: false
                },
                {
                    title: 'Excluir',
                    key: 'delete',
                    align: 'center',
                    sortable: false
                },
            ],
            allOtpItems: [],
            loadingOtpTable: false,
        }
    },
    computed: {
        textContent(){
            return (this.$refs.i_header as any).textContent ? (this.$refs.i_header as any).textContent 
                            + '\n\n' +( this.$refs.i_inst_1 as any).textContent
                            + '\n' +( this.$refs.i_inst_2 as any).textContent
                            + '\n' +( this.$refs.i_inst_3 as any).textContent
                            + '\n' +( this.$refs.i_inst_4 as any).textContent
                            + '\n' +( this.$refs.i_inst_5 as any).textContent : ""
        },
    },
    async created(){
        await this.fetchUserCodes()
    },
    methods:{
        getCode(){
            createNewCode(this.roleSelected).then(r => {
                if(r.code === 201){
                    this.otpCreated = r.response.code
                    this.showContent = true
                }
            }).catch(err => {
                this.$emit('error', 'Encontramos um erro ao gerar o código...');
            })
        },
        copyToCB(){
            this.copied = true
            navigator.clipboard.writeText(this.textContent)
            setTimeout(() => {
                this.copied = false
            }, 2000);
        },
        async fetchUserCodes(){
            this.loadingOtpTable = true;
            try{
                const codes = await getValidCodes(false);
                this.allOtpItems = codes.response;
                this.loadingOtpTable = false;
            }catch(err){
                this.allOtpItems = []
                this.loadingOtpTable = false;
                this.$emit('error', 'Não conseguimos buscar os seus códigos existentes');
            }
        },
        async delCode(code : string){
            try{
                const r = await deleteCode(code);
                await this.fetchUserCodes()
                this.$emit('success', 'Código excluido com sucesso!');
            }catch(err){
                this.$emit('error', 'Erro ao excluir o código...');
            }
        },
    },
    emits: ['error', 'success']
}
</script>