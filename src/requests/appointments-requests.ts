import axiosInstance from "./axios-instance.ts";
const APPOINTMENT_KEY = 'Appointments'

export function getAllAppointments(pageSize: number = 10, offset?: string | null) {
    return axiosInstance.get(APPOINTMENT_KEY, {
        params: {
            pageSize,
            offset,
            sort: [{ field: 'appointment_date', direction: 'desc' }]
        }
    })
}

export function getOneAppointment(appointmentId: string) {
    return axiosInstance.get(`${APPOINTMENT_KEY}/${appointmentId}`)
}

export function getAppointmentsByIds(appointmentIds: string[]) {
    const filterFormula = `OR(${appointmentIds.map(id => `RECORD_ID()='${id}'`).join(',')})`
    return axiosInstance.get(APPOINTMENT_KEY, {
        params: {
            filterByFormula: filterFormula
        }
    })
}

export function getUpcomingAppointmentsByIds(appointmentIds: string[]) {
    const filterFormula = `AND(
    OR(${appointmentIds.map(id => `RECORD_ID()='${id}'`).join(',')}),
    IS_AFTER({appointment_date}, NOW())
  )`
    return axiosInstance.get(APPOINTMENT_KEY, {
        params: {
            filterByFormula: filterFormula,
            sort: [{ field: 'appointment_date', direction: 'asc' }]
        }
    })
}