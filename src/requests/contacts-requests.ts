import axiosInstance from "./axios-instance.ts";
const CONTACT_KEY = 'Contacts'

export function getAllContacts(maxRecords: number=10) {
    return axiosInstance.get(CONTACT_KEY, {
        params: {
            maxRecords
        }
    })
}

export function getOneContact(contactId: string) {
    return axiosInstance.get(`${CONTACT_KEY}/${contactId}`)
}