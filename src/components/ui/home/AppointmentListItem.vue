<script setup lang="ts">

import UserCard from "@/components/ui/home/UserCard.vue";
import AddressCard from "@/components/ui/home/AddressCard.vue";
import AppointmentStatus from "@/components/ui/home/AppointmentStatus.vue";
import AppointmentAgents from "@/components/ui/home/AppointmentAgents.vue";
import {ref} from "vue";
import AppointmentModal from "@/components/ui/modals/AppointmentModal.vue";
import dayjs from "dayjs";
import {EDIT_MODAL} from "@/enums/modal-type-enums.ts";


const props = defineProps({
  appointment: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  clickable: {
    type: Boolean,
    required: false,
    default: true
  }
})

const handleOnClickAppointment = (appointment) => {
  console.log(appointment)
  contactData.value = {
    id: appointment.id,
    appointment_date: dayjs(appointment.fields.appointment_date),
    appointment_address: appointment.fields.appointment_address,
    contact_id: appointment.fields.contact_id || [],
    agent_id: appointment.fields.agent_id || [],
    is_cancelled: appointment.fields.is_cancelled ? appointment.fields.is_cancelled : false
  }
  isOpen.value = true
}

const isOpen = ref(false)
const contactData = ref({})


function closeModal() {
  isOpen.value = false
}

</script>

<template>
  <div class="w-full px-4 border-2 border-gray-300 flex flex-col md:flex-row justify-around py-2 rounded-lg mt-3 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition duration-200 ease-in-out"
       :class="index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-50'"
        @click="clickable ? handleOnClickAppointment(appointment) : null"
  >
    <div v-if="clickable" class="w-full px-4 flex flex-col md:flex-row justify-around">
      <div class="w-full md:w-3/12 mb-4 md:mb-0">
        <user-card
            :name="appointment.fields.contact_name[0]"
            :surname="appointment.fields.contact_surname[0]"
            :email="appointment.fields.contact_email[0]"
            :phone="appointment.fields.contact_phone[0]"
        />
      </div>
      <div class="w-full md:w-3/12 mb-4 md:mb-0">
        <address-card :location="appointment.fields.appointment_address" />
      </div>
      <div class="w-full md:w-4/12 flex justify-center items-center mb-4 md:mb-0">
        <appointment-status
            :date="appointment.fields.appointment_date"
            :is-canceled="appointment.fields.is_cancelled ? appointment.fields.is_cancelled : false"
        />
      </div>
      <div class="w-full md:w-2/12 flex flex-row justify-center items-center">
        <appointment-agents :agents="appointment.fields.agent_id" />
      </div>
    </div>
    <div v-else class="flex flex-col justify-center items-center gap-y-1 w-full">
        <div >
          <address-card :location="appointment.fields.appointment_address" />
        </div>
        <div class="w-full flex justify-center items-center mb-4 md:mb-0">
          <appointment-status
              :date="appointment.fields.appointment_date"
              :is-canceled="appointment.fields.is_cancelled ? appointment.fields.is_cancelled : false"
          />
        </div>
      <div class="w-full flex flex-row justify-center items-center">
        <appointment-agents :agents="appointment.fields.agent_id" />
      </div>
    </div>
  </div>
  <appointment-modal
      :isOpen="isOpen"
      :on-cancel="closeModal"
      :modal-type="EDIT_MODAL"
      :record="contactData"
  />
</template>

<style scoped>

</style>