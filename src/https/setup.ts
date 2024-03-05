export const BASE_URL = 'https://unit-turminha-api.vercel.app/api';

export const headers = {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY,
}

export interface IHTTPResponse {
    data: RequestInit;
    code: number;
    response: any;
}

// TODO - Create a collection of endpoints