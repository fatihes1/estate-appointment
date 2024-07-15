<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore.ts'
import Navbar from '@/components/ui/common/navbar/Navbar.vue'
import { onMounted } from 'vue'
import { useAppointmentStore } from '@/stores/AppointmentStore.ts'

const userStore = useUserStore()
const appointmentStore = useAppointmentStore()
onMounted(() => {
  appointmentStore.fetchAllAppointments()
})
</script>

<style scoped>
/* Your styles here */
</style>
