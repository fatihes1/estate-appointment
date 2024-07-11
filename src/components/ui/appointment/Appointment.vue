<template>
  <div>
    <h2 class="text-base font-semibold leading-6 text-gray-900">All appointments for agent {{ userStore.agent.fields.agent_name }}</h2>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-16">
      <div class="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
        TODO: ADD CALENDER HERE
        <button type="button" class="mt-8 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add event</button>
      </div>
      <ol v-if="!appointmentStore.loading" class="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
        <li v-if="appointmentStore.appointments.length > 0" v-for="appointment in appointmentStore.appointments" :key="appointment.id" class="relative flex space-x-6 py-6 xl:static">
          <div class="w-12 h-12 flex flex-row items-center justify-center text-white rounded-full bg-indigo-600" >
            {{ appointment.fields.contact_name[0].charAt(0) }}{{ appointment.fields.contact_surname[0].charAt(0) }}
          </div>
          <div class="flex-auto">
            <h3 class="pr-10 font-semibold text-gray-900 xl:pr-0">{{ appointment.fields.contact_name[0] }} {{appointment.fields.contact_surname[0]}}</h3>
            <dl class="mt-2 flex flex-col text-gray-500 xl:flex-row">
              <div class="flex items-start space-x-3">
                <dt class="mt-0.5">
                  <span class="sr-only">Date</span>
                  <CalendarIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
<!--                  <time :datetime="meeting.datetime">{{ meeting.date }} at {{ meeting.time }}</time>-->
                  <time :datetime="appointment.fields.appointment_date">
                    {{ moment(appointment.fields.appointment_date).format("YYYY.MM.DD") }} at {{ moment(appointment.fields.appointment_date).format("HH:mm") }}</time>
                </dd>
              </div>
              <div class="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                <dt class="mt-0.5">
                  <span class="sr-only">Location</span>
                  <MapPinIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>{{ appointment.fields.appointment_address }}</dd>
              </div>
            </dl>
          </div>
          <Menu as="div" class="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center">
            <div>
              <MenuButton class="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                <span class="sr-only">Open options</span>
                <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Edit</a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Cancel</a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </li>
        <li v-else>
          <empty-state />
        </li>
      </ol>
    </div>
    <div class="w-96" v-if="appointmentStore.loading">
      <loader/>
    </div>
  </div>
</template>

<script setup>
import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from '@heroicons/vue/20/solid'
import moment from 'moment';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {useUserStore} from "@/stores/UserStore.ts";
import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
import Loader from "@/components/ui/common/loader.vue";
import EmptyState from "@/components/ui/common/empty/EmptyState.vue";


const userStore = useUserStore()
const appointmentStore = useAppointmentStore()


</script>