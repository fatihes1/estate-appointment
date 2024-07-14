import { defineStore } from "pinia"
import {OneAppointmentResponseModel} from "../models/appointments-model.ts";
import {getAllAppointments} from "../requests/appointments-requests.ts";

export const useAppointmentStore = defineStore("appointmentStore",{
    state: () => ({
        appointments: [] as OneAppointmentResponseModel[],
        loading: false,
        allAppointments: [] as OneAppointmentResponseModel[],
        currentPage: 1,
        pageSize: 10,
    }),

    getters: {
        paginatedAppointments(state) {
            const start = (state.currentPage - 1) * state.pageSize;
            const end = start + state.pageSize;
            return state.allAppointments.slice(start, end);
        },
        totalPages(state) {
            return Math.ceil(state.allAppointments.length / state.pageSize);
        },
        totalAppointments(state) {
            return state.allAppointments.length;
        },
    },
    actions: {
        setLoading(loading: boolean){
            this.loading = loading
        },
        setAppointments(appointments: OneAppointmentResponseModel[]){
            this.appointments = appointments
        },
        setAllAppointments(allAppointments: OneAppointmentResponseModel[]){
            this.allAppointments = allAppointments
        },
        setPage(page: number) {
            if (page > 0 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        setPageSize(size: number) {
            this.pageSize = size;
            this.currentPage = 1; // Reset to first page
        },
        async fetchAllAppointments(){
            this.setLoading(true)
            let allRecords: OneAppointmentResponseModel[] = []
            let offset: string | null = null
            do {
                const response = await getAllAppointments(100, offset)
                allRecords = [...allRecords, ...response.data.records]
                offset = response.data.offset || null
            } while (offset)
            this.setLoading(false)
            this.setAllAppointments(allRecords)
        }
    }
})