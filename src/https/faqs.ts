import { BASE_URL, headers } from '@/https/setup'
import type { IHTTPResponse } from '@/https/setup'
import { useUserInfoStore } from '@/stores/userInfo';

// TODO - move to an HTTP Interfaces file
export interface IFaq{
    question: string;
    answer: string;
}

export async function createFAQ(data : IFaq) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/faq/create`;
    const res = {} as IHTTPResponse;

    // TODO - create an interface for the body
    const body = {
        question: data.question,
        answer: data.answer,
        created_by: useUserInfoStore().UID,
        last_edited_by: useUserInfoStore().UID
    };
    

    try{
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        } as RequestInit;
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
    };
    const res = {} as IHTTPResponse;

    try{
        const options = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        } as RequestInit;
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
    const options = {
        method: 'GET',
        headers: headers
    } as RequestInit;
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