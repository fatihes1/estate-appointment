import axiosInstance from "./axios-instance.ts";
const APPOINTMENT_KEY = 'Appointments'

export function getAllAppointments(maxRecords: number = 10) {
    return axiosInstance.get(APPOINTMENT_KEY, {
        params: {
            maxRecords
        }
    })
}

export function getOneAppointment(appointmentId: string) {
    return axiosInstance.get(`${APPOINTMENT_KEY}/${appointmentId}`)
}