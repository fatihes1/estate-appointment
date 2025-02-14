<template>
  <a-avatar-group
    :max-count="maxCount"
    size="default"
    :max-style="{
      backgroundColor: '#e2e2e2',
      color: '#000000',
      cursor: 'pointer',
    }"
    maxPopoverPlacement="bottom"
  >
    <a-tooltip
      v-for="user in users"
      :title="user.name + ' ' + user.surname"
      :key="user.id"
      placement="topLeft"
    >
      <a-avatar
        @click="clickable ? handleOnClickAvatar(user.id) : null"
        class="border-2 border-white text-xs flex justify-center items-center"
        :key="user.id"
        :style="{ backgroundColor: user.color }"
        :class="{
          '!border-green-500': selectedUsers.includes(user.id),
          '!cursor-pointer': clickable,
        }"
        >{{ user.name.charAt(0) }}{{ user.surname.charAt(0) }}</a-avatar
      >
    </a-tooltip>
  </a-avatar-group>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const selectedUsers = ref([])
import { useAppointmentStore } from '@/stores/AppointmentStore.js'
const appointmentStore = useAppointmentStore()
const handleOnClickAvatar = (user) => {
  if (selectedUsers.value.includes(user)) {
    selectedUsers.value = selectedUsers.value.filter((id) => id !== user)
  } else {
    selectedUsers.value = [...selectedUsers.value, user]
  }
}

watch(selectedUsers, (newVal) => {
  appointmentStore.setSelectedAgents(newVal)
})

const props = defineProps({
  maxCount: {
    type: Number,
    default: 2,
    required: false,
  },
  size: {
    type: String,
    default: 'default',
    required: false,
  },
  maxStyle: {
    type: Object,
    default: () => {
      return {
        backgroundColor: '#f56a00',
        color: '#f56a00',
      }
    },
    required: false,
  },
  users: {
    type: Array,
    default: [],
    required: true,
  },
  clickable: {
    type: Boolean,
    default: false,
    required: false,
  },
})
</script>

<style scoped></style>
