import type { IUser } from "@/interfaces/IUser"

export class UserPUT{
    user = {} as IUser;
    constructor(){
        this.user.email = null;
        this.user.name = null;
        this.user.role = null;
        this.user.last_login = null;
        this.user.firebase_uid = null;
    }
    getter() : IUser{
        return this.user;
    }
}