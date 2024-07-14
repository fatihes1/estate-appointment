<script setup>

import {computed, onMounted, ref, watch} from "vue";

import Combobox from "@/components/ui/common/combobox/ComboBox.vue";
import {searchContactsByRecordIds, searchContactsRequest} from "@/requests/contacts-requests.ts";
import {debounce} from "lodash-es";
import {searchAgentRequest, searchAgentsByRecordIds} from "@/requests/agents-requests.ts";

const loadUser = ref([]);

const props = defineProps({
  initialSelected: {
    type: Array,
    default: [],
    required: false
  },
  filterType: {
    type: String,
    default: 'contact',
    required: false
  }
})
const emit = defineEmits(['onSelectContact']);

function loadUsers(query, setOptions) {
  if (!query || query.length < 2) {
    return;
  }
  if (props.filterType === 'contact') {
    searchContactsRequest(query)
        .then(result => {
          setOptions(
              result.data.records.map(record => {
                return {
                  value: record.id,
                  label: `${record.fields.contact_name} ${record.fields.contact_surname}`,
                };
              })
          );
        });
  }
  if (props.filterType === 'agent') {
    searchAgentRequest(query)
        .then(result => {
          setOptions(
              result.data.records.map(record => {
                return {
                  value: record.id,
                  label: `${record.fields.agent_name} ${record.fields.agent_surname}`,
                };
              })
          );
        });
  }
}

const loadUserDebounce = debounce((query, setOptions) => {
  loadUsers(query, setOptions);
}, 500);

onMounted(() => {
  if (props.initialSelected && props.initialSelected.length > 0) {
    if (props.filterType === 'contact') {
      searchContactsByRecordIds(props.initialSelected)
          .then(result => {
            loadUser.value = result.data.records.map(record => {
              return {
                value: record.id,
                label: `${record.fields.contact_name} ${record.fields.contact_surname}`,
              };
            });
          });
    }}
    if (props.filterType === 'agent') {
      searchAgentsByRecordIds(props.initialSelected)
          .then(result => {
            loadUser.value = result.data.records.map(record => {
              return {
                value: record.id,
                label: `${record.fields.agent_name} ${record.fields.agent_surname}`,
              };
            });
          });
  }}
);

watch(loadUser, (newValues) => {
  emit('onSelectContact', newValues);
});

</script>



<template>
  <div class="flex flex-wrap gap-x-2 mb-3" v-if="loadUser && loadUser.length > 0">
    <a-badge v-for="person in loadUser" :key="person.id" :count="person.label" :number-style="{ backgroundColor: '#52c41a' }" />
  </div>
  <Combobox
      :load-options="loadUserDebounce"
      v-model="loadUser"
  />
</template>