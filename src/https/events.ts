import { useUserInfoStore } from "@/stores/userInfo";
import { BASE_URL, createOptions, headers } from "./setup";
import type { IHTTPResponse } from "./setup";
import type { IEvent, IEventPostBody, IEventPutBody } from "@/interfaces/Https";

export async function createEvent(data : IEvent) : Promise<IHTTPResponse>{
    const res = {} as IHTTPResponse;
    try{
        const serviceURL = `${BASE_URL}/events/create`;
        const body = {
            start_timestamp: data.eventStart,
            end_timestamp: data.eventEnd,
            event_name: data.eventName,
            description: data.eventDescription,
            organizer: data.organizer,
            event_location: data.location,
            event_contact_main: data.contact,
            is_mandatory: data.isMandatory.toString(),
            created_by: useUserInfoStore().UID,
            last_edited_by: useUserInfoStore().UID,
        } as IEventPostBody;
        
        const options = createOptions({method: 'POST'}, body);
        
        res.data = options;
        
        const req = await fetch(serviceURL, options);
        const r = await req.json();
        res.code = req.status;
        res.response = r;
        return res;
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res
    }
    
}


export async function getAllEvents() : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/events/all`
    const res = {} as IHTTPResponse;
    const options = createOptions({method: 'GET'}, undefined);
    res.data = options;

    try{
        const req = await fetch(serviceURL, options);
        const resBody = await req.json();
        res.code = req.status;
        res.response = resBody;
        return res
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res
    }
}

export async function getEvent(id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/events/get/${id}`
    const res = {} as IHTTPResponse;
    const options = createOptions({method: 'GET'}, undefined);
    res.data = options;

    try{
        const req = await fetch(serviceURL, options);
        const resBody = await req.json();
        res.code = req.status;
        res.response = resBody;
        return res
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res
    }
}
export async function deleteEvent(id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/events/delete/${id}`
    const res = {} as IHTTPResponse;
    const options = createOptions({method: 'DELETE'}, undefined);
    res.data = options;

    try{
        const req = await fetch(serviceURL, options);
        res.code = req.status;
        res.response = {};
        return res
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res
    }
}
export async function updateEvent(data : IEvent, id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/events/update/${id}`
    const res = {} as IHTTPResponse;
    
    const body = {
        start_timestamp: data.eventStart,
        end_timestamp: data.eventEnd,
        event_name: data.eventName,
        description: data.eventDescription,
        organizer: data.organizer,
        event_location: data.location,
        event_contact_main: data.contact,
        is_mandatory: data.isMandatory.toString(),
        last_edited_by: useUserInfoStore().UID,
    } as IEventPutBody;

    // TODO - Surround with try-catch block
    const options = createOptions({method: 'PUT'}, body);
    res.data = options;

    try{
        const req = await fetch(serviceURL, options);
        const resBody = await req.json();
        res.code = req.status;
        res.response = resBody;
        return res
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res
    }
}