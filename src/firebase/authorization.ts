import {app, a} from "./config";
import { browserLocalPersistence, updateProfile, createUserWithEmailAndPassword, setPersistence, type User, type Auth, type UserCredential } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function register(email: string, password: string, name : string) : Promise<boolean | void>{
        try {
            const created = await createUserWithEmailAndPassword(a, email, password)
            const updatedName = await updateProfileName(created, name);
            return true;
        } catch (error) {
            return false;
        }
}


async function updateProfileName(cred : UserCredential, name: string) : Promise<boolean>{
    return updateProfile(a.currentUser as User, { 
        displayName:name,
        photoURL: ""
    }).then(() => {return true}).catch((error) => {console.log(error); return false});
}

export async function login(email: string, password: string) : Promise<boolean>{
    return new Promise((res, rej) => {
        setPersistence(a, browserLocalPersistence).then(() => {
            signInWithEmailAndPassword(a, email, password).then((cred) => {
                res(true);
            }).catch((error) => {
                console.log(error);
                res(false);
            })
        }).catch((error) => {
            console.log(error);
            res(false);
        })
    })
}

export async function isLoggedIn() : Promise<boolean | User>{
    return new Promise((res, rej) => {
        a.onAuthStateChanged((user) => {
            if(user){
                res(user as User);
            } else {
                rej(false);
            }
        })
    })
}
