<script setup lang="ts">

import AppointmentListItem from "@/components/ui/home/AppointmentListItem.vue";
import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
import {watch} from "vue";
const appointmentStore = useAppointmentStore();
import { storeToRefs } from "pinia";
const { paginatedAppointments, totalAppointments, currentPage, totalPages, loading, pageSize } = storeToRefs(appointmentStore);

watch(() => appointmentStore.paginatedAppointments, () => {
  console.log("APPOINTMENT PAGINATE: ", appointmentStore.paginatedAppointments);
})

import { ref } from 'vue';
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

</script>

<template>
  <div class="appointment-list">
    <appointment-list-item v-for="appointment in appointmentStore.paginatedAppointments" :appointment="appointment" :key="appointment.id" />
  </div>
  <div class="flex flex-row justify-end mt-4">
    <a-pagination
        :current="currentPage"
        :total="totalAppointments"
        :pageSize="pageSize"
        @change="handlePageChange"
        show-size-changer
        @showSizeChange="handlePageSizeChange"
    />
  </div>
</template>

<style scoped>

</style>