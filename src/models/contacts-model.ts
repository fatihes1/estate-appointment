export type ContactsModel = ContactsModel[]

export type ContactModel = {
    contact_id: number,
    contact_name: string,
    contact_surname: string,
    contact_email: string,
    contact_phone: number,
    appointments: string[],
}

export type AllContactsResponseModel = {
    records: OneContactResponseModel[]
}

export type OneContactResponseModel = {
    id: string,
    createdTime: string,
    fields: ContactModel
}