import { defineStore } from "pinia"
import {OneAppointmentResponseModel} from "../models/appointments-model.ts";

export const useAppointmentStore = defineStore("appointmentStore",{
    state: () => ({
        appointments: [] as OneAppointmentResponseModel[],
        loading: false
    }),

    actions: {
        setLoading(loading: boolean){
            this.loading = loading
        },
        setAppointments(appointments: OneAppointmentResponseModel[]){
            this.appointments = appointments
        }
    }
})