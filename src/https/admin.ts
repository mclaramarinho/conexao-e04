import { isLoggedIn } from "@/firebase/authorization";
import { BASE_URL, createOptions, headers, type IHTTPResponse } from "./setup";
import type { User } from "firebase/auth";
import type { IUser } from "@/interfaces/Https";
import { useUserInfoStore } from "@/stores/userInfo";

export async function admin_get_all() : Promise<IHTTPResponse>{
    const REQ_URL = `${BASE_URL}/admin/all`;
    const res = {} as IHTTPResponse;
    try{
        const options = createOptions({method: 'GET'}, undefined);
        res.data = options;
        
        const req = await fetch(REQ_URL,options);
        res.code = req.status;

        const resBody = await req.json();
        res.response = resBody;
        
        return res;
    }catch(e : any){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = e;
        return res;
    }
}

export async function admin_get_one() : Promise<IHTTPResponse>{
    
    const res = {} as IHTTPResponse;
    try{
        const uid = await getUserId();
        const REQ_URL = `${BASE_URL}/admin/get/${uid}`;

        const options = createOptions({method: 'GET'}, undefined);
        res.data = options;

        const req = await fetch(REQ_URL, options);
        res.code = req.status;

        const resBody = await req.json();
        res.response = resBody;

        return res;

    }catch(e){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = e;
        return res;
    }
}


export async function admin_update(data : IUser) : Promise<IHTTPResponse>{
    const uid = await getUserId();
    const REQ_URL = `${BASE_URL}/admin/update/${uid}`;
    const res = {} as IHTTPResponse;
    try{

        const options = createOptions({method: 'PUT'}, data);
        res.data = options;

        const req = await fetch(REQ_URL, options);
        const resbody = await req.json();
        res.code = req.status;
        res.response = resbody;
        return res;
    }catch(e : any){
        
        // TODO - handle error more specifically 
        // TODO - return the IHTTPResponse object
        res.code = 400;
        res.response = e;
        throw res;
    }
}


export async function admin_create(data : any) : Promise<IHTTPResponse>{
    const REQ_URL = `${BASE_URL}/admin/create`;
    const res = {} as IHTTPResponse;

    try{
        const options = createOptions({method: 'POST'}, data);
        res.data = options;
        const req = await fetch(REQ_URL, options);
        const resBody = await req.json();
        res.code = req.status;
        res.response = resBody;
        return res;
    }catch(e : any){
        // TODO - handle error more specifically 
        res.code = 400;
        res.response = e;
        return res;
    }
    
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

export async function admin_delete() : Promise<IHTTPResponse>{
    const uid = useUserInfoStore().UID;
    const serviceUrl = `${BASE_URL}/admin/delete/${uid}`;
    const res = {} as IHTTPResponse;
    const options = createOptions({method: 'DELETE'}, undefined);
    res.data = options;
    
    try{
        const req = await fetch(serviceUrl, options);
        if(!req.ok){throw new Error('server-error')};

        res.code = req.status;
        res.response = {};
        return res;
    }catch(err : any){
        // TODO - handle error more specifically
        res.response = err;
        if(err.message === 'server-error'){res.code = 500; return res;};
        res.code = 400;
        return res;
    }
}

export async function owner_delete_admin(uid : string) : Promise<IHTTPResponse>{
    const res = {} as IHTTPResponse;
    try{
        const getOpt = createOptions({method: 'GET'}, undefined);
        const userExists = await fetch(`${BASE_URL}/admin/get/${uid}`,getOpt);
        if(userExists.status === 200){
            const serviceUrl = `${BASE_URL}/admin/delete/${uid}`;
            const options = {
                method: 'DELETE',
                headers: headers
            } as RequestInit;
            res.data = options;
            const req = await fetch(serviceUrl, options);
            res.code = req.status;
            res.response = {};
            return res;
        }else{
            throw new Error('user-not-found/error');
        }
    }catch(error){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = error;
        return res;
    }
}