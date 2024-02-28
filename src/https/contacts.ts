import { useUserInfoStore } from "@/stores/userInfo";
import { BASE_URL, headers } from "./setup";
import type { IHTTPResponse } from "./setup";

export interface IContact {
    name: string;
    phoneNumber: string;
    email: string;
    whenToContact: string;
}


export async function createContact(data : IContact) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/contact/create`;
    const body = {
        name: data.name,
        phone_number: data.phoneNumber,
        email: data.email,
        when_to_contact: data.whenToContact,
        created_by: useUserInfoStore().UID,
        last_edited_by: useUserInfoStore().UID
    }
    const res = {} as IHTTPResponse;
    try{
        const options = {
            method: "POST",
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
        res.code = 400;
        res.response = err;
        return res;
    }
}


export async function getContacts() : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/contact/all`;
    const res = {} as IHTTPResponse;
    const options = {
        method: 'GET',
        headers: headers
    } as RequestInit;
    res.data = options;

    try{
        const req = await fetch(serviceURL, options);
        const reqBody = await req.json();
        res.code = req.status;
        res.response = reqBody;
        return res;
    }catch(err){
        res.code = 400;
        res.response = err;
        return res;
    }
}

export async function deleteContact(id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/contact/delete/${id}`;
    const options = {
        method: 'DELETE',
        headers: headers
    } as RequestInit;

    const res = {} as IHTTPResponse;
    res.data = options;

    try{
        const req = await fetch(serviceURL, options);
        res.code = req.status;
        res.response = {};
        return res;
    }catch(e){
        res.code = 400;
        res.response = e;
        return res;
    }
}

export async function updateContact(id : string, data : IContact) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/contact/update/${id}`;
    const body = {
        name: data.name,
        phone_number: data.phoneNumber,
        email: data.email,
        when_to_contact: data.whenToContact,
        last_edited_by: useUserInfoStore().UID,
        last_edited_at: new Date().toISOString()
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
    }catch(e){
        res.code = 400;
        res.response = e;
        return res;
    }
}
