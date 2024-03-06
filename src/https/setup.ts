export const BASE_URL = 'https://unit-turminha-api.vercel.app/api';

export const headers = {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY,
}

export interface IHTTPResponse {
    data: RequestInit;
    code: number;
    response: any;
};

export interface IHTTPMethods{
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export function createOptions(method : IHTTPMethods, body : any | undefined) : RequestInit{
    if(body){
        return{
            method: method.method,
            headers: headers,
            body: JSON.stringify(body)
        }
    }else{
        return{
            method: method.method,
            headers: headers
        }
    }
}

// TODO - Create a collection of endpoints