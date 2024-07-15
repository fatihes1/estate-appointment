<template>
  <filter-section />
  <status-section />
  <appointment-list />
</template>

<script setup lang="ts">
import { useAppointmentStore } from '@/stores/AppointmentStore.ts'
import { onMounted } from 'vue'
import FilterSection from '@/components/ui/home/FilterSection.vue'
import StatusSection from '@/components/ui/home/StatusSection.vue'
import AppointmentList from '@/components/ui/home/AppointmentList.vue'
const appointmentStore = useAppointmentStore()

onMounted(() => {
  appointmentStore.fetchAllAppointments()
})
</script>

<style scoped></style>
