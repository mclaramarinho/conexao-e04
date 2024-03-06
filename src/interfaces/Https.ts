export interface IUser{
    firebase_uid: String | null;
    name: String | null;
    email: String | null;
    role: String | null;
    last_login: String | null;
    creation_date_timestamp: String | null
};

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
};

export interface IClassesGetBody{
    id: string;
    name: string;
    teacher: string;
    schedule: string[];
    classroom: string;
    exam1Date: string;
    exam2Date: string;
    retakeExamDate: string;
    finalExamDate: string;
    observations: string;
};

export interface IClassPostBody{
    name: string;
    days: Array<string>;
    start_time: Array<string>;
    end_time: Array<string>;
    classroom: string;
    teacher: string;
    exam_1_timestamp: string;
    exam_2_timestamp: string;
    re_take_exam_timestamp: string;
    final_exam_timestamp: string;
    observations: string;
    created_by: string;
    last_edited_by: string
};

export interface ICodePostBody{
    uid: string;
    role: IUserRole;
};

export type IUserRole = 'owner' | 'admin';

export interface IContact {
    name: string;
    phoneNumber: string;
    email: string;
    whenToContact: string;
};

export interface IContactPostBody{
    name: string;
    phone_number: string;
    email: string;
    when_to_contact: string;
    created_by: string;
    last_edited_by: string
};

export interface IContactPutBody{
    name: string;
    phone_number: string;
    email: string;
    when_to_contact: string;
    last_edited_by: string;
    last_edited_at: string;
};

export interface IEvent {
    eventName: string;
    isMandatory: boolean;
    eventDescription: string;
    eventStart: string;
    eventEnd: string;
    organizer: string | null;
    contact: string | null;
    location: string | null;
    contactType: IContactType;
}
export interface IEventGetBody{
    "_id": string;
    start_timestamp: string;
    end_timestamp: string;
    event_name: string;
    event_location: string;
    description: string;
    organizer: string;
    event_contact_main: string;
    is_mandatory: boolean;
    created_by: string;
    created_at_timestamp: string;
    last_edited_by: string;
    last_edited_at: string;
};

export interface IEventPostBody{
    start_timestamp: string;
    end_timestamp: string;
    event_name: string;
    description: string;
    organizer: string;
    event_location: string;
    event_contact_main: string;
    is_mandatory: string;
    created_by: string;
    last_edited_by: string;
};

export interface IEventPutBody{
    start_timestamp: string;
    end_timestamp: string;
    event_name: string;
    description: string;
    organizer: string;
    event_location: string;
    event_contact_main: string;
    is_mandatory: string;
    last_edited_by: string;
};

export type IContactType = "phone" | "email";

export interface IFaq{
    question: string;
    answer: string;
};

export interface IFaqPostBody{
    question: string;
    answer: string;
    created_by: string;
    last_edited_by: string
};

export interface IFaqPutBody{
    question: string;
    answer: string;
    last_edited_by: string;
};