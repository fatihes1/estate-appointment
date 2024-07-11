import axiosInstance from "./axios-instance.ts";
const CONTACT_KEY = 'Contacts'

export function getAllContacts(pageSize: number = 20, offset: string = '') {
    return axiosInstance.get(CONTACT_KEY, {
        params: {
            pageSize,
            offset
        }
    })
}

export function getOneContact(contactId: string) {
    return axiosInstance.get(`${CONTACT_KEY}/${contactId}`)
}