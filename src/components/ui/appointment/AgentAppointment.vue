<template>
  <div>
    <h2 class="text-base font-semibold leading-6 px-5 text-gray-900">Upcoming appointments for agent {{ userStore.agent.fields.agent_name }}</h2>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-16">
      <div class="lg:col-start-8 px-5 lg:col-end-13 lg:row-start-1 lg:mt-4 xl:col-start-9">
        <p>
          You can see the scheduled appointments for the agent <span class="font-semibold">{{ userStore.agent.fields.agent_name }} {{' '}} {{userStore.agent.fields.agent_surname}}</span> here.
        </p>
        <button @click="openCreateModal" type="button" class="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Appointment</button>
      </div>
      <agent-appointment-list />
    </div>
  </div>
  <appointment-modal
      :isOpen="isOpen"
      :on-cancel="closeModal"
      :modal-type="ADD_MODAL"
  />
</template>

<script setup>
import {useUserStore} from "@/stores/UserStore.ts";
import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
import AgentAppointmentList from "@/components/ui/appointment/AgentAppointmentList.vue";
import AppointmentModal from "@/components/ui/modals/AppointmentModal.vue";
import {ref} from "vue";
import {ADD_MODAL} from "@/enums/modal-type-enums.ts";

const isOpen = ref(false)
function closeModal() {
  isOpen.value = false
}

function openCreateModal() {
  isOpen.value = true
}

const userStore = useUserStore()
const appointmentStore = useAppointmentStore()


</script>