<script setup>
import { onMounted, ref, watch } from 'vue'

import Combobox from '@/components/ui/common/combobox/ComboBox.vue'
import {
  searchContactsByRecordIds,
  searchContactsRequest,
} from '@/requests/contacts-requests.ts'
import { debounce } from 'lodash-es'
import {
  searchAgentRequest,
  searchAgentsByRecordIds,
} from '@/requests/agents-requests.ts'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { AGENT_USER_TYPE, CONTACT_USER_TYPE } from '@/enums/user-type-enums.ts'

const loadUser = ref([])

const props = defineProps({
  initialSelected: {
    type: Array,
    default: [],
    required: false,
  },
  filterType: {
    type: String,
    default: CONTACT_USER_TYPE,
    required: false,
  },
})
const emit = defineEmits(['onSelectContact'])

function loadUsers(query, setOptions) {
  if (!query || query.length < 2) {
    return
  }
  if (props.filterType === CONTACT_USER_TYPE) {
    searchContactsRequest(query).then((result) => {
      setOptions(
        result.data.records.map((record) => {
          return {
            value: record.id,
            label: `${record.fields.contact_name} ${record.fields.contact_surname}`,
          }
        })
      )
    })
  }
  if (props.filterType === AGENT_USER_TYPE) {
    searchAgentRequest(query).then((result) => {
      setOptions(
        result.data.records.map((record) => {
          return {
            value: record.id,
            label: `${record.fields.agent_name} ${record.fields.agent_surname}`,
          }
        })
      )
    })
  }
}

const loadUserDebounce = debounce((query, setOptions) => {
  loadUsers(query, setOptions)
}, 500)

onMounted(() => {
  if (props.initialSelected && props.initialSelected.length > 0) {
    if (props.filterType === CONTACT_USER_TYPE) {
      searchContactsByRecordIds(props.initialSelected).then((result) => {
        loadUser.value = result.data.records.map((record) => {
          return {
            value: record.id,
            label: `${record.fields.contact_name} ${record.fields.contact_surname}`,
          }
        })
      })
    }
  }
  if (props.filterType === AGENT_USER_TYPE) {
    searchAgentsByRecordIds(props.initialSelected).then((result) => {
      loadUser.value = result.data.records.map((record) => {
        return {
          value: record.id,
          label: `${record.fields.agent_name} ${record.fields.agent_surname}`,
        }
      })
    })
  }
})

const handleRemoveUser = (user) => {
  loadUser.value = loadUser.value.filter((item) => item.value !== user)
}

watch(loadUser, (newValues) => {
  emit('onSelectContact', newValues)
})
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-3" v-if="loadUser && loadUser.length > 0">
    <div
      class="flex flex-row gap-x-1 pl-3 pr-2 py-1 bg-indigo-300 rounded-full text-xs"
      v-for="person in loadUser"
      :key="person.id"
    >
      {{ person.label }}
      <a-tooltip :title="'Remove ' + props.filterType">
        <div
          @click="handleRemoveUser(person.value)"
          class="w-4 h-4 cursor-pointer"
        >
          <XMarkIcon />
        </div>
      </a-tooltip>
    </div>
  </div>
  <Combobox :load-options="loadUserDebounce" v-model="loadUser" />
</template>
