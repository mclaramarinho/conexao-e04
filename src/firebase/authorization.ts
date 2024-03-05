import { a } from "./config";
import { browserLocalPersistence, updateProfile, createUserWithEmailAndPassword, setPersistence, type User, type UserCredential, deleteUser, updateEmail } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useUserInfoStore } from "@/stores/userInfo";
import type { IUser } from "@/interfaces/IUser";
import { admin_delete, admin_get_one, admin_update } from "@/https/admin";


export async function register(email: string, password: string, name : string) : Promise<boolean | void>{
    try {
        const created = await createUserWithEmailAndPassword(a, email, password)
        await updateProfileName(created, name);
        return true;
    } catch (error) {
        return false;
    }
}

async function updateProfileName(name: string) : Promise<boolean>{
    // TODO - refactor to use try-catch structure
    return updateProfile(a.currentUser as User, { 
        displayName:name,
        photoURL: ""
    }).then(() => {return true}).catch((error) => {console.log(error); return false});
}

export async function updateUser(data : {name: string, email : string}, pswd : string) : Promise<Object>{
    // TODO - Create an interface for this response object
    const response = {
        nameUpdated: false,
        emailUpdated: false,
        error: {
            isError: false,
            code: '' as string,
            message: '' as string
        },
        dbUpdated: false
    };
    try{
        const cred = await getUserCreds(pswd);
        const credEmail = (cred as UserCredential).user.email;
        const credName = (cred as UserCredential).user.displayName;
        
        if(credName === data.name && credEmail === data.email){throw new Error("no-data-to-update")};
        
        if( credEmail !== data.email){
            updateEmail(a.currentUser as User, data.email).then(r => {
                response.emailUpdated = true;
            }).catch(e => {
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
        response.error.isError = true;
        const msg = err.message;
        if(msg !== 'no-data-to-update' && msg !== `email/not-updated/error` && msg !== "name/not-updated/error" && msg !== 'db-not-updated/error'){
            response.error.code = 'invalid-user-cred/error';
            response.error.message = "Error fetching user credentials";
        }

        return response
    }
}

export async function login(email: string, password: string) : Promise<boolean>{
    // TODO - refactor to use try-catch structure
    return new Promise((res, rej) => {
        setPersistence(a, browserLocalPersistence).then(() => {
            signInWithEmailAndPassword(a, email, password).then((cred) => {
                // check database for user
                admin_get_one()
                // if user not in database -> throw error
                .then(r => {
                    const body = {
                        firebase_uid: null,
                        name: null,
                        email: null,
                        role: null,
                        last_login: new Date().toISOString(),
                        creation_date_timestamp: null
                    } as IUser;
            
                    admin_update(body).then(r => {
                        res(true)
                    }).catch(e => {
                        throw new Error('db-not-updated/error');
                    })
                })
                // if user in database -> update last login 
                .catch(e => {
                    deleteAccount(password, true)
                    .then(r => {
                        rej(false)
                    })
                    .catch(e => {
                        console.log(e)
                        rej(false)
                    })
                });
            }).catch((error) => {
                rej(false);
            })
        }).catch((error) => {
            rej(false);
        })
    })
}

export async function isLoggedIn() : Promise<boolean | User>{
    // TODO - refactor to use try-catch structure
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

export async function getUserCreds(pswd:string) : Promise<UserCredential|Object|undefined>{
    // TODO - create a response object interface
    try{
        const user = await isLoggedIn();
        const cred = await signInWithEmailAndPassword(a, ((user as User).email as string), pswd);
        if(cred){
            return cred as UserCredential;
        }
    }catch(err){
        return {
            error: err
        } as Object
    }
    return undefined;
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