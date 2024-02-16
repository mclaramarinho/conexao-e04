import { defineStore } from "pinia";

export const useAccountCreationStore = defineStore({
  id: "accountCreation",
  state: () => ({
    email: "",
    password: "",
    name:"",
    otp: "",
    role: "",
    firebase_uid: "",
    creation_date_timestamp: "",
  }),
  actions: {
    constructor(email : string, password : string, name : string){
        this.email = email;
        this.password = password;
        this.name = name;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setPassword(password: string) {
      this.password = password;
    },
    setName(name: string) {
      this.name = name;
    },
    setOtp(otp: string) {
      this.otp = otp;
    },
    setRole(role: string) {
      this.role = role;
    },
    setFirebase_uid(firebase_uid: string) {
      this.firebase_uid = firebase_uid;
    },
    setCreation_date_timestamp(creation_date_timestamp: string) {
      const iso = new Date(creation_date_timestamp).toISOString();
      this.creation_date_timestamp = iso;
    },
    getAll(){
      return this;
    },
    getData() : any{
      return {
        email: this.email,
        name: this.name,
        role: this.role,
        firebase_uid: this.firebase_uid,
      }
    }
  },
});
