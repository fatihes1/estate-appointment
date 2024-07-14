<script setup lang="ts">

import AppointmentListItem from "@/components/ui/home/AppointmentListItem.vue";
import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
import {computed, watch} from "vue";
const appointmentStore = useAppointmentStore();
import { storeToRefs } from "pinia";
const { paginatedAppointments, totalAppointments, currentPage, totalPages, loading, pageSize } = storeToRefs(appointmentStore);

watch(() => appointmentStore.paginatedAppointments, () => {
  console.log("APPOINTMENT PAGINATE: ", appointmentStore.paginatedAppointments);
})

import { ref } from 'vue';
import Loader from "@/components/ui/common/loader.vue";
const current = ref(2);

function handlePageChange(page: number) {
  appointmentStore.setPage(page);
}

function handlePageSizeChange(current: number, size: number) {
  appointmentStore.setPageSize(size);
}

function prevPage() {
  appointmentStore.setPage(currentPage.value - 1);
}

function nextPage() {
  appointmentStore.setPage(currentPage.value + 1);
}
const paginatedFilteredAppointments = computed(() => appointmentStore.paginatedFilteredAppointments)
const totalFilteredAppointments = computed(() => appointmentStore.totalFilteredAppointments)
//const currentPage = computed(() => appointmentStore.currentPage)

watch(() => appointmentStore.paginatedFilteredAppointments, () => {
  console.log("APPOINTMENT PAGINATE FILTE: ", appointmentStore.paginatedFilteredAppointments);
})

</script>

<template>
  <div v-if="appointmentStore.loading">
    <loader />
  </div>
  <div v-else>
    <div class="appointment-list px-5 md:px-0">
      <appointment-list-item v-for="(appointment, index) in appointmentStore.paginatedFilteredAppointments" :appointment="appointment" :key="appointment.id" :index="index" />
    </div>
    <div class="flex flex-row justify-end mt-4 pb-3">
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

<style scoped>

</style>