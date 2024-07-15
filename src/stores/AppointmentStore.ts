import { defineStore } from 'pinia'
import {
  CreateAppointmentRequestModel,
  OneAppointmentResponseModel,
  UpdateAppointmentRequestModel,
} from '../models/appointments-model.ts'
import {
  cancelAnAppointmentRequest,
  createAppointmentRequest,
  getAllAppointments,
  updateAppointmentRequest,
} from '../requests/appointments-requests.ts'
import {
  ALL_STATUSES,
  CANCELED,
  COMPLETED,
  UPCOMING,
} from '../enums/status-filter-enums.ts'

export const useAppointmentStore = defineStore('appointmentStore', {
  state: () => ({
    appointments: [] as OneAppointmentResponseModel[],
    loading: false,
    allAppointments: [] as OneAppointmentResponseModel[],
    currentPage: 1,
    pageSize: 10,
    selectedAgents: [] as string[],
    selectedStatus: 1,
    dateRange: { start: '', end: '' },
    searchText: '',
  }),

  getters: {
    paginatedAppointments(state) {
      const start = (state.currentPage - 1) * state.pageSize
      const end = start + state.pageSize
      return state.allAppointments.slice(start, end)
    },
    totalPages(state) {
      return Math.ceil(state.allAppointments.length / state.pageSize)
    },
    totalAppointments(state) {
      return state.allAppointments.length
    },
    totalFilteredAppointments() {
      return this.filteredAppointments.length
    },
    filteredAppointments(state): OneAppointmentResponseModel[] {
      return this.allAppointments.filter((appointment) => {
        if (this.selectedAgents.length > 0) {
          // Eğer appointment'ın agent_id'si yoksa veya boş bir dizi ise, bu appointment'ı filtrele
          if (
            !appointment.fields.agent_id ||
            appointment.fields.agent_id.length === 0
          ) {
            return false
          }

          // Seçilen agent'lardan en az birinin appointment'ın agent_id'lerinde olup olmadığını kontrol et

          const hasSelectedAgent = state.selectedAgents.some((selectedAgent) =>
            appointment.fields.agent_id
              .map(String)
              .includes(String(selectedAgent))
          )
          if (!hasSelectedAgent) {
            return false
          }
        }

        if (this.selectedStatus !== ALL_STATUSES) {
          const now = new Date()
          const appointmentDate = new Date(appointment.fields.appointment_date)

          switch (this.selectedStatus) {
            case ALL_STATUSES:
              break
            case CANCELED:
              if (!appointment.fields.is_cancelled) return false
              break
            case UPCOMING:
              if (
                'is_cancelled' in appointment.fields ||
                appointmentDate <= now
              )
                return false
              break
            case COMPLETED:
              // is_canceled değeri olmayan ve tarihi geçmiş randevuları göster
              if ('is_cancelled' in appointment.fields || appointmentDate > now)
                return false
              break
          }
        }

        // Tarih aralığı filtresi
        if (this.dateRange.start && this.dateRange.end) {
          const appointmentDate = new Date(
            appointment.fields.appointment_date
          ).toISOString()
          if (
            appointmentDate < this.dateRange.start ||
            appointmentDate > this.dateRange.end
          ) {
            return false
          }
        }

        if (this.searchText) {
          const searchLower = this.searchText.toLowerCase()
          return (
            (appointment.fields.appointment_address &&
              appointment.fields.appointment_address
                .toLowerCase()
                .includes(searchLower)) ||
            (appointment.fields.contact_name &&
              appointment.fields.contact_name.some((name) =>
                name.toLowerCase().includes(searchLower)
              )) ||
            (appointment.fields.contact_surname &&
              appointment.fields.contact_surname.some((surname) =>
                surname.toLowerCase().includes(searchLower)
              )) ||
            (appointment.fields.contact_email &&
              appointment.fields.contact_email.some((email) =>
                email.toLowerCase().includes(searchLower)
              )) ||
            (appointment.fields.contact_phone &&
              appointment.fields.contact_phone.some((phone) =>
                phone.toString().toLowerCase().includes(searchLower)
              ))
          )
        }

        return true
      })
    },
    paginatedFilteredAppointments(): OneAppointmentResponseModel[] {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredAppointments.slice(start, end)
    },
    totalFilteredPages(): number {
      return Math.ceil(this.filteredAppointments.length / this.pageSize)
    },
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setAppointments(appointments: OneAppointmentResponseModel[]) {
      this.appointments = appointments
    },
    setAllAppointments(allAppointments: OneAppointmentResponseModel[]) {
      this.allAppointments = allAppointments
    },
    setPage(page: number) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    setPageSize(size: number) {
      this.pageSize = size
      this.currentPage = 1 // Reset to first page
    },
    async fetchAllAppointments() {
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
    },
    setSelectedAgents(agents: string[]) {
      this.selectedAgents = agents
      this.currentPage = 1 // Sayfa numarasını sıfırla
    },
    setSelectedStatus(status: number) {
      this.selectedStatus = status
      this.currentPage = 1
    },
    setDateRange(start: string, end: string) {
      this.dateRange = { start, end }
      this.currentPage = 1
    },
    setSearchText(text: string) {
      this.searchText = text
      this.currentPage = 1
    },
    getRelatedAppointmentsByContactId(
      contactId: string,
      existAppointmentId: string
    ) {
      return this.allAppointments.filter((appointment) =>
        appointment.fields.contact_id.some(
          (id) => id === contactId && appointment.id !== existAppointmentId
        )
      )
    },
    async createNewAppointment(appointmentData: CreateAppointmentRequestModel) {
      const response = await createAppointmentRequest(appointmentData)
      this.setAllAppointments([
        { ...response.data, is_new: true },
        ...this.allAppointments,
      ])
    },
    async updateAppointment(
      appointmentId: string,
      appointmentData: UpdateAppointmentRequestModel
    ) {
      const response = await updateAppointmentRequest(
        appointmentId,
        appointmentData
      )

      const updatedAppointmentIndex = this.allAppointments.findIndex(
        (appointment) => appointment.id === appointmentId
      )
      if (updatedAppointmentIndex !== -1) {
        this.allAppointments[updatedAppointmentIndex] = {
          ...this.allAppointments[updatedAppointmentIndex],
          ...response.data,
        }
      }

      const updatedAppointmentViaAgentIndex = this.appointments.findIndex(
        (appointment) => appointment.id === appointmentId
      )
      if (updatedAppointmentViaAgentIndex !== -1) {
        this.appointments[updatedAppointmentViaAgentIndex] = {
          ...this.appointments[updatedAppointmentViaAgentIndex],
          ...response.data,
        }
      }
    },
    async cancelAnAppointment(appointmentId: string) {
      const response = await cancelAnAppointmentRequest(appointmentId, {
        is_cancelled: true,
      })
      const updatedAppointmentIndex = this.allAppointments.findIndex(
        (appointment) => appointment.id === appointmentId
      )
      if (updatedAppointmentIndex !== -1) {
        this.allAppointments[updatedAppointmentIndex] = {
          ...this.allAppointments[updatedAppointmentIndex],
          ...response.data,
        }
      }

      const updatedAppointmentViaAgentIndex = this.appointments.findIndex(
        (appointment) => appointment.id === appointmentId
      )
      if (updatedAppointmentViaAgentIndex !== -1) {
        this.appointments[updatedAppointmentViaAgentIndex] = {
          ...this.appointments[updatedAppointmentViaAgentIndex],
          ...response.data,
        }
      }
    },
  },
})
