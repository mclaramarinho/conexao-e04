import {BASE_URL, headers} from './setup';
import { useAccountCreationStore } from '@/stores/accountCreation';
import type { IHTTPResponse } from './setup';

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
        res.code = 400;
        res.response = err;
        return res
    }
}