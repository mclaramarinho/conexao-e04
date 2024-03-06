<template>
    <MultiuseDataTable :headers="headers" :table-items="tableItems" :loading="loading" item-value="firebase_uid"
        @update="fetchUsers()">
        
        <template #creation_date_timestamp="{item}">
            <p>{{ formatDate(new Date(item.creation_date_timestamp)) }}</p>
        </template>
        <template #last_login="{item}">
            <p>{{ formatDate(new Date(item.last_login)) }}</p>
        </template>
        <template #delete="{item}">
            <v-btn color="var(--dark-blue)" icon="mdi-delete" variant="text"
                @click="() => {return confirmDelete = true, selectedUser = item}"></v-btn>
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
            selectedUser: {} as IUser
        }
    },
    created(){
        if(useUserInfoStore().role === 'owner'){
            this.headers.push({title: 'Excluir', key: 'delete', align: 'center', sortable: false})
        }
        this.fetchUsers()
    },
    methods:{
        fetchUsers(){
            this.loading = true,
            admin_get_all().then(r => {
                if(r.code === 200){
                    this.tableItems = r.response;
                    // TODO - Show success message
                }
            }).catch(e => {
                this.tableItems = [] as IUser[];
                // TODO - Show error message
            }).finally(() => {
                this.loading = false;
            })
        },
        // TODO - Create a function to format the date in a date time utils file
        formatDate(date:Date){
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth()+1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().padStart(2, '0');
            const hour = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            const fDateTime = `${day}/${month}/${year} - ${hour}:${minutes}`;
            return fDateTime
        },
        async deleteUser(pswd : string, user : IUser){
            try{
                const auth = await login(useUserInfoStore().email.toString(), pswd);
                if(auth){
                    const userDeleted = await owner_delete_admin(user.firebase_uid as string);
                    console.log(userDeleted)
                }
                
                //TODO - show success message
                
            }catch(err){
                if(err === false){
                    console.log('Problem authenticating')
                    //TODO - show error message
                }
                else{
                    console.log(err);
                    //TODO - show error message
                }
            }
        }
    }

}
</script>