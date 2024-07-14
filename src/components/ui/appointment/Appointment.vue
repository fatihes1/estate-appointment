<template>
  <div>
    <h2 class="text-base font-semibold leading-6 px-5 text-gray-900">Upcoming appointments for agent {{ userStore.agent.fields.agent_name }}</h2>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-16">
      <div class="mt-10 text-center lg:col-start-8 px-5 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        TODO: ADD CALENDER HERE
        <button type="button" class="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add event</button>
      </div>
      <appointment-list />
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/UserStore.ts";
import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
import AppointmentList from "@/components/ui/appointment/AppointmentList.vue";

const userStore = useUserStore()
const appointmentStore = useAppointmentStore()


</script>