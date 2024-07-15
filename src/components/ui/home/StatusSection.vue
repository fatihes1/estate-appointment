<template>
  <div class="py-5 border-b-2 border-gray-200">
    <div v-if="appointmentStore.loading">
      <loader />
    </div>
    <div v-else>
      <div
        class="flex flex-col md:flex-row gap-y-3 md:gap-y-0 justify-between items-center"
      >
        <div
          class="text-md font-bold"
          v-if="appointmentStore.filteredAppointments"
        >
          {{ appointmentStore.filteredAppointments.length }} Appointments found.
        </div>
        <div>
          <button
            @click="openCreateModal"
            type="button"
            class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon class="h-5 w-5" aria-hidden="true" />
            Create Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
  <appointment-modal
    :isOpen="isOpen"
    :on-cancel="closeModal"
    :modal-type="ADD_MODAL"
  />
</template>

<script setup lang="ts">
import Loader from '@/components/ui/common/loader.vue'
import { useAppointmentStore } from '@/stores/AppointmentStore.ts'
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import AppointmentModal from '@/components/ui/modals/AppointmentModal.vue'
import { ADD_MODAL } from '@/enums/modal-type-enums.ts'
const appointmentStore = useAppointmentStore()
const isOpen = ref(false)
function closeModal() {
  isOpen.value = false
}

function openCreateModal() {
  isOpen.value = true
}
</script>

<style scoped></style>
