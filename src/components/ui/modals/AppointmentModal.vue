<template>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="onCancel" class="relative z-10">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ modalType === ADD_MODAL ? 'Add Appointment' : 'Update Appointment' }}
              </DialogTitle>
              <div class="mt-2">
                <a-form
                    :model="formState"
                    name="basic"
                    :layout="'vertical'"
                    :label-col="{ span: 16 }"
                    autocomplete="off"
                >
                  <a-form-item
                      label="Address"
                      name="appointment_address"
                      class="mb-2"
                      :rules="[{ required: true, message: 'Please input appointment address!' }]"
                  >
                    <a-input size="large" v-model:value="formState.appointment_address" />
                  </a-form-item>

                  <a-form-item
                      label="Appointment Date"
                      name="appointment_date"
                      class="mb-2"
                      :rules="[{ required: true, message: 'Please input appointment date!' }]"
                  >
                    <a-date-picker
                        show-time
                        size="large"
                        class="w-full"
                        :show-time="{ format: 'HH:mm' }"
                        format="YYYY-MM-DD HH:mm"
                        placeholder="Select Time"
                        v-model:value="formState.appointment_date"
                        @change="onChange"
                    />
                  </a-form-item>
                  <a-form-item
                    label="Contacts"
                    name="contacts"
                    class="mb-2"
                    :rules="[{ required: true, message: 'Please select contacts!' }]"
                  >
                    <combo-box-view @onSelectContact="handleSelectedContacts" :filter-type="'contact'" :initial-selected="formState.contact_id" />
                  </a-form-item>
                  <a-form-item
                      label="Agents"
                      name="agents"
                      class="mb-2"
                      :rules="[{ required: true, message: 'Please select contacts!' }]"
                  >
                    <combo-box-view @onSelectContact="handleSelectedAgents" :filter-type="'agent'" :initial-selected="formState.agent_id" />
                  </a-form-item>

                  <a-form-item
                      label="Appointment Status"
                      name="appointment_status"
                      class="mb-2"
                      v-if="modalType === EDIT_MODAL"
                  >
                    <a-select
                        size="large"
                        v-model:value="appointmentStatus">
                      <a-select-option v-if="new Date(formState.appointment_date).toISOString() > new Date().toISOString()" :value="NOT_CANCELED">Upcoming</a-select-option>
                      <a-select-option v-else :value="NOT_CANCELED">Completed</a-select-option>
                      <a-select-option :value="CANCELED">Canceled</a-select-option>
                    </a-select>
                  </a-form-item>


                </a-form>
              </div>
              <h3 v-if="modalType === EDIT_MODAL" class="text-sm font-medium leading-6 text-gray-900">Related Appointments</h3>
              <div v-if="relatedAppointments && relatedAppointments.length > 0 && modalType === EDIT_MODAL" class="related-appointment-list pb-2">
                <appointment-list-item v-for="(appointment, index) in relatedAppointments" :index="index" :appointment="appointment" :key="appointment.id" :clickable="false" />
              </div>
              <div v-if="modalType===EDIT_MODAL && relatedAppointments.length === 0">
                <empty-state :message="'No related appointments found for this contact.'" />
              </div>
              <div class="mt-4 flex flex-row justify-end gap-x-4">
                <button
                    type="button"
                    class="relative inline-flex items-center gap-x-1.5 rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-500 hover:text-white duration-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="onCancel"
                >
                  Cancel
                </button>
                <button
                    type="button"
                    class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="onSubmit"
                >
                  {{ modalType === ADD_MODAL ? 'Create' : 'Update'}}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { Form as AForm, FormItem as AFormItem, Input as AInput, InputPassword as AInputPassword, DatePicker as ADatePicker } from 'ant-design-vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
    required: true
  },
  modalType: {
    type: String,
    required: true
  },
  onCancel: {
    type: Function,
    default: () => {}
  },
  record: {
    type: Object,
    required: false,
    default: {
      id: null,
      appointment_address: '',
      appointment_date: null,
      contact_id: [],
      agent_id: [],
      is_cancelled: false
    }
  }
})


import {onMounted, ref, watch} from 'vue';
import ComboBoxView from "@/components/ui/common/combobox/ComboBoxView.vue";
import { message } from 'ant-design-vue';

import {useAppointmentStore} from "@/stores/AppointmentStore.ts";
import {CANCELED, NOT_CANCELED} from "@/enums/status-filter-enums.ts";
import AppointmentListItem from "@/components/ui/home/AppointmentListItem.vue";
import moment from "moment";
import EmptyState from "@/components/ui/common/empty/EmptyState.vue";
import {ADD_MODAL, EDIT_MODAL} from "@/enums/modal-type-enums.ts";
const appointmentStore = useAppointmentStore();

const selectedContacts = ref([]);
const selectedAgents = ref([]);
const relatedAppointments = ref([]);

const appointmentStatus = ref(props.record.is_cancelled ? CANCELED : NOT_CANCELED);

const onChange = (value, dateString) => {
  if (!value) {
    formState.appointment_date = null
    return;
  }
  formState.appointment_date = new Date(dateString).toISOString();
};

const formState = ref({ ...props.record });

function handleSelectedContacts(selectedItems) {
  selectedContacts.value = selectedItems;
}

function handleSelectedAgents(selectedItems) {
  selectedAgents.value = selectedItems;
}

const onSubmit = () => {
  if (!formState.value.appointment_address) {
    message.error('Please input appointment address!');
    return;
  }
  if (!formState.value.appointment_date) {
    message.error('Please input appointment date!');
    return;
  }
  if (props.modalType === ADD_MODAL) {
    if (new Date(formState.value.appointment_date).toISOString() < new Date().toISOString()) {
      message.error('Appointment date should be greater than current date!');
      return;
    }
  }
  if (selectedContacts.value.length === 0) {
    message.error('Please at least select one contact!');
    return;
  }
  if (selectedAgents.value.length === 0) {
    message.error('Please at least select one agent!');
    return;
  }
  const requestBody = {
    appointment_address: formState.value.appointment_address,
    appointment_date: new Date(formState.value.appointment_date).toISOString(),
    contact_id: selectedContacts.value.map((item) => item.value),
    agent_id: selectedAgents.value.map((item) => item.value),
    is_cancelled: false
  };
  if (props.modalType === ADD_MODAL) {
    message.loading('Creating Appointment...', 0.5)
    appointmentStore.createNewAppointment(requestBody);
    message.success('Appointment created successfully!');
    props.onCancel();
  } else {
    message.loading('Updating Appointment...', 0.5)
    const updateRequestBody = {
      ...requestBody,
      is_cancelled: appointmentStatus.value === CANCELED
    };
    appointmentStore.updateAppointment(formState.value.id, updateRequestBody);
    message.success('Appointment updated successfully!');
    props.onCancel();
  }
};

watch(() => selectedContacts.value, (newVal) => {
  formState.value.contact_id = newVal;
});

watch(() => selectedAgents.value, (newVal) => {
  formState.value.agent_id = newVal;
});

watch(() => appointmentStatus.value, (newVal) => {
  formState.value.is_cancelled = newVal;
});

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    formState.value = { ...props.record };
    appointmentStatus.value = props.record.is_cancelled ? CANCELED : NOT_CANCELED;

    if (props.modalType === EDIT_MODAL){
      if (props.record.contact_id && props.record.contact_id.length > 0) {
        relatedAppointments.value = appointmentStore.getRelatedAppointmentsByContactId(props.record.contact_id[0], props.record.id);
      }
    }
  }
});

</script>
