import { a } from "./config";
import { browserLocalPersistence, updateProfile, createUserWithEmailAndPassword, setPersistence, type User, type UserCredential, deleteUser, updateEmail, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUserInfoStore } from "@/stores/userInfo";
import type { IUser } from "@/interfaces/Https";
import { admin_delete, admin_get_one, admin_update } from "@/https/admin";
import type { IFirebaseGetCredentials, IFirebaseUserUpdate } from "@/interfaces/ResponseObjects";


export async function register(email: string, password: string, name : string) : Promise<boolean | void>{
    try {
        await createUserWithEmailAndPassword(a, email, password)
        await updateProfileName(name);
        return true;
    } catch (error) {
        return false;
    }
}

async function updateProfileName(name: string) : Promise<boolean>{
    try{
        await updateProfile(a.currentUser as User, {
            displayName: name,
            photoURL: ""
        });
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

export async function updateUser(data : {name: string, email : string}, pswd : string) : Promise<IFirebaseUserUpdate>{
    const response = {
        nameUpdated: false, emailUpdated: false, dbUpdated: false,
        error: { 
            isError: false, code: '', message: ''
        },
    } as IFirebaseUserUpdate;
    try{
        const cred = await getUserCreds(pswd);
        if(cred.error.isError){throw new Error('invalid-user-cred/error')};
        const credEmail = cred.credentials?.user.email;
        const credName = cred.credentials?.user.displayName;
        
        if(credName === data.name && credEmail === data.email){throw new Error("no-data-to-update")};
        
        if( credEmail !== data.email){
            updateEmail(a.currentUser as User, data.email).then(r => {
                response.emailUpdated = true;
            }).catch(e => {
                if(e.code === 'auth/operation-not-allowed'){throw new Error("auth/operation-not-allowed")};
                throw new Error("email/not-updated/error");
            });
        }

        if(credName !== data.name){
            updateProfile(a.currentUser as User, {displayName: data.name, photoURL: null}).then(r => {
                response.nameUpdated = true;
            }).catch(e => {
                response.error.message = 'The data passed is equal to the previous data. Please provide a new email and/or name.'
                throw new Error("name/not-updated/error");
            })
        }

        const body = {
            firebase_uid: null,
            name: data.name,
            email: data.email,
            role: useUserInfoStore().role,
            last_login: null,
            creation_date_timestamp: null
        } as IUser;

        admin_update(body).then(r => {
            response.dbUpdated = true;
            return response;
        }).catch(e => {
            response.error.code = 'db-not-updated/error';
            response.error.message = "Could not update the database. Please contact the developer.";
            throw new Error('db-not-updated/error');
        })

        return response;
    }catch(err : any){
        const msg = err.message;
        response.error.code = msg;
        response.error.isError = true;
       
        if(msg === 'invalid-user-cred/error'){
            response.error.message = "Error fetching user credentials";
        }

        throw response
    }
}
export async function logout() : Promise<boolean>{
    return new Promise((resolve, reject) => {
        signOut(a)
        .then(() => {
            resolve(true);
        })
        .catch(error => {
            console.error('Sign-out error:', error);
            reject(false);
        });
    });
}

export async function login(email: string, password: string) : Promise<boolean>{
    return new Promise((resolve, reject) => {
        setPersistence(a, browserLocalPersistence)
        .then(() => {
            signInWithEmailAndPassword(a, email, password)
            .then((cred) => {
                // Check database for user
                admin_get_one()
                .then(r => {
                    if(r.code === 200){
                        const body = {
                            firebase_uid: null,
                            name: null,
                            email: null,
                            role: null,
                            last_login: new Date().toISOString(),
                            creation_date_timestamp: null
                        } as IUser;
                        admin_update(body)
                        .then((r) => {
                            console.log(r);
                            
                            resolve(true);
                        })
                        .catch(err => {
                            // Handle database update error
                            console.error('Error updating database:', err);
                            reject('db-update-error');
                        });
                    }else{
                        throw new Error('user-not-found/error');
                    }
                })
                .catch(e => {
                    console.log(e);
                    
                    // If user in database, update last login
                    deleteAccount(password, true)
                    .then(() => {
                        reject(false);
                    })
                    .catch(err => {
                        // Handle delete account error
                        console.error('Error deleting account:', err);
                        reject(false);
                    });
                });
            })
            .catch(error => {
                // Handle sign-in error
                console.error('Sign-in error:', error);
                reject(false);
            });
        })
        .catch(error => {
            // Handle persistence error
            console.error('Persistence error:', error);
            reject(false);
        });
    });
}

export async function isLoggedIn() : Promise<boolean | User>{
    return new Promise((res, rej) => {
        a.onAuthStateChanged((user) => {
            if(user){
                res(user as User);
            }else{
                rej(false);
            }
        })
    })
}

export async function getUserCreds(pswd:string) : Promise<IFirebaseGetCredentials>{
    const response = {
       error: {
              isError: false,
              code: '',
              message: ''
         },
         credentials: null
    } as IFirebaseGetCredentials;
    try{
        const user = await isLoggedIn();
        const cred = await signInWithEmailAndPassword(a, ((user as User).email as string), pswd);
        if(cred){
            response.credentials = cred as UserCredential;
        }
    }catch(err){
        response.error.isError = true;
        response.error.code = 'invalid-user-cred/error';
        response.error.message = "Error fetching user credentials";
    }
    
    return response;
}

export async function deleteAccount(pswd : string, fromLogin = false) : Promise<Boolean>{
    const user =  a.currentUser;
    if(user){
        try{
            if(!fromLogin){
                await login(user.email as string, pswd)
                await deleteUser(user as User)
                admin_delete().then(r => {
                    return true
                }).catch(e => {
                    throw new Error('db-not-updated/error')
                })
            }

            await deleteUser(user as User)
            return true
            
        }catch(err){
            if(err.message === 'db-not-updated/error'){throw err};
            throw new Error('An error occurred')
        }
    }else{
        throw new Error('User is not logged in')
    }
   
}