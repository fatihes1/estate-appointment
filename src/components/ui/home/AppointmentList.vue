<script setup lang="ts">
import AppointmentListItem from '@/components/ui/home/AppointmentListItem.vue'
import { useAppointmentStore } from '@/stores/AppointmentStore.ts'
import { computed } from 'vue'
import Loader from '@/components/ui/common/loader.vue'
import EmptyState from '@/components/ui/common/empty/EmptyState.vue'
import { storeToRefs } from 'pinia'

const appointmentStore = useAppointmentStore()

const { currentPage, loading, pageSize } = storeToRefs(appointmentStore)

function handlePageChange(page: number) {
  appointmentStore.setPage(page)
}

function handlePageSizeChange(current: number, size: number) {
  appointmentStore.setPageSize(size)
}

const totalFilteredAppointments = computed(
  () => appointmentStore.totalFilteredAppointments
)
</script>

<template>
  <div v-if="appointmentStore.loading">
    <loader />
  </div>
  <div v-else>
    <div
      class="appointment-list px-5 md:px-0"
      v-if="appointmentStore.paginatedFilteredAppointments.length > 0"
    >
      <appointment-list-item
        v-for="(
          appointment, index
        ) in appointmentStore.paginatedFilteredAppointments"
        :appointment="appointment"
        :key="appointment.id"
        :index="index"
      />
    </div>
    <div v-else>
      <empty-state
        title="For this filters, there is no result!"
        message="Please try changing the filters or check again later."
      />
    </div>
    <div
      v-if="appointmentStore.paginatedFilteredAppointments.length > 0"
      class="flex flex-row justify-end mt-4 pb-3"
    >
      <a-pagination
        :current="currentPage"
        :total="totalFilteredAppointments"
        :pageSize="pageSize"
        @change="handlePageChange"
        show-size-changer
        @showSizeChange="handlePageSizeChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
