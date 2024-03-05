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
                    @click="(e : any) => {return confirmDialog=true, del=true, edit=false}" />
                    <!-- TODO - Create a function to handle @click event -->

            <v-btn :prepend-icon="!isEditing ? 'mdi-pencil' : 'mdi-close'"
                    :text="!isEditing ? 'Editar' : 'Cancelar'"
                    color="var(--dark-blue)" variant="tonal" 
                    @click="isEditing = !isEditing"/>
            <v-btn v-if="isEditing" prepend-icon="mdi-check" 
                    text="Confirmar" variant="tonal" color="var(--green)"
                    @click="(e : any) => {return confirmDialog=true, del=false, edit=true}" />
                    <!-- TODO - Create a function to handle @click event -->
        </v-row>
    </v-form>
    
    <v-dialog max-width="500px" :model-value="confirmDialog">
        <dialog-confirm-action v-if="edit"
             @confirm="e => updateReq(e)"    @cancel="() => {return confirmDialog = false, edit = false;}" />
             <!-- TODO - Create a function to handle @cancel event -->
        
        <dialog-confirm-action v-if="del"
            @confirm="e => deleteReq(e)"    @cancel="() => {return confirmDialog = false, del = false;}" />
            <!-- TODO - Create a function to handle @cancel event -->
    </v-dialog>
    
</template>

<script lang="ts">
import { useUserInfoStore } from '@/stores/userInfo';
import { deleteAccount, updateUser } from '@/firebase/authorization';
import DialogConfirmAction from '@/components/smaller_components/dialogs/DialogConfirmAction.vue';

export default{
    name: 'admin-profile',
    components:{
        DialogConfirmAction
    },
    data() {
        return{
            user: useUserInfoStore().getUser(),
            isEditing: false as Boolean,
            pswdConfirm: '' as string,
            confirmDialog: false as boolean,
            del: false as boolean,
            edit: false as boolean
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
                // TODO - Show success message
            })
            .catch(e => {
                // TODO - Show error message
                console.log(e)
            })
        },
        updateReq(pswd : string){
            const data = {
                name: this.user.name,
                email: this.user.email
            } as {name: string, email: string};
            updateUser(data, pswd).then((res : Object|void) => {
                // TODO - Use the response interface for the res object
                const r = res as {emailUpdated: boolean, nameUpdated: boolean, error:{isError: boolean, code: string, message: string}, dbUpdated: boolean};

                if(r.emailUpdated&&r.nameUpdated){
                    // TODO - Set success message
                }else if(r.emailUpdated){
                    // TODO - Set success message
                }else{
                    // TODO - Set success message
                }
                // TODO - Show success message

                // TODO - Create a reset function
                this.confirmDialog = false;
                this.del = false;
                this.edit = false;
            }).catch(e => {
                console.log(e.error)
                if(e.error.code === 'no-data-to-update'){
                    // TODO - Set error message
                }else if(e.error.code === 'email/not-updated/error'){
                    // TODO - Set error message
                }else if(e.error.code === 'name/not-updated/error'){
                    // TODO - Set error message
                }else if(e.error.code === 'invalid-user-cred/error'){
                    // TODO - Set error message
                }else{
                    // TODO - Set error message
                }

                // TODO - Show error message
                // TODO - Create a reset function
                this.confirmDialog = false;
                this.del = false;
                this.edit = false;
            })
        }
    }
}
</script>