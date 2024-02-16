import {BASE_URL, headers} from './setup';
import { useAccountCreationStore } from '@/stores/accountCreation';


export async function validateCode() : Promise<any>{
    try{
        const code = useAccountCreationStore().otp;
        const REQ_URL = `${BASE_URL}/code/validate`;
        const body = JSON.stringify({code});
        const options = {
            method: 'POST',
            headers: headers,
            body: body
        } as RequestInit;
        const req = await fetch(REQ_URL, options);
        const response = await req.json();
        const res = {status: req.status, response: response};
        return res;
    }catch(err){
        return false;
    }
}