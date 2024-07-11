import { defineStore } from "pinia"
import {OneContactResponseModel} from "../models/contacts-model.ts";
import {getAllContacts} from "../requests/contacts-requests.ts";

export const useContactStore = defineStore("contactStore",{
    state: () => ({
        contacts: [] as OneContactResponseModel[]
    }),
    actions: {
        setContacts(contacts: OneContactResponseModel[]){
            this.contacts = contacts
        },
        async fetchContacts() {
            try {
                const response = await getAllContacts() // Adjust the URL to your API endpoint
                this.setContacts(response.data.records);
            } catch (error) {
                console.error('Failed to fetch contacts:', error);
            }
        }
    }
})