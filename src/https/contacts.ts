import { useUserInfoStore } from "@/stores/userInfo";
import { BASE_URL, createOptions } from "./setup";
import type { IHTTPResponse } from "./setup";
import type { IContact, IContactPostBody, IContactPutBody } from "@/interfaces/Https";

export async function createContact(data : IContact) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/contact/create`;
    const body = {
        name: data.name,
        phone_number: data.phoneNumber,
        email: data.email,
        when_to_contact: data.whenToContact,
        created_by: useUserInfoStore().UID,
        last_edited_by: useUserInfoStore().UID
    } as IContactPostBody;

    const res = {} as IHTTPResponse;
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


export async function getContacts() : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/contact/all`;
    const res = {} as IHTTPResponse;
    const options = createOptions({method: 'GET'}, undefined);
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
    const options = createOptions({method: 'DELETE'}, undefined);

    const res = {} as IHTTPResponse;
    res.data = options;

    try{
        const req = await fetch(serviceURL, options);
        res.code = req.status;
        res.response = {};
        return res;
    }catch(e){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = e;
        return res;
    }
}

export async function updateContact(id : string, data : IContact) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/contact/update/${id}`;
    // TODO - Create a body interface
    const body = {
        name: data.name,
        phone_number: data.phoneNumber,
        email: data.email,
        when_to_contact: data.whenToContact,
        last_edited_by: useUserInfoStore().UID,
        last_edited_at: new Date().toISOString()
    } as IContactPutBody;

    const res = {} as IHTTPResponse;
    try{
        const options = createOptions({method: 'PUT'}, body);
        res.data = options;

        const req = await fetch(serviceURL, options);
        const resBody = await req.json();
        res.code = req.status;
        res.response = resBody;
        return res;
    }catch(e){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = e;
        return res;
    }
}
