import {BASE_URL, headers} from './setup';
import { useAccountCreationStore } from '@/stores/accountCreation';
import type { IHTTPResponse } from './setup';
import { useUserInfoStore } from '@/stores/userInfo';

export async function validateCode() : Promise<IHTTPResponse>{
    const res = {} as IHTTPResponse;
    try{
        const code = useAccountCreationStore().otp;
        const REQ_URL = `${BASE_URL}/code/validate`;
        const body = JSON.stringify({code});
        const options = {
            method: 'POST',
            headers: headers,
            body: body
        } as RequestInit;
        res.data = options;

        const req = await fetch(REQ_URL, options);
        const response = await req.json();
        
        res.code = req.status;
        res.response = response;
        return res;
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res
    }
}

export async function getValidCodes(isExpired : boolean) : Promise<IHTTPResponse>{
    const uid = useUserInfoStore().UID;
    const serviceUrl = `${BASE_URL}/code/all/${uid}/${isExpired}`;
    const res = {} as IHTTPResponse;
    const options = {
        method: 'GET',
        headers: headers
    } as RequestInit;
    res.data = options;
    try{
        const req = await fetch(serviceUrl, options);
        const resBody = await req.json();
        
        res.code = req.status;
        res.response = resBody;
        
        return res;
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res;
    }
}

export async function createNewCode(role : 'owner' | 'admin') : Promise<IHTTPResponse>{
    const uid = useUserInfoStore().UID;
    const body = {
        uid: uid,
        role: role
    };
    const res = {} as IHTTPResponse;
    const serviceUrl = `${BASE_URL}/code/create`
    

    try{
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        } as RequestInit;
        res.data = options;
        const req = await fetch(serviceUrl, options);
        const resBody = await req.json();
        res.code = req.status;
        res.response = resBody;
        return res;
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res;
    }
}

export async function deleteCode(code : string) : Promise<IHTTPResponse>{
    const uid = useUserInfoStore().UID;
    const serviceUrl = `${BASE_URL}/code/delete/${code}/${uid}`;
    const options = {
        method: 'DELETE',
        headers: headers
    } as RequestInit;

    const res = {} as IHTTPResponse;

    res.data = options;

    try{
        const req = await fetch(serviceUrl, options);
        res.code = req.status;
        res.response = {};
        return res;
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res;
    }
}