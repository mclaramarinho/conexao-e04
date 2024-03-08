<template>
    <v-form ref="profile-form" :disabled="!isEditing">
        <v-row no-gutters class="mt-3">
            <v-text-field :model-value="user.name" label="Nome"  variant="outlined"
                    @input="(e : any) => user.name = e.target.value" />
        </v-row>
        <v-row no-gutters>
            <v-text-field type="email" validate-on="input" label="Email" variant="outlined"
                    :model-value="user.email"
                    @input="(e : any) => user.email = e.target?.value" />
        </v-row>
        <v-row no-gutters justify="space-between">
            <v-btn prepend-icon="mdi-delete" text="Excluir conta" color="var(--danger-red)" variant="tonal"
                    @click="handleClickDeleteAccount" />

            <v-btn :prepend-icon="!isEditing ? 'mdi-pencil' : 'mdi-close'"
                    :text="!isEditing ? 'Editar' : 'Cancelar'"
                    color="var(--dark-blue)" variant="tonal" 
                    @click="isEditing = !isEditing"/>

            <v-btn v-if="isEditing" prepend-icon="mdi-check" 
                    text="Confirmar" variant="tonal" color="var(--green)"
                    @click="handleClickConfirmChanges" />
        </v-row>
    </v-form>
    
    <v-dialog max-width="500px" :model-value="confirmDialog" @update:model-value="resetDialogsAndActions">
        <dialog-confirm-action v-if="edit" @confirm="e => updateReq(e)" @cancel="resetDialogsAndActions" />
        
        <dialog-confirm-action v-if="del" @confirm="e => deleteReq(e)" @cancel="resetDialogsAndActions" />
    </v-dialog>
</template>

<script lang="ts">
import { useUserInfoStore } from '@/stores/userInfo';
import { deleteAccount, updateUser } from '@/firebase/authorization';
import DialogConfirmAction from '@/components/smaller_components/dialogs/DialogConfirmAction.vue';
import type { IFirebaseUserUpdate } from '@/interfaces/ResponseObjects';

export default{
    name: 'admin-profile',
    components:{
        DialogConfirmAction, 
    },
    data() {
        return{
            user: useUserInfoStore().getUser(),
            isEditing: false as Boolean,
            pswdConfirm: '' as string,
            confirmDialog: false as boolean,
            del: false as boolean,
            edit: false as boolean,
        }
    },
    created() {
        console.log(this.user)
    },
    methods:{
        deleteReq(pswd : string){
            deleteAccount(pswd).then(r => {
                console.log('deleted');
                console.log(r)
                this.$emit('success', 'A conta foi excluida.')
            })
            .catch(e => {
                console.log(e)
                this.$emit('error', 'Não conseguimos excluir sua conta...');
            })
        },
        updateReq(pswd : string){
            const data = {
                name: this.user.name,
                email: this.user.email
            } as {name: string, email: string};
            updateUser(data, pswd).then((res : IFirebaseUserUpdate) => {
                const r = res as IFirebaseUserUpdate;
                let msg = '';
                if(r.emailUpdated && r.nameUpdated){msg = 'As informações foram atualizadas!';}
                else if(r.emailUpdated){msg = 'O email foi atualizado.';}
                else{msg = 'O nome foi atualizado.';}
                this.$emit('success', msg);
                this.resetDialogsAndActions()
            }).catch(e => {
                console.log(e.error)
                let msg = '';
                if(e.error.code === 'no-data-to-update'){
                    msg = 'Não há informações para atualizar.';
                }else if(e.error.code === 'email/not-updated/error'){
                    msg = 'Não conseguimos atualizar seu email.';
                }else if(e.error.code === 'name/not-updated/error'){
                    msg = 'Não conseguimos atualizar seu nome';
                }else if(e.error.code === 'invalid-user-cred/error'){
                    msg = 'A senha inserida está incorreta...';
                }else{
                    msg = 'Encontramos um erro inesperado.'
                }
                this.$emit('error', msg)
                this.resetDialogsAndActions()
            })
        },
        handleClickDeleteAccount(){
            this.confirmDialog=true;
            this.del=true;
            this.edit=false
        },
        handleClickConfirmChanges(){
            this.confirmDialog=true;
            this.del=false;
            this.edit=true;
        },
        resetDialogsAndActions(){
            console.log('action cancelled');
            
            this.isEditing = false;
            this.confirmDialog = false;
            this.del = false;
            this.edit = false;
        }
    },
    emits: ['error', 'success']
}
</script>