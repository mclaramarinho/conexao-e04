import type { UserCredential } from "firebase/auth";

export interface IFirebaseUserUpdate{
    nameUpdated: Boolean;
    emailUpdated: Boolean;
    error: IError;
    dbUpdated: Boolean
}

export interface IFirebaseGetCredentials{
    error: IError;
    credentials: null | UserCredential;
}


export interface IError{
    isError: Boolean;
    code: string;
    message: string;
}