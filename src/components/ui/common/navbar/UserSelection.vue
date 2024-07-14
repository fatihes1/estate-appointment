<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore.ts';
import { useAppointmentStore} from "@/stores/AppointmentStore.ts";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {getUpcomingAppointmentsByIds } from "@/requests/appointments-requests.ts"

const userStore = useUserStore();
const appointmentStore = useAppointmentStore();
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import {onMounted, watch} from "vue";
import {AllAppointmentsResponseModel} from "@/models/appointments-model";
import Avatar from "@/components/ui/common/avatar/Avatar.vue";

onMounted(async () => {
  await userStore.fetchAgents();
});

// watch userStore.agent and when changed, update appointmentStore.agent
watch(() => userStore.agent, (newVal) => {
  appointmentStore.setLoading(true)
  if (newVal.fields.appointments) {
    getUpcomingAppointmentsByIds(newVal.fields.appointments).then((appointments: AllAppointmentsResponseModel) => {
      appointmentStore.setAppointments(appointments.data.records);
      appointmentStore.setLoading(false)
    })
  } else {
    appointmentStore.setAppointments([]);
    appointmentStore.setLoading(false)
  }
})



</script>


<template>
  <div class="w-44">
    <Listbox v-model="userStore.agent">
      <div class="relative">
        <ListboxButton
            class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ userStore.agent.fields.agent_name }}</span>
          <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
          <ListboxOptions
              class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md z-40 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
                v-slot="{ active, selected }"
                v-for="person in userStore.agents"
                :key="person.id"
                :value="person"
                as="template"
            >
              <li
                  :class="[
                  active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900',
                  'relative flex flex-row justify-start items-center gap-x-2 cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
              >
                <avatar :user-surname="person.fields.agent_name" :user-name="person.fields.agent_surname" :user-color="person.fields.color" />
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ person.fields.agent_name }}</span
                >
                <span
                    v-if="selected"
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5 text-indigo-700" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<style scoped>

</style>