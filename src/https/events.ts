import { useUserInfoStore } from "@/stores/userInfo";
import { BASE_URL, headers } from "./setup";


interface IEvent {
    eventName: string;
    isMandatory: boolean;
    eventDescription: string;
    eventStart: string;
    eventEnd: string;
    organizer: string | null;
    contact: string | null;
    location: string | null;
    contactType: "phone" | "email";
}

interface IHTTPResponse {
    data: RequestInit;
    code: number;
    response: any;
}

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
        }
        
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers,
        } as RequestInit;
        
        res.data = options;
        
        const req = await fetch(serviceURL, options);
        const r = await req.json();
        res.code = req.status;
        res.response = r;
        return res;
    }catch(err){
        res.code = 400;
        res.response = err;
        return res
    }
    
}

export type {IEvent}