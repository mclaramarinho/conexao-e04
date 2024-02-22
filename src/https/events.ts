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
    contactType: "phone" | "email";
}

interface IHTTPResponse {
    code: number;
    response: any;
}

export async function createEvent(data : IEvent) : Promise<IHTTPResponse>{
    try{
        const serviceURL = `${BASE_URL}/events/create`;
        const body = {
            start_timestamp: data.eventStart,
            end_timestamp: data.eventEnd,
            event_name: data.eventName,
            description: data.eventDescription,
            organizer: data.organizer,
            event_contact_main: data.contact,
            is_mandatory: data.isMandatory,
            created_by: useUserInfoStore().UID,
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers,
        } as RequestInit;
        const req = await fetch(serviceURL, options);
        const r = await req.json();
        const res = {
            code: req.status,
            response: r,
        }
        return res;
    }catch(err){
        return {
            code: 400,
            response: err
        }
    }
    
}