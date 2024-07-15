import axiosInstance from './axios-instance.ts'
const CONTACT_KEY = 'Contacts'

export function getAllContacts(pageSize: number = 20, offset: string = '') {
  return axiosInstance.get(CONTACT_KEY, {
    params: {
      pageSize,
      offset,
    },
  })
}

export function searchContactsRequest(search: string) {
  const filterByFormula = `OR(FIND(LOWER("${search}"), LOWER({contact_name})) > 0, FIND(LOWER("${search}"), LOWER({contact_surname})) > 0)`
  return axiosInstance.get(CONTACT_KEY, {
    params: {
      filterByFormula,
    },
  })
}

export function searchContactsByRecordIds(recordIds: string[]) {
  const filterFormula = `OR(${recordIds.map((id) => `RECORD_ID()='${id}'`).join(',')})`
  return axiosInstance.get(CONTACT_KEY, {
    params: {
      filterByFormula: filterFormula,
    },
  })
}

export function getOneContact(contactId: string) {
  return axiosInstance.get(`${CONTACT_KEY}/${contactId}`)
}
