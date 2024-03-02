import { getContacts } from "@/https/contacts";
import type { IHTTPResponse } from "@/https/setup";
import { defineStore } from "pinia";

export const useContactsList = defineStore("contactsList", {
  state: () => ({
    contacts: [] as Array<any>,
  }),
  actions: {
    async refresh(){
      this.contacts = await new Promise((resolve, rej) => {
        getContacts().then((res : IHTTPResponse) => {
          resolve(res as any)
        }).catch((err : IHTTPResponse) => {
          rej(err)
        })
      })
    },
  },
});