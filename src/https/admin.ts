import { isLoggedIn } from "@/firebase/authorization";
import { BASE_URL, headers, type IHTTPResponse } from "./setup";
import type { User } from "firebase/auth";
import {UserPUT} from "@/models/UserPUT";
import type { IUser } from "@/interfaces/IUser";
/**
 * Retrieves all admin users.
 * @returns A promise that resolves to an array of IUser objects.
 * @throws An error if the request fails.
 */
export async function admin_get_all() : Promise<[IUser]>{
    const REQ_URL = `${BASE_URL}/admin/all`;
    
    try{
        const options = {
            method: 'GET',
            headers: headers,
        } as RequestInit;

        const req = await fetch(REQ_URL,options);
        
        const res = await req.json();
        return res;
    }catch(e : any){
        throw new Error(e.message);
    }
}

/**
 * Retrieves a single admin user by their firebase_uid.
 * @returns A promise that resolves to an IUser object.
 * @throws An error if the request fails.
 */
export async function admin_get_one() : Promise<IUser>{
    let REQ_URL = `${BASE_URL}/admin/get/`;
    try{
        const uid = await getUserId();
        
        REQ_URL += uid;

        const options = {
            method: 'GET',
            headers: headers,
        } as RequestInit;

        const req = await fetch(REQ_URL, options);
        const res = await req.json();
        return res;

    }catch(e : any){
        throw new Error(e.message);
    }
}

/**
 * @param data 
 * @returns 
 */

export async function admin_update(data : UserPUT) : Promise<IHTTPResponse>{
    let REQ_URL = `${BASE_URL}/admin/update/`;
    const res = {} as IHTTPResponse;
    try{
        const uid = await getUserId();
        
        REQ_URL += uid;

       
        const body = JSON.stringify(data.getter());

        const options = {
            method: 'PUT',
            headers: headers,
            body: body,
        } as RequestInit;
        res.data = options;

        const req = await fetch(REQ_URL, options);
        const resbody = await req.json();
        res.code = req.status;
        res.response = resbody;
        return res;
    }catch(e : any){
        throw new Error(e.message);
    }
}


export async function admin_create(data : any){
    const REQ_URL = `${BASE_URL}/admin/create`;
    try{
        const body = JSON.stringify(data);
        const options = {
            method: 'POST',
            headers: headers,
            body: body,
        } as RequestInit;
        const req = await fetch(REQ_URL, options);
        const res = await req.json();
        return res;
    }catch(e : any){
        return false
    }
    
}


interface adminUpdateDataType_{
    type: 'firebase_uid' | 'name' | 'email' | "role" | "last_login";
}



async function getUserId() : Promise<string | null>{
    return new Promise((resolve, reject) => {
        isLoggedIn().then((user) => {
            if(user){
                resolve((user as User).uid);
            }else{
                reject(new Error("User not logged in"));
            }
        }).catch((e) => {
            reject(new Error(e.message));
        });
    });
}