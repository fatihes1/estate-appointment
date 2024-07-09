
export type AppointmentsModel = AppointmentModel[]

export type AppointmentModel = {
    appointment_id: number,
    appointment_date: string,
    appointment_address: string,
    contact_id: string[],
    contact_name: string[],
    contact_surname: string[],
    contact_email: string[],
    contact_phone: number[],
    agent_id: string[],
    agent_name: string[],
    agent_surname: string[],
    is_cancelled: boolean,
}

export type AllAppointmentsResponseModel = {
    records: OneAppointmentResponseModel[]
}

export type OneAppointmentResponseModel = {
    id: string,
    createdTime: string,
    fields: AppointmentModel
}