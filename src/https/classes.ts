import { useUserInfoStore } from "@/stores/userInfo";
import { BASE_URL, headers } from "./setup";
import type { IHTTPResponse } from "./setup";

export interface IClass{
    name: string;
    days: string[];
    startTime: string[];
    endTime: string[];
    classroom: string;
    teacher: string;
    exam1Date: string;
    exam2Date: string;
    retakeExamDate: string;
    finalExamDate: string;
    observations: string | null;
}

export async function createClass(data : IClass) : Promise<IHTTPResponse> {
    const serviceURL = `${BASE_URL}/class/create`;
    const res = {} as IHTTPResponse;
    console.log(data);
    
    const newStartTime = data.startTime.map(time => {
        const arr = time.split(':');
        console.log(arr);
        
        const isoDate = new Date();
        isoDate.setHours(parseInt(arr[0]), parseInt(arr[1]), 0, 0);
        console.log(isoDate);
        return isoDate.toISOString()
    });
    const newEndTime = data.endTime.map(time => {
        const arr = time.split(':');
        const isoDate = new Date();
        isoDate.setHours(parseInt(arr[0]), parseInt(arr[1]), 0, 0);
        return isoDate.toISOString()
    });
    
 
    const body = {
        name: data.name,
        days: data.days,
        start_time: newStartTime,
        end_time: newEndTime,
        classroom: data.classroom,
        teacher: data.teacher,
        exam_1_timestamp: data.exam1Date,
        exam_2_timestamp: data.exam2Date,
        re_take_exam_timestamp: data.retakeExamDate,
        final_exam_timestamp: data.finalExamDate,
        observations: data.observations,
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
        res.code = 400;
        res.response = err;
        return res
    }
    
}

export async function getAllClasses() : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/class/all`;
    const options = {
        method: 'GET',
        headers: headers
    } as RequestInit;
    const res = {} as IHTTPResponse;
    res.data = options;
    try{
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

export async function deleteClass(id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/class/delete/${id}`;
    const res = {} as IHTTPResponse;
    const options = {
        method: 'DELETE',
        headers: headers
    } as RequestInit;
    res.data = options;
    try{
        const req = await fetch(serviceURL, options);
        res.code = req.status;
        res.response = {};
        return res;
    }catch(err){
        res.code = 400;
        res.response = err;
        return res;
    }
}

export async function updateClass(data : IClass, id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/class/update/${id}`;
    const res = {} as IHTTPResponse;
    
    const body = {
        name: data.name,
        days: data.days,
        start_time: data.startTime,
        end_time: data.endTime,
        classroom: data.classroom,
        teacher: data.teacher,
        exam_1_timestamp: data.exam1Date,
        exam_2_timestamp: data.exam2Date,
        re_take_exam_timestamp: data.retakeExamDate,
        final_exam_timestamp: data.finalExamDate,
        observations: data.observations,
        last_edited_by: useUserInfoStore().UID
    };
    const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
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

export async function getClass(id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/class/get/${id}`;
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