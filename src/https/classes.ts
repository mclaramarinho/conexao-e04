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
    observations: string;
}

export async function createClass(data : IClass) : Promise<IHTTPResponse> {
    const serviceURL = `${BASE_URL}/class/create`;
    const res = {} as IHTTPResponse;
    const newStartTime = data.startTime.map(time => new Date(time).toISOString());
    const newEndTime = data.endTime.map(time => new Date(time).toISOString());

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