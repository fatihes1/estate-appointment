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
                {{ modalType === 'add' ? 'Add Appointment' : 'Update Appointment' }}
              </DialogTitle>
              <div class="mt-2">
                <a-form
                    :model="formState"
                    name="basic"
                    :layout="'vertical'"
                    :label-col="{ span: 10 }"
                    :wrapper-col="{ span: 16 }"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="onFinishFailed"
                >
                  <a-form-item
                      label="Address"
                      name="appointment_address"
                      :rules="[{ required: true, message: 'Please input appointment address!' }]"
                  >
                    <a-input size="large" v-model:value="formState.appointment_address" />
                  </a-form-item>

                  <a-form-item
                      label="Appointment Date"
                      name="appointment_date"
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
                    :rules="[{ required: true, message: 'Please select contacts!' }]"
                  >
                    <combo-box-view @onSelectContact="handleSelectedContacts" :filter-type="'contact'" :initial-selected="formState.contact_id" />
                  </a-form-item>
                  <a-form-item
                      label="Agents"
                      name="agents"
                      :rules="[{ required: true, message: 'Please select contacts!' }]"
                  >
                    <combo-box-view @onSelectContact="handleSelectedAgents" :filter-type="'agent'" :initial-selected="formState.agent_id" />
                  </a-form-item>

                  <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                    <a-button type="primary" html-type="submit">Submit</a-button>
                  </a-form-item>
                </a-form>
              </div>
              <div>
                <pre>
                  {{formState}}
                </pre>
              </div>
              <div class="mt-4 flex flex-row justify-end gap-x-2">
                <button
                    type="button"
                    class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="onCancel"
                >
                  Got it, thanks!
                </button>
                <button
                    type="button"
                    class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    @click="onCancel"
                >
                  Got it, thanks!
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
import moment from 'moment'
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
      appointment_id: null,
      appointment_address: '',
      appointment_date: '',
      contact_id: [],
      agent_id: []
    }
  }
})


import {ref, watch} from 'vue';
import ComboBoxView from "@/components/ui/common/combobox/ComboBoxView.vue";
const selectedContacts = ref([]);
const selectedAgents = ref([]);

const onChange = (value, dateString) => {
  formState.appointment_date = moment.utc(dateString, 'YYYY-MM-DD HH:mm').toISOString()
};


const formState = ref({ ...props.record });

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function handleSelectedContacts(selectedItems) {
  selectedContacts.value = selectedItems;
}

function handleSelectedAgents(selectedItems) {
  selectedAgents.value = selectedItems;
}

watch(() => selectedContacts.value, (newVal) => {
  formState.value.contact_id = newVal;
});

watch(() => selectedAgents.value, (newVal) => {
  formState.value.agent_id = newVal;
});

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    formState.value = { ...props.record };
  }
});



</script>
