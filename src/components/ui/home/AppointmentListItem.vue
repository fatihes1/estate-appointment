<script setup lang="ts">

import UserCard from "@/components/ui/home/UserCard.vue";
import AddressCard from "@/components/ui/home/AddressCard.vue";
import AppointmentStatus from "@/components/ui/home/AppointmentStatus.vue";
import AppointmentAgents from "@/components/ui/home/AppointmentAgents.vue";
import {OneAppointmentResponseModel} from "@/models/appointments-model.ts";

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="w-full border-2 border-gray-300 bg-gray-200 flex flex-row justify-around px-3 py-2 rounded-lg mt-3">
    <div class="w-3/12">
      <user-card
          :name="appointment.fields.contact_name[0]"
          :surname="appointment.fields.contact_surname[0]"
          :email="appointment.fields.contact_email[0]"
          :phone="appointment.fields.contact_phone[0]" />
    </div>
    <div class="w-3/12">
      <address-card :location="appointment.fields.appointment_address" />
    </div>
    <div class="w-4/12 flex justify-center items-center">
      <appointment-status :date="appointment.fields.appointment_date" :is-canceled="appointment.fields.is_cancelled ? appointment.fields.is_cancelled : false" />
    </div>
    <div class="w-2/12 flex flex-row justify-center items-center">
      <appointment-agents :agents="appointment.fields.agent_id" />
    </div>
  </div>
</template>

<style scoped>

</style>