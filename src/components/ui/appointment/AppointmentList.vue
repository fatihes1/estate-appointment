<template>
  <ol v-if="!loading" class="mt-4 divide-y divide-gray-100 mx-5 text-sm leading-6 lg:col-span-7 xl:col-span-8 w-full px-3 appointment-list-page">
    <appointment-list-item v-if="appointments.length > 0" v-for="appointment in appointments" :appointment="appointment" />
    <li v-else>
      <empty-state
        :message="'For this agent, there is no upcoming appointment.'"
      />
    </li>
  </ol>
  <div class="w-96" v-if="loading">
    <loader/>
  </div>
</template>

<script setup lang="ts">
import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
import Loader from "@/components/ui/common/loader.vue";
import EmptyState from "@/components/ui/common/empty/EmptyState.vue";
import AppointmentModal from "@/components/ui/modals/AppointmentModal.vue";

import AppointmentListItem from "@/components/ui/appointment/AppointmentListItem.vue";
import {storeToRefs} from "pinia";
const appointmentStore = useAppointmentStore()
const {appointments, loading} = storeToRefs(appointmentStore)

</script>

<style scoped>

</style>