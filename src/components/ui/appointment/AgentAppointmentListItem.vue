<script setup lang="ts">
import moment from 'moment/moment'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { useAppointmentStore } from '@/stores/AppointmentStore.ts'
import Avatar from '@/components/ui/common/avatar/Avatar.vue'
import AppointmentModal from '@/components/ui/modals/AppointmentModal.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
const appointmentStore = useAppointmentStore()
import {
  EllipsisHorizontalIcon,
  CalendarIcon,
  MapPinIcon,
} from '@heroicons/vue/20/solid'
import { EDIT_MODAL } from '@/enums/modal-type-enums.ts'

const props = defineProps({
  appointment: {
    type: Object,
    required: true,
  },
})

const isOpen = ref(false)
const contactData = ref({})

const handleOnOkCancelAppointment = (appointmentId) => {
  appointmentStore.cancelAnAppointment(appointmentId)
  message.success('Appointment has been cancelled successfully!')
}

function closeModal() {
  isOpen.value = false
}

function openEditModal(recordId) {
  const selectedData = appointmentStore.appointments.find(
    (appointment) => appointment.id === recordId
  )
  contactData.value = {
    id: selectedData.id,
    appointment_date: dayjs(selectedData.fields.appointment_date),
    appointment_address: selectedData.fields.appointment_address,
    contact_id: selectedData.fields.contact_id,
    agent_id: selectedData.fields.agent_id,
    is_cancelled: selectedData.fields.is_cancelled
      ? selectedData.fields.is_cancelled
      : false,
  }
  isOpen.value = true
}
</script>

<template>
  <li
    v-if="appointment"
    :key="appointment.id"
    class="relative flex space-x-6 py-6 xl:static"
  >
    <avatar
      :user-surname="appointment.fields.contact_surname[0]"
      :user-name="appointment.fields.contact_name[0]"
      :size="12"
    />
    <div class="flex-auto">
      <h3 class="pr-10 font-semibold text-gray-900 xl:pr-0">
        {{ appointment.fields.contact_name[0] }}
        {{ appointment.fields.contact_surname[0] }}
      </h3>
      <dl class="mt-2 flex flex-col text-gray-500 xl:flex-row">
        <div class="flex items-start space-x-3">
          <dt class="mt-0.5">
            <span class="sr-only">Date</span>
            <CalendarIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>
            <!--                  <time :datetime="meeting.datetime">{{ meeting.date }} at {{ meeting.time }}</time>-->
            <time :datetime="appointment.fields.appointment_date">
              {{
                moment(appointment.fields.appointment_date).format('YYYY.MM.DD')
              }}
              at
              {{
                moment(appointment.fields.appointment_date).format('HH:mm')
              }}</time
            >
          </dd>
        </div>
        <div
          class="mt-2 flex items-start space-x-3 xl:ml-3.5 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5"
        >
          <dt class="mt-0.5">
            <span class="sr-only">Location</span>
            <MapPinIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </dt>
          <dd>{{ appointment.fields.appointment_address }}</dd>
        </div>
      </dl>
    </div>
    <Menu
      as="div"
      class="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
    >
      <div>
        <MenuButton
          class="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600"
        >
          <span class="sr-only">Open options</span>
          <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <div
                @click="openEditModal(appointment.id)"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm cursor-pointer',
                ]"
              >
                Edit
              </div>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <div
                @click="handleOnOkCancelAppointment(appointment.id)"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block px-4 py-2 text-sm cursor-pointer',
                ]"
              >
                Cancel
              </div>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </li>
  <appointment-modal
    :isOpen="isOpen"
    :on-cancel="closeModal"
    :modal-type="EDIT_MODAL"
    :record="contactData"
  />
</template>

<style scoped></style>
