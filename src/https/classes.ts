import { useUserInfoStore } from "@/stores/userInfo";
import { BASE_URL, createOptions } from "./setup";
import type { IHTTPResponse } from "./setup";
import type { IClass, IClassPostBody } from "@/interfaces/Https";
import { timeToIsoFormat } from "@/utils/dates";

export async function createClass(data : IClass) : Promise<IHTTPResponse> {
    const serviceURL = `${BASE_URL}/class/create`;
    const res = {} as IHTTPResponse;
    
    const newStartTime = data.startTime.map(time => {
        return timeToIsoFormat(time);
    });
    const newEndTime = data.endTime.map(time => {
        return timeToIsoFormat(time);
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
    } as IClassPostBody;
   
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
        return res
    }
    
}

export async function getAllClasses() : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/class/all`;

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

export async function deleteClass(id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/class/delete/${id}`;
    const res = {} as IHTTPResponse;
    const options = createOptions({method: 'DELETE'}, undefined);
    res.data = options;
    try{
        const req = await fetch(serviceURL, options);
        res.code = req.status;
        res.response = {};
        return res;
    }catch(err){
        // TODO - handle error more specifically
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
        days: data.days, start_time: data.startTime, end_time: data.endTime,
        classroom: data.classroom,
        teacher: data.teacher,
        exam_1_timestamp: data.exam1Date, 
        exam_2_timestamp: data.exam2Date,
        re_take_exam_timestamp: data.retakeExamDate,
        final_exam_timestamp: data.finalExamDate,
        observations: data.observations,
        last_edited_by: useUserInfoStore().UID
    } as IClassPostBody;
    
    const options = createOptions({method: 'PUT'}, body);
    res.data = options;
    try{
        const req = await fetch(serviceURL, options);
        const reqBody = await req.json();
        res.code = req.status;
        res.response = reqBody;
        return res;
    }catch(err){
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res;
    }
}

export async function getClass(id : string) : Promise<IHTTPResponse>{
    const serviceURL = `${BASE_URL}/class/get/${id}`;
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
        // TODO - handle error more specifically
        res.code = 400;
        res.response = err;
        return res;
    }
}