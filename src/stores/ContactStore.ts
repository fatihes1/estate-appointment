import { defineStore } from 'pinia'
import { OneContactResponseModel } from '../models/contacts-model.ts'

export const useContactStore = defineStore('contactStore', {
  state: () => ({
    contacts: [] as OneContactResponseModel[],
  }),
  actions: {
    setContacts(contacts: OneContactResponseModel[]) {
      this.contacts = contacts
    },
  },
})
