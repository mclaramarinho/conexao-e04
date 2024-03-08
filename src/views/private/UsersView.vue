<template>
    <MultiuseDataTable :headers="headers" :table-items="tableItems" :loading="loading" item-value="firebase_uid"
        @update="fetchUsers()">
        
        <template #creation_date_timestamp="{item}">
            <p>{{ isoToDateTimeFormat(item.creation_date_timestamp) }}</p>
        </template>
        <template #last_login="{item}">
            <p>{{ isoToDateTimeFormat(item.last_login) }}</p>
        </template>
        <template #actions="{item}">
            <v-btn color="var(--dark-blue)" icon="mdi-delete" variant="text" v-if="item.firebase_uid !== useUserInfoStore().UID"
                @click="() => {return confirmDelete = true, selectedUser = item}"></v-btn>
            <p v-else>VOCÊ</p>
        </template>
    </MultiuseDataTable>

    <v-dialog max-width="500px" :model-value="confirmDelete">
        <dialog-confirm-action @cancel="confirmDelete = false" @confirm="e => deleteUser(e, selectedUser)" />
    </v-dialog>
</template>

<script lang="ts">
import MultiuseDataTable from '@/components/MultiuseDataTable.vue';
import { admin_get_all, owner_delete_admin } from '@/https/admin';
import { useUserInfoStore } from '@/stores/userInfo';
import DialogConfirmAction from '@/components/smaller_components/dialogs/DialogConfirmAction.vue';
import { login } from '@/firebase/authorization';
import type { IUser } from '@/interfaces/Https';
import { isoToDateTimeFormat } from '@/utils/dates';

export default {
    name: 'users-view',
    components:{
        MultiuseDataTable, DialogConfirmAction
    },
    data(){
        return {
            headers: [
                {title: 'Nome', key: 'name', align: 'left', sortable: true},
                {title: 'Email', key: 'email', align: 'left', sortable: true},
                {title: 'Permissão', key: 'role', align: 'left', sortable: true},
                {title: 'Criado em:', key: 'creation_date_timestamp', align: 'left', sortable: true},
                {title: 'Ultimo login:', key: 'last_login', align: 'left', sortable: true},
            ],
            tableItems:[] as IUser[],
            loading: false as boolean,
            confirmDelete: false,
            selectedUser: {} as IUser,
            isoToDateTimeFormat: isoToDateTimeFormat,
            useUserInfoStore: useUserInfoStore
        }
    },
    created(){
        if(useUserInfoStore().role === 'owner'){
            this.headers.push({title: 'Excluir', key: 'actions', align: 'center', sortable: false})
        }
        this.fetchUsers()
    },
    methods:{
        fetchUsers(){
            this.loading = true,
            admin_get_all().then(r => {
                if(r.code === 200){
                    this.tableItems = r.response;
                }
            }).catch(e => {
                this.tableItems = [] as IUser[];
            }).finally(() => {
                this.loading = false;
            })
        },
        async deleteUser(pswd : string, user : IUser){
            try{
                const auth = await login(useUserInfoStore().email.toString(), pswd);
                if(auth){
                    const userDeleted = await owner_delete_admin(user.firebase_uid as string);
                    console.log(userDeleted)
                    this.$emit('success', 'O usuário foi excluído com sucesso!')
                }else{
                    throw new Error('invalid-credentials/error');
                }
            }catch(err){
                console.log('Problem authenticating')
                if(err.message==='invalid-credentials/error'){
                    this.$emit('error', 'Senha inválida');
                }else{
                    this.$emit('error', 'Encontramos um erro inesperado por aqui.');
                }
                
            }
        }
    }

}
</script>