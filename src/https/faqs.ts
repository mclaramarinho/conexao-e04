import { BASE_URL, createOptions, headers } from '@/https/setup'
import type { IHTTPResponse } from '@/https/setup'
import { useUserInfoStore } from '@/stores/userInfo';
import type { IFaq, IFaqPostBody, IFaqPutBody } from '@/interfaces/Https';

export async function createFAQ(data : IFaq) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/faq/create`;
    const res = {} as IHTTPResponse;

    const body = {
        question: data.question,
        answer: data.answer,
        created_by: useUserInfoStore().UID, 
        last_edited_by: useUserInfoStore().UID
    } as IFaqPostBody;

    try{
        const options = createOptions({method: 'POST'}, body);
        res.data = options;

        const req = await fetch(serviceURL, options);
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

export async function updateFAQ(data : IFaq, id : string) : Promise<IHTTPResponse>{
            
    const serviceURL = `${BASE_URL}/faq/update/${id}`;

    const body = {
        question: data.question,
        answer: data.answer,
        last_edited_by: useUserInfoStore().UID
    } as IFaqPutBody;
    
    const res = {} as IHTTPResponse;

    try{
        const options = createOptions({method: 'PUT'}, body);
        res.data = options;
        const req = await fetch(serviceURL, options);
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

export async function getAllFAQs() : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/faq/all`;
    const res = {} as IHTTPResponse;
    const options = createOptions({method: 'GET'}, undefined);
    res.data = options;

    try{
        const req = await fetch(serviceURL, options);
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

export async function deleteFAQ(id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/faq/delete/${id}`;
    const res = {} as IHTTPResponse;
    try{
        const options = createOptions({method: 'DELETE'}, undefined);
        res.data = options;
        
        const req = await fetch(serviceURL, options);
        const resBody =  {};
        res.code = req.status;
        res.response = resBody;
        return res;
    }catch(err){
        res.code = 400;
        res.response = err;
        return res;
    }
    
}